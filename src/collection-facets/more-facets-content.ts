import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { when } from 'lit/directives/when.js';
import {
  Aggregation,
  Bucket,
  SearchServiceInterface,
  SearchParams,
  SearchType,
  AggregationSortType,
  FilterMap,
  PageType,
} from '@internetarchive/search-service';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import { msg } from '@lit/localize';
import {
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  FacetOption,
  facetTitles,
  suppressedCollections,
  valueFacetSort,
  defaultFacetSort,
  getDefaultSelectedFacets,
  FacetEventDetails,
  tvMoreFacetSort,
} from '../models';
import type {
  CollectionTitles,
  PageSpecifierParams,
  TVChannelAliases,
} from '../data-source/models';
import '@internetarchive/elements/ia-status-indicator/ia-status-indicator';
import './facets-template';
import {
  analyticsActions,
  analyticsCategories,
} from '../utils/analytics-events';
import './toggle-switch';
import './more-facets-pagination';
import '@internetarchive/ia-clearable-text-input';
import arrowLeftIcon from '../assets/img/icons/arrow-left';
import arrowRightIcon from '../assets/img/icons/arrow-right';
import { srOnlyStyle } from '../styles/sr-only';
import {
  mergeSelectedFacets,
  sortBucketsBySelectionState,
  updateSelectedFacetBucket,
} from '../utils/facet-utils';
import {
  MORE_FACETS__DEFAULT_PAGE_SIZE,
  MORE_FACETS__MAX_AGGREGATIONS,
} from './models';

/**
 * Threshold for switching from horizontal scroll to pagination.
 * If facet count >= this value, use pagination. Otherwise use horizontal scroll.
 */
const PAGINATION_THRESHOLD = 1000;

@customElement('more-facets-content')
export class MoreFacetsContent extends LitElement {
  @property({ type: String }) facetKey?: FacetOption;

  @property({ type: String }) query?: string;

  @property({ type: Array }) identifiers?: string[];

  @property({ type: Object }) filterMap?: FilterMap;

  @property({ type: Number }) searchType?: SearchType;

  @property({ type: Object }) pageSpecifierParams?: PageSpecifierParams;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  @property({ type: Object })
  tvChannelAliases?: TVChannelAliases;

  /**
   * Maximum number of facets to show per page within the modal.
   */
  @property({ type: Number }) facetsPerPage = MORE_FACETS__DEFAULT_PAGE_SIZE;

  /**
   * Whether we are waiting for facet data to load.
   * We begin with this set to true so that we show an initial loading indicator.
   */
  @property({ type: Boolean }) facetsLoading = true;

