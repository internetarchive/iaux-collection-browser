import { DEFAULT_ETD_BASE_URL, RangeFiles } from '../index-files';
/**
 * Reads the vector store's files. They aren't versioned like the text
 * index's: the names are fixed, and `?v=<built>` keys the browser cache to
 * the build, as on the live page (so centroids.f16 caches across visits).
 */
export class VectorStoreFiles extends RangeFiles {
    constructor(dataUrl, meta, fetchFn) {
        super(dataUrl, fetchFn);
        this.meta = meta;
    }
    static async open(baseUrl = DEFAULT_ETD_BASE_URL, options = {}) {
        const fetchFn = options.fetch ?? fetch.bind(globalThis);
        const base = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
        // Unversioned, so always fetched fresh: a republished store shows at once.
        let response;
        try {
            response = await fetchFn(`${base}ivf-meta.json?t=${Date.now()}`, {
                signal: options.signal,
            });
        }
        catch (err) {
            if (options.signal?.aborted)
                throw err;
        }
        if (!response?.ok) {
            throw new Error('ETD vector store: no ivf-meta.json on this item');
        }
        const meta = (await response.json());
        checkIvfMeta(meta);
        const dataUrl = new URL('.', response.url || base).href;
        return new VectorStoreFiles(dataUrl, meta, fetchFn);
    }
    fileUrl(name) {
        return `${this.dataUrl}${name}?v=${encodeURIComponent(this.meta.built ?? '0')}`;
    }
    /** A small JSON file the store may not have; undefined when it's absent. */
    async optionalJson(name, options) {
        try {
            const buffer = await this.optionalArrayBuffer(name, options);
            return buffer && JSON.parse(new TextDecoder().decode(buffer));
        }
        catch (err) {
            if (options?.signal?.aborted)
                throw err;
            return undefined;
        }
    }
}
/** Checks the manifest is a layout this reader knows, so a change fails loudly. */
export function checkIvfMeta(meta) {
    const positive = (value) => Number.isInteger(value) && value > 0;
    if (!positive(meta.n) || !positive(meta.ncell) || !positive(meta.dim)) {
        throw new Error('ETD vector store: bad n, ncell or dim in ivf-meta.json');
    }
    if (meta.rowbytes !== 4 + meta.dim * 2) {
        throw new Error(`ETD vector store: rowbytes ${meta.rowbytes} isn't a u32 id plus ${meta.dim} halfs`);
    }
    const fields = meta.fields ?? {};
    const widths = ['title', 'host', 'date', 'landing', 'lang'].map(name => fields[name]);
    if (!widths.every(positive) ||
        widths.reduce((sum, width) => sum + width, 0) !== meta.docbytes) {
        throw new Error("ETD vector store: docs.bin's fields don't add up to docbytes");
    }
}
