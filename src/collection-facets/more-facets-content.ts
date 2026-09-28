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
import { msg, str } from '@lit/localize';
import {
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  FacetOption,
  facetTitles,
  facetPluralTitles,
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
import '@internetarchive/ia-clearable-text-input';
import './more-facets-scroller';
import type { MoreFacetsScroller } from './more-facets-scroller';
import {
  analyticsActions,
  analyticsCategories,
} from '../utils/analytics-events';
import './toggle-switch';
import { srOnlyStyle } from '../styles/sr-only';
import {
  mergeSelectedFacets,
  sortBucketsBySelectionState,
  updateSelectedFacetBucket,
} from '../utils/facet-utils';
import { normalizeFilterText } from '../utils/normalize-filter-text';
import { MORE_FACETS__MAX_AGGREGATIONS } from './models';

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
   * Text the patron has entered to narrow down the facet values shown.
   */
  @state() private filterText = '';

  /**
   * The buckets from `facetGroup` that match `filterText`, in display order.
   * Derived in `willUpdate`.
   */
  private filteredBuckets: FacetBucket[] = [];

  /**
   * Each bucket's display text in the normalized form that filtering compares
   * against, keyed by bucket key. Filled lazily so that each value is only
   * normalized once, however many times the filter text changes.
   */
  private filterKeys = new Map<string, string>();

  @query('more-facets-scroller')
  private scroller?: MoreFacetsScroller;

  willUpdate(changed: PropertyValues): void {
    if (changed.has('aggregations')) {
      this.filterKeys.clear();
    }

    const facetGroupChanged =
      changed.has('aggregations') ||
      changed.has('sortedBy') ||
      changed.has('selectedFacets') ||
      changed.has('unappliedFacetChanges');
    if (facetGroupChanged) {
      // Convert the merged selected facets & aggregations into a facet group
      this.facetGroup = this.mergedFacets;
    }

    if (facetGroupChanged || changed.has('filterText')) {
      this.filteredBuckets = this.filterBuckets();
    }

    // If any of the search properties change, it triggers a facet fetch
    if (
      changed.has('facetKey') ||
      changed.has('query') ||
      changed.has('searchType') ||
      changed.has('filterMap')
    ) {
      this.facetsLoading = true;
      this.sortedBy =
        this.searchType === SearchType.TV
          ? tvMoreFacetSort[this.facetKey as FacetOption]
          : defaultFacetSort[this.facetKey as FacetOption];

      this.updateSpecificFacets();
    }
  }

  updated(changed: PropertyValues): void {
    // A new filter or sort order shows different values, so start over from
    // the first page rather than somewhere in the middle of them.
    if (changed.has('filterText') || changed.has('sortedBy')) {
      this.scroller?.scrollToPage(0);
    }
  }

  firstUpdated(): void {
    this.setupEscapeListeners();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('keydown', this.escapeHandler);
  }

  /**
   * Close more facets modal on Escape click
   */
  private escapeHandler = (e: KeyboardEvent): void => {
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

      // Record collection titles before the aggregations, so that they're
      // available for sorting & filtering once the facet group is built.
      const collectionTitles = results?.success?.response?.collectionTitles;
      if (collectionTitles) {
        for (const [id, title] of Object.entries(collectionTitles)) {
          this.collectionTitles?.set(id, title);
        }
      }

      this.aggregations = results?.success?.response.aggregations;
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

    // Apply any unapplied selections
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
   * The text patrons see for a bucket: the collection title for collections,
   * and the bucket key for everything else.
   */
  private displayTextFor(key: string): string {
    const collectionTitle =
      this.facetKey === 'collection'
        ? this.collectionTitles?.get(key)
        : undefined;
    return collectionTitle ?? key;
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
        return {
          displayText: this.displayTextFor(value),
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

    // Construct the array of facet buckets from the aggregation buckets
    const facetBuckets: FacetBucket[] = sortedBuckets.map(bucket => {
      const bucketKeyStr = `${bucket.key}`;
      return {
        displayText: this.displayTextFor(bucketKeyStr),
        key: bucketKeyStr,
        count: bucket.doc_count,
        state: 'none',
      };
    });

    // Collections sorted alphabetically should be in order of the titles
    // patrons see, not of the identifiers that getSortedBuckets used.
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
   * The buckets whose visible text contains the filter text, ignoring case,
   * accents and punctuation.
   */
  private filterBuckets(): FacetBucket[] {
    const buckets = this.facetGroup?.buckets ?? [];
    const needle = normalizeFilterText(this.filterText);
    if (!needle) return buckets;
    return buckets.filter(bucket => this.filterKeyFor(bucket).includes(needle));
  }

  private filterKeyFor(bucket: FacetBucket): string {
    let filterKey = this.filterKeys.get(bucket.key);
    if (filterKey === undefined) {
      const visibleText = [bucket.displayText ?? bucket.key, bucket.extraNote]
        .filter(Boolean)
        .join(' ');
      filterKey = normalizeFilterText(visibleText);
      this.filterKeys.set(bucket.key, filterKey);
    }
    return filterKey;
  }

  /**
   * Whether the patron's filter text has ruled out every value
   */
  private get noValuesMatch(): boolean {
    const isFiltering = normalizeFilterText(this.filterText) !== '';
    return isFiltering && this.filteredBuckets.length === 0;
  }

  private get moreFacetsTemplate(): TemplateResult {
    return html`
      <more-facets-scroller
        .facetType=${this.facetKey}
        .buckets=${this.filteredBuckets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${this.facetClicked}
        @pageChanged=${this.pageChanged}
      ></more-facets-scroller>
      ${when(this.noValuesMatch, () => this.noMatchesTemplate)}
    `;
  }

  private get noMatchesTemplate(): TemplateResult {
    return html`<p class="no-matches" role="status">
      ${msg('No matching values found.')}
    </p>`;
  }

  private get loaderTemplate(): TemplateResult {
    return html`
      <ia-status-indicator
        class="facets-loader"
        mode="loading"
      ></ia-status-indicator>
    `;
  }

  private get footerTemplate(): TemplateResult {
    return html`
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

  private get modalHeaderTemplate(): TemplateResult {
    const facetSort =
      this.sortedBy ?? defaultFacetSort[this.facetKey as FacetOption];
    const defaultSwitchSide =
      facetSort === AggregationSortType.COUNT ? 'left' : 'right';
    const valuesName = this.facetKey ? facetPluralTitles[this.facetKey] : '';

    return html`<span class="sr-only">${msg('More facets for:')}</span>
      <span class="title">${this.facetGroup?.title}</span>
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
            .placeholder=${msg(str`Search ${valuesName}…`)}
            .screenReaderLabel=${msg(str`Filter ${valuesName}`)}
            .clearButtonScreenReaderLabel=${msg('Clear filter')}
            @input=${this.filterTextChanged}
          ></ia-clearable-text-input>
        </span>
      </span>`;
  }

  render() {
    return html`
      ${this.facetsLoading
        ? this.loaderTemplate
        : html`
            <section id="more-facets">
              <div class="header-content">${this.modalHeaderTemplate}</div>
              <div class="facets-content">${this.moreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `;
  }

  /**
   * Handler for typing in (or clearing) the filter text field
   */
  private filterTextChanged(e: Event): void {
    const input = e.target as HTMLElement & { value: string };
    this.filterText = input.value;
  }

  private facetClicked(e: CustomEvent<FacetEventDetails>): void {
    if (!this.facetKey) return;
    this.unappliedFacetChanges = updateSelectedFacetBucket(
      this.unappliedFacetChanges,
      this.facetKey,
      e.detail.bucket,
    );
  }

  private pageChanged(e: CustomEvent<number>): void {
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.moreFacetsPageChange,
      label: `${e.detail + 1}`,
    });
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
          padding: 10px;
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
          padding: 5px 10px 0;
        }

        /* Each label stays on the same line as its control when these wrap */
        .sort-controls,
        .filter-controls {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        .sort-label,
        .filter-label {
          font-size: 1.3rem;
        }

        .sort-toggle {
          font-weight: normal;
        }

        .filter-input {
          --input-height: 2.5rem;
          --input-font-size: 1.3rem;
          --input-border-radius: 4px;
          --input-padding: 4px 8px;
          --input-focused-border-color: ${modalSubmitButton};
          width: 16rem;
        }

        .facets-content {
          position: relative;
          font-size: 1.2rem;
          padding: 10px 0;
        }

        .no-matches {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0;
          font-size: 1.4rem;
          color: #666;
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
        .footer {
          text-align: center;
        }

        @media (max-width: 560px) {
          .filter-input {
            width: 12rem;
            --input-font-size: 1.2rem;
          }
        }
      `,
    ];
  }
}
