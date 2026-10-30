import type { Embed, EmbedderOptions, ModelProgress } from './embedder';
import { loadEmbedder } from './embedder';
import type { EarlyScan, ScanOptions, ScanResult, VectorIndex } from './scan';
import { loadVectorIndex, scanVectors } from './scan';
import { VectorStoreFiles } from './vector-files';
import { HttpError } from '../http-error';
import type { EtdCallOptions } from '../../etd-engine';

/**
 * Embeds a query and scans the vector store: the heavy part of a search by
 * meaning (a 135 MB model, then ~80 MB of cells). It runs in a Web Worker
 * when there is one (WorkerVectorSearcher, vector-worker.ts), so the page
 * stays responsive, and in the page otherwise (InlineVectorSearcher).
 */
export interface VectorSearcher {
  /** Loads the model and the store's centroids, ahead of a search. */
  preload(): Promise<void>;

  search(text: string, options?: ScanOptions): Promise<VectorScan>;

  /**
   * The query's vector alone, with no scan: for scoring docs already
   * picked, as the re-rank of word results does. Loads only the model.
   */
  embed(text: string, options?: EtdCallOptions): Promise<Float32Array>;
}

/** A scan, and how long the query took to embed. */
export interface VectorScan extends ScanResult {
  /** Milliseconds embedding the query (after the model was loaded). */
  embedMs: number;
  /** Milliseconds waiting for the model and centroids first; 0 once loaded. */
  loadMs: number;
}

/** Where the model is, for a searcher's status line. */
export type ModelState =
  | { state: 'idle' }
  | ({ state: 'loading' } & ModelProgress)
  | { state: 'ready' }
  | { state: 'failed'; message: string };

export interface InlineVectorSearcherOptions {
  /** The store's files, opened. */
  files: () => Promise<VectorStoreFiles>;
  /** The embedding function; e.g. loadEmbedder, or a fake in tests. */
  embed: () => Promise<Embed>;
  onModel?: (state: ModelState) => void;
}

/** Runs searches where it's called: in a worker, or the page. */
export class InlineVectorSearcher implements VectorSearcher {
  private index?: Promise<VectorIndex>;

  private embedder?: Promise<Embed>;

  constructor(private readonly options: InlineVectorSearcherOptions) {}

  preload(): Promise<void> {
    return Promise.all([this.loadIndex(), this.loadEmbed()]).then(() => {});
  }

  async search(text: string, options: ScanOptions = {}): Promise<VectorScan> {
    const loading = performance.now();
    // The model and the centroids load at the same time; the live page
    // waits for one, then the other.
    const [index, embed] = await Promise.all([
      this.loadIndex(),
      this.loadEmbed(),
    ]);
    const embedding = performance.now();
    const query = await embed(text);
    if (query.length !== index.files.meta.dim) {
      throw new Error(
        `ETD vector store: the model gives ${query.length} numbers, the store wants ${index.files.meta.dim}`,
      );
    }
    const embedded = performance.now();
    options.signal?.throwIfAborted();
    const scan = await scanVectors(index, query, options);
    // Every retry since the last search reported: the first search also
    // counts those loading the store (its manifest, centroids, cell.dir).
    const { stats } = index.files;
    const retries = stats.retries - this.reportedRetries;
    this.reportedRetries = stats.retries;
    return {
      ...scan,
      retries,
      embedMs: embedded - embedding,
      loadMs: embedding - loading,
    };
  }

  async embed(text: string, options?: EtdCallOptions): Promise<Float32Array> {
    const embed = await this.loadEmbed();
    options?.signal?.throwIfAborted();
    return embed(text);
  }

  /** The store's retries already counted in a search's result. */
  private reportedRetries = 0;

  private loadIndex(): Promise<VectorIndex> {
    this.index ??= this.options.files().then(files => loadVectorIndex(files));
    // A failure can be retried by the next search.
    this.index.catch(() => {
      this.index = undefined;
    });
    return this.index;
  }

