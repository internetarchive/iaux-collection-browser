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

export const TRANSFORMERS_URL =
  'https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.0.2/dist/transformers.min.js';

export const MODEL_ID = 'Xenova/multilingual-e5-small';

const MODEL_CACHE = 'etd-model-cache';

/** A query as the store's vector: normalised, `dim` numbers. */
export type Embed = (text: string) => Promise<Float32Array>;

export interface EmbedderOptions {
  /** Absolute url of the item's folder holding `Xenova/...`, ending in '/'. */
  modelBase: string;
  modelId?: string;
  transformersUrl?: string;
  /**
   * Range requests at once for a model file that isn't cached; 1 reads it
   * as one stream, as the live page does.
   */
  parallel?: number;
  /** Bytes downloaded so far, of the model files' total once known. */
  onProgress?: (loaded: number, total: number) => void;
  fetch?: typeof fetch;
}

/** The bits of transformers.js used here. */
interface Transformers {
  env: {
    allowRemoteModels: boolean;
    allowLocalModels: boolean;
    localModelPath: string;
    useBrowserCache: boolean;
    useCustomCache: boolean;
    customCache: {
      match(request: unknown): Promise<Response | undefined>;
      put(request: unknown, response: Response): Promise<void>;
    } | null;
  };
  pipeline(
    task: 'feature-extraction',
    model: string,
    options: { dtype: string; progress_callback?: (event: unknown) => void },
  ): Promise<
    (
      text: string,
      options: { pooling: 'mean'; normalize: boolean },
    ) => Promise<{ data: Float32Array }>
  >;
}

/**
 * A model file's cache key: its path within the item. The url embeds
 * whichever host served it (an archive.org storage server, which can change,
 * or the dev proxy), so the key drops it. The live page's _mkey.
 */
export function modelCacheKey(request: unknown): string {
  let url: string;
  try {
    url = typeof request === 'string' ? request : (request as Request).url;
  } catch {
    url = String(request);
  }
  return `https://etd-model.cache/${String(url)
    .replace(/^https?:\/\/[^/]+\/\d+\/items\//i, '')
    .replace(/^https?:\/\/[^/]+\/download\//i, '')
    .replace(/^https?:\/\/[^/]+\//i, '')
    .replace(/[?#].*$/, '')}`;
}

async function openCache(): Promise<Cache | undefined> {
  try {
    return typeof caches === 'undefined'
      ? undefined
      : await caches.open(MODEL_CACHE);
  } catch {
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
export async function fetchInParallel(
  url: string,
  parallel: number,
  fetchFn: typeof fetch,
  onBytes: (bytes: number, total: number) => void,
): Promise<Response> {
  const first = await fetchFn(url, {
    headers: { Range: `bytes=0-${FIRST_RANGE - 1}` },
  });
  if (!first.ok) return first;
  const size = Number(
    first.headers.get('content-range')?.match(/\/(\d+)$/)?.[1] ?? NaN,
  );
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
  await Promise.all(
    Array.from({ length: Math.ceil(rest / partSize) }, async (_, i) => {
      const from = head.length + i * partSize;
      const to = Math.min(size, from + partSize);
      const response = await fetchFn(url, {
        headers: { Range: `bytes=${from}-${to - 1}` },
      });
      if (response.status !== 206) {
        throw new Error(`${url}: HTTP ${response.status} for a range`);
      }
      // Read as a stream, so progress moves as bytes arrive.
      const reader = response.body!.getReader();
      let at = from;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        if (at + value.length > to) throw new Error(`${url}: long range`);
        body.set(value, at);
        at += value.length;
        onBytes(value.length, 0);
      }
      if (at !== to) throw new Error(`${url}: short range`);
    }),
  );
  return new Response(body, { headers: { 'content-length': String(size) } });
}

/**
 * Loads transformers.js and the model, and resolves with the embedding
 * function. A failure rejects, and a later call can try again.
 */
export async function loadEmbedder(options: EmbedderOptions): Promise<Embed> {
  const fetchFn = options.fetch ?? fetch.bind(globalThis);
  const parallel = options.parallel ?? 6;
  const lib = (await import(
    /* @vite-ignore */ options.transformersUrl ?? TRANSFORMERS_URL
  )) as Transformers;
  const { env } = lib;
  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = options.modelBase;
  env.useBrowserCache = false;
  env.useCustomCache = true;

  // Progress over every file fetched, summed.
  let loaded = 0;
  let total = 0;
  const onBytes = (bytes: number, size: number) => {
    loaded += bytes;
    total += size;
    options.onProgress?.(loaded, total);
  };
  env.customCache = {
    async match(request) {
      const cache = await openCache();
      const hit = await cache?.match(modelCacheKey(request));
      if (hit || parallel <= 1) return hit;
      // A miss: fetch it here, in parallel parts, and keep it. transformers.js
      // then reads it as if it had been cached.
      const url = typeof request === 'string' ? request : String(request);
      const response = await fetchInParallel(url, parallel, fetchFn, onBytes);
      if (!response.ok) return undefined;
      await cache
        ?.put(modelCacheKey(request), response.clone())
        .catch(() => {});
      return response;
    },
    async put(request, response) {
      const cache = await openCache();
      await cache?.put(modelCacheKey(request), response).catch(() => {});
    },
  };

  const extractor = await lib.pipeline(
    'feature-extraction',
    options.modelId ?? MODEL_ID,
    {
      dtype: 'q8',
      // Its own downloads only: with parallel reads, the cache does them.
      progress_callback: event => {
        const e = event as { status?: string; loaded?: number; total?: number };
        if (parallel <= 1 && e.status === 'progress' && e.total) {
          options.onProgress?.(e.loaded ?? 0, e.total);
        }
      },
    },
  );
  // e5 embeds queries with a "query: " prefix, as the store's build did.
  return async text => {
    const output = await extractor(`query: ${text}`, {
      pooling: 'mean',
      normalize: true,
    });
    return new Float32Array(output.data);
  };
}
