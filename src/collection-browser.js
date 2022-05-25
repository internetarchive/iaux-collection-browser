import { __decorate } from "tslib";
/* eslint-disable import/no-duplicates */
import { html, css, LitElement, nothing, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import '@internetarchive/infinite-scroller';
import './tiles/tile-dispatcher';
import './tiles/collection-browser-loading-tile';
import './sort-filter-bar/sort-filter-bar';
import './collection-facets';
import './circular-activity-indicator';
import './sort-filter-bar/sort-filter-bar';
import { SortField, SortFieldToMetadataField, defaultSelectedFacets, } from './models';
import { RestorationStateHandler, } from './restoration-state-handler';
import chevronIcon from './assets/img/icons/chevron';
import { LanguageCodeHandler } from './language-code-handler/language-code-handler';
let CollectionBrowser = class CollectionBrowser extends LitElement {
    constructor() {
        super(...arguments);
        this.baseImageUrl = 'https://archive.org';
        this.sortParam = null;
        this.selectedSort = SortField.relevance;
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = null;
        this.sortDirection = null;
        this.pageSize = 50;
        this.showHistogramDatePicker = false;
        this.pageContext = 'search';
        this.restorationStateHandler = new RestorationStateHandler({
            context: this.pageContext,
        });
        this.mobileBreakpoint = 600;
        this.loggedIn = false;
        /**
         * If item management UI active
         */
        this.isManageView = false;
        /**
         * The page that the consumer wants to load.
         */
        this.initialPageNumber = 1;
        /**
         * This the the number of pages that we want to show.
         *
         * The data isn't necessarily loaded for all of the pages, but this lets us
         * know how many cells we should render.
         */
        this.pagesToRender = this.initialPageNumber;
        this.searchResultsLoading = false;
        this.facetsLoading = false;
        this.fullYearAggregationLoading = false;
        this.mobileView = false;
        this.mobileFacetsVisible = false;
        this.languageCodeHandler = new LanguageCodeHandler();
        /**
         * When we're animated scrolling to the page, we don't want to fetch
         * all of the pages as it scrolls so this lets us know if we're scrolling
         */
        this.isScrollingToCell = false;
        /**
         * When we've reached the end of the data, stop trying to fetch more
         */
        this.endOfDataReached = false;
        this.placeholderCellTemplate = html `<collection-browser-loading-tile></collection-browser-loading-tile>`;
        /**
         * The results per page so we can paginate.
         *
         * This allows us to start in the middle of the search results and
         * fetch data before or after the current page. If we don't have a key
         * for the previous/next page, we'll fetch the next/previous page to populate it
         */
        this.dataSource = {};
        // we only want to scroll on the very first query change
        // so this keeps track of whether we've already set the initial query
        this.initialQueryChangeHappened = false;
        this.historyPopOccurred = false;
        // this maps the query to the pages being fetched for that query
        this.pageFetchesInProgress = {};
    }
    tileModelAtCellIndex(index) {
        var _a;
        const pageNumber = Math.floor(index / this.pageSize) + 1;
        const itemIndex = index % this.pageSize;
        const model = (_a = this.dataSource[pageNumber]) === null || _a === void 0 ? void 0 : _a[itemIndex];
        /**
         * If we encounter a model we don't have yet and we're not in the middle of an
         * automated scroll, fetch the page and just return undefined.
         * The datasource will be updated once the page is loaded and the cell will be rendered.
         *
         * We disable it during the automated scroll since we may fetch pages for cells the
         * user may never see.
         */
        if (!model && !this.isScrollingToCell) {
            this.fetchPage(pageNumber);
        }
        return model;
    }
    get sortFilterQueries() {
        const queries = [this.titleQuery, this.creatorQuery];
        return queries.filter(q => q).join(' AND ');
    }
    // this is the total number of tiles we expect if
    // the data returned is a full page worth
    // this is useful for putting in placeholders for the expected number of tiles
    get estimatedTileCount() {
        return this.pagesToRender * this.pageSize;
    }
    // this is the actual number of tiles in the datasource,
    // which is useful for removing excess placeholder tiles
    // once we reached the end of the data
    get actualTileCount() {
        return Object.keys(this.dataSource).reduce((acc, page) => acc + this.dataSource[page].length, 0);
    }
    /**
     * Go to the given page of results
     *
     * @param pageNumber
     */
    goToPage(pageNumber) {
        this.initialPageNumber = pageNumber;
        this.pagesToRender = pageNumber;
        this.scrollToPage(pageNumber);
    }
    clearFilters() {
        this.selectedFacets = defaultSelectedFacets;
        this.sortParam = null;
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = null;
        this.titleQuery = undefined;
        this.creatorQuery = undefined;
        this.selectedSort = SortField.relevance;
        this.sortDirection = null;
    }
    render() {
        return html `
      <div id="content-container" class=${this.mobileView ? 'mobile' : ''}>
        <div id="left-column" class="column">
          <div id="mobile-header-container">
            ${this.mobileView
            ? html `
                  <div id="mobile-filter-collapse">
                    <h1
                      @click=${() => {
                this.mobileFacetsVisible = !this.mobileFacetsVisible;
            }}
                      @keyup=${() => {
                this.mobileFacetsVisible = !this.mobileFacetsVisible;
            }}
                    >
                      <span
                        class="collapser ${this.mobileFacetsVisible
                ? 'open'
                : ''}"
                      >
                        ${chevronIcon}
                      </span>
                      Filters
                    </h1>
                  </div>
                `
            : nothing}
            <div id="results-total">
              <span id="big-results-count"
                >${this.totalResults !== undefined
            ? this.totalResults.toLocaleString()
            : '-'}</span
              >
              <span id="big-results-label">Results</span>
            </div>
          </div>
          <div
            id="facets-container"
            class=${!this.mobileView || this.mobileFacetsVisible
            ? 'expanded'
            : ''}
          >
            ${this.facetsTemplate}
          </div>
        </div>
        <div id="right-column" class="column">
          ${this.searchResultsLoading ? this.loadingTemplate : nothing}
          <sort-filter-bar
            .selectedSort=${this.selectedSort}
            .sortDirection=${this.sortDirection}
            .displayMode=${this.displayMode}
            .selectedTitleFilter=${this.selectedTitleFilter}
            .selectedCreatorFilter=${this.selectedCreatorFilter}
            .resizeObserver=${this.resizeObserver}
            @sortChanged=${this.userChangedSort}
            @displayModeChanged=${this.displayModeChanged}
            @titleLetterChanged=${this.titleLetterSelected}
            @creatorLetterChanged=${this.creatorLetterSelected}
          ></sort-filter-bar>

          ${this.displayMode === `list-compact`
            ? this.listHeaderTemplate
            : nothing}
          ${!this.searchResultsLoading && this.totalResults === 0
            ? html `
                <h2>
                  Your search did not match any items in the Archive. Try
                  different keywords or a more general search.
                </h2>
              `
            : nothing}

          <infinite-scroller
            class="${ifDefined(this.displayMode)}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `;
    }
    userChangedSort(e) {
        var _a;
        const { selectedSort, sortDirection } = e.detail;
        this.selectedSort = selectedSort;
        this.sortDirection = sortDirection;
        if (((_a = this.currentPage) !== null && _a !== void 0 ? _a : 1) > 1) {
            this.goToPage(1);
        }
        this.currentPage = 1;
    }
    selectedSortChanged() {
        if (this.selectedSort === 'relevance' || this.sortDirection === null) {
            this.sortParam = null;
            return;
        }
        const sortField = SortFieldToMetadataField[this.selectedSort];
        if (!sortField)
            return;
        this.sortParam = { field: sortField, direction: this.sortDirection };
    }
    displayModeChanged(e) {
        this.displayMode = e.detail.displayMode;
    }
    selectedTitleLetterChanged() {
        this.titleQuery = this.selectedTitleFilter
            ? `firstTitle:${this.selectedTitleFilter}`
            : undefined;
    }
    selectedCreatorLetterChanged() {
        this.creatorQuery = this.selectedCreatorFilter
            ? `firstCreator:${this.selectedCreatorFilter}`
            : undefined;
    }
    titleLetterSelected(e) {
        this.selectedCreatorFilter = null;
        this.selectedTitleFilter = e.detail.selectedLetter;
    }
    creatorLetterSelected(e) {
        this.selectedTitleFilter = null;
        this.selectedCreatorFilter = e.detail.selectedLetter;
    }
    get facetDataLoading() {
        return this.facetsLoading || this.fullYearAggregationLoading;
    }
    get facetsTemplate() {
        return html `
      ${this.facetsLoading ? this.loadingTemplate : nothing}
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .aggregations=${this.aggregations}
        .fullYearsHistogramAggregation=${this.fullYearsHistogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .collectionNameCache=${this.collectionNameCache}
        .languageCodeHandler=${this.languageCodeHandler}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetDataLoading}
        ?fullYearAggregationLoading=${this.fullYearAggregationLoading}
      ></collection-facets>
    `;
    }
    get loadingTemplate() {
        return html `
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `;
    }
    get listHeaderTemplate() {
        return html `
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${'list-header'}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
        >
        </tile-dispatcher>
      </div>
    `;
    }
    get queryDebuggingTemplate() {
        var _a, _b;
        return html `
      <div>
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Sort Filter Query: ${this.sortFilterQueries}</li>
          <li>Date Range Query: ${this.dateRangeQueryClause}</li>
          <li>Sort: ${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field} ${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>
    `;
    }
    histogramDateRangeUpdated(e) {
        const { minDate, maxDate } = e.detail;
        this.dateRangeQueryClause = `year:[${minDate} TO ${maxDate}]`;
    }
    firstUpdated() {
        this.setupStateRestorationObserver();
        this.restoreState();
    }
    updated(changed) {
        if (changed.has('displayMode') ||
            changed.has('baseNavigationUrl') ||
            changed.has('baseImageUrl')) {
            this.infiniteScroller.reload();
        }
        if (changed.has('baseQuery')) {
            this.emitBaseQueryChanged();
        }
        if (changed.has('currentPage') || changed.has('displayMode')) {
            this.persistState();
        }
        if (changed.has('baseQuery') ||
            changed.has('titleQuery') ||
            changed.has('creatorQuery') ||
            changed.has('dateRangeQueryClause') ||
            changed.has('sortParam') ||
            changed.has('selectedFacets') ||
            changed.has('searchService')) {
            this.handleQueryChange();
        }
        if (changed.has('selectedSort') || changed.has('sortDirection')) {
            this.selectedSortChanged();
        }
        if (changed.has('selectedTitleFilter')) {
            this.selectedTitleLetterChanged();
        }
        if (changed.has('selectedCreatorFilter')) {
            this.selectedCreatorLetterChanged();
        }
        if (changed.has('pagesToRender')) {
            if (!this.endOfDataReached) {
                this.infiniteScroller.itemCount = this.estimatedTileCount;
            }
        }
        if (changed.has('resizeObserver')) {
            const oldObserver = changed.get('resizeObserver');
            if (oldObserver)
                this.disconnectResizeObserver(oldObserver);
            this.setupResizeObserver();
        }
    }
    disconnectedCallback() {
        if (this.resizeObserver) {
            this.disconnectResizeObserver(this.resizeObserver);
        }
        if (this.boundNavigationHandler) {
            window.removeEventListener('popstate', this.boundNavigationHandler);
        }
    }
    handleResize(entry) {
        if (entry.target === this.contentContainer) {
            this.mobileView = entry.contentRect.width < 600;
        }
    }
    emitBaseQueryChanged() {
        this.dispatchEvent(new CustomEvent('baseQueryChanged', {
            detail: {
                baseQuery: this.baseQuery,
            },
        }));
    }
    disconnectResizeObserver(resizeObserver) {
        resizeObserver.removeObserver({
            target: this.contentContainer,
            handler: this,
        });
    }
    setupResizeObserver() {
        if (!this.resizeObserver)
            return;
        this.resizeObserver.addObserver({
            target: this.contentContainer,
            handler: this,
        });
    }
    /**
     * When the visible cells change from the infinite scroller, we want to emit
     * which page is currently visible so the consumer can update its UI or the URL
     *
     * @param e
     * @returns
     */
    visibleCellsChanged(e) {
        if (this.isScrollingToCell)
            return;
        const { visibleCellIndices } = e.detail;
        if (visibleCellIndices.length === 0)
            return;
        const lastVisibleCellIndex = visibleCellIndices[visibleCellIndices.length - 1];
        const lastVisibleCellPage = Math.floor(lastVisibleCellIndex / this.pageSize) + 1;
        if (this.currentPage !== lastVisibleCellPage) {
            this.currentPage = lastVisibleCellPage;
        }
        const event = new CustomEvent('visiblePageChanged', {
            detail: {
                pageNumber: lastVisibleCellPage,
            },
        });
        this.dispatchEvent(event);
    }
    async handleQueryChange() {
        // only reset if the query has actually changed
        if (!this.searchService || this.pageFetchQueryKey === this.previousQueryKey)
            return;
        this.previousQueryKey = this.pageFetchQueryKey;
        this.dataSource = {};
        this.pageFetchesInProgress = {};
        this.endOfDataReached = false;
        this.pagesToRender = this.initialPageNumber;
        if (!this.initialQueryChangeHappened && this.initialPageNumber > 1) {
            this.scrollToPage(this.initialPageNumber);
        }
        this.initialQueryChangeHappened = true;
        // if the query changed as part of a window.history pop event, we don't want to
        // persist the state because it overwrites the forward history
        if (!this.historyPopOccurred) {
            this.persistState();
            this.historyPopOccurred = false;
        }
        await Promise.all([
            this.doInitialPageFetch(),
            this.fetchFacets(),
            this.fetchFullYearHistogram(),
        ]);
    }
    setupStateRestorationObserver() {
        if (this.boundNavigationHandler)
            return;
        this.boundNavigationHandler = this.historyNavigationHandler.bind(this);
        // when the user navigates back, we want to update the UI to match the URL
        window.addEventListener('popstate', this.boundNavigationHandler);
    }
    historyNavigationHandler() {
        this.historyPopOccurred = true;
        this.restoreState();
    }
    restoreState() {
        var _a, _b, _c, _d, _e, _f;
        const restorationState = this.restorationStateHandler.getRestorationState();
        this.displayMode = restorationState.displayMode;
        this.selectedSort = (_a = restorationState.selectedSort) !== null && _a !== void 0 ? _a : SortField.relevance;
        this.sortDirection = (_b = restorationState.sortDirection) !== null && _b !== void 0 ? _b : null;
        this.selectedTitleFilter = (_c = restorationState.selectedTitleFilter) !== null && _c !== void 0 ? _c : null;
        this.selectedCreatorFilter = (_d = restorationState.selectedCreatorFilter) !== null && _d !== void 0 ? _d : null;
        this.selectedFacets = restorationState.selectedFacets;
        this.baseQuery = restorationState.baseQuery;
        this.titleQuery = restorationState.titleQuery;
        this.creatorQuery = restorationState.creatorQuery;
        this.dateRangeQueryClause = restorationState.dateRangeQueryClause;
        this.sortParam = (_e = restorationState.sortParam) !== null && _e !== void 0 ? _e : null;
        this.currentPage = (_f = restorationState.currentPage) !== null && _f !== void 0 ? _f : 1;
        this.minSelectedDate = restorationState.minSelectedDate;
        this.maxSelectedDate = restorationState.maxSelectedDate;
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage);
        }
    }
    persistState() {
        var _a, _b, _c, _d, _e;
        const restorationState = {
            displayMode: this.displayMode,
            sortParam: (_a = this.sortParam) !== null && _a !== void 0 ? _a : undefined,
            selectedSort: this.selectedSort,
            sortDirection: (_b = this.sortDirection) !== null && _b !== void 0 ? _b : undefined,
            selectedFacets: (_c = this.selectedFacets) !== null && _c !== void 0 ? _c : defaultSelectedFacets,
            baseQuery: this.baseQuery,
            currentPage: this.currentPage,
            dateRangeQueryClause: this.dateRangeQueryClause,
            titleQuery: this.titleQuery,
            creatorQuery: this.creatorQuery,
            minSelectedDate: this.minSelectedDate,
            maxSelectedDate: this.maxSelectedDate,
            selectedTitleFilter: (_d = this.selectedTitleFilter) !== null && _d !== void 0 ? _d : undefined,
            selectedCreatorFilter: (_e = this.selectedCreatorFilter) !== null && _e !== void 0 ? _e : undefined,
        };
        this.restorationStateHandler.persistState(restorationState);
    }
    async doInitialPageFetch() {
        this.searchResultsLoading = true;
        await this.fetchPage(this.initialPageNumber);
        this.searchResultsLoading = false;
    }
    get fullQuery() {
        let { fullQueryWithoutDate } = this;
        const { dateRangeQueryClause } = this;
        if (dateRangeQueryClause) {
            fullQueryWithoutDate += ` AND ${dateRangeQueryClause}`;
        }
        return fullQueryWithoutDate;
    }
    get fullQueryWithoutDate() {
        if (!this.baseQuery)
            return undefined;
        let fullQuery = this.baseQuery;
        const { facetQuery, sortFilterQueries } = this;
        if (facetQuery) {
            fullQuery += ` AND ${facetQuery}`;
        }
        if (sortFilterQueries) {
            fullQuery += ` AND ${sortFilterQueries}`;
        }
        return fullQuery;
    }
    /**
     * Generates a query string for the given facets
     *
     * Example: `mediatype:("collection" OR "audio" OR -"etree") AND year:("2000" OR "2001")`
     */
    get facetQuery() {
        if (!this.selectedFacets)
            return undefined;
        const facetQuery = [];
        for (const [facetName, facetValues] of Object.entries(this.selectedFacets)) {
            const facetEntries = Object.entries(facetValues);
            // eslint-disable-next-line no-continue
            if (facetEntries.length === 0)
                continue;
            const facetValuesArray = [];
            for (const [key, facetState] of facetEntries) {
                const plusMinusPrefix = facetState === 'hidden' ? '-' : '';
                if (facetName === 'language') {
                    const languages = this.languageCodeHandler.getCodeArrayFromCodeString(key);
                    for (const language of languages) {
                        facetValuesArray.push(`${plusMinusPrefix}"${language}"`);
                    }
                }
                else {
                    facetValuesArray.push(`${plusMinusPrefix}"${key}"`);
                }
            }
            const valueQuery = facetValuesArray.join(` OR `);
            facetQuery.push(`${facetName}:(${valueQuery})`);
        }
        return facetQuery.length > 0 ? `(${facetQuery.join(' AND ')})` : undefined;
    }
    facetsChanged(e) {
        this.selectedFacets = e.detail;
    }
    async fetchFacets() {
        var _a, _b;
        if (!this.fullQuery)
            return;
        const aggregations = {
            advancedParams: [
                {
                    field: 'subjectSorter',
                    size: 6,
                },
                {
                    field: 'mediatypeSorter',
                    size: 6,
                },
                {
                    field: 'languageSorter',
                    size: 6,
                },
                {
                    field: 'creatorSorter',
                    size: 6,
                },
                {
                    field: 'collection',
                    size: 12,
                },
                {
                    field: 'year',
                    size: 50,
                },
            ],
        };
        const params = {
            query: this.fullQuery,
            fields: ['identifier'],
            aggregations,
            rows: 1,
        };
        this.facetsLoading = true;
        const results = await ((_a = this.searchService) === null || _a === void 0 ? void 0 : _a.search(params));
        this.facetsLoading = false;
        this.aggregations = (_b = results === null || results === void 0 ? void 0 : results.success) === null || _b === void 0 ? void 0 : _b.response.aggregations;
    }
    /**
     * The query key is a string that uniquely identifies the current query
     * without the date range.
     *
     * If this doesn't change, we don't need to re-fetch the histogram date range
     */
    get fullQueryNoDateKey() {
        var _a, _b;
        return `${this.fullQueryWithoutDate}-${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field}-${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}`;
    }
    /**
     * This method is similar to fetching the facets above,
     * but only fetching the year histogram. There is a subtle difference
     * in how you have to fetch the year histogram where you can't use the
     * advanced JSON syntax like the other aggregations. It's a special
     * case that @ximm put it place.
     */
    async fetchFullYearHistogram() {
        var _a, _b, _c, _d;
        const { fullQueryNoDateKey } = this;
        if (!this.fullQueryWithoutDate ||
            fullQueryNoDateKey === this.previousFullQueryNoDate)
            return;
        this.previousFullQueryNoDate = fullQueryNoDateKey;
        const aggregations = {
            simpleParams: ['year'],
        };
        const params = {
            query: this.fullQueryWithoutDate,
            fields: ['identifier'],
            aggregations,
            rows: 1,
        };
        this.fullYearAggregationLoading = true;
        const results = await ((_a = this.searchService) === null || _a === void 0 ? void 0 : _a.search(params));
        this.fullYearAggregationLoading = false;
        this.fullYearsHistogramAggregation =
            (_d = (_c = (_b = results === null || results === void 0 ? void 0 : results.success) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.aggregations) === null || _d === void 0 ? void 0 : _d.year_histogram;
    }
    scrollToPage(pageNumber) {
        const cellIndexToScrollTo = this.pageSize * (pageNumber - 1);
        // without this setTimeout, Safari just pauses until the `fetchPage` is complete
        // then scrolls to the cell
        setTimeout(() => {
            this.isScrollingToCell = true;
            this.infiniteScroller.scrollToCell(cellIndexToScrollTo, true);
            // This timeout is to give the scroll animation time to finish
            // then updating the infinite scroller once we're done scrolling
            // There's no scroll animation completion callback so we're
            // giving it 0.5s to finish.
            setTimeout(() => {
                this.isScrollingToCell = false;
                this.infiniteScroller.reload();
            }, 500);
        }, 0);
    }
    /**
     * The query key is a string that uniquely identifies the current query
     *
     * This lets us keep track of queries so we don't persist data that's
     * no longer relevant.
     */
    get pageFetchQueryKey() {
        var _a, _b;
        return `${this.fullQuery}-${(_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field}-${(_b = this.sortParam) === null || _b === void 0 ? void 0 : _b.direction}`;
    }
    async fetchPage(pageNumber) {
        var _a, _b, _c, _d, _e;
        if (!this.fullQuery)
            return;
        // if we already have data, don't fetch again
        if (this.dataSource[pageNumber])
            return;
        if (this.endOfDataReached)
            return;
        // if a fetch is already in progress for this query and page, don't fetch again
        const { pageFetchQueryKey } = this;
        const pageFetches = (_a = this.pageFetchesInProgress[pageFetchQueryKey]) !== null && _a !== void 0 ? _a : new Set();
        if (pageFetches.has(pageNumber))
            return;
        pageFetches.add(pageNumber);
        this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;
        const sortParams = this.sortParam ? [this.sortParam] : [];
        const params = {
            query: this.fullQuery,
            fields: [
                'addeddate',
                'avg_rating',
                'collections_raw',
                'creator',
                'date',
                'description',
                'downloads',
                'identifier',
                'issue',
                'item_count',
                'mediatype',
                'num_favorites',
                'num_reviews',
                'publicdate',
                'reviewdate',
                'source',
                'subject',
                'title',
                'volume',
            ],
            page: pageNumber,
            rows: this.pageSize,
            sort: sortParams,
        };
        const results = await ((_b = this.searchService) === null || _b === void 0 ? void 0 : _b.search(params));
        const success = results === null || results === void 0 ? void 0 : results.success;
        if (!success)
            return;
        this.totalResults = success.response.numFound;
        // this is checking to see if the query has changed since the data was fetched
        // if so, we just want to discard the data since there should be a new query
        // right behind it
        const searchQuery = success.responseHeader.params.qin;
        const searchSort = success.responseHeader.params.sort;
        let sortChanged = false;
        if (!searchSort) {
            // if we went from no sort to sort, the sort has changed
            if (this.sortParam) {
                sortChanged = true;
            }
        }
        else {
            // check if the sort has changed
            const split = searchSort.split(' ');
            if (split.length > 1) {
                const field = searchSort.split(' ')[0];
                const direction = searchSort.split(' ')[1];
                if (field !== ((_c = this.sortParam) === null || _c === void 0 ? void 0 : _c.field) ||
                    direction !== ((_d = this.sortParam) === null || _d === void 0 ? void 0 : _d.direction)) {
                    sortChanged = true;
                }
            }
        }
        const queryChangedSinceFetch = searchQuery !== this.fullQuery || sortChanged;
        if (queryChangedSinceFetch)
            return;
        const { docs } = success.response;
        if (docs && docs.length > 0) {
            this.preloadCollectionNames(docs);
            this.updateDataSource(pageNumber, docs);
        }
        if (docs.length < this.pageSize) {
            this.endOfDataReached = true;
            // this updates the infinite scroller to show the actual size
            this.infiniteScroller.itemCount = this.actualTileCount;
        }
        (_e = this.pageFetchesInProgress[pageFetchQueryKey]) === null || _e === void 0 ? void 0 : _e.delete(pageNumber);
        this.searchResultsLoading = false;
    }
    preloadCollectionNames(docs) {
        var _a;
        const collectionIds = docs.map(doc => { var _a; return (_a = doc.collections_raw) === null || _a === void 0 ? void 0 : _a.values; }).flat();
        const collectionIdsArray = Array.from(new Set(collectionIds));
        (_a = this.collectionNameCache) === null || _a === void 0 ? void 0 : _a.preloadIdentifiers(collectionIdsArray);
    }
    /**
     * This is useful for determining whether we need to reload the scroller.
     *
     * When the fetch completes, we need to reload the scroller if the cells for that
     * page are visible, but if the page is not currenlty visible, we don't need to reload
     */
    get currentVisiblePageNumbers() {
        const visibleCells = this.infiniteScroller.getVisibleCellIndices();
        const visiblePages = new Set();
        visibleCells.forEach(cellIndex => {
            const visiblePage = Math.floor(cellIndex / this.pageSize) + 1;
            visiblePages.add(visiblePage);
        });
        return Array.from(visiblePages);
    }
    /**
     * Update the datasource from the fetch response
     *
     * @param pageNumber
     * @param docs
     */
    updateDataSource(pageNumber, docs) {
        // copy our existing datasource so when we set it below, it gets set
        // instead of modifying the existing dataSource since object changes
        // don't trigger a re-render
        const datasource = { ...this.dataSource };
        const tiles = [];
        docs === null || docs === void 0 ? void 0 : docs.forEach(doc => {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7;
            if (!doc.identifier)
                return;
            let loginRequired = false;
            let contentWarning = false;
            // Check if item and item in "modifying" collection, setting above flags
            if (((_a = doc.collections_raw) === null || _a === void 0 ? void 0 : _a.values.length) &&
                ((_b = doc.mediatype) === null || _b === void 0 ? void 0 : _b.value) !== 'collection') {
                for (const collection of (_c = doc.collections_raw) === null || _c === void 0 ? void 0 : _c.values) {
                    if (collection === 'loggedin') {
                        loginRequired = true;
                        if (contentWarning)
                            break;
                    }
                    if (collection === 'no-preview') {
                        contentWarning = true;
                        if (loginRequired)
                            break;
                    }
                }
            }
            tiles.push({
                averageRating: (_d = doc.avg_rating) === null || _d === void 0 ? void 0 : _d.value,
                collections: (_f = (_e = doc.collections_raw) === null || _e === void 0 ? void 0 : _e.values) !== null && _f !== void 0 ? _f : [],
                commentCount: (_h = (_g = doc.num_reviews) === null || _g === void 0 ? void 0 : _g.value) !== null && _h !== void 0 ? _h : 0,
                creator: (_j = doc.creator) === null || _j === void 0 ? void 0 : _j.value,
                creators: (_l = (_k = doc.creator) === null || _k === void 0 ? void 0 : _k.values) !== null && _l !== void 0 ? _l : [],
                dateAdded: (_m = doc.addeddate) === null || _m === void 0 ? void 0 : _m.value,
                dateArchived: (_o = doc.publicdate) === null || _o === void 0 ? void 0 : _o.value,
                datePublished: (_p = doc.date) === null || _p === void 0 ? void 0 : _p.value,
                dateReviewed: (_q = doc.reviewdate) === null || _q === void 0 ? void 0 : _q.value,
                description: (_r = doc.description) === null || _r === void 0 ? void 0 : _r.value,
                favCount: (_t = (_s = doc.num_favorites) === null || _s === void 0 ? void 0 : _s.value) !== null && _t !== void 0 ? _t : 0,
                identifier: doc.identifier,
                issue: (_u = doc.issue) === null || _u === void 0 ? void 0 : _u.value,
                itemCount: (_w = (_v = doc.item_count) === null || _v === void 0 ? void 0 : _v.value) !== null && _w !== void 0 ? _w : 0,
                mediatype: (_y = (_x = doc.mediatype) === null || _x === void 0 ? void 0 : _x.value) !== null && _y !== void 0 ? _y : 'data',
                source: (_z = doc.source) === null || _z === void 0 ? void 0 : _z.value,
                subjects: (_1 = (_0 = doc.subject) === null || _0 === void 0 ? void 0 : _0.values) !== null && _1 !== void 0 ? _1 : [],
                title: this.etreeTitle((_2 = doc.title) === null || _2 === void 0 ? void 0 : _2.value, (_3 = doc.mediatype) === null || _3 === void 0 ? void 0 : _3.value, (_4 = doc.collection) === null || _4 === void 0 ? void 0 : _4.values),
                volume: (_5 = doc.volume) === null || _5 === void 0 ? void 0 : _5.value,
                viewCount: (_7 = (_6 = doc.downloads) === null || _6 === void 0 ? void 0 : _6.value) !== null && _7 !== void 0 ? _7 : 0,
                loginRequired,
                contentWarning,
            });
        });
        datasource[pageNumber] = tiles;
        this.dataSource = datasource;
        const visiblePages = this.currentVisiblePageNumbers;
        const needsReload = visiblePages.includes(pageNumber);
        if (needsReload) {
            this.infiniteScroller.reload();
        }
    }
    /*
     * Convert etree titles
     * "[Creator] Live at [Place] on [Date]" => "[Date]: [Place]"
     *
     * Todo: Check collection(s) for etree, need to get as array.
     * Current search-service only returns first collection as string.
     */
    etreeTitle(title, mediatype, collections) {
        if (mediatype === 'etree' || (collections === null || collections === void 0 ? void 0 : collections.includes('etree'))) {
            const regex = /^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/;
            const newTitle = title === null || title === void 0 ? void 0 : title.replace(regex, '$3: $2');
            if (newTitle) {
                return `${newTitle}`;
            }
        }
        return title !== null && title !== void 0 ? title : '';
    }
    cellForIndex(index) {
        const model = this.tileModelAtCellIndex(index);
        if (!model)
            return undefined;
        return html ` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .baseImageUrl=${this.baseImageUrl}
      .model=${model}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`;
    }
    /**
     * When the user scrolls near to the bottom of the page, fetch the next page
     * increase the number of pages to render and start fetching data for the new page
     */
    scrollThresholdReached() {
        this.pagesToRender += 1;
        this.fetchPage(this.pagesToRender);
    }
};
CollectionBrowser.styles = css `
    :host {
      display: block;
    }

    #content-container {
      display: flex;
    }

    .collapser {
      display: inline-block;
    }

    .collapser svg {
      width: 10px;
      height: 10px;
      transition: transform 0.2s ease-out;
    }

    .collapser.open svg {
      transform: rotate(90deg);
    }

    #mobile-filter-collapse h1 {
      cursor: pointer;
    }

    #content-container.mobile {
      display: block;
    }

    .column {
      padding-top: 2rem;
    }

    #right-column {
      flex: 1;
      position: relative;
      border-left: 1px solid rgb(232, 232, 232);
      padding-left: 1rem;
    }

    .mobile #right-column {
      border-left: none;
      padding: 0;
    }

    #left-column {
      width: 18rem;
      padding-right: 12px;
      padding-right: 1rem;
    }

    .mobile #left-column {
      width: 100%;
      padding: 0;
    }

    #mobile-header-container {
      display: flex;
      justify-content: space-between;
    }

    #facets-container {
      position: relative;
      max-height: 0;
      transition: max-height 0.2s ease-in-out;
      z-index: 1;
    }

    .mobile #facets-container {
      overflow: hidden;
    }

    #facets-container.expanded {
      max-height: 2000px;
    }

    #results-total {
      display: flex;
      align-items: center;
      margin-bottom: 5rem;
    }

    .mobile #results-total {
      margin-bottom: 0;
    }

    #big-results-count {
      font-size: 2.4rem;
      font-weight: 500;
      margin-right: 5px;
    }

    #big-results-label {
      font-size: 1rem;
      font-weight: 200;
      text-transform: uppercase;
    }

    #list-header {
      max-height: 4.2rem;
    }

    .loading-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      z-index: 1;
      padding-top: 50px;
    }

    circular-activity-indicator {
      width: 30px;
      height: 30px;
    }

    sort-filter-bar {
      display: block;
      margin-bottom: 4rem;
    }

    infinite-scroller {
      display: block;
      --infiniteScrollerRowGap: var(--collectionBrowserRowGap, 1.7rem);
      --infiniteScrollerColGap: var(--collectionBrowserColGap, 1.7rem);
    }

    infinite-scroller.list-compact {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        100%
      );
      --infiniteScrollerCellMinHeight: 34px; /* override infinite scroller component */
      --infiniteScrollerCellMaxHeight: 56px;
      --infiniteScrollerRowGap: 0px;
    }

    infinite-scroller.list-detail {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        100%
      );
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        5rem
      );
      /*
        30px in spec, compensating for a -4px margin
        to align title with top of item image
        src/tiles/list/tile-list.ts
       */
      --infiniteScrollerRowGap: 34px;
    }

    .mobile infinite-scroller.list-detail {
      --infiniteScrollerRowGap: 24px;
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        18rem
      );
      --infiniteScrollerCellMaxWidth: var(--collectionBrowserCellMaxWidth, 1fr);
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        29rem
      );
      --infiniteScrollerCellMaxHeight: var(
        --collectionBrowserCellMaxHeight,
        29rem
      );
    }
  `;
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "baseImageUrl", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "searchService", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "baseQuery", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "displayMode", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "sortParam", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "selectedSort", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "selectedTitleFilter", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "selectedCreatorFilter", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "sortDirection", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "dateRangeQueryClause", void 0);
__decorate([
    property({ type: Number })
], CollectionBrowser.prototype, "pageSize", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "resizeObserver", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "titleQuery", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "creatorQuery", void 0);
__decorate([
    property({ type: Number })
], CollectionBrowser.prototype, "currentPage", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "minSelectedDate", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "maxSelectedDate", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "selectedFacets", void 0);
__decorate([
    property({ type: Boolean })
], CollectionBrowser.prototype, "showHistogramDatePicker", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "collectionNameCache", void 0);
__decorate([
    property({ type: String })
], CollectionBrowser.prototype, "pageContext", void 0);
__decorate([
    property({ type: Object })
], CollectionBrowser.prototype, "restorationStateHandler", void 0);
__decorate([
    property({ type: Number })
], CollectionBrowser.prototype, "mobileBreakpoint", void 0);
__decorate([
    property({ type: Boolean })
], CollectionBrowser.prototype, "loggedIn", void 0);
__decorate([
    property({ type: Boolean })
], CollectionBrowser.prototype, "isManageView", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "pagesToRender", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "searchResultsLoading", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "facetsLoading", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "fullYearAggregationLoading", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "aggregations", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "fullYearsHistogramAggregation", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "totalResults", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "mobileView", void 0);
__decorate([
    state()
], CollectionBrowser.prototype, "mobileFacetsVisible", void 0);
__decorate([
    query('#content-container')
], CollectionBrowser.prototype, "contentContainer", void 0);
__decorate([
    query('infinite-scroller')
], CollectionBrowser.prototype, "infiniteScroller", void 0);
CollectionBrowser = __decorate([
    customElement('collection-browser')
], CollectionBrowser);
export { CollectionBrowser };
//# sourceMappingURL=collection-browser.js.map