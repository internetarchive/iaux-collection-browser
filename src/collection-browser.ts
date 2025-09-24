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
import { msg } from '@lit/localize';

import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type {
  InfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from '@internetarchive/infinite-scroller';
import {
  CollectionExtraInfo,
  PageElementName,
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
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { FeatureFeedbackServiceInterface } from '@internetarchive/feature-feedback';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';
import {
  SelectedFacets,
  SortField,
  CollectionBrowserContext,
  getDefaultSelectedFacets,
  TileModel,
  CollectionDisplayMode,
  FacetEventDetails,
  sortOptionFromAPIString,
  SORT_OPTIONS,
  defaultProfileElementSorts,
  FacetLoadStrategy,
  defaultFacetDisplayOrder,
  tvFacetDisplayOrder,
  TvClipFilterType,
  TileBlurOverrideState,
  defaultSortBarFields,
  favoritesSortBarFields,
  tvSortBarFields,
} from './models';
import {
  RestorationStateHandlerInterface,
  RestorationStateHandler,
  RestorationState,
  RestorationStatePersistOptions,
} from './restoration-state-handler';
import { CollectionBrowserDataSource } from './data-source/collection-browser-data-source';
import type {
  CollectionBrowserQueryState,
  CollectionBrowserSearchInterface,
} from './data-source/collection-browser-query-state';
import { FACETLESS_PAGE_ELEMENTS } from './data-source/models';
import type { CollectionFacets } from './collection-facets';
import type { CollectionBrowserDataSourceInterface } from './data-source/collection-browser-data-source-interface';
import {
  analyticsActions,
  analyticsCategories,
} from './utils/analytics-events';
import chevronIcon from './assets/img/icons/chevron';
import { srOnlyStyle } from './styles/sr-only';
import { sha1 } from './utils/sha1';
import { log } from './utils/log';
import type { PlaceholderType } from './empty-placeholder';
import type { ManageBar } from './manage/manage-bar';
import type { SmartFacetBar } from './collection-facets/smart-facets/smart-facet-bar';

import './empty-placeholder';
import './tiles/tile-dispatcher';
import './tiles/collection-browser-loading-tile';
import './sort-filter-bar/sort-filter-bar';
import './manage/manage-bar';
import './collection-facets';
import './circular-activity-indicator';
import './collection-facets/smart-facets/smart-facet-bar';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements
    InfiniteScrollerCellProviderInterface,
    SharedResizeObserverResizeHandlerInterface,
    CollectionBrowserSearchInterface
{
  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl: string = 'https://archive.org';

  @property({ type: Object }) searchService?: SearchServiceInterface;

  /**
   * Which backend should be targeted by searches (e.g., metadata or FTS)
   */
  @property({ type: Number }) searchType: SearchType = SearchType.DEFAULT;

  /**
   * The identifier of the collection that searches should be performed within
   */
  @property({ type: String }) withinCollection?: string;

  /**
   * The identifier (e.g., @person) of the user whose profile is being searched within
   */
  @property({ type: String }) withinProfile?: string;

  /**
   * Which section of the profile page searches are for (e.g., uploads, reviews, ...)
   */
  @property({ type: String }) profileElement?: PageElementName;

  /**
   * The base query to use for all searches, updated to match the current user query.
   */
  @property({ type: String }) baseQuery?: string;

  /**
   * Which mode to display result tiles in (grid, extended list, or compact list)
   */
  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: String }) selectedSort: SortField = SortField.default;

  @property({ type: String }) selectedTitleFilter: string | null = null;

  @property({ type: String }) selectedCreatorFilter: string | null = null;

  @property({ type: String }) tvClipFilter: TvClipFilterType = 'all';

  @property({ type: String }) sortDirection: SortDirection | null = null;

  @property({ type: String }) defaultSortField: Exclude<
    SortField,
    SortField.default
  > = SortField.relevance;

  @property({ type: String }) defaultSortDirection: SortDirection | null = null;

  @property({ type: Number }) pageSize = 50;

  @property({ type: Number }) currentPage?: number;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  /**
   * Set of filters to be applied internally to searches, but not included in URL params or
   * visibly selected facets. Use when this instance of collection browser is being shown
   * in a filtered context, such as a single-mediatype tab, but the corresponding filters
   * should not be exposed/changeable within that context.
   */
  @property({ type: Object }) internalFilters?: SelectedFacets;

  @property({ type: Boolean }) showSmartFacetBar = false;

  /**
   * Whether to show the date picker (above the facets)
   */
  @property({ type: Boolean }) showHistogramDatePicker = false;

  /**
   * Whether placeholder views should be suppressed. If true, searches that produce an
   * error or empty result set will simply show a blank results view instead of a placeholder.
   */
  @property({ type: Boolean }) suppressPlaceholders = false;

  /**
   * Whether the result count text should be suppressed.
   * If true, no "X Results" message will be shown.
   */
  @property({ type: Boolean }) suppressResultCount = false;

  /**
   * Whether the scrolling result view should be suppressed entirely.
   * If true, no infinite scroller (and thus no result tiles) will be rendered.
   */
  @property({ type: Boolean }) suppressResultTiles = false;

  /**
   * Whether to suppress persistence of the query to the URL.
   * If true, the `query` param will not be added to the URL or updated on query changes.
   */
  @property({ type: Boolean }) suppressURLQuery = false;

  /**
   * Whether to suppress display of the sort bar.
   * If true, the entire sort bar (incl. display modes) will be omitted from rendering.
   */
  @property({ type: Boolean }) suppressSortBar = false;

  /**
   * Whether to suppress showing the display mode options in the sort bar.
   * If true, those options will be omitted (though the rest of the sort bar may still render).
   */
  @property({ type: Boolean }) suppressDisplayModes = false;

  /**
   * Whether to suppress the display of the `mediatype` facet group, e.g., because this instance
   * of collection browser is being shown in a filtered single-mediatype context.
   */
  @property({ type: Boolean }) suppressMediatypeFacets = false;

  /**
   * What strategy to use for when/whether to load facet data for a search.
   *
   * Defaults to `eager`, always loading facets immediately alongside search results.
   *
   * To eliminate facets that are never seen, this can be reduced to `lazy-mobile`, which
   * will delay loading facets in the mobile view until the "Filters" accordion is opened.
   * Facets are still loaded eagerly when viewing the desktop layout.
   *
   * To further reduce facet requests for patrons who do not need to use them, this can be
   * again reduced to `opt-in`, which will also require desktop users to explicitly request
   * that they be loaded (in addition to the lazy mobile behavior described above).
   *
   * To entirely suppress facets from being loaded, this may be set to `off`.
   */
  @property({ type: String }) facetLoadStrategy: FacetLoadStrategy = 'eager';

  @property({ type: Boolean }) facetPaneVisible = false;

  @property({ type: Boolean }) clearResultsOnEmptyQuery = false;

  @property({ type: String }) collectionPagePath: string = '/details/';

  /** describes where this component is being used */
  @property({ type: String, reflect: true }) searchContext: string =
    analyticsCategories.default;

  @property({ type: String }) pageContext: CollectionBrowserContext = 'search';

  @property({ type: Object })
  restorationStateHandler: RestorationStateHandlerInterface =
    new RestorationStateHandler({
      context: this.pageContext,
    });

  @property({ type: Number }) mobileBreakpoint = 600;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Object }) modalManager?: ModalManagerInterface = undefined;

  @property({ type: Object })
  featureFeedbackService?: FeatureFeedbackServiceInterface;

  @property({ type: Object }) recaptchaManager?: RecaptchaManagerInterface;

  /**
   * Whether we are representing a TV collection, needing slightly different tile handling.
   */
  @property({ type: Boolean }) isTVCollection = false;

  /**
   * If item management UI active
   */
  @property({ type: Boolean }) isManageView = false;

  @property({ type: String }) manageViewLabel = 'Select items to remove';

  /** Whether to replace the default sort options with a slot for customization (default: false) */
  @property({ type: Boolean }) enableSortOptionsSlot = false;

  /** Whether to display a smart results carousel above the full results */
  @property({ type: Boolean, reflect: true }) showSmartResults = false;

  @property({ type: String }) resultsHeader?: string;

  /**
   * The maximum number of pages we will load when a privileged user clicks
   * the "Manage" button on the search page. Limited to 15 pages.
   */
  @property({ type: Number }) maxPagesToManage = 15;

  /**
   * The results per page so we can paginate.
   *
   * This allows us to start in the middle of the search results and
   * fetch data before or after the current page. If we don't have a key
   * for the previous/next page, we'll fetch the next/previous page to populate it
   */
  @property({ type: Object }) dataSource: CollectionBrowserDataSourceInterface =
    new CollectionBrowserDataSource(this, this.pageSize);

  /**
   * The page that the consumer wants to load.
   */
  initialPageNumber = 1;

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

  @state() private totalResults?: number;

  @state() private mobileView = false;

  /**
   * Any temporarily overridden `on`/`off` state for the user's tile blurring preference if they
   * have chosen to override it, or `no-override` if they have not.
   */
  @state() private tileBlurOverrideState: TileBlurOverrideState = 'no-override';

  @state() private collapsibleFacetsVisible = false;

  @state() private contentWidth?: number;

  @state() private placeholderType: PlaceholderType = null;

  @query('#content-container') private contentContainer!: HTMLDivElement;

  @query('#left-column') private leftColumn?: HTMLDivElement;

  @query('collection-facets') private collectionFacets?: CollectionFacets;

  @query('manage-bar') private manageBar?: ManageBar;

  @query('smart-facet-bar') private smartFacetBar?: SmartFacetBar;

  @property({ type: Object, attribute: false })
  analyticsHandler?: AnalyticsManagerInterface;

  /** Whether layout size analytics have been sent already. */
  private layoutSizeAnalyticsSent = false;

  /**
   * When we're animated scrolling to the page, we don't want to fetch
   * all of the pages as it scrolls so this lets us know if we're scrolling
   */
  private isScrollingToCell = false;

  /**
   * When page width resizes from desktop to mobile, set true to
   * disable expand/collapse transition when loading.
   */
  private isResizeToMobile = false;

  /**
   * Flag indicating that a new data source is currently being installed.
   * During the install, any URL persistence operation should replace the current entry
   * instead of creating a new one.
   */
  private dataSourceInstallInProgress = false;

  private leftColIntersectionObserver?: IntersectionObserver;

  private facetsIntersectionObserver?: IntersectionObserver;

  private placeholderCellTemplate = html`<collection-browser-loading-tile></collection-browser-loading-tile>`;

  constructor() {
    super();
    this.addController(this.dataSource);
  }

  private tileModelAtCellIndex(index: number): TileModel | undefined {
    const model = this.dataSource.getTileModelAt(index);
    /**
     * If we encounter a model we don't have yet and we're not in the middle of an
     * automated scroll, fetch the page and just return undefined.
     * The datasource will be updated once the page is loaded and the cell will be rendered.
     *
     * We disable it during the automated scroll since we don't want to fetch pages for intervening cells the
     * user may never see.
     */
    if (!model && !this.isScrollingToCell && this.dataSource.queryInitialized) {
      const pageNumber = Math.floor(index / this.pageSize) + 1;
      this.dataSource.fetchPage(pageNumber);
    }
    return model;
  }

  // this is the total number of tiles we expect if
  // the data returned is a full page worth
  // this is useful for putting in placeholders for the expected number of tiles
  private get estimatedTileCount(): number {
    return this.pagesToRender * this.pageSize;
  }

  @query('infinite-scroller')
  private infiniteScroller?: InfiniteScroller;

  private sessionIdGenPromise?: Promise<string>;

  /**
   * Returns a promise resolving to a unique string that persists for the current browser session.
   * Used in generating unique IDs for search requests, so that multiple requests coming from the
   * same browser session can be identified.
   */
  async getSessionId(): Promise<string> {
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
    } catch {
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
   * Sets the state for whether the initial set of search results is loading in.
   */
  setSearchResultsLoading(loading: boolean): void {
    this.searchResultsLoading = loading;
  }

  /**
   * Sets the state for whether facet data is loading in
   */
  setFacetsLoading(loading: boolean): void {
    this.facetsLoading = loading;
  }

  /**
   * Sets the total number of results to be displayed for the current search
   */
  setTotalResultCount(totalResults: number): void {
    this.totalResults = totalResults;
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

  willUpdate(): void {
    this.setPlaceholderType();
  }

  render() {
    return html`
      ${this.showSmartFacetBar && this.placeholderType === null
        ? html`<smart-facet-bar
            .query=${this.baseQuery}
            .aggregations=${this.dataSource.aggregations}
            .selectedFacets=${this.selectedFacets}
            .collectionTitles=${this.dataSource.collectionTitles}
            .filterToggleActive=${this.facetPaneVisible}
            @facetsChanged=${this.facetsChanged}
            @filtersToggled=${() => {
              this.facetPaneVisible = !this.facetPaneVisible;
              this.emitFacetPaneVisibilityChanged();
            }}
          ></smart-facet-bar>`
        : nothing}

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

  /**
   * Determines what type of placeholder content should be shown instead of result tiles, if applicable.
   * The placeholders indicate states where we have no results to show, which could be the result of:
   *  - No query is set (on the search page)
   *  - No results were returned for the most recent search
   *  - The collection being searched within has no viewable items
   *  - An error occurred on the most recent search attempt
   */
  private setPlaceholderType() {
    const hasQuery = !!this.baseQuery?.trim();
    const isCollection = !!this.withinCollection;
    const isProfile = !!this.withinProfile;
    const noResults =
      !this.searchResultsLoading &&
      (this.dataSource.size === 0 || !this.searchService);

    this.placeholderType = null;
    if (this.suppressPlaceholders) return;

    if (!hasQuery && !isCollection && !isProfile) {
      this.placeholderType = 'empty-query';
    } else if (noResults) {
      // Within a collection, no query + no results means the collection simply has no viewable items.
      // Otherwise, we must have a user query that produced 0 results.
      this.placeholderType =
        !hasQuery && isCollection ? 'empty-collection' : 'no-results';
    }

    if (this.dataSource.queryErrorMessage) {
      this.placeholderType =
        !hasQuery && isCollection ? 'collection-error' : 'query-error';
    }
  }

  /**
   * Template for the placeholder content to show when no results are available.
   */
  private get emptyPlaceholderTemplate() {
    return html`
      <empty-placeholder
        .placeholderType=${this.placeholderType}
        ?isMobileView=${this.mobileView}
        ?isCollection=${!!this.withinCollection}
        .detailMessage=${this.dataSource.queryErrorMessage ?? ''}
        .baseNavigationUrl=${this.baseNavigationUrl}
      ></empty-placeholder>
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
        ${this.facetTopViewSlot} ${this.resultsCountTemplate}
        <div id="facets-header-container">${this.mobileFacetsTemplate}</div>
      </div>
    `;
  }

  /**
   * Template for the desktop version of the left column, displaying the facets sidebar.
   */
  private get desktopLeftColumnTemplate(): TemplateResult {
    return html`
      <div
        id="left-column"
        class="column"
        ?hidden=${this.showSmartFacetBar && !this.facetPaneVisible}
      >
        ${this.facetTopViewSlot}
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
   * Slot which is placed at top of the facets area for user-profile page
   * - mainly used to render userlists
   */
  private get facetTopViewSlot(): TemplateResult {
    return html`<div id="facet-top-view">
      <slot name="facet-top-slot"></slot>
    </div>`;
  }

  /**
   * Template for the "X Results" count at the top of the search results.
   * Changes to the "Searching..." label if the search results are still loading.
   */
  private get resultsCountTemplate(): TemplateResult | typeof nothing {
    if (this.suppressResultCount) return nothing;

    const shouldShowSearching =
      this.searchResultsLoading || this.totalResults === undefined;
    const resultsCount = this.totalResults?.toLocaleString();
    const resultsLabel = this.totalResults === 1 ? 'Result' : 'Results';

    // Added data-testid for Playwright testing
    return html`
      <div id="results-total" data-testid="results-total">
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
    const rightColumnClasses = classMap({
      column: true,
      'full-width': this.showSmartFacetBar && !this.facetPaneVisible,
      'smart-results-spacing': !!this.showSmartResults,
    });

    return html`
      <div id="right-column" class=${rightColumnClasses}>
        ${this.showSmartResults
          ? html`<slot name="smart-results"></slot>`
          : nothing}
        <section id="results">
          ${this.showSmartResults
            ? html`<h2 class="results-section-heading">
                ${this.resultsHeader ?? msg('All results')}
              </h2>`
            : nothing}
          <div id="cb-top-view">
            <slot name="cb-top-slot"></slot>
          </div>
          ${this.isManageView
            ? this.manageBarTemplate
            : this.sortFilterBarTemplate}
          <slot name="cb-results"></slot>
          ${this.displayMode === `list-compact` && this.totalResults
            ? this.listHeaderTemplate
            : nothing}
          ${this.suppressResultTiles ? nothing : this.infiniteScrollerTemplate}
        </section>
      </div>
    `;
  }

  /**
   * Template for the infinite scroller widget that contains the result tiles.
   */
  private get infiniteScrollerTemplate() {
    return html`<infinite-scroller
      class=${this.infiniteScrollerClasses}
      itemCount=${this.placeholderType ? 0 : nothing}
      ariaLandmarkLabel="Search results"
      .cellProvider=${this}
      .placeholderCellTemplate=${this.placeholderCellTemplate}
      @scrollThresholdReached=${this.scrollThresholdReached}
      @visibleCellsChanged=${this.visibleCellsChanged}
      >${this.displayMode === 'grid'
        ? html`<slot name="result-last-tile" slot="result-last-tile"></slot>`
        : nothing}
    </infinite-scroller>`;
  }

  /**
   * Produces a `classMap` indicating which classes the infinite scroller should have
   * given the current display mode & placeholder case.
   */
  private get infiniteScrollerClasses() {
    return classMap({
      [this.displayMode ?? '']: !!this.displayMode,
      hidden: !!this.placeholderType,
    });
  }

  /**
   * Template for the sort & filtering bar that appears atop the search results.
   */
  private get sortFilterBarTemplate(): TemplateResult | typeof nothing {
    if (this.suppressSortBar) return nothing;

    // Determine the set of sortable fields that should be shown in the sort bar
    let defaultViewSort = SortField.weeklyview;
    let defaultDateSort = SortField.date;
    let displayedSortFields = defaultSortBarFields;

    if (this.withinCollection?.startsWith('fav-')) {
      // When viewing a fav- collection, we include the Date Favorited option and show
      // it as the default in the date dropdown.
      defaultDateSort = SortField.datefavorited;
      displayedSortFields = favoritesSortBarFields;
    } else if (!this.withinCollection && this.searchType === SearchType.TV) {
      // When viewing TV search results, we default the views dropdown to All-time Views
      // and exclude several of the usual date sort options.
      defaultViewSort = SortField.alltimeview;
      displayedSortFields = tvSortBarFields;
    }

    // We only show relevance sort if a search query is defined
    displayedSortFields.relevance = this.isRelevanceSortAvailable;

    return html`
      <sort-filter-bar
        .defaultSortField=${this.defaultSortField}
        .defaultSortDirection=${this.defaultSortDirection}
        .defaultViewSort=${defaultViewSort}
        .defaultDateSort=${defaultDateSort}
        .selectedSort=${this.selectedSort}
        .sortDirection=${this.sortDirection}
        .displayedSortFields=${displayedSortFields}
        .displayMode=${this.displayMode}
        .selectedTitleFilter=${this.selectedTitleFilter}
        .selectedCreatorFilter=${this.selectedCreatorFilter}
        .prefixFilterCountMap=${this.dataSource.prefixFilterCountMap}
        .resizeObserver=${this.resizeObserver}
        .enableSortOptionsSlot=${this.enableSortOptionsSlot}
        .suppressDisplayModes=${this.suppressDisplayModes}
        @sortChanged=${this.userChangedSort}
        @displayModeChanged=${this.displayModeChanged}
        @titleLetterChanged=${this.titleLetterSelected}
        @creatorLetterChanged=${this.creatorLetterSelected}
      >
        ${this.tileBlurCheckboxTemplate}
        <slot name="sort-options-left" slot="sort-options-left"></slot>
        <slot name="sort-options" slot="sort-options"></slot>
        <slot name="sort-options-right" slot="sort-options-right"></slot>
      </sort-filter-bar>
    `;
  }

  /**
   * Template for the Blurring toggle for admins to enable/disable blurring of
   * sensitive content in result tiles.
   */
  private get tileBlurCheckboxTemplate(): TemplateResult | typeof nothing {
    // Only show the checkbox for @archive.org users
    if (!this.dataSource.sessionContext?.is_archive_user) return nothing;

    return html`
      <label
        id="tile-blur-label"
        for="tile-blur-check"
        slot="sort-options-right"
      >
        ${msg('Blurring')}
        <input
          id="tile-blur-check"
          type="checkbox"
          ?checked=${!this.shouldSuppressTileBlurring}
          @change=${this.tileBlurCheckboxChanged}
        />
      </label>
    `;
  }

  /**
   * Template for the manage bar UI that appears atop the search results when we are
   * showing the management view. This generally replaces the sort bar when present.
   */
  private get manageBarTemplate(): TemplateResult {
    const manageViewModalMsg =
      this.profileElement === 'uploads'
        ? 'Note: it may take a few minutes for these items to stop appearing in your uploads list.'
        : nothing;

    return html`
      <manage-bar
        .label=${this.manageViewLabel}
        .modalManager=${this.modalManager}
        .selectedItems=${this.dataSource.checkedTileModels}
        .manageViewModalMsg=${manageViewModalMsg}
        showSelectAll
        showUnselectAll
        ?showItemManageButton=${this.pageContext === 'search'}
        ?removeAllowed=${this.dataSource.checkedTileModels.length !== 0}
        @removeItems=${this.handleRemoveItems}
        @manageItems=${this.handleManageItems}
        @selectAll=${() => this.dataSource.checkAllTiles()}
        @unselectAll=${() => this.dataSource.uncheckAllTiles()}
        @cancel=${() => {
          this.isManageView = false;
          this.dataSource.uncheckAllTiles();
          if (this.searchResultsLoading) this.dataSource.resetPages();
        }}
      ></manage-bar>
    `;
  }

  /**
   * Handler for when the user requests to remove all checked items via the manage bar.
   * Emits an `itemRemovalRequested` event with all checked tile models.
   */
  private handleRemoveItems(): void {
    this.dispatchEvent(
      new CustomEvent<{ items: string[] }>('itemRemovalRequested', {
        detail: {
          items: this.dataSource.checkedTileModels.map(model => {
            // For favorited searches, we attach a search: prefix to differentiate it from an item
            const searchPrefix = model?.mediatype === 'search' ? 'search:' : '';
            const identifier = model?.identifier ?? '';
            return `${searchPrefix}${identifier}`;
          }),
        },
      }),
    );
  }

  /**
   * Handler when user request to bulk edit from /search/ page
   */
  private handleManageItems(): void {
    this.dispatchEvent(
      new CustomEvent<{ items: string[] }>('itemManagerRequested', {
        detail: {
          items: this.dataSource.checkedTileModels.map(model =>
            model?.identifier ? model.identifier : '',
          ),
        },
      }),
    );
  }

  refreshSmartFacets(): void {
    this.smartFacetBar?.refresh();
  }

  /**
   * Handler to show processing modal while removing item
   */
  showRemoveItemsProcessingModal(): void {
    this.manageBar?.showRemoveItemsProcessingModal();
  }

  /**
   * Handler to show error modal when item removal failed
   */
  showRemoveItemsErrorModal(): void {
    this.manageBar?.showRemoveItemsErrorModal();
  }

  /**
   * Removes all tile models that are currently checked & adjusts the paging
   * of the data source to account for any new gaps in the data.
   */
  removeCheckedTiles(): void {
    this.dataSource.removeCheckedTiles();
  }

  /**
   * Handler for when the tile blurring checkbox state is toggled
   */
  private tileBlurCheckboxChanged(e: Event): void {
    const { checked } = e.target as HTMLInputElement;
    this.tileBlurOverrideState = checked ? 'on' : 'off';
    this.infiniteScroller?.refreshAllVisibleCells();
  }

  /**
   * Whether result tiles should have the default blurring of sensitive content suppressed.
   * First considers any override specified by the user, falling back to the setting in
   * user preferences if not overridden.
   */
  private get shouldSuppressTileBlurring(): boolean {
    if (this.tileBlurOverrideState !== 'no-override') {
      // User wants to override their preference.
      // Return true if they want blurring turned off, or false otherwise.
      return this.tileBlurOverrideState === 'off';
    }

    // Not overriding, so use the preference from session context
    const { sessionContext } = this.dataSource;
    const userPrefs = sessionContext?.pps_relevant_user_preferences;
    const blurringPref = userPrefs?.display__blur_moderated_content;

    // Only suppress blurring if the preference is disabled.
    // If enabled or missing, tile blurring remains on.
    return blurringPref === 'off';
  }

  /**
   * Handler for when the user changes the selected sort option or direction.
   */
  private userChangedSort(
    e: CustomEvent<{
      selectedSort: SortField;
      sortDirection: SortDirection | null;
    }>,
  ) {
    const { selectedSort, sortDirection } = e.detail;
    this.selectedSort = selectedSort;
    this.sortDirection = sortDirection;

    if ((this.currentPage ?? 1) > 1) {
      this.goToPage(1);
    }
    this.currentPage = 1;
  }

  /**
   * Fires an analytics event for sorting changes.
   * @param prevSortDirection Which sort direction was previously set.
   */
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

  /**
   * Handler for when the selected sort option is updated, whether by the user
   * themselves or programmatically.
   */
  private selectedSortChanged(): void {
    // Lazy-load the alphabet counts for title/creator sort bar as needed
    this.dataSource.updatePrefixFiltersForCurrentSort();
  }

  /**
   * An object representing the current sort field & direction.
   */
  get sortParam(): SortParam | null {
    const sortOption = SORT_OPTIONS[this.selectedSort];
    if (!sortOption?.handledBySearchService) {
      return null;
    }

    // If the sort option specified in the URL is unrecognized, we just use it as-is
    const urlSortParam = new URL(window.location.href).searchParams.get('sort');
    const sortField =
      sortOption.searchServiceKey ?? urlSortParam?.replace(/^-/, '');

    // If the sort direction is still null at this point, then we assume ascending
    // (i.e., it was unrecognized and had no directional flag)
    if (!this.sortDirection) this.sortDirection = 'asc';

    if (!sortField) return null;
    return { field: sortField, direction: this.sortDirection };
  }

  /**
   * An object representing the default sort field & direction, if none are explicitly set.
   */
  get defaultSortParam(): SortParam | null {
    const direction = this.defaultSortDirection ?? 'asc';
    const field = SORT_OPTIONS[this.defaultSortField].searchServiceKey;
    if (!field) return null;

    return { field, direction };
  }

  /**
   * Handler for when the display mode option is changed (grid/list/compact-list views).
   */
  private displayModeChanged(
    e: CustomEvent<{ displayMode?: CollectionDisplayMode }>,
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
    prevSelectedLetter: string | null,
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
    e: CustomEvent<{ selectedLetter: string | null }>,
  ): void {
    this.selectedCreatorFilter = null;
    this.selectedTitleFilter = e.detail.selectedLetter;
  }

  /**
   * Handler for changes to which letter is selected in the creator alphabet bar.
   */
  private creatorLetterSelected(
    e: CustomEvent<{ selectedLetter: string | null }>,
  ): void {
    this.selectedTitleFilter = null;
    this.selectedCreatorFilter = e.detail.selectedLetter;
  }

  /**
   * The full template for how the facets should be structured in mobile view,
   * including the collapsible container (with header) and the facets themselves.
   */
  private get mobileFacetsTemplate(): TemplateResult | typeof nothing {
    if (FACETLESS_PAGE_ELEMENTS.includes(this.profileElement!)) return nothing;

    const toggleFacetsVisible = (e: Event) => {
      const target = e.target as HTMLDetailsElement;
      this.isResizeToMobile = false;
      this.collapsibleFacetsVisible = target.open;

      this.analyticsHandler?.sendEvent({
        category: this.searchContext,
        action: analyticsActions.mobileFacetsToggled,
        label: target.open ? 'open' : 'closed',
      });
    };

    return html`
      <details id="mobile-filter-collapse" @toggle=${toggleFacetsVisible}>
        <summary>
          <span class="collapser-icon">${chevronIcon}</span>
          <h2>${msg('Filters')}</h2>
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
    if (FACETLESS_PAGE_ELEMENTS.includes(this.profileElement!)) return nothing;
    if (this.facetLoadStrategy === 'off') {
      return html`
        <p class="facets-message">
          ${msg('Facets are temporarily unavailable.')}
        </p>
      `;
    }

    // We switch to TV facet ordering & date picker if we are in a TV collection or showing TV search results
    const shouldUseTvInterface =
      this.isTVCollection ||
      (!this.withinCollection && this.searchType === SearchType.TV);
    const facetDisplayOrder = shouldUseTvInterface
      ? tvFacetDisplayOrder
      : defaultFacetDisplayOrder;

    const facets = html`
      <collection-facets
        .collectionPagePath=${this.collectionPagePath}
        .parentCollections=${this.dataSource.parentCollections}
        .pageSpecifierParams=${this.dataSource.pageSpecifierParams}
        .searchService=${this.searchService}
        .featureFeedbackService=${this.featureFeedbackService}
        .recaptchaManager=${this.recaptchaManager}
        .resizeObserver=${this.resizeObserver}
        .searchType=${this.searchType}
        .aggregations=${this.dataSource.aggregations}
        .histogramAggregation=${this.dataSource.histogramAggregation}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .selectedFacets=${this.selectedFacets}
        .baseNavigationUrl=${this.baseNavigationUrl}
        .collectionTitles=${this.dataSource.collectionTitles}
        .tvChannelAliases=${this.dataSource.tvChannelAliases}
        .showHistogramDatePicker=${this.showHistogramDatePicker}
        .allowExpandingDatePicker=${!this.mobileView}
        .allowDatePickerMonths=${shouldUseTvInterface}
        .contentWidth=${this.contentWidth}
        .query=${this.baseQuery}
        .filterMap=${this.dataSource.filterMap}
        .isManageView=${this.isManageView}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        .facetDisplayOrder=${facetDisplayOrder}
        .isTvSearch=${shouldUseTvInterface}
        ?collapsableFacets=${this.mobileView}
        ?facetsLoading=${this.facetsLoading}
        ?histogramAggregationLoading=${this.facetsLoading}
        ?suppressMediatypeFacets=${this.suppressMediatypeFacets}
        @facetClick=${this.facetClickHandler}
        @facetsChanged=${this.facetsChanged}
        @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
      >
      </collection-facets>
    `;

    // If we are using one of the opt-in facet load strategies, we may need to wrap the
    // desktop view facets in a <details> widget so that patrons can opt into loading them.
    // In the `opt-in-or-login` case, we only do this if they are not logged in.
    const showDesktopOptInWidget =
      this.facetLoadStrategy === 'opt-in' ||
      (this.facetLoadStrategy === 'opt-in-or-login' && !this.loggedIn);

    if (showDesktopOptInWidget && !this.mobileView) {
      return html`
        <details
          class="desktop-facets-dropdown"
          @toggle=${(e: Event) => {
            const target = e.target as HTMLDetailsElement;
            this.collapsibleFacetsVisible = target.open;
          }}
        >
          <summary>
            <span class="collapser-icon">${chevronIcon}</span>
            <h2>${msg('Filters')}</h2>
          </summary>
          ${facets}
        </details>
      `;
    }
    // Otherwise, just render the facets component bare
    return facets;
  }

  /**
   * The HTML template for the "Clear all filters" button, or `nothing` if no
   * filters are currently active.
   *
   * @param mobile Whether to style/shorten the button for mobile view
   */
  private clearFiltersBtnTemplate(
    mobile: boolean,
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

  /**
   * Template for the table header content that appears atop the compact list view.
   */
  private get listHeaderTemplate() {
    return html`
      <div id="list-header">
        <tile-dispatcher
          .tileDisplayMode=${'list-header'}
          .resizeObserver=${this.resizeObserver}
          .sortParam=${this.sortParam}
          .defaultSortParam=${this.defaultSortParam}
          .mobileBreakpoint=${this.mobileBreakpoint}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.shouldSuppressTileBlurring}
        >
        </tile-dispatcher>
      </div>
    `;
  }

  /**
   * Handler for when the date picker's date range is changed.
   */
  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>,
  ) {
    const { minDate, maxDate } = e.detail;
    [this.minSelectedDate, this.maxSelectedDate] = [minDate, maxDate];

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action: analyticsActions.histogramChanged,
      label: this.dateRangeQueryClause,
    });
  }

  /**
   * The Lucene query corresponding to the current date range.
   */
  private get dateRangeQueryClause() {
    if (!this.minSelectedDate || !this.maxSelectedDate) {
      return undefined;
    }

    return `year:[${this.minSelectedDate} TO ${this.maxSelectedDate}]`;
  }

  /**
   * Emits an event indicating a change in whether the manage mode is shown.
   */
  private emitManageModeChangedEvent(): void {
    this.dispatchEvent(
      new CustomEvent<boolean>('manageModeChanged', {
        detail: this.isManageView,
      }),
    );
  }

  /**
   * Installs a new data source component and associated query state parameters into
   * this component, causing it to efficiently update its views to represent the
   * newly-provided data. In this way, one can reuse a single instance of
   * <collection-browser> to handle multiple different sets of search results on
   * a single page, each set of results being loaded & updated by its own data
   * source.
   *
   * @param dataSource The data source component containing (or prepared to fetch)
   * the tile data to be displayed.
   * @param queryState The new query-related state that this component should
   * represent, such as the search query, sort option, and any filters applied.
   */
  async installDataSourceAndQueryState(
    dataSource: CollectionBrowserDataSourceInterface,
    queryState: CollectionBrowserQueryState,
  ): Promise<void> {
    log('Installing data source & query state in CB:', dataSource, queryState);
    if (this.dataSource) this.removeController(this.dataSource);
    this.dataSource = dataSource;
    this.addController(this.dataSource);

    this.baseQuery = queryState.baseQuery;
    this.profileElement = queryState.profileElement;
    this.searchType = queryState.searchType;
    this.selectedFacets =
      queryState.selectedFacets ?? getDefaultSelectedFacets();
    this.internalFilters = queryState.internalFilters;
    this.minSelectedDate = queryState.minSelectedDate;
    this.maxSelectedDate = queryState.maxSelectedDate;
    this.selectedSort = queryState.selectedSort ?? SortField.default;
    this.sortDirection = queryState.sortDirection;
    this.selectedTitleFilter = queryState.selectedTitleFilter;
    this.selectedCreatorFilter = queryState.selectedCreatorFilter;
    this.tvClipFilter = queryState.tvClipFilter ?? 'all';

    this.pagesToRender = this.initialPageNumber;

    // We set this flag during the update to prevent the URL state persistence
    // from creating an unwanted extra history entry.
    this.dataSourceInstallInProgress = true;
    this.requestUpdate();
    await this.updateComplete;
    this.dataSourceInstallInProgress = false;

    if (!this.searchResultsLoading) {
      this.setTotalResultCount(this.dataSource.totalResults);
      this.setTileCount(this.dataSource.size);
    }

    this.refreshVisibleResults();
  }

  firstUpdated(): void {
    this.restoreState();
    this.setInitialSize();
  }

  /**
   * Determines the initial size of the content container and whether or not
   * the mobile layout should be used.
   */
  setInitialSize(): void {
    this.contentWidth = this.contentContainer.getBoundingClientRect().width;
    this.mobileView =
      this.contentWidth > 0 && this.contentWidth < this.mobileBreakpoint;
    this.sendLayoutSizeAnalytics();
  }

  /**
   * Fires an analytics event indicating which type of layout was rendered:
   * mobile or desktop.
   */
  private sendLayoutSizeAnalytics(): void {
    if (this.analyticsHandler) {
      this.layoutSizeAnalyticsSent = true;
      this.analyticsHandler.sendEvent({
        category: this.searchContext,
        action: this.mobileView
          ? analyticsActions.loadMobileView
          : analyticsActions.loadDesktopView,
      });
    }
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

    if (changed.has('analyticsHandler') && !this.layoutSizeAnalyticsSent) {
      this.sendLayoutSizeAnalytics();
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

    if (changed.has('profileElement')) {
      this.applyDefaultProfileSort();
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
      changed.has('withinCollection') ||
      changed.has('withinProfile') ||
      changed.has('profileElement')
    ) {
      this.dataSource.refreshLetterCounts();
    }

    if (changed.has('selectedSort') || changed.has('sortDirection')) {
      const prevSortDirection = changed.get('sortDirection') as SortDirection;
      this.sendSortByAnalytics(prevSortDirection);
      this.selectedSortChanged();
    }

    if (changed.has('selectedTitleFilter')) {
      this.sendFilterByTitleAnalytics(
        changed.get('selectedTitleFilter') as string,
      );
    }
    if (changed.has('selectedCreatorFilter')) {
      this.sendFilterByCreatorAnalytics(
        changed.get('selectedCreatorFilter') as string,
      );
    }

    this.updateFacetReadiness();

    if (
      changed.has('baseQuery') ||
      changed.has('searchType') ||
      changed.has('selectedTitleFilter') ||
      changed.has('selectedCreatorFilter') ||
      changed.has('minSelectedDate') ||
      changed.has('maxSelectedDate') ||
      changed.has('selectedSort') ||
      changed.has('sortDirection') ||
      changed.has('selectedFacets') ||
      changed.has('searchService') ||
      changed.has('withinCollection') ||
      changed.has('withinProfile') ||
      changed.has('profileElement')
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
      if (!this.dataSource.endOfDataReached && this.infiniteScroller) {
        this.infiniteScroller.itemCount = this.estimatedTileCount;
      }
    }

    if (changed.has('isManageView')) {
      if (this.isManageView) {
        this.displayMode = 'grid';
        this.fetchManageableSearchResults();
      } else if (this.pageContext === 'search') this.infiniteScroller?.reload();

      this.infiniteScroller?.refreshAllVisibleCells();

      // Only emit change event if changing b/w true & false, not on initial value set.
      if (changed.get('isManageView') !== undefined) {
        this.emitManageModeChangedEvent();
      }
    }

    if (changed.has('resizeObserver')) {
      const oldObserver = changed.get(
        'resizeObserver',
      ) as SharedResizeObserverInterface;
      if (oldObserver) this.disconnectResizeObserver(oldObserver);
      this.setupResizeObserver();
    }

    this.ensureAvailableTilesDisplayed();
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    this.setupStateRestorationObserver();
    this.setupResizeObserver();
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
   * Ensures that if we have new results from the data source that are not yet
   * displayed in the infinite scroller, that they are immediately reflected
   * in the tile count.
   */
  private ensureAvailableTilesDisplayed(): void {
    if (
      this.infiniteScroller &&
      this.infiniteScroller.itemCount < this.dataSource.size
    ) {
      this.setTileCount(
        this.dataSource.endOfDataReached
          ? this.dataSource.size
          : this.estimatedTileCount,
      );
    }
  }

  /**
   * Updates the data source with the current state of facet readiness for loading,
   * so that they will begin to load in at the appropriate time according to the
   * current facet loading strategy.
   */
  private updateFacetReadiness(): void {
    // There are two ways to opt into facet production:
    //  (1) have the facets dropdown open, or
    //  (2) if using the `opt-in-or-login` strategy, be logged into an account
    const optedIn =
      this.collapsibleFacetsVisible ||
      (this.facetLoadStrategy === 'opt-in-or-login' && this.loggedIn);

    // In desktop view, we are always ready to load facets *unless* we are using one of the
    // `opt-in` strategies and have not opted in (whether by login or UI interaction).
    const usingOptInStrategy = ['opt-in', 'opt-in-or-login'].includes(
      this.facetLoadStrategy,
    );
    const desktopFacetsReady =
      !this.mobileView && (!usingOptInStrategy || optedIn);

    // In the mobile view, facets are considered ready provided we have opted in (whether by
    // login or UI interaction).
    const mobileFacetsReady = this.mobileView && optedIn;

    this.dataSource.handleFacetReadinessChange(
      desktopFacetsReady || mobileFacetsReady,
    );
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
      '#left-column-scroll-sentinel',
    );
    if (leftColumnSentinel) {
      this.leftColIntersectionObserver = new IntersectionObserver(
        this.updateLeftColumnHeight,
        {
          threshold: [...Array(201).keys()].map(n => n / 200), // Threshold every 0.5%
        },
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
      '#facets-scroll-sentinel',
    );
    if (facetsSentinel) {
      this.facetsIntersectionObserver = new IntersectionObserver(
        this.updateFacetFadeOut,
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
      const columnHeight = window.innerHeight - (clientTop ?? 0);
      const cssHeightValue =
        clientTop === 0
          ? null
          : // Subtract off the column's top padding so that it doesn't overflow
            `calc(${columnHeight}px - var(--leftColumnPaddingTop, 2rem))`;

      this.leftColumn?.style?.setProperty('height', cssHeightValue);
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

  /**
   * Emits a `baseQueryChanged` event indicating an update to the search query.
   */
  private emitBaseQueryChanged() {
    this.dispatchEvent(
      new CustomEvent<{ baseQuery?: string }>('baseQueryChanged', {
        detail: {
          baseQuery: this.baseQuery,
        },
      }),
    );
  }

  /**
   * Emits a `searchTypeChanged` event indicating an update to the search type
   * (e.g., metadata vs. full-text).
   */
  private emitSearchTypeChanged() {
    this.dispatchEvent(
      new CustomEvent<SearchType>('searchTypeChanged', {
        detail: this.searchType,
      }),
    );
  }

  /**
   * Emits a `facetPaneVisibilityChanged` event indicating that the facet pane has
   * been toggled open or closed.
   */
  private emitFacetPaneVisibilityChanged(): void {
    this.dispatchEvent(
      new CustomEvent<boolean>('facetPaneVisibilityChanged', {
        detail: this.facetPaneVisible,
      }),
    );
  }

  /**
   * Emits a `queryStateChanged` event indicating that one or more of this component's
   * properties have changed in a way that could affect the set of search results.
   */
  emitQueryStateChanged() {
    this.dispatchEvent(
      new CustomEvent<CollectionBrowserQueryState>('queryStateChanged', {
        detail: {
          baseQuery: this.baseQuery,
          withinCollection: this.withinCollection,
          withinProfile: this.withinProfile,
          profileElement: this.profileElement,
          searchType: this.searchType,
          selectedFacets: this.selectedFacets,
          internalFilters: this.internalFilters,
          minSelectedDate: this.minSelectedDate,
          maxSelectedDate: this.maxSelectedDate,
          selectedSort: this.selectedSort,
          sortDirection: this.sortDirection,
          selectedTitleFilter: this.selectedTitleFilter,
          selectedCreatorFilter: this.selectedCreatorFilter,
          tvClipFilter: this.tvClipFilter,
        },
      }),
    );
  }

  /**
   * Emits an `emptyResults` event indicating that we have received an empty result set
   * for the most recent query.
   */
  emitEmptyResults() {
    this.dispatchEvent(new Event('emptyResults'));
  }

  private disconnectResizeObserver(
    resizeObserver: SharedResizeObserverInterface,
  ) {
    resizeObserver.removeObserver({
      target: this.contentContainer,
      handler: this,
    });
  }

  private setupResizeObserver() {
    if (!this.resizeObserver || !this.contentContainer) return;
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
    e: CustomEvent<{ visibleCellIndices: number[] }>,
  ) {
    if (this.isScrollingToCell) return;
    const { visibleCellIndices } = e.detail;
    if (visibleCellIndices.length === 0) return;

    // For page determination, do not count more than a single page of visible cells,
    // since otherwise patrons using very tall screens will be treated as one page
    // further than they actually are.
    const lastIndexWithinCurrentPage =
      Math.min(this.pageSize, visibleCellIndices.length) - 1;
    const lastVisibleCellIndex = visibleCellIndices[lastIndexWithinCurrentPage];
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
   * A Promise which, after each query change, resolves once the fetches for the initial
   * search have completed. Waits for *both* the hits and aggregations fetches to finish.
   *
   * Ensure you await this component's `updateComplete` promise before awaiting this
   * one, to ensure you do not await an obsolete promise from the previous update.
   */
  get initialSearchComplete(): Promise<boolean> {
    return this.dataSource.initialSearchComplete;
  }

  /**
   * Handler for whenever the component's properties change in a way that may require
   * fetching new results.
   */
  private async handleQueryChange() {
    // only reset if the query has actually changed
    if (
      !this.searchService ||
      this.dataSource.pageFetchQueryKey === this.previousQueryKey
    ) {
      return;
    }

    // If the new state prevents us from updating the search results, don't reset
    if (this.baseQuery && !this.dataSource.canPerformSearch) {
      return;
    }

    this.previousQueryKey = this.dataSource.pageFetchQueryKey;

    this.totalResults = undefined;
    this.pagesToRender =
      this.initialPageNumber === 1
        ? 2 // First two pages are batched into one request when starting from page 1
        : this.initialPageNumber;

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
  }

  private setupStateRestorationObserver() {
    if (!this.boundNavigationHandler) {
      this.boundNavigationHandler = this.historyNavigationHandler.bind(this);
    }
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
    if (!this.suppressURLQuery) this.baseQuery = restorationState.baseQuery;
    this.currentPage = restorationState.currentPage ?? 1;
    this.minSelectedDate = restorationState.minSelectedDate;
    this.maxSelectedDate = restorationState.maxSelectedDate;
    this.tvClipFilter = restorationState.tvClipFilter ?? 'all';
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
      baseQuery: this.suppressURLQuery ? undefined : this.baseQuery,
      currentPage: this.currentPage,
      titleQuery: this.titleQuery,
      creatorQuery: this.creatorQuery,
      minSelectedDate: this.minSelectedDate,
      maxSelectedDate: this.maxSelectedDate,
      selectedTitleFilter: this.selectedTitleFilter ?? undefined,
      selectedCreatorFilter: this.selectedCreatorFilter ?? undefined,
      tvClipFilter: this.tvClipFilter,
    };
    const persistOptions: RestorationStatePersistOptions = {
      forceReplace: this.dataSourceInstallInProgress,
      persistMetadataSearchType: this.isTVCollection,
    };
    this.restorationStateHandler.persistState(restorationState, persistOptions);
  }

  /**
   * Emits a `searchResultsLoadingChanged` event indicating that our loading state has
   * changed (either we have started loading new results, or we have finished loading them).
   */
  private emitSearchResultsLoadingChanged(): void {
    this.dispatchEvent(
      new CustomEvent<{ loading: boolean }>('searchResultsLoadingChanged', {
        detail: {
          loading: this.searchResultsLoading,
        },
      }),
    );
  }

  /**
   * Handler for when the set of selected facets changes.
   */
  facetsChanged(e: CustomEvent<SelectedFacets>) {
    this.selectedFacets = e.detail;
  }

  /**
   * Handler for when any facet is selected/unselected/hidden/unhidden.
   * Fires analytics indicating the type of facet event that took place.
   */
  facetClickHandler({
    detail: { facetType, bucket, negative },
  }: CustomEvent<FacetEventDetails>): void {
    let action: analyticsActions;
    if (negative) {
      action =
        bucket.state !== 'none'
          ? analyticsActions.facetNegativeSelected
          : analyticsActions.facetNegativeDeselected;
    } else {
      action =
        bucket.state !== 'none'
          ? analyticsActions.facetSelected
          : analyticsActions.facetDeselected;
    }

    this.analyticsHandler?.sendEvent({
      category: this.searchContext,
      action,
      label: facetType,
    });
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
          this.infiniteScroller?.refreshAllVisibleCells();
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
   * Sets the total number of tiles displayed in the infinite scroller.
   */
  setTileCount(count: number): void {
    if (this.infiniteScroller) {
      this.infiniteScroller.itemCount = count;
    }
  }

  /**
   * Applies any default sort option for the current collection, by checking
   * for one in the collection's metadata. If none is found, defaults to sorting
   * descending by:
   *  - Date Favorited for fav-* collections
   *  - Weekly views for all other collections
   */
  applyDefaultCollectionSort(collectionInfo?: CollectionExtraInfo): void {
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
   * Applies the default sort option for the current profile element
   */
  applyDefaultProfileSort(): void {
    if (this.profileElement) {
      const defaultSortField = defaultProfileElementSorts[this.profileElement];
      this.defaultSortField = defaultSortField ?? SortField.weeklyview;
    } else {
      this.defaultSortField = SortField.weeklyview;
    }

    this.defaultSortDirection = 'desc';
  }

  /**
   * This is useful for determining whether we need to reload the scroller.
   *
   * When the fetch completes, we need to reload the scroller if the cells for that
   * page are visible, but if the page is not currenlty visible, we don't need to reload
   */
  get currentVisiblePageNumbers(): number[] {
    const visibleCells = this.infiniteScroller?.getVisibleCellIndices() ?? [];
    const visiblePages = new Set<number>();
    visibleCells.forEach(cellIndex => {
      const visiblePage = Math.floor(cellIndex / this.pageSize) + 1;
      visiblePages.add(visiblePage);
    });
    return Array.from(visiblePages);
  }

  /**
   * Refreshes all visible result cells in the infinite scroller.
   */
  refreshVisibleResults(): void {
    this.infiniteScroller?.refreshAllVisibleCells();
  }

  /**
   * Callback when a result is selected
   */
  resultSelected(event: CustomEvent<TileModel>): void {
    if (this.isManageView) {
      // Checked/unchecked state change -- rerender to ensure it propagates
      // this.mapDataSource(model => ({ ...model }));
      const cellIndex = this.dataSource.indexOf(event.detail);
      if (cellIndex >= 0) this.infiniteScroller?.refreshCell(cellIndex);

      this.requestUpdate();
    }

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
        .collectionTitles=${this.dataSource.collectionTitles}
        .sortParam=${this.sortParam}
        .defaultSortParam=${this.defaultSortParam}
        .creatorFilter=${this.selectedCreatorFilter}
        .mobileBreakpoint=${this.mobileBreakpoint}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.shouldSuppressTileBlurring}
        .isManageView=${this.isManageView}
        ?showTvClips=${this.isTVCollection || this.searchType === SearchType.TV}
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
    if (!this.dataSource.endOfDataReached && this.dataSource.queryInitialized) {
      this.pagesToRender += 1;
      this.dataSource.fetchPage(this.pagesToRender);
    }
  }

  /**
   * Fetches search results for privileged users when in manage view.
   *
   * This method:
   * 1. Checks if we're in search context and either haven't loaded results yet, or have already finished loading with > 100 total results
   * 2. Resets the datasource pagination state
   * 3. Fetches first page with limit based on maxPagesToManage threshold
   * 4. Reloads the infinite scroller to display new results
   */
  private fetchManageableSearchResults(): void {
    const hasNotLoadedInitialResults = !this.dataSource.totalResults;
    const hasLoadedWithMoreResultsAvailable =
      !this.searchResultsLoading && this.dataSource.totalResults > 100;

    if (
      this.pageContext === 'search' &&
      (hasNotLoadedInitialResults || hasLoadedWithMoreResultsAvailable)
    ) {
      this.dataSource.resetPages();
      this.dataSource.fetchPage(1, this.maxPagesToManage);
      this.infiniteScroller?.reload();
    }
  }

  static get styles() {
    return [
      srOnlyStyle,
      css`
        :host {
          display: block;
          --leftColumnWidth: 18rem;
          --leftColumnPaddingTop: 2rem;
          --leftColumnPaddingRight: 2.5rem;
        }

        #facet-top-view {
          display: flex;
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

        #right-column {
          flex: 1;
          position: relative;
          min-height: 90vh;
          border-right: 1px solid rgb(232, 232, 232);
          margin-top: var(--rightColumnMarginTop, 0);
          padding-top: 2rem;
          background: #fff;
        }

        #left-column:not([hidden]) + #right-column {
          border-left: 1px solid rgb(232, 232, 232);
        }

        #right-column.smart-results-spacing {
          padding-top: 0.5rem;
          border-right: none;
          background: transparent;
          min-width: 0;
        }

        #results {
          background: #fff;
          padding-left: 1rem;
          padding-right: 1rem;
        }

        #right-column.smart-results-spacing #results {
          border-radius: 10px 10px 0px 0px;
          padding-top: 0.5rem;
          margin-top: 1rem;
        }

        .mobile #right-column {
          border-left: none;
        }

        .mobile #results {
          padding: 5px 5px 0;
        }

        #left-column {
          width: var(--leftColumnWidth, 18rem);
          /* Prevents Safari from shrinking col at first draw */
          min-width: var(--leftColumnWidth, 18rem);
          padding-top: var(--leftColumnPaddingTop, 2rem);
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

        .facets-message {
          font-size: 1.4rem;
        }

        .desktop-facets-dropdown > summary {
          cursor: pointer;
          list-style: none;
        }

        .desktop-facets-dropdown h2 {
          display: inline-block;
          margin: 0;
          font-size: 1.6rem;
        }

        .desktop-facets-dropdown[open] > summary {
          margin-bottom: 10px;
        }

        .desktop-facets-dropdown[open] svg {
          transform: rotate(90deg);
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
          clear: both;
        }

        .desktop #facets-header-container {
          flex-wrap: wrap;
        }

        .mobile #left-column {
          width: 100%;
          min-width: 0;
          padding: 0;
          border: 0;
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

        .results-section-heading {
          margin: 0.5rem 0.3rem;
          font-size: 2rem;
          line-height: 25px;
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

        #tile-blur-label {
          display: flex;
          align-items: center;
          column-gap: 5px;
        }

        #tile-blur-check {
          margin: 0 5px 0 0;
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
          --infiniteScrollerCellMinHeight: 45px; /* override infinite scroller component */
          --infiniteScrollerCellMaxHeight: 56px;
          --infiniteScrollerRowGap: 10px;
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
