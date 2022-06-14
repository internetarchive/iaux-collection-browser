import { css, CSSResultGroup, html, LitElement, nothing, PropertyValues, render, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import { Aggregation, Bucket, SearchParams, SearchServiceInterface } from '@internetarchive/search-service';


import {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  defaultSelectedFacets,
  // Bucket,
} from '../models';
import { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';

@customElement('facets-more-content')
export class FacetsMoreContent extends LitElement {
  @property({ type: String }) content?: string;

  @property({ type: String }) query?: string;

  @property({ type: Boolean }) showMoreContent = false;

  @property({ type: Object }) selectedFacets?: SelectedFacets;
  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object }) aggr = [];

  @property({ type: Object }) castedBuckets?: Bucket[] = [];
  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object }) allFacetGroups?: FacetGroup[] = [];

  @state() options?: {};
  @state() lenght?: Number;

  private facetsPerPage = 25;
  @state() pageNumber = 1;

  @query('.page-number') private pageNum!: any;

  updated(changed: PropertyValues) {
    if (changed.has('query') || changed.has('aggr')) {
      console.log('changed called in more-facets');
      this.filterFacets();
    }
  }
  firstUpdated() {
    window.addEventListener('pageClick', this.pageClick);
  }

  async filterFacets() {

     Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
      if (key === 'year_histogram') return;
      this.castedBuckets = buckets['buckets'] as Bucket[];
    });
  }


  async fetchSpecificFacets() {
    // console.log('this.fullQuery', this.fullQuery);
    console.log('specificFacet1', this.query);

    const aggregations = {
      advancedParams: [
        {
          field: 'year',
          size: 50,
        },
      ],
    };

    const params: SearchParams = {
      query: 'year:2020',
      fields: ['identifier'],
      aggregations,
      rows: 1, 
    };

    const results = await this.searchService?.search(params);
    this.options = results?.success?.response.aggregations;
  }
  
  private get renderPaginations() {
    var loading = 1;
    const paging = []

    const lenght = Object.keys(this.castedBuckets as []).length
    console.log(lenght)
    const numberOfPages = lenght / this.facetsPerPage
    const loadnote = (loading
      ? html`<div class="loading">loading filters... <img alt="" src="/images/loading.gif"/></div>`
      : '')
    // if (!loading) {

      let page = 1
      for (page = 1; page <= numberOfPages; page++) {
        if (this.pageNumber === page)
          paging.push(html`<div class="topinblock">${page}</div>`)
        else
          paging.push(html`<a href="#${page}" class="page-number" @click="${(e: Event) => {
            this.dispatchEvent(new CustomEvent('pageClick', { detail: page }));
            // this.pageClick();
         }}">${page}</a>`)
        paging.push(html` `)
        // console.log(page)
      }
      if (loading < numberOfPages) {
        paging.push(html`
          <a href="#${1 + loading}" @click="${(e: Event) => {
            this.dispatchEvent(new CustomEvent('pageClick', { detail: { page, pager_next: true }}));
            }}" data-action="pager_next">
            <span class="iconochive-right-solid" />
          </a>`)
      }

      return paging;
  }

  private pageClick(e: Event) {
    e.stopPropagation() 
    e.preventDefault()
    console.log(e)
    // console.log(e.detail)
    // console.log(_page)
    // return;
    // if user clicked on the |> "next page" icon, advance one page;
    // else they clicked on a specific page number to go to
    // this.pageNumber = this.pageNumber + 1
    // this.pageNumber = _page
    // this.pageNumber = (
    //   e.explicitOriginalTarget === 'pager_next'
    //     ? this.page + 1
    //     : parseInt($(e.target).text(), 10)
    // )
  }

  private get renderMoreFacets() {
    const min = (this.pageNumber - 1) * this.facetsPerPage;
    const max = (min + this.facetsPerPage) - 1;

    return html`${this.castedBuckets?.map((option, n) => {
      const optionWrapperClass = (n >= min && n <= max) ? 'farow' : 'farow hidden'
      return html`
        <div class=${optionWrapperClass}>
          <div class="facell">
            <input
              type="checkbox"
              name="${option.key}"
              value="${option.key}"
            />
          </div>
          <div class="facell">
            ${option.doc_count}
          </div>
          <div class="facell">
            ${option.key}
          </div>
        </div>`;
      }
    )}`
  }


  render() {
    return html`<div id="morf-page">
      <form>
        <div class="fatable">
          ${this.renderMoreFacets}
        </div>
        <div id="morf-paging">
          ${this.renderPaginations}
        </div>
        <center>
          <input class="btn loading ? 'btn-archive hidden' : 'btn-archive'}" type="button"
            value="Apply your filters" @click=this.submitClick} />
        </center>
      </form>
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .modal-content {
        background-color: #fefefe;
        margin: auto;
        padding: 20px;
        border: 1px solid #888;
        width: 80%;
      }

      .show {
        display: block;
      }
      .hide {
        display: none;
      }

      /* The Close Button */
      .close {
        color: #aaaaaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
      }

      .fatable { /* xxx pull these rules out of archive.less if decide to pull "no JS" facets page.. */
  /**/-webkit-column-width: 250px;/*android*/
  /**/   -moz-column-width: 250px;/*firefox*/
  /**/        column-width: 250px;/*SUPERGREAT CSS3 FEATURE*/
  font-size: 12px;
  padding: 0 20px;
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
.farow .facell a {
  word-break: break-word;
}
.facell.fin {
  background-color: rgb(252, 194, 76); /*@yellow-em*/
  color: black;
}
.facell:first-child {
  float: left;
  width: 20px;
}
.facell:nth-child(2){
  text-align: right;
  float: right;
}
.facell:last-child {
  .breaker-breaker;
  display: flex; /*because want to lay facets cells out in one direction so that checkbox and facet cells value can in two different column*/
}

#morf-paging {
  margin-top:15px;
  margin-bottom:15px;
  background-color:#efefef;
  text-align:right;
  font-size:13px;
  padding-top:7px;
  padding-bottom:7px;
  padding-right:15px;
  word-spacing: 5px;
  color:#4a4a4a;
}
#morf-paging .topinblock {
  background-color: #fafafa;
  margin-top:-7px;
  margin-bottom:-7px;
  display: inline-block;
}

.loading {
  font-style: italic;
  margin: 25px;
  text-align: center;
}
.loading img {
  width: 25px;
}
    `;
  }
}
function add_commas(displayText: string | undefined): unknown {
  throw new Error('Function not implemented.');
}

