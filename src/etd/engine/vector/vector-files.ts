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
  /**
   * Whether doc-vectors.bin exists: cells.bin's rows again, in vector id
   * order (row i is vector id i), so a doc's vector is one fixed range.
   */
  doc_vectors?: boolean;
  /**
   * The text index build (current.json's `v`) whose docIds these vector
   * ids line up with: vector id = docId - 1. Absent when they don't, as on
   * ETD, where the store was built apart from the text index.
   */
  text_v?: string;
}

/**
 * Reads the vector store's files. They aren't versioned like the text
 * index's: the names are fixed, and a file can be replaced without
 * ivf-meta.json changing. So each file's url is keyed by its own size and
 * change time from the item's file list, and `open` checks every file's
 * size against ivf-meta.json before a search reads any of them. Without
 * the list, `?v=<built>` keys them all to the build, as on the live page.
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
  ) {
    super(dataUrl, fetchFn);
    this.fileCheck = {
      itemId,
      sizes: fileList && checkSizes(vectorSizeRules(meta, textDocs), fileList),
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
    const textDocs = itemId
      ? textDocCount(base, fetchFn, options.signal)
      : Promise.resolve(undefined);
    // Unversioned, so always fetched fresh: a republished store shows at once.
    let manifestRetries = 0;
    // No answer at all (even after retries) throws: the service is down,
    // which isn't the same as the item having no vector store.
    const response = await retryingFetch(fetchFn, {
      onRetry: () => {
        manifestRetries += 1;
      },
    })(`${base}ivf-meta.json?t=${Date.now()}`, {
      signal: options.signal,
    });
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
      await textDocs,
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

  /** Fixed names, keyed to the build stamp ('0' for a store without one). */
  get fileSet(): FileSet {
    return { naming: 'stamped', built: this.meta.built ?? '0' };
  }

  fileUrl(name: string): string {
    const key = this.fileList?.cacheKey(name);
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

/** The text index's doc count, from current.json; undefined if unread. */
async function textDocCount(
  base: string,
  fetchFn: typeof fetch,
  signal?: AbortSignal,
): Promise<number | undefined> {
  try {
    const response = await fetchFn(`${base}current.json?t=${Date.now()}`, {
      signal,
    });
    if (!response.ok) return undefined;
    const { n_docs: docs } = (await response.json()) as { n_docs?: unknown };
    return Number.isSafeInteger(docs) ? (docs as number) : undefined;
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
