import type { EtdCallOptions } from '../etd-engine';

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

/** Requests and bytes fetched, for diagnostics. */
export interface EtdFetchStats {
  requests: number;
  bytes: number;
}

/** Ranges per multi-range request unless the caller asks for more. */
const DEFAULT_RANGES_PER_REQUEST = 48;

/**
 * Reads a static index's files: whole small files, and byte ranges of the
 * large ones. Subclasses say how a file name becomes a url.
 */
export abstract class RangeFiles {
  readonly stats: EtdFetchStats = { requests: 0, bytes: 0 };

  protected constructor(
    /** The storage-server directory the files are read from. */
    readonly dataUrl: string,
    protected readonly fetchFn: typeof fetch,
  ) {}

  /** The url of a file, with a query string (range reads append to it). */
  abstract fileUrl(name: string): string;

  /**
   * Fetches a whole index file as a Response, for callers that stream it
   * (or cache it). Throws on an HTTP error.
   */
  async response(name: string, options?: EtdCallOptions): Promise<Response> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    return response;
  }

  async arrayBuffer(
    name: string,
    options?: EtdCallOptions,
  ): Promise<ArrayBuffer> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    this.stats.bytes += buffer.byteLength;
    return buffer;
  }

  /** A whole file that an index may not have; undefined on HTTP 404. */
  async optionalArrayBuffer(
    name: string,
    options?: EtdCallOptions,
  ): Promise<ArrayBuffer | undefined> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (response.status === 404) return undefined;
    if (!response.ok) throw new Error(`${name}: HTTP ${response.status}`);
    const buffer = await response.arrayBuffer();
    this.stats.bytes += buffer.byteLength;
    return buffer;
  }

  /**
   * Reads `length` bytes at `offset`. A shorter answer is returned as is
   * (callers check lengths); a longer one (a server ignoring Range) is cut.
   */
  async range(
    name: string,
    offset: number,
    length: number,
    options?: EtdCallOptions,
  ): Promise<Uint8Array> {
    this.stats.requests += 1;
    // A distinct url per (offset, length): concurrent Range reads of one shared
    // url have been seen to get each other's bytes from some HTTP stacks. Keyed
    // this way a repeat read of the same range is still a browser-cache hit.
    const url = `${this.fileUrl(name)}&u=${offset}_${length}`;
    const response = await this.fetchFn(url, {
      headers: { Range: `bytes=${offset}-${offset + length - 1}` },
      signal: options?.signal,
    });
    if (!(response.status === 206 || response.status === 200)) {
      throw new Error(`${name}: HTTP ${response.status}`);
    }
    let bytes = new Uint8Array(await response.arrayBuffer());
    if (response.status === 200 && bytes.length > length) {
      // The whole file came back: take our range out of it.
      bytes = bytes.slice(offset, offset + length);
    } else if (bytes.length > length) {
      bytes = bytes.slice(0, length);
    }
    this.stats.bytes += bytes.length;
    return bytes;
  }

  /**
   * Reads several ranges of one file, in as few requests as possible: the
   * storage servers answer a multi-range header with multipart/byteranges.
   * Returns one result per requested range, in order. Any part the multipart
   * answer lacks is read on its own, so correctness never depends on it.
   */
  async ranges(
    name: string,
    parts: readonly (readonly [number, number])[],
    rangesPerRequest = DEFAULT_RANGES_PER_REQUEST,
    options?: EtdCallOptions,
  ): Promise<Uint8Array[]> {
    if (!parts.length) return [];
    if (parts.length === 1) {
      return [await this.range(name, parts[0][0], parts[0][1], options)];
    }
    if (parts.length > rangesPerRequest) {
      const out: Uint8Array[] = [];
      for (let i = 0; i < parts.length; i += rangesPerRequest) {
        out.push(
          ...(await this.ranges(
            name,
            parts.slice(i, i + rangesPerRequest),
            rangesPerRequest,
            options,
          )),
        );
      }
      return out;
    }

    const unique = new Map<string, readonly [number, number]>();
    for (const part of parts) unique.set(`${part[0]}_${part[1]}`, part);
    const wanted = [...unique.values()].sort((a, b) => a[0] - b[0]);

    let got: Map<string, Uint8Array> | undefined;
    try {
      this.stats.requests += 1;
      const url = `${this.fileUrl(name)}&u=m${wanted.length}_${wanted[0][0]}`;
      const header = `bytes=${wanted
        .map(([offset, length]) => `${offset}-${offset + length - 1}`)
        .join(', ')}`;
      const response = await this.fetchFn(url, {
        headers: { Range: header },
        signal: options?.signal,
      });
      const boundary = multipartBoundary(
        response.headers.get('content-type') ?? '',
      );
      if (response.status === 206 && boundary) {
        const body = new Uint8Array(await response.arrayBuffer());
        this.stats.bytes += body.length;
        got = parseByteRanges(body, boundary);
      }
    } catch (err) {
      if (options?.signal?.aborted) throw err;
      got = undefined;
    }

    return Promise.all(
      parts.map(([offset, length]) => {
        const hit = got?.get(`${offset}_${length}`);
        return hit && hit.length === length
          ? hit
          : this.range(name, offset, length, options);
      }),
    );
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
    const response = await fetchFn(`${base}current.json?t=${Date.now()}`, {
      signal: options.signal,
    });
    if (!response.ok) {
      throw new Error(`ETD index: current.json HTTP ${response.status}`);
    }
    const meta = (await response.json()) as EtdIndexMeta;
    checkIndexFormat(meta);
    const dataUrl = new URL('.', response.url || base).href;
    return new EtdIndexFiles(dataUrl, meta, fetchFn);
  }

  /**
   * The url of an index file. Versioned files are immutable, so the version
   * doubles as a stable cache key.
   */
  fileUrl(name: string): string {
    const { v } = this.meta;
    return v
      ? `${this.dataUrl}${name}.${v}?v=${v}`
      : `${this.dataUrl}${name}?v=unversioned`;
  }
}

