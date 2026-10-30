import type {
  EtdCallOptions,
  EtdEngine,
  EtdFilters,
  EtdQuery,
  EtdRecord,
} from '../etd-engine';
import type { EtdIndexMeta } from './index-files';
import type { IdScores } from './vector/static-vector-engine';
import type { IvfMeta } from './vector/vector-files';

/** How many of the word ranking's best are re-ordered by meaning. */
export const DEFAULT_RERANK_HEAD = 400;

/** What the re-rank needs from word search: its queries and current.json. */
export interface WordSearch extends EtdEngine {
  indexMeta(): Promise<EtdIndexMeta>;
}

/** What it needs from search by meaning (StaticVectorEngine). */
export interface MeaningScorer {
  storeMeta(): Promise<IvfMeta>;
  scoreIds(
    text: string,
    vids: readonly number[],
    options?: EtdCallOptions,
  ): Promise<IdScores>;
}

/** How the latest re-rank went, for a status line. */
export interface MeaningRerankStatus {
  text: string;
  /**
   * `off`: this item can't re-rank (`message` says why), so results stay
   * in word order. `failed`: it could, but this one didn't.
   */
  phase: 'reranking' | 'done' | 'off' | 'failed';
  /** Milliseconds since the search's word results were ranked. */
  elapsed: number;
  message?: string;
  /** Once done: the docs re-ordered, and how many of them had a vector. */
  head?: number;
  scored?: number;
  bytes?: number;
  timings?: IdScores['timings'];
}

export interface MeaningRerankEngineOptions {
  /** How many of the word ranking's best to re-order (default 400). */
  head?: number;
  onStatus?: (status: MeaningRerankStatus) => void;
}

/**
 * Word search, with its best results re-ordered by meaning: the query is
 * embedded, the vectors of the top `head` word results are read from the
 * vector store by id (doc-vectors.bin, one request), and those results are
 * sorted by how close they are to the query. Results past the head keep
 * their word order, so nothing becomes unreachable, and totals and facets
 * are word search's.
 *
 * It only works where the vector store's ids are the word index's docIds
 * less one, which the store says in ivf-meta.json (`text_v`, the word
 * build they line up with). ETD's don't, so there it stays in word order.
 *
 * The word results come first; the re-ordered ones follow as the query's
 * `refined`, so a search never waits for the model (135 MB the first time).
 */
export class MeaningRerankEngine implements EtdEngine {
  readonly ready: Promise<void>;

  private readonly head: number;

  constructor(
    private readonly words: WordSearch,
    /** Called on the first search that has words, not before. */
    private readonly meaning: () => MeaningScorer,
    private readonly options: MeaningRerankEngineOptions = {},
  ) {
    this.ready = words.ready;
    this.head = options.head ?? DEFAULT_RERANK_HEAD;
  }

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery> {
    const query = await this.words.query(text, filters, options);
    // Filters alone list in docId order: there are no words to mean.
    if (!query.topIds || !query.reordered || !query.result.reachable) {
      return query;
    }
    return { ...query, refined: this.rerank(text, query, options) };
  }

  record(
    docId: number,
    options?: EtdCallOptions,
  ): Promise<EtdRecord | undefined> {
    return this.words.record(docId, options);
  }

  private async rerank(
    text: string,
    query: EtdQuery,
    options?: EtdCallOptions,
  ): Promise<EtdQuery | undefined> {
    const started = performance.now();
    const report = (status: Omit<MeaningRerankStatus, 'text' | 'elapsed'>) =>
      this.options.onStatus?.({
        text,
        elapsed: performance.now() - started,
        ...status,
      });
    try {
      const meaning = this.meaning();
      const [ivf, index] = await Promise.all([
        meaning.storeMeta(),
        this.words.indexMeta(),
      ]);
      const off = rerankUnavailable(ivf, index);
      if (off) {
        report({ phase: 'off', message: off });
        return undefined;
      }
      report({ phase: 'reranking' });
      const head = query.topIds!(this.head);
      const scored = await meaning.scoreIds(
        text,
        head.map(docId => docId - 1),
        options,
      );
      report({
        phase: 'done',
        head: head.length,
        scored: scored.scores.filter(score => !Number.isNaN(score)).length,
        bytes: scored.bytes,
        timings: scored.timings,
      });
      return query.reordered!(meaningOrder(head, scored.scores));
    } catch (err) {
      if (options?.signal?.aborted) throw err;
      // The word results stay: re-ranking improves them, it doesn't gate them.
      report({
        phase: 'failed',
        message: err instanceof Error ? err.message : String(err),
      });
      return undefined;
    }
  }
}

/**
 * Why this item's vector store can't re-rank its word results, or
 * undefined when it can. Its ids must be the word index's docIds less one,
 * for this very word build: a rebuild that renumbered docs would otherwise
 * score each result by another doc's vector, with nothing to notice.
 */
export function rerankUnavailable(
  ivf: IvfMeta,
  index: EtdIndexMeta,
): string | undefined {
  if (!ivf.doc_vectors) {
    return "its vector store has no doc-vectors.bin to read a result's vector from";
  }
  if (!ivf.text_v) {
    return "its vector store's ids aren't the word index's docIds (ivf-meta.json has no text_v)";
  }
  if (ivf.text_v !== index.v) {
    return `its vector store lines up with word index ${ivf.text_v}, not this one (${index.v ?? 'unversioned'})`;
  }
  if (ivf.n !== index.n_docs) {
    return `its vector store has ${ivf.n.toLocaleString()} docs and the word index ${index.n_docs.toLocaleString()}`;
  }
  return undefined;
}

/**
 * `ids` best first by `scores` (one each, in the same order). A doc with
 * no score goes after every scored one; ties keep their word order.
 */
export function meaningOrder(
  ids: readonly number[],
  scores: ArrayLike<number>,
): number[] {
  const key = (i: number) => (Number.isNaN(scores[i]) ? -Infinity : scores[i]);
  return ids
    .map((_, i) => i)
    .sort((a, b) => key(b) - key(a) || a - b)
    .map(i => ids[i]);
}
