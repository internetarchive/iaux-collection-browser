/**
 * Turns a query into the vector the store was built with, in the browser:
 * transformers.js and multilingual-e5-small, as on the live page (ensureModel,
 * _loadModel, embedQuery).
 *
 * - transformers.js comes from jsDelivr, pinned, the same build as the live
 *   page's, so a query gets the same vector on both. It isn't a dependency of
 *   this package: it's only fetched when someone searches by meaning.
 * - The model files come from the item itself (`<item>/Xenova/...`), not
 *   Hugging Face's CDN.
 * - They're kept in Cache Storage under the live page's cache and keys
 *   (`etd-model-cache`, keyed by the path within the item), so this page and
 *   the live one share one download on the same origin.
 * - New here: a file missing from the cache is read as several Range
 *   requests at once, which archive.org serves much faster than one stream.
 */
import { modelLibraryUrl } from '../../../static-index/model';
import { HttpError } from '../http-error';
import { retryingFetch } from '../retrying-fetch';
/** The live page's build of transformers.js, which embedded the store. */
export const MODEL_LIBRARY = {
    name: '@huggingface/transformers',
    version: '3.0.2',
};
export const TRANSFORMERS_URL = modelLibraryUrl(MODEL_LIBRARY);
export const MODEL_ID = 'Xenova/multilingual-e5-small';
/**
 * How queries are embedded, as the store's build embedded abstracts: e5
 * wants a "query: " prefix, mean pooling, and normalised vectors.
 */
export const QUERY_EMBEDDING = {
    dtype: 'q8',
    queryPrefix: 'query: ',
    pooling: 'mean',
    normalize: true,
};
const MODEL_CACHE = 'etd-model-cache';
/**
 * A model file's cache key: its path within the item. The url embeds
 * whichever host served it (an archive.org storage server, which can change,
 * or the dev proxy), so the key drops it. The live page's _mkey.
 */
export function modelCacheKey(request) {
    let url;
    try {
        url = typeof request === 'string' ? request : request.url;
    }
    catch {
        url = String(request);
    }
    return `https://etd-model.cache/${String(url)
        .replace(/^https?:\/\/[^/]+\/\d+\/items\//i, '')
        .replace(/^https?:\/\/[^/]+\/download\//i, '')
        .replace(/^https?:\/\/[^/]+\//i, '')
        .replace(/[?#].*$/, '')}`;
}
async function openCache() {
    try {
        return typeof caches === 'undefined'
            ? undefined
            : await caches.open(MODEL_CACHE);
    }
    catch {
        return undefined;
    }
}
/** First range read: big enough for the small files to need no second one. */
const FIRST_RANGE = 1 << 20;
/**
 * Reads a whole file as `parallel` Range requests at once: one to learn the
 * size (and get the start), then the rest in equal parts. A server that
 * ignores Range just answers the first request with the whole file.
 */
export async function fetchInParallel(url, parallel, fetchFn, onBytes) {
    const first = await fetchFn(url, {
        headers: { Range: `bytes=0-${FIRST_RANGE - 1}` },
    });
    if (!first.ok)
        return first;
    const size = Number(first.headers.get('content-range')?.match(/\/(\d+)$/)?.[1] ?? NaN);
    const head = new Uint8Array(await first.arrayBuffer());
    if (first.status !== 206 || !(size > head.length)) {
        onBytes(head.length, head.length);
        return new Response(head, {
            headers: { 'content-length': String(head.length) },
        });
    }
    onBytes(head.length, size);
    const body = new Uint8Array(size);
    body.set(head);
    const rest = size - head.length;
    const partSize = Math.ceil(rest / Math.max(1, parallel));
    await Promise.all(Array.from({ length: Math.ceil(rest / partSize) }, async (_, i) => {
        const from = head.length + i * partSize;
        const to = Math.min(size, from + partSize);
        const response = await fetchFn(url, {
            headers: { Range: `bytes=${from}-${to - 1}` },
        });
        if (response.status !== 206) {
            throw new HttpError(`${url}: HTTP ${response.status} for a range`, response.status);
        }
        // Read as a stream, so progress moves as bytes arrive.
        const reader = response.body.getReader();
        let at = from;
        for (;;) {
            const { done, value } = await reader.read();
            if (done)
                break;
            if (at + value.length > to)
                throw new Error(`${url}: long range`);
            body.set(value, at);
            at += value.length;
            onBytes(value.length, 0);
        }
        if (at !== to)
            throw new Error(`${url}: short range`);
    }));
    return new Response(body, { headers: { 'content-length': String(size) } });
}
/** The model file cache transformers.js reads through (`env.customCache`). */
export function modelFileCache(options) {
    const { parallel, fetchFn, onBytes } = options;
    return {
        async match(request) {
            const cache = await openCache();
            const hit = await cache?.match(modelCacheKey(request));
            if (hit || parallel <= 1)
                return hit;
            // A miss: fetch it here, in parallel parts, and keep it. transformers.js
            // then reads it as if it had been cached.
            const url = typeof request === 'string' ? request : String(request);
            const response = await fetchInParallel(url, parallel, fetchFn, onBytes);
            // A 404 is a file the model doesn't have: transformers.js knows which
            // are optional. A server failing (after the retries) fails the load,
            // rather than transformers.js trying once more without retries.
            if (response.status >= 500) {
                throw new HttpError(`${url}: HTTP ${response.status}`, response.status);
            }
            if (!response.ok)
                return undefined;
            await cache
                ?.put(modelCacheKey(request), response.clone())
                .catch(() => { });
            return response;
        },
        async put(request, response) {
            const cache = await openCache();
            await cache?.put(modelCacheKey(request), response).catch(() => { });
        },
    };
}
/**
 * Loads transformers.js and the model, and resolves with the embedding
 * function. A failure rejects, and a later call can try again.
 */
export async function loadEmbedder(options) {
    // Progress over every file fetched, summed.
    const progress = { loaded: 0, total: 0, retries: 0 };
    const report = () => options.onProgress?.({ ...progress });
    const fetchFn = retryingFetch(options.fetch ?? fetch.bind(globalThis), {
        onRetry: () => {
            progress.retries += 1;
            report();
        },
    });
    const parallel = options.parallel ?? 6;
    const lib = (await import(
    /* @vite-ignore */ options.transformersUrl ?? TRANSFORMERS_URL));
    const { env } = lib;
    env.allowRemoteModels = false;
    env.allowLocalModels = true;
    env.localModelPath = options.modelBase;
    env.useBrowserCache = false;
    env.useCustomCache = true;
    const onBytes = (bytes, size) => {
        progress.loaded += bytes;
        progress.total += size;
        report();
    };
    env.customCache = modelFileCache({ parallel, fetchFn, onBytes });
    const extractor = await lib.pipeline('feature-extraction', options.modelId ?? MODEL_ID, {
        dtype: QUERY_EMBEDDING.dtype,
        // Its own downloads only: with parallel reads, the cache does them.
        progress_callback: event => {
            const e = event;
            if (parallel <= 1 && e.status === 'progress' && e.total) {
                options.onProgress?.({
                    loaded: e.loaded ?? 0,
                    total: e.total,
                    retries: progress.retries,
                });
            }
        },
    });
    return async (text) => {
        const output = await extractor(`${QUERY_EMBEDDING.queryPrefix}${text}`, {
            pooling: QUERY_EMBEDDING.pooling,
            normalize: QUERY_EMBEDDING.normalize,
        });
        return new Float32Array(output.data);
    };
}
