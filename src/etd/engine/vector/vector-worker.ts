/**
 * The Web Worker a search by meaning runs in: the model, the centroids and
 * the cell scan all stay off the page's main thread. Start it as a module
 * worker and hand it to StaticVectorEngine:
 *
 * ```ts
 * worker: () => new Worker(
 *   new URL('./etd/engine/vector/vector-worker.ts', import.meta.url),
 *   { type: 'module' },
 * )
 * ```
 */
import { serveVectorSearcher } from './vector-searcher';

serveVectorSearcher(
  self as unknown as Parameters<typeof serveVectorSearcher>[0],
);
