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
import type {
  Aggregation,
  Bucket,
  SearchServiceInterface,
  SearchParams,
} from '@internetarchive/search-service';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import {
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  FacetOption,
  facetTitles,
} from '../models';
import type { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';
import './more-facets-pagination';
import './facets-template';

@customElement('more-facets-content')
export class MoreFacetsContent extends LitElement {
  @property({ type: String }) facetKey?: string;

  @property({ type: String }) facetAggregationKey?: string;

  @property({ type: String }) fullQuery?: string;

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: String }) sortedBy = 'count'; // count | alpha

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

  private facetsPerPage = 60; // TODO: Q. how many items we want to have on popup view

  updated(changed: PropertyValues) {
    if (changed.has('facetKey')) {
      this.facetsLoading = true;
      this.pageNumber = 1;

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
   * Get specific facets data from search-service API based of currently query params
   * - this.aggregations - hold result of search service and being used for further processing.
   */
  async updateSpecificFacets(): Promise<void> {
    const aggregations = {
      simpleParams: [this.facetAggregationKey as string],
    };
    const aggregationsSize = 65535; // todo - do we want to have all the records at once?

    const params: SearchParams = {
      query: this.fullQuery as string,
      aggregations,
      aggregationsSize,
      rows: 0, // todo - do we want server-side pagination with offset/page/limit flag?
    };

    const results = await this.searchService?.search(params);
    this.aggregations = results?.success?.response.aggregations as any;

    this.facetGroup = this.aggregationFacetGroups;
    this.facetsLoading = false;
  }

  private pageNumberClicked(e: CustomEvent<{ page: number }>) {
    const page = e?.detail?.page;
    if (page) {
      this.pageNumber = Number(page);
    }
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
            let displayText = value;
            // for selected languages, we store the language code instead of the
            // display name, so look up the name from the mapping
            if (option === 'language') {
              displayText =
                this.languageCodeHandler?.getLanguageNameFromCodeString(
                  value
                ) ?? value;
            }
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
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      // the year_histogram data is in a different format so can't be handled here
      if (key === 'year_histogram') return;

      const option = key as FacetOption;
      this.facetGroupTitle = facetTitles[option];
      let castedBuckets = buckets.buckets as Bucket[];

      // we are not showing fav- items in facets
      castedBuckets = castedBuckets?.filter(
        bucket => bucket?.key?.toString()?.startsWith('fav-') === false
      );

      // sort facets in specific order
      castedBuckets = this.sortedFacets(castedBuckets) as Bucket[];

      // find length and pagination size for modal pagination
      const { length } = Object.keys(castedBuckets as []);
      this.paginationSize = Math.ceil(length / this.facetsPerPage);

      // asynchronously load the collection name
      if (option === 'collection') {
        this.preloadCollectionNames(castedBuckets);
      }

      // render only items which will be visible as per this.facetsPerPage
      const bucketsMaxSix = castedBuckets?.slice(
        (this.pageNumber - 1) * this.facetsPerPage,
        this.pageNumber * this.facetsPerPage
      );

      const facetBucket: FacetBucket[] = bucketsMaxSix.map(bucket => {
        let bucketKey = bucket.key;
        // for languages, we need to search by language code instead of the
        // display name, which is what we get from the search engine result
        if (option === 'language') {
          bucketKey =
            this.languageCodeHandler?.getCodeStringFromLanguageName(
              `${bucket.key}`
            ) ?? bucket.key;
        }
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

  /**
   * for collections, we need to asynchronously load the collection name
   * so we use the `async-collection-name` widget and for the rest, we have a static value to use
   *
   * @param castedBuckets
   */
  private preloadCollectionNames(castedBuckets: any[]) {
    const collectionIds = castedBuckets?.map(option => option.key);
    const collectionIdsArray = Array.from(new Set(collectionIds)) as string[];

    this.collectionNameCache?.preloadIdentifiers(collectionIdsArray);
  }

  /**
   * sort the facets on modal
   * - alpha sort perform in ascending order
   * - count/frequency sort perform in descending order
   *
   * @param facetBucket as Bucket[]
   *
   * @return sortedFacetBucket as Bucket
   */
  private sortedFacets(facetBucket: Bucket[]) {
    let sortedFacetBucket = facetBucket;
    if (this.sortedBy === 'alpha') {
      // sort by alphabetic in ascending order. eg. a,b,c,...
      sortedFacetBucket = facetBucket?.sort((a, b) => (a.key > b.key ? 1 : -1));
    } else {
      // sort by frequency/count in descending order. eg 100,99,98,...
      sortedFacetBucket = facetBucket?.sort((a, b) =>
        a.doc_count < b.doc_count ? 1 : -1
      );
    }

    return sortedFacetBucket;
  }

  private get getMoreFacetsTemplate(): TemplateResult {
    return html`
      <facets-template
        .facetGroup=${this.mergedFacets?.shift()}
        .selectedFacets=${this.selectedFacets}
        .renderOn=${'modal'}
        .collectionNameCache=${this.collectionNameCache}
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

  private sortFacetAggregation() {
    this.sortedBy = this.sortedBy === 'count' ? 'alpha' : 'count';
    this.dispatchEvent(
      new CustomEvent('sortedFacets', { detail: this.sortedBy })
    );
  }

  private get getModalHeaderTemplate(): TemplateResult {
    const title =
      this.sortedBy === 'alpha' ? 'Sort by count' : 'Sort by alphabetically';

    const image =
      this.sortedBy === 'alpha'
        ? 'https://archive.org/images/filter-alpha.png'
        : 'https://archive.org/images/filter-count.png';

    return html`<span class="sr-only">More facets for:</span>
      <span class="title">
        ${this.facetGroupTitle}
        <input
          class="sorting-icon"
          type="image"
          @click=${() => this.sortFacetAggregation()}
          src="${image}"
          title=${title}
          alt="sort facets"
        />
      </span> `;
  }

  render() {
    return html`
      ${this.facetsLoading
        ? this.loaderTemplate
        : html`
            <div class="header-content">${this.getModalHeaderTemplate}</div>
            <div class="scrollable-content">
              <div class="facets-content">${this.getMoreFacetsTemplate}</div>
            </div>
            ${this.footerTemplate}
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
  }

  private cancelClick() {
    this.modalManager?.closeModal();
  }

  static get styles(): CSSResultGroup {
    const modalSubmitButton = css`var(--primaryButtonBGColor, #194880)`;

    return css`
      .header-content .title {
        display: block;
        text-align: left;
        font-size: 1.8rem;
        padding: 0 10px;
        font-weight: bold;
      }
      .scrollable-content {
        overflow-y: auto;
        max-height: 65vh;
      }
      .facets-content {
        font-size: 1.2rem;
        margin: 10px;
      }
      .page-number {
        background: none;
        border: 0;
        cursor: pointer;
        border-radius: 100%;
        width: 25px;
        height: 25px;
        margin: 10px;
        font-size: 1.4rem;
        vertical-align: middle;
      }
      .current-page {
        background: black;
        color: white;
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
        background-color: #000;
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

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
      .sorting-icon {
        height: 15px;
        vertical-align: baseline;
        cursor: pointer;
      }
    `;
  }
}