  /**
   * The set of pre-existing facet selections (including both selected & negated facets).
   */
  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Number }) sortedBy: AggregationSortType =
    AggregationSortType.COUNT;

  @property({ type: Boolean }) isTvSearch = false;

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object, attribute: false })
  analyticsHandler?: AnalyticsManagerInterface;

  /**
   * The full set of aggregations received from the search service
   */
  @state() private aggregations?: Record<string, Aggregation>;

  /**
   * A FacetGroup storing the full set of facet buckets to be shown on the dialog.
   */
  @state() private facetGroup?: FacetGroup;

  /**
   * An object holding any changes the patron has made to their facet selections
   * within the modal dialog but which they have not yet applied. These are
   * eventually merged into the existing `selectedFacets` when the patron applies
   * their changes, or discarded if they cancel/close the dialog.
   */
  @state() private unappliedFacetChanges: SelectedFacets =
    getDefaultSelectedFacets();

  /**
   * Text entered by the user to filter facet buckets.
   * Applied to bucket.key for case-insensitive matching.
   */
  @state() private filterText = '';

  /**
   * Current page number for pagination (when facet count >= PAGINATION_THRESHOLD).
   */
  @state() private pageNumber = 1;

  /**
   * Whether the component is narrow enough to warrant compact pagination.
   * Updated via a ResizeObserver-based container query approach.
   */
  @state() private isCompactView = false;

  /**
   * Whether the horizontal scroll is at the leftmost position.
   */
  @state() private atScrollStart = true;

  /**
   * Whether the horizontal scroll is at the rightmost position.
   */
  @state() private atScrollEnd = true;

  @query('ia-clearable-text-input')
  private filterInput!: HTMLElement;

  @query('.facets-content')
  private facetsContentEl!: HTMLElement;

  willUpdate(changed: PropertyValues): void {
    if (
      changed.has('aggregations') ||
      changed.has('facetsPerPage') ||
      changed.has('sortedBy') ||
      changed.has('selectedFacets') ||
      changed.has('unappliedFacetChanges')
    ) {
      // Convert the merged selected facets & aggregations into a facet group, and
      // store it for reuse across pages.
      this.facetGroup = this.mergedFacets;
    }

    // Reset to page 1 when filter text changes (only matters for pagination mode)
    if (changed.has('filterText')) {
      this.pageNumber = 1;
    }
  }

  updated(changed: PropertyValues): void {
    // If any of the search properties change, it triggers a facet fetch
    if (
      changed.has('facetKey') ||
      changed.has('query') ||
      changed.has('searchType') ||
      changed.has('filterMap')
    ) {
      this.facetsLoading = true;
      this.pageNumber = 1;
      this.sortedBy =
        this.searchType === SearchType.TV
          ? tvMoreFacetSort[this.facetKey as FacetOption]
          : defaultFacetSort[this.facetKey as FacetOption];

      this.updateSpecificFacets();
    }

    // Reset horizontal scroll when filter text changes (e.g., switching from
    // horizontal-scroll mode back to pagination mode)
    if (changed.has('filterText')) {
      const facetsContent = this.shadowRoot?.querySelector('.facets-content');
      if (facetsContent) {
        facetsContent.scrollLeft = 0;
      }
    }

    // Manage scroll listener for horizontal scroll mode arrows.
    // Only re-evaluate when properties that affect the displayed content change.
    if (
      changed.has('filterText') ||
      changed.has('aggregations') ||
      changed.has('facetKey') ||
      changed.has('sortedBy') ||
      changed.has('selectedFacets') ||
      changed.has('unappliedFacetChanges')
    ) {
      if (!this.usePagination) {
        this.attachScrollListener();
        // Refresh scroll state whenever content may have changed (e.g., filtering)
        requestAnimationFrame(() => this.updateScrollState());
      } else {
        this.removeScrollListener();
      }
    }
  }

  private resizeObserver?: ResizeObserver;

  firstUpdated(): void {
    this.setupEscapeListeners();
    this.setupCompactViewObserver();
    this.constrainToScrollContainer();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    this.resizeObserver?.disconnect();
    this.removeScrollListener();
    document.removeEventListener('keydown', this.escapeHandler);
  }

  private scrollHandler = () => this.updateScrollState();

  private scrollListenerAttached = false;

  private scrollListenerTarget?: HTMLElement;

  /**
   * Attaches a scroll event listener to the facets content element
   * to track horizontal scroll position for arrow button states.
   */
  private attachScrollListener(): void {
    if (this.scrollListenerAttached || !this.facetsContentEl) return;
    this.scrollListenerTarget = this.facetsContentEl;
    this.scrollListenerTarget.addEventListener('scroll', this.scrollHandler, {
      passive: true,
    });
    this.scrollListenerAttached = true;
    // Defer initial state check until after browser layout, so scrollWidth
    // reflects the actual content dimensions.
    requestAnimationFrame(() => this.updateScrollState());
  }

  private removeScrollListener(): void {
    if (!this.scrollListenerAttached || !this.scrollListenerTarget) return;
    this.scrollListenerTarget.removeEventListener('scroll', this.scrollHandler);
    this.scrollListenerTarget = undefined;
    this.scrollListenerAttached = false;
  }

  /**
   * Updates the scroll arrow disabled states based on current scroll position.
   */
  private updateScrollState(): void {
    const el = this.facetsContentEl;
    if (!el) return;
    this.atScrollStart = el.scrollLeft <= 0;
    this.atScrollEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  }

  /**
   * Calculates the width of one column step (column width + gap) based on
   * the CSS multi-column layout of the scroll container.
   */
  private getColumnStep(): number {
    const el = this.facetsContentEl;
    if (!el) return 0;

    const facetRows = el.querySelector('.facet-rows') as HTMLElement;
    const styles = facetRows
      ? getComputedStyle(facetRows)
      : getComputedStyle(el);

    const columnCount = parseInt(styles.columnCount, 10) || 3;
    const columnGap = parseInt(styles.columnGap, 10) || 15;

    // Column width = (visible width - total gaps) / column count
    // Column step = column width + gap = (visible width + gap) / column count
    return (el.clientWidth + columnGap) / columnCount;
  }

  /**
   * Snaps a scroll target to the nearest column boundary.
   */
  private snapToColumn(target: number): number {
    const step = this.getColumnStep();
    if (step <= 0) return target;
    return Math.round(target / step) * step;
  }

  /**
   * Scrolls the facet content left by approximately one page, snapping to
   * the nearest column boundary.
   */
  private onScrollLeft(): void {
    const el = this.facetsContentEl;
    if (!el) return;
    const rawTarget = el.scrollLeft - el.clientWidth;
    const snapped = Math.max(0, this.snapToColumn(rawTarget));
    el.scrollTo({ left: snapped, behavior: 'smooth' });
  }

  /**
   * Scrolls the facet content right by approximately one page, snapping to
   * the nearest column boundary.
   */
  private onScrollRight(): void {
    const el = this.facetsContentEl;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const rawTarget = el.scrollLeft + el.clientWidth;
    const snapped = Math.min(maxScroll, this.snapToColumn(rawTarget));
    el.scrollTo({ left: snapped, behavior: 'smooth' });
  }

  /**
   * Sets up a ResizeObserver to toggle compact pagination based on component width.
   */
  private setupCompactViewObserver(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const compact = entry.contentRect.width <= 560;
        if (this.isCompactView !== compact) this.isCompactView = compact;
      }
    });
    this.resizeObserver.observe(this);
  }

  /**
   * Constrains the section's max-height to fit within the nearest
   * scroll-container ancestor (e.g., the modal's content area).
   * This prevents the footer buttons from overflowing when the modal
   * has a smaller available height than calc(100vh - 16.5rem) assumes.
   */
  private constrainToScrollContainer(): void {
    requestAnimationFrame(() => {
      const section = this.shadowRoot?.querySelector(
        'section#more-facets',
      ) as HTMLElement;
      if (!section) return;

      // Walk up from the assigned slot to find the nearest overflow container
      let el = this.assignedSlot?.parentElement;
      while (el) {
        const cs = getComputedStyle(el);
        if (
          cs.overflowY === 'auto' ||
          cs.overflowY === 'scroll' ||
          cs.overflowY === 'hidden'
        ) {
          const containerBottom = el.getBoundingClientRect().bottom;
          const sectionTop = section.getBoundingClientRect().top;
          const available = containerBottom - sectionTop;
          if (available > 0 && available < section.offsetHeight) {
            section.style.maxHeight = `${available}px`;
          }
          return;
        }
        el = el.parentElement;
      }
    });
  }

  /**
   * Close more facets modal on Escape click
   */
  private escapeHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') this.modalManager?.closeModal();
  };

  private setupEscapeListeners() {
    if (this.modalManager) {
      document.addEventListener('keydown', this.escapeHandler);
    }
  }

  /**
   * Whether facet requests are for the search_results page type (either defaulted or explicitly).
   */
  private get isSearchResultsPage(): boolean {
    // Default page type is search_results when none is specified, so we check
    // for undefined as well.
    const pageType: PageType | undefined = this.pageSpecifierParams?.pageType;
    return pageType === undefined || pageType === 'search_results';
  }

  /**
   * Get specific facets data from search-service API based of currently query params
   * - this.aggregations - hold result of search service and being used for further processing.
   */
  async updateSpecificFacets(): Promise<void> {
    if (!this.facetKey) return; // Can't fetch facets if we don't know what type of facets we need!

    const trimmedQuery = this.query?.trim();
    if (!trimmedQuery && this.isSearchResultsPage) return; // The search page _requires_ a query

    const aggregations = {
      simpleParams: [this.facetKey],
    };
    const aggregationsSize = MORE_FACETS__MAX_AGGREGATIONS; // Only request the 10K highest-count facets

    const params: SearchParams = {
      ...this.pageSpecifierParams,
      query: trimmedQuery || '',
      identifiers: this.identifiers,
      filters: this.filterMap,
      aggregations,
      aggregationsSize,
      rows: 0, // todo - do we want server-side pagination with offset/page/limit flag?
    };

    try {
      const results = await this.searchService?.search(params, this.searchType);
      this.aggregations = results?.success?.response.aggregations;

      const collectionTitles = results?.success?.response?.collectionTitles;
      if (collectionTitles) {
        for (const [id, title] of Object.entries(collectionTitles)) {
          this.collectionTitles?.set(id, title);
        }
      }
    } finally {
      this.facetsLoading = false;
    }
  }

  /**
   * Combines the selected facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup | undefined {
    if (!this.facetKey || !this.selectedFacets) return undefined;

    const { selectedFacetGroup, aggregationFacetGroup } = this;

    // If we don't have any aggregations, then there is nothing to show yet
    if (!aggregationFacetGroup) return undefined;

    // Start with either the selected group if we have one, or the aggregate group otherwise
    const facetGroup = { ...(selectedFacetGroup ?? aggregationFacetGroup) };

    // Attach the counts to the selected buckets
    const bucketsWithCount =
      selectedFacetGroup?.buckets.map(bucket => {
        const selectedBucket = aggregationFacetGroup.buckets.find(
          b => b.key === bucket.key,
        );
        return selectedBucket
          ? {
              ...bucket,
              count: selectedBucket.count,
            }
          : bucket;
      }) ?? [];

    // Sort the buckets by selection state
    // We do this *prior* to considering unapplied selections, because we want the facets
    // to remain in position when they are selected/unselected, rather than re-sort themselves.
    sortBucketsBySelectionState(bucketsWithCount, this.sortedBy);

    // Append any additional buckets that were not selected
    aggregationFacetGroup.buckets.forEach(bucket => {
      const existingBucket = selectedFacetGroup?.buckets.find(
        b => b.key === bucket.key,
      );
      if (existingBucket) return;
      bucketsWithCount.push(bucket);
    });

    // Apply any unapplied selections that appear on this page
    const unappliedBuckets = this.unappliedFacetChanges[this.facetKey];
    for (const [index, bucket] of bucketsWithCount.entries()) {
      const unappliedBucket = unappliedBuckets?.[bucket.key];
      if (unappliedBucket) {
        bucketsWithCount[index] = { ...unappliedBucket };
      }
    }

    // For TV creator facets, uppercase the display text
    if (this.facetKey === 'creator' && this.isTvSearch) {
      bucketsWithCount.forEach(b => {
        b.displayText = (b.displayText ?? b.key)?.toLocaleUpperCase();

        const channelLabel = this.tvChannelAliases?.get(b.displayText);
        if (channelLabel && channelLabel !== b.displayText) {
          b.extraNote = `(${channelLabel})`;
        }
      });
    }

    facetGroup.buckets = bucketsWithCount;
    return facetGroup;
  }

  /**
   * Converts the selected facets for the current facet key to a `FacetGroup`,
   * which is easier to work with.
   */
  private get selectedFacetGroup(): FacetGroup | undefined {
    if (!this.selectedFacets || !this.facetKey) return undefined;

    const selectedFacetsForKey = this.selectedFacets[this.facetKey];
    if (!selectedFacetsForKey) return undefined;

    const facetGroupTitle = facetTitles[this.facetKey];

    const buckets: FacetBucket[] = Object.entries(selectedFacetsForKey).map(
      ([value, data]) => {
        const displayText =
          (this.facetKey === 'collection'
            ? this.collectionTitles?.get(value)
            : undefined) ?? value;
        return {
          displayText,
          key: value,
          count: data?.count,
          state: data?.state,
        };
      },
    );

    return {
      title: facetGroupTitle,
      key: this.facetKey,
      buckets,
    };
  }

  /**
   * Converts the raw `aggregations` for the current facet key to a `FacetGroup`,
   * which is easier to work with.
   */
  private get aggregationFacetGroup(): FacetGroup | undefined {
    if (!this.aggregations || !this.facetKey) return undefined;

    const currentAggregation = this.aggregations[this.facetKey];
    if (!currentAggregation) return undefined;

    const facetGroupTitle = facetTitles[this.facetKey];

    // Order the facets according to the current sort option
    let sortedBuckets = currentAggregation.getSortedBuckets(
      this.sortedBy,
    ) as Bucket[];

    if (this.facetKey === 'collection') {
      // we are not showing fav- collections or certain deemphasized collections in facets
      sortedBuckets = sortedBuckets?.filter(bucket => {
        const bucketKey = bucket?.key?.toString();
        return (
          !suppressedCollections[bucketKey] && !bucketKey?.startsWith('fav-')
        );
      });
    }

    // Construct the array of facet buckets from the aggregation buckets,
    // using collection display titles where available.
    const facetBuckets: FacetBucket[] = sortedBuckets.map(bucket => {
      const bucketKeyStr = `${bucket.key}`;
      const displayText =
        (this.facetKey === 'collection'
          ? this.collectionTitles?.get(bucketKeyStr)
          : undefined) ?? bucketKeyStr;
      return {
        displayText,
        key: `${bucketKeyStr}`,
        count: bucket.doc_count,
        state: 'none',
      };
    });

    // For collection facets sorted alphabetically, re-sort by display title
    // instead of the raw identifier used by getSortedBuckets.
    if (
      this.facetKey === 'collection' &&
      this.sortedBy === AggregationSortType.ALPHABETICAL
    ) {
      facetBuckets.sort((a, b) =>
        (a.displayText ?? a.key).localeCompare(b.displayText ?? b.key),
      );
    }

    return {
      title: facetGroupTitle,
      key: this.facetKey,
      buckets: facetBuckets,
    };
  }

  /**
   * Returns the facet group with buckets filtered by the current filter text.
   * Filters are applied to the full bucket list before pagination.
   */
  private get filteredFacetGroup(): FacetGroup | undefined {
    const { facetGroup, filterText } = this;
    if (!facetGroup) return undefined;

    // If no filter text, return the full group
    if (!filterText.trim()) {
      return facetGroup;
    }

    // Filter buckets by the text the user actually sees.
    // For collections, match against the displayed collection title (not the identifier).
    // For other facet types, match against the bucket key (which is also the display text).
    const lowerFilter = filterText.toLowerCase().trim();
    const filteredBuckets = facetGroup.buckets.filter(bucket => {
      const displayText = this.collectionTitles?.get(bucket.key) ?? bucket.key;
      return displayText.toLowerCase().includes(lowerFilter);
    });

    return {
      ...facetGroup,
      buckets: filteredBuckets,
    };
  }

  /**
   * Determines whether to use pagination based on the number of filtered facets.
   * Returns true if facet count >= PAGINATION_THRESHOLD, false otherwise.
   */
  private get usePagination(): boolean {
    const facetCount = this.filteredFacetGroup?.buckets.length ?? 0;
    return facetCount >= PAGINATION_THRESHOLD;
  }

  /**
   * Returns the facet group for the current page.
   * If using pagination (>= 1000 facets), slices to show only the current page.
   * Otherwise, returns all facets for horizontal scrolling.
   */
  private get facetGroupForCurrentPage(): FacetGroup | undefined {
    const filteredGroup = this.filteredFacetGroup;
    if (!filteredGroup) return undefined;

    // If facet count is below threshold, show all facets with horizontal scroll
    if (!this.usePagination) {
      return filteredGroup;
    }

    // Otherwise, use pagination - slice to current page
    const startIndex = (this.pageNumber - 1) * this.facetsPerPage;
    const endIndex = startIndex + this.facetsPerPage;
    const slicedBuckets = filteredGroup.buckets.slice(startIndex, endIndex);

    return {
      ...filteredGroup,
      buckets: slicedBuckets,
    };
  }

  private get moreFacetsTemplate(): TemplateResult {
    const facetGroup = this.facetGroupForCurrentPage;

    // Show empty state if filtering returned no results
    if (
      this.filterText.trim() &&
      (!facetGroup || facetGroup.buckets.length === 0)
    ) {
      return this.emptyFilterResultsTemplate;
    }

    return html`
      <facets-template
        .facetGroup=${facetGroup}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${(e: CustomEvent<FacetEventDetails>) => {
          if (this.facetKey) {
            this.unappliedFacetChanges = updateSelectedFacetBucket(
              this.unappliedFacetChanges,
              this.facetKey,
              e.detail.bucket,
            );
          }
        }}
      ></facets-template>
    `;
  }

  private get loaderTemplate(): TemplateResult {
    return html`
      <ia-status-indicator
        class="facets-loader"
        mode="loading"
      ></ia-status-indicator>
    `;
  }

  private get emptyFilterResultsTemplate(): TemplateResult {
    return html`
      <div class="empty-results">
        <p>${msg('No matching values found.')}</p>
        <p class="hint">${msg('Try a different search term.')}</p>
      </div>
    `;
  }

  /**
   * Number of pages for pagination (only used when facet count >= PAGINATION_THRESHOLD).
   */
  private get paginationSize(): number {
    const filteredBuckets = this.filteredFacetGroup?.buckets ?? [];
    return Math.ceil(filteredBuckets.length / this.facetsPerPage);
  }

  /**
   * Template for pagination component.
   */
  private get facetsPaginationTemplate() {
    return html`<more-facets-pagination
      .size=${this.paginationSize}
      .currentPage=${this.pageNumber}
      .compact=${this.isCompactView}
      @pageNumberClicked=${this.pageNumberClicked}
    ></more-facets-pagination>`;
  }

  private get footerTemplate() {
    return html`
      ${when(this.usePagination, () => this.facetsPaginationTemplate)}
      <div class="footer">
        <button class="btn btn-cancel" type="button" @click=${this.cancelClick}>
          Cancel
        </button>
        <button
          class="btn btn-submit"
          type="button"
          @click=${this.applySearchFacetsClicked}
        >
          Apply filters
        </button>
      </div>
    `;
  }

  private sortFacetAggregation(facetSortType: AggregationSortType) {
    this.sortedBy = facetSortType;
    this.dispatchEvent(
      new CustomEvent('sortedFacets', { detail: this.sortedBy }),
    );
  }

  /**
   * Handler for filter input changes. Updates the filter text and triggers re-render.
   */
  private handleFilterInput(e: Event): void {
    const input = e.target as HTMLElement & { value: string };
    this.filterText = input.value;
  }

  /**
   * Handler for when the filter input is cleared via the clear button.
   */
  private handleFilterClear(): void {
    this.filterText = '';
  }

  /**
   * Handler for pagination page number clicks.
   * Only used when facet count >= PAGINATION_THRESHOLD.
   */
  private pageNumberClicked(e: CustomEvent<{ page: number }>) {
    this.pageNumber = e.detail.page;

    // Track page navigation in analytics
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.moreFacetsPageChange,
      label: `${this.pageNumber}`,
    });

    this.dispatchEvent(
      new CustomEvent('pageChanged', {
        detail: this.pageNumber,
        bubbles: true,
        composed: true,
      }),
    );
  }

  private get modalHeaderTemplate(): TemplateResult {
    const facetSort =
      this.sortedBy ?? defaultFacetSort[this.facetKey as FacetOption];
    const defaultSwitchSide =
      facetSort === AggregationSortType.COUNT ? 'left' : 'right';

    return html`<span class="sr-only">${msg('More facets for:')}</span>
      <span class="title"> ${this.facetGroup?.title} </span>
      <span class="header-controls">
        <span class="sort-controls">
          <label class="sort-label">${msg('Sort by:')}</label>
          ${this.facetKey
            ? html`<toggle-switch
                class="sort-toggle"
                leftValue=${AggregationSortType.COUNT}
                leftLabel="Count"
                rightValue=${valueFacetSort[this.facetKey]}
                .rightLabel=${this.facetGroup?.title}
                side=${defaultSwitchSide}
                @change=${(e: CustomEvent<string>) => {
                  this.sortFacetAggregation(
                    Number(e.detail) as AggregationSortType,
                  );
                }}
              ></toggle-switch>`
            : nothing}
        </span>

        <span class="filter-controls">
          <label class="filter-label">${msg('Filter by:')}</label>
          <ia-clearable-text-input
            class="filter-input"
            .value=${this.filterText}
            .placeholder=${msg('Search...')}
            .screenReaderLabel=${msg('Filter facets')}
            .clearButtonScreenReaderLabel=${msg('Clear filter')}
            @input=${this.handleFilterInput}
            @clear=${this.handleFilterClear}
          ></ia-clearable-text-input>
        </span>
      </span>`;
  }

  private get horizontalScrollTemplate(): TemplateResult {
    const contentClasses = classMap({
      'facets-content': true,
      'horizontal-scroll-mode': true,
    });
    const showArrows = !this.atScrollStart || !this.atScrollEnd;

    return html`<div class="scroll-nav-container">
      ${when(
        showArrows,
        () =>
          html`<button
            class="scroll-arrow scroll-left"
            @click=${this.onScrollLeft}
            ?disabled=${this.atScrollStart}
            aria-label="Scroll facets left"
          >
            ${arrowLeftIcon}
          </button>`,
      )}
      <div class=${contentClasses}>
        <div class="facets-horizontal-container">
          ${this.moreFacetsTemplate}
        </div>
      </div>
      ${when(
        showArrows,
        () =>
          html`<button
            class="scroll-arrow scroll-right"
            @click=${this.onScrollRight}
            ?disabled=${this.atScrollEnd}
            aria-label="Scroll facets right"
          >
            ${arrowRightIcon}
          </button>`,
      )}
    </div>`;
  }

  render() {
    const sectionClasses = classMap({
      'pagination-mode': this.usePagination,
      'horizontal-scroll-mode': !this.usePagination,
    });
    const contentClasses = classMap({
      'facets-content': true,
      'pagination-mode': this.usePagination,
    });

    return html`
      ${this.facetsLoading
        ? this.loaderTemplate
        : html`
            <section id="more-facets" class=${sectionClasses}>
              <div class="header-content">${this.modalHeaderTemplate}</div>
              ${this.usePagination
                ? html`<div class=${contentClasses}>
                    ${this.moreFacetsTemplate}
                  </div>`
                : this.horizontalScrollTemplate}
              ${this.footerTemplate}
            </section>
          `}
    `;
  }

  private applySearchFacetsClicked() {
    const mergedSelections = mergeSelectedFacets(
      this.selectedFacets,
      this.unappliedFacetChanges,
    );

    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: mergedSelections,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);

    // Reset the unapplied changes back to default, now that they have been applied
    this.unappliedFacetChanges = getDefaultSelectedFacets();

    // Reset filter text
    this.filterText = '';

    this.modalManager?.closeModal();
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: `${analyticsActions.applyMoreFacetsModal}`,
      label: `${this.facetKey}`,
    });
  }

  private cancelClick() {
    // Reset the unapplied changes back to default
    this.unappliedFacetChanges = getDefaultSelectedFacets();

    // Reset filter text
    this.filterText = '';

    this.modalManager?.closeModal();
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.closeMoreFacetsModal,
      label: `${this.facetKey}`,
    });
  }

  static get styles(): CSSResultGroup {
    const modalSubmitButton = css`var(--primaryButtonBGColor, #194880)`;

    return [
      srOnlyStyle,
      css`
        section#more-facets {
          display: flex;
          flex-direction: column;
          max-height: calc(100vh - 16.5rem);
          padding: 10px;
          box-sizing: border-box;
          --facetsColumnCount: 3;
        }

        /* Both modes need a height constraint for proper column flow */
        section#more-facets.horizontal-scroll-mode,
        section#more-facets.pagination-mode {
          --facetsMaxHeight: 280px;
        }
        .header-content {
          flex-shrink: 0;
          position: relative;
          z-index: 1;
          background: #fff;
        }

        .header-content .title {
          display: block;
          text-align: left;
          font-size: 1.8rem;
          padding: 0 10px;
          font-weight: bold;
        }

        .header-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px 20px;
          padding: 0 10px 8px;
        }

        .sort-controls {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          gap: 5px;
        }

        .sort-label {
          font-size: 1.3rem;
        }

        .sort-toggle {
          font-weight: normal;
        }

        .filter-controls {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
        }

        .filter-label {
          font-size: 1.3rem;
        }

        .filter-input {
          --input-height: 2.5rem;
          --input-font-size: 1.3rem;
          --input-border-radius: 4px;
          --input-padding: 4px 8px;
          --input-focused-border-color: ${modalSubmitButton};
          width: 150px;
          margin-left: 5px;
        }

        .empty-results {
          text-align: center;
          padding: 40px 20px;
          color: #666;
        }

        .empty-results .hint {
          margin-top: 10px;
        }

        .facets-content {
          font-size: 1.2rem;
          flex: 1 1 auto;
          min-height: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 10px;
          /* Force scrollbar to always be visible */
          scrollbar-width: thin; /* Firefox */
          scrollbar-color: #888 #f1f1f1; /* Firefox - thumb and track colors */
        }

        /* Horizontal scroll mode: horizontal scrolling only */
        .facets-content.horizontal-scroll-mode {
          overflow-x: auto;
          overflow-y: hidden;
        }

        /* Webkit browsers scrollbar styling - always visible */
        .facets-content::-webkit-scrollbar {
          width: 12px; /* Vertical scrollbar width */
          height: 12px; /* Horizontal scrollbar height */
        }

        .facets-content::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 6px;
        }

        .facets-content::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 6px;
          min-height: 30px; /* Ensure thumb is always visible when scrolling is possible */
        }

        .facets-content::-webkit-scrollbar-thumb:hover {
          background: #555;
        }

        /* Force corner to match track color */
        .facets-content::-webkit-scrollbar-corner {
          background: #f1f1f1;
        }

        .facets-horizontal-container {
          display: inline-block;
          min-width: 100%;
          /* Allow natural width expansion based on content */
          width: fit-content;
        }

        .scroll-nav-container {
          display: flex;
          align-items: center;
          flex: 1 1 auto;
          min-height: 0;
        }

        .scroll-nav-container .facets-content {
          flex: 1 1 auto;
          min-width: 0;
        }

        .scroll-arrow {
          background: none;
          border: none;
          cursor: pointer;
          padding: 5px;
          flex-shrink: 0;
        }

        .scroll-arrow svg {
          height: 14px;
          fill: #2c2c2c;
        }

        .scroll-arrow:disabled {
          opacity: 0.3;
          cursor: default;
        }
        .facets-loader {
          --icon-width: 70px;
          margin-bottom: 20px;
          display: block;
          margin-left: auto;
          margin-right: auto;
        }
        .btn {
          border: none;
          padding: 10px;
          margin-bottom: 10px;
          width: auto;
          border-radius: 4px;
          cursor: pointer;
          font-family: inherit;
        }
        .btn-cancel {
          background-color: #2c2c2c;
          color: white;
        }
        .btn-submit {
          background-color: ${modalSubmitButton};
          color: white;
        }
        more-facets-pagination {
          flex-shrink: 0;
        }

        .footer {
          text-align: center;
          margin-top: 10px;
          flex-shrink: 0;
        }

        @media (max-width: 560px) {
          section#more-facets.horizontal-scroll-mode,
          section#more-facets.pagination-mode {
            --facetsColumnCount: 1; /* Single column on mobile */
            --facetsMaxHeight: none; /* Remove fixed height for vertical scrolling */
          }
          /* On mobile, always use vertical scrolling regardless of mode */
          .facets-content,
          .facets-content.horizontal-scroll-mode {
            overflow-y: auto;
            overflow-x: hidden;
          }
          .scroll-nav-container {
            display: contents; /* Remove wrapper from layout so section flex-column works */
          }
          .scroll-arrow {
            display: none;
          }
          .filter-input {
            width: 120px;
            --input-font-size: 1.2rem;
          }
        }
      `,
    ];
  }
}
