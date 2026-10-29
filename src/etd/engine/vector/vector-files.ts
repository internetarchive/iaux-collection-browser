import { fileSetUrl } from '../../../static-index/files';
import type { FileSet } from '../../../static-index/manifest';
import type { EtdCallOptions } from '../../etd-engine';
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
  /** Bits a dimension in cell-codes.bin. */
  code_bits?: number;
  /** The store's build stamp, e.g. '2026-10-12 11:31'. */
  built?: string;
}

/**
 * Reads the vector store's files. They aren't versioned like the text
 * index's: the names are fixed, and `?v=<built>` keys the browser cache to
 * the build, as on the live page (so centroids.f16 caches across visits).
 */
export class VectorStoreFiles extends RangeFiles {
  private constructor(
    dataUrl: string,
    readonly meta: IvfMeta,
    fetchFn: typeof fetch,
  ) {
    super(dataUrl, fetchFn);
  }

  static async open(
    baseUrl: string = DEFAULT_ETD_BASE_URL,
    options: EtdCallOptions & { fetch?: typeof fetch } = {},
  ): Promise<VectorStoreFiles> {
    const fetchFn = options.fetch ?? fetch.bind(globalThis);
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
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
    const files = new VectorStoreFiles(dataUrl, meta, fetchFn);
    files.stats.retries = manifestRetries;
    return files;
  }

  /** Fixed names, keyed to the build stamp ('0' for a store without one). */
  get fileSet(): FileSet {
    return { naming: 'stamped', built: this.meta.built ?? '0' };
  }

  fileUrl(name: string): string {
    return fileSetUrl(this.dataUrl, this.fileSet, name);
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
