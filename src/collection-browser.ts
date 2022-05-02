/* eslint-disable import/no-duplicates */
import {
  html,
  css,
  LitElement,
  PropertyValues,
  TemplateResult,
  nothing,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type {
  InfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from '@internetarchive/infinite-scroller';
import {
  Aggregation,
  Metadata,
  SearchParams,
  SearchServiceInterface,
  SortDirection,
} from '@internetarchive/search-service';
import {
  AggregateSearchParams,
  SortParam,
} from '@internetarchive/search-service';
import {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import '@internetarchive/infinite-scroller';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import './tiles/tile-dispatcher';
import './tiles/collection-browser-loading-tile';
import './sort-filter-bar/sort-filter-bar';
import './collection-facets';
import './circular-activity-indicator';
import './sort-filter-bar/sort-filter-bar';
import {
  SelectedFacets,
  SortField,
  SortFieldToMetadataField,
  CollectionBrowserContext,
  defaultSelectedFacets,
  TileModel,
  CollectionDisplayMode,
} from './models';
import {
  RestorationStateHandlerInterface,
  RestorationStateHandler,
  RestorationState,
} from './restoration-state-handler';
import chevronIcon from './assets/img/icons/chevron';
import { LanguageCodeHandler } from './language-code-handler/language-code-handler';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements
    InfiniteScrollerCellProviderInterface,
    SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) baseQuery?: string;

  @property({ type: Boolean }) showDeleteButtons = false;

  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: String }) selectedSort: SortField = SortField.relevance;

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: String }) sortDirection: SortDirection | null = null;

  @property({ type: String }) dateRangeQueryClause?: string;

  @property({ type: Number }) pageSize = 50;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: String }) titleQuery?: string;

  @property({ type: String }) creatorQuery?: string;

  @property({ type: Number }) currentPage?: number;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: String }) pageContext: CollectionBrowserContext = 'search';

  @property({ type: Object })
  restorationStateHandler: RestorationStateHandlerInterface = new RestorationStateHandler(
    {
      context: this.pageContext,
    }
  );

  @property({ type: Number }) mobileBreakpoint = 600;

  /**
   * The page that the consumer wants to load.
   */
  private initialPageNumber = 1;

  /**
   * This the the number of pages that we want to show.
   *
   * The data isn't necessarily loaded for all of the pages, but this lets us
   * know how many cells we should render.
   */
  @state() private pagesToRender = this.initialPageNumber;

  @state() private searchResultsLoading = false;

  @state() private facetsLoading = false;

  @state() private fullYearAggregationLoading = false;

  @state() private aggregations?: Record<string, Aggregation>;

  @state() private fullYearsHistogramAggregation: Aggregation | undefined;

  @state() private totalResults?: number;

  @state() private mobileView = false;

  @state() private mobileFacetsVisible = false;

  @query('#content-container') private contentContainer!: HTMLDivElement;

  private languageCodeHandler = new LanguageCodeHandler();

  /**
   * When we're animated scrolling to the page, we don't want to fetch
   * all of the pages as it scrolls so this lets us know if we're scrolling
   */
  private isScrollingToCell = false;

  /**
   * When we've reached the end of the data, stop trying to fetch more
   */
  private endOfDataReached = false;

  private placeholderCellTemplate = html`<collection-browser-loading-tile></collection-browser-loading-tile>`;

  private tileModelAtCellIndex(index: number): TileModel | undefined {
    const pageNumber = Math.floor(index / this.pageSize) + 1;
    const itemIndex = index % this.pageSize;
    const model = this.dataSource[pageNumber]?.[itemIndex];
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

  private get sortFilterQueries(): string {
    const queries = [this.titleQuery, this.creatorQuery];
    return queries.filter(q => q).join(' AND ');
  }

  // this is the total number of tiles we expect if
  // the data returned is a full page worth
  // this is useful for putting in placeholders for the expected number of tiles
  private get estimatedTileCount(): number {
    return this.pagesToRender * this.pageSize;
  }

  // this is the actual number of tiles in the datasource,
  // which is useful for removing excess placeholder tiles
  // once we reached the end of the data
  private get actualTileCount(): number {
    return Object.keys(this.dataSource).reduce(
      (acc, page) => acc + this.dataSource[page].length,
      0
    );
  }

  /**
   * The results per page so we can paginate.
   *
   * This allows us to start in the middle of the search results and
   * fetch data before or after the current page. If we don't have a key
   * for the previous/next page, we'll fetch the next/previous page to populate it
   */
  private dataSource: Record<string, TileModel[]> = {};

  @query('infinite-scroller')
  private infiniteScroller!: InfiniteScroller;

  /**
   * Go to the given page of results
   *
   * @param pageNumber
   */
  goToPage(pageNumber: number) {
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
    return html`
      <div id="content-container" class=${this.mobileView ? 'mobile' : ''}>
        <div id="left-column" class="column">
          <div id="mobile-header-container">
            ${this.mobileView
              ? html`
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
            ? html`
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

  private userChangedSort(
    e: CustomEvent<{
      selectedSort: SortField;
      sortDirection: SortDirection | null;
    }>
  ) {
    const { selectedSort, sortDirection } = e.detail;
    this.selectedSort = selectedSort;
    this.sortDirection = sortDirection;

    if ((this.currentPage ?? 1) > 1) {
      this.goToPage(1);
    }
    this.currentPage = 1;
  }

  private selectedSortChanged() {
    if (this.selectedSort === 'relevance' || this.sortDirection === null) {
      this.sortParam = null;
      return;
    }
    const sortField = SortFieldToMetadataField[this.selectedSort];
    if (!sortField) return;
    this.sortParam = new SortParam(sortField, this.sortDirection);
  }

  private displayModeChanged(
    e: CustomEvent<{ displayMode: CollectionDisplayMode }>
  ) {
    this.displayMode = e.detail.displayMode;
  }

  private selectedTitleLetterChanged() {
    this.titleQuery = this.selectedTitleFilter
      ? `firstTitle:${this.selectedTitleFilter}`
      : undefined;
  }

  private selectedCreatorLetterChanged() {
    this.creatorQuery = this.selectedCreatorFilter
      ? `firstCreator:${this.selectedCreatorFilter}`
      : undefined;
  }

  private titleLetterSelected(e: CustomEvent<{ selectedLetter: string }>) {
    this.selectedCreatorFilter = null;
    this.selectedTitleFilter = e.detail.selectedLetter;
  }

  private creatorLetterSelected(e: CustomEvent<{ selectedLetter: string }>) {
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = e.detail.selectedLetter;
  }

  private get facetDataLoading(): boolean {
    return this.facetsLoading || this.fullYearAggregationLoading;
  }

  private get facetsTemplate() {
    return html`
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

  private get loadingTemplate() {
    return html`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `;
  }

  private get listHeaderTemplate() {
    return html`
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

  private get queryDebuggingTemplate() {
    return html`
      <div>
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Sort Filter Query: ${this.sortFilterQueries}</li>
          <li>Date Range Query: ${this.dateRangeQueryClause}</li>
          <li>Sort: ${this.sortParam?.field} ${this.sortParam?.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>
    `;
  }

  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>
  ) {
    const { minDate, maxDate } = e.detail;
    this.dateRangeQueryClause = `year:[${minDate} TO ${maxDate}]`;
  }

  firstUpdated(): void {
    this.setupStateRestorationObserver();
    this.restoreState();
  }

  updated(changed: PropertyValues) {
    if (
      changed.has('displayMode') ||
      changed.has('showDeleteButtons') ||
      changed.has('baseNavigationUrl')
    ) {
      this.infiniteScroller.reload();
    }
    if (changed.has('baseQuery')) {
      this.emitBaseQueryChanged();
    }
    if (changed.has('currentPage') || changed.has('displayMode')) {
      this.persistState();
    }
    if (
      changed.has('baseQuery') ||
      changed.has('titleQuery') ||
      changed.has('creatorQuery') ||
      changed.has('dateRangeQueryClause') ||
      changed.has('sortParam') ||
      changed.has('selectedFacets') ||
      changed.has('searchService')
    ) {
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
      const oldObserver = changed.get(
        'resizeObserver'
      ) as SharedResizeObserverInterface;
      if (oldObserver) this.disconnectResizeObserver(oldObserver);
      this.setupResizeObserver();
    }
  }

  disconnectedCallback(): void {
    if (this.resizeObserver) {
      this.disconnectResizeObserver(this.resizeObserver);
    }
    if (this.boundNavigationHandler) {
      window.removeEventListener('popstate', this.boundNavigationHandler);
    }
  }

  handleResize(entry: ResizeObserverEntry): void {
    if (entry.target === this.contentContainer) {
      this.mobileView = entry.contentRect.width < 600;
    }
  }

  private emitBaseQueryChanged() {
    this.dispatchEvent(
      new CustomEvent<{ baseQuery?: string }>('baseQueryChanged', {
        detail: {
          baseQuery: this.baseQuery,
        },
      })
    );
  }

  private disconnectResizeObserver(
    resizeObserver: SharedResizeObserverInterface
  ) {
    resizeObserver.removeObserver({
      target: this.contentContainer,
      handler: this,
    });
  }

  private setupResizeObserver() {
    if (!this.resizeObserver) return;
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
  private visibleCellsChanged(
    e: CustomEvent<{ visibleCellIndices: number[] }>
  ) {
    if (this.isScrollingToCell) return;
    const { visibleCellIndices } = e.detail;
    if (visibleCellIndices.length === 0) return;
    const lastVisibleCellIndex =
      visibleCellIndices[visibleCellIndices.length - 1];
    const lastVisibleCellPage =
      Math.floor(lastVisibleCellIndex / this.pageSize) + 1;
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

  // we only want to scroll on the very first query change
  // so this keeps track of whether we've already set the initial query
  private initialQueryChangeHappened = false;

  private historyPopOccurred = false;

  // this lets us store the query key so we know if it's actually changed or not
  private previousQueryKey?: string;

  private async handleQueryChange() {
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

  private setupStateRestorationObserver() {
    if (this.boundNavigationHandler) return;
    this.boundNavigationHandler = this.historyNavigationHandler.bind(this);
    // when the user navigates back, we want to update the UI to match the URL
    window.addEventListener('popstate', this.boundNavigationHandler);
  }

  private boundNavigationHandler?: () => void;

  private historyNavigationHandler() {
    this.historyPopOccurred = true;
    this.restoreState();
  }

  private restoreState() {
    const restorationState = this.restorationStateHandler.getRestorationState();
    this.displayMode = restorationState.displayMode;
    this.selectedSort = restorationState.selectedSort ?? SortField.relevance;
    this.sortDirection = restorationState.sortDirection ?? null;
    this.selectedTitleFilter = restorationState.selectedTitleFilter ?? null;
    this.selectedCreatorFilter = restorationState.selectedCreatorFilter ?? null;
    this.selectedFacets = restorationState.selectedFacets;
    this.baseQuery = restorationState.baseQuery;
    this.titleQuery = restorationState.titleQuery;
    this.creatorQuery = restorationState.creatorQuery;
    this.dateRangeQueryClause = restorationState.dateRangeQueryClause;
    this.sortParam = restorationState.sortParam ?? null;
    this.currentPage = restorationState.currentPage ?? 1;
    this.minSelectedDate = restorationState.minSelectedDate;
    this.maxSelectedDate = restorationState.maxSelectedDate;
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage);
    }
  }

  private persistState() {
    const restorationState: RestorationState = {
      displayMode: this.displayMode,
      sortParam: this.sortParam ?? undefined,
      selectedSort: this.selectedSort,
      sortDirection: this.sortDirection ?? undefined,
      selectedFacets: this.selectedFacets ?? defaultSelectedFacets,
      baseQuery: this.baseQuery,
      currentPage: this.currentPage,
      dateRangeQueryClause: this.dateRangeQueryClause,
      titleQuery: this.titleQuery,
      creatorQuery: this.creatorQuery,
      minSelectedDate: this.minSelectedDate,
      maxSelectedDate: this.maxSelectedDate,
      selectedTitleFilter: this.selectedTitleFilter ?? undefined,
      selectedCreatorFilter: this.selectedCreatorFilter ?? undefined,
    };
    this.restorationStateHandler.persistState(restorationState);
  }

  private async doInitialPageFetch() {
    this.searchResultsLoading = true;
    await this.fetchPage(this.initialPageNumber);
    this.searchResultsLoading = false;
  }

  private get fullQuery(): string | undefined {
    let { fullQueryWithoutDate } = this;
    const { dateRangeQueryClause } = this;
    if (dateRangeQueryClause) {
      fullQueryWithoutDate += ` AND ${dateRangeQueryClause}`;
    }
    return fullQueryWithoutDate;
  }

  private get fullQueryWithoutDate(): string | undefined {
    if (!this.baseQuery) return undefined;
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
  private get facetQuery(): string | undefined {
    if (!this.selectedFacets) return undefined;
    const facetQuery = [];
    for (const [facetName, facetValues] of Object.entries(
      this.selectedFacets
    )) {
      const facetEntries = Object.entries(facetValues);
      // eslint-disable-next-line no-continue
      if (facetEntries.length === 0) continue;
      const facetValuesArray: string[] = [];
      for (const [key, facetState] of facetEntries) {
        const plusMinusPrefix = facetState === 'hidden' ? '-' : '';

        if (facetName === 'language') {
          const languages =
            this.languageCodeHandler.getCodeArrayFromCodeString(key);
          for (const language of languages) {
            facetValuesArray.push(`${plusMinusPrefix}"${language}"`);
          }
        } else {
          facetValuesArray.push(`${plusMinusPrefix}"${key}"`);
        }
      }
      const valueQuery = facetValuesArray.join(` OR `);
      facetQuery.push(`${facetName}:(${valueQuery})`);
    }
    return facetQuery.length > 0 ? `(${facetQuery.join(' AND ')})` : undefined;
  }

  facetsChanged(e: CustomEvent<SelectedFacets>) {
    this.selectedFacets = e.detail;
  }

  private async fetchFacets() {
    if (!this.fullQuery) return;

    const aggregations = new AggregateSearchParams({
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
    });

    const params = new SearchParams({
      query: this.fullQuery,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    });
    this.facetsLoading = true;
    const results = await this.searchService?.search(params);
    this.facetsLoading = false;

    this.aggregations = results?.success?.response.aggregations;
  }

  /**
   * If we haven't changed the query, we don't need to fetch the full year histogram
   *
   * @private
   * @type {string}
   * @memberof CollectionBrowser
   */
  private previousFullQueryNoDate?: string;

  /**
   * The query key is a string that uniquely identifies the current query
   * without the date range.
   *
   * If this doesn't change, we don't need to re-fetch the histogram date range
   */
  private get fullQueryNoDateKey() {
    return `${this.fullQueryWithoutDate}-${this.sortParam?.asString}`;
  }

  /**
   * This method is similar to fetching the facets above,
   * but only fetching the year histogram. There is a subtle difference
   * in how you have to fetch the year histogram where you can't use the
   * advanced JSON syntax like the other aggregations. It's a special
   * case that @ximm put it place.
   */
  private async fetchFullYearHistogram(): Promise<void> {
    const { fullQueryNoDateKey } = this;
    if (
      !this.fullQueryWithoutDate ||
      fullQueryNoDateKey === this.previousFullQueryNoDate
    )
      return;
    this.previousFullQueryNoDate = fullQueryNoDateKey;

    const aggregations = new AggregateSearchParams({
      simpleParams: ['year'],
    });

    const params = new SearchParams({
      query: this.fullQueryWithoutDate,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    });

    this.fullYearAggregationLoading = true;
    const results = await this.searchService?.search(params);
    this.fullYearAggregationLoading = false;

    this.fullYearsHistogramAggregation =
      results?.success?.response?.aggregations?.year_histogram;
  }

  private scrollToPage(pageNumber: number) {
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
  private get pageFetchQueryKey() {
    return `${this.fullQuery}-${this.sortParam?.asString}`;
  }

  // this maps the query to the pages being fetched for that query
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  async fetchPage(pageNumber: number) {
    if (!this.fullQuery) return;

    // if we already have data, don't fetch again
    if (this.dataSource[pageNumber]) return;

    if (this.endOfDataReached) return;

    // if a fetch is already in progress for this query and page, don't fetch again
    const { pageFetchQueryKey } = this;
    const pageFetches =
      this.pageFetchesInProgress[pageFetchQueryKey] ?? new Set();
    if (pageFetches.has(pageNumber)) return;
    pageFetches.add(pageNumber);
    this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;

    const sortParams = this.sortParam ? [this.sortParam] : [];
    const params = new SearchParams({
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
        'subject', // topic
        'title',
        'volume',
      ],
      page: pageNumber,
      rows: this.pageSize,
      sort: sortParams,
    });
    const results = await this.searchService?.search(params);
    const success = results?.success;

    if (!success) return;

    this.totalResults = success.response.numFound;

    // this is checking to see if the query has changed since the data was fetched
    // if so, we just want to discard the data since there should be a new query
    // right behind it
    const searchQuery = success.responseHeader.params.qin;
    const searchSort = success.responseHeader.params.sort;
    const queryChangedSinceFetch =
      searchQuery !== this.fullQuery || searchSort !== this.sortParam?.asString;
    if (queryChangedSinceFetch) return;

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
    this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber);
    this.searchResultsLoading = false;
  }

  private preloadCollectionNames(docs: Metadata[]) {
    const collectionIds = docs.map(doc => doc.collections_raw?.values).flat();
    const collectionIdsArray = Array.from(new Set(collectionIds)) as string[];
    this.collectionNameCache?.preloadIdentifiers(collectionIdsArray);
  }

  /**
   * This is useful for determining whether we need to reload the scroller.
   *
   * When the fetch completes, we need to reload the scroller if the cells for that
   * page are visible, but if the page is not currenlty visible, we don't need to reload
   */
  private get currentVisiblePageNumbers(): number[] {
    const visibleCells = this.infiniteScroller.getVisibleCellIndices();
    const visiblePages = new Set<number>();
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
  private updateDataSource(pageNumber: number, docs: Metadata[]) {
    // copy our existing datasource so when we set it below, it gets set
    // instead of modifying the existing dataSource since object changes
    // don't trigger a re-render
    const datasource = { ...this.dataSource };
    const tiles: TileModel[] = [];
    docs?.forEach(doc => {
      if (!doc.identifier) return;
      tiles.push({
        averageRating: doc.avg_rating?.value,
        collections: doc.collections_raw?.values ?? [],
        commentCount: doc.num_reviews?.value ?? 0,
        creator: doc.creator?.value,
        creators: doc.creator?.values ?? [],
        dateAdded: doc.addeddate?.value,
        dateArchived: doc.publicdate?.value,
        datePublished: doc.date?.value,
        dateReviewed: doc.reviewdate?.value,
        description: doc.description?.value,
        favCount: doc.num_favorites?.value ?? 0,
        identifier: doc.identifier,
        issue: doc.issue?.value,
        itemCount: doc.item_count?.value ?? 0,
        mediatype: doc.mediatype?.value ?? 'data',
        source: doc.source?.value,
        subjects: doc.subject?.values ?? [],
        title: this.etreeTitle(
          doc.title?.value,
          doc.mediatype?.value,
          doc.collection?.values
        ),
        volume: doc.volume?.value,
        viewCount: doc.downloads?.value ?? 0,
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
  private etreeTitle(
    title: string | undefined,
    mediatype: string | undefined,
    collections: string[] | undefined
  ): string {
    if (mediatype === 'etree' || collections?.includes('etree')) {
      const regex = /^(.*) Live at (.*) on (\d\d\d\d-\d\d-\d\d)$/;
      const newTitle = title?.replace(regex, '$3: $2');
      if (newTitle) {
        return `${newTitle}`;
      }
    }
    return title ?? '';
  }

  cellForIndex(index: number): TemplateResult | undefined {
    const model = this.tileModelAtCellIndex(index);
    if (!model) return undefined;

    return html` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .model=${model}
      .tileDisplayMode=${this.displayMode}
      .resizeObserver=${this.resizeObserver}
      .collectionNameCache=${this.collectionNameCache}
      .sortParam=${this.sortParam}
      ?showDeleteButton=${this.showDeleteButtons}
      .mobileBreakpoint=${this.mobileBreakpoint}
    ></tile-dispatcher>`;
  }

  /**
   * When the user scrolls near to the bottom of the page, fetch the next page
   * increase the number of pages to render and start fetching data for the new page
   */
  private scrollThresholdReached() {
    this.pagesToRender += 1;
    this.fetchPage(this.pagesToRender);
  }

  static styles = css`
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
}
