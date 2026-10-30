import { EtdFacetRows } from '../facets';
import { DEFAULT_ETD_BASE_URL } from '../index-files';
import { sampleOf } from '../sample';
import { countFacets, filterFor } from '../static-etd-engine';
import { MODEL_ID, loadEmbedder } from './embedder';
import { DEFAULT_RERANK } from './scan';
import { InlineVectorSearcher, WorkerVectorSearcher } from './vector-searcher';
import { FileCheckError, VectorStoreFiles } from './vector-files';
import { VectorRecords } from './vector-records';
/**
 * Search by meaning over the ETD item's vector store: the query is embedded
 * in the browser and matched against the abstracts' vectors (scan.ts). The
 * live page's "Vector rank".
 *
 * Its records are the vector store's own docs, numbered apart from the text
 * index's: a record's docId is its vector id + 1. Paging reaches the best
 * `rerank` (400) that pass the filters; facets count every scanned
 * candidate that passes them. The store's facet rows carry the year, flags
 * and repository only, so there's no language, country, institution or
 * degree level here.
 */
export class StaticVectorEngine {
    constructor(options = {}) {
        this.options = options;
        const baseUrl = absolute(options.baseUrl ?? DEFAULT_ETD_BASE_URL);
        this.loading = VectorStoreFiles.open(baseUrl, {
            fetch: options.fetch,
        }).then(async (files) => ({
            files,
            records: await VectorRecords.load(files),
        }));
        this.ready = this.loading.then(() => undefined);
        this.ready.catch(() => { });
        this.readers = options.facets ?? [];
        const model = {
            modelBase: baseUrl,
            modelId: MODEL_ID,
            parallel: options.modelParallel,
        };
        if (options.worker && !options.embed) {
            this.searcher = new WorkerVectorSearcher(options.worker(), { type: 'init', baseUrl, model }, options.onModel);
        }
        else {
            this.searcher = new InlineVectorSearcher({
                files: () => this.loading.then(({ files }) => files),
                embed: async () => options.embed ??
                    loadEmbedder({
                        ...model,
                        fetch: options.fetch,
                        onProgress: progress => options.onModel?.({ state: 'loading', ...progress }),
                    }),
                onModel: options.onModel,
            });
        }
    }
    /**
     * Starts loading the model and centroids (~150 MB the first time), so a
     * first search by meaning doesn't wait for them. Call it on a sign the
     * reader wants one, not on every page load.
     */
    preload() {
        return this.searcher.preload();
    }
    /**
     * What the item's file list said about the store's files, from the
     * page's own open of them; also when the check is why the store
     * didn't open.
     */
    async fileCheck() {
        try {
            const { files } = await this.loading;
            return files.fileCheck;
        }
        catch (err) {
            if (err instanceof FileCheckError)
                return err.fileCheck;
            throw err;
        }
    }
    async query(text, filters, options) {
        const { records } = await this.loading;
        const words = text.trim();
        // Nothing to mean: there's no listing without a query here.
        if (!words)
            return emptyQuery();
        const passes = filterFor(filters, this.readers);
        const { full, early } = this.scanned(words, options);
        const final = full.then(scanned => this.finalQuery(scanned, passes));
        // A first answer only without filters: they need every scanned row's
        // facets, which come with the full scan.
        if (this.options.progressive !== false && !passes) {
            // The full scan first: if both are in, the full one wins.
            const first = await Promise.race([full.then(() => undefined), early]);
            if (first)
                return firstQuery(first, final, records);
        }
        return final;
    }
    /** The ranking over every scanned row, re-scored and with facets. */
    async finalQuery({ scan, summary }, passes) {
        const { records } = await this.loading;
        if (passes && !scan.facets) {
            throw new Error("ETD vector store: this store has no facet rows, so vector rank can't filter");
        }
        const rows = rankedRows(scan);
        // Ranks are 1-based positions in `scan.order`; a record's docId is
        // its vector id + 1.
        const didAt = (rank) => scan.dids[scan.order[rank - 1]];
        const passing = function* passing() {
            for (let rank = 1; rank <= scan.order.length; rank += 1) {
                if (!passes || passes(rows, rank))
                    yield rank;
            }
        };
        const ranked = [];
        for (const rank of passing()) {
            if (ranked.length >= (this.options.scan?.rerank ?? DEFAULT_RERANK))
                break;
            ranked.push(rank);
        }
        let ranks;
        let cursor = 0;
        const readers = this.readers;
        return {
            result: {
                total: ranked.length,
                approximate: false,
                reachable: ranked.length,
            },
            scan: summary,
            async next(count, nextOptions) {
                const page = ranked.slice(cursor, cursor + count);
                const docs = await records.read(page.map(didAt), nextOptions);
                cursor += page.length;
                return docs.map((doc, i) => vectorRecord(doc, rows, page[i]));
            },
            async facets() {
                return countFacets(rows, passing(), readers);
            },
            rankOf(docId) {
                ranks ??= new Map(ranked.map((rank, i) => [didAt(rank) + 1, i + 1]));
                return ranks.get(docId);
            },
            matches(docId) {
                for (const rank of passing())
                    if (didAt(rank) + 1 === docId)
                        return true;
                return false;
            },
            async sample(count, sampleOptions) {
                const { picked, of } = sampleOf(ranked, count);
                const docs = await records.rows(picked.map(didAt), sampleOptions);
                return {
                    records: docs.map((doc, i) => vectorRecord(doc, rows, picked[i])),
                    of,
                };
            },
            topDids(count) {
                return Array.from(scan.order.subarray(0, count), c => scan.dids[c]);
            },
        };
    }
    /** The scan for `text`: the latest one if it was for the same text. */
    scanned(text, options) {
        const latest = this.latest;
        if (latest?.text === text) {
            return {
                text,
                early: latest.early,
                full: latest.full.catch(err => {
                    // Its own caller gave up on it; this one may not have.
                    if (options?.signal?.aborted || !isAbort(err))
                        throw err;
                    return this.scanned(text, options).full;
                }),
            };
        }
        const scan = this.scan(text, options);
        this.latest = scan;
        scan.full.catch(() => {
            if (this.latest === scan)
                this.latest = undefined;
        });
        return scan;
    }
    scan(text, options) {
        const started = performance.now();
        let first;
        const report = (status) => this.options.onSearch?.({
            text,
            elapsed: performance.now() - started,
            first,
            ...status,
        });
        let resolveEarly;
        const early = new Promise(resolve => {
            resolveEarly = resolve;
        });
        const full = (async () => {
            report({ phase: 'loading' });
            let scan;
            try {
                scan = await this.searcher.search(text, {
                    ...this.options.scan,
                    signal: options?.signal,
                    onProgress: progress => report({ phase: 'scanning', progress }),
                    onEarly: this.options.progressive === false
                        ? undefined
                        : answer => {
                            first = {
                                cellsDone: answer.progress.cellsDone,
                                cells: answer.progress.cells,
                                elapsed: performance.now() - started,
                            };
                            report({ phase: 'scanning', progress: answer.progress });
                            resolveEarly(answer);
                        },
                });
            }
            catch (err) {
                report({
                    phase: 'failed',
                    message: err instanceof Error ? err.message : String(err),
                });
                throw err;
            }
            finally {
                resolveEarly(undefined);
            }
            const summary = {
                candidates: scan.order.length,
                exact: scan.exact,
                cells: scan.cells.length,
                bytes: scan.bytes,
                requests: scan.requests,
                retries: scan.retries,
                timings: {
                    load: scan.loadMs,
                    embed: scan.embedMs,
                    scan: scan.timings.scan,
                    rerank: scan.timings.rerank,
                    first: first?.elapsed,
                    total: performance.now() - started,
                },
            };
            report({ phase: 'done', scan: summary });
            return { scan, summary };
        })();
        return { text, full, early };
    }
    async record(docId, options) {
        const { records } = await this.loading;
        const [doc] = await records.read([docId - 1], options);
        return doc && vectorRecord(doc);
    }
}
/**
 * A first answer from the cells read so far: their best rows by the 4-bit
 * scores, without facets. `refined` is the final query; facets and samples
 * wait for it.
 * Its records have no archived-copy links yet: those need the facet rows.
 */
