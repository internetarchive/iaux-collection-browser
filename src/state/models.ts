import type {
  FilterMap,
  SearchServiceInterface,
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import type { SelectedFacets, SortField } from '../models';

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
  readonly filterMap: FilterMap;

  getSessionId(): Promise<string>;
  setSearchResultsLoading(loading: boolean): void;
  setFacetsLoading(loading: boolean): void;
}
