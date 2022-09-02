/* eslint-disable dot-notation */
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
import { getFacetOptionFromKey } from './facets-util';
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

  @state() aggregations?: Record<string, Aggregation>;

  @state() facetGroup?: FacetGroup[] = [];

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
      advancedParams: [
        {
          field: this.facetAggregationKey as string,
          size: 400, // todo - do we want to have all the records at once?
        },
      ],
    };

    const params: SearchParams = {
      query: this.fullQuery as string,
      fields: ['identifier'],
      aggregations,
      rows: 1, // todo - do we want server-side pagination with offset/page/limit flag?
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
          ([value, facetState]) => {
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
              count: 0,
              state: facetState,
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
   * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
   */
  private get aggregationFacetGroups(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      // the year_histogram data is in a different format so can't be handled here
      if (key === 'year_histogram') return;

      const option = getFacetOptionFromKey(key);
      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];

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

      const facetBuckets: FacetBucket[] = bucketsMaxSix.map(bucket => {
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
        title,
        key: option,
        buckets: facetBuckets,
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
        .collectionNameCache=${this.collectionNameCache}
        .renderOn="modal"
        @selectedFacetsChanged=${(e: CustomEvent) => {
          this.selectedFacets = e.detail;
        }}
      ></facets-template>
    `;
  }

  private get loaderTemplate(): TemplateResult {
    return html`<div class="facets-loader">
      <ia-activity-indicator .mode="processing"></ia-activity-indicator>
    </div> `;
  }

  // render pagination if more then 1 page
  private get facetsPaginationTemplate() {
    return this.paginationSize > 1
      ? html`<more-facets-pagination
          .size=${this.paginationSize}
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

  render() {
    return html`
      ${this.facetsLoading
        ? this.loaderTemplate
        : html`
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
      .scrollable-content {
        overflow-y: scroll;
        max-height: 65vh;
      }
      .facets-content {
        /* For Chrome, Safari, Opera browsers */
        -webkit-column-width: 100px;
        /* For Firefox browser */
        -moz-column-width: 100px;
        column-width: 25rem;
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
    `;
  }
}
