import { SortDirection, SortParam } from '@internetarchive/search-service';
import { CollectionBrowserContext, CollectionDisplayMode, SelectedFacets, SortField } from './models';
export interface RestorationState {
    displayMode?: CollectionDisplayMode;
    sortParam?: SortParam;
    selectedSort?: SortField;
    sortDirection?: SortDirection;
    selectedFacets: SelectedFacets;
    baseQuery?: string;
    currentPage?: number;
    dateRangeQueryClause?: string;
    titleQuery?: string;
    creatorQuery?: string;
    minSelectedDate?: string;
    maxSelectedDate?: string;
    selectedTitleFilter?: string;
    selectedCreatorFilter?: string;
}
export interface RestorationStateHandlerInterface {
    persistState(state: RestorationState): void;
    getRestorationState(): RestorationState;
}
export declare class RestorationStateHandler implements RestorationStateHandlerInterface {
    private context;
    private cookieDomain;
    private cookieExpiration;
    private cookiePath;
    constructor(options: {
        context: CollectionBrowserContext;
    });
    persistState(state: RestorationState): void;
    getRestorationState(): RestorationState;
    private persistViewStateToCookies;
    private loadTileViewStateFromCookies;
    private persistQueryStateToUrl;
    private loadQueryStateFromUrl;
    private stripQuotes;
}
