import type {
  CollectionExtraInfo,
  PageElementName,
  SearchServiceInterface,
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import type { SelectedFacets, SortField } from '../models';
import type { CollectionBrowserDataSourceInterface } from './collection-browser-data-source-interface';

/**
 * Properties of collection browser that affect the overall search query
 */
export interface CollectionBrowserQueryState {
  baseQuery?: string;
  withinCollection?: string;
  withinProfile?: string;
  profileElement?: PageElementName;
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
  readonly sortParam: SortParam | null;
  readonly suppressFacets?: boolean;
  readonly initialPageNumber: number;
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
  emitQueryStateChanged(): void;
  refreshVisibleResults(): void;
}
