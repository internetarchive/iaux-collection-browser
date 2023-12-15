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
 * Interface representing search-related state and operations required by the
 * data source on its host component.
 */
export interface CollectionBrowserSearchState {
  baseQuery?: string;
  withinCollection?: string;
  searchType: SearchType;
  selectedFacets?: SelectedFacets;
  minSelectedDate?: string;
  maxSelectedDate?: string;
  selectedSort?: SortField;
  sortDirection: SortDirection | null;
  readonly sortParam: SortParam | null;
  selectedTitleFilter: string | null;
  selectedCreatorFilter: string | null;
  searchService?: SearchServiceInterface;

  readonly suppressFacets?: boolean;
  readonly initialPageNumber: number;
  readonly currentVisiblePageNumbers: number[];
  queryErrorMessage?: string;

  getSessionId(): Promise<string>;
  setSearchResultsLoading(loading: boolean): void;
  setFacetsLoading(loading: boolean): void;
  setTotalResultCount(count: number): void;
  applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo): void;
  emitEmptyResults(): void;
  refreshVisibleResults(): void;
}
