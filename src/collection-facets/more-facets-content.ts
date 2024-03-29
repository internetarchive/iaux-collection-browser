/* eslint-disable dot-notation */
/* eslint-disable lit-a11y/click-events-have-key-events */
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
import {
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  FacetOption,
  facetTitles,
  suppressedCollections,
  valueFacetSort,
  defaultFacetSort,
} from '../models';
import type {
  CollectionTitles,
  PageSpecifierParams,
} from '../data-source/models';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';
import './more-facets-pagination';
import './facets-template';
import {
  analyticsActions,
  analyticsCategories,
} from '../utils/analytics-events';
import './toggle-switch';
import { srOnlyStyle } from '../styles/sr-only';

@customElement('more-facets-content')
export class MoreFacetsContent extends LitElement {
  @property({ type: String }) facetKey?: FacetOption;

  @property({ type: String }) facetAggregationKey?: FacetOption;

  @property({ type: String }) query?: string;

  @property({ type: Object }) filterMap?: FilterMap;

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) searchType?: SearchType;

  @property({ type: Object }) pageSpecifierParams?: PageSpecifierParams;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: String }) sortedBy: AggregationSortType =
    AggregationSortType.COUNT;

  @property({ type: Object, attribute: false })
  analyticsHandler?: AnalyticsManagerInterface;

  @state() aggregations?: Record<string, Aggregation>;

  @state() facetGroup?: FacetGroup[] = [];

  @state() facetGroupTitle?: String = '';

  @state() pageNumber = 1;

  /**
   * Facets are loading on popup
   */
  @state() facetsLoading = true;

  @state() paginationSize = 0;

  @state() facetsType = 'modal';

  private facetsPerPage = 35;

  updated(changed: PropertyValues) {
    if (
      changed.has('facetKey') ||
      changed.has('facetAggregationKey') ||
      changed.has('query') ||
      changed.has('searchType') ||
      changed.has('filterMap')
    ) {
      this.facetsLoading = true;
      this.pageNumber = 1;
      this.sortedBy = defaultFacetSort[this.facetKey as FacetOption];

      this.updateSpecificFacets();
    }

    if (changed.has('pageNumber')) {
      this.facetGroup = this.aggregationFacetGroups;
    }
  }

  firstUpdated() {
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
    const trimmedQuery = this.query?.trim();
    if (!trimmedQuery && this.isSearchResultsPage) return; // The search page _requires_ a query

    const aggregations = {
      simpleParams: [this.facetAggregationKey as string],
    };
    const aggregationsSize = 65535; // todo - do we want to have all the records at once?

    const params: SearchParams = {
      ...this.pageSpecifierParams,
      query: trimmedQuery || '',
      filters: this.filterMap,
      aggregations,
      aggregationsSize,
      rows: 0, // todo - do we want server-side pagination with offset/page/limit flag?
    };

    const results = await this.searchService?.search(params, this.searchType);
    this.aggregations = results?.success?.response.aggregations;

    this.facetGroup = this.aggregationFacetGroups;
    this.facetsLoading = false;

    const collectionTitles = results?.success?.response?.collectionTitles;
    if (collectionTitles) {
      for (const [id, title] of Object.entries(collectionTitles)) {
        this.collectionTitles?.set(id, title);
      }
    }
  }

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
  private get mergedFacets(): FacetGroup[] | void {
    const facetGroups: FacetGroup[] = [];

    const selectedFacetGroup = this.selectedFacetGroups.find(
      group => group.key === this.facetKey
    );
    const aggregateFacetGroup = this.aggregationFacetGroups.find(
      group => group.key === this.facetKey
    );

    // if the user selected a facet, but it's not in the aggregation, we add it as-is
    if (selectedFacetGroup && !aggregateFacetGroup) {
      facetGroups.push(selectedFacetGroup);
      return facetGroups;
    }

    // if we don't have an aggregate facet group, don't add this to the list
    if (!aggregateFacetGroup) return facetGroups;

    // start with either the selected group if we have one, or the aggregate group
    const facetGroup = selectedFacetGroup ?? aggregateFacetGroup;

    // attach the counts to the selected buckets
    const bucketsWithCount =
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
    facetGroup.buckets = bucketsWithCount;

    facetGroups.push(facetGroup);
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
          ([value, data]) => {
            const displayText: string = value;
            return {
              displayText,
              key: value,
              count: data?.count,
              state: data?.state,
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
      this.facetGroupTitle = facetTitles[option];

      // sort facets in specific order
      let castedBuckets = aggregation.getSortedBuckets(
        this.sortedBy
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

      // find length and pagination size for modal pagination
      const { length } = Object.keys(castedBuckets as []);
      this.paginationSize = Math.ceil(length / this.facetsPerPage);

      // render only items which will be visible as per this.facetsPerPage
      const bucketsMaxSix = castedBuckets?.slice(
        (this.pageNumber - 1) * this.facetsPerPage,
        this.pageNumber * this.facetsPerPage
      );

      const facetBucket: FacetBucket[] = bucketsMaxSix.map(bucket => {
        const bucketKey = bucket.key;
        return {
          displayText: `${bucket.key}`,
          key: `${bucketKey}`,
          count: bucket.doc_count,
          state: 'none',
        };
      });
      const group: FacetGroup = {
        title: this.facetGroupTitle as string,
        key: option,
        buckets: facetBucket,
      };
      facetGroups.push(group);
    });

    return facetGroups;
  }

  private get getMoreFacetsTemplate(): TemplateResult {
    return html`
      <facets-template
        .facetGroup=${this.mergedFacets?.shift()}
        .selectedFacets=${this.selectedFacets}
        .renderOn=${'modal'}
        .collectionTitles=${this.collectionTitles}
        @selectedFacetsChanged=${(e: CustomEvent) => {
          this.selectedFacets = e.detail;
        }}
      ></facets-template>
    `;
  }

  private get loaderTemplate(): TemplateResult {
    return html`<div class="facets-loader">
      <ia-activity-indicator .mode=${'processing'}></ia-activity-indicator>
    </div> `;
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
      new CustomEvent('sortedFacets', { detail: this.sortedBy })
    );
  }

  private get getModalHeaderTemplate(): TemplateResult {
    const facetSort =
      this.sortedBy ?? defaultFacetSort[this.facetKey as FacetOption];
    const defaultSwitchSide =
      facetSort === AggregationSortType.COUNT ? 'left' : 'right';

    return html`<span class="sr-only">More facets for:</span>
      <span class="title">
        ${this.facetGroupTitle}

        <label class="sort-label">Sort by:</label>
        ${this.facetKey
          ? html`<toggle-switch
              class="sort-toggle"
              leftValue=${AggregationSortType.COUNT}
              leftLabel="Count"
              rightValue=${valueFacetSort[this.facetKey]}
              rightLabel=${this.facetGroupTitle}
              side=${defaultSwitchSide}
              @change=${(e: CustomEvent<string>) => {
                this.sortFacetAggregation(
                  Number(e.detail) as AggregationSortType
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
              <div class="header-content">${this.getModalHeaderTemplate}</div>
              <div class="facets-content">${this.getMoreFacetsTemplate}</div>
              ${this.footerTemplate}
            </section>
          `}
    `;
  }

  private applySearchFacetsClicked() {
    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.modalManager?.closeModal();
    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: `${analyticsActions.applyMoreFacetsModal}`,
      label: `${this.facetKey}`,
    });
  }

  private cancelClick() {
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
        @media (max-width: 560px) {
          section#more-facets {
            max-height: 450px;
          }
          .facets-content {
            overflow-y: auto;
            height: 300px;
          }
        }
        section#more-facets {
          overflow: auto;
          padding: 10px; /* leaves room for scroll bar to appear without overlaying on content */
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
          margin-bottom: 20px;
          width: 70px;
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
      `,
    ];
  }
}
