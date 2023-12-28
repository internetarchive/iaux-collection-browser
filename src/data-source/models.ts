import type {
  CollectionExtraInfo,
  PageType,
  SearchServiceInterface,
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import type { SelectedFacets, SortField } from '../models';

/**
 * A Map from collection identifiers to their corresponding collection titles.
 */
export type CollectionTitles = Map<string, string>;

/**
 * The subset of search service params that uniquely specify the type of results
 * that are sought by an instance of collection browser.
 */
export type PageSpecifierParams = {
  /**
   * What high-level type of page is being fetched for (search results, collection, or profile)
   */
  pageType: PageType;
  /**
   * The target identifier for collection or profile pages (e.g., "prelinger", "@brewster", ...)
   */
  pageTarget: string;
  /**
   * Which specific elements of a profile page to fetch. Corresponds to individual tab data
   * (e.g., "uploads", "reviews", ...)
   */
  pageElements?: string[];
};

/**
 * Properties of collection browser that affect the overall search query
 */
export interface CollectionBrowserQueryState {
  baseQuery?: string;
  withinCollection?: string;
  withinProfile?: string;
  profileElement?: string;
  searchType: SearchType;
  selectedFacets?: SelectedFacets;
  minSelectedDate?: string;
  maxSelectedDate?: string;
  selectedTitleFilter: string | null;
  selectedCreatorFilter: string | null;
  selectedSort?: SortField;
  sortDirection: SortDirection | null;
}

/**
 * Interface representing search-related state and operations required by the
 * data source on its host component.
 */
export interface CollectionBrowserSearchInterface
  extends CollectionBrowserQueryState {
  searchService?: SearchServiceInterface;
  queryErrorMessage?: string;
  readonly sortParam: SortParam | null;
  readonly suppressFacets?: boolean;
  readonly initialPageNumber: number;
  readonly currentVisiblePageNumbers: number[];

  getSessionId(): Promise<string>;
  setSearchResultsLoading(loading: boolean): void;
  setFacetsLoading(loading: boolean): void;
  setTotalResultCount(count: number): void;
  setTileCount(count: number): void;
  applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo): void;
  emitEmptyResults(): void;
  refreshVisibleResults(): void;
}
