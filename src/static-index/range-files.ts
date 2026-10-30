/**
 * Reading a static index's files from archive.org: whole small files, and
 * byte ranges of the large ones, batched into multi-range requests.
 */

import { HttpError } from '../etd/engine/http-error';
import { retryingFetch } from '../etd/engine/retrying-fetch';

/** Lets a caller abandon a read. */
export interface CallOptions {
  signal?: AbortSignal;
}

/** Requests and bytes fetched, for diagnostics. */
export interface FetchStats {
  requests: number;
  bytes: number;
  /** Requests asked again after a 5xx or no answer (see retrying-fetch.ts). */
  retries: number;
}

/** Ranges per multi-range request unless the caller asks for more. */
const DEFAULT_RANGES_PER_REQUEST = 48;

/**
 * Reads a static index's files: whole small files, and byte ranges of the
 * large ones. Subclasses say how a file name becomes a url.
 */
export abstract class RangeFiles {
  readonly stats: FetchStats = { requests: 0, bytes: 0, retries: 0 };

  /** Every read goes through this: it retries archive.org's 5xx answers. */
  protected readonly fetchFn: typeof fetch;

  protected constructor(
    /** The storage-server directory the files are read from. */
    readonly dataUrl: string,
    fetchFn: typeof fetch,
  ) {
    this.fetchFn = retryingFetch(fetchFn, {
      onRetry: () => {
        this.stats.retries += 1;
      },
    });
  }

  /** The url of a file, with a query string (range reads append to it). */
  abstract fileUrl(name: string): string;

  /**
   * Fetches a whole index file as a Response, for callers that stream it
   * (or cache it). Throws on an HTTP error.
   */
  async response(name: string, options?: CallOptions): Promise<Response> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (!response.ok)
      throw new HttpError(`${name}: HTTP ${response.status}`, response.status);
    return response;
  }

  async arrayBuffer(name: string, options?: CallOptions): Promise<ArrayBuffer> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (!response.ok)
      throw new HttpError(`${name}: HTTP ${response.status}`, response.status);
    const buffer = await response.arrayBuffer();
    this.stats.bytes += buffer.byteLength;
    return buffer;
  }

  /** A whole file that an index may not have; undefined on HTTP 404. */
  async optionalArrayBuffer(
    name: string,
    options?: CallOptions,
  ): Promise<ArrayBuffer | undefined> {
    this.stats.requests += 1;
    const response = await this.fetchFn(this.fileUrl(name), {
      signal: options?.signal,
    });
    if (response.status === 404) return undefined;
    if (!response.ok)
      throw new HttpError(`${name}: HTTP ${response.status}`, response.status);
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
    options?: CallOptions,
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
      throw new HttpError(`${name}: HTTP ${response.status}`, response.status);
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
    options?: CallOptions,
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

  /**
   * `ranges`, for many scattered ranges: `rangesPerRequest` a request, with
   * up to `parallel` requests in flight rather than one after another.
   * Scattered ranges cost the storage server a disk seek each, so a request
   * of many waits on all of them: 3,000 records read 256 a request, one
   * after another, took 25-34 s cold; 64 a request, 6 at once, 7-9 s.
   */
  async rangesInParallel(
    name: string,
    parts: readonly (readonly [number, number])[],
    rangesPerRequest: number,
    parallel: number,
    options?: CallOptions,
  ): Promise<Uint8Array[]> {
    const out: Uint8Array[] = new Array(parts.length);
    const starts: number[] = [];
    for (let i = 0; i < parts.length; i += rangesPerRequest) starts.push(i);
    let next = 0;
    await Promise.all(
      Array.from(
        { length: Math.min(Math.max(1, parallel), starts.length) },
        async () => {
          while (next < starts.length) {
            const start = starts[next];
            next += 1;
            const chunk = parts.slice(start, start + rangesPerRequest);
            const read = await this.ranges(
              name,
              chunk,
              rangesPerRequest,
              options,
            );
            read.forEach((bytes, i) => {
              out[start + i] = bytes;
            });
          }
        },
      ),
    );
    return out;
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
