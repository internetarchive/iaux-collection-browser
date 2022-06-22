/* eslint-disable dot-notation */
import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { Bucket, SearchParams } from '@internetarchive/search-service';

import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { SelectedFacets, FacetGroup, defaultSelectedFacets } from '../models';
import { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';

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

  @property({ type: Object }) allFacetGroups?: FacetGroup[] = [];

  @state() pageNumber = 1;

  @state() loading = 1;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  private facetsPerPage = 25;

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
          size: 1000, // todo - ?
        },
      ],
    };

    const params: SearchParams = {
      query: this.fullQuery as string,
      fields: ['identifier'],
      aggregations,
      rows: 1, // todo - ?
    };

    const results = await this.searchService?.search(params);
    this.aggr = results?.success?.response.aggregations;
  }

  async filterFacets() {
    Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
      if (key === 'year_histogram') return;

      this.castedBuckets = buckets['buckets'] as Bucket[];
    });
  }

  private get renderPaginations() {
    const paging = [];

    const lenght = Object.keys(this.castedBuckets as []).length;
    const numberOfPages = Math.ceil(lenght / this.facetsPerPage);

    const onClickEvent = (e: Event) => {
      this.pageClick(e);
    };

    let page = 1;
    for (page = 1; page <= numberOfPages; page += 1) {
      if (this.pageNumber === page) {
        paging.push(
          html`<button
            class="page-number current-page"
            @click="${onClickEvent}"
          >
            ${page}
          </button>`
        );
      } else {
        paging.push(
          html`<button class="page-number" @click="${onClickEvent}">
            ${page}
          </button>`
        );
      }
    }

    return paging;
  }

  private pageClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLElement;
    const { textContent } = target;

    if (textContent) this.pageNumber = Number(textContent);
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
      ? html`<div class="loading">
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
              <div class="facets-paging">${this.renderPaginations}</div>
              <center>
                <input
                  class="btn btn-archive}"
                  type="button"
                  value="Apply your filters"
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

      .facets-paging {
        margin: 1.5rem;
        background-color: #efefef;
        text-align: right;
        padding: 1rem 0;
        font-size: 1.2rem;
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
        padding: 0.5rem;
        color: blue;
        border: 0;
        cursor: pointer;
      }
      .current-page {
        background: white;
        padding: 0.5rem;
        color: initial;
      }
      .loading {
        text-align: center;
      }
      .loading img {
        width: 2.5rem;
      }
    `;
  }
}
