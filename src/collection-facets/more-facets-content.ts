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
import { SelectedFacets, defaultSelectedFacets, FacetGroup, FacetBucket, FacetOption, aggregationToFacetOption, facetTitles } from '../models';
import type { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';
import './more-facets-pagination';
import './facets-template';
import {
  mockSuccessSingleResult,
  mockSuccessMultipleResults,
  mockSuccessMultipleResults1,
} from './../../test/mocks/mock-search-responses';
import { getFacetOptionFromKey } from './../collection-facets/facets-util';
// import { FacetGroup } from '../../dist/src/models';



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

  @state() castedBuckets?: FacetGroup[] = [];
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
      this.facetGroup = this.aggregationFacetGroups
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
    // this.aggregations = mockSuccessMultipleResults1?.success?.response?.aggregations;


    // filter facets data to be rendered in modal-manager
    // await this.filterFacets();
    this.facetGroup = this.aggregationFacetGroups
    this.facetsLoading = false;
  }

  /**
   * Converts the raw `aggregations` to `FacetGroups`, which are easier to use
   */
  private aggregationFacetGroups1(): FacetGroup[] {
    const facetGroups: FacetGroup[] = [];
    // console.log(this.aggregations)
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      // the year_histogram data is in a different format so can't be handled here
      // console.log(key, buckets)
      if (key === 'year_histogram') return;
      const option = getFacetOptionFromKey(key);

      // if (option === 'collection') {
      //   // for collections, we need to asynchronously load the collection name
      //   // so we use the `async-collection-name` widget and for the rest, we have a static value to use
      //   const collectionIds = this.castedBuckets?.map(option => option.key);
      //   const collectionIdsArray = Array.from(
      //     new Set(collectionIds)
      //   ) as string[];
      //   this.collectionNameCache?.preloadIdentifiers(collectionIdsArray);
      // }


      const title = facetTitles[option];
      const castedBuckets = buckets.buckets as Bucket[];

      const { length } = Object.keys(castedBuckets as []);
      this.paginationSize = Math.ceil(length / this.facetsPerPage);

      // render only items which will be visible as per this.facetsPerPage
      const bucketsMaxSix = castedBuckets?.slice(
        (this.pageNumber - 1) * this.facetsPerPage,
        this.pageNumber * this.facetsPerPage
      );

      // console.log('total', length, 'current', bucketsMaxSix.length)

      const facetBuckets: FacetBucket[] = bucketsMaxSix.map(bucket => {
        let bucketKey = bucket.key;
        // for languages, we need to search by language code instead of the
        // display name, which is what we get from the search engine result
        if (option === 'language') {
          // const languageCodeKey = languageToCodeMap[bucket.key];
          bucketKey =
            this.languageCodeHandler?.getCodeStringFromLanguageName(
              `${bucket.key}`
            ) ?? bucket.key;
          // bucketKey = languageCodeKey ?? bucket.key;
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

    // this.facetGroup = facetGroups;
    // console.log(facetGroups)
    return facetGroups;
  }
  
  /**
   * Filter facets data stored in this.aggregations, eg.
   * - we don't want to entertain year_histogram data since we using new date-picker
   * - name of collections needs to be load inside cache using this.collectionNameCache
   *
   * this.castedBuckets - hold filtered facets data which will be render in modal
   */
  async filterFacets(): Promise<void> {
    Object.entries(this.aggregations ?? []).forEach(([key, buckets]) => {
      if (key === 'year_histogram') return;

      // this.castedBuckets = buckets['buckets'] as Bucket[];

      if (this.facetKey === 'collection') {
        // for collections, we need to asynchronously load the collection name
        // so we use the `async-collection-name` widget and for the rest, we have a static value to use
        const collectionIds = this.castedBuckets?.map(option => option.key);
        const collectionIdsArray = Array.from(
          new Set(collectionIds)
        ) as string[];
        this.collectionNameCache?.preloadIdentifiers(collectionIdsArray);
      }
    });

    const { length } = Object.keys(this.castedBuckets as []);
    this.paginationSize = Math.ceil(length / this.facetsPerPage);
  }

  private pageNumberClicked(e: CustomEvent<{ page: string }>) {
    const page = e?.detail?.page;
    if (page) {
      this.pageNumber = Number(page);
    }
  }

  /**
   * return selected facets in specific/current facetGroup
   *
   * @returns selectedFacet - { 'item1', 'item2' }
   */
  private get currentSelectedFacets() {
    let selectedFacet = {} as object;

    Object.entries(this.selectedFacets as SelectedFacets).map(
      ([key, FacetValue]) => {
        if (key === this.facetKey) {
          selectedFacet = FacetValue;
        }
        return nothing;
      }
    );

    return selectedFacet;
  }

  selectedFacetsChanged(e: CustomEvent<SelectedFacets>) {
    this.selectedFacets = e.detail;
  }


  /**
   * Combines the selected facets with the aggregations to create a single list of facets
   */
  private get mergedFacets(): FacetGroup[] | void {
    const facetGroups: FacetGroup[] = [];

    // facetDisplayOrder.forEach(facetKey => {
      const selectedFacetGroup = this.selectedFacetGroups.find(
        group => group.key === this.facetKey
      );
      const aggregateFacetGroup = this.aggregationFacetGroups.find(
        group => group.key === this.facetKey
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
    // });

    console.log(facetGroups)
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


      const { length } = Object.keys(castedBuckets as []);
      this.paginationSize = Math.ceil(length / this.facetsPerPage);

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
          // const languageCodeKey = languageToCodeMap[bucket.key];
          bucketKey =
            this.languageCodeHandler?.getCodeStringFromLanguageName(
              `${bucket.key}`
            ) ?? bucket.key;
          // bucketKey = languageCodeKey ?? bucket.key;
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

  private getMoreFacetsTemplate(facetGroup: FacetGroup): TemplateResult {
    // console.log(this.facetGroup)
    // console.log(facetGroup)

    // const bucketsNoFavorites = facetGroup?.buckets?.filter(
    //   bucket => bucket.key.startsWith('fav-') === false
    // );
    // const filteredFacetGroup = bucketsNoFavorites.slice(0, 6);

    // render only items which will be visible as per this.facetsPerPage
    const bucketsMaxSix = facetGroup?.buckets?.slice(
      (this.pageNumber - 1) * this.facetsPerPage,
      this.pageNumber * this.facetsPerPage
    );

    this.facetsLoading = false;
    // console.log(bucketsMaxSix)

    // this.mergedFacets.map(facetGroup =>
    //   this.getFacetGroupTemplate(facetGroup)
    // )
    return html`
      <facets-template
        .facetKey=${facetGroup?.key}
        .facetTitle=${facetGroup?.title}
        .facetBucket=${bucketsMaxSix}
        .facetGroup=${this.mergedFacets?.shift()}
        .type='${this.facetsType}'
        .selectedFacets=${this.selectedFacets}
        @selectedFacetsChanged=${this.selectedFacetsChanged}
      ></facets-template>
    `;


    // // render only items which will be visible as per this.facetsPerPage
    // const currentPageContent = this.castedBuckets?.slice(
    //   (this.pageNumber - 1) * this.facetsPerPage,
    //   this.pageNumber * this.facetsPerPage
    // );

    // console.log(currentPageContent)
    // return html`<ul class="facet-list">
    //   ${currentPageContent?.map(facet => {
    //     let displayText = facet.key;

    //     if (this.facetKey === 'language') {
    //       displayText =
    //         this.languageCodeHandler?.getLanguageNameFromCodeString(
    //           displayText as string
    //         ) ?? displayText;
    //     }

    //     return html`
    //       <li class="facet-row">
    //         <div class="facet-checkbox">
    //           <input
    //             type="checkbox"
    //             class="selected-facets"
    //             id="${facet.key}"
    //             data-facet="${this.facetKey}"
    //             .value="${facet.key}"
    //             @click=${(e: Event) => {
    //               this.facetClicked(e);
    //             }}
    //             ?checked=${Object.prototype.hasOwnProperty.call(
    //               this.currentSelectedFacets,
    //               facet.key
    //             )}
    //           />
    //         </div>
    //         <label
    //           class="facet-info-display"
    //           for="${facet.key}"
    //           title=${facet.key}
    //         >
    //           <div class="facet-title">
    //             ${this.facetKey !== 'collection'
    //               ? html`${displayText}`
    //               : html`<async-collection-name
    //                   .collectionNameCache=${this.collectionNameCache}
    //                   .identifier=${displayText}
    //                   placeholder="-"
    //                 ></async-collection-name>`}
    //           </div>
    //           <div class="facet-count">${facet.doc_count}</div>
    //         </label>
    //       </li>
    //     `;
    //   })}
    // </ul>`;
  }

  private facetClicked(e: Event) {
    const { selectedFacets } = this;

    const target = e.target as HTMLInputElement;
    const { checked, value } = target;

    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = defaultSelectedFacets;
    }

    if (checked) {
      newFacets[this.facetKey as keyof typeof newFacets][value] = 'selected';
    } else {
      delete newFacets[this.facetKey as keyof typeof newFacets][value];
    }

    this.selectedFacets = newFacets;
  }

  private get loaderTemplate() {
    return this.facetsLoading
      ? html`<div class="facets-loader">
          <ia-activity-indicator .mode="processing"></ia-activity-indicator>
        </div>`
      : nothing;
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

  private facetsContentTemplate(
    facetGroup: FacetGroup
  ): TemplateResult | typeof nothing {
    return html`
      <div class="facets-content">${this.getMoreFacetsTemplate(facetGroup)}</div>
      ${this.paginationSize > 0
        ? html`${this.facetsPaginationTemplate}
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
            </div>`
        : html`No result found. please try again later.`}
    `;
  }

  render() {
    return html`
      <form>
        ${this.facetsLoading
          ? this.loaderTemplate
          : this.facetsContentTemplate(this.facetGroup?.shift() as any)}
      </form>
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
      .facets-content {
        -webkit-column-width: 25rem;
        -moz-column-width: 25rem;
        column-width: 25rem;
        font-size: 1.2rem;
        padding: 0 10px;
      }

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      .facet-row {
        text-align: left;
        display: flex;
        align-items: start;
        font-weight: 500;
        font-size: 1.2rem;
        margin-bottom: 2px;
      }
      .facet-row .facet-checkbox {
        margin-bottom: 2x;
      }
      .facet-row input {
        margin: 1px 5px 1px 0;
        vertical-align: middle;
      }
      .facet-info-display {
        display: flex;
        flex: 1 1 0%;
        cursor: pointer;
      }
      .facet-title {
        flex: 1 1 0%;
        display: grid;
      }
      .facet-count {
        margin-left: 5px;
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
        text-align: center;
        margin-bottom: 2rem;
        height: 7rem;
        width: 7rem;
        display: inline-block;
      }

      .btn {
        border: none;
        padding: 10px;
        margin-bottom: 10px;
        width: auto;
        border-radius: 0.4rem;
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
