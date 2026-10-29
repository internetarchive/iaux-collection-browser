import type { EtdCallOptions } from '../etd-engine';
import type { EtdIndexFiles } from './index-files';

/**
 * Per-thesis facet values, for counting a query's matches and filtering
 * them: year, flags (sources, availability), language, country and degree
 * level.
 *
 * facets-meta.json describes the rows; facets.gz.json holds one row per doc,
 * gzipped (~29 MB for 25.9M docs, 8 bytes a row unpacked). It's read whole,
 * once, and only the five bytes used here are kept (~130 MB), so counts and
 * filters cover every match, not just the top-ranked ones.
 *
 * Ported from etd-search/search.html (loadFacetSidecar, frow, yearOf; page
 * build p112).
 */

/** The parts of facets-meta.json read here. */
export interface EtdFacetMeta {
  /** Rows in facets.gz.json: must equal the index's doc count. */
  n: number;
  /** Bytes per row in facets.gz.json. */
  stride: number;
  /** How the year byte encodes a year; see yearFromByte. */
  year_enc?: number;
  /** Language codes (ISO 639-1); a row's language byte is index + 1. */
  langs: string[];
  /** Country codes (ISO 3166 alpha-2); a row's country byte is index + 1. */
  countries?: string[];
  /** Flag name -> bit, in flags(): byte 1, then byte 6 above it. */
  flag_bits?: Record<string, number>;
  /** Where the degree level sits in byte 6, and its codes. */
  levels?: {
    byte?: number;
    shift: number;
    mask: number;
    codes: Record<string, number>;
  };
}

/** Row byte offsets, per facets-meta.json's `fields`. */
const YEAR_BYTE = 0;
const FLAGS_BYTE = 1;
const LANGUAGE_BYTE = 4;
const COUNTRY_BYTE = 5;
/** More source flags (bits 0-1) and the degree level (bits 2-4). */
const EXTRA_BYTE = 6;

/** The Cache Storage cache holding facets.gz.json across visits. */
const CACHE_NAME = 'etd-facet-cache';

/**
 * A year byte as a calendar year; 0 when unknown.
 * - encoding 1 (builds before 2026-10-19): 1900 + byte;
 * - encoding 2: bytes 1-20 are the decades 1700-1890 (as their first
 *   year), 21-255 the years 1900-2134.
 */
export function yearFromByte(byte: number, encoding = 1): number {
  if (!byte) return 0;
  if (encoding !== 2) return 1900 + byte;
  return byte <= 20 ? 1700 + 10 * (byte - 1) : 1900 + (byte - 21);
}

/** The row bytes kept, one array per byte, indexed by docId - 1. */
export interface EtdFacetBytes {
  years: Uint8Array;
  flags: Uint8Array;
  languages: Uint8Array;
  countries: Uint8Array;
  extras: Uint8Array;
}

/** Every doc's facet values, read from the whole facets file. */
export class EtdFacetRows {
  /** Degree level number -> its code (e.g. 1 -> 'phd'). */
  private readonly levelCodes: Map<number, string>;

  constructor(
    private readonly meta: EtdFacetMeta,
    private readonly bytes: EtdFacetBytes,
  ) {
    this.levelCodes = new Map(
      Object.entries(meta.levels?.codes ?? {}).map(([code, n]) => [n, code]),
    );
  }

  /** A doc's year; 0 when unknown (or the id is out of range). */
  year(docId: number): number {
    return yearFromByte(this.bytes.years[docId - 1] ?? 0, this.meta.year_enc);
  }

  /** A doc's language code; undefined when unknown. */
  language(docId: number): string | undefined {
    const index = this.bytes.languages[docId - 1] ?? 0;
    return index ? this.meta.langs[index - 1] : undefined;
  }

  /** A doc's country code; undefined when unknown. */
  country(docId: number): string | undefined {
    const index = this.bytes.countries[docId - 1] ?? 0;
    return index ? this.meta.countries?.[index - 1] : undefined;
  }

  /** Whether a doc has the named flag (a name in facets-meta's flag_bits). */
  hasFlag(docId: number, name: string): boolean {
    const bit = this.meta.flag_bits?.[name];
    if (!bit) return false;
    const flags =
      (this.bytes.flags[docId - 1] ?? 0) |
      ((this.bytes.extras[docId - 1] ?? 0) << 8);
    return (flags & bit) !== 0;
  }

  /** The flag names facets-meta defines. */
  get flagNames(): string[] {
    return Object.keys(this.meta.flag_bits ?? {});
  }

  /** A doc's degree level code (e.g. 'phd'); undefined when unknown. */
  level(docId: number): string | undefined {
    const { levels } = this.meta;
    if (!levels) return undefined;
    const n =
      ((this.bytes.extras[docId - 1] ?? 0) >> levels.shift) & levels.mask;
    return this.levelCodes.get(n);
  }
}

