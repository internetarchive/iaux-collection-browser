import type {
  EtdCallOptions,
  EtdEngine,
  EtdFacetCounts,
  EtdFilters,
  EtdQuery,
  EtdRecord,
} from '../../etd-engine';
import { EtdFacetRows } from '../facets';
import type { EtdFileCheck } from '../file-checks';
import type { EtdFacetReader } from '../facets';
import { DEFAULT_ETD_BASE_URL } from '../index-files';
import { sampleOf } from '../sample';
import { countFacets, filterFor } from '../static-etd-engine';
import type { DocFilter } from '../static-etd-engine';
import type { Embed } from './embedder';
import { MODEL_ID, loadEmbedder } from './embedder';
import type { EarlyScan, ScanOptions, ScanProgress } from './scan';
import { DEFAULT_RERANK } from './scan';
import type { ModelState, VectorScan, VectorSearcher } from './vector-searcher';
import { InlineVectorSearcher, WorkerVectorSearcher } from './vector-searcher';
import { decodeHalfs } from './f16';
import { FileCheckError, VectorStoreFiles } from './vector-files';
import type { IvfMeta } from './vector-files';
import type { VectorDoc } from './vector-records';
import { VectorRecords } from './vector-records';

export interface StaticVectorEngineOptions {
  /** The item's download url. Defaults to archive.org's etd-search. */
  baseUrl?: string;

  /** For tests: the fetch to read the store with (in the page only). */
  fetch?: typeof fetch;

  /**
   * Starts a worker running vector-worker.ts, to search in. Without one the
   * search runs in the page. Left to the caller, since only it knows how its
   * bundler serves a worker.
   */
  worker?: () => Worker;

  /** For tests: embeds queries instead of the model (page only). */
  embed?: Embed;

  /** Range requests at once for an uncached model file (1: one stream). */
  modelParallel?: number;

  /** The facets to count and filter by; Year is always there. */
  facets?: readonly EtdFacetReader[];

  /** Scan settings; the defaults are the live page's (and 6 cells at once). */
  scan?: Omit<ScanOptions, 'signal' | 'onProgress' | 'onEarly'>;

  /**
   * Answer from the first cells (after 4 cells or 3 s), then refine with
   * the final ranking (default true). False waits for the whole scan.
   */
  progressive?: boolean;

  /** Where the model is: loading, with bytes; ready; failed. */
  onModel?: (state: ModelState) => void;

  /** How the latest search is going. */
  onSearch?: (status: VectorSearchStatus) => void;
}

/** A search by meaning as it runs, for a status line. */
export interface VectorSearchStatus {
  text: string;
  phase: 'loading' | 'scanning' | 'done' | 'failed';
  /** Milliseconds since the search started. */
  elapsed: number;
  progress?: ScanProgress;
  /** When the first answer came, if it did. */
  first?: { cellsDone: number; cells: number; elapsed: number };
  /** Once done. */
  scan?: VectorScanSummary;
  message?: string;
}

/** What a finished scan cost and found. */
export interface VectorScanSummary {
  /** Rows of the probed cells, all scored. */
  candidates: number;
  /** How many were re-scored exactly. */
  exact: number;
  cells: number;
  bytes: number;
  requests: number;
  /** Requests asked again after a 5xx or no answer. */
  retries: number;
  /** Milliseconds per step; `total` is the whole search. */
  timings: {
    load: number;
    embed: number;
    scan: number;
    rerank: number;
    /** When the first answer came, if it did. */
    first?: number;
    total: number;
  };
}

/** Docs scored by meaning (`scoreIds`), and what it cost. */
export interface IdScores {
  /** Per vector id asked for, in that order; NaN where it couldn't score. */
  scores: Float64Array;
  /** Bytes of doc-vectors.bin read. */
  bytes: number;
  /** Milliseconds embedding the query (with any wait for the model), and reading. */
  timings: { embed: number; read: number };
}

