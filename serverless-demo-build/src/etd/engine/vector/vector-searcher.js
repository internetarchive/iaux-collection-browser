import { loadEmbedder } from './embedder';
import { loadVectorIndex, scanVectors } from './scan';
import { VectorStoreFiles } from './vector-files';
import { HttpError } from '../http-error';
/** Runs searches where it's called: in a worker, or the page. */
export class InlineVectorSearcher {
    constructor(options) {
        this.options = options;
        /** The store's retries already counted in a search's result. */
        this.reportedRetries = 0;
    }
    preload() {
        return Promise.all([this.loadIndex(), this.loadEmbed()]).then(() => { });
    }
    async search(text, options = {}) {
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
            throw new Error(`ETD vector store: the model gives ${query.length} numbers, the store wants ${index.files.meta.dim}`);
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
    loadIndex() {
        this.index ??= this.options.files().then(files => loadVectorIndex(files));
        // A failure can be retried by the next search.
        this.index.catch(() => {
            this.index = undefined;
        });
        return this.index;
    }
    loadEmbed() {
        if (!this.embed) {
            this.options.onModel?.({
                state: 'loading',
                loaded: 0,
                total: 0,
                retries: 0,
            });
            this.embed = this.options.embed().then(embed => {
                this.options.onModel?.({ state: 'ready' });
                return embed;
            }, (err) => {
                this.embed = undefined;
                this.options.onModel?.({
                    state: 'failed',
                    message: err instanceof Error ? err.message : String(err),
                });
                throw err;
            });
        }
        return this.embed;
    }
}
/** The worker's side: an inline searcher, driven by messages. */
export function serveVectorSearcher(scope) {
    let searcher;
    const running = new Map();
    const post = (message, transfer) => scope.postMessage(message, transfer);
    scope.addEventListener('message', async ({ data }) => {
        if (data.type === 'init') {
            const { baseUrl, model } = data;
            let files;
            searcher = new InlineVectorSearcher({
                files: () => {
                    files ??= VectorStoreFiles.open(baseUrl);
                    files.catch(() => {
                        files = undefined;
                    });
                    return files;
                },
                embed: () => loadEmbedder({
                    ...model,
                    onProgress: progress => post({ type: 'model', model: { state: 'loading', ...progress } }),
                }),
                onModel: state => post({ type: 'model', model: state }),
            });
        }
        else if (data.type === 'preload') {
            searcher?.preload().catch(() => { });
        }
        else if (data.type === 'cancel') {
            running.get(data.id)?.abort();
        }
        else if (data.type === 'search') {
            const { id } = data;
            const controller = new AbortController();
            running.set(id, controller);
            try {
                if (!searcher)
                    throw new Error('vector worker: not initialised');
                const scan = await searcher.search(data.text, {
                    ...data.options,
                    signal: controller.signal,
                    onProgress: progress => post({ type: 'progress', id, progress }),
                    onEarly: data.early
                        ? early => post({ type: 'early', id, early }, [
                            early.dids.buffer,
                            early.scores.buffer,
                        ])
                        : undefined,
                });
                const transfer = [
                    scan.dids.buffer,
                    scan.rows.buffer,
                    scan.scores.buffer,
                    scan.order.buffer,
                ];
                if (scan.facets) {
                    transfer.push(scan.facets.years.buffer, scan.facets.flags.buffer, scan.facets.domains.buffer);
                }
                post({ type: 'result', id, scan }, transfer);
            }
            catch (err) {
                post({
                    type: 'error',
                    id,
                    message: err instanceof Error ? err.message : String(err),
                    aborted: controller.signal.aborted,
                    // Errors cross as text: say what kind it was, for the page.
                    status: err instanceof HttpError ? err.status : undefined,
                    network: err instanceof TypeError,
                });
            }
            finally {
                running.delete(id);
            }
        }
    });
}
/** The page's side of a worker running serveVectorSearcher. */
export class WorkerVectorSearcher {
    constructor(worker, init, onModel) {
        this.worker = worker;
        this.nextId = 1;
        this.pending = new Map();
        this.modelReady = new Promise(resolve => {
            this.markModelReady = resolve;
        });
        worker.addEventListener('message', (event) => {
            const message = event.data;
            if (message.type === 'model') {
                onModel?.(message.model);
                if (message.model.state === 'ready')
                    this.markModelReady();
                return;
            }
            const job = this.pending.get(message.id);
            if (!job)
                return;
            if (message.type === 'progress') {
                job.onProgress?.(message.progress);
            }
            else if (message.type === 'early') {
                job.onEarly?.(message.early);
            }
            else if (message.type === 'result') {
                this.pending.delete(message.id);
                job.resolve(message.scan);
            }
            else {
                this.pending.delete(message.id);
                job.reject(workerError(message));
            }
        });
        worker.postMessage(init);
    }
    preload() {
        this.worker.postMessage({ type: 'preload' });
        return this.modelReady;
    }
    search(text, options = {}) {
        const { signal, onProgress, onEarly, ...scanOptions } = options;
        signal?.throwIfAborted();
        const id = this.nextId;
        this.nextId += 1;
        return new Promise((resolve, reject) => {
            this.pending.set(id, { resolve, reject, onProgress, onEarly });
            signal?.addEventListener('abort', () => this.worker.postMessage({ type: 'cancel', id }));
            this.worker.postMessage({
                type: 'search',
                id,
                text,
                options: scanOptions,
                early: !!onEarly,
            });
        });
    }
}
/** The worker's error as the kind it was thrown as. */
export function workerError(message) {
    if (message.aborted)
        return new DOMException(message.message, 'AbortError');
    if (message.status)
        return new HttpError(message.message, message.status);
    if (message.network)
        return new TypeError(message.message);
    return new Error(message.message);
}