export interface EtdFacetsOptions {
  /** Keep facets.gz.json in Cache Storage across visits (default true). */
  cache?: boolean;
}

/**
 * The index's facets, loaded on first use: the meta file, then the whole
 * rows file. Concurrent callers share one load; a failed load is retried
 * by the next caller.
 */
export class EtdFacets {
  private loading?: Promise<EtdFacetRows>;

  constructor(
    private readonly files: EtdIndexFiles,
    private readonly options: EtdFacetsOptions = {},
  ) {}

  rows(options?: EtdCallOptions): Promise<EtdFacetRows> {
    if (!this.loading) {
      // Not tied to one caller's abort: other searches may be waiting on it.
      this.loading = this.load();
      this.loading.catch(() => {
        this.loading = undefined;
      });
    }
    return abortable(this.loading, options?.signal);
  }

  private async load(): Promise<EtdFacetRows> {
    const metaBytes = await this.files.arrayBuffer('facets-meta.json');
    const meta = JSON.parse(
      new TextDecoder().decode(metaBytes),
    ) as EtdFacetMeta;
    // A facets file from another build would attach the wrong rows to docs.
    if (meta.n !== this.files.meta.n_docs) {
      throw new Error(
        `ETD facets: ${meta.n} rows for ${this.files.meta.n_docs} docs`,
      );
    }
    const response = await this.cachedResponse('facets.gz.json');
    if (!response.body) throw new Error('ETD facets: empty facets.gz.json');
    const [years, flags, languages, countries, extras] = await keepBytes(
      response.body.pipeThrough(new DecompressionStream('gzip')),
      meta.n,
      meta.stride,
      [YEAR_BYTE, FLAGS_BYTE, LANGUAGE_BYTE, COUNTRY_BYTE, EXTRA_BYTE],
    );
    return new EtdFacetRows(meta, {
      years,
      flags,
      languages,
      countries,
      extras,
    });
  }

  /** The file from Cache Storage when there, else fetched (and cached). */
  private async cachedResponse(name: string): Promise<Response> {
    const url = this.files.fileUrl(name);
    let cache: Cache | undefined;
    if (this.options.cache !== false) {
      try {
        cache = await caches.open(CACHE_NAME);
        const hit = await cache.match(url);
        if (hit) return hit;
      } catch {
        cache = undefined; // e.g. a private window: no Cache Storage
      }
    }
    const response = await this.files.response(name);
    if (!cache) return response;
    try {
      await cache.put(url, response.clone());
      // Drop older index versions' copies.
      for (const request of await cache.keys()) {
        if (request.url !== new Request(url).url) await cache.delete(request);
      }
    } catch {
      // Caching is an optimisation; the response is still good.
    }
    return response;
  }
}

/**
 * Streams `rows` rows of `stride` bytes and keeps only the bytes at
 * `offsets` in each, one array per offset.
 */
export async function keepBytes(
  stream: ReadableStream<Uint8Array>,
  rows: number,
  stride: number,
  offsets: readonly number[],
): Promise<Uint8Array[]> {
  const kept = offsets.map(() => new Uint8Array(rows));
  const reader = stream.getReader();
  let position = 0; // byte position in the whole unpacked file
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    offsets.forEach((offset, k) => {
      const out = kept[k];
      // The first byte in this chunk at `offset` within its row.
      let i = (offset - (position % stride) + stride) % stride;
      for (; i < value.length; i += stride) {
        const row = (position + i - offset) / stride;
        if (row < rows) out[row] = value[i];
      }
    });
    position += value.length;
  }
  if (position < rows * stride) {
    throw new Error(
      `ETD facets: ${position} bytes for ${rows} rows of ${stride}`,
    );
  }
  return kept;
}

/** `promise`, rejecting early with AbortError if `signal` aborts. */
function abortable<T>(promise: Promise<T>, signal?: AbortSignal): Promise<T> {
  if (!signal) return promise;
  if (signal.aborted) {
    return Promise.reject(new DOMException('Aborted', 'AbortError'));
  }
  return new Promise<T>((resolve, reject) => {
    const onAbort = () => reject(new DOMException('Aborted', 'AbortError'));
    signal.addEventListener('abort', onAbort, { once: true });
    promise.then(
      value => {
        signal.removeEventListener('abort', onAbort);
        resolve(value);
      },
      err => {
        signal.removeEventListener('abort', onAbort);
        reject(err);
      },
    );
  });
}

/**
 * A facet the engine counts and filters by: how to read a doc's values for
 * it from the rows, and how several required values combine. The engine is
 * handed these, so it knows no facet by name.
 */
export interface EtdFacetReader {
  key: string;
  /** A match needs any of the included values (default) or all of them. */
  combine?: 'any' | 'all';
  /** Calls `add` with each of the doc's values for this facet, as codes. */
  read(rows: EtdFacetRows, docId: number, add: (code: string) => void): void;
}