/** A ranked vector query, with what the scan did. */
export interface VectorQuery extends EtdQuery {
  readonly scan?: VectorScanSummary;
  /** The top `count` vector ids (0-based, docs.bin rows), unfiltered. */
  topDids(count: number): number[];
}

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
export class StaticVectorEngine implements EtdEngine {
  readonly ready: Promise<void>;

  private readonly loading: Promise<{
    files: VectorStoreFiles;
    records: VectorRecords;
  }>;

  private readonly searcher: VectorSearcher;

  private readonly readers: readonly EtdFacetReader[];

  /**
   * The latest scan, by query text: filters only change which candidates
   * pass, so a re-filter or the compare panel reuse it instead of reading
   * ~80 MB again.
   */
  private latest?: LatestScan;

  constructor(private readonly options: StaticVectorEngineOptions = {}) {
    const baseUrl = absolute(options.baseUrl ?? DEFAULT_ETD_BASE_URL);
    this.loading = VectorStoreFiles.open(baseUrl, {
      fetch: options.fetch,
    }).then(async files => ({
      files,
      records: await VectorRecords.load(files),
    }));
    this.ready = this.loading.then(() => undefined);
    this.ready.catch(() => {});
    this.readers = options.facets ?? [];

    const model = {
      modelBase: baseUrl,
      modelId: MODEL_ID,
      parallel: options.modelParallel,
    };
    if (options.worker && !options.embed) {
      this.searcher = new WorkerVectorSearcher(
        options.worker(),
        { type: 'init', baseUrl, model },
        options.onModel,
      );
    } else {
      this.searcher = new InlineVectorSearcher({
        files: () => this.loading.then(({ files }) => files),
        embed: async () =>
          options.embed ??
          loadEmbedder({
            ...model,
            fetch: options.fetch,
            onProgress: progress =>
              options.onModel?.({ state: 'loading', ...progress }),
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
  preload(): Promise<void> {
    return this.searcher.preload();
  }

  /** The store's ivf-meta.json, once it's open. */
  async storeMeta(): Promise<IvfMeta> {
    const { files } = await this.loading;
    return files.meta;
  }

  /**
   * Scores docs the caller already picked against `text`, by meaning: the
   * query is embedded, and each doc's vector is read from doc-vectors.bin
   * (one multi-range request), with no scan. The scores are exact, as the
   * scan's re-score. A doc whose row couldn't be read, or holds another
   * id (a stale file), scores NaN.
   */
  async scoreIds(
    text: string,
    vids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<IdScores> {
    const { files } = await this.loading;
    const { meta } = files;
    if (!meta.doc_vectors) {
      throw new Error('ETD vector store: no doc-vectors.bin to score by');
    }
    const started = performance.now();
    const query = await this.searcher.embed(text.trim(), options);
    if (query.length !== meta.dim) {
      throw new Error(
        `ETD vector store: the model gives ${query.length} numbers, the store wants ${meta.dim}`,
      );
    }
    const embedded = performance.now();
    const { rowbytes, dim } = meta;
    const inRange = (vid: number) =>
      Number.isInteger(vid) && vid >= 0 && vid < meta.n;
    const read = vids.filter(inRange);
    const buffers = await files.ranges(
      'doc-vectors.bin',
      read.map(vid => [vid * rowbytes, rowbytes] as const),
      Math.max(read.length, 1),
      options,
    );
    const rows = new Map(read.map((vid, i) => [vid, buffers[i]]));
    const vector = new Float32Array(dim);
    const scores = Float64Array.from(vids, vid => {
      const bytes = rows.get(vid);
      if (!bytes || bytes.length < rowbytes) return NaN;
      const view = new DataView(bytes.buffer, bytes.byteOffset, 4);
      if (view.getUint32(0, true) !== vid) return NaN;
      decodeHalfs(bytes, 4, dim, vector);
      let s = 0;
      for (let j = 0; j < dim; j += 1) s += vector[j] * query[j];
      return s;
    });
    return {
      scores,
      bytes: read.length * rowbytes,
      timings: {
        embed: embedded - started,
        read: performance.now() - embedded,
      },
    };
  }

  /**
   * What the item's file list said about the store's files, from the
   * page's own open of them; also when the check is why the store
   * didn't open.
   */
  async fileCheck(): Promise<EtdFileCheck> {
    try {
      const { files } = await this.loading;
      return files.fileCheck;
    } catch (err) {
      if (err instanceof FileCheckError) return err.fileCheck;
      throw err;
    }
  }

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<VectorQuery> {
    const { records } = await this.loading;
    const words = text.trim();
    // Nothing to mean: there's no listing without a query here.
    if (!words) return emptyQuery();
    const passes = filterFor(filters, this.readers);

    const { full, early } = this.scanned(words, options);
    const final = full.then(scanned => this.finalQuery(scanned, passes));
    // A first answer only without filters: they need every scanned row's
    // facets, which come with the full scan.
    if (this.options.progressive !== false && !passes) {
      // The full scan first: if both are in, the full one wins.
      const first = await Promise.race([full.then(() => undefined), early]);
      if (first) return firstQuery(first, final, records);
    }
    return final;
  }

  /** The ranking over every scanned row, re-scored and with facets. */
  private async finalQuery(
    { scan, summary }: VectorScanned,
    passes: DocFilter | undefined,
  ): Promise<VectorQuery> {
    const { records } = await this.loading;
    if (passes && !scan.facets) {
      throw new Error(
        "ETD vector store: this store has no facet rows, so vector rank can't filter",
      );
    }
    const rows = rankedRows(scan);
    // Ranks are 1-based positions in `scan.order`; a record's docId is
    // its vector id + 1.
    const didAt = (rank: number) => scan.dids[scan.order[rank - 1]];
    const passing = function* passing() {
      for (let rank = 1; rank <= scan.order.length; rank += 1) {
        if (!passes || passes(rows, rank)) yield rank;
      }
    };
    const ranked: number[] = [];
    for (const rank of passing()) {
      if (ranked.length >= (this.options.scan?.rerank ?? DEFAULT_RERANK)) break;
      ranked.push(rank);
    }

    let ranks: Map<number, number> | undefined;
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
      async facets(): Promise<EtdFacetCounts> {
        return countFacets(rows, passing(), readers);
      },
      rankOf(docId) {
        ranks ??= new Map(ranked.map((rank, i) => [didAt(rank) + 1, i + 1]));
        return ranks.get(docId);
      },
      matches(docId) {
        for (const rank of passing())
          if (didAt(rank) + 1 === docId) return true;
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
  private scanned(text: string, options?: EtdCallOptions): LatestScan {
    const latest = this.latest;
    if (latest?.text === text) {
      return {
        text,
        early: latest.early,
        full: latest.full.catch(err => {
          // Its own caller gave up on it; this one may not have.
          if (options?.signal?.aborted || !isAbort(err)) throw err;
          return this.scanned(text, options).full;
        }),
      };
    }
    const scan = this.scan(text, options);
    this.latest = scan;
    scan.full.catch(() => {
      if (this.latest === scan) this.latest = undefined;
    });
    return scan;
  }

  private scan(text: string, options?: EtdCallOptions): LatestScan {
    const started = performance.now();
    let first: VectorSearchStatus['first'];
    const report = (status: Omit<VectorSearchStatus, 'text' | 'elapsed'>) =>
      this.options.onSearch?.({
        text,
        elapsed: performance.now() - started,
        first,
        ...status,
      });
    let resolveEarly!: (early: EarlyScan | undefined) => void;
    const early = new Promise<EarlyScan | undefined>(resolve => {
      resolveEarly = resolve;
    });
    const full = (async (): Promise<VectorScanned> => {
      report({ phase: 'loading' });
      let scan: VectorScan;
      try {
        scan = await this.searcher.search(text, {
          ...this.options.scan,
          signal: options?.signal,
          onProgress: progress => report({ phase: 'scanning', progress }),
          onEarly:
            this.options.progressive === false
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
      } catch (err) {
        report({
          phase: 'failed',
          message: err instanceof Error ? err.message : String(err),
        });
        throw err;
      } finally {
        resolveEarly(undefined);
      }
      const summary: VectorScanSummary = {
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

  async record(
    docId: number,
    options?: EtdCallOptions,
  ): Promise<EtdRecord | undefined> {
    const { records } = await this.loading;
    const [doc] = await records.read([docId - 1], options);
    return doc && vectorRecord(doc);
  }
}

interface VectorScanned {
  scan: VectorScan;
  summary: VectorScanSummary;
}

/** A scan under way: its first answer, if any, and its full result. */
interface LatestScan {
  text: string;
  /** Resolves with the first answer, or undefined if there won't be one. */
  early: Promise<EarlyScan | undefined>;
  full: Promise<VectorScanned>;
}

/**
 * A first answer from the cells read so far: their best rows by the 4-bit
 * scores, without facets. `refined` is the final query; facets and samples
 * wait for it.
 * Its records have no archived-copy links yet: those need the facet rows.
 */
function firstQuery(
  early: EarlyScan,
  refined: Promise<VectorQuery>,
  records: VectorRecords,
): VectorQuery {
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
      return (await refined).sample!(count, options);
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

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

/**
 * The scan's facet bytes as facet rows, by rank: rank r is "docId" r to the
 * facet readers. Without facet rows every value is unknown.
 */
function rankedRows(scan: VectorScan): EtdFacetRows {
  const n = scan.order.length;
  const years = new Uint8Array(n);
  const flags = new Uint8Array(n);
  const domains = new Uint16Array(n);
  if (scan.facets) {
    scan.order.forEach((candidate, i) => {
      years[i] = scan.facets!.years[candidate];
      flags[i] = scan.facets!.flags[candidate];
      domains[i] = scan.facets!.domains[candidate];
    });
  }
  const meta = scan.facetMeta;
  const none = new Uint8Array(n);
  return new EtdFacetRows(
    {
      n,
      stride: 8,
      year_enc: meta?.year_enc,
      langs: [],
      flag_bits: meta?.flag_bits,
      domains: meta?.domains,
    },
    { years, flags, domains, languages: none, countries: none, extras: none },
  );
}

const ARCHIVE_URL = /^https?:\/\/(www\.|web\.)?archive\.org\//i;

/**
 * A vector doc as an ETD record. Its archived copy is linked when the
 * landing page is itself on archive.org, or the flags say a capture exists
 * (never guessed), as on the live page (vecResultsHTML).
 */
function vectorRecord(
  doc: VectorDoc,
  rows?: EtdFacetRows,
  rank?: number,
): EtdRecord {
  const record: EtdRecord = {
    // The doc's 1-based position, which its identifier is made from
    // (static-index/identifiers.ts); record() takes it back.
    docId: doc.did + 1,
    title: doc.title,
    creators: '',
    date: doc.date,
    domain: doc.host,
    url: doc.landing,
  };
  if (doc.snippet) record.snippet = doc.snippet;
  const captured =
    rows !== undefined &&
    rank !== undefined &&
    ['ia', 'wbm', 'archived'].some(flag => rows.hasFlag(rank, flag));
  if (doc.landing && !ARCHIVE_URL.test(doc.landing) && captured) {
    record.archivedUrl = `https://web.archive.org/web/2/${encodeURI(doc.landing)}`;
  }
  return record;
}

/** The model is loaded relative to the item's url, so it can't be relative. */
function absolute(url: string): string {
  const resolved = new URL(url, globalThis.location?.href).href;
  return resolved.endsWith('/') ? resolved : `${resolved}/`;
}

function emptyQuery(): VectorQuery {
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