function firstQuery(early, refined, records) {
    const dids = Array.from(early.dids);
    let cursor = 0;
    return {
        result: { total: dids.length, approximate: false, reachable: dids.length },
        refined,
        async next(count, options) {
            const page = dids.slice(cursor, cursor + count);
            const docs = await records.read(page, options);
            cursor += page.length;
            return docs.map(doc => vectorRecord(doc));
        },
        async facets(options) {
            return (await refined).facets(options);
        },
        async sample(count, options) {
            return (await refined).sample(count, options);
        },
        rankOf(docId) {
            const rank = dids.indexOf(docId - 1) + 1;
            return rank || undefined;
        },
        matches(docId) {
            return dids.includes(docId - 1);
        },
        topDids(count) {
            return dids.slice(0, count);
        },
    };
}
function isAbort(err) {
    return err instanceof DOMException && err.name === 'AbortError';
}
/**
 * The scan's facet bytes as facet rows, by rank: rank r is "docId" r to the
 * facet readers. Without facet rows every value is unknown.
 */
function rankedRows(scan) {
    const n = scan.order.length;
    const years = new Uint8Array(n);
    const flags = new Uint8Array(n);
    const domains = new Uint16Array(n);
    if (scan.facets) {
        scan.order.forEach((candidate, i) => {
            years[i] = scan.facets.years[candidate];
            flags[i] = scan.facets.flags[candidate];
            domains[i] = scan.facets.domains[candidate];
        });
    }
    const meta = scan.facetMeta;
    const none = new Uint8Array(n);
    return new EtdFacetRows({
        n,
        stride: 8,
        year_enc: meta?.year_enc,
        langs: [],
        flag_bits: meta?.flag_bits,
        domains: meta?.domains,
    }, { years, flags, domains, languages: none, countries: none, extras: none });
}
const ARCHIVE_URL = /^https?:\/\/(www\.|web\.)?archive\.org\//i;
/**
 * A vector doc as an ETD record. Its archived copy is linked when the
 * landing page is itself on archive.org, or the flags say a capture exists
 * (never guessed), as on the live page (vecResultsHTML).
 */
