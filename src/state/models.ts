import type { SortDirection } from '@internetarchive/search-service';
import type { SelectedFacets, SortField, TileModel } from '../models';

export class SortOption {
  // eslint-disable-next-line no-useless-constructor
  constructor(readonly field: SortField, readonly direction: SortDirection) {
    // No body, just defining properties via args. eslint likes to complain about this.
  }
}

export interface CollectionBrowserState {
  baseQuery: string;
  withinCollection?: string;
  selectedFacets: SelectedFacets;
  minSelectedYear?: string;
  maxSelectedYear?: string;
  sort?: SortOption;
  selectedTitlePrefix?: string;
  selectedCreatorPrefix?: string;
}

export interface CollectionBrowserDataModel {
  tiles: TileModel[];
}
