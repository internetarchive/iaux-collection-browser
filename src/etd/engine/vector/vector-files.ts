import { fileSetUrl } from '../../../static-index/files';
import type { FileSet } from '../../../static-index/manifest';
import type { EtdCallOptions } from '../../etd-engine';
import { loadItemFileList } from '../../../static-index/file-list';
import type { ItemFileList } from '../../../static-index/file-list';
import { checkSizes, describeMismatch } from '../../../static-index/size-rules';
import { etdItemId, MEANING_SEARCH, vectorSizeRules } from '../file-checks';
import type { EtdFileCheck } from '../file-checks';
import { RangeFiles } from '../../../static-index/range-files';
import { HttpError } from '../http-error';
import { DEFAULT_ETD_BASE_URL } from '../index-files';
import { retryingFetch } from '../retrying-fetch';

/**
 * ivf-meta.json: the vector store's manifest. The store sits in the same item
 * as the text index but is built on its own, with its own doc ids (a row in
 * docs.bin, 0-based), so a vector id is never a text docId.
 */
export interface IvfMeta {
  /** Docs in the store. */
  n: number;
  /** IVF cells (clusters); centroids.f16 holds one vector each. */
  ncell: number;
  /** Vector size. */
  dim: number;
  /** The model the abstracts were embedded with, e.g. intfloat/multilingual-e5-small. */
  model?: string;
  /** Bytes per cells.bin row: a u32 doc id, then `dim` halfs. */
  rowbytes: number;
  /** Bytes per docs.bin row. */
  docbytes: number;
  /** docs.bin's NUL-padded fields, in order, and their widths. */
  fields: {
    title: number;
    host: number;
    date: number;
    landing: number;
    lang: number;
  };
  /** Whether vsnip.dir / vsnip.bin (abstracts) exist. */
  vsnip?: boolean;
  /** Whether cell-codes.bin (quantised rows) exists. */
  codes?: boolean;
  /** Bits per dimension in cell-codes.bin's rows; 4 when not given. */
  code_bits?: number;
  /** The store's build stamp, e.g. '2026-10-12 11:31'. */
  built?: string;
}

/**
 * Reads the vector store's files, published one of two ways:
 * - fixed names (etd-search): a file can be replaced without ivf-meta.json
 *   changing. So each file's url is keyed by its own size and change time
 *   from the item's file list, and without the list, `?v=<built>` keys them
 *   all to the build, as on the live page.
 * - versioned like the text index (dl-search): `<name>.<v>`, with current.json's
 *   `v`. Used when there's no fixed-name ivf-meta.json.
 * Either way `open` checks every file's size against ivf-meta.json before a
 * search reads any of them.
 */
export class VectorStoreFiles extends RangeFiles {
  /** What the item's file list said about the store's files. */
  readonly fileCheck: EtdFileCheck;

  private constructor(
    dataUrl: string,
    readonly meta: IvfMeta,
    fetchFn: typeof fetch,
    private readonly fileList: ItemFileList | undefined,
    itemId: string | undefined,
    textDocs: number | undefined,
    /** The text index's version, when the store's names carry it. */
    private readonly version: string | undefined,
  ) {
    super(dataUrl, fetchFn);
    this.fileCheck = {
      itemId,
      sizes:
        fileList &&
        checkSizes(vectorSizeRules(meta, textDocs, version), fileList),
    };
  }

  static async open(
    baseUrl: string = DEFAULT_ETD_BASE_URL,
    options: EtdCallOptions & { fetch?: typeof fetch } = {},
  ): Promise<VectorStoreFiles> {
    const fetchFn = options.fetch ?? fetch.bind(globalThis);
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    // Read alongside ivf-meta.json, so they add no wait; neither throws.
    // current.json's n_docs is only for txt2vrow.bin's size.
    const itemId = etdItemId(base);
    const fileList = itemId
      ? loadItemFileList(itemId, { fetch: fetchFn, signal: options.signal })
      : Promise.resolve(undefined);
    const textIndex = readTextIndex(base, fetchFn, options.signal);
    let manifestRetries = 0;
    // No answer at all (even after retries) throws: the service is down,
    // which isn't the same as the item having no vector store.
    const { response, version } = await findIvfMeta(
      base,
      retryingFetch(fetchFn, {
        onRetry: () => {
          manifestRetries += 1;
        },
      }),
      () => textIndex.then(index => index?.version),
      options.signal,
    );
    if (response.status === 404) {
      throw new Error('ETD vector store: no ivf-meta.json on this item');
    }
    if (!response.ok) {
      throw new HttpError(
        `ETD vector store: ivf-meta.json HTTP ${response.status}`,
        response.status,
      );
    }
    const meta = (await response.json()) as IvfMeta;
    checkIvfMeta(meta);
    const dataUrl = new URL('.', response.url || base).href;
    const files = new VectorStoreFiles(
      dataUrl,
      meta,
      fetchFn,
      await fileList,
      itemId,
      itemId ? (await textIndex)?.docs : undefined,
      version,
    );
    files.stats.retries = manifestRetries;
    // Files that don't fit ivf-meta.json would be read as the wrong rows.
    const mismatch = files.fileCheck.sizes?.checks.find(
      check =>
        check.status === 'mismatch' && check.rule.layer === MEANING_SEARCH,
    );
    if (mismatch) {
      throw new FileCheckError(
        `ETD vector store: its files don't match ivf-meta.json: ${describeMismatch(mismatch)}`,
        files.fileCheck,
      );
    }
    return files;
  }

