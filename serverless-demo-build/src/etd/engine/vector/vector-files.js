import { fileSetUrl } from '../../../static-index/files';
import { loadItemFileList } from '../../../static-index/file-list';
import { checkSizes, describeMismatch } from '../../../static-index/size-rules';
import { etdItemId, MEANING_SEARCH, vectorSizeRules } from '../file-checks';
import { RangeFiles } from '../../../static-index/range-files';
import { HttpError } from '../http-error';
import { DEFAULT_ETD_BASE_URL } from '../index-files';
import { retryingFetch } from '../retrying-fetch';
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
    constructor(dataUrl, meta, fetchFn, fileList, itemId, textDocs, 
    /** The text index's version, when the store's names carry it. */
    version) {
        super(dataUrl, fetchFn);
        this.meta = meta;
        this.fileList = fileList;
        this.version = version;
        this.fileCheck = {
            itemId,
            sizes: fileList &&
                checkSizes(vectorSizeRules(meta, textDocs, version), fileList),
        };
    }
    static async open(baseUrl = DEFAULT_ETD_BASE_URL, options = {}) {
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
        const { response, version } = await findIvfMeta(base, retryingFetch(fetchFn, {
            onRetry: () => {
                manifestRetries += 1;
            },
        }), () => textIndex.then(index => index?.version), options.signal);
        if (response.status === 404) {
            throw new Error('ETD vector store: no ivf-meta.json on this item');
        }
        if (!response.ok) {
            throw new HttpError(`ETD vector store: ivf-meta.json HTTP ${response.status}`, response.status);
        }
        const meta = (await response.json());
        checkIvfMeta(meta);
        const dataUrl = new URL('.', response.url || base).href;
        const files = new VectorStoreFiles(dataUrl, meta, fetchFn, await fileList, itemId, itemId ? (await textIndex)?.docs : undefined, version);
        files.stats.retries = manifestRetries;
        // Files that don't fit ivf-meta.json would be read as the wrong rows.
        const mismatch = files.fileCheck.sizes?.checks.find(check => check.status === 'mismatch' && check.rule.layer === MEANING_SEARCH);
        if (mismatch) {
            throw new FileCheckError(`ETD vector store: its files don't match ivf-meta.json: ${describeMismatch(mismatch)}`, files.fileCheck);
        }
        return files;
    }
    /**
     * `<name>.<v>`, or fixed names keyed to the build stamp ('0' for a store
     * without one).
     */
    get fileSet() {
        return this.version
            ? { naming: 'versioned', version: this.version }
            : { naming: 'stamped', built: this.meta.built ?? '0' };
    }
    fileUrl(name) {
        // A versioned name never changes, so its version is the cache key.
        const key = this.version ? undefined : this.fileList?.cacheKey(name);
        return key
            ? `${this.dataUrl}${name}?v=${key}`
            : fileSetUrl(this.dataUrl, this.fileSet, name);
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
/** Opening stopped by a file check; the check says what didn't fit. */
export class FileCheckError extends Error {
    constructor(message, fileCheck) {
        super(message);
        this.fileCheck = fileCheck;
        this.name = 'FileCheckError';
    }
}
/**
 * The vector store's manifest: the fixed-name ivf-meta.json, always fetched
 * fresh so a republished store shows at once, or else the one carrying the
 * text index's version. `response` is the fixed name's 404 when neither is
 * there. `textVersion` is only asked for after that 404.
 */
export async function findIvfMeta(base, fetchFn, textVersion, signal) {
    const fixed = await fetchFn(`${base}ivf-meta.json?t=${Date.now()}`, {
        signal,
    });
    if (fixed.status !== 404)
        return { response: fixed };
    const version = await textVersion();
    if (!version)
        return { response: fixed };
    const versioned = await fetchFn(`${base}ivf-meta.json.${version}`, {
        signal,
    });
    return versioned.status === 404
        ? { response: fixed }
        : { response: versioned, version };
}
/** current.json's version and doc count, each undefined if unread. */
export async function readTextIndex(base, fetchFn, signal) {
    try {
        const response = await fetchFn(`${base}current.json?t=${Date.now()}`, {
            signal,
        });
        if (!response.ok)
            return undefined;
        const { v, n_docs: docs } = (await response.json());
        return {
            version: typeof v === 'string' && v ? v : undefined,
            docs: Number.isSafeInteger(docs) ? docs : undefined,
        };
    }
    catch (err) {
        if (signal?.aborted)
            throw err;
        return undefined;
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
