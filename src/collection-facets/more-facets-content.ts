import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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
import './more-facets-pagination';
import './facets-template';
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
import {
  MORE_FACETS__DEFAULT_PAGE_SIZE,
  MORE_FACETS__MAX_AGGREGATIONS,
} from './models';

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
   * Which page of facets we are showing.
   */
  @state() private pageNumber = 1;

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
  }

  firstUpdated(): void {
    this.setupEscapeListeners();
  }

  /**
   * Close more facets modal on Escape click
   */
  private setupEscapeListeners() {
    if (this.modalManager) {
      document.addEventListener('keydown', (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          this.modalManager?.closeModal();
        }
      });
    } else {
      document.removeEventListener('keydown', () => {});
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

    const results = await this.searchService?.search(params, this.searchType);
    this.aggregations = results?.success?.response.aggregations;
    this.facetsLoading = false;

    const collectionTitles = results?.success?.response?.collectionTitles;
    if (collectionTitles) {
      for (const [id, title] of Object.entries(collectionTitles)) {
        this.collectionTitles?.set(id, title);
      }
    }
  }

  /**
   * Handler for page number changes from the pagination widget.
   */
  private pageNumberClicked(e: CustomEvent<{ page: number }>) {
    const page = e?.detail?.page;
    if (page) {
      this.pageNumber = Number(page);
    }

    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.moreFacetsPageChange,
      label: `${this.pageNumber}`,
    });
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
        const displayText: string = value;
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

    // Construct the array of facet buckets from the aggregation buckets
    const facetBuckets: FacetBucket[] = sortedBuckets.map(bucket => {
      const bucketKeyStr = `${bucket.key}`;
      return {
        displayText: `${bucketKeyStr}`,
        key: `${bucketKeyStr}`,
        count: bucket.doc_count,
        state: 'none',
      };
    });

    return {
      title: facetGroupTitle,
      key: this.facetKey,
      buckets: facetBuckets,
    };
  }

  /**
   * Returns a FacetGroup representing only the current page of facet buckets to show.
   */
  private get facetGroupForCurrentPage(): FacetGroup | undefined {
    const { facetGroup } = this;
    if (!facetGroup) return undefined;

    // Slice out only the current page of facet buckets
    const firstBucketIndexOnPage = (this.pageNumber - 1) * this.facetsPerPage;
    const truncatedBuckets = facetGroup.buckets.slice(
      firstBucketIndexOnPage,
      firstBucketIndexOnPage + this.facetsPerPage,
    );

    return {
      ...facetGroup,
      buckets: truncatedBuckets,
    };
  }

  private get moreFacetsTemplate(): TemplateResult {
    return html`
      <facets-template
        .facetGroup=${this.facetGroupForCurrentPage}
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

  /**
   * How many pages of facets to show in the modal pagination widget
   */
  private get paginationSize(): number {
    if (!this.aggregations || !this.facetKey) return 0;

    // Calculate the appropriate number of pages to show in the modal pagination widget
    const length = this.aggregations[this.facetKey]?.buckets.length;
    return Math.ceil(length / this.facetsPerPage);
  }

  // render pagination if more then 1 page
  private get facetsPaginationTemplate() {
    return this.paginationSize > 1
      ? html`<more-facets-pagination
          .size=${this.paginationSize}
          .currentPage=${1}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`
      : nothing;
  }

  private get footerTemplate() {
    if (this.paginationSize > 0) {
      return html`${this.facetsPaginationTemplate}
        <div class="footer">
          <button
            class="btn btn-cancel"
            type="button"
            @click=${this.cancelClick}
          >
            Cancel
          </button>
          <button
            class="btn btn-submit"
            type="button"
            @click=${this.applySearchFacetsClicked}
          >
            Apply filters
          </button>
        </div> `;
    }

    return nothing;
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

    return html`<span class="sr-only">${msg('More facets for:')}</span>
      <span class="title">
        ${this.facetGroup?.title}

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
          overflow: auto;
          padding: 10px; /* leaves room for scroll bar to appear without overlaying on content */
          --facetsColumnCount: 3;
        }
        .header-content .title {
          display: block;
          text-align: left;
          font-size: 1.8rem;
          padding: 0 10px;
          font-weight: bold;
        }

        .sort-label {
          margin-left: 20px;
          font-size: 1.3rem;
        }

        .sort-toggle {
          font-weight: normal;
        }

        .facets-content {
          font-size: 1.2rem;
          max-height: 300px;
          overflow: auto;
          padding: 10px;
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
          margin-top: 10px;
        }

        @media (max-width: 560px) {
          section#more-facets {
            max-height: 450px;
            --facetsColumnCount: 1;
          }
          .facets-content {
            overflow-y: auto;
            height: 300px;
          }
        }
      `,
    ];
  }
}
