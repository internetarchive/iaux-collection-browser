import type {
  SearchType,
  SortDirection,
} from '@internetarchive/search-service';
import type { SelectedFacets, SortField } from '../models';

export interface CollectionBrowserSearchState {
  baseQuery: string;
  withinCollection?: string;
  searchType: SearchType;
  selectedFacets: SelectedFacets;
  minSelectedYear?: string;
  maxSelectedYear?: string;
  selectedSort?: SortField;
  sortDirection?: SortDirection;
  selectedTitlePrefix?: string;
  selectedCreatorPrefix?: string;
}
