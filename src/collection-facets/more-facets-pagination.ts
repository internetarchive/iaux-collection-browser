/* eslint-disable dot-notation */
import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { Bucket, SearchParams } from '@internetarchive/search-service';

import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { SelectedFacets, FacetGroup, defaultSelectedFacets } from '../models';
import { LanguageCodeHandlerInterface } from '../language-code-handler/language-code-handler';

@customElement('more-facets-pagination')
export class MoreFacetsPagination extends LitElement {
  @property({ type: Array }) testData?: any;

  @property({ type: Number }) startPage?: number;

  // @property({ type: Number }) step?: number;

  /// //////////////
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

  @state() page = 1;

  @state() size = 1;

  @state() step = 3;
  // @state() frag = HT;
  
  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  private facetsPerPage = 25;

  @query('#pagination') private pagination!: HTMLElement;


  firstUpdated() {
    this.build();

  }

  private pageClick(e: Event) {
    e.stopPropagation();
    e.preventDefault();

    const target = e.target as HTMLElement;
    const { textContent } = target;

    if (textContent) this.pageNumber = Number(textContent);
  }

  private build() {
    const htmlFrag = document.createRange().createContextualFragment(`
      <a>&#9668;</a>
      <span></span>
      <a>&#9658;</a>
    `)// &#9668; ◄ previous button  |  &#9658; ► next button
    console.log(htmlFrag)
    const frag = htmlFrag.querySelector(`span`) as any
    console.log(frag)

    // Calculate the startPage and endPage.
    let startPage = this.page - this.step
    let endPage = this.page + this.step

    if (startPage <= 0) {
      endPage += -startPage + 1
      startPage = 1
    }

    if (endPage >= this.size) {
      startPage = Math.max(startPage - (endPage - this.size), 1)
      endPage = this.size
    }

    // first
    if (startPage > 1) {
      frag.appendChild(document.createRange().createContextualFragment(
        `<a ${this.page === 1 ? 'class="current"' : ''}>1</a><i>...</i>`)
      )
    }

    // // middle
    // for (let page = startPage; page <= endPage; ++page) {
    //   frag.appendChild(document.createRange().createContextualFragment(
    //     `<a ${this.page === page ? 'class="current"' : ''}>${page}</a>`
    //   ))
    // }

    // // last
    // if (endPage < this.size) {
    //   frag.appendChild(document.createRange().createContextualFragment(
    //     `<i>...</i><a ${this.page === this.size ? 'class="current"' : ''}>${this.size}</a>`
    //   ))
    // }

    // // middle "a" click
    // htmlFrag.querySelectorAll(`span a`).forEach(aElem => {
    //   aElem.addEventListener('click', () => {
    //     this.page = +aElem.innerText
    //     this.Build(targetElem)
    //   })
    // })

    // // Prev and next click
    // const [aPrev, ...others] = htmlFrag.querySelectorAll(`a`)
    // aPrev.addEventListener(`click`, () => {
    //   this.page--
    //   if (this.page < 1) {
    //     this.page = 1
    //   }
    //   this.Build(targetElem)
    // })

    // next
    // others.at(-1).addEventListener(`click`, () => {
    //   ++this.page
    //   if (this.page > this.size) {
    //     this.page = this.size
    //   }
    //   this.Build(targetElem)
    // })

    this.pagination.innerHTML = "" // clear
    this.pagination.append(htmlFrag)
  }

  render() {
    return html`<div id="morf-page">
      <form>
        <div id="pagination" class="1facets-paging">
        </div>
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
    #pagination {
      display: inline-block;
      vertical-align: middle;
      border-radius: 0.25rem;
      padding: .1rem .2rem .3rem .2rem;
      border-top: .1rem solid #AEAEAE;
      border-bottom: .1rem solid #FFFFFF;
      background-color: #DADADA;
      background-image: -webkit-linear-gradient(top, #DBDBDB, #E2E2E2);
    }
  
    #pagination a, #pagination i {
      display: inline-block;
      vertical-align: middle;
      width: 1.375rem;
      color: #7D7D7D;
      text-align: center;
      font-size: 0.625rem;
      padding: .3rem 0 .2rem 0;
      user-select: none;
    }
  
    #pagination a {
      margin: 0 .2rem 0 .2rem;
      border-radius: .4rem;
      border: .1rem solid #E3E3E3;
      cursor: pointer;
      box-shadow: inset 0 .1rem 0 0 #FFF, 0 .1rem .2rem #666;
      text-shadow: 0 .1rem .1rem #FFF;
      background-color: #E6E6E6;
      background-image: -webkit-linear-gradient(top, #F3F3F3, #D7D7D7);
    }
  
    #pagination i {
      margin: 0 .3rem 0 .3rem;
    }
  
    #pagination a.current {
      border: .1rem solid #E9E9E9;
      box-shadow: 0 .1rem .1rem #999;
      background-color: #DFDFDF;
      background-image: -webkit-linear-gradient(top, #D0D0D0, #EBEBEB);
    }
    `;
  }
}
