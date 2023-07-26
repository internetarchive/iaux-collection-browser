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
  CollectionExtraInfo,
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
  CollectionBrowserContext,
  getDefaultSelectedFacets,
  TileModel,
  CollectionDisplayMode,
  FacetBucket,
  PrefixFilterType,
  PrefixFilterCounts,
  prefixFilterAggregationKeys,
  FacetEventDetails,
  sortOptionFromAPIString,
  SORT_OPTIONS,
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
import { srOnlyStyle } from './styles/sr-only';
import { sha1 } from './utils/sha1';
import type { CollectionFacets } from './collection-facets';

type RequestKind = 'full' | 'hits' | 'aggregations';

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

  @property({ type: String }) withinCollection?: string;

  @property({ type: String }) baseQuery?: string;

  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: String }) selectedSort: SortField = SortField.default;

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: String }) sortDirection: SortDirection | null = null;

  @property({ type: Number }) pageSize = 50;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Number }) currentPage?: number;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  @property({ type: String }) collectionPagePath: string = '/details/';

  @property({ type: Object }) collectionInfo?: CollectionExtraInfo;

  @property({ type: Array }) partOfCollections: string[] = [];

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

  /**
   * Whether the initial page fetch for a new query is currently in progress.
   */
  @state() private searchResultsLoading = false;

  @state() private facetsLoading = false;

  @state() private fullYearAggregationLoading = false;

  @state() private aggregations?: Record<string, Aggregation>;

  @state() private fullYearsHistogramAggregation: Aggregation | undefined;

  @state() private totalResults?: number;

  @state() private queryErrorMessage?: string;

  @state() private mobileView = false;

  @state() private mobileFacetsVisible = false;

  @state() private contentWidth?: number;

  @state() private defaultSortField: Exclude<SortField, SortField.default> =
    SortField.relevance;

  @state() private defaultSortDirection: SortDirection | null = null;

  @state() private placeholderType: PlaceholderType = null;

  @state() private prefixFilterCountMap: Partial<
    Record<PrefixFilterType, PrefixFilterCounts>
  > = {};

  @query('#content-container') private contentContainer!: HTMLDivElement;

  @query('#left-column') private leftColumn?: HTMLDivElement;

  @query('collection-facets') private collectionFacets?: CollectionFacets;

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

  private leftColIntersectionObserver?: IntersectionObserver;

  private facetsIntersectionObserver?: IntersectionObserver;

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

  private sessionIdGenPromise?: Promise<string>;

  /**
   * Returns a promise resolving to a unique string that persists for the current browser session.
   * Used in generating unique IDs for search requests, so that multiple requests coming from the
   * same browser session can be identified.
   */
  private async getSessionId(): Promise<string> {
    try {
      const storedSessionId = sessionStorage?.getItem('cb-session');
      if (storedSessionId) {
        return storedSessionId;
      }

      // If we enter this method a second time while a first session ID is already being generated,
      // ensure we produce the same ID from both calls instead of generating another one.
      if (this.sessionIdGenPromise) {
        return this.sessionIdGenPromise;
      }

      this.sessionIdGenPromise = sha1(Math.random().toString());
      const newSessionId = await this.sessionIdGenPromise;

      sessionStorage?.setItem('cb-session', newSessionId);
      return newSessionId;
    } catch (err) {
      // Either we can't generate the hash or we're restricted from accessing sessionStorage
      return '';
    }
  }

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

  /**
   * Clears all selected/negated facets, date ranges, and letter filters.
   *
   * By default, the current sort field/direction are not cleared,
   * but this can be overridden by setting the `sort` option to `true`.
   *
   * Similarly, it is possible to finely control what is cleared by
   * setting any of the `facets`, `dateRange`, or `letterFilters` flags
   * in the options object.
   */
  clearFilters({
    facets = true,
    dateRange = true,
    letterFilters = true,
    sort = false,
  } = {}): void {
    // Don't bother clearing facets if none are checked, so that we don't
    // trigger unnecessary update cycles.
    if (facets && this.hasCheckedFacets) {
      this.selectedFacets = getDefaultSelectedFacets();
    }

    if (dateRange) {
      this.minSelectedDate = undefined;
      this.maxSelectedDate = undefined;
    }

    if (letterFilters) {
      this.selectedTitleFilter = null;
      this.selectedCreatorFilter = null;
    }

    if (sort) {
      this.sortParam = null;
      this.sortDirection = null;
      this.selectedSort = SortField.default;
    }
  }

  /**
   * Returns true if the current value of `this.selectedFacets` contains
   * any facet buckets than have been selected or negated, or false otherwise.
   */
  private get hasCheckedFacets(): boolean {
    if (!this.selectedFacets) return false;

    for (const facetGroup of Object.values(this.selectedFacets)) {
      for (const bucket of Object.values(facetGroup)) {
        if (bucket.state !== 'none') return true;
      }
    }

    return false;
  }

  /**
   * Returns true if there are any currently selected/negated facet buckets,
   * any selected date range, or any selected letter filters. False otherwise.
   *
   * Ignores sorting options.
   */
  private get hasActiveFilters(): boolean {
    return !!(
      this.hasCheckedFacets ||
      this.minSelectedDate ||
      this.maxSelectedDate ||
      this.selectedTitleFilter ||
      this.selectedCreatorFilter
    );
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
    const hasQuery = !!this.baseQuery?.trim();
    const isCollection = !!this.withinCollection;
    const noResults =
      !this.searchResultsLoading &&
      (this.totalResults === 0 || !this.searchService);

    this.placeholderType = null;
    if (!hasQuery && !isCollection) {
      this.placeholderType = 'empty-query';
    } else if (noResults) {
      // Within a collection, no query + no results means the collection simply has no viewable items.
      // Otherwise, we must have a user query that produced 0 results.
      this.placeholderType =
        !hasQuery && isCollection ? 'empty-collection' : 'no-results';
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
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${this.queryErrorMessage ?? ''}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
      ${this.infiniteScrollerTemplate}
    `;
  }

  /**
   * Top-level template for rendering the left (facets) and right (results) columns.
   */
  private get collectionBrowserTemplate() {
    return html`
      <div id="left-column-scroll-sentinel"></div>
      ${this.leftColumnTemplate} ${this.rightColumnTemplate}
    `;
  }

  /**
   * Template for either the mobile or desktop version of the left column, depending
   * on current component state.
   */
  private get leftColumnTemplate(): TemplateResult {
    if (this.mobileView) {
      return this.mobileLeftColumnTemplate;
    }
    return this.desktopLeftColumnTemplate;
  }

  /**
   * Template for the mobile version of the "left column" (which in this case, appears
   * *above* the search results rather than beside them), for rendering the
   * accordion-style facets.
   */
  private get mobileLeftColumnTemplate(): TemplateResult {
    return html`
      <div
        id="left-column"
        class="column${this.isResizeToMobile ? ' preload' : ''}"
      >
        ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `;
  }

  /**
   * Template for the desktop version of the left column, displaying the facets sidebar.
   */
  private get desktopLeftColumnTemplate(): TemplateResult {
    return html`
      <div id="left-column" class="column">
        <div id="facets-header-container">
          <h2 id="facets-header" class="sr-only">Filters</h2>
          ${this.resultsCountTemplate} ${this.clearFiltersBtnTemplate(false)}
        </div>
        <div id="facets-container" aria-labelledby="facets-header">
          ${this.facetsTemplate}
          <div id="facets-scroll-sentinel"></div>
        </div>
        <div id="facets-bottom-fade"></div>
      </div>
    `;
  }

  /**
   * Template for the "X Results" count at the top of the search results.
   * Changes to the "Searching..." label if the search results are still loading.
   */
  private get resultsCountTemplate(): TemplateResult {
    const shouldShowSearching =
      this.searchResultsLoading || this.totalResults === undefined;
    const resultsCount = this.totalResults?.toLocaleString();
    const resultsLabel = this.totalResults === 1 ? 'Result' : 'Results';

    return html`
      <div id="results-total">
        <span id="big-results-count">
          ${shouldShowSearching ? html`Searching&hellip;` : resultsCount}
        </span>
        <span id="big-results-label">
          ${shouldShowSearching ? nothing : resultsLabel}
        </span>
      </div>
    `;
  }

  /**
   * Template for the right column of the collection browser, where the result
   * tiles and sort/filter bar are shown.
   */
  private get rightColumnTemplate(): TemplateResult {
    return html`
      <div id="right-column" class="column">
        ${this.sortFilterBarTemplate}
        ${this.displayMode === `list-compact`
          ? this.listHeaderTemplate
          : nothing}
        ${this.infiniteScrollerTemplate}
      </div>
    `;
  }

  private get infiniteScrollerTemplate() {
    return html`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType ? 0 : nothing}
      ariaLandmarkLabel="Search results"
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
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .showRelevance=${this.isRelevanceSortAvailable}
        .showDateFavorited=${this.withinCollection?.startsWith('fav-')}
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
    const sortOption = SORT_OPTIONS[this.selectedSort];
    if (!sortOption.handledBySearchService) {
      this.sortParam = null;
      return;
    }

    // If the sort option specified in the URL is unrecognized, we just use it as-is
    const urlSortParam = new URL(window.location.href).searchParams.get('sort');
    const sortField =
      sortOption.searchServiceKey ?? urlSortParam?.replace(/^-/, '');

    // If the sort direction is still null at this point, then we assume ascending
    // (i.e., it was unrecognized and had no directional flag)
    if (!this.sortDirection) this.sortDirection = 'asc';

    if (!sortField) return;
    this.sortParam = { field: sortField, direction: this.sortDirection };

    // Lazy-load the alphabet counts for title/creator sort bar as needed
    this.updatePrefixFiltersForCurrentSort();
  }

  private displayModeChanged(
    e: CustomEvent<{ displayMode?: CollectionDisplayMode }>
  ): void {
    this.displayMode = e.detail.displayMode;

    if (this.displayMode) {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action: analyticsActions.displayMode,
        label: this.displayMode,
      });
    }
  }

  /**
   * Returns a query clause identifying the currently selected title filter,
   * e.g., `firstTitle:X`.
   */
  private get titleQuery(): string | undefined {
    return this.selectedTitleFilter
      ? `firstTitle:${this.selectedTitleFilter}`
      : undefined;
  }

  /**
   * Returns a query clause identifying the currently selected creator filter,
   * e.g., `firstCreator:X`.
   */
  private get creatorQuery(): string | undefined {
    return this.selectedCreatorFilter
      ? `firstCreator:${this.selectedCreatorFilter}`
      : undefined;
  }

  /**
   * Send Analytics when sorting by title's first letter
   * labels: 'start-<ToLetter>' | 'clear-<FromLetter>' | '<FromLetter>-<ToLetter>'
   */
  private sendFilterByTitleAnalytics(prevSelectedLetter: string | null): void {
    if (!prevSelectedLetter && !this.selectedTitleFilter) {
      return;
    }
    const cleared = prevSelectedLetter && !this.selectedTitleFilter;

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.filterByTitle,
      label: cleared
        ? `clear-${prevSelectedLetter}`
        : `${prevSelectedLetter || 'start'}-${this.selectedTitleFilter}`,
    });
  }

  /**
   * Send Analytics when filtering by creator's first letter
   * labels: 'start-<ToLetter>' | 'clear-<FromLetter>' | '<FromLetter>-<ToLetter>'
   */
  private sendFilterByCreatorAnalytics(
    prevSelectedLetter: string | null
  ): void {
    if (!prevSelectedLetter && !this.selectedCreatorFilter) {
      return;
    }
    const cleared = prevSelectedLetter && !this.selectedCreatorFilter;

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.filterByCreator,
      label: cleared
        ? `clear-${prevSelectedLetter}`
        : `${prevSelectedLetter || 'start'}-${this.selectedCreatorFilter}`,
    });
  }

  /**
   * Handler for changes to which letter is selected in the title alphabet bar.
   */
  private titleLetterSelected(
    e: CustomEvent<{ selectedLetter: string | null }>
  ): void {
    this.selectedCreatorFilter = null;
    this.selectedTitleFilter = e.detail.selectedLetter;
  }

  /**
   * Handler for changes to which letter is selected in the creator alphabet bar.
   */
  private creatorLetterSelected(
    e: CustomEvent<{ selectedLetter: string | null }>
  ): void {
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = e.detail.selectedLetter;
  }

  /**
   * The full template for how the facets should be structured in mobile view,
   * including the collapsible container (with header) and the facets themselves.
   */
  private get mobileFacetsTemplate(): TemplateResult {
    const toggleFacetsVisible = () => {
      this.isResizeToMobile = false;
      this.mobileFacetsVisible = !this.mobileFacetsVisible;
    };

    return html`
      <details
        id="mobile-filter-collapse"
        @click=${toggleFacetsVisible}
        @keyup=${toggleFacetsVisible}
      >
        <summary>
          <span class="collapser-icon">${chevronIcon}</span>
          <h2>Filters</h2>
          ${this.clearFiltersBtnTemplate(true)}
        </summary>
        ${this.facetsTemplate}
      </details>
    `;
  }

  /**
   * The template for the facets component alone, without any surrounding wrappers.
   */
  private get facetsTemplate() {
    return html`
      <collection-facets
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        .collectionPagePath=${this.collectionPagePath}
        .partOfCollections=${this.partOfCollections}
        .withinCollection=${this.withinCollection}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.aggregations}
        .fullYearsHistogramAggregation=${this.fullYearsHistogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .collectionNameCache=${this.collectionNameCache}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .allowExpandingDatePicker=${!this.mobileView}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .filterMap=${this.filterMap}
        .modalManager=${this.modalManager}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?fullYearAggregationLoading=${this.facetsLoading}
        @facetClick=${this.facetClickHandler}
        .analyticsHandler=${this.analyticsHandler}
      >
      </collection-facets>
    `;
  }

  /**
   * The HTML template for the "Clear all filters" button, or `nothing` if no
   * filters are currently active.
   *
   * @param mobile Whether to style/shorten the button for mobile view
   */
  private clearFiltersBtnTemplate(
    mobile: boolean
  ): TemplateResult | typeof nothing {
    if (!this.hasActiveFilters) return nothing;

    const buttonClasses = classMap({
      'clear-filters-btn': true,
      mobile,
    });

    const buttonText = mobile ? 'Clear all' : 'Clear all filters';

    return html`
      <div class="clear-filters-btn-row">
        ${mobile
          ? html`<span class="clear-filters-btn-separator">&nbsp;</span>`
          : nothing}
        <button class=${buttonClasses} @click=${this.clearFilters}>
          ${buttonText}
        </button>
      </div>
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
    if (changed.has('placeholderType') && this.placeholderType === null) {
      if (!this.leftColIntersectionObserver) {
        this.setupLeftColumnScrollListeners();
      }
      if (!this.facetsIntersectionObserver) {
        this.setupFacetsScrollListeners();
      }
      this.updateLeftColumnHeight();
    }

    if (
      changed.has('displayMode') ||
      changed.has('baseNavigationUrl') ||
      changed.has('baseImageUrl') ||
      changed.has('loggedIn')
    ) {
      this.infiniteScroller?.reload();
    }

    if (
      changed.has('baseQuery') ||
      changed.has('searchType') ||
      changed.has('withinCollection')
    ) {
      // Unless this query/search type update is from the initial page load or the
      // result of hitting the back button,
      // we need to clear any existing filters since they may no longer be valid for
      // the new set of search results.
      if (!this.historyPopOccurred && this.initialQueryChangeHappened) {
        // Ordinarily, we leave the sort param unchanged between searches.
        // However, if we are changing the target collection itself, we want the sort cleared too,
        // since different collections may have different sorting options available.
        const shouldClearSort =
          changed.has('withinCollection') &&
          !changed.has('selectedSort') &&
          !changed.has('sortDirection');

        // Otherwise, only clear filters that haven't been simultaneously applied in this update
        this.clearFilters({
          sort: shouldClearSort,
          facets: !changed.has('selectedFacets'),
          dateRange: !(
            changed.has('minSelectedDate') || changed.has('maxSelectedDate')
          ),
          letterFilters: !(
            changed.has('selectedTitleFilter') ||
            changed.has('selectedCreatorFilter')
          ),
        });
      }
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
      changed.has('minSelectedDate') ||
      changed.has('maxSelectedDate') ||
      changed.has('selectedFacets') ||
      changed.has('searchService') ||
      changed.has('withinCollection')
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
    }
    if (changed.has('selectedCreatorFilter')) {
      this.sendFilterByCreatorAnalytics(
        changed.get('selectedCreatorFilter') as string
      );
    }

    if (
      changed.has('baseQuery') ||
      changed.has('searchType') ||
      changed.has('selectedTitleFilter') ||
      changed.has('selectedCreatorFilter') ||
      changed.has('minSelectedDate') ||
      changed.has('maxSelectedDate') ||
      changed.has('sortParam') ||
      changed.has('selectedFacets') ||
      changed.has('searchService') ||
      changed.has('withinCollection')
    ) {
      this.handleQueryChange();
    }

    if (changed.has('searchResultsLoading')) {
      this.emitSearchResultsLoadingChanged();
    }

    if (
      changed.has('facetsLoading') &&
      this.facetsLoading &&
      this.collectionFacets
    ) {
      this.collectionFacets.moreLinksVisible =
        this.searchType !== SearchType.FULLTEXT;
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

    this.leftColIntersectionObserver?.disconnect();
    this.facetsIntersectionObserver?.disconnect();
    window.removeEventListener('resize', this.updateLeftColumnHeight);
  }

  handleResize(entry: ResizeObserverEntry): void {
    const previousView = this.mobileView;
    if (entry.target === this.contentContainer) {
      this.contentWidth = entry.contentRect.width;
      this.mobileView =
        this.contentWidth > 0 && this.contentWidth < this.mobileBreakpoint;
      // If changing from desktop to mobile disable transition
      if (this.mobileView && !previousView) {
        this.isResizeToMobile = true;
      }
    }

    // Ensure the facet sidebar remains sized correctly
    this.updateLeftColumnHeight();
  }

  /**
   * Sets up listeners for events that may require updating the left column height.
   */
  private setupLeftColumnScrollListeners(): void {
    // We observe intersections between the left column's scroll sentinel and
    // the viewport, so that we can ensure the left column is always sized to
    // match the _available_ viewport height. This should generally be more
    // performant than listening to scroll events on the page or column.
    const leftColumnSentinel = this.shadowRoot?.querySelector(
      '#left-column-scroll-sentinel'
    );
    if (leftColumnSentinel) {
      this.leftColIntersectionObserver = new IntersectionObserver(
        this.updateLeftColumnHeight,
        {
          threshold: [...Array(101).keys()].map(n => n / 100), // Threshold every 1%
        }
      );
      this.leftColIntersectionObserver.observe(leftColumnSentinel);
    }

    // We also listen for window resize events, as they are not always captured
    // by the resize observer and can affect the desired height of the left column.
    window.addEventListener('resize', this.updateLeftColumnHeight);
  }

  /**
   * Sets up listeners to control whether the facet sidebar shows its bottom fade-out.
   * Note this uses a separate IntersectionObserver from the left column, because we
   * don't need granular intersection thresholds for this.
   */
  private setupFacetsScrollListeners(): void {
    const facetsSentinel = this.shadowRoot?.querySelector(
      '#facets-scroll-sentinel'
    );
    if (facetsSentinel) {
      this.facetsIntersectionObserver = new IntersectionObserver(
        this.updateFacetFadeOut
      );
      this.facetsIntersectionObserver.observe(facetsSentinel);
    }
  }

  /**
   * Updates the height of the left column according to its position on the page.
   * Arrow function ensures proper `this` binding.
   */
  private updateLeftColumnHeight = (): void => {
    if (this.mobileView) {
      this.leftColumn?.style?.removeProperty('height');
    } else {
      const clientTop = this.leftColumn?.getBoundingClientRect().top;
      this.leftColumn?.style?.setProperty(
        'height',
        `${window.innerHeight - (clientTop ?? 0) - 3}px`
      );
    }
  };

  /**
   * Toggles whether the fade-out is visible at the bottom of the facets.
   * It should only be visible if the facets are not scrolled to the bottom.
   * Arrow function ensures proper `this` binding.
   */
  private updateFacetFadeOut = (entries: IntersectionObserverEntry[]): void => {
    const fadeElmt = this.shadowRoot?.getElementById('facets-bottom-fade');
    fadeElmt?.classList.toggle('hidden', entries?.[0]?.isIntersecting);
  };

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

  /**
   * Internal property to store the `resolve` function for the most recent
   * `initialSearchComplete` promise, allowing us to resolve it at the appropriate time.
   */
  private _initialSearchCompleteResolver!: (val: boolean) => void;

  /**
   * Internal property to store the private value backing the `initialSearchComplete` getter.
   */
  private _initialSearchCompletePromise: Promise<boolean> = new Promise(res => {
    this._initialSearchCompleteResolver = res;
  });

  /**
   * A Promise which, after each query change, resolves once the fetches for the initial
   * search have completed. Waits for *both* the hits and aggregations fetches to finish.
   *
   * Ensure you await this component's `updateComplete` promise before awaiting this
   * one, to ensure you do not await an obsolete promise from the previous update.
   */
  get initialSearchComplete(): Promise<boolean> {
    return this._initialSearchCompletePromise;
  }

  private async handleQueryChange() {
    // only reset if the query has actually changed
    if (!this.searchService || this.pageFetchQueryKey === this.previousQueryKey)
      return;

    // If the new state prevents us from updating the search results, don't reset
    if (!this.canPerformSearch) return;

    this.previousQueryKey = this.pageFetchQueryKey;

    this.dataSource = {};
    this.totalResults = undefined;
    this.aggregations = undefined;
    this.fullYearsHistogramAggregation = undefined;
    this.pageFetchesInProgress = {};
    this.endOfDataReached = false;
    this.pagesToRender =
      this.initialPageNumber === 1
        ? 2 // First two pages are batched into one request when starting from page 1
        : this.initialPageNumber;
    this.queryErrorMessage = undefined;

    // Reset the infinite scroller's item count, so that it
    // shows tile placeholders until the new query's results load in
    if (this.infiniteScroller) {
      this.infiniteScroller.itemCount = this.estimatedTileCount;
      this.infiniteScroller.reload();
    }

    if (this.withinCollection && this.baseQuery?.trim()) {
      this.defaultSortField = SortField.relevance;
      this.defaultSortDirection = null;
    }

    if (!this.initialQueryChangeHappened && this.initialPageNumber > 1) {
      this.scrollToPage(this.initialPageNumber);
    }
    this.initialQueryChangeHappened = true;

    // if the query changed as part of a window.history pop event, we don't want to
    // persist the state because it overwrites the forward history
    if (!this.historyPopOccurred) {
      this.persistState();
    }
    this.historyPopOccurred = false;

    // Reset the `initialSearchComplete` promise with a new value for the imminent search
    this._initialSearchCompletePromise = new Promise(res => {
      this._initialSearchCompleteResolver = res;
    });

    // Fire the initial page and facets requests
    await Promise.all([this.doInitialPageFetch(), this.fetchFacets()]);

    // Resolve the `initialSearchComplete` promise for this search
    this._initialSearchCompleteResolver(true);
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
    this.selectedSort = restorationState.selectedSort ?? SortField.default;
    this.sortDirection = restorationState.sortDirection ?? null;
    this.selectedTitleFilter = restorationState.selectedTitleFilter ?? null;
    this.selectedCreatorFilter = restorationState.selectedCreatorFilter ?? null;
    this.selectedFacets = restorationState.selectedFacets;
    this.baseQuery = restorationState.baseQuery;
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
      selectedSort: this.selectedSort,
      sortDirection: this.sortDirection ?? undefined,
      selectedFacets: this.selectedFacets ?? getDefaultSelectedFacets(),
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

  private async doInitialPageFetch(): Promise<void> {
    this.searchResultsLoading = true;
    // Try to batch 2 initial page requests when possible
    await this.fetchPage(this.initialPageNumber, 2);
    this.searchResultsLoading = false;
  }

  private emitSearchResultsLoadingChanged(): void {
    this.dispatchEvent(
      new CustomEvent<{ loading: boolean }>('searchResultsLoadingChanged', {
        detail: {
          loading: this.searchResultsLoading,
        },
      })
    );
  }

  /**
   * Produces a compact unique ID for a search request that can help with debugging
   * on the backend by making related requests easier to trace through different services.
   * (e.g., tying the hits/aggregations requests for the same page back to a single hash).
   *
   * @param params The search service parameters for the request
   * @param kind The kind of request (hits-only, aggregations-only, or both)
   * @returns A Promise resolving to the uid to apply to the request
   */
  private async requestUID(
    params: SearchParams,
    kind: RequestKind
  ): Promise<string> {
    const paramsToHash = JSON.stringify({
      pageType: params.pageType,
      pageTarget: params.pageTarget,
      query: params.query,
      fields: params.fields,
      filters: params.filters,
      sort: params.sort,
      searchType: this.searchType,
    });

    const fullQueryHash = (await sha1(paramsToHash)).slice(0, 20); // First 80 bits of SHA-1 are plenty for this
    const sessionId = (await this.getSessionId()).slice(0, 20); // Likewise
    const page = params.page ?? 0;
    const kindPrefix = kind.charAt(0); // f = full, h = hits, a = aggregations
    const currentTime = Date.now();

    return `R:${fullQueryHash}-S:${sessionId}-P:${page}-K:${kindPrefix}-T:${currentTime}`;
  }

  /**
   * Constructs a search service FilterMap object from the combination of
   * all the currently-applied filters. This includes any facets, letter
   * filters, and date range.
   */
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

    // Add any letter filters
    if (this.selectedTitleFilter) {
      builder.addFilter(
        'firstTitle',
        this.selectedTitleFilter,
        FilterConstraint.INCLUDE
      );
    }
    if (this.selectedCreatorFilter) {
      builder.addFilter(
        'firstCreator',
        this.selectedCreatorFilter,
        FilterConstraint.INCLUDE
      );
    }

    const filterMap = builder.build();
    return filterMap;
  }

  /** The full query, including year facets and date range clauses */
  private get fullQuery(): string | undefined {
    let fullQuery = this.baseQuery?.trim() ?? '';

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
    return fullQuery.trim();
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
    return this.joinFacetClauses(facetClauses)?.trim();
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

  facetClickHandler({
    detail: { key, state: facetState, negative },
  }: CustomEvent<FacetEventDetails>): void {
    if (negative) {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action:
          facetState !== 'none'
            ? analyticsActions.facetNegativeSelected
            : analyticsActions.facetNegativeDeselected,
        label: key,
      });
    } else {
      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action:
          facetState !== 'none'
            ? analyticsActions.facetSelected
            : analyticsActions.facetDeselected,
        label: key,
      });
    }
  }

  private async fetchFacets() {
    const trimmedQuery = this.baseQuery?.trim();
    if (!this.canPerformSearch) return;

    const { facetFetchQueryKey } = this;

    const sortParams = this.sortParam ? [this.sortParam] : [];
    const params: SearchParams = {
      ...this.collectionParams,
      query: trimmedQuery || '',
      rows: 0,
      filters: this.filterMap,
      // Fetch a few extra buckets beyond the 6 we show, in case some get suppressed
      aggregationsSize: 10,
      // Note: we don't need an aggregations param to fetch the default aggregations from the PPS.
      // The default aggregations for the search_results page type should be what we need here.
    };
    params.uid = await this.requestUID(
      { ...params, sort: sortParams },
      'aggregations'
    );

    this.facetsLoading = true;
    const searchResponse = await this.searchService?.search(
      params,
      this.searchType
    );
    const success = searchResponse?.success;

    // This is checking to see if the query has changed since the data was fetched.
    // If so, we just want to discard this set of aggregations because they are
    // likely no longer valid for the newer query.
    const queryChangedSinceFetch =
      facetFetchQueryKey !== this.facetFetchQueryKey;
    if (queryChangedSinceFetch) return;

    if (!success) {
      const errorMsg = searchResponse?.error?.message;
      const detailMsg = searchResponse?.error?.details?.message;

      if (!errorMsg && !detailMsg) {
        // @ts-ignore: Property 'Sentry' does not exist on type 'Window & typeof globalThis'
        window?.Sentry?.captureMessage?.(
          'Missing or malformed facet response from backend',
          'error'
        );
      }

      return;
    }

    const { aggregations, collectionTitles } = success.response;
    this.aggregations = aggregations;

    if (collectionTitles) {
      this.collectionNameCache?.addKnownTitles(collectionTitles);
    } else if (this.aggregations?.collection) {
      this.collectionNameCache?.preloadIdentifiers(
        (this.aggregations.collection.buckets as Bucket[]).map(bucket =>
          bucket.key?.toString()
        )
      );
    }

    this.fullYearsHistogramAggregation =
      success?.response?.aggregations?.year_histogram;

    this.facetsLoading = false;
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
   * Whether sorting by relevance makes sense for the current state.
   * Currently equivalent to having a non-empty query.
   */
  private get isRelevanceSortAvailable(): boolean {
    return !!this.baseQuery?.trim();
  }

  /**
   * Whether a search may be performed in the current state of the component.
   * This is only true if the search service is defined, and either
   *   (a) a non-empty query is set, or
   *   (b) we are on a collection page in metadata search mode.
   */
  private get canPerformSearch(): boolean {
    if (!this.searchService) return false;

    const trimmedQuery = this.baseQuery?.trim();
    const hasNonEmptyQuery = !!trimmedQuery;
    const isCollectionSearch = !!this.withinCollection;
    const isMetadataSearch = this.searchType === SearchType.METADATA;

    // Metadata searches within a collection are allowed to have no query.
    // Otherwise, a non-empty query must be set.
    return hasNonEmptyQuery || (isCollectionSearch && isMetadataSearch);
  }

  /**
   * Additional params to pass to the search service if targeting a collection page,
   * or null otherwise.
   */
  private get collectionParams(): {
    pageType: string;
    pageTarget: string;
  } | null {
    return this.withinCollection
      ? { pageType: 'collection_details', pageTarget: this.withinCollection }
      : null;
  }

  /**
   * The query key is a string that uniquely identifies the current search.
   * It consists of:
   *  - The current base query
   *  - The current collection
   *  - The current search type
   *  - Any currently-applied facets
   *  - Any currently-applied date range
   *  - Any currently-applied prefix filters
   *  - The current sort options
   *
   * This lets us keep track of queries so we don't persist data that's
   * no longer relevant.
   */
  private get pageFetchQueryKey(): string {
    const sortField = this.sortParam?.field ?? 'none';
    const sortDirection = this.sortParam?.direction ?? 'none';
    return `${this.fullQuery}-${this.withinCollection}-${this.searchType}-${sortField}-${sortDirection}`;
  }

  /**
   * Similar to `pageFetchQueryKey` above, but excludes sort fields since they
   * are not relevant in determining aggregation queries.
   */
  private get facetFetchQueryKey(): string {
    return `${this.fullQuery}-${this.withinCollection}-${this.searchType}`;
  }

  // this maps the query to the pages being fetched for that query
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  /**
   * Fetches one or more pages of results and updates the data source.
   *
   * @param pageNumber The page number to fetch
   * @param numInitialPages If this is an initial page fetch (`pageNumber = 1`),
   *  specifies how many pages to batch together in one request. Ignored
   *  if `pageNumber != 1`, defaulting to a single page.
   */
  async fetchPage(pageNumber: number, numInitialPages = 1) {
    const trimmedQuery = this.baseQuery?.trim();
    if (!this.canPerformSearch) return;

    // if we already have data, don't fetch again
    if (this.dataSource[pageNumber]) return;

    if (this.endOfDataReached) return;

    // Batch multiple initial page requests together if needed (e.g., can request
    // pages 1 and 2 together in a single request).
    const numPages = pageNumber === 1 ? numInitialPages : 1;
    const numRows = this.pageSize * numPages;

    // if a fetch is already in progress for this query and page, don't fetch again
    const { pageFetchQueryKey } = this;
    const pageFetches =
      this.pageFetchesInProgress[pageFetchQueryKey] ?? new Set();
    if (pageFetches.has(pageNumber)) return;
    for (let i = 0; i < numPages; i += 1) {
      pageFetches.add(pageNumber + i);
    }
    this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;

    const sortParams = this.sortParam ? [this.sortParam] : [];
    const params: SearchParams = {
      ...this.collectionParams,
      query: trimmedQuery || '',
      page: pageNumber,
      rows: numRows,
      sort: sortParams,
      filters: this.filterMap,
      aggregations: { omit: true },
    };
    params.uid = await this.requestUID(params, 'hits');

    const searchResponse = await this.searchService?.search(
      params,
      this.searchType
    );
    const success = searchResponse?.success;

    // This is checking to see if the query has changed since the data was fetched.
    // If so, we just want to discard the data since there should be a new query
    // right behind it.
    const queryChangedSinceFetch = pageFetchQueryKey !== this.pageFetchQueryKey;
    if (queryChangedSinceFetch) return;

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

      for (let i = 0; i < numPages; i += 1) {
        this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber + i);
      }

      this.searchResultsLoading = false;
      return;
    }

    this.totalResults = success.response.totalResults;

    if (this.withinCollection) {
      this.collectionInfo = success.response.collectionExtraInfo;

      // For collections, we want the UI to respect the default sort option
      // which can be specified in metadata, or otherwise assumed to be week:desc
      this.applyDefaultCollectionSort(this.collectionInfo);

      if (this.collectionInfo) {
        this.partOfCollections = [].concat(
          this.collectionInfo.public_metadata?.collection ?? []
        );
      }
    }

    const { results, collectionTitles } = success.response;
    if (results && results.length > 0) {
      // Load any collection titles present on the response into the cache,
      // or queue up preload fetches for them if none were present.
      if (collectionTitles) {
        this.collectionNameCache?.addKnownTitles(collectionTitles);
      } else {
        this.preloadCollectionNames(results);
      }

      // Update the data source for each returned page
      for (let i = 0; i < numPages; i += 1) {
        const pageStartIndex = this.pageSize * i;
        this.updateDataSource(
          pageNumber + i,
          results.slice(pageStartIndex, pageStartIndex + this.pageSize)
        );
      }
    }

    // When we reach the end of the data, we can set the infinite scroller's
    // item count to the real total number of results (rather than the
    // temporary estimates based on pages rendered so far).
    const resultCountDiscrepancy = numRows - results.length;
    if (resultCountDiscrepancy > 0) {
      this.endOfDataReached = true;
      if (this.infiniteScroller) {
        this.infiniteScroller.itemCount =
          this.estimatedTileCount - resultCountDiscrepancy;
      }
    }

    for (let i = 0; i < numPages; i += 1) {
      this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber + i);
    }
  }

  private preloadCollectionNames(results: SearchResult[]) {
    const collectionIds = results
      .map(result => result.collection?.values)
      .flat();
    const collectionIdsArray = Array.from(new Set(collectionIds)) as string[];
    this.collectionNameCache?.preloadIdentifiers(collectionIdsArray);
  }

  /**
   * Applies any default sort option for the current collection, by checking
   * for one in the collection's metadata. If none is found, defaults to sorting
   * descending by:
   *  - Date Favorited for fav-* collections
   *  - Weekly views for all other collections
   */
  private applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo) {
    if (this.baseQuery) {
      // If there's a query set, then we default to relevance sorting regardless of
      // the collection metadata-specified sort.
      this.defaultSortField = SortField.relevance;
      this.defaultSortDirection = null;
      return;
    }

    // Favorite collections sort on Date Favorited by default.
    // Other collections fall back to sorting on weekly views.
    const baseDefaultSort: string =
      collectionInfo?.public_metadata?.identifier?.startsWith('fav-')
        ? '-favoritedate'
        : '-week';

    // The collection metadata may override the default sorting with something else
    const metadataSort: string | undefined =
      collectionInfo?.public_metadata?.['sort-by'];

    // Prefer the metadata-specified sort if one exists
    const defaultSortToApply = metadataSort ?? baseDefaultSort;

    // Account for both -field and field:dir formats
    let [field, dir] = defaultSortToApply.split(':');
    if (field.startsWith('-')) {
      field = field.slice(1);
      dir = 'desc';
    } else if (!['asc', 'desc'].includes(dir)) {
      dir = 'asc';
    }

    const sortOption = sortOptionFromAPIString(field);
    const sortField = sortOption.field;
    if (sortField && sortField !== SortField.default) {
      this.defaultSortField = sortField;
      this.defaultSortDirection = dir as SortDirection;
    }
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
        href: this.collapseRepeatedQuotes(result.__href__?.value),
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

  /**
   * Returns the input string, but removing one set of quotes from all instances of
   * ""clauses wrapped in two sets of quotes"". This assumes the quotes are already
   * URL-encoded.
   *
   * This should be a temporary measure to address the fact that the __href__ field
   * sometimes acquires extra quotation marks during query rewriting. Once there is a
   * full Lucene parser in place that handles quoted queries correctly, this can likely
   * be removed.
   */
  private collapseRepeatedQuotes(str?: string): string | undefined {
    return str?.replace(/%22%22(?!%22%22)(.+?)%22%22/g, '%22$1%22');
  }

  /** Fetches the aggregation buckets for the given prefix filter type. */
  private async fetchPrefixFilterBuckets(
    filterType: PrefixFilterType
  ): Promise<Bucket[]> {
    const trimmedQuery = this.baseQuery?.trim();
    if (!this.canPerformSearch) return [];

    const filterAggregationKey = prefixFilterAggregationKeys[filterType];
    const sortParams = this.sortParam ? [this.sortParam] : [];

    const params: SearchParams = {
      ...this.collectionParams,
      query: trimmedQuery || '',
      rows: 0,
      filters: this.filterMap,
      // Only fetch the firstTitle or firstCreator aggregation
      aggregations: { simpleParams: [filterAggregationKey] },
      // Fetch all 26 letter buckets
      aggregationsSize: 26,
    };
    params.uid = await this.requestUID(
      { ...params, sort: sortParams },
      'aggregations'
    );

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
    const { facetFetchQueryKey } = this;
    const buckets = await this.fetchPrefixFilterBuckets(filterType);

    // Don't update the filter counts for an outdated query (if it has been changed
    // since we sent the request)
    const queryChangedSinceFetch =
      facetFetchQueryKey !== this.facetFetchQueryKey;
    if (queryChangedSinceFetch) return;

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
    if (Object.keys(this.prefixFilterCountMap).length > 0) {
      this.prefixFilterCountMap = {};
    }
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
        .collectionPagePath=${this.collectionPagePath}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .baseImageUrl=${this.baseImageUrl}
        .model=${model}
        .tileDisplayMode=${this.displayMode}
        .resizeObserver=${this.resizeObserver}
        .collectionNameCache=${this.collectionNameCache}
        .sortParam=${this.sortParam}
        .creatorFilter=${this.selectedCreatorFilter}
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

  static get styles() {
    return [
      srOnlyStyle,
      css`
        :host {
          display: block;

          --leftColumnWidth: 18rem;
          --leftColumnPaddingRight: 2.5rem;
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

        empty-placeholder {
          margin-top: var(--placeholderMarginTop, 0);
        }

        .collapser-icon {
          display: inline-block;
        }

        .collapser-icon svg {
          display: inline-block;
          width: 12px;
          height: 12px;
          transition: transform 0.2s ease-out;
        }

        #mobile-filter-collapse {
          width: 100%;
        }

        #mobile-filter-collapse > summary {
          cursor: pointer;
          list-style: none;
        }

        #mobile-filter-collapse[open] > summary {
          margin-bottom: 10px;
        }

        #mobile-filter-collapse h2 {
          display: inline-block;
          margin: 0;
          font-size: 2rem;
        }

        #mobile-filter-collapse[open] svg {
          transform: rotate(90deg);
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
          border-right: 1px solid rgb(232, 232, 232);
          padding-left: 1rem;
          padding-right: 1rem;
          margin-top: var(--rightColumnMarginTop, 0);
          background: #fff;
        }

        .mobile #right-column {
          border-left: none;
          padding: 5px 5px 0;
        }

        #left-column {
          width: var(--leftColumnWidth, 18rem);
          /* Prevents Safari from shrinking col at first draw */
          min-width: var(--leftColumnWidth, 18rem);
          padding-top: 0;
          /* Reduced padding by 0.2rem to add the invisible border in the rule below */
          padding-right: calc(var(--leftColumnPaddingRight, 2.5rem) - 0.2rem);
          border-right: 0.2rem solid transparent; /* Pads to the right of the scrollbar a bit */
          z-index: 1;
        }

        .desktop #left-column {
          top: 0;
          position: sticky;
          height: calc(100vh - 2rem);
          max-height: calc(100vh - 2rem);
          overflow-x: hidden;
          overflow-y: scroll;

          /*
          * Firefox doesn't support any of the -webkit-scrollbar stuff below, but
          * does at least give us a tiny bit of control over width & color.
          */
          scrollbar-width: thin;
          scrollbar-color: transparent transparent;
        }
        .desktop #left-column:hover {
          scrollbar-color: auto;
        }
        .desktop #left-column::-webkit-scrollbar {
          appearance: none;
          width: 6px;
        }
        .desktop #left-column::-webkit-scrollbar-button {
          height: 3px;
          background: transparent;
        }
        .desktop #left-column::-webkit-scrollbar-corner {
          background: transparent;
        }
        .desktop #left-column::-webkit-scrollbar-thumb {
          border-radius: 4px;
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb {
          background: rgba(0, 0, 0, 0.15);
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 0, 0, 0.2);
        }
        .desktop #left-column:hover::-webkit-scrollbar-thumb:active {
          background: rgba(0, 0, 0, 0.3);
        }

        #facets-bottom-fade {
          background: linear-gradient(
            to bottom,
            #f5f5f700 0%,
            #f5f5f7c0 50%,
            #f5f5f7 80%,
            #f5f5f7 100%
          );
          position: fixed;
          bottom: 0;
          height: 50px;
          /* Wide enough to cover the content, but leave the scrollbar uncovered */
          width: calc(
            var(--leftColumnWidth) + var(--leftColumnPaddingRight) - 10px
          );
          z-index: 2;
          pointer-events: none;
          transition: height 0.1s ease;
        }
        #facets-bottom-fade.hidden {
          height: 0;
        }

        .desktop #left-column-scroll-sentinel {
          width: 1px;
          height: 100vh;
          background: transparent;
        }

        .desktop #facets-scroll-sentinel {
          width: 1px;
          height: 1px;
          background: transparent;
        }

        #facets-header-container {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin: 10px 0;
        }

        .desktop #facets-header-container {
          padding-top: 2rem;
          flex-wrap: wrap;
        }

        .mobile #left-column {
          width: 100%;
          padding: 0;
        }

        .clear-filters-btn-row {
          display: inline-block;
        }

        .desktop .clear-filters-btn-row {
          width: 100%;
        }

        .clear-filters-btn {
          display: inline-block;
          appearance: none;
          margin: 0;
          padding: 0;
          border: 0;
          background: none;
          color: var(--ia-theme-link-color);
          font-size: 1.4rem;
          font-family: inherit;
          cursor: pointer;
        }

        .clear-filters-btn:hover {
          text-decoration: underline;
        }

        .clear-filters-btn-separator {
          display: inline-block;
          margin-left: 5px;
          border-left: 1px solid #2c2c2c;
          font-size: 1.4rem;
          line-height: 1.3rem;
        }

        #facets-container {
          position: relative;
          max-height: 0;
          transition: max-height 0.2s ease-in-out;
          z-index: 1;
          margin-top: 5rem;
          padding-bottom: 2rem;
        }

        .desktop #facets-container {
          width: 18rem;
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
        }

        .mobile #results-total {
          float: right;
          margin-bottom: 0;
          margin-right: 5px;
        }

        #big-results-count {
          font-size: 2.4rem;
          font-weight: 500;
          margin-right: 5px;
        }

        .mobile #big-results-count {
          font-size: 2rem;
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
          --infiniteScrollerCellMaxWidth: var(
            --collectionBrowserCellMaxWidth,
            1fr
          );
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
      `,
    ];
  }
}
