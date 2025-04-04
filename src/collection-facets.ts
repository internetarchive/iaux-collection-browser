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
import { ref } from 'lit/directives/ref.js';
import { msg } from '@lit/localize';
import { classMap } from 'lit/directives/class-map.js';
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
import {
  ModalConfig,
  ModalManagerInterface,
} from '@internetarchive/modal-manager';
import type { FeatureFeedbackServiceInterface } from '@internetarchive/feature-feedback';
import type { RecaptchaManagerInterface } from '@internetarchive/recaptcha-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import type { SharedResizeObserverInterface } from '@internetarchive/shared-resize-observer';
import chevronIcon from './assets/img/icons/chevron';
import expandIcon from './assets/img/icons/expand';
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
  FacetEventDetails,
} from './models';
import type {
  CollectionTitles,
  PageSpecifierParams,
} from './data-source/models';
import './collection-facets/more-facets-content';
import './collection-facets/facets-template';
import './collection-facets/facet-tombstone-row';
import './expanded-date-picker';
import {
  analyticsActions,
  analyticsCategories,
} from './utils/analytics-events';
import { srOnlyStyle } from './styles/sr-only';
import { ExpandedDatePicker } from './expanded-date-picker';
import {
  sortBucketsBySelectionState,
  updateSelectedFacetBucket,
} from './utils/facet-utils';

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

  @property({ type: Number }) contentWidth?: number;

  @property({ type: Boolean }) showHistogramDatePicker = false;

  @property({ type: Boolean }) allowExpandingDatePicker = false;

  @property({ type: String }) query?: string;

  @property({ type: Object }) pageSpecifierParams?: PageSpecifierParams;

  @property({ type: Array }) parentCollections: string[] = [];

  @property({ type: Object }) filterMap?: FilterMap;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) collectionPagePath: string = '/details/';

  @property({ type: Boolean }) isManageView = false;

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
  collectionTitles?: CollectionTitles;

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
    const containerClasses = classMap({
      loading: this.facetsLoading,
      managing: this.isManageView,
    });

    // Added data-testid for Playwright testing
    // Using facet-group class and aria-labels is not ideal for Playwright locator
    const datePickerLabelId = 'date-picker-label';
    return html`
      <div id="container" class=${containerClasses}>
        ${this.showHistogramDatePicker &&
        (this.fullYearsHistogramAggregation || this.fullYearAggregationLoading)
          ? html`
              <section
                class="facet-group"
                aria-labelledby=${datePickerLabelId}
                data-testid="facet-group-header-label-date-picker"
              >
                <h3 id=${datePickerLabelId}>
                  Year Published <span class="sr-only">range filter</span>
                  ${this.expandDatePickerBtnTemplate}
                </h3>
                ${this.histogramTemplate}
              </section>
            `
          : nothing}
        ${this.collectionPartOfTemplate}
        ${this.mergedFacets.map(facetGroup =>
          this.getFacetGroupTemplate(facetGroup),
        )}
      </div>
    `;
  }

  private get collectionPartOfTemplate(): TemplateResult | typeof nothing {
    // We only display the "Part Of" section on collection pages
    if (!this.parentCollections?.length) return nothing;

    // Added data-testid for Playwright testing
    // Using className and aria-labels is not ideal for Playwright locator
    const headingId = 'partof-heading';
    return html`
      <section
        class="facet-group partof-collections"
        aria-labelledby=${headingId}
        data-testid="facet-group-partof-collections"
      >
        <div class="facet-group-header">
          <h3 id=${headingId}>${msg('Part Of')}</h3>
        </div>
        <ul>
          ${map(this.parentCollections, collxn => {
            const collectionURL = `${this.baseNavigationUrl}${this.collectionPagePath}${collxn}`;

            return html` <li>
              <a
                href=${collectionURL}
                data-id=${collxn}
                @click=${this.partOfCollectionClicked}
              >
                ${this.collectionTitles?.get(collxn) ?? collxn}
              </a>
            </li>`;
          })}
        </ul>
      </section>
    `;
  }

  private partOfCollectionClicked(e: Event): void {
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.partOfCollectionClicked,
      label: (e.target as HTMLElement).dataset.id,
    });
  }

  /**
   * Opens a modal dialog containing an enlarged version of the date picker.
   */
  private showDatePickerModal(): void {
    const { fullYearsHistogramAggregation } = this;
    const minDate = fullYearsHistogramAggregation?.first_bucket_key;
    const maxDate = fullYearsHistogramAggregation?.last_bucket_key;
    const buckets = fullYearsHistogramAggregation?.buckets as number[];

    // Because the modal manager does not clear its DOM content after being closed,
    // it may try to render the exact same date picker template when it is reopened.
    // And because it isn't actually a descendent of this collection-facets component,
    // changes to the template defined here may not trigger a reactive update to the date
    // picker, resulting in it displaying a stale date range.
    // This ref callback ensures that every time the date picker modal is opened, it will
    // always propagate the most recent date range into the date picker regardless of
    // whether Lit thinks the update is necessary.
    const expandedDatePickerChanged = (elmt?: Element) => {
      if (elmt && elmt instanceof ExpandedDatePicker) {
        const expandedDatePicker = elmt as ExpandedDatePicker;
        expandedDatePicker.minSelectedDate = this.minSelectedDate;
        expandedDatePicker.maxSelectedDate = this.maxSelectedDate;
      }
    };

    const customModalContent = html`
      <expanded-date-picker
        ${ref(expandedDatePickerChanged)}
        .minDate=${minDate}
        .maxDate=${maxDate}
        .minSelectedDate=${this.minSelectedDate}
        .maxSelectedDate=${this.maxSelectedDate}
        .buckets=${buckets}
        .modalManager=${this.modalManager}
        .analyticsHandler=${this.analyticsHandler}
        @histogramDateRangeApplied=${this.histogramDateRangeUpdated}
        @modalClosed=${this.handleExpandedDatePickerClosed}
      ></expanded-date-picker>
    `;

    const config = new ModalConfig({
      bodyColor: '#fff',
      headerColor: '#194880',
      showHeaderLogo: false,
      closeOnBackdropClick: true, // TODO: want to fire analytics
      title: html`Select a date range`,
    });

    this.modalManager?.classList.add('expanded-date-picker');
    this.modalManager?.showModal({
      config,
      customModalContent,
      userClosedModalCallback: this.handleExpandedDatePickerClosed,
    });

    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.histogramExpanded,
      label: window.location.href,
    });
  }

  private handleExpandedDatePickerClosed = (): void => {
    this.modalManager?.classList.remove('expanded-date-picker');
  };

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

  /**
   * Template for the "Expand" button to show the date picker modal, or
   * `nothing` if that button should currently not be shown.
   */
  private get expandDatePickerBtnTemplate(): TemplateResult | typeof nothing {
    return this.allowExpandingDatePicker && !this.facetsLoading
      ? html`<button
          class="expand-date-picker-btn"
          aria-hidden="true"
          @click=${this.showDatePickerModal}
        >
          ${expandIcon}
        </button>`
      : nothing;
  }

  private get histogramTemplate() {
    const { fullYearsHistogramAggregation } = this;
    const minDate = fullYearsHistogramAggregation?.first_bucket_key;
    const maxDate = fullYearsHistogramAggregation?.last_bucket_key;
    return this.fullYearAggregationLoading
      ? html`<div class="histogram-loading-indicator">&hellip;</div>` // Ellipsis block
      : html`
          <histogram-date-range
            .minDate=${minDate}
            .maxDate=${maxDate}
            .minSelectedDate=${this.minSelectedDate ?? minDate}
            .maxSelectedDate=${this.maxSelectedDate ?? maxDate}
            .updateDelay=${100}
            missingDataMessage="..."
            .width=${this.collapsableFacets && this.contentWidth
              ? this.contentWidth
              : 180}
            .bins=${fullYearsHistogramAggregation?.buckets as number[]}
            @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
          ></histogram-date-range>
        `;
  }

  /**
   * Dispatches a `histogramDateRangeUpdated` event with the date range copied from the
   * input event.
   *
   * Arrow function to ensure `this` is always bound to the current component.
   */
  private histogramDateRangeUpdated = (
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>,
  ): void => {
    const { minDate, maxDate } = e.detail;
    const event = new CustomEvent('histogramDateRangeUpdated', {
      detail: { minDate, maxDate },
    });
    this.dispatchEvent(event);
  };

  /**
   * Combines the selected facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];

    facetDisplayOrder.forEach(facetKey => {
      const selectedFacetGroup = this.selectedFacetGroups.find(
        group => group.key === facetKey,
      );
      const aggregateFacetGroup = this.aggregationFacetGroups.find(
        group => group.key === facetKey,
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
            b => b.key === bucket.key,
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

      /**
       * render limited facet items on page facet area
       *
       * - by-default we are showing 6 items
       * - additionally want to show all items (selected/suppressed) in page facet area
       */
      let allowedFacetCount = Object.keys(
        (selectedFacetGroup?.buckets as []) || [],
      )?.length;
      if (allowedFacetCount < this.allowedFacetCount) {
        allowedFacetCount = this.allowedFacetCount; // splice start index from 0th
      }

      // For lending facets, only include a specific subset of buckets
      if (facetKey === 'lending') {
        bucketsWithCount = bucketsWithCount.filter(
          bucket => lendingFacetKeysVisibility[bucket.key as LendingFacetKey],
        );
      }

      // Sort the FacetBuckets so that selected and hidden buckets come before the rest
      sortBucketsBySelectionState(bucketsWithCount);

      // For mediatype facets, ensure the collection bucket is always shown if present
      if (facetKey === 'mediatype') {
        const collectionIndex = bucketsWithCount.findIndex(
          bucket => bucket.key === 'collection',
        );

        if (collectionIndex >= allowedFacetCount) {
          const [collectionBucket] = bucketsWithCount.splice(
            collectionIndex,
            1,
          );

          // If we're showing lots of selected facets, ensure we're not cutting off the last one
          if (allowedFacetCount > this.allowedFacetCount) {
            allowedFacetCount += 1;
          }

          bucketsWithCount.splice(allowedFacetCount - 1, 0, collectionBucket);
        }
      }

      // slice off how many items we want to show in page facet area
      facetGroup.buckets = bucketsWithCount.slice(0, allowedFacetCount);

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
          },
        );

        return {
          title,
          key: option,
          buckets,
        };
      },
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
        defaultFacetSort[option],
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
    facetGroup: FacetGroup,
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

    // Added data-testid for Playwright testing
    // Using className and aria-labels is not ideal for Playwright locator
    const headerId = `facet-group-header-label-${facetGroup.key}`;
    return html`
      <section
        class="facet-group ${this.collapsableFacets ? 'mobile' : ''}"
        aria-labelledby=${headerId}
        data-testid=${headerId}
      >
        <div class="facet-group-header">
          <h3
            id=${headerId}
            @click=${toggleCollapsed}
            @keyup=${toggleCollapsed}
          >
            ${this.collapsableFacets ? collapser : nothing} ${facetGroup.title}
            <span class="sr-only">filters</span>
          </h3>
        </div>
        <div
          class="facet-group-content ${isOpen ? 'open' : ''}"
          data-testid="facet-group-content-${facetGroup.key}"
        >
          ${this.facetsLoading
            ? this.getTombstoneFacetGroupTemplate()
            : html`
                ${this.getFacetTemplate(facetGroup)}
                ${this.searchMoreFacetsLink(facetGroup)}
              `}
        </div>
      </section>
    `;
  }

  private getTombstoneFacetGroupTemplate(): TemplateResult {
    // Render five tombstone rows
    return html`
      ${map(
        Array(5).fill(null),
        () => html`<facet-tombstone-row></facet-tombstone-row>`,
      )}
    `;
  }

  /**
   * Generate the More... link button just below the facets group
   *
   * TODO: want to fire analytics?
   */
  private searchMoreFacetsLink(
    facetGroup: FacetGroup,
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

    // Added data-testid for Playwright testing
    // Using the className is not ideal for Playwright locator
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
          new CustomEvent('showMoreFacets', { detail: facetGroup.key }),
        );
      }}
      data-testid="more-link-btn"
    >
      More...
    </button>`;
  }

  async showMoreFacetsModal(
    facetGroup: FacetGroup,
    sortedBy: AggregationSortType,
  ): Promise<void> {
    const customModalContent = html`
      <more-facets-content
        .analyticsHandler=${this.analyticsHandler}
        .facetKey=${facetGroup.key}
        .query=${this.query}
        .filterMap=${this.filterMap}
        .pageSpecifierParams=${this.pageSpecifierParams}
        .modalManager=${this.modalManager}
        .searchService=${this.searchService}
        .searchType=${this.searchType}
        .collectionTitles=${this.collectionTitles}
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
      userClosedModalCallback: () => {
        this.modalManager?.classList.remove('more-search-facets');
      },
    });
  }

  /**
   * Generate the list template for each bucket in a facet group
   */
  private getFacetTemplate(facetGroup: FacetGroup): TemplateResult {
    return html`
      <facets-template
        .collectionPagePath=${this.collectionPagePath}
        .facetGroup=${facetGroup}
        .selectedFacets=${this.selectedFacets}
        .collectionTitles=${this.collectionTitles}
        @facetClick=${(e: CustomEvent<FacetEventDetails>) => {
          this.selectedFacets = updateSelectedFacetBucket(
            this.selectedFacets,
            facetGroup.key,
            e.detail.bucket,
            true,
          );

          const event = new CustomEvent<SelectedFacets>('facetsChanged', {
            detail: this.selectedFacets,
            bubbles: true,
            composed: true,
          });
          this.dispatchEvent(event);
        }}
      ></facets-template>
    `;
  }

  static get styles() {
    return [
      srOnlyStyle,
      css`
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:link:hover {
          text-decoration: underline;
        }

        #container.loading {
          opacity: 0.5;
        }

        #container.managing {
          opacity: 0.3;
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

        .partof-collections ul {
          list-style-type: none;
          padding: 0;
          font-size: 1.2rem;
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

        #date-picker-label {
          display: flex;
          justify-content: space-between;
        }

        .expand-date-picker-btn {
          margin: 0;
          padding: 0;
          border: 0;
          appearance: none;
          background: none;
          cursor: pointer;
        }

        .expand-date-picker-btn > svg {
          width: 14px;
          height: 14px;
        }

        .sorting-icon {
          height: 15px;
          cursor: pointer;
        }
      `,
    ];
  }
}
