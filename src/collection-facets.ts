/* eslint-disable import/no-duplicates */
import {
  css,
  html,
  LitElement,
  PropertyValues,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import type {
  Aggregation,
  AggregationSortType,
  Bucket,
  FilterMap,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import '@internetarchive/histogram-date-range';
import '@internetarchive/feature-feedback';
import '@internetarchive/collection-name-cache';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import {
  ModalConfig,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import type { FeatureFeedbackServiceInterface } from '@internetarchive/feature-feedback';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type { SharedResizeObserverInterface } from '@internetarchive/shared-resize-observer';
import chevronIcon from './assets/img/icons/chevron';
import {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  facetDisplayOrder,
  facetTitles,
  lendingFacetDisplayNames,
  lendingFacetKeysVisibility,
  LendingFacetKey,
  suppressedCollections,
  defaultFacetSort,
} from './models';
import './collection-facets/more-facets-content';
import './collection-facets/facets-template';
import './collection-facets/facet-tombstone-row';
import {
  analyticsActions,
  analyticsCategories,
} from './utils/analytics-events';

@customElement('collection-facets')
export class CollectionFacets extends LitElement {
  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) searchType?: SearchType;

  @property({ type: Object }) aggregations?: Record<string, Aggregation>;

  @property({ type: Object }) fullYearsHistogramAggregation?: Aggregation;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Boolean }) moreLinksVisible = true;

  @property({ type: Boolean }) facetsLoading = false;

  @property({ type: Boolean }) fullYearAggregationLoading = false;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Boolean }) collapsableFacets = false;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  @property({ type: String }) query?: string;

  @property({ type: Object }) filterMap?: FilterMap;

  @property({ type: Object, attribute: false })
  modalManager?: ModalManagerInterface;

  @property({ type: Object, attribute: false })
  resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Object, attribute: false })
  featureFeedbackService?: FeatureFeedbackServiceInterface;

  @property({ type: Object, attribute: false })
  recaptchaManager?: RecaptchaManagerInterface;

  @property({ type: Object, attribute: false })
  analyticsHandler?: AnalyticsManagerInterface;

  @property({ type: Object, attribute: false })
  collectionNameCache?: CollectionNameCacheInterface;

  @state() openFacets: Record<FacetOption, boolean> = {
    subject: false,
    lending: false,
    mediatype: false,
    language: false,
    creator: false,
    collection: false,
    year: false,
  };

  /**
   * Maximum # of facet buckets to render per facet group
   */
  private allowedFacetCount = 6;

  render() {
    return html`
      <div id="container" class="${this.facetsLoading ? 'loading' : ''}">
        ${this.showHistogramDatePicker &&
        (this.fullYearsHistogramAggregation || this.fullYearAggregationLoading)
          ? html`
              <div class="facet-group">
                <h3>Year Published</h3>
                ${this.histogramTemplate}
              </div>
            `
          : nothing}
        ${this.mergedFacets.map(facetGroup =>
          this.getFacetGroupTemplate(facetGroup)
        )}
      </div>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('selectedFacets')) {
      this.dispatchFacetsChangedEvent();
    }
  }

  // TODO: want to fire analytics?
  private dispatchFacetsChangedEvent() {
    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
    });
    this.dispatchEvent(event);
  }

  private get currentYearsHistogramAggregation(): Aggregation | undefined {
    return this.aggregations?.year_histogram;
  }

  private get histogramTemplate() {
    const { fullYearsHistogramAggregation } = this;
    return this.fullYearAggregationLoading
      ? html`<div class="histogram-loading-indicator">&hellip;</div>` // Ellipsis block
      : html`
          <histogram-date-range
            .minDate=${fullYearsHistogramAggregation?.first_bucket_key}
            .maxDate=${fullYearsHistogramAggregation?.last_bucket_key}
            .minSelectedDate=${this.minSelectedDate}
            .maxSelectedDate=${this.maxSelectedDate}
            .updateDelay=${100}
            missingDataMessage="..."
            .width=${180}
            .bins=${fullYearsHistogramAggregation?.buckets as number[]}
            @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
          ></histogram-date-range>
        `;
  }

  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>
  ) {
    const { minDate, maxDate } = e.detail;
    const event = new CustomEvent('histogramDateRangeUpdated', {
      detail: { minDate, maxDate },
    });
    this.dispatchEvent(event);
  }

  /**
   * Combines the selected facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];

    facetDisplayOrder.forEach(facetKey => {
      const selectedFacetGroup = this.selectedFacetGroups.find(
        group => group.key === facetKey
      );
      const aggregateFacetGroup = this.aggregationFacetGroups.find(
        group => group.key === facetKey
      );

      // if the user selected a facet, but it's not in the aggregation, we add it as-is
      if (selectedFacetGroup && !aggregateFacetGroup) {
        facetGroups.push(selectedFacetGroup);
        return;
      }

      // if we don't have an aggregate facet group, don't add this to the list
      if (!aggregateFacetGroup) return;

      // start with either the selected group if we have one, or the aggregate group
      const facetGroup = selectedFacetGroup ?? aggregateFacetGroup;

      // attach the counts to the selected buckets
      let bucketsWithCount =
        selectedFacetGroup?.buckets.map(bucket => {
          const selectedBucket = aggregateFacetGroup.buckets.find(
            b => b.key === bucket.key
          );
          return selectedBucket
            ? {
                ...bucket,
                count: selectedBucket.count,
              }
            : bucket;
        }) ?? [];

      // append any additional buckets that were not selected
      aggregateFacetGroup.buckets.forEach(bucket => {
        const existingBucket = bucketsWithCount.find(b => b.key === bucket.key);
        if (existingBucket) return;
        bucketsWithCount.push(bucket);
      });

      // For lending facets, only include a specific subset of buckets
      if (facetKey === 'lending') {
        bucketsWithCount = bucketsWithCount.filter(
          bucket => lendingFacetKeysVisibility[bucket.key as LendingFacetKey]
        );
      }

      /**
       * render limited facet items on page facet area
       *
       * - by-default we are showing 6 items
       * - additionally want to show all items (selected/suppressed) in page facet area
       */
      let allowedFacetCount = Object.keys(
        (selectedFacetGroup?.buckets as []) || []
      )?.length;
      if (allowedFacetCount < this.allowedFacetCount) {
        allowedFacetCount = this.allowedFacetCount; // splice start index from 0th
      }

      // splice how many items we want to show in page facet area
      facetGroup.buckets = bucketsWithCount.splice(0, allowedFacetCount);

      facetGroups.push(facetGroup);
    });

    return facetGroups;
  }

  /**
   * Converts the selected facets to a `FacetGroup` array,
   * which is easier to work with
   */
  private get selectedFacetGroups(): FacetGroup[] {
    if (!this.selectedFacets) return [];

    const facetGroups: FacetGroup[] = Object.entries(this.selectedFacets).map(
      ([key, selectedFacets]) => {
        const option = key as FacetOption;
        const title = facetTitles[option];

        const buckets: FacetBucket[] = Object.entries(selectedFacets).map(
          ([value, facetData]) => {
            let displayText: string = value;
            // for lending facets, convert the key to a readable format
            if (option === 'lending') {
              displayText =
                lendingFacetDisplayNames[value as LendingFacetKey] ?? value;
            }
            return {
              displayText,
              key: value,
              count: facetData.count,
              state: facetData.state,
            };
          }
        );

        return {
          title,
          key: option,
          buckets,
        };
      }
    );

    return facetGroups;
  }

  /**
   * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
   */
  private get aggregationFacetGroups(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];
    Object.entries(this.aggregations ?? []).forEach(([key, aggregation]) => {
      // the year_histogram data is in a different format so can't be handled here
      if (key === 'year_histogram') return;

      const option = key as FacetOption;
      const title = facetTitles[option];
      if (!title) return;

      let castedBuckets = aggregation.getSortedBuckets(
        defaultFacetSort[option]
      ) as Bucket[];

      if (option === 'collection') {
        // we are not showing fav- collections or certain deemphasized collections in facets
        castedBuckets = castedBuckets?.filter(bucket => {
          const bucketKey = bucket?.key?.toString();
          return (
            !suppressedCollections[bucketKey] && !bucketKey?.startsWith('fav-')
          );
        });
      }

      const facetBuckets: FacetBucket[] = castedBuckets.map(bucket => {
        const bucketKey = bucket.key;
        let displayText = `${bucket.key}`;
        // for lending facets, convert the bucket key to a readable format
        if (option === 'lending') {
          displayText =
            lendingFacetDisplayNames[bucket.key as LendingFacetKey] ??
            `${bucket.key}`;
        }
        return {
          displayText,
          key: `${bucketKey}`,
          count: bucket.doc_count,
          state: 'none',
        };
      });
      const group: FacetGroup = {
        title,
        key: option,
        buckets: facetBuckets,
      };
      facetGroups.push(group);
    });
    return facetGroups;
  }

  /**
   * Generate the template for a facet group with a header and the collapsible
   * chevron for the mobile view
   */
  private getFacetGroupTemplate(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    if (!this.facetsLoading && facetGroup.buckets.length === 0) return nothing;

    const { key } = facetGroup;
    const isOpen = this.openFacets[key];
    const collapser = html`
      <span class="collapser ${isOpen ? 'open' : ''}"> ${chevronIcon} </span>
    `;

    const toggleCollapsed = () => {
      const newOpenFacets = { ...this.openFacets };
      newOpenFacets[key] = !isOpen;
      this.openFacets = newOpenFacets;
    };

    return html`
      <div class="facet-group ${this.collapsableFacets ? 'mobile' : ''}">
        <div class="facet-group-header">
          <h3 @click=${toggleCollapsed} @keyup=${toggleCollapsed}>
            ${this.collapsableFacets ? collapser : nothing} ${facetGroup.title}
          </h3>
        </div>
        <div class="facet-group-content ${isOpen ? 'open' : ''}">
          ${this.facetsLoading
            ? this.getTombstoneFacetGroupTemplate()
            : html`
                ${this.getFacetTemplate(facetGroup)}
                ${this.searchMoreFacetsLink(facetGroup)}
              `}
        </div>
      </div>
    `;
  }

  private getTombstoneFacetGroupTemplate(): TemplateResult {
    // Render five tombstone rows
    return html`
      ${map(
        Array(5).fill(null),
        () => html`<facet-tombstone-row></facet-tombstone-row>`
      )}
    `;
  }

  /**
   * Generate the More... link button just below the facets group
   *
   * TODO: want to fire analytics?
   */
  private searchMoreFacetsLink(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    // Don't render More... links for FTS searches
    if (!this.moreLinksVisible) {
      return nothing;
    }

    // Don't render More... links for lending facets
    if (facetGroup.key === 'lending') {
      return nothing;
    }

    // Don't render More... link if the number of facets < this.allowedFacetCount
    if (Object.keys(facetGroup.buckets).length < this.allowedFacetCount) {
      return nothing;
    }

    // We sort years in numeric order by default, rather than bucket count
    const facetSort = defaultFacetSort[facetGroup.key];

    return html`<button
      class="more-link"
      @click=${() => {
        this.showMoreFacetsModal(facetGroup, facetSort);
        this.analyticsHandler?.sendEvent({
          category: analyticsCategories.default,
          action: analyticsActions.showMoreFacetsModal,
          label: facetGroup.key,
        });
        this.dispatchEvent(
          new CustomEvent('showMoreFacets', { detail: facetGroup.key })
        );
      }}
    >
      More...
    </button>`;
  }

  async showMoreFacetsModal(
    facetGroup: FacetGroup,
    sortedBy: AggregationSortType
  ): Promise<void> {
    const facetAggrKey = facetGroup.key;

    const customModalContent = html`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${facetGroup.key}
        .facetAggregationKey=${facetAggrKey}
        .query=${this.query}
        .filterMap=${this.filterMap}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .searchType=${this.searchType}
        .collectionNameCache=${this.collectionNameCache}
        .selectedFacets=${this.selectedFacets}
        .sortedBy=${sortedBy}
        @facetsChanged=${(e: CustomEvent) => {
          const event = new CustomEvent<SelectedFacets>('facetsChanged', {
            detail: e.detail,
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        }}
      >
      </more-facets-content>
    `;

    const config = new ModalConfig({
      bodyColor: '#fff',
      headerColor: '#194880',
      showHeaderLogo: false,
      closeOnBackdropClick: true, // TODO: want to fire analytics
      title: html`Select filters`,
    });
    this.modalManager?.classList.add('more-search-facets');
    this.modalManager?.showModal({
      config,
      customModalContent,
    });
  }

  /**
   * Generate the list template for each bucket in a facet group
   */
  private getFacetTemplate(facetGroup: FacetGroup): TemplateResult {
    return html`
      <facets-template
        .facetGroup=${facetGroup}
        .selectedFacets=${this.selectedFacets}
        .renderOn=${'page'}
        .collectionNameCache=${this.collectionNameCache}
        @selectedFacetsChanged=${(e: CustomEvent) => {
          const event = new CustomEvent<SelectedFacets>('facetsChanged', {
            detail: e.detail,
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        }}
      ></facets-template>
    `;
  }

  static get styles() {
    return css`
      #container.loading {
        opacity: 0.5;
      }

      .histogram-loading-indicator {
        width: 100%;
        height: 2.25rem;
        margin-top: 1.75rem;
        font-size: 1.4rem;
        text-align: center;
      }

      .collapser {
        display: inline-block;
        cursor: pointer;
        width: 10px;
        height: 10px;
      }

      .collapser svg {
        transition: transform 0.2s ease-in-out;
      }

      .collapser.open svg {
        transform: rotate(90deg);
      }

      .facet-group:not(:last-child) {
        margin-bottom: 2rem;
      }

      .facet-group h3 {
        margin-bottom: 0.7rem;
      }

      .facet-group.mobile h3 {
        cursor: pointer;
      }

      .facet-group-header {
        display: flex;
        margin-bottom: 0.7rem;
        justify-content: space-between;
        border-bottom: 1px solid rgb(232, 232, 232);
      }

      .facet-group-content {
        transition: max-height 0.2s ease-in-out;
      }

      .facet-group.mobile .facet-group-content {
        max-height: 0;
        overflow: hidden;
      }

      .facet-group.mobile .facet-group-content.open {
        max-height: 2000px;
      }

      h3 {
        font-size: 1.4rem;
        font-weight: 200
        padding-bottom: 3px;
        margin: 0;
      }

      .more-link {
        font-size: 1.2rem;
        text-decoration: none;
        padding: 0;
        background: inherit;
        border: 0;
        color: var(--ia-theme-link-color, #4b64ff);
        cursor: pointer;
      }

      .sorting-icon {
        height: 15px;
        cursor: pointer;
      }
    `;
  }
}
