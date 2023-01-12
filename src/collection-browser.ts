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
import { classMap } from 'lit/directives/class-map.js';

import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type {
  InfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from '@internetarchive/infinite-scroller';
import {
  Aggregation,
  Bucket,
  FilterConstraint,
  FilterMap,
  FilterMapBuilder,
  SearchParams,
  SearchResult,
  SearchServiceInterface,
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import type {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import '@internetarchive/infinite-scroller';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { FeatureFeedbackServiceInterface } from '@internetarchive/feature-feedback';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';
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
  FacetOption,
  FacetBucket,
  PrefixFilterType,
  PrefixFilterCounts,
  prefixFilterAggregationKeys,
} from './models';
import {
  RestorationStateHandlerInterface,
  RestorationStateHandler,
  RestorationState,
} from './restoration-state-handler';
import chevronIcon from './assets/img/icons/chevron';
import type { PlaceholderType } from './empty-placeholder';
import './empty-placeholder';

import {
  analyticsActions,
  analyticsCategories,
} from './utils/analytics-events';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements
    InfiniteScrollerCellProviderInterface,
    SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl: string = 'https://archive.org';

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) searchType: SearchType = SearchType.METADATA;

  @property({ type: String }) baseQuery?: string;

  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: String }) selectedSort: SortField = SortField.relevance;

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: String }) sortDirection: SortDirection | null = null;

  @property({ type: Number }) pageSize = 50;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: String }) titleQuery?: string;

  @property({ type: String }) creatorQuery?: string;

  @property({ type: Number }) currentPage?: number;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  /** describes where this component is being used */
  @property({ type: String, reflect: true }) searchContext: string =
    analyticsCategories.default;

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

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) modalManager?: ModalManagerInterface = undefined;

  @property({ type: Object })
  featureFeedbackService?: FeatureFeedbackServiceInterface;

  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  /**
   * If item management UI active
   */
  @property({ type: Boolean }) isManageView = false;

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

  /**
   * The search type of the previous search (i.e., the currently displayed
   * search results), which may differ from the one that is currently selected
   * to be used for the next search.
   */
  @state() private previousSearchType?: SearchType;

  @state() private totalResults?: number;

  @state() private queryErrorMessage?: string;

  @state() private mobileView = false;

  @state() private mobileFacetsVisible = false;

  @state() private placeholderType: PlaceholderType = null;

  @state() private prefixFilterCountMap: Partial<
    Record<PrefixFilterType, PrefixFilterCounts>
  > = {};

  @query('#content-container') private contentContainer!: HTMLDivElement;

  @property({ type: Object, attribute: false })
  private analyticsHandler?: AnalyticsManagerInterface;

  /**
   * When we're animated scrolling to the page, we don't want to fetch
   * all of the pages as it scrolls so this lets us know if we're scrolling
   */
  private isScrollingToCell = false;

  /**
   * When we've reached the end of the data, stop trying to fetch more
   */
  private endOfDataReached = false;

  /**
   * When page width resizes from desktop to mobile, set true to
   * disable expand/collapse transition when loading.
   */
  private isResizeToMobile = false;

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
    return this.scrollToPage(pageNumber);
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

  /**
   * Manually requests to perform a search, which will only be executed if one of
   * the query, the search type, or the sort has changed.
   */
  requestSearch() {
    this.handleQueryChange();
  }

  render() {
    this.setPlaceholderType();
    return html`
      <div
        id="content-container"
        class=${this.mobileView ? 'mobile' : 'desktop'}
      >
        ${this.placeholderType
          ? this.emptyPlaceholderTemplate
          : this.collectionBrowserTemplate}
      </div>
    `;
  }

  private setPlaceholderType() {
    this.placeholderType = null;
    if (!this.baseQuery) {
      this.placeholderType = 'empty-query';
    }

    if (
      (!this.searchResultsLoading && this.totalResults === 0) ||
      !this.searchService
    ) {
      this.placeholderType = 'null-result';
    }

    if (this.queryErrorMessage) {
      this.placeholderType = 'query-error';
    }
  }

  private get emptyPlaceholderTemplate() {
    return html`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        .detailMessage=${this.queryErrorMessage ?? ''}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
      ${this.infiniteScrollerTemplate}
    `;
  }

  private get collectionBrowserTemplate() {
    const shouldShowSearching =
      this.searchResultsLoading || this.totalResults === undefined;
    const resultsCount = this.totalResults?.toLocaleString();
    const resultsLabel = this.totalResults === 1 ? 'Result' : 'Results';
    return html`<div
        id="left-column"
        class="column${this.isResizeToMobile ? ' preload' : ''}"
      >
        <div id="mobile-header-container">
          ${this.mobileView ? this.mobileFacetsTemplate : nothing}
          <div id="results-total">
            <span id="big-results-count">
              ${shouldShowSearching ? html`Searching&hellip;` : resultsCount}
            </span>
            <span id="big-results-label">
              ${shouldShowSearching ? nothing : resultsLabel}
            </span>
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
        ${this.sortFilterBarTemplate}
        ${this.displayMode === `list-compact`
          ? this.listHeaderTemplate
          : nothing}
        ${this.infiniteScrollerTemplate}
      </div>`;
  }

  private get infiniteScrollerTemplate() {
    return html`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType ? 0 : nothing}
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
    ></infinite-scroller>`;
  }

  private get infiniteScrollerClasses() {
    return classMap({
      [this.displayMode ?? '']: !!this.displayMode,
      hidden: !!this.placeholderType,
    });
  }

  private get sortFilterBarTemplate() {
    return html`
      <sort-filter-bar
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .displayMode=${this.displayMode}
        .selectedTitleFilter=${this.selectedTitleFilter}
        .selectedCreatorFilter=${this.selectedCreatorFilter}
        .prefixFilterCountMap=${this.prefixFilterCountMap}
        .resizeObserver=${this.resizeObserver}
        @sortChanged=${this.userChangedSort}
        @displayModeChanged=${this.displayModeChanged}
        @titleLetterChanged=${this.titleLetterSelected}
        @creatorLetterChanged=${this.creatorLetterSelected}
      >
      </sort-filter-bar>
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

  private sendSortByAnalytics(prevSortDirection: SortDirection | null): void {
    const directionCleared = prevSortDirection && !this.sortDirection;

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.sortBy,
      label: `${this.selectedSort}${
        this.sortDirection || directionCleared ? `-${this.sortDirection}` : ''
      }`,
    });
  }

  private selectedSortChanged(): void {
    if (this.selectedSort === 'relevance' || this.sortDirection === null) {
      this.sortParam = null;
      return;
    }
    const sortField = SortFieldToMetadataField[this.selectedSort];

    if (!sortField) return;
    this.sortParam = { field: sortField, direction: this.sortDirection };

    // Lazy-load the alphabet counts for title/creator sort bar as needed
    this.updatePrefixFiltersForCurrentSort();
  }

  private displayModeChanged(
    e: CustomEvent<{ displayMode: CollectionDisplayMode }>
  ) {
    this.displayMode = e.detail.displayMode;

    if (this.displayMode) {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action: analyticsActions.displayMode,
        label: this.displayMode,
      });
    }
  }

  /** Send Analytics when sorting by title's first letter
   * labels: 'start-<ToLetter>' | 'clear-<FromLetter>' | '<FromLetter>-<ToLetter>'
   * */
  private sendFilterByTitleAnalytics(prevSelectedLetter: string | null): void {
    if (!prevSelectedLetter && !this.selectedTitleFilter) {
      return;
    }
    const cleared = prevSelectedLetter && this.selectedTitleFilter === null;

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.filterByTitle,
      label: cleared
        ? `clear-${prevSelectedLetter}`
        : `${prevSelectedLetter || 'start'}-${this.selectedTitleFilter}`,
    });
  }

  private selectedTitleLetterChanged(): void {
    this.titleQuery = this.selectedTitleFilter
      ? `firstTitle:${this.selectedTitleFilter}`
      : undefined;
  }

  /** Send Analytics when filtering by creator's first letter
   * labels: 'start-<ToLetter>' | 'clear-<FromLetter>' | '<FromLetter>-<ToLetter>'
   * */
  private sendFilterByCreatorAnalytics(
    prevSelectedLetter: string | null
  ): void {
    if (!prevSelectedLetter && !this.selectedCreatorFilter) {
      return;
    }
    const cleared = prevSelectedLetter && this.selectedCreatorFilter === null;

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.filterByCreator,
      label: cleared
        ? `clear-${prevSelectedLetter}`
        : `${prevSelectedLetter || 'start'}-${this.selectedCreatorFilter}`,
    });
  }

  private selectedCreatorLetterChanged(): void {
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

  private get mobileFacetsTemplate() {
    return html`
      <div id="mobile-filter-collapse">
        <h1
          @click=${() => {
            this.isResizeToMobile = false;
            this.mobileFacetsVisible = !this.mobileFacetsVisible;
          }}
          @keyup=${() => {
            this.isResizeToMobile = false;
            this.mobileFacetsVisible = !this.mobileFacetsVisible;
          }}
        >
          <span class="collapser ${this.mobileFacetsVisible ? 'open' : ''}">
            ${chevronIcon}
          </span>
          Filters
        </h1>
      </div>
    `;
  }

  private get facetsTemplate() {
    return html`
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.aggregations}
        .fullYearsHistogramAggregation=${this.fullYearsHistogramAggregation}
        .moreLinksVisible=${this.previousSearchType !== SearchType.FULLTEXT}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .collectionNameCache=${this.collectionNameCache}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .query=${this.filteredQuery}
        .filterMap=${this.filterMap}
        .modalManager=${this.modalManager}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?fullYearAggregationLoading=${this.facetsLoading}
        .onFacetClick=${this.facetClickHandler}
        .analyticsHandler=${this.analyticsHandler}
      >
      </collection-facets>
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
          .loggedIn=${this.loggedIn}
        >
        </tile-dispatcher>
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
    [this.minSelectedDate, this.maxSelectedDate] = [minDate, maxDate];

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.histogramChanged,
      label: this.dateRangeQueryClause,
    });
  }

  private get dateRangeQueryClause() {
    if (!this.minSelectedDate || !this.maxSelectedDate) {
      return undefined;
    }

    return `year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`;
  }

  firstUpdated(): void {
    this.setupStateRestorationObserver();
    this.restoreState();
  }

  updated(changed: PropertyValues) {
    if (
      changed.has('displayMode') ||
      changed.has('baseNavigationUrl') ||
      changed.has('baseImageUrl') ||
      changed.has('loggedIn')
    ) {
      this.infiniteScroller?.reload();
    }
    if (changed.has('baseQuery')) {
      this.emitBaseQueryChanged();
    }
    if (changed.has('searchType')) {
      this.emitSearchTypeChanged();
    }
    if (changed.has('currentPage') || changed.has('displayMode')) {
      this.persistState();
    }
    if (
      changed.has('baseQuery') ||
      changed.has('titleQuery') ||
      changed.has('creatorQuery') ||
      changed.has('minSelectedDate') ||
      changed.has('maxSelectedDate') ||
      changed.has('sortParam') ||
      changed.has('selectedFacets') ||
      changed.has('searchService')
    ) {
      this.handleQueryChange();
    }
    if (
      changed.has('baseQuery') ||
      changed.has('minSelectedDate') ||
      changed.has('maxSelectedDate') ||
      changed.has('selectedFacets')
    ) {
      this.refreshLetterCounts();
    }
    if (changed.has('selectedSort') || changed.has('sortDirection')) {
      const prevSortDirection = changed.get('sortDirection') as SortDirection;
      this.sendSortByAnalytics(prevSortDirection);
      this.selectedSortChanged();
    }
    if (changed.has('selectedTitleFilter')) {
      this.sendFilterByTitleAnalytics(
        changed.get('selectedTitleFilter') as string
      );
      this.selectedTitleLetterChanged();
    }
    if (changed.has('selectedCreatorFilter')) {
      this.sendFilterByCreatorAnalytics(
        changed.get('selectedCreatorFilter') as string
      );
      this.selectedCreatorLetterChanged();
    }
    if (changed.has('pagesToRender')) {
      if (!this.endOfDataReached && this.infiniteScroller) {
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
    const previousView = this.mobileView;
    if (entry.target === this.contentContainer) {
      this.mobileView = entry.contentRect.width < this.mobileBreakpoint;
      // If changing from desktop to mobile disable transition
      if (this.mobileView && !previousView) {
        this.isResizeToMobile = true;
      }
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

  private emitSearchTypeChanged() {
    this.dispatchEvent(
      new CustomEvent<SearchType>('searchTypeChanged', {
        detail: this.searchType,
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
    this.totalResults = undefined;
    this.aggregations = undefined;
    this.fullYearsHistogramAggregation = undefined;
    this.pageFetchesInProgress = {};
    this.endOfDataReached = false;
    this.pagesToRender = this.initialPageNumber;
    this.queryErrorMessage = undefined;

    // Reset the infinite scroller's item count, so that it
    // shows tile placeholders until the new query's results load in
    this.infiniteScroller?.reload();

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

    await Promise.all([this.doInitialPageFetch(), this.fetchFacets()]);
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
    if (restorationState.searchType != null)
      this.searchType = restorationState.searchType;
    this.selectedSort = restorationState.selectedSort ?? SortField.relevance;
    this.sortDirection = restorationState.sortDirection ?? null;
    this.selectedTitleFilter = restorationState.selectedTitleFilter ?? null;
    this.selectedCreatorFilter = restorationState.selectedCreatorFilter ?? null;
    this.selectedFacets = restorationState.selectedFacets;
    this.baseQuery = restorationState.baseQuery;
    this.titleQuery = restorationState.titleQuery;
    this.creatorQuery = restorationState.creatorQuery;
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
      searchType: this.searchType,
      sortParam: this.sortParam ?? undefined,
      selectedSort: this.selectedSort,
      sortDirection: this.sortDirection ?? undefined,
      selectedFacets: this.selectedFacets ?? defaultSelectedFacets,
      baseQuery: this.baseQuery,
      currentPage: this.currentPage,
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

  private get filterMap(): FilterMap {
    const builder = new FilterMapBuilder();

    // Add the date range, if applicable
    if (this.minSelectedDate) {
      builder.addFilter(
        'year',
        this.minSelectedDate,
        FilterConstraint.GREATER_OR_EQUAL
      );
    }
    if (this.maxSelectedDate) {
      builder.addFilter(
        'year',
        this.maxSelectedDate,
        FilterConstraint.LESS_OR_EQUAL
      );
    }

    // Add any selected facets
    if (this.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        this.selectedFacets
      )) {
        const { name, values } = this.prepareFacetForFetch(
          facetName,
          facetValues
        );
        for (const [value, bucket] of Object.entries(values)) {
          let constraint;
          if (bucket.state === 'selected') {
            constraint = FilterConstraint.INCLUDE;
          } else if (bucket.state === 'hidden') {
            constraint = FilterConstraint.EXCLUDE;
          }

          if (constraint) {
            builder.addFilter(name, value, constraint);
          }
        }
      }
    }

    const filterMap = builder.build();
    return filterMap;
  }

  /** The base query joined with any title/creator letter filters */
  private get filteredQuery(): string | undefined {
    if (!this.baseQuery) return undefined;
    let filteredQuery = this.baseQuery;

    const { sortFilterQueries } = this;
    if (sortFilterQueries) {
      filteredQuery += ` AND ${sortFilterQueries}`;
    }

    return filteredQuery;
  }

  /** The full query, including year facets and date range clauses */
  private get fullQuery(): string | undefined {
    if (!this.baseQuery) return undefined;
    let fullQuery = this.baseQuery;

    const { facetQuery, dateRangeQueryClause, sortFilterQueries } = this;

    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (dateRangeQueryClause) {
      fullQuery += ` AND ${dateRangeQueryClause}`;
    }
    if (sortFilterQueries) {
      fullQuery += ` AND ${sortFilterQueries}`;
    }
    return fullQuery;
  }

  /** The full query without any title/creator letter filters */
  private get fullQueryWithoutAlphaFilters(): string | undefined {
    if (!this.baseQuery) return undefined;
    let fullQuery = this.baseQuery;

    const { facetQuery, dateRangeQueryClause } = this;

    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (dateRangeQueryClause) {
      fullQuery += ` AND ${dateRangeQueryClause}`;
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
    const facetClauses = [];
    for (const [facetName, facetValues] of Object.entries(
      this.selectedFacets
    )) {
      facetClauses.push(this.buildFacetClause(facetName, facetValues));
    }
    return this.joinFacetClauses(facetClauses);
  }

  /**
   * Builds an OR-joined facet clause for the given facet name and values.
   *
   * E.g., for name `subject` and values
   * `{ foo: { state: 'selected' }, bar: { state: 'hidden' } }`
   * this will produce the clause
   * `subject:("foo" OR -"bar")`.
   *
   * @param facetName The facet type (e.g., 'collection')
   * @param facetValues The facet buckets, mapped by their keys
   */
  private buildFacetClause(
    facetName: string,
    facetValues: Record<string, FacetBucket>
  ): string {
    const { name: facetQueryName, values } = this.prepareFacetForFetch(
      facetName,
      facetValues
    );
    const facetEntries = Object.entries(values);
    if (facetEntries.length === 0) return '';

    const facetValuesArray: string[] = [];
    for (const [key, facetData] of facetEntries) {
      const plusMinusPrefix = facetData.state === 'hidden' ? '-' : '';
      facetValuesArray.push(`${plusMinusPrefix}"${key}"`);
    }

    const valueQuery = facetValuesArray.join(` OR `);
    return `${facetQueryName}:(${valueQuery})`;
  }

  /**
   * Handles some special pre-request normalization steps for certain facet types
   * that require them.
   *
   * @param facetName The name of the facet type (e.g., 'language')
   * @param facetValues An array of values for that facet type
   */
  private prepareFacetForFetch(
    facetName: string,
    facetValues: Record<string, FacetBucket>
  ): { name: string; values: Record<string, FacetBucket> } {
    // eslint-disable-next-line prefer-const
    let [normalizedName, normalizedValues] = [facetName, facetValues];

    // The full "search engine" name of the lending field is "lending___status"
    if (facetName === 'lending') {
      normalizedName = 'lending___status';
    }

    return {
      name: normalizedName,
      values: normalizedValues,
    };
  }

  /**
   * Takes an array of facet clauses, and combines them into a
   * full AND-joined facet query string. Empty clauses are ignored.
   */
  private joinFacetClauses(facetClauses: string[]): string | undefined {
    const nonEmptyFacetClauses = facetClauses.filter(
      clause => clause.length > 0
    );
    return nonEmptyFacetClauses.length > 0
      ? `(${nonEmptyFacetClauses.join(' AND ')})`
      : undefined;
  }

  facetsChanged(e: CustomEvent<SelectedFacets>) {
    this.selectedFacets = e.detail;
  }

  facetClickHandler(
    name: FacetOption,
    facetSelected: boolean,
    negative: boolean
  ): void {
    if (negative) {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action: facetSelected
          ? analyticsActions.facetNegativeSelected
          : analyticsActions.facetNegativeDeselected,
        label: name,
      });
    } else {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action: facetSelected
          ? analyticsActions.facetSelected
          : analyticsActions.facetDeselected,
        label: name,
      });
    }
  }

  private async fetchFacets() {
    if (!this.filteredQuery) return;

    const params: SearchParams = {
      query: this.filteredQuery,
      rows: 0,
      filters: this.filterMap,
      // Fetch a few extra buckets beyond the 6 we show, in case some get suppressed
      aggregationsSize: 10,
      // Note: we don't need an aggregations param to fetch the default aggregations from the PPS.
      // The default aggregations for the search_results page type should be what we need here.
    };

    this.facetsLoading = true;
    this.previousSearchType = this.searchType;
    const results = await this.searchService?.search(params, this.searchType);
    this.facetsLoading = false;

    this.aggregations = results?.success?.response.aggregations;

    this.fullYearsHistogramAggregation =
      results?.success?.response?.aggregations?.year_histogram ??
      results?.success?.response?.aggregations?.['year-histogram']; // Temp fix until PPS FTS key is fixed to use underscore
  }

  private scrollToPage(pageNumber: number): Promise<void> {
    return new Promise(resolve => {
      const cellIndexToScrollTo = this.pageSize * (pageNumber - 1);
      // without this setTimeout, Safari just pauses until the `fetchPage` is complete
      // then scrolls to the cell
      setTimeout(() => {
        this.isScrollingToCell = true;
        this.infiniteScroller?.scrollToCell(cellIndexToScrollTo, true);
        // This timeout is to give the scroll animation time to finish
        // then updating the infinite scroller once we're done scrolling
        // There's no scroll animation completion callback so we're
        // giving it 0.5s to finish.
        setTimeout(() => {
          this.isScrollingToCell = false;
          this.infiniteScroller?.reload();
          resolve();
        }, 500);
      }, 0);
    });
  }

  /**
   * The query key is a string that uniquely identifies the current search.
   * It consists of:
   *  - The current base query
   *  - The current search type
   *  - Any currently-applied facets
   *  - Any currently-applied date range
   *  - Any currently-applied prefix filters
   *  - The current sort options
   *
   * This lets us keep track of queries so we don't persist data that's
   * no longer relevant.
   */
  private get pageFetchQueryKey() {
    return `${this.fullQuery}-${this.searchType}-${this.sortParam?.field}-${this.sortParam?.direction}`;
  }

  // this maps the query to the pages being fetched for that query
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  async fetchPage(pageNumber: number) {
    if (!this.filteredQuery) return;

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
    const params: SearchParams = {
      query: this.filteredQuery,
      page: pageNumber,
      rows: this.pageSize,
      sort: sortParams,
      filters: this.filterMap,
      aggregations: { omit: true },
    };
    const searchResponse = await this.searchService?.search(
      params,
      this.searchType
    );
    const success = searchResponse?.success;

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      this.queryErrorMessage = `${errorMsg ?? ''}${
        detailMsg ? `; ${detailMsg}` : ''
      }`;

      if (!this.queryErrorMessage) {
        this.queryErrorMessage = 'Missing or malformed response from backend';
        // @ts-ignore: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(this.queryErrorMessage, 'error');
      }

      return;
    }

    this.totalResults = success.response.totalResults;

    // this is checking to see if the query has changed since the data was fetched
    // if so, we just want to discard the data since there should be a new query
    // right behind it
    const searchQuery = success.request.clientParameters.user_query;
    const searchSort = success.request.clientParameters.sort;
    let sortChanged = false;
    if (!searchSort || searchSort.length === 0) {
      // if we went from no sort to sort, the sort has changed
      if (this.sortParam) {
        sortChanged = true;
      }
    } else {
      // check if the sort has changed
      for (const sortType of searchSort) {
        const [field, direction] = sortType.split(':');
        if (
          field !== this.sortParam?.field ||
          direction !== this.sortParam?.direction
        ) {
          sortChanged = true;
          break;
        }
      }
    }
    const queryChangedSinceFetch =
      searchQuery !== this.filteredQuery || sortChanged;
    if (queryChangedSinceFetch) return;

    const { results } = success.response;
    if (results && results.length > 0) {
      this.preloadCollectionNames(results);
      this.updateDataSource(pageNumber, results);
    }

    // When we reach the end of the data, we can set the infinite scroller's
    // item count to the real total number of results (rather than the
    // temporary estimates based on pages rendered so far).
    if (results.length < this.pageSize) {
      this.endOfDataReached = true;
      if (this.infiniteScroller) {
        this.infiniteScroller.itemCount = this.totalResults;
      }
    }
    this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber);
    this.searchResultsLoading = false;
  }

  private preloadCollectionNames(results: SearchResult[]) {
    const collectionIds = results
      .map(result => result.collection?.values)
      .flat();
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
    const visibleCells = this.infiniteScroller?.getVisibleCellIndices() ?? [];
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
   * @param results
   */
  private updateDataSource(pageNumber: number, results: SearchResult[]) {
    // copy our existing datasource so when we set it below, it gets set
    // instead of modifying the existing dataSource since object changes
    // don't trigger a re-render
    const datasource = { ...this.dataSource };
    const tiles: TileModel[] = [];
    results?.forEach(result => {
      if (!result.identifier) return;

      let loginRequired = false;
      let contentWarning = false;
      // Check if item and item in "modifying" collection, setting above flags
      if (
        result.collection?.values.length &&
        result.mediatype?.value !== 'collection'
      ) {
        for (const collection of result.collection?.values ?? []) {
          if (collection === 'loggedin') {
            loginRequired = true;
            if (contentWarning) break;
          }
          if (collection === 'no-preview') {
            contentWarning = true;
            if (loginRequired) break;
          }
        }
      }

      tiles.push({
        averageRating: result.avg_rating?.value,
        collections: result.collection?.values ?? [],
        collectionFilesCount: result.collection_files_count?.value ?? 0,
        collectionSize: result.collection_size?.value ?? 0,
        commentCount: result.num_reviews?.value ?? 0,
        creator: result.creator?.value,
        creators: result.creator?.values ?? [],
        dateAdded: result.addeddate?.value,
        dateArchived: result.publicdate?.value,
        datePublished: result.date?.value,
        dateReviewed: result.reviewdate?.value,
        description: result.description?.values.join('\n'),
        favCount: result.num_favorites?.value ?? 0,
        href: result.__href__?.value,
        identifier: result.identifier,
        issue: result.issue?.value,
        itemCount: result.item_count?.value ?? 0,
        mediatype: result.mediatype?.value ?? 'data',
        snippets: result.highlight?.values ?? [],
        source: result.source?.value,
        subjects: result.subject?.values ?? [],
        title: result.title?.value ?? '',
        volume: result.volume?.value,
        viewCount: result.downloads?.value ?? 0,
        weeklyViewCount: result.week?.value,
        loginRequired,
        contentWarning,
      });
    });
    datasource[pageNumber] = tiles;
    this.dataSource = datasource;
    const visiblePages = this.currentVisiblePageNumbers;
    const needsReload = visiblePages.includes(pageNumber);
    if (needsReload) {
      this.infiniteScroller?.reload();
    }
  }

  /** Fetches the aggregation buckets for the given prefix filter type. */
  private async fetchPrefixFilterBuckets(
    filterType: PrefixFilterType
  ): Promise<Bucket[]> {
    if (!this.fullQueryWithoutAlphaFilters) return [];

    const filterAggregationKey = prefixFilterAggregationKeys[filterType];
    const params: SearchParams = {
      query: this.fullQueryWithoutAlphaFilters,
      rows: 0,
      // Only fetch the firstTitle or firstCreator aggregation
      aggregations: { simpleParams: [filterAggregationKey] },
      // Fetch all 26 letter buckets
      aggregationsSize: 26,
    };

    const searchResponse = await this.searchService?.search(
      params,
      this.searchType
    );

    return (searchResponse?.success?.response?.aggregations?.[
      filterAggregationKey
    ]?.buckets ?? []) as Bucket[];
  }

  /** Fetches and caches the prefix filter counts for the given filter type. */
  private async updatePrefixFilterCounts(
    filterType: PrefixFilterType
  ): Promise<void> {
    const buckets = await this.fetchPrefixFilterBuckets(filterType);
    // Unpack the aggregation buckets into a simple map like { 'A': 50, 'B': 25, ... }
    this.prefixFilterCountMap = { ...this.prefixFilterCountMap }; // Clone the object to trigger an update
    this.prefixFilterCountMap[filterType] = buckets.reduce(
      (acc: Record<string, number>, bucket: Bucket) => {
        acc[(bucket.key as string).toUpperCase()] = bucket.doc_count;
        return acc;
      },
      {}
    );
  }

  /**
   * Fetches and caches the prefix filter counts for the current sort type,
   * provided it is one that permits prefix filtering. (If not, this does nothing).
   */
  private async updatePrefixFiltersForCurrentSort(): Promise<void> {
    if (['title', 'creator'].includes(this.selectedSort)) {
      const filterType = this.selectedSort as PrefixFilterType;
      if (!this.prefixFilterCountMap[filterType]) {
        this.updatePrefixFilterCounts(filterType);
      }
    }
  }

  /**
   * Clears the cached letter counts for both title and creator, and
   * fetches a new set of counts for whichever of them is the currently
   * selected sort option (which may be neither).
   *
   * Call this whenever the counts are invalidated (e.g., by a query change).
   */
  private refreshLetterCounts(): void {
    this.prefixFilterCountMap = {};
    this.updatePrefixFiltersForCurrentSort();
  }

  /**
   * Callback when a result is selected
   */
  resultSelected(event: CustomEvent<TileModel>): void {
    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.resultSelected,
      label: event.detail.mediatype,
    });

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.resultSelected,
      label: `page-${this.currentPage}`,
    });
  }

  cellForIndex(index: number): TemplateResult | undefined {
    const model = this.tileModelAtCellIndex(index);
    if (!model) return undefined;

    return html`
      <tile-dispatcher
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${model}
        .tileDisplayMode=${this.displayMode}
        .resizeObserver=${this.resizeObserver}
        .collectionNameCache=${this.collectionNameCache}
        .sortParam=${this.sortParam}
        .mobileBreakpoint=${this.mobileBreakpoint}
        .loggedIn=${this.loggedIn}
        ?enableHoverPane=${true}
        @resultSelected=${(e: CustomEvent) => this.resultSelected(e)}
      >
      </tile-dispatcher>
    `;
  }

  /**
   * When the user scrolls near to the bottom of the page, fetch the next page
   * increase the number of pages to render and start fetching data for the new page
   */
  private scrollThresholdReached() {
    if (!this.endOfDataReached) {
      this.pagesToRender += 1;
      this.fetchPage(this.pagesToRender);
    }
  }

  static styles = css`
    :host {
      display: block;
    }

    /**
    * When page width resizes from desktop to mobile, use this class to
    * disable expand/collapse transition when loading.
    */
    .preload * {
      transition: none !important;
      -webkit-transition: none !important;
      -moz-transition: none !important;
      -ms-transition: none !important;
      -o-transition: none !important;
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
      min-width: 18rem; /* Prevents Safari from shrinking col at first draw */
      padding-right: 12px;
      padding-right: 2.5rem;
      z-index: 1;
    }

    .desktop #left-column::-webkit-scrollbar {
      display: none;
    }

    .mobile #left-column {
      width: 100%;
      padding: 0;
    }

    .desktop #left-column {
      top: 0;
      position: sticky;
      max-height: 100vh;
      overflow: scroll;
      -ms-overflow-style: none; /* hide scrollbar IE and Edge */
      scrollbar-width: none; /* hide scrollbar Firefox */
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
      padding-bottom: 2rem;
    }

    .mobile #facets-container {
      overflow: hidden;
      padding-bottom: 0;
      padding-left: 10px;
      padding-right: 10px;
    }

    #facets-container.expanded {
      max-height: 2000px;
    }

    #results-total {
      display: flex;
      align-items: baseline;
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
      font-size: 1.4rem;
      font-weight: 200;
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
        17rem
      );
      --infiniteScrollerCellMaxWidth: var(--collectionBrowserCellMaxWidth, 1fr);
    }

    /* Allow tiles to shrink a bit further at smaller viewport widths */
    @media screen and (max-width: 880px) {
      infinite-scroller.grid {
        --infiniteScrollerCellMinWidth: var(
          --collectionBrowserCellMinWidth,
          15rem
        );
      }
    }
    /* At very small widths, maintain a 2-tile layout as far as it can reasonably go */
    @media screen and (max-width: 360px) {
      infinite-scroller.grid {
        --infiniteScrollerCellMinWidth: var(
          --collectionBrowserCellMinWidth,
          12rem
        );
      }
    }

    infinite-scroller.hidden {
      display: none;
    }
  `;
}
