import type {
  CollectionExtraInfo,
  PageElementName,
  SearchServiceInterface,
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import type { FacetLoadStrategy, SelectedFacets, SortField } from '../models';
import type { CollectionBrowserDataSourceInterface } from './collection-browser-data-source-interface';

/**
 * Properties of collection browser that affect the overall search query
 */
export interface CollectionBrowserQueryState {
  baseQuery?: string;
  identifiers?: string[];
  withinCollection?: string;
  withinProfile?: string;
  profileElement?: PageElementName;
  searchType: SearchType;
  selectedFacets?: SelectedFacets;
  internalFilters?: SelectedFacets;
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
  isTVCollection: boolean;
  readonly sortParam: SortParam | null;
  readonly defaultSortField: SortField | null;
  readonly defaultSortDirection: SortDirection | null;
  readonly facetLoadStrategy: FacetLoadStrategy;
  readonly initialPageNumber: number;
  readonly maxPagesToManage: number;
  readonly currentVisiblePageNumbers: number[];
  readonly clearResultsOnEmptyQuery?: boolean;
  readonly dataSource?: CollectionBrowserDataSourceInterface;

  getSessionId(): Promise<string>;
  setSearchResultsLoading(loading: boolean): void;
  setFacetsLoading(loading: boolean): void;
  setTotalResultCount(count: number): void;
  setTileCount(count: number): void;
  applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo): void;
  emitEmptyResults(): void;
  emitSearchError(): void;
  emitQueryStateChanged(): void;
  refreshVisibleResults(): void;
}
