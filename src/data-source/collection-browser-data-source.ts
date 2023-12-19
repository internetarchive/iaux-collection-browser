import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  Aggregation,
  Bucket,
  CollectionExtraInfo,
  FilterConstraint,
  FilterMap,
  FilterMapBuilder,
  SearchParams,
  SearchResult,
  SearchType,
} from '@internetarchive/search-service';
import type { MediaType } from '@internetarchive/field-parsers';
import {
  prefixFilterAggregationKeys,
  type FacetBucket,
  type PrefixFilterType,
  type TileModel,
  PrefixFilterCounts,
} from '../models';
import type {
  CollectionBrowserSearchInterface,
  CollectionTitles,
  PageSpecifierParams,
} from './models';
import { sha1 } from '../utils/sha1';

type RequestKind = 'full' | 'hits' | 'aggregations';

export interface CollectionBrowserDataSourceInterface
  extends ReactiveController {
  /**
   * How many tile models are present in this data source
   */
  readonly size: number;

  /**
   * Whether the host has a valid set of properties for performing a search.
   * For instance, on the search page this requires a valid search service and a
   * non-empty query, while collection pages allow searching with an empty query
   * for MDS but not FTS.
   */
  readonly canPerformSearch: boolean;

  /**
   * A string key compactly representing the current full search state, which can
   * be used to determine, e.g., when a new search is required or whether an arriving
   * response is outdated.
   */
  readonly pageFetchQueryKey: string;

  /**
   * Similar to `pageFetchQueryKey`, but excluding properties that do not affect
   * the validity of a set of facets (e.g., sort).
   */
  readonly facetFetchQueryKey: string;

  /**
   * An object representing any collection- or profile-specific properties to be passed along
   * to the search service, specifying the exact page/tab to fetch results for.
   */
  readonly pageSpecifierParams: PageSpecifierParams | null;

  /**
   * A FilterMap object representing all filters applied to the current search,
   * including any facets, letter filters, and date ranges.
   */
  readonly filterMap: FilterMap;

  /**
   * The full set of aggregations retrieved for the current search.
   */
  readonly aggregations?: Record<string, Aggregation>;

  /**
   * The `year_histogram` aggregation retrieved for the current search.
   */
  readonly yearHistogramAggregation?: Aggregation;

  /**
   * A map from collection identifiers that appear on hits or aggregations for the
   * current search, to their human-readable collection titles.
   */
  readonly collectionTitles: CollectionTitles;

  /**
   * The "extra info" package provided by the PPS for collection pages, including details
   * used to populate the target collection header & About tab content.
   */
  readonly collectionExtraInfo?: CollectionExtraInfo;

  /**
   * An array of the current target collection's parent collections. Should include *all*
   * ancestors in the collection hierarchy, not just the immediate parent.
   */
  readonly parentCollections?: string[];

  /**
   * An object storing result counts for the current search bucketed by letter prefix.
   * Keys are the result field on which the prefixes are considered (e.g., title/creator)
   * and values are a Record mapping letters to their counts.
   */
  readonly prefixFilterCountMap: Partial<
    Record<PrefixFilterType, PrefixFilterCounts>
  >;

  /**
   * An array of all the tile models whose management checkboxes are checked
   */
  readonly checkedTileModels: TileModel[];

  /**
   * An array of all the tile models whose management checkboxes are unchecked
   */
  readonly uncheckedTileModels: TileModel[];

  /**
   * Adds the given page of tile models to the data source.
   * If the given page number already exists, that page will be overwritten.
   * @param pageNum Which page number to add (indexed starting from 1)
   * @param pageTiles The array of tile models for the new page
   */
  addPage(pageNum: number, pageTiles: TileModel[]): void;

  /**
   * Returns the given page of tile models from the data source.
   * @param pageNum Which page number to get (indexed starting from 1)
   */
  getPage(pageNum: number): TileModel[];

  /**
   * Returns the full set of paged tile models stored in this data source.
   */
  getAllPages(): Record<string, TileModel[]>;

  /**
   * Whether the data source contains any tiles for the given page number.
   * @param pageNum Which page number to query (indexed starting from 1)
   */
  hasPage(pageNum: number): boolean;

  /**
   * Returns the single tile model appearing at the given index in the
   * data source, with respect to the current page size. Returns `undefined` if
   * the corresponding page is not present on the data source or if it does not
   * contain a tile model at the corresponding index.
   * @param index The 0-based index (within the full data source) of the tile to get
   */
  getTileModelAt(index: number): TileModel | undefined;

  /**
   * Requests that the data source fire a backend request for the given page of results.
   * @param pageNum Which page number to fetch results for
   * @param numInitialPages How many pages should be batched together on an initial fetch
   */
  fetchPage(pageNum: number, numInitialPages?: number): Promise<void>;

  /**
   * Requests that the data source update its prefix bucket result counts for the given
   * type of prefix filter.
   * @param filterType Which prefixable field to update the buckets for (e.g., title/creator)
   */
  updatePrefixFilterCounts(filterType: PrefixFilterType): Promise<void>;

  /**
   * Changes the page size used by the data source, discarding any previously-fetched pages.
   *
   * **Note: this operation will reset any data stored in the data source!**
   * @param pageSize
   */
  setPageSize(pageSize: number): void;

  /**
   * Resets the data source to its empty state, with no result pages, aggregations, etc.
   */
  reset(): void;

  /**
   * Notifies the data source that a query change has occurred, which may trigger a data
   * reset & new fetches.
   */
  handleQueryChange(): void;

  /**
   * Applies the given map function to all of the tile models in every page of the data
   * source.
   * @param callback A callback function to apply on each tile model, as with Array.map
   */
  map(
    callback: (model: TileModel, index: number, array: TileModel[]) => TileModel
  ): void;

  /**
   * Checks every tile's management checkbox
   */
  checkAllTiles(): void;

  /**
   * Unchecks every tile's management checkbox
   */
  uncheckAllTiles(): void;

  /**
   * Removes all tile models that are currently checked & adjusts the paging
   * of the data source to account for any new gaps in the data.
   */
  removeCheckedTiles(): void;
}

