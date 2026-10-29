import { fileSetUrl } from '../../static-index/files';
import type { FileSet } from '../../static-index/manifest';
import { RangeFiles } from '../../static-index/range-files';
import type { EtdCallOptions } from '../etd-engine';
import { HttpError } from './http-error';
import { retryingFetch } from './retrying-fetch';

/** Where the ETD index is published. */
export const DEFAULT_ETD_BASE_URL = 'https://archive.org/download/etd-search/';

/**
 * The fields of the index manifest (current.json) the engine reads. The
 * manifest carries more (build inputs, timings); those are informational.
 */
export interface EtdIndexMeta {
  /** Version tag; every index file name is suffixed with it. */
  v?: string;
  n_docs: number;
  /** Bytes per stubs.bin record. The record layout is fixed at 320. */
  stub_bytes: number;
  /** Whether postings carry field-local positions. */
  positional?: boolean;
  /** Whether posfwd.dir/posfwd.bin (per-doc token text) exist. */
  posfwd?: boolean;
  /** Field prefixes beyond the base four, e.g. { o: 'orcid' }. */
  prefixed_fields?: Record<string, string>;
}

/** Field prefixes this port knows how to search. */
const KNOWN_PREFIXES = new Set(['t', 'c', 'a', 'i', 'o']);

/**
 * Checks that the manifest describes an index format this port can read, so
 * a format change fails loudly instead of returning wrong results.
 */
export function checkIndexFormat(meta: EtdIndexMeta): void {
  if (!(Number.isInteger(meta.n_docs) && meta.n_docs > 0)) {
    throw new Error(`ETD index: bad n_docs ${meta.n_docs}`);
  }
  if (meta.stub_bytes !== 320) {
    throw new Error(
      `ETD index: stub_bytes ${meta.stub_bytes} is not the 320-byte layout this engine reads`,
    );
  }
  const unknown = Object.keys(meta.prefixed_fields ?? {}).filter(
    prefix => !KNOWN_PREFIXES.has(prefix),
  );
  if (unknown.length) {
    throw new Error(`ETD index: unknown field prefixes ${unknown.join(', ')}`);
  }
}

/**
 * Reads the ETD index's files: the manifest, whole small files, and byte
 * ranges of the large ones.
 *
 * The index item's download url redirects to a storage server. Every range
 * read through the redirect would pay an extra round trip (and a second CORS
 * preflight), so `open` follows it once, for the manifest, and reads
 * everything else from where it landed.
 */
export class EtdIndexFiles extends RangeFiles {
  private constructor(
    dataUrl: string,
    readonly meta: EtdIndexMeta,
    fetchFn: typeof fetch,
  ) {
    super(dataUrl, fetchFn);
  }

  static async open(
    baseUrl: string = DEFAULT_ETD_BASE_URL,
    options: EtdCallOptions & { fetch?: typeof fetch } = {},
  ): Promise<EtdIndexFiles> {
    const fetchFn = options.fetch ?? fetch.bind(globalThis);
    const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    // current.json is the last file written on publish, so it never points at
    // a version whose files are still uploading. Always fetched fresh.
    let manifestRetries = 0;
    const response = await retryingFetch(fetchFn, {
      onRetry: () => {
        manifestRetries += 1;
      },
    })(`${base}current.json?t=${Date.now()}`, {
      signal: options.signal,
    });
    if (!response.ok) {
      throw new HttpError(
        `ETD index: current.json HTTP ${response.status}`,
        response.status,
      );
    }
    const meta = (await response.json()) as EtdIndexMeta;
    checkIndexFormat(meta);
    const dataUrl = new URL('.', response.url || base).href;
    const files = new EtdIndexFiles(dataUrl, meta, fetchFn);
    files.stats.retries = manifestRetries;
    return files;
  }

  /**
   * How the index's files are named: `<name>.<v>`, or for an index with no
   * version, fixed names under one 'unversioned' cache key.
   */
  get fileSet(): FileSet {
    const { v } = this.meta;
    return v
      ? { naming: 'versioned', version: v }
      : { naming: 'stamped', built: 'unversioned' };
  }

  fileUrl(name: string): string {
    return fileSetUrl(this.dataUrl, this.fileSet, name);
  }
}
