import { fileSetUrl } from '../../../static-index/files';
import { loadItemFileList } from '../../../static-index/file-list';
import { checkSizes, describeMismatch } from '../../../static-index/size-rules';
import { etdItemId, MEANING_SEARCH, vectorSizeRules } from '../file-checks';
import { RangeFiles } from '../../../static-index/range-files';
import { HttpError } from '../http-error';
import { DEFAULT_ETD_BASE_URL } from '../index-files';
import { retryingFetch } from '../retrying-fetch';
/**
 * Reads the vector store's files. They aren't versioned like the text
 * index's: the names are fixed, and a file can be replaced without
 * ivf-meta.json changing. So each file's url is keyed by its own size and
 * change time from the item's file list, and `open` checks every file's
 * size against ivf-meta.json before a search reads any of them. Without
 * the list, `?v=<built>` keys them all to the build, as on the live page.
 */
export class VectorStoreFiles extends RangeFiles {
    constructor(dataUrl, meta, fetchFn, fileList, itemId, textDocs) {
        super(dataUrl, fetchFn);
        this.meta = meta;
        this.fileList = fileList;
        this.fileCheck = {
            itemId,
            sizes: fileList && checkSizes(vectorSizeRules(meta, textDocs), fileList),
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
            throw new HttpError(`ETD vector store: ivf-meta.json HTTP ${response.status}`, response.status);
        }
        const meta = (await response.json());
        checkIvfMeta(meta);
        const dataUrl = new URL('.', response.url || base).href;
        const files = new VectorStoreFiles(dataUrl, meta, fetchFn, await fileList, itemId, await textDocs);
        files.stats.retries = manifestRetries;
        // Files that don't fit ivf-meta.json would be read as the wrong rows.
        const mismatch = files.fileCheck.sizes?.checks.find(check => check.status === 'mismatch' && check.rule.layer === MEANING_SEARCH);
        if (mismatch) {
            throw new FileCheckError(`ETD vector store: its files don't match ivf-meta.json: ${describeMismatch(mismatch)}`, files.fileCheck);
        }
        return files;
    }
    /** Fixed names, keyed to the build stamp ('0' for a store without one). */
    get fileSet() {
        return { naming: 'stamped', built: this.meta.built ?? '0' };
    }
    fileUrl(name) {
        const key = this.fileList?.cacheKey(name);
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
/** The text index's doc count, from current.json; undefined if unread. */
async function textDocCount(base, fetchFn, signal) {
    try {
        const response = await fetchFn(`${base}current.json?t=${Date.now()}`, {
            signal,
        });
        if (!response.ok)
            return undefined;
        const { n_docs: docs } = (await response.json());
        return Number.isSafeInteger(docs) ? docs : undefined;
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