export class CollectionBrowserDataSource
  implements CollectionBrowserDataSourceInterface
{
  private pages: Record<string, TileModel[]> = {};

  private offset = 0;

  private numTileModels = 0;

  /**
   * Maps the full query key to the pages being fetched for that query
   */
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  totalResults = 0;

  endOfDataReached = false;

  /**
   * @inheritdoc
   */
  aggregations?: Record<string, Aggregation>;

  /**
   * @inheritdoc
   */
  yearHistogramAggregation?: Aggregation;

  /**
   * @inheritdoc
   */
  collectionTitles = new Map<string, string>();

  /**
   * @inheritdoc
   */
  collectionExtraInfo?: CollectionExtraInfo;

  /**
   * @inheritdoc
   */
  parentCollections?: string[] = [];

  /**
   * @inheritdoc
   */
  prefixFilterCountMap: Partial<Record<PrefixFilterType, PrefixFilterCounts>> =
    {};

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost &
      CollectionBrowserSearchInterface,
    /** Default size of result pages */
    private pageSize: number
  ) {
    this.host.addController(this as CollectionBrowserDataSourceInterface);
  }

  /**
   * @inheritdoc
   */
  get size(): number {
    return this.numTileModels;
  }

  /**
   * @inheritdoc
   */
  addPage(pageNum: number, pageTiles: TileModel[]): void {
    this.pages[pageNum] = pageTiles;
    this.numTileModels += pageTiles.length;
    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  getPage(pageNum: number): TileModel[] {
    return this.pages[pageNum];
  }

  /**
   * @inheritdoc
   */
  getAllPages(): Record<string, TileModel[]> {
    return this.pages;
  }

  /**
   * @inheritdoc
   */
  hasPage(pageNum: number): boolean {
    return !!this.pages[pageNum];
  }

  /**
   * @inheritdoc
   */
  getTileModelAt(index: number): TileModel | undefined {
    const pageNum = Math.floor(index / this.pageSize) + 1;
    const indexOnPage = index % this.pageSize;
    return this.pages[pageNum]?.[indexOnPage];
  }

  /**
   * @inheritdoc
   */
  setPageSize(pageSize: number): void {
    this.reset();
    this.pageSize = pageSize;
  }

  /**
   * @inheritdoc
   */
  reset(): void {
    this.pages = {};
    this.aggregations = {};
    this.yearHistogramAggregation = undefined;
    this.pageFetchesInProgress = {};

    this.offset = 0;
    this.numTileModels = 0;
    this.totalResults = 0;

    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  async handleQueryChange(): Promise<void> {
    this.reset();
    await Promise.all([
      this.doInitialPageFetch(),
      this.host.suppressFacets ? null : this.fetchFacets(),
    ]);
  }

  /**
   * @inheritdoc
   */
  map(
    callback: (model: TileModel, index: number, array: TileModel[]) => TileModel
  ): void {
    this.pages = Object.fromEntries(
      Object.entries(this.pages).map(([page, tileModels]) => [
        page,
        tileModels.map((model, index, array) =>
          model ? callback(model, index, array) : model
        ),
      ])
    );
    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  checkAllTiles(): void {
    this.map(model => ({ ...model, checked: true }));
  }

  /**
   * @inheritdoc
   */
  uncheckAllTiles(): void {
    this.map(model => ({ ...model, checked: false }));
  }

  /**
   * @inheritdoc
   */
  removeCheckedTiles(): void {
    // To make sure our data source remains page-aligned, we will offset our data source by
    // the number of removed tiles, so that we can just add the offset when the infinite
    // scroller queries for cell contents.
    // This only matters while we're still viewing the same set of results. If the user changes
    // their query/filters/sort, then the data source is overwritten and the offset cleared.
    const { checkedTileModels, uncheckedTileModels } = this;
    const numChecked = checkedTileModels.length;
    if (numChecked === 0) return;
    this.offset += numChecked;
    const newPages: typeof this.pages = {};

    // Which page the remaining tile models start on, post-offset
    let offsetPageNumber = Math.floor(this.offset / this.pageSize) + 1;
    let indexOnPage = this.offset % this.pageSize;

    // Fill the pages up to that point with empty models
    for (let page = 1; page <= offsetPageNumber; page += 1) {
      const remainingHidden = this.offset - this.pageSize * (page - 1);
      const offsetCellsOnPage = Math.min(this.pageSize, remainingHidden);
      newPages[page] = Array(offsetCellsOnPage).fill(undefined);
    }

    // Shift all the remaining tiles into their new positions in the data source
    for (const model of uncheckedTileModels) {
      if (!newPages[offsetPageNumber]) newPages[offsetPageNumber] = [];
      newPages[offsetPageNumber].push(model);
      indexOnPage += 1;
      if (indexOnPage >= this.pageSize) {
        offsetPageNumber += 1;
        indexOnPage = 0;
      }
    }

    // Swap in the new pages
    this.pages = newPages;
    this.numTileModels -= numChecked;
    this.host.requestUpdate();
  }

  /**
   * @inheritdoc
   */
  get checkedTileModels(): TileModel[] {
    return this.getFilteredTileModels(model => model.checked);
  }

  /**
   * @inheritdoc
   */
  get uncheckedTileModels(): TileModel[] {
    return this.getFilteredTileModels(model => !model.checked);
  }

  /**
   * Returns a flattened, filtered array of all the tile models in the data source
   * for which the given predicate returns a truthy value.
   *
   * @param predicate A callback function to apply on each tile model, as with Array.filter
   * @returns A filtered array of tile models satisfying the predicate
   */
  private getFilteredTileModels(
    predicate: (model: TileModel, index: number, array: TileModel[]) => unknown
  ): TileModel[] {
    return Object.values(this.pages)
      .flat()
      .filter((model, index, array) =>
        model ? predicate(model, index, array) : false
      );
  }

  // DATA FETCHES

  /**
   * @inheritdoc
   */
  get canPerformSearch(): boolean {
    if (!this.host.searchService) return false;

    const trimmedQuery = this.host.baseQuery?.trim();
    const hasNonEmptyQuery = !!trimmedQuery;
    const isCollectionSearch = !!this.host.withinCollection;
    const isMetadataSearch = this.host.searchType === SearchType.METADATA;

    // Metadata searches within a collection are allowed to have no query.
    // Otherwise, a non-empty query must be set.
    return hasNonEmptyQuery || (isCollectionSearch && isMetadataSearch);
  }

  /**
   * The query key is a string that uniquely identifies the current search.
   * It consists of:
   *  - The current base query
   *  - The current collection
   *  - The current search type
   *  - Any currently-applied facets
   *  - Any currently-applied date range
   *  - Any currently-applied prefix filters
   *  - The current sort options
   *
   * This lets us keep track of queries so we don't persist data that's
   * no longer relevant.
   */
  get pageFetchQueryKey(): string {
    const sortField = this.host.sortParam?.field ?? 'none';
    const sortDirection = this.host.sortParam?.direction ?? 'none';
    return `${this.fullQuery}-${this.host.withinCollection}-${this.host.searchType}-${sortField}-${sortDirection}`;
  }

  /**
   * Similar to `pageFetchQueryKey` above, but excludes sort fields since they
   * are not relevant in determining aggregation queries.
   */
  get facetFetchQueryKey(): string {
    return `${this.fullQuery}-${this.host.withinCollection}-${this.host.searchType}`;
  }

  /**
   * Constructs a search service FilterMap object from the combination of
   * all the currently-applied filters. This includes any facets, letter
   * filters, and date range.
   */
  get filterMap(): FilterMap {
    const builder = new FilterMapBuilder();

    // Add the date range, if applicable
    if (this.host.minSelectedDate) {
      builder.addFilter(
        'year',
        this.host.minSelectedDate,
        FilterConstraint.GREATER_OR_EQUAL
      );
    }
    if (this.host.maxSelectedDate) {
      builder.addFilter(
        'year',
        this.host.maxSelectedDate,
        FilterConstraint.LESS_OR_EQUAL
      );
    }

    // Add any selected facets
    if (this.host.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        this.host.selectedFacets
      )) {
        const { name, values } = this.prepareFacetForFetch(
          facetName,
          facetValues
        );
        for (const [value, bucket] of Object.entries(values)) {
          let constraint;
          if (bucket.state === 'selected') {
            constraint = FilterConstraint.INCLUDE;
          } else if (bucket.state === 'hidden') {
            constraint = FilterConstraint.EXCLUDE;
          }

          if (constraint) {
            builder.addFilter(name, value, constraint);
          }
        }
      }
    }

    // Add any letter filters
    if (this.host.selectedTitleFilter) {
      builder.addFilter(
        'firstTitle',
        this.host.selectedTitleFilter,
        FilterConstraint.INCLUDE
      );
    }
    if (this.host.selectedCreatorFilter) {
      builder.addFilter(
        'firstCreator',
        this.host.selectedCreatorFilter,
        FilterConstraint.INCLUDE
      );
    }

    const filterMap = builder.build();
    return filterMap;
  }

  /**
   * Produces a compact unique ID for a search request that can help with debugging
   * on the backend by making related requests easier to trace through different services.
   * (e.g., tying the hits/aggregations requests for the same page back to a single hash).
   *
   * @param params The search service parameters for the request
   * @param kind The kind of request (hits-only, aggregations-only, or both)
   * @returns A Promise resolving to the uid to apply to the request
   */
  async requestUID(params: SearchParams, kind: RequestKind): Promise<string> {
    const paramsToHash = JSON.stringify({
      pageType: params.pageType,
      pageTarget: params.pageTarget,
      query: params.query,
      fields: params.fields,
      filters: params.filters,
      sort: params.sort,
      searchType: this.host.searchType,
    });

    const fullQueryHash = (await sha1(paramsToHash)).slice(0, 20); // First 80 bits of SHA-1 are plenty for this
    const sessionId = (await this.host.getSessionId()).slice(0, 20); // Likewise
    const page = params.page ?? 0;
    const kindPrefix = kind.charAt(0); // f = full, h = hits, a = aggregations
    const currentTime = Date.now();

    return `R:${fullQueryHash}-S:${sessionId}-P:${page}-K:${kindPrefix}-T:${currentTime}`;
  }

  /**
   * @inheritdoc
   */
  get pageSpecifierParams(): PageSpecifierParams | null {
    if (this.host.withinCollection) {
      return {
        pageType: 'collection_details',
        pageTarget: this.host.withinCollection,
      };
    }
    if (this.host.withinProfile) {
      return {
        pageType: 'account_details',
        pageTarget: this.host.withinProfile,
        pageElements: this.host.profileElement
          ? [this.host.profileElement]
          : [],
      };
    }
    return null;
  }

  /**
   * The full query, including year facets and date range clauses
   */
  private get fullQuery(): string | undefined {
    let fullQuery = this.host.baseQuery?.trim() ?? '';

    const { facetQuery, dateRangeQueryClause, sortFilterQueries } = this;

    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (dateRangeQueryClause) {
      fullQuery += ` AND ${dateRangeQueryClause}`;
    }
    if (sortFilterQueries) {
      fullQuery += ` AND ${sortFilterQueries}`;
    }
    return fullQuery.trim();
  }

  /**
   * Generates a query string representing the current set of applied facets
   *
   * Example: `mediatype:("collection" OR "audio" OR -"etree") AND year:("2000" OR "2001")`
   */
  private get facetQuery(): string | undefined {
    if (!this.host.selectedFacets) return undefined;
    const facetClauses = [];
    for (const [facetName, facetValues] of Object.entries(
      this.host.selectedFacets
    )) {
      facetClauses.push(this.buildFacetClause(facetName, facetValues));
    }
    return this.joinFacetClauses(facetClauses)?.trim();
  }

  private get dateRangeQueryClause(): string | undefined {
    if (!this.host.minSelectedDate || !this.host.maxSelectedDate) {
      return undefined;
    }

    return `year:[${this.host.minSelectedDate} TO ${this.host.maxSelectedDate}]`;
  }

  private get sortFilterQueries(): string {
    const queries = [this.titleQuery, this.creatorQuery];
    return queries.filter(q => q).join(' AND ');
  }

  /**
   * Returns a query clause identifying the currently selected title filter,
   * e.g., `firstTitle:X`.
   */
  private get titleQuery(): string | undefined {
    return this.host.selectedTitleFilter
      ? `firstTitle:${this.host.selectedTitleFilter}`
      : undefined;
  }

  /**
   * Returns a query clause identifying the currently selected creator filter,
   * e.g., `firstCreator:X`.
   */
  private get creatorQuery(): string | undefined {
    return this.host.selectedCreatorFilter
      ? `firstCreator:${this.host.selectedCreatorFilter}`
      : undefined;
  }

  /**
   * Builds an OR-joined facet clause for the given facet name and values.
   *
   * E.g., for name `subject` and values
   * `{ foo: { state: 'selected' }, bar: { state: 'hidden' } }`
   * this will produce the clause
   * `subject:("foo" OR -"bar")`.
   *
   * @param facetName The facet type (e.g., 'collection')
   * @param facetValues The facet buckets, mapped by their keys
   */
  private buildFacetClause(
    facetName: string,
    facetValues: Record<string, FacetBucket>
  ): string {
    const { name: facetQueryName, values } = this.prepareFacetForFetch(
      facetName,
      facetValues
    );
    const facetEntries = Object.entries(values);
    if (facetEntries.length === 0) return '';

    const facetValuesArray: string[] = [];
    for (const [key, facetData] of facetEntries) {
      const plusMinusPrefix = facetData.state === 'hidden' ? '-' : '';
      facetValuesArray.push(`${plusMinusPrefix}"${key}"`);
    }

    const valueQuery = facetValuesArray.join(` OR `);
    return `${facetQueryName}:(${valueQuery})`;
  }

  /**
   * Handles some special pre-request normalization steps for certain facet types
   * that require them.
   *
   * @param facetName The name of the facet type (e.g., 'language')
   * @param facetValues An array of values for that facet type
   */
  private prepareFacetForFetch(
    facetName: string,
    facetValues: Record<string, FacetBucket>
  ): { name: string; values: Record<string, FacetBucket> } {
    // eslint-disable-next-line prefer-const
    let [normalizedName, normalizedValues] = [facetName, facetValues];

    // The full "search engine" name of the lending field is "lending___status"
    if (facetName === 'lending') {
      normalizedName = 'lending___status';
    }

    return {
      name: normalizedName,
      values: normalizedValues,
    };
  }

  /**
   * Takes an array of facet clauses, and combines them into a
   * full AND-joined facet query string. Empty clauses are ignored.
   */
  private joinFacetClauses(facetClauses: string[]): string | undefined {
    const nonEmptyFacetClauses = facetClauses.filter(
      clause => clause.length > 0
    );
    return nonEmptyFacetClauses.length > 0
      ? `(${nonEmptyFacetClauses.join(' AND ')})`
      : undefined;
  }

  /**
   * Fires a backend request to fetch a set of aggregations (representing UI facets) for
   * the current search state.
   */
  private async fetchFacets(): Promise<void> {
    const trimmedQuery = this.host.baseQuery?.trim();
    if (!this.canPerformSearch) return;

    const { facetFetchQueryKey } = this;

    const sortParams = this.host.sortParam ? [this.host.sortParam] : [];
    const params: SearchParams = {
      ...this.pageSpecifierParams,
      query: trimmedQuery || '',
      rows: 0,
      filters: this.filterMap,
      // Fetch a few extra buckets beyond the 6 we show, in case some get suppressed
      aggregationsSize: 10,
      // Note: we don't need an aggregations param to fetch the default aggregations from the PPS.
      // The default aggregations for the search_results page type should be what we need here.
    };
    params.uid = await this.requestUID(
      { ...params, sort: sortParams },
      'aggregations'
    );

    this.host.setFacetsLoading(true);
    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType
    );
    const success = searchResponse?.success;

    // This is checking to see if the query has changed since the data was fetched.
    // If so, we just want to discard this set of aggregations because they are
    // likely no longer valid for the newer query.
    const queryChangedSinceFetch =
      facetFetchQueryKey !== this.facetFetchQueryKey;
    if (queryChangedSinceFetch) return;

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      if (!errorMsg && !detailMsg) {
        // @ts-ignore: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(
          'Missing or malformed facet response from backend',
          'error'
        );
      }

      return;
    }

    const { aggregations, collectionTitles } = success.response;
    this.aggregations = aggregations;

    if (collectionTitles) {
      for (const [id, title] of Object.entries(collectionTitles)) {
        this.collectionTitles.set(id, title);
      }
    }

    this.yearHistogramAggregation =
      success?.response?.aggregations?.year_histogram;

    this.host.setFacetsLoading(false);
  }

  /**
   * Performs the initial page fetch(es) for the current search state.
   */
  private async doInitialPageFetch(): Promise<void> {
    this.host.setSearchResultsLoading(true);
    // Try to batch 2 initial page requests when possible
    await this.fetchPage(this.host.initialPageNumber, 2);
    this.host.setSearchResultsLoading(false);
  }

  /**
   * Fetches one or more pages of results and updates the data source.
   *
   * @param pageNumber The page number to fetch
   * @param numInitialPages If this is an initial page fetch (`pageNumber = 1`),
   *  specifies how many pages to batch together in one request. Ignored
   *  if `pageNumber != 1`, defaulting to a single page.
   */
  async fetchPage(pageNumber: number, numInitialPages = 1): Promise<void> {
    const trimmedQuery = this.host.baseQuery?.trim();
    if (!this.canPerformSearch) return;

    // if we already have data, don't fetch again
    if (this.hasPage(pageNumber)) return;

    if (this.endOfDataReached) return;

    // Batch multiple initial page requests together if needed (e.g., can request
    // pages 1 and 2 together in a single request).
    const numPages = pageNumber === 1 ? numInitialPages : 1;
    const numRows = this.pageSize * numPages;

    // if a fetch is already in progress for this query and page, don't fetch again
    const { pageFetchQueryKey } = this;
    const pageFetches =
      this.pageFetchesInProgress[pageFetchQueryKey] ?? new Set();
    if (pageFetches.has(pageNumber)) return;
    for (let i = 0; i < numPages; i += 1) {
      pageFetches.add(pageNumber + i);
    }
    this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;

    const sortParams = this.host.sortParam ? [this.host.sortParam] : [];
    const params: SearchParams = {
      ...this.pageSpecifierParams,
      query: trimmedQuery || '',
      page: pageNumber,
      rows: numRows,
      sort: sortParams,
      filters: this.filterMap,
      aggregations: { omit: true },
    };
    params.uid = await this.requestUID(params, 'hits');

    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType
    );
    const success = searchResponse?.success;

    // This is checking to see if the query has changed since the data was fetched.
    // If so, we just want to discard the data since there should be a new query
    // right behind it.
    const queryChangedSinceFetch = pageFetchQueryKey !== this.pageFetchQueryKey;
    if (queryChangedSinceFetch) return;

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      this.host.queryErrorMessage = `${errorMsg ?? ''}${
        detailMsg ? `; ${detailMsg}` : ''
      }`;

      if (!this.host.queryErrorMessage) {
        this.host.queryErrorMessage =
          'Missing or malformed response from backend';
        // @ts-ignore: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(this.queryErrorMessage, 'error');
      }

      for (let i = 0; i < numPages; i += 1) {
        this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber + i);
      }

      this.host.setSearchResultsLoading(false);
      return;
    }

    this.totalResults = success.response.totalResults - this.offset;

    // display event to offshoot when result count is zero.
    if (this.totalResults === 0) {
      this.host.emitEmptyResults();
    }

    if (this.host.withinCollection) {
      this.collectionExtraInfo = success.response.collectionExtraInfo;

      // For collections, we want the UI to respect the default sort option
      // which can be specified in metadata, or otherwise assumed to be week:desc
      this.host.applyDefaultCollectionSort(this.collectionExtraInfo);

      if (this.collectionExtraInfo) {
        this.parentCollections = [].concat(
          this.collectionExtraInfo.public_metadata?.collection ?? []
        );
      }
    }

    const { results, collectionTitles } = success.response;
    if (results && results.length > 0) {
      // Load any collection titles present on the response into the cache,
      // or queue up preload fetches for them if none were present.
      if (collectionTitles) {
        for (const [id, title] of Object.entries(collectionTitles)) {
          this.collectionTitles.set(id, title);
        }
      }

      // Update the data source for each returned page
      for (let i = 0; i < numPages; i += 1) {
        const pageStartIndex = this.pageSize * i;
        this.addTilesToDataSource(
          pageNumber + i,
          results.slice(pageStartIndex, pageStartIndex + this.pageSize)
        );
      }
    }

    // When we reach the end of the data, we can set the infinite scroller's
    // item count to the real total number of results (rather than the
    // temporary estimates based on pages rendered so far).
    const resultCountDiscrepancy = numRows - results.length;
    if (resultCountDiscrepancy > 0) {
      this.endOfDataReached = true;
      this.host.setTotalResultCount(this.totalResults);
    }

    for (let i = 0; i < numPages; i += 1) {
      this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber + i);
    }
  }

  /**
   * Update the datasource from the fetch response
   *
   * @param pageNumber
   * @param results
   */
  private addTilesToDataSource(
    pageNumber: number,
    results: SearchResult[]
  ): void {
    // copy our existing datasource so when we set it below, it gets set
    // instead of modifying the existing dataSource since object changes
    // don't trigger a re-render
    // const datasource = { ...this.dataSource };
    const tiles: TileModel[] = [];
    results?.forEach(result => {
      if (!result.identifier) return;

      let loginRequired = false;
      let contentWarning = false;
      // Check if item and item in "modifying" collection, setting above flags
      if (
        result.collection?.values.length &&
        result.mediatype?.value !== 'collection'
      ) {
        for (const collection of result.collection?.values ?? []) {
          if (collection === 'loggedin') {
            loginRequired = true;
            if (contentWarning) break;
          }
          if (collection === 'no-preview') {
            contentWarning = true;
            if (loginRequired) break;
          }
        }
      }

      tiles.push({
        averageRating: result.avg_rating?.value,
        checked: false,
        collections: result.collection?.values ?? [],
        collectionFilesCount: result.collection_files_count?.value ?? 0,
        collectionSize: result.collection_size?.value ?? 0,
        commentCount: result.num_reviews?.value ?? 0,
        creator: result.creator?.value,
        creators: result.creator?.values ?? [],
        dateAdded: result.addeddate?.value,
        dateArchived: result.publicdate?.value,
        datePublished: result.date?.value,
        dateReviewed: result.reviewdate?.value,
        description: result.description?.values.join('\n'),
        favCount: result.num_favorites?.value ?? 0,
        href: this.collapseRepeatedQuotes(result.__href__?.value),
        identifier: result.identifier,
        issue: result.issue?.value,
        itemCount: result.item_count?.value ?? 0,
        mediatype: this.getMediatype(result),
        snippets: result.highlight?.values ?? [],
        source: result.source?.value,
        subjects: result.subject?.values ?? [],
        title: result.title?.value ?? '',
        volume: result.volume?.value,
        viewCount: result.downloads?.value ?? 0,
        weeklyViewCount: result.week?.value,
        loginRequired,
        contentWarning,
      });
    });
    this.addPage(pageNumber, tiles);
    const visiblePages = this.host.currentVisiblePageNumbers;
    const needsReload = visiblePages.includes(pageNumber);
    if (needsReload) {
      this.host.refreshVisibleResults();
    }
  }

  /**
   * Returns the mediatype string for the given search result, taking into account
   * the special `favorited_search` hit type.
   * @param result The search result to extract a mediatype from
   */
  private getMediatype(result: SearchResult): MediaType {
    /**
     * hit_type == 'favorited_search' is basically a new hit_type
     * - we are getting from PPS.
     * - which gives response for fav- collection
     * - having favorited items like account/collection/item etc..
     * - as user can also favorite a search result (a search page)
     * - so we need to have response (having fav- items and fav- search results)
     *
     * if backend hit_type == 'favorited_search'
     * - let's assume a "search" as new mediatype
     */
    if (result?.rawMetadata?.hit_type === 'favorited_search') {
      return 'search';
    }

    return result.mediatype?.value ?? 'data';
  }

  /**
   * Returns the input string, but removing one set of quotes from all instances of
   * ""clauses wrapped in two sets of quotes"". This assumes the quotes are already
   * URL-encoded.
   *
   * This should be a temporary measure to address the fact that the __href__ field
   * sometimes acquires extra quotation marks during query rewriting. Once there is a
   * full Lucene parser in place that handles quoted queries correctly, this can likely
   * be removed.
   */
  private collapseRepeatedQuotes(str?: string): string | undefined {
    return str?.replace(/%22%22(?!%22%22)(.+?)%22%22/g, '%22$1%22');
  }

  /**
   * Fetches the aggregation buckets for the given prefix filter type.
   */
  private async fetchPrefixFilterBuckets(
    filterType: PrefixFilterType
  ): Promise<Bucket[]> {
    const trimmedQuery = this.host.baseQuery?.trim();
    if (!this.canPerformSearch) return [];

    const filterAggregationKey = prefixFilterAggregationKeys[filterType];
    const sortParams = this.host.sortParam ? [this.host.sortParam] : [];

    const params: SearchParams = {
      ...this.pageSpecifierParams,
      query: trimmedQuery || '',
      rows: 0,
      filters: this.filterMap,
      // Only fetch the firstTitle or firstCreator aggregation
      aggregations: { simpleParams: [filterAggregationKey] },
      // Fetch all 26 letter buckets
      aggregationsSize: 26,
    };
    params.uid = await this.requestUID(
      { ...params, sort: sortParams },
      'aggregations'
    );

    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType
    );

    return (searchResponse?.success?.response?.aggregations?.[
      filterAggregationKey
    ]?.buckets ?? []) as Bucket[];
  }

  /**
   * Fetches and caches the prefix filter counts for the given filter type.
   */
  async updatePrefixFilterCounts(filterType: PrefixFilterType): Promise<void> {
    const { facetFetchQueryKey } = this;
    const buckets = await this.fetchPrefixFilterBuckets(filterType);

    // Don't update the filter counts for an outdated query (if it has been changed
    // since we sent the request)
    const queryChangedSinceFetch =
      facetFetchQueryKey !== this.facetFetchQueryKey;
    if (queryChangedSinceFetch) return;

    // Unpack the aggregation buckets into a simple map like { 'A': 50, 'B': 25, ... }
    this.prefixFilterCountMap = { ...this.prefixFilterCountMap }; // Clone the object to trigger an update
    this.prefixFilterCountMap[filterType] = buckets.reduce(
      (acc: Record<string, number>, bucket: Bucket) => {
        acc[(bucket.key as string).toUpperCase()] = bucket.doc_count;
        return acc;
      },
      {}
    );

    this.host.requestUpdate();
  }
}
