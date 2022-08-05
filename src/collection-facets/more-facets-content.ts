/* eslint-disable dot-notation */
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  PropertyValues,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import type {
  Aggregation,
  Bucket,
  SearchServiceInterface,
  SearchParams,
} from '@internetarchive/search-service';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { SelectedFacets, defaultSelectedFacets } from '../models';
import type { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';
import '@internetarchive/ia-activity-indicator/ia-activity-indicator';
import './more-facets-pagination';

@customElement('more-facets-content')
export class FacetsMoreContent extends LitElement {
  @property({ type: String }) facetKey?: string;

  @property({ type: String }) facetAggregationKey?: string;

  @property({ type: String }) fullQuery?: string;

  @property({ type: Object }) modalManager?: any;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @state() aggregations?: Record<string, Aggregation>;

  @state() castedBuckets?: Bucket[] = [];

  @state() pageNumber = 1;

  /**
   * Facets are loading on popup
   */
  @state() facetsLoading = true;

  @state() paginationSize = 0;

  private facetsPerPage = 60; // Q. how many items we want to have on popup view

  updated(changed: PropertyValues) {
    if (changed.has('facetKey')) {
      this.facetsLoading = true;
      this.pageNumber = 1;

      this.updateSpecificFacets(this.facetAggregationKey as unknown as string);
    }
  }

  /**
   * Get specific facets data from search-service API based of currently query params
   * - this.aggregations - hold result of search service and being used for further processing.
   */
  async updateSpecificFacets(facetAggregationKey: string): Promise<void> {
    const aggregations = {
      advancedParams: [
        {
          field: facetAggregationKey,
          size: 1000000, // todo - do we want to have all the records at once?
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

    // filter facets data to be rendered in modal-manager
    await this.filterFacets();
    this.facetsLoading = false;
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

      this.castedBuckets = buckets['buckets'] as Bucket[];

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

  private get getMoreFacetsTemplate() {
    this.facetsLoading = false;

    // render only items which will be visible as per this.facetsPerPage
    const currentPageContent = this.castedBuckets?.slice(
      (this.pageNumber - 1) * this.facetsPerPage,
      this.pageNumber * this.facetsPerPage
    );

    return html`<ul class="facet-list">
      ${currentPageContent?.map(facet => {
        let displayText = facet.key;

        if (this.facetKey === 'language') {
          displayText =
            this.languageCodeHandler?.getLanguageNameFromCodeString(
              displayText as string
            ) ?? displayText;
        }

        return html`
          <li class="facet-row">
            <label class="facet-info-display" title=${facet.key}>
              <input
                type="checkbox"
                class="selected-facets"
                .value="${facet.key}"
                data-facet="${this.facetKey}"
                @click=${(e: Event) => {
                  this.facetClicked(e);
                }}
              />
              <div class="facet-title">
                ${this.facetKey !== 'collection'
                  ? html`${displayText}`
                  : html`<async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${displayText}
                      placeholder="-"
                    ></async-collection-name>`}
              </div>
              <div class="facet-count">${facet.doc_count}</div>
            </label>
          </li>
        `;
      })}
    </ul>`;
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
      : '';
  }

  private get facetsPaginationTemplate() {
    // render pagination if more then 1 page
    return this.paginationSize > 1
      ? html`<more-facets-pagination
          .size=${this.paginationSize}
          @pageNumberClicked=${this.pageNumberClicked}
        ></more-facets-pagination>`
      : nothing;
  }

  private get facetsContentTemplate() {
    return html`
      <div class="facets-content">${this.getMoreFacetsTemplate}</div>
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
      <div id="more-facets-page">
        <form>
          ${this.facetsLoading
            ? this.loaderTemplate
            : this.facetsContentTemplate}
        </form>
      </div>
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
    return css`
      #more-facets-page {
        margin-bottom: 2rem;
      }
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 0;
        border: 1px solid #888;
        width: 80%;
      }

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
      ul.facet-list li {
        margin-bottom: 2px;
      }

      .facet-row {
        text-align: left;
      }
      .facet-row {
        align-items: start;
        font-weight: 500;
        font-size: 1.2rem;
      }
      .facet-row input {
        margin: 1px 5px 1px 0;
      }
      .facet-info-display {
        display: flex;
        flex: 1;
        cursor: pointer;
      }
      .facet-title {
        flex: 1;
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
        background-color: #194880;
        color: white;
      }

      .footer {
        margin-top: 10px;
      }
    `;
  }
}
