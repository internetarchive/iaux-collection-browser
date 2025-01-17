import type { ReactiveControllerHost } from 'lit';
import {
  AccountExtraInfo,
  Aggregation,
  Bucket,
  CollectionExtraInfo,
  FilterConstraint,
  FilterMap,
  FilterMapBuilder,
  PageElementMap,
  SearchParams,
  SearchResponseSessionContext,
  SearchResult,
  SearchType,
} from '@internetarchive/search-service';
import {
  prefixFilterAggregationKeys,
  type FacetBucket,
  type PrefixFilterType,
  TileModel,
  PrefixFilterCounts,
  RequestKind,
  SortField,
  SORT_OPTIONS,
} from '../models';
import { FACETLESS_PAGE_ELEMENTS, type PageSpecifierParams } from './models';
import type { CollectionBrowserDataSourceInterface } from './collection-browser-data-source-interface';
import type { CollectionBrowserSearchInterface } from './collection-browser-query-state';
import { sha1 } from '../utils/sha1';
import { log } from '../utils/log';

export class CollectionBrowserDataSource
  implements CollectionBrowserDataSourceInterface
{
  /**
   * All pages of tile models that have been fetched so far, indexed by their page
   * number (with the first being page 1).
   */
  private pages: Record<string, TileModel[]> = {};

  /**
   * Tile offset to apply when looking up tiles in the pages, in order to maintain
   * page alignment after tiles are removed.
   */
  private offset = 0;

  /**
   * Total number of tile models stored in this data source's pages
   */
  private numTileModels = 0;

  /**
   * A set of fetch IDs that are valid for the current query state
   */
  private fetchesInProgress = new Set<string>();

  /**
   * A record of the query key used for the last search.
   * If this changes, we need to load new results.
   */
  private previousQueryKey: string = '';

  /**
   * Whether the initial page of search results for the current query state
   * is presently being fetched.
   */
  private searchResultsLoading = false;

  /**
   * Whether the facets (aggregations) for the current query state are
   * presently being fetched.
   */
  private facetsLoading = false;

  /**
   * Whether the facets are actually visible -- if not, then we can delay any facet
   * fetches until they become visible.
   */
  private facetsReadyToLoad = false;

  /**
   * Whether further query changes should be ignored and not trigger fetches
   */
  private suppressFetches = false;

  /**
   * @inheritdoc
   */
  totalResults = 0;

  /**
   * @inheritdoc
   */
  endOfDataReached = false;

  /**
   * @inheritdoc
   */
  queryInitialized = false;

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
  accountExtraInfo?: AccountExtraInfo;

  /**
   * @inheritdoc
   */
  sessionContext?: SearchResponseSessionContext;

  /**
   * @inheritdoc
   */
  pageElements?: PageElementMap;

  /**
   * @inheritdoc
   */
  parentCollections?: string[] = [];

  /**
   * @inheritdoc
   */
  prefixFilterCountMap: Partial<Record<PrefixFilterType, PrefixFilterCounts>> =
    {};

  /**
   * @inheritdoc
   */
  queryErrorMessage?: string;

  /**
   * Internal property to store the private value backing the `initialSearchComplete` getter.
   */
  private _initialSearchCompletePromise: Promise<boolean> =
    Promise.resolve(true);

  /**
   * @inheritdoc
   */
  get initialSearchComplete(): Promise<boolean> {
    return this._initialSearchCompletePromise;
  }

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost &
      CollectionBrowserSearchInterface,
    /** Default size of result pages */
    private pageSize: number = 50,
  ) {
    // Just setting some property values
  }

  hostConnected(): void {
    this.setSearchResultsLoading(this.searchResultsLoading);
    this.setFacetsLoading(this.facetsLoading);
  }

  hostUpdate(): void {
    // This reactive controller hook is run whenever the host component (collection-browser) performs an update.
    // We check whether the host's state has changed in a way which should trigger a reset & new results fetch.

    // Only the currently-installed data source should react to the update
    if (!this.activeOnHost) return;

    // Copy loading states onto the host
    this.setSearchResultsLoading(this.searchResultsLoading);
    this.setFacetsLoading(this.facetsLoading);

    // Can't perform searches without a search service
    if (!this.host.searchService) return;

    // We should only reset if part of the full query state has changed
    const queryKeyChanged = this.pageFetchQueryKey !== this.previousQueryKey;
    if (!queryKeyChanged) return;

    // We should only reset if either:
    //  (a) our state permits a valid search, or
    //  (b) we have a blank query that we're showing a placeholder/message for
    const queryIsEmpty = !this.host.baseQuery;
    if (!(this.canPerformSearch || queryIsEmpty)) return;

    if (this.activeOnHost) this.host.emitQueryStateChanged();
    this.handleQueryChange();
  }

  /**
   * Returns whether this data source is the one currently installed on the host component.
   */
  private get activeOnHost(): boolean {
    return this.host.dataSource === this;
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
  reset(): void {
    log('Resetting CB data source');
    this.pages = {};
    this.aggregations = {};
    this.yearHistogramAggregation = undefined;
    this.pageElements = undefined;
    this.parentCollections = [];
    this.previousQueryKey = '';
    this.queryErrorMessage = undefined;

    this.offset = 0;
    this.numTileModels = 0;
    this.endOfDataReached = false;
    this.queryInitialized = false;
    this.facetsLoading = false;

    // Invalidate any fetches in progress
    this.fetchesInProgress.clear();

    this.setTotalResultCount(0);
    this.requestHostUpdate();
  }

  /**
   * @inheritdoc
   */
  addPage(pageNum: number, pageTiles: TileModel[]): void {
    this.pages[pageNum] = pageTiles;
    this.numTileModels += pageTiles.length;
    this.requestHostUpdate();
  }

  /**
   * @inheritdoc
   */
  addMultiplePages(firstPageNum: number, tiles: TileModel[]): void {
    const numPages = Math.ceil(tiles.length / this.pageSize);
    for (let i = 0; i < numPages; i += 1) {
      const pageStartIndex = this.pageSize * i;
      this.addPage(
        firstPageNum + i,
        tiles.slice(pageStartIndex, pageStartIndex + this.pageSize),
      );
    }

    const visiblePages = this.host.currentVisiblePageNumbers;
    const needsReload = visiblePages.some(
      page => page >= firstPageNum && page <= firstPageNum + numPages,
    );
    if (needsReload) {
      this.refreshVisibleResults();
    }
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
    const offsetIndex = index + this.offset;
    const expectedPageNum = Math.floor(offsetIndex / this.pageSize) + 1;
    const expectedIndexOnPage = offsetIndex % this.pageSize;

    let page = 1;
    let tilesSeen = 0;
    while (tilesSeen <= offsetIndex) {
      if (!this.pages[page]) {
        // If we encounter a missing page, either we're past all the results or the page data is sparse.
        // So just return the tile at the expected position if it exists.
        return this.pages[expectedPageNum]?.[expectedIndexOnPage];
      }

      if (tilesSeen + this.pages[page].length > offsetIndex) {
        return this.pages[page][offsetIndex - tilesSeen];
      }

      tilesSeen += this.pages[page].length;
      page += 1;
    }

    return this.pages[expectedPageNum]?.[expectedIndexOnPage];
  }

  /**
   * @inheritdoc
   */
  indexOf(tile: TileModel): number {
    return Object.values(this.pages).flat().indexOf(tile) - this.offset;
  }

  /**
   * @inheritdoc
   */
  getPageSize(): number {
    return this.pageSize;
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
  setTotalResultCount(count: number): void {
    this.totalResults = count;
    if (this.activeOnHost) {
      this.host.setTotalResultCount(count);
    }
  }

  /**
   * @inheritdoc
   */
  setFetchesSuppressed(suppressed: boolean): void {
    this.suppressFetches = suppressed;
  }

  /**
   * @inheritdoc
   */
  async handleQueryChange(): Promise<void> {
    // Don't react to the change if fetches are suppressed for this data source
    if (this.suppressFetches) return;

    this.reset();

    // Reset the `initialSearchComplete` promise with a new value for the imminent search
    let initialSearchCompleteResolver: (value: boolean) => void;
    this._initialSearchCompletePromise = new Promise(res => {
      initialSearchCompleteResolver = res;
    });

    // Fire the initial page & facet requests
    this.queryInitialized = true;
    await Promise.all([
      this.doInitialPageFetch(),
      this.canFetchFacets ? this.fetchFacets() : null,
    ]);

    // Resolve the `initialSearchComplete` promise for this search
    initialSearchCompleteResolver!(true);
  }

  /**
   * @inheritdoc
   */
  async handleFacetReadinessChange(ready: boolean): Promise<void> {
    const facetsBecameReady = !this.facetsReadyToLoad && ready;
    this.facetsReadyToLoad = ready;

    const needsFetch = facetsBecameReady && this.canFetchFacets;
    if (needsFetch) {
      this.fetchFacets();
    }
  }

  /**
   * Whether the data source & its host are in a state where a facet request should be fired.
   * (i.e., they aren't suppressed or already loading, etc.)
   */
  private get canFetchFacets(): boolean {
    // Don't fetch facets if they are suppressed entirely or not required for the current profile page element
    if (this.host.facetLoadStrategy === 'off') return false;
    if (FACETLESS_PAGE_ELEMENTS.includes(this.host.profileElement!))
      return false;

    // If facets are to be lazy-loaded, don't fetch them if they are not going to be visible anyway
    // (wait until they become visible instead)
    if (this.host.facetLoadStrategy !== 'eager' && !this.facetsReadyToLoad)
      return false;

    // Don't fetch facets again if they are already fetched or pending
    const facetsAlreadyFetched =
      Object.keys(this.aggregations ?? {}).length > 0;
    if (this.facetsLoading || facetsAlreadyFetched) return false;

    return true;
  }

  /**
   * @inheritdoc
   */
  map(
    callback: (
      model: TileModel,
      index: number,
      array: TileModel[],
    ) => TileModel,
  ): void {
    this.pages = Object.fromEntries(
      Object.entries(this.pages).map(([page, tileModels]) => [
        page,
        tileModels.map((model, index, array) =>
          model ? callback(model, index, array) : model,
        ),
      ]),
    );
    this.requestHostUpdate();
    this.refreshVisibleResults();
  }

  /**
   * @inheritdoc
   */
  checkAllTiles = (): void => {
    this.map(model => {
      const cloned = model.clone();
      cloned.checked = true;
      return cloned;
    });
  };

  /**
   * @inheritdoc
   */
  uncheckAllTiles = (): void => {
    this.map(model => {
      const cloned = model.clone();
      cloned.checked = false;
      return cloned;
    });
  };

  /**
   * @inheritdoc
   */
  removeCheckedTiles = (): void => {
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
    this.totalResults -= numChecked;
    this.host.setTileCount(this.size);
    this.host.setTotalResultCount(this.totalResults);
    this.requestHostUpdate();
    this.refreshVisibleResults();
  };

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
    predicate: (model: TileModel, index: number, array: TileModel[]) => unknown,
  ): TileModel[] {
    return Object.values(this.pages)
      .flat()
      .filter((model, index, array) =>
        model ? predicate(model, index, array) : false,
      );
  }

  /**
   * @inheritdoc
   */
  get canPerformSearch(): boolean {
    if (!this.host.searchService) return false;

    const trimmedQuery = this.host.baseQuery?.trim();
    const hasNonEmptyQuery = !!trimmedQuery;
    const isCollectionSearch = !!this.host.withinCollection;
    const isProfileSearch = !!this.host.withinProfile;
    const hasProfileElement = !!this.host.profileElement;
    const isMetadataSearch = this.host.searchType === SearchType.METADATA;

    // Metadata searches within a collection/profile are allowed to have no query.
    // Otherwise, a non-empty query must be set.
    return (
      hasNonEmptyQuery ||
      (isCollectionSearch && isMetadataSearch) ||
      (isProfileSearch && hasProfileElement && isMetadataSearch)
    );
  }

  /**
   * Sets the state for whether the initial set of search results for the
   * current query is loading
   */
  private setSearchResultsLoading(loading: boolean): void {
    this.searchResultsLoading = loading;
    if (this.activeOnHost) {
      this.host.setSearchResultsLoading(loading);
    }
  }

  /**
   * Sets the state for whether the facets for a query is loading
   */
  private setFacetsLoading(loading: boolean): void {
    this.facetsLoading = loading;
    if (this.activeOnHost) {
      this.host.setFacetsLoading(loading);
    }
  }

  /**
   * Requests that the host perform an update, provided this data
   * source is actively installed on it.
   */
  private requestHostUpdate(): void {
    if (this.activeOnHost) {
      this.host.requestUpdate();
    }
  }

  /**
   * Requests that the host refresh its visible tiles, provided this
   * data source is actively installed on it.
   */
  private refreshVisibleResults(): void {
    if (this.activeOnHost) {
      this.host.refreshVisibleResults();
    }
  }

  /**
   * The query key is a string that uniquely identifies the current search.
   * It consists of:
   *  - The current base query
   *  - The current collection/profile target & page element
   *  - The current search type
   *  - Any currently-applied facets
   *  - Any currently-applied date range
   *  - Any currently-applied prefix filters
   *  - The current sort options
   *
   * This lets us internally keep track of queries so we don't persist data that's
   * no longer relevant. Not meant to be human-readable.
   */
  get pageFetchQueryKey(): string {
    const profileKey = `pf;${this.host.withinProfile}--pe;${this.host.profileElement}`;
    const pageTarget = this.host.withinCollection ?? profileKey;
    const sortField = this.host.selectedSort ?? 'none';
    const sortDirection = this.host.sortDirection ?? 'none';
    return `fq:${this.fullQuery}-pt:${pageTarget}-st:${this.host.searchType}-sf:${sortField}-sd:${sortDirection}`;
  }

  /**
   * Similar to `pageFetchQueryKey` above, but excludes sort fields since they
   * are not relevant in determining aggregation queries.
   */
  get facetFetchQueryKey(): string {
    const profileKey = `pf;${this.host.withinProfile}--pe;${this.host.profileElement}`;
    const pageTarget = this.host.withinCollection ?? profileKey;
    return `fq:${this.fullQuery}-pt:${pageTarget}-st:${this.host.searchType}`;
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
        FilterConstraint.GREATER_OR_EQUAL,
      );
    }
    if (this.host.maxSelectedDate) {
      builder.addFilter(
        'year',
        this.host.maxSelectedDate,
        FilterConstraint.LESS_OR_EQUAL,
      );
    }

    // Add any selected facets
    if (this.host.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        this.host.selectedFacets,
      )) {
        const { name, values } = this.prepareFacetForFetch(
          facetName,
          facetValues,
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
        FilterConstraint.INCLUDE,
      );
    }
    if (this.host.selectedCreatorFilter) {
      builder.addFilter(
        'firstCreator',
        this.host.selectedCreatorFilter,
        FilterConstraint.INCLUDE,
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
      this.host.selectedFacets,
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
    facetValues: Record<string, FacetBucket>,
  ): string {
    const { name: facetQueryName, values } = this.prepareFacetForFetch(
      facetName,
      facetValues,
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
    facetValues: Record<string, FacetBucket>,
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
      clause => clause.length > 0,
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
    if (this.fetchesInProgress.has(facetFetchQueryKey)) return;
    this.fetchesInProgress.add(facetFetchQueryKey);

    this.setFacetsLoading(true);

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
      'aggregations',
    );

    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType,
    );
    const success = searchResponse?.success;

    // This is checking to see if the query has changed since the data was fetched.
    // If so, we just want to discard this set of aggregations because they are
    // likely no longer valid for the newer query.
    const queryChangedSinceFetch =
      !this.fetchesInProgress.has(facetFetchQueryKey);
    this.fetchesInProgress.delete(facetFetchQueryKey);
    if (queryChangedSinceFetch) return;

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      if (!errorMsg && !detailMsg) {
        // @ts-expect-error: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(
          'Missing or malformed facet response from backend',
          'error',
        );
      }

      this.setFacetsLoading(false);
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

    this.setFacetsLoading(false);
    this.requestHostUpdate();
  }

  /**
   * Performs the initial page fetch(es) for the current search state.
   */
  private async doInitialPageFetch(): Promise<void> {
    this.setSearchResultsLoading(true);
    // Try to batch 2 initial page requests when possible
    await this.fetchPage(this.host.initialPageNumber, 2);
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
    let numPages = pageNumber === 1 ? numInitialPages : 1;
    const numRows = this.pageSize * numPages;

    // if a fetch is already in progress for this query and page, don't fetch again
    const { pageFetchQueryKey } = this;
    const currentPageKey = `${pageFetchQueryKey}-p:${pageNumber}`;
    if (this.fetchesInProgress.has(currentPageKey)) return;

    for (let i = 0; i < numPages; i += 1) {
      this.fetchesInProgress.add(`${pageFetchQueryKey}-p:${pageNumber + i}`);
    }
    this.previousQueryKey = pageFetchQueryKey;

    let sortParams = this.host.sortParam ? [this.host.sortParam] : [];
    // TODO eventually the PPS should handle these defaults natively
    const isDefaultProfileSort =
      this.host.withinProfile && this.host.selectedSort === SortField.default;
    if (isDefaultProfileSort && this.host.defaultSortField) {
      const sortOption = SORT_OPTIONS[this.host.defaultSortField];
      if (sortOption.searchServiceKey) {
        sortParams = [
          {
            field: sortOption.searchServiceKey,
            direction: 'desc',
          },
        ];
      }
    }

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

    // log('=== FIRING PAGE REQUEST ===', params);
    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType,
    );
    // log('=== RECEIVED PAGE RESPONSE IN CB ===', searchResponse);
    const success = searchResponse?.success;

    // This is checking to see if the fetch has been invalidated since it was fired off.
    // If so, we just want to discard the response since it is for an obsolete query state.
    if (!this.fetchesInProgress.has(currentPageKey)) return;
    for (let i = 0; i < numPages; i += 1) {
      this.fetchesInProgress.delete(`${pageFetchQueryKey}-p:${pageNumber + i}`);
    }

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      this.queryErrorMessage = `${errorMsg ?? ''}${
        detailMsg ? `; ${detailMsg}` : ''
      }`;

      if (!this.queryErrorMessage) {
        this.queryErrorMessage = 'Missing or malformed response from backend';
        // @ts-expect-error: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(this.queryErrorMessage, 'error');
      }

      this.setSearchResultsLoading(false);
      this.requestHostUpdate();
      return;
    }

    this.setTotalResultCount(success.response.totalResults - this.offset);
    if (this.activeOnHost && this.totalResults === 0) {
      // display event to offshoot when result count is zero.
      this.host.emitEmptyResults();
    }

    this.sessionContext = success.sessionContext;
    if (this.host.withinCollection) {
      this.collectionExtraInfo = success.response.collectionExtraInfo;

      // For collections, we want the UI to respect the default sort option
      // which can be specified in metadata, or otherwise assumed to be week:desc
      if (this.activeOnHost) {
        this.host.applyDefaultCollectionSort(this.collectionExtraInfo);
      }

      if (this.collectionExtraInfo) {
        this.parentCollections = [].concat(
          this.collectionExtraInfo.public_metadata?.collection ?? [],
        );
      }
    } else if (this.host.withinProfile) {
      this.accountExtraInfo = success.response.accountExtraInfo;
      this.pageElements = success.response.pageElements;
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

      // Update the data source for each returned page.
      // For loans and web archives, we must account for receiving more pages than we asked for.
      const isUnpagedElement = ['lending', 'web_archives'].includes(
        this.host.profileElement!,
      );
      if (isUnpagedElement) {
        numPages = Math.ceil(results.length / this.pageSize);
        this.endOfDataReached = true;
        if (this.activeOnHost) this.host.setTileCount(this.totalResults);
      }

      for (let i = 0; i < numPages; i += 1) {
        const pageStartIndex = this.pageSize * i;
        this.addFetchedResultsToDataSource(
          pageNumber + i,
          results.slice(pageStartIndex, pageStartIndex + this.pageSize),
          !isUnpagedElement || i === numPages - 1,
        );
      }
    }

    // When we reach the end of the data, we can set the infinite scroller's
    // item count to the real total number of results (rather than the
    // temporary estimates based on pages rendered so far).
    if (this.size >= this.totalResults || results.length === 0) {
      this.endOfDataReached = true;
      if (this.activeOnHost) this.host.setTileCount(this.size);
    }

    this.setSearchResultsLoading(false);
    this.requestHostUpdate();
  }

  /**
   * Update the datasource from the fetch response
   *
   * @param pageNumber
   * @param results
   */
  private addFetchedResultsToDataSource(
    pageNumber: number,
    results: SearchResult[],
    needsReload = true,
  ): void {
    const tiles: TileModel[] = [];
    results?.forEach(result => {
      if (!result.identifier) return;
      tiles.push(new TileModel(result));
    });

    this.addPage(pageNumber, tiles);

    if (needsReload) {
      this.refreshVisibleResults();
    }
  }

  /**
   * Fetches the aggregation buckets for the given prefix filter type.
   */
  private async fetchPrefixFilterBuckets(
    filterType: PrefixFilterType,
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
      'aggregations',
    );

    const searchResponse = await this.host.searchService?.search(
      params,
      this.host.searchType,
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
      {},
    );

    this.requestHostUpdate();
  }

  /**
   * @inheritdoc
   */
  async updatePrefixFiltersForCurrentSort(): Promise<void> {
    if (['title', 'creator'].includes(this.host.selectedSort as SortField)) {
      const filterType = this.host.selectedSort as PrefixFilterType;
      if (!this.prefixFilterCountMap[filterType]) {
        this.updatePrefixFilterCounts(filterType);
      }
    }
  }

  /**
   * @inheritdoc
   */
  refreshLetterCounts(): void {
    if (Object.keys(this.prefixFilterCountMap).length > 0) {
      this.prefixFilterCountMap = {};
    }
    this.updatePrefixFiltersForCurrentSort();
    this.requestHostUpdate();
  }
}