function vectorRecord(doc, rows, rank) {
    const record = {
        // The doc's 1-based position, which its identifier is made from
        // (static-index/identifiers.ts); record() takes it back.
        docId: doc.did + 1,
        title: doc.title,
        creators: '',
        date: doc.date,
        domain: doc.host,
        url: doc.landing,
    };
    if (doc.snippet)
        record.snippet = doc.snippet;
    const captured = rows !== undefined &&
        rank !== undefined &&
        ['ia', 'wbm', 'archived'].some(flag => rows.hasFlag(rank, flag));
    if (doc.landing && !ARCHIVE_URL.test(doc.landing) && captured) {
        record.archivedUrl = `https://web.archive.org/web/2/${encodeURI(doc.landing)}`;
    }
    return record;
}
/** The model is loaded relative to the item's url, so it can't be relative. */
function absolute(url) {
    const resolved = new URL(url, globalThis.location?.href).href;
    return resolved.endsWith('/') ? resolved : `${resolved}/`;
}
function emptyQuery() {
    return {
        result: { total: 0, approximate: false, reachable: 0 },
        async next() {
            return [];
        },
        async facets() {
            return { year: {}, facets: {} };
        },
        rankOf() {
            return undefined;
        },
        matches() {
            return false;
        },
        async sample() {
            return { records: [], of: 0 };
        },
        topDids() {
            return [];
        },
    };
}
