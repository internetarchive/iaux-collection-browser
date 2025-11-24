import type {
  FilterMap,
  Aggregation,
  CollectionExtraInfo,
  AccountExtraInfo,
  PageElementMap,
  SearchResponseSessionContext,
} from '@internetarchive/search-service';
import type { ReactiveController } from 'lit';
import type {
  PrefixFilterType,
  PrefixFilterCounts,
  TileModel,
} from '../models';
import type {
  PageSpecifierParams,
  CollectionTitles,
  TVChannelAliases,
  TVChannelMaps,
} from './models';

export interface CollectionBrowserDataSourceInterface
  extends ReactiveController {
  /**
   * How many tile models are present in this data source
   */
  readonly size: number;

  /**
   * How many results there are in the full result set for the current query
   * (not necessarily all loaded yet).
   */
  readonly totalResults: number;

  /**
   * Whether the host has a valid set of properties for performing a search.
   * For instance, on the search page this requires a valid search service and a
   * non-empty query, while collection pages allow searching with an empty query
   * for MDS but not FTS.
   */
  readonly canPerformSearch: boolean;

  /**
   * Whether the end of the set of results for the current query state has been
   * encountered (i.e., the last page of results).
   */
  readonly endOfDataReached: boolean;

  /**
   * True if the initial work for a new query state has been completed (i.e., firing initial
   * page/facet requests). False otherwise.
   */
  readonly queryInitialized: boolean;

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
   * The `year_histogram` or `date_histogram` aggregation retrieved for the current search.
   */
  readonly histogramAggregation?: Aggregation;

  /**
   * A map from collection identifiers that appear on hits or aggregations for the
   * current search, to their human-readable collection titles.
   */
  readonly collectionTitles: CollectionTitles;

  /**
   * A map from TV channel names appearing in `creator` aggregations, to their
   * more human-readable network names.
   */
  readonly tvChannelAliases: TVChannelAliases;

  /**
   * An object holding mappings from channels to networks, and programs to channels.
   */
  readonly tvChannelMaps: TVChannelMaps;

  /**
   * The "extra info" package provided by the PPS for collection pages, including details
   * used to populate the target collection header & About tab content.
   */
  readonly collectionExtraInfo?: CollectionExtraInfo;

  /**
   * The "extra info" package provided by the PPS for profile pages, including details
   * used to populate the profile header.
   */
  readonly accountExtraInfo?: AccountExtraInfo;

  /**
   * Context about the user session that produced the search response, from the PPS.
   */
  readonly sessionContext?: SearchResponseSessionContext;

  /**
   * The set of requested page elements for profile pages, if applicable. These represent
   * any content specific to the current profile tab.
   */
  readonly pageElements?: PageElementMap;

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
   * Any error message from the most recent search results response.
   */
  readonly queryErrorMessage?: string;

  /**
   * An array of all the tile models whose management checkboxes are checked
   */
  readonly checkedTileModels: TileModel[];

  /**
   * An array of all the tile models whose management checkboxes are unchecked
   */
  readonly uncheckedTileModels: TileModel[];

  /**
   * A Promise which, after each query change, resolves once the fetches for the initial
   * search have completed. Waits for *both* the hits and aggregations fetches to finish.
   *
   * Ensure you await this component's `updateComplete` promise before awaiting this
   * one, to ensure you do not await an obsolete promise from the previous update.
   */
  readonly initialSearchComplete: Promise<boolean>;

  /**
   * Resets the data source to its empty state, with no result pages, aggregations, etc.
   */
  reset(): void;

  /**
   * Resets the data source's result pages, keeping other state intact.
   */
  resetPages(): void;

  /**
   * Adds the given page of tile models to the data source.
   * If the given page number already exists, that page will be overwritten.
   * This method expects that the provided tiles already fit the configured page size; it
   * will not split them into multiple pages.
   * @param pageNum Which page number to add (indexed starting from 1)
   * @param pageTiles The array of tile models for the new page
   */
  addPage(pageNum: number, pageTiles: TileModel[]): void;

  /**
   * Adds all of the given pages of tile models to the data source, splitting them into
   * multiple pages according to the configured page size if necessary. Any pages that
   * have tiles added by this method will have any existing content overwritten.
   * @param firstPageNum Which page number to start adding pages from (pages are indexed starting from 1)
   * @param tiles The full array of tile models to add across one or more pages
   */
  addMultiplePages(firstPageNum: number, tiles: TileModel[]): void;

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
   * Returns the first numeric tile index corresponding to the given tile model object,
   * or -1 if the given tile model is not present.
   * @param tile The tile model to search for in the data source
   */
  indexOf(tile: TileModel): number;

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
   * Fetches and caches the prefix filter counts for the current sort type,
   * provided it is one that permits prefix filtering. (If not, this does nothing).
   */
  updatePrefixFiltersForCurrentSort(): Promise<void>;

  /**
   * Clears the cached letter counts for both title and creator, and
   * fetches a new set of counts for whichever of them is the currently
   * selected sort option (which may be neither).
   *
   * Call this whenever the counts are invalidated (e.g., by a query change).
   */
  refreshLetterCounts(): void;

  /**
   * Returns the current page size of the data source.
   */
  getPageSize(): number;

  /**
   * Changes the page size used by the data source, discarding any previously-fetched pages.
   *
   * **Note: this operation will reset any data stored in the data source!**
   * @param pageSize
   */
  setPageSize(pageSize: number): void;

  /**
   * Sets the total number of pages that should be batched together on each initial fetch.
   * @param pages How many initial pages to batch
   */
  setNumInitialPages(numPages: number): void;

  /**
   * Sets the total result count for this data source to the given value.
   * @param count The number of total results to set
   */
  setTotalResultCount(count: number): void;

  /**
   * Sets whether this data source should suppress further data fetches, i.e. ignore any
   * future query changes on its host that would trigger a page/facet fetch.
   * @param suppressed Whether further fetches for this data source should be suppressed
   */
  setFetchesSuppressed(suppressed: boolean): void;

  /**
   * Sets whether the end of the current data has been reached, indicating whether further
   * pages should be looked up.
   * @param reached Whether we are at the end of the data for the current query state
   */
  setEndOfDataReached(reached: boolean): void;

  /**
   * Notifies the data source that a query change has occurred, which may trigger a data
   * reset & new fetches.
   */
  handleQueryChange(): Promise<void>;

  /**
   * Notifies the data source that the readiness state of the facets has been changed, which
   * may trigger facet fetches if they were previously delayed.
   */
  handleFacetReadinessChange(ready: boolean): Promise<void>;

  /**
   * Applies the given map function to all of the tile models in every page of the data
   * source.
   * @param callback A callback function to apply on each tile model, as with Array.map
   */
  map(
    callback: (
      model: TileModel,
      index: number,
      array: TileModel[],
    ) => TileModel,
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
   * Fires requests to populate the TV channel mappings (chan2network and programs2chan),
   * or returns the existing Promise for any such request that has already been made.
   */
  populateTVChannelMaps(): Promise<TVChannelMaps>;
}