function multipartBoundary(contentType: string): string | undefined {
  const match = contentType.match(
    /multipart\/byteranges;\s*boundary=("?)([^";]+)\1/i,
  );
  return match?.[2];
}

/**
 * Splits a multipart/byteranges body into its parts, keyed `offset_length`
 * from each part's Content-Range.
 */
export function parseByteRanges(
  body: Uint8Array,
  boundary: string,
): Map<string, Uint8Array> {
  const delimiter = new TextEncoder().encode(`--${boundary}`);
  const starts: number[] = [];
  for (let i = 0; i <= body.length - delimiter.length; i += 1) {
    let hit = true;
    for (let j = 0; j < delimiter.length; j += 1) {
      if (body[i + j] !== delimiter[j]) {
        hit = false;
        break;
      }
    }
    if (hit) {
      starts.push(i);
      i += delimiter.length - 1;
    }
  }

  const decoder = new TextDecoder();
  const parts = new Map<string, Uint8Array>();
  for (let s = 0; s < starts.length - 1; s += 1) {
    const segment = body.subarray(starts[s] + delimiter.length, starts[s + 1]);
    let headerEnd = -1;
    for (let i = 0; i < segment.length - 3; i += 1) {
      if (
        segment[i] === 13 &&
        segment[i + 1] === 10 &&
        segment[i + 2] === 13 &&
        segment[i + 3] === 10
      ) {
        headerEnd = i;
        break;
      }
    }
    if (headerEnd < 0) continue;
    const range = decoder
      .decode(segment.subarray(0, headerEnd))
      .match(/content-range:\s*bytes\s+(\d+)-(\d+)/i);
    if (!range) continue;
    const offset = Number(range[1]);
    const length = Number(range[2]) - offset + 1;
    parts.set(
      `${offset}_${length}`,
      segment.subarray(headerEnd + 4, headerEnd + 4 + length),
    );
  }
  return parts;
}
