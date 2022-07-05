/* eslint-disable dot-notation */
import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Bucket, SearchParams } from '@internetarchive/search-service';

import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { SelectedFacets, FacetGroup, defaultSelectedFacets } from '../models';
import { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';
import './more-facets-pagination';

@customElement('facets-more-content')
export class FacetsMoreContent extends LitElement {
  @property({ type: String }) facetKey?: string;

  @property({ type: String }) facetAggregationKey?: string;

  @property({ type: String }) fullQuery?: string;

  @property({ type: Object }) modalManager?: any;

  @property({ type: Object }) searchService?: any;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: Object, attribute: false }) aggr = [];

  @property({ type: Object }) castedBuckets?: Bucket[] = [];

  @property({ type: Object }) selectedFacet?: String;

  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: Object }) allFacetGroups?: FacetGroup[] = [];

  @state() pageNumber = 1;

  @state() loading = 1;

  @state() paginationSize = 1;

  @query('#pagination') private pagination!: HTMLElement;

  private facetsPerPage = 60;

  async updated(changed: PropertyValues) {
    if (changed.has('facetKey')) {
      this.loading = 1;
      this.pageNumber = 1;

      await this.fetchSpecificFacets(
        this.facetAggregationKey as unknown as string
      );
      this.loading = 0;
    }

    if (changed.has('aggr')) {
      this.filterFacets();
    }
  }

  async fetchSpecificFacets(facetAggregationKey: string) {
    const aggregations = {
      advancedParams: [
        {
          field: facetAggregationKey,
          size: 1000000, // todo - ?
        },
      ],
    };

    const params: SearchParams = {
      query: this.fullQuery as string,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    };

    const results = await this.searchService?.search(params);
    this.aggr = results?.success?.response.aggregations;
  }

  async filterFacets() {
    Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
      if (key === 'year_histogram') return;

      this.castedBuckets = buckets['buckets'] as Bucket[];
    });

    const lenght = Object.keys(this.castedBuckets as []).length;
    this.paginationSize = Math.ceil(lenght / this.facetsPerPage);
  }

  private pageNumberClicked(e: CustomEvent<{ page: string }>) {
    const page = e?.detail?.page;
    if (page) {
      this.pageNumber = Number(page);
    }
  }

  private get renderMoreFacets() {
    const min = (this.pageNumber - 1) * this.facetsPerPage;
    const max = min + this.facetsPerPage - 1;
    this.loading = 0;
    return html`<ul class="facet-list">
      ${this.castedBuckets?.map((option, n) => {
        const optionWrapperClass =
          n >= min && n <= max ? 'farow' : 'farow hidden';

        return html` <li class=${optionWrapperClass}>
          <div class="facet-row">
            <label class="facet-info-display" title=${option.key}>
              <input
                type="checkbox"
                class="selected-facets"
                .value="${option.key}"
                data-facet="${this.facetKey}"
                @click=${(e: Event) => {
                  this.facetClicked(e);
                }}
              />
              <div class="facet-title">${option.key}</div>
              <div class="facet-count">${option.doc_count}</div>
            </label>
          </div>
        </li>`;
      })}
    </ul>`;
  }

  private facetClicked(e: Event) {
    const { selectedFacets } = this;

    const target = e.target as HTMLInputElement;
    const { checked, value, dataset } = target;
    const facetKey = dataset.facet as string;

    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = defaultSelectedFacets;
    }

    if (checked) {
      newFacets[facetKey as keyof typeof newFacets][value] = 'selected';
    } else {
      delete newFacets[facetKey as keyof typeof newFacets][value];
    }

    this.selectedFacets = newFacets;
  }

  private get loaderTemplate() {
    return this.loading
      ? html`<div class="loader-facets">
          loading facets...
          <img alt="" src="https://archive.org/images/loading.gif" />
        </div>`
      : '';
  }

  render() {
    return html`<div id="morf-page">
      <form>
        ${this.loading
          ? this.loaderTemplate
          : html`<div class="facets-content">${this.renderMoreFacets}</div>
              <more-facets-pagination
                .paginationSize=${this.paginationSize}
                .step=${Number(2)}
                @pageNumberClicked=${this.pageNumberClicked}
              ></more-facets-pagination>
              <center>
                <input
                  class="btn btn-cancel"
                  type="button"
                  value="Cancel"
                  @click=${this.submitClick}
                />
                <input
                  class="btn btn-submit"
                  type="button"
                  value="Apply filters"
                  @click=${this.submitClick}
                />
              </center>`}
      </form>
    </div>`;
  }

  private submitClick() {
    const event = new CustomEvent<SelectedFacets>('facetsChanged', {
      detail: this.selectedFacets,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
    this.modalManager?.closeModal();
  }

  static get styles(): CSSResultGroup {
    return css`
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 0rem;
        border: 1px solid #888;
        width: 80%;
      }

      .facets-content {
        -webkit-column-width: 25rem;
        -moz-column-width: 25rem;
        column-width: 25rem;
        font-size: 1.2rem;
        padding: 0 1rem;
      }

      .farow {
        width: 100%;
        display: inline-block;
        margin-bottom: 0;
        font-weight: 500;
      }
      .farow.hidden {
        display: none;
      }

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul.facet-list li {
        margin-bottom: 0.2rem;
      }

      .facet-row {
        text-align: left;
      }
      .facet-row {
        display: flex;
        align-items: start;
        font-weight: 500;
        font-size: 1.2rem;
      }
      .facet-row input {
        margin: 0.1rem 0.5rem 0.1rem 0;
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
        margin-left: 0.5rem;
      }

      .page-number {
        background: none;
        border: 0;
        cursor: pointer;
        border-radius: 100%;
        width: 25px;
        height: 25px;
        margin: 1rem;
        font-size: 1.4rem;
        vertical-align: middle;
      }
      .current-page {
        background: black;
        color: white;
      }
      .loader-facets {
        text-align: center;
        margin-bottom: 2rem;
      }
      .loader-facets img {
        width: 2.5rem;
      }

      .btn {
        border: none;
        padding: 1rem;
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
    `;
  }
}
