import type {
  AggregationSortType,
  SearchParams,
} from '@internetarchive/search-service';

/**
 * A facet group a source can count and filter by. The key is both its
 * aggregation key and its filter field.
 */
export interface SourceFacet {
  key: string;
  title: string;
  /** For referring to the group's values, e.g. in the More… dialog. */
  pluralTitle: string;
  /** How its values are sorted by default. The source's own order if unset. */
  sort?: AggregationSortType;
  /** Shown after this group in the sidebar. At the end if unset. */
  after?: string;
  /**
   * How picked values combine: a match has any of them (the default, as on
   * archive.org), or all of them (e.g. requirements like "has an abstract").
   */
  combine?: 'any' | 'all';
}

/**
 * A search backend other than the page production service, plugged into
 * collection-browser through ServerlessSearchService. Typically a search that
 * runs in the browser itself, over static index files.
 *
 * A source turns collection-browser's SearchParams into its own request
 * type, runs that request, and describes its records as search hits. Paging,
 * sharing one query between the hits and aggregations requests, and building
 * SearchResponses are handled by ServerlessSearchService.
 *
 * Internal for now: ETD is the only source, so this shape is not settled
 * until a second one tries it.
 */
export interface SearchSource<Request, SourceRecord> {
  /** Resolves once the source can take queries. */
  readonly ready: Promise<void>;

  /**
   * Aggregation keys the source can return, as collection-browser names
   * them (e.g. 'language', 'year_histogram'). The default facets request
   * gets all of them.
   */
  readonly aggregationKeys: readonly string[];

  /**
   * The facet groups among `aggregationKeys`, described for display.
   * Aggregations that aren't groups (e.g. 'year_histogram') aren't listed.
   */
  readonly facets?: readonly SourceFacet[];

  /**
   * Whether the source can list matches for filters alone, with no query to
   * rank by (e.g. every result from the 2000s).
   */
  readonly listsWithoutQuery?: boolean;

  /**
   * The source request for these params, or undefined when they give the
   * source nothing to search on (the search then has no results).
   */
  toRequest(params: SearchParams): Request | undefined;

  /**
   * A stable key for a request. Requests with the same key share one query.
   */
  requestKey(request: Request): string;

  query(
    request: Request,
    options?: SourceCallOptions,
  ): Promise<SourceQuery<SourceRecord>>;

  /** The record behind an identifier, or undefined if there is none. */
  record(
    identifier: string,
    options?: SourceCallOptions,
  ): Promise<SourceRecord | undefined>;

  /**
   * Raw hit JSON for a record, in the page production service's shape
   * (`{ hit_type, fields }`). Set `fields.__href__` to link the tile
   * somewhere other than its archive.org details page.
   */
  toHit(record: SourceRecord): Record<string, unknown>;
}

/**
 * A ranked query: a forward-only cursor over its records plus aggregations.
 */
export interface SourceQuery<SourceRecord> {
  readonly result: SourceQueryResult;

  /**
   * When this is a first answer (e.g. from part of a long scan): resolves
   * with the better answer to the same request, which may itself be refined
   * again, or undefined if there won't be one. ServerlessSearchService then
   * serves the better answer and says the results changed.
   */
  readonly refined?: Promise<SourceQuery<SourceRecord> | undefined>;

  /**
   * Reads up to the next `count` records in order. Returns fewer when the
   * query has fewer left, and an empty array once it is exhausted. A call
   * that rejects (including on abort) must not advance the cursor.
   */
  next(count: number, options?: SourceCallOptions): Promise<SourceRecord[]>;

  /**
   * Raw aggregations JSON for the given keys (a subset of the source's
   * aggregationKeys), each capped at `size` buckets when given.
   */
  aggregations(
    keys: readonly string[],
    size?: number,
    options?: SourceCallOptions,
  ): Promise<Record<string, unknown>>;
}

export interface SourceQueryResult {
  /** Number of matching records, shown as the result count. */
  total: number;

  /** How many records paging can reach; at most `total`. */
  reachable: number;
}

export interface SourceCallOptions {
  signal?: AbortSignal;
}
