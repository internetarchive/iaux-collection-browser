import type {
  CollectionExtraInfo,
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
  readonly sortParam: SortParam | null;
}

/**
 * Interface representing search-related state and operations required by the
 * data source on its host component.
 */
export interface CollectionBrowserSearchInterface
  extends CollectionBrowserQueryState {
  searchService?: SearchServiceInterface;
  queryErrorMessage?: string;
  readonly suppressFacets?: boolean;
  readonly initialPageNumber: number;
  readonly currentVisiblePageNumbers: number[];

  getSessionId(): Promise<string>;
  setSearchResultsLoading(loading: boolean): void;
  setFacetsLoading(loading: boolean): void;
  setTotalResultCount(count: number): void;
  applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo): void;
  emitEmptyResults(): void;
  refreshVisibleResults(): void;
}
