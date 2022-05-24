import { LitElement, PropertyValues, TemplateResult } from 'lit';
import type { InfiniteScrollerCellProviderInterface } from '@internetarchive/infinite-scroller';
import type { SearchServiceInterface, SortDirection, SortParam } from '@internetarchive/search-service';
import { SharedResizeObserverInterface, SharedResizeObserverResizeHandlerInterface } from '@internetarchive/shared-resize-observer';
import '@internetarchive/infinite-scroller';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import './tiles/tile-dispatcher';
import './tiles/collection-browser-loading-tile';
import './sort-filter-bar/sort-filter-bar';
import './collection-facets';
import './circular-activity-indicator';
import './sort-filter-bar/sort-filter-bar';
import { SelectedFacets, SortField, CollectionBrowserContext, CollectionDisplayMode } from './models';
import { RestorationStateHandlerInterface } from './restoration-state-handler';
export declare class CollectionBrowser extends LitElement implements InfiniteScrollerCellProviderInterface, SharedResizeObserverResizeHandlerInterface {
    baseNavigationUrl?: string;
    baseImageUrl: string;
    searchService?: SearchServiceInterface;
    baseQuery?: string;
    displayMode?: CollectionDisplayMode;
    sortParam: SortParam | null;
    selectedSort: SortField;
    selectedTitleFilter: string | null;
    selectedCreatorFilter: string | null;
    sortDirection: SortDirection | null;
    dateRangeQueryClause?: string;
    pageSize: number;
    resizeObserver?: SharedResizeObserverInterface;
    titleQuery?: string;
    creatorQuery?: string;
    currentPage?: number;
    minSelectedDate?: string;
    maxSelectedDate?: string;
    selectedFacets?: SelectedFacets;
    showHistogramDatePicker: boolean;
    collectionNameCache?: CollectionNameCacheInterface;
    pageContext: CollectionBrowserContext;
    restorationStateHandler: RestorationStateHandlerInterface;
    mobileBreakpoint: number;
    /**
     * The page that the consumer wants to load.
     */
    private initialPageNumber;
    /**
     * This the the number of pages that we want to show.
     *
     * The data isn't necessarily loaded for all of the pages, but this lets us
     * know how many cells we should render.
     */
    private pagesToRender;
    private searchResultsLoading;
    private facetsLoading;
    private fullYearAggregationLoading;
    private aggregations?;
    private fullYearsHistogramAggregation;
    private totalResults?;
    private mobileView;
    private mobileFacetsVisible;
    private contentContainer;
    private languageCodeHandler;
    /**
     * When we're animated scrolling to the page, we don't want to fetch
     * all of the pages as it scrolls so this lets us know if we're scrolling
     */
    private isScrollingToCell;
    /**
     * When we've reached the end of the data, stop trying to fetch more
     */
    private endOfDataReached;
    private placeholderCellTemplate;
    private tileModelAtCellIndex;
    private get sortFilterQueries();
    private get estimatedTileCount();
    private get actualTileCount();
    /**
     * The results per page so we can paginate.
     *
     * This allows us to start in the middle of the search results and
     * fetch data before or after the current page. If we don't have a key
     * for the previous/next page, we'll fetch the next/previous page to populate it
     */
    private dataSource;
    private infiniteScroller;
    /**
     * Go to the given page of results
     *
     * @param pageNumber
     */
    goToPage(pageNumber: number): void;
    clearFilters(): void;
    render(): TemplateResult<1>;
    private userChangedSort;
    private selectedSortChanged;
    private displayModeChanged;
    private selectedTitleLetterChanged;
    private selectedCreatorLetterChanged;
    private titleLetterSelected;
    private creatorLetterSelected;
    private get facetDataLoading();
    private get facetsTemplate();
    private get loadingTemplate();
    private get listHeaderTemplate();
    private get queryDebuggingTemplate();
    private histogramDateRangeUpdated;
    firstUpdated(): void;
    updated(changed: PropertyValues): void;
    disconnectedCallback(): void;
    handleResize(entry: ResizeObserverEntry): void;
    private emitBaseQueryChanged;
    private disconnectResizeObserver;
    private setupResizeObserver;
    /**
     * When the visible cells change from the infinite scroller, we want to emit
     * which page is currently visible so the consumer can update its UI or the URL
     *
     * @param e
     * @returns
     */
    private visibleCellsChanged;
    private initialQueryChangeHappened;
    private historyPopOccurred;
    private previousQueryKey?;
    private handleQueryChange;
    private setupStateRestorationObserver;
    private boundNavigationHandler?;
    private historyNavigationHandler;
    private restoreState;
    private persistState;
    private doInitialPageFetch;
    private get fullQuery();
    private get fullQueryWithoutDate();
    /**
     * Generates a query string for the given facets
     *
     * Example: `mediatype:("collection" OR "audio" OR -"etree") AND year:("2000" OR "2001")`
     */
    private get facetQuery();
    facetsChanged(e: CustomEvent<SelectedFacets>): void;
    private fetchFacets;
    /**
     * If we haven't changed the query, we don't need to fetch the full year histogram
     *
     * @private
     * @type {string}
     * @memberof CollectionBrowser
     */
    private previousFullQueryNoDate?;
    /**
     * The query key is a string that uniquely identifies the current query
     * without the date range.
     *
     * If this doesn't change, we don't need to re-fetch the histogram date range
     */
    private get fullQueryNoDateKey();
    /**
     * This method is similar to fetching the facets above,
     * but only fetching the year histogram. There is a subtle difference
     * in how you have to fetch the year histogram where you can't use the
     * advanced JSON syntax like the other aggregations. It's a special
     * case that @ximm put it place.
     */
    private fetchFullYearHistogram;
    private scrollToPage;
    /**
     * The query key is a string that uniquely identifies the current query
     *
     * This lets us keep track of queries so we don't persist data that's
     * no longer relevant.
     */
    private get pageFetchQueryKey();
    private pageFetchesInProgress;
    fetchPage(pageNumber: number): Promise<void>;
    private preloadCollectionNames;
    /**
     * This is useful for determining whether we need to reload the scroller.
     *
     * When the fetch completes, we need to reload the scroller if the cells for that
     * page are visible, but if the page is not currenlty visible, we don't need to reload
     */
    private get currentVisiblePageNumbers();
    /**
     * Update the datasource from the fetch response
     *
     * @param pageNumber
     * @param docs
     */
    private updateDataSource;
    private etreeTitle;
    cellForIndex(index: number): TemplateResult | undefined;
    /**
     * When the user scrolls near to the bottom of the page, fetch the next page
     * increase the number of pages to render and start fetching data for the new page
     */
    private scrollThresholdReached;
    static styles: import("lit").CSSResult;
}