  private loadEmbed(): Promise<Embed> {
    if (!this.embedder) {
      this.options.onModel?.({
        state: 'loading',
        loaded: 0,
        total: 0,
        retries: 0,
      });
      this.embedder = this.options.embed().then(
        embed => {
          this.options.onModel?.({ state: 'ready' });
          return embed;
        },
        (err: unknown) => {
          this.embedder = undefined;
          this.options.onModel?.({
            state: 'failed',
            message: err instanceof Error ? err.message : String(err),
          });
          throw err;
        },
      );
    }
    return this.embedder;
  }
}

/** What the page tells the worker. */
export type ToWorker =
  | {
      type: 'init';
      baseUrl: string;
      model: Omit<EmbedderOptions, 'onProgress' | 'fetch'>;
    }
  | { type: 'preload' }
  | {
      type: 'search';
      id: number;
      text: string;
      options: Omit<ScanOptions, 'signal' | 'onProgress' | 'onEarly'>;
      /** Whether to send a first answer before the scan ends. */
      early?: boolean;
    }
  | { type: 'embed'; id: number; text: string }
  | { type: 'cancel'; id: number };

/** What the worker tells the page. */
export type FromWorker =
  | { type: 'model'; model: ModelState }
  | {
      type: 'progress';
      id: number;
      progress: Parameters<NonNullable<ScanOptions['onProgress']>>[0];
    }
  | { type: 'early'; id: number; early: EarlyScan }
  | { type: 'result'; id: number; scan: VectorScan }
  | { type: 'embedded'; id: number; vector: Float32Array }
  | {
      type: 'error';
      id: number;
      message: string;
      aborted: boolean;
      /** An HTTP error's status, or a fetch that got no answer. */
      status?: number;
      network?: boolean;
    };

/** The worker's side: an inline searcher, driven by messages. */
export function serveVectorSearcher(scope: {
  postMessage(message: FromWorker, transfer?: Transferable[]): void;
  addEventListener(
    type: 'message',
    listener: (event: MessageEvent<ToWorker>) => void,
  ): void;
}): void {
  let searcher: InlineVectorSearcher | undefined;
  const running = new Map<number, AbortController>();
  const post = (message: FromWorker, transfer?: Transferable[]) =>
    scope.postMessage(message, transfer);

  scope.addEventListener('message', async ({ data }) => {
    if (data.type === 'init') {
      const { baseUrl, model } = data;
      let files: Promise<VectorStoreFiles> | undefined;
      searcher = new InlineVectorSearcher({
        files: () => {
          files ??= VectorStoreFiles.open(baseUrl);
          files.catch(() => {
            files = undefined;
          });
          return files;
        },
        embed: () =>
          loadEmbedder({
            ...model,
            onProgress: progress =>
              post({ type: 'model', model: { state: 'loading', ...progress } }),
          }),
        onModel: state => post({ type: 'model', model: state }),
      });
    } else if (data.type === 'preload') {
      searcher?.preload().catch(() => {});
    } else if (data.type === 'cancel') {
      running.get(data.id)?.abort();
    } else if (data.type === 'embed') {
      const { id } = data;
      try {
        if (!searcher) throw new Error('vector worker: not initialised');
        const vector = await searcher.embed(data.text);
        post({ type: 'embedded', id, vector }, [vector.buffer]);
      } catch (err) {
        post({
          type: 'error',
          id,
          message: err instanceof Error ? err.message : String(err),
          aborted: false,
          status: err instanceof HttpError ? err.status : undefined,
          network: err instanceof TypeError,
        });
      }
    } else if (data.type === 'search') {
      const { id } = data;
      const controller = new AbortController();
      running.set(id, controller);
      try {
        if (!searcher) throw new Error('vector worker: not initialised');
        const scan = await searcher.search(data.text, {
          ...data.options,
          signal: controller.signal,
          onProgress: progress => post({ type: 'progress', id, progress }),
          onEarly: data.early
            ? early =>
                post({ type: 'early', id, early }, [
                  early.dids.buffer,
                  early.scores.buffer,
                ])
            : undefined,
        });
        const transfer: Transferable[] = [
          scan.dids.buffer,
          scan.rows.buffer,
          scan.scores.buffer,
          scan.order.buffer,
        ];
        if (scan.facets) {
          transfer.push(
            scan.facets.years.buffer,
            scan.facets.flags.buffer,
            scan.facets.domains.buffer,
          );
        }
        post({ type: 'result', id, scan }, transfer);
      } catch (err) {
        post({
          type: 'error',
          id,
          message: err instanceof Error ? err.message : String(err),
          aborted: controller.signal.aborted,
          // Errors cross as text: say what kind it was, for the page.
          status: err instanceof HttpError ? err.status : undefined,
          network: err instanceof TypeError,
        });
      } finally {
        running.delete(id);
      }
    }
  });
}

