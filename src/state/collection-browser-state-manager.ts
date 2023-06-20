import { getDefaultSelectedFacets } from '../models';
import type { CollectionBrowserState } from './models';

export class CollectionBrowserStateManager {
  private _state: CollectionBrowserState = {
    baseQuery: '',
    selectedFacets: getDefaultSelectedFacets(),
  };
}
