import type {
  SearchType,
  SortDirection,
} from '@internetarchive/search-service';
import type { SelectedFacets, SortField, TileModel } from '../models';

export interface CollectionBrowserState {
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

export interface CollectionBrowserDataModel {
  tiles: TileModel[];
}
