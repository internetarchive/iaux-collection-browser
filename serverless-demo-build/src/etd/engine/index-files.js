/** Where the ETD index is published. */
export const DEFAULT_ETD_BASE_URL = 'https://archive.org/download/etd-search/';
/** Field prefixes this port knows how to search. */
const KNOWN_PREFIXES = new Set(['t', 'c', 'a', 'i', 'o']);
/**
 * Checks that the manifest describes an index format this port can read, so
 * a format change fails loudly instead of returning wrong results.
 */
export function checkIndexFormat(meta) {
    if (!(Number.isInteger(meta.n_docs) && meta.n_docs > 0)) {
        throw new Error(`ETD index: bad n_docs ${meta.n_docs}`);
    }
    if (meta.stub_bytes !== 320) {
        throw new Error(`ETD index: stub_bytes ${meta.stub_bytes} is not the 320-byte layout this engine reads`);
    }
    const unknown = Object.keys(meta.prefixed_fields ?? {}).filter(prefix => !KNOWN_PREFIXES.has(prefix));
    if (unknown.length) {
        throw new Error(`ETD index: unknown field prefixes ${unknown.join(', ')}`);
    }
}
/** Ranges per multi-range request unless the caller asks for more. */
const DEFAULT_RANGES_PER_REQUEST = 48;
/**
 * Reads a static index's files: whole small files, and byte ranges of the
 * large ones. Subclasses say how a file name becomes a url.
 */
export class RangeFiles {
    constructor(
    /** The storage-server directory the files are read from. */
    dataUrl, fetchFn) {
        this.dataUrl = dataUrl;
        this.fetchFn = fetchFn;
        this.stats = { requests: 0, bytes: 0 };
    }
    /**
     * Fetches a whole index file as a Response, for callers that stream it
     * (or cache it). Throws on an HTTP error.
     */
    async response(name, options) {
        this.stats.requests += 1;
        const response = await this.fetchFn(this.fileUrl(name), {
            signal: options?.signal,
        });
        if (!response.ok)
            throw new Error(`${name}: HTTP ${response.status}`);
        return response;
    }
    async arrayBuffer(name, options) {
        this.stats.requests += 1;
        const response = await this.fetchFn(this.fileUrl(name), {
            signal: options?.signal,
        });
        if (!response.ok)
            throw new Error(`${name}: HTTP ${response.status}`);
        const buffer = await response.arrayBuffer();
        this.stats.bytes += buffer.byteLength;
        return buffer;
    }
    /** A whole file that an index may not have; undefined on HTTP 404. */
    async optionalArrayBuffer(name, options) {
        this.stats.requests += 1;
        const response = await this.fetchFn(this.fileUrl(name), {
            signal: options?.signal,
        });
        if (response.status === 404)
            return undefined;
        if (!response.ok)
            throw new Error(`${name}: HTTP ${response.status}`);
        const buffer = await response.arrayBuffer();
        this.stats.bytes += buffer.byteLength;
        return buffer;
    }
    /**
     * Reads `length` bytes at `offset`. A shorter answer is returned as is
     * (callers check lengths); a longer one (a server ignoring Range) is cut.
     */
    async range(name, offset, length, options) {
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
        }
        else if (bytes.length > length) {
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
    async ranges(name, parts, rangesPerRequest = DEFAULT_RANGES_PER_REQUEST, options) {
        if (!parts.length)
            return [];
        if (parts.length === 1) {
            return [await this.range(name, parts[0][0], parts[0][1], options)];
        }
        if (parts.length > rangesPerRequest) {
            const out = [];
            for (let i = 0; i < parts.length; i += rangesPerRequest) {
                out.push(...(await this.ranges(name, parts.slice(i, i + rangesPerRequest), rangesPerRequest, options)));
            }
            return out;
        }
        const unique = new Map();
        for (const part of parts)
            unique.set(`${part[0]}_${part[1]}`, part);
        const wanted = [...unique.values()].sort((a, b) => a[0] - b[0]);
        let got;
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
            const boundary = multipartBoundary(response.headers.get('content-type') ?? '');
            if (response.status === 206 && boundary) {
                const body = new Uint8Array(await response.arrayBuffer());
                this.stats.bytes += body.length;
                got = parseByteRanges(body, boundary);
            }
        }
        catch (err) {
            if (options?.signal?.aborted)
                throw err;
            got = undefined;
        }
        return Promise.all(parts.map(([offset, length]) => {
            const hit = got?.get(`${offset}_${length}`);
            return hit && hit.length === length
                ? hit
                : this.range(name, offset, length, options);
        }));
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
    constructor(dataUrl, meta, fetchFn) {
        super(dataUrl, fetchFn);
        this.meta = meta;
    }
    static async open(baseUrl = DEFAULT_ETD_BASE_URL, options = {}) {
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
        const meta = (await response.json());
        checkIndexFormat(meta);
        const dataUrl = new URL('.', response.url || base).href;
        return new EtdIndexFiles(dataUrl, meta, fetchFn);
    }
    /**
     * The url of an index file. Versioned files are immutable, so the version
     * doubles as a stable cache key.
     */
    fileUrl(name) {
        const { v } = this.meta;
        return v
            ? `${this.dataUrl}${name}.${v}?v=${v}`
            : `${this.dataUrl}${name}?v=unversioned`;
    }
}
function multipartBoundary(contentType) {
    const match = contentType.match(/multipart\/byteranges;\s*boundary=("?)([^";]+)\1/i);
    return match?.[2];
}
/**
 * Splits a multipart/byteranges body into its parts, keyed `offset_length`
 * from each part's Content-Range.
 */
export function parseByteRanges(body, boundary) {
    const delimiter = new TextEncoder().encode(`--${boundary}`);
    const starts = [];
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
    const parts = new Map();
    for (let s = 0; s < starts.length - 1; s += 1) {
        const segment = body.subarray(starts[s] + delimiter.length, starts[s + 1]);
        let headerEnd = -1;
        for (let i = 0; i < segment.length - 3; i += 1) {
            if (segment[i] === 13 &&
                segment[i + 1] === 10 &&
                segment[i + 2] === 13 &&
                segment[i + 3] === 10) {
                headerEnd = i;
                break;
            }
        }
        if (headerEnd < 0)
            continue;
        const range = decoder
            .decode(segment.subarray(0, headerEnd))
            .match(/content-range:\s*bytes\s+(\d+)-(\d+)/i);
        if (!range)
            continue;
        const offset = Number(range[1]);
        const length = Number(range[2]) - offset + 1;
        parts.set(`${offset}_${length}`, segment.subarray(headerEnd + 4, headerEnd + 4 + length));
    }
    return parts;
}
