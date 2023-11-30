import type {
  SearchServiceInterface,
  SearchType,
  SortDirection,
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
  selectedTitleFilter: string | null;
  selectedCreatorFilter: string | null;
  searchService?: SearchServiceInterface;
}
