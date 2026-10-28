/**
 * The contract between EtdSearchService and the ETD static-index search engine
 * (the engine behind archive.org/download/etd-search/search.html).
 *
 * The engine runs entirely in the browser: it ranks against static index files
 * in the etd-search item using HTTP Range reads, so there is no search backend
 * to call. This file only describes the engine's surface. The implementation
 * comes from extracting the engine out of search.html into its own module.
 */

/**
 * One thesis record, as the engine displays it.
 */
export interface EtdRecord {
  /** 1-based document id, stable within an index build. */
  docId: number;

  title: string;

  /** Creator names as stored, joined with '; '. */
  creators: string;

  /** Date as stored in the record, e.g. '2019' or '2019-05'. May be empty. */
  date: string;

  /** Host of the record's landing url, e.g. 'dspace.mit.edu'. */
  domain: string;

  /** Full landing url (not the stub's truncated 88-byte field). */
  url: string;

  /** Archived copy of the landing page, present only when one is known to exist. */
  archivedUrl?: string;

  /** Abstract excerpt, when the record has one. */
  snippet?: string;

  /**
   * The snippet with the query's terms marked `{{{like this}}}`. Set on
   * records read through a query, when the record has a snippet.
   */
  highlight?: string;
}

/**
 * Structured filters the engine applies on top of the text query.
 *
 * These are structured rather than query syntax because not every facet has a
 * query form: language, for instance, is only a post-filter in the engine.
 */
export interface EtdFilters {
  /** Inclusive year bounds; either end may be open. */
  year?: { min?: number; max?: number };

  /** Language codes a record must have one of. */
  includeLanguages?: string[];

  /** Language codes a record must not have. */
  excludeLanguages?: string[];
}

/**
 * Totals for a query, known as soon as the query has been ranked.
 */
export interface EtdQueryResult {
  /** Number of matching records. May be an estimate; see `approximate`. */
  total: number;

  /** Whether `total` is an estimate rather than an exact count. */
  approximate: boolean;

  /**
   * How many records paging can actually reach. The engine keeps only its
   * top-ranked candidates (3000 in the current build), so this is at most
   * that cap even when `total` is in the millions.
   */
  reachable: number;
}

/**
 * Facet counts for a query's matching records, keyed by facet value.
 */
export interface EtdFacetCounts {
  /**
   * Keyed by year, e.g. '1994'. Before 1900 the index only knows decades,
   * so those count under the decade's first year ('1870').
   */
  year: Record<string, number>;

  /** Keyed by language code (ISO 639-1, e.g. 'en'). */
  language: Record<string, number>;

  /** Keyed by ISO 3166 alpha-2 country code. */
  country: Record<string, number>;

  /** Keyed by landing-url host. */
  domain: Record<string, number>;

  /** Keyed by institution label. */
  institution: Record<string, number>;
}

/**
 * Optional cancellation for any engine call.
 */
export interface EtdCallOptions {
  signal?: AbortSignal;
}

/**
 * A ranked query. Records are read through a cursor because the engine
 * verifies quoted phrases as it pages: filling n results may examine many
 * more candidates, so record k's position is only known once records before
 * it have been read.
 */
export interface EtdQuery {
  readonly result: EtdQueryResult;

  /**
   * Reads up to the next `count` records in rank order. Returns fewer when
   * the query has fewer left, and an empty array once it is exhausted.
   * A call that rejects (including on abort) must not advance the cursor.
   */
  next(count: number, options?: EtdCallOptions): Promise<EtdRecord[]>;

  /** Facet counts across the query's matching records. */
  facets(options?: EtdCallOptions): Promise<EtdFacetCounts>;

  /**
   * A record's 1-based place in the ranking, or undefined when it isn't
   * reachable (unmatched, or past the ranking cap). Optional: for tools
   * that explain a ranking, like the demo's compare panel.
   */
  rankOf?(docId: number): number | undefined;

  /** Whether a record matched at all, ranked or not. Optional, as rankOf. */
  matches?(docId: number): boolean;

  /**
   * What the phrase boost did to this query's ranking; absent when the
   * query wasn't boosted. Optional, as rankOf.
   */
  readonly boost?: EtdQueryBoost;
}

/**
 * The phrase boost's effect on one query: it moves docs holding the query's
 * words side by side to the top of the ranking.
 */
export interface EtdQueryBoost {
  /** The words the boost looked for side by side. */
  readonly words: readonly string[];

  /** The top `count` docIds before the boost re-ordered them. */
  topBefore(count: number): number[];

  /** A doc's 1-based rank before the boost; undefined if it wasn't ranked. */
  rankBefore(docId: number): number | undefined;

  /**
   * Which field holds the words side by side (title checked first), 'apart'
   * if none does, or undefined when the doc's text wasn't read in time.
   */
  placement(
    docId: number,
  ):
    | 'title'
    | 'creators'
    | 'abstract'
    | 'institution'
    | 'orcid'
    | 'apart'
    | undefined;
}

/**
 * The search engine over one ETD index.
 */
export interface EtdEngine {
  /** Resolves once the index manifest and directories have loaded. */
  readonly ready: Promise<void>;

  /**
   * Ranks `text` (in the engine's query syntax) under `filters`.
   */
  query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery>;

  /** Reads a single record, or undefined if the id is out of range. */
  record(
    docId: number,
    options?: EtdCallOptions,
  ): Promise<EtdRecord | undefined>;
}
