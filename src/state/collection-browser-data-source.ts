import type { ReactiveController, ReactiveControllerHost } from 'lit';
import {
  Aggregation,
  SearchParams,
  SearchType,
} from '@internetarchive/search-service';
import type { FacetBucket, TileModel } from '../models';
import type { CollectionBrowserSearchState } from './models';
import { sha1 } from '../utils/sha1';

type RequestKind = 'full' | 'hits' | 'aggregations';
export interface CollectionBrowserDataSourceInterface
  extends ReactiveController {
  readonly size: number;

  addPage(pageNum: number, pageTiles: TileModel[]): void;

  getPage(pageNum: number): TileModel[];

  hasPage(pageNum: number): boolean;

  getTileModelAt(index: number): TileModel | undefined;

  setPageSize(pageSize: number): void;

  reset(): void;

  handleQueryChange(): void;

  /**
   * Applies the given map function to all of the tile models in every page of the data
   * source. This method updates the data source object in immutable fashion.
   *
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

  /**
   * An array of all the tile models whose management checkboxes are checked
   */
  readonly checkedTileModels: TileModel[];

  /**
   * An array of all the tile models whose management checkboxes are unchecked
   */
  readonly uncheckedTileModels: TileModel[];
}

export class CollectionBrowserDataSource
  implements CollectionBrowserDataSourceInterface
{
  private pages: Record<string, TileModel[]> = {};

  private aggregations?: Record<string, Aggregation>;

  private fullYearsHistogramAggregation: Aggregation | undefined;

  private offset = 0;

  private numTileModels = 0;

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost &
      CollectionBrowserSearchState,
    /** Default size of result pages */
    private pageSize: number
  ) {
    this.host.addController(this);
  }

  hostConnected(): void {}

  hostUpdated(): void {}

  get size(): number {
    return this.numTileModels;
  }

  addPage(pageNum: number, pageTiles: TileModel[]): void {
    this.pages[pageNum] = pageTiles;
    this.numTileModels += pageTiles.length;
    this.host.requestUpdate();
  }

  getPage(pageNum: number): TileModel[] {
    return this.pages[pageNum];
  }

  hasPage(pageNum: number): boolean {
    return !!this.pages[pageNum];
  }

  getTileModelAt(index: number): TileModel | undefined {
    const pageNum = Math.floor(index / this.pageSize) + 1;
    const indexOnPage = index % this.pageSize;
    return this.pages[pageNum]?.[indexOnPage];
  }

  setPageSize(pageSize: number): void {
    this.reset();
    this.pageSize = pageSize;
  }

  reset(): void {
    this.pages = {};
    this.numTileModels = 0;
    this.host.requestUpdate();
  }

  async handleQueryChange(): Promise<void> {
    this.reset();
  }

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

  private get canPerformSearch(): boolean {
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
  private get pageFetchQueryKey(): string {
    const sortField = this.host.sortParam?.field ?? 'none';
    const sortDirection = this.host.sortParam?.direction ?? 'none';
    return `${this.fullQuery}-${this.host.withinCollection}-${this.host.searchType}-${sortField}-${sortDirection}`;
  }

  /**
   * Similar to `pageFetchQueryKey` above, but excludes sort fields since they
   * are not relevant in determining aggregation queries.
   */
  private get facetFetchQueryKey(): string {
    return `${this.fullQuery}-${this.host.withinCollection}-${this.host.searchType}`;
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
  private async requestUID(
    params: SearchParams,
    kind: RequestKind
  ): Promise<string> {
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
   * Additional params to pass to the search service if targeting a collection page,
   * or null otherwise.
   */
  private get collectionParams(): {
    pageType: string;
    pageTarget: string;
  } | null {
    return this.host.withinCollection
      ? {
          pageType: 'collection_details',
          pageTarget: this.host.withinCollection,
        }
      : null;
  }

  /** The full query, including year facets and date range clauses */
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
   * Generates a query string for the given facets
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

  private async fetchFacets() {
    const trimmedQuery = this.host.baseQuery?.trim();
    if (!this.canPerformSearch) return;

    const { facetFetchQueryKey } = this;

    const sortParams = this.host.sortParam ? [this.host.sortParam] : [];
    const params: SearchParams = {
      ...this.collectionParams,
      query: trimmedQuery || '',
      rows: 0,
      filters: this.host.filterMap,
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

    const { aggregations /* , collectionTitles */ } = success.response;
    this.aggregations = aggregations;

    // if (collectionTitles) {
    //   this.collectionNameCache?.addKnownTitles(collectionTitles);
    // } else if (this.aggregations?.collection) {
    //   this.collectionNameCache?.preloadIdentifiers(
    //     (this.aggregations.collection.buckets as Bucket[]).map(bucket =>
    //       bucket.key?.toString()
    //     )
    //   );
    // }

    this.fullYearsHistogramAggregation =
      success?.response?.aggregations?.year_histogram;

    this.host.setFacetsLoading(false);
  }
}