/** The page's side of a worker running serveVectorSearcher. */
export class WorkerVectorSearcher implements VectorSearcher {
  private nextId = 1;

  private readonly pending = new Map<
    number,
    {
      resolve: (answer: VectorScan | Float32Array) => void;
      reject: (err: Error) => void;
      onProgress?: ScanOptions['onProgress'];
      onEarly?: ScanOptions['onEarly'];
    }
  >();

  /** Resolves once the worker says its model is ready. */
  private readonly modelReady: Promise<void>;

  private markModelReady!: () => void;

  constructor(
    private readonly worker: Worker,
    init: Extract<ToWorker, { type: 'init' }>,
    onModel?: (state: ModelState) => void,
  ) {
    this.modelReady = new Promise(resolve => {
      this.markModelReady = resolve;
    });
    worker.addEventListener('message', (event: MessageEvent<FromWorker>) => {
      const message = event.data;
      if (message.type === 'model') {
        onModel?.(message.model);
        if (message.model.state === 'ready') this.markModelReady();
        return;
      }
      const job = this.pending.get(message.id);
      if (!job) return;
      if (message.type === 'progress') {
        job.onProgress?.(message.progress);
      } else if (message.type === 'early') {
        job.onEarly?.(message.early);
      } else if (message.type === 'result') {
        this.pending.delete(message.id);
        job.resolve(message.scan);
      } else if (message.type === 'embedded') {
        this.pending.delete(message.id);
        job.resolve(message.vector);
      } else {
        this.pending.delete(message.id);
        job.reject(workerError(message));
      }
    });
    worker.postMessage(init);
  }

  preload(): Promise<void> {
    this.worker.postMessage({ type: 'preload' } satisfies ToWorker);
    return this.modelReady;
  }

  search(text: string, options: ScanOptions = {}): Promise<VectorScan> {
    const { signal, onProgress, onEarly, ...scanOptions } = options;
    signal?.throwIfAborted();
    const id = this.nextId;
    this.nextId += 1;
    return new Promise<VectorScan>((resolve, reject) => {
      this.pending.set(id, {
        resolve: answer => resolve(answer as VectorScan),
        reject,
        onProgress,
        onEarly,
      });
      signal?.addEventListener('abort', () =>
        this.worker.postMessage({ type: 'cancel', id } satisfies ToWorker),
      );
      this.worker.postMessage({
        type: 'search',
        id,
        text,
        options: scanOptions,
        early: !!onEarly,
      } satisfies ToWorker);
    });
  }

  embed(text: string, options?: EtdCallOptions): Promise<Float32Array> {
    options?.signal?.throwIfAborted();
    const id = this.nextId;
    this.nextId += 1;
    // Embedding a query takes milliseconds once the model is in, so an
    // abort only stops the wait here; the worker isn't told.
    return new Promise<Float32Array>((resolve, reject) => {
      this.pending.set(id, {
        resolve: answer => resolve(answer as Float32Array),
        reject,
      });
      options?.signal?.addEventListener('abort', () => {
        this.pending.delete(id);
        reject(new DOMException('Embedding aborted', 'AbortError'));
      });
      this.worker.postMessage({ type: 'embed', id, text } satisfies ToWorker);
    });
  }
}

/** The worker's error as the kind it was thrown as. */
export function workerError(
  message: Extract<FromWorker, { type: 'error' }>,
): Error {
  if (message.aborted) return new DOMException(message.message, 'AbortError');
  if (message.status) return new HttpError(message.message, message.status);
  if (message.network) return new TypeError(message.message);
  return new Error(message.message);
}