  /**
   * `<name>.<v>`, or fixed names keyed to the build stamp ('0' for a store
   * without one).
   */
  get fileSet(): FileSet {
    return this.version
      ? { naming: 'versioned', version: this.version }
      : { naming: 'stamped', built: this.meta.built ?? '0' };
  }

  fileUrl(name: string): string {
    // A versioned name never changes, so its version is the cache key.
    const key = this.version ? undefined : this.fileList?.cacheKey(name);
    return key
      ? `${this.dataUrl}${name}?v=${key}`
      : fileSetUrl(this.dataUrl, this.fileSet, name);
  }

  /** A small JSON file the store may not have; undefined when it's absent. */
  async optionalJson<T>(
    name: string,
    options?: EtdCallOptions,
  ): Promise<T | undefined> {
    try {
      const buffer = await this.optionalArrayBuffer(name, options);
      return buffer && (JSON.parse(new TextDecoder().decode(buffer)) as T);
    } catch (err) {
      if (options?.signal?.aborted) throw err;
      return undefined;
    }
  }
}

/** Opening stopped by a file check; the check says what didn't fit. */
export class FileCheckError extends Error {
  constructor(
    message: string,
    readonly fileCheck: EtdFileCheck,
  ) {
    super(message);
    this.name = 'FileCheckError';
  }
}

/**
 * The vector store's manifest: the fixed-name ivf-meta.json, always fetched
 * fresh so a republished store shows at once, or else the one carrying the
 * text index's version. `response` is the fixed name's 404 when neither is
 * there. `textVersion` is only asked for after that 404.
 */
export async function findIvfMeta(
  base: string,
  fetchFn: typeof fetch,
  textVersion: () => Promise<string | undefined>,
  signal?: AbortSignal,
): Promise<{ response: Response; version?: string }> {
  const fixed = await fetchFn(`${base}ivf-meta.json?t=${Date.now()}`, {
    signal,
  });
  if (fixed.status !== 404) return { response: fixed };
  const version = await textVersion();
  if (!version) return { response: fixed };
  const versioned = await fetchFn(`${base}ivf-meta.json.${version}`, {
    signal,
  });
  return versioned.status === 404
    ? { response: fixed }
    : { response: versioned, version };
}

/** current.json's version and doc count, each undefined if unread. */
export async function readTextIndex(
  base: string,
  fetchFn: typeof fetch,
  signal?: AbortSignal,
): Promise<{ version?: string; docs?: number } | undefined> {
  try {
    const response = await fetchFn(`${base}current.json?t=${Date.now()}`, {
      signal,
    });
    if (!response.ok) return undefined;
    const { v, n_docs: docs } = (await response.json()) as {
      v?: unknown;
      n_docs?: unknown;
    };
    return {
      version: typeof v === 'string' && v ? v : undefined,
      docs: Number.isSafeInteger(docs) ? (docs as number) : undefined,
    };
  } catch (err) {
    if (signal?.aborted) throw err;
    return undefined;
  }
}

/** Checks the manifest is a layout this reader knows, so a change fails loudly. */
export function checkIvfMeta(meta: IvfMeta): void {
  const positive = (value: unknown) =>
    Number.isInteger(value) && (value as number) > 0;
  if (!positive(meta.n) || !positive(meta.ncell) || !positive(meta.dim)) {
    throw new Error('ETD vector store: bad n, ncell or dim in ivf-meta.json');
  }
  if (meta.rowbytes !== 4 + meta.dim * 2) {
    throw new Error(
      `ETD vector store: rowbytes ${meta.rowbytes} isn't a u32 id plus ${meta.dim} halfs`,
    );
  }
  const fields = meta.fields ?? {};
  const widths = ['title', 'host', 'date', 'landing', 'lang'].map(
    name => fields[name as keyof IvfMeta['fields']],
  );
  if (
    !widths.every(positive) ||
    widths.reduce((sum, width) => sum + width, 0) !== meta.docbytes
  ) {
    throw new Error(
      "ETD vector store: docs.bin's fields don't add up to docbytes",
    );
  }
}
