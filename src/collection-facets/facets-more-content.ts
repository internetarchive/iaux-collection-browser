import { css, CSSResultGroup, html, LitElement, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import {
  FacetOption,
  SelectedFacets,
  FacetGroup,
  FacetBucket,
  defaultSelectedFacets,
} from '../models';

@customElement('facets-more-content')
export class FacetsMoreContent extends LitElement {
  @property({ type: String }) content?: string;

  @property({ type: String }) query?: string;

  @property({ type: Boolean }) showMoreContent = false;

  @property({ type: Array }) options = [];

  @property({ type: Object }) aggr = [];

  constructor() {
    super();
    console.log(this.query)
    // this.fetchFacetOptions();
    // this.context = options.context;
  }

  updated(changed: PropertyValues) {
    if (changed.has('query') || changed.has('aggr')) {
      console.log(this.aggr);
      // this.fetchFacetOptions();
    }
  }

  async fetchFacetOptions() {
    var data1: (string | undefined)[] = [];
    try {
      console.log('this.query', this.query);

      // aggr

      Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
        console.log('key', key)
        if (key != 'year_histogram') {
          var parts = key.split('__');
          var fieldNamePart = parts[2];
          console.log('fieldNamePart', fieldNamePart)
          var fieldName = fieldNamePart.split(':')[1];
          console.log('fieldName', fieldName)
          var facetMatch = Object.entries({
            subjectSorter: 'subject',
            mediatypeSorter: 'mediatype',
            languageSorter: 'language',
            creatorSorter: 'creator',
            collection: 'collection',
            year: 'year',
          }).find(([key2]) =>
            fieldName.includes(key2)
          );
          var option = facetMatch?.[1];
          data1.push(option);
          // if (!option) throw new Error(`Could not find facet option for key: ${key}`);
          // return option;
        }
      });

      console.log(data1)
      return data1;
      // https://archive.org/search.php?query=mediatype%3Atexts&and[]=year%3A%222015%22&and[]=languageSorter%3A%22French%22&and[]=creator%3A%22islam+sphere%22&headless=1&facets_xhr=facets&morf=subject&headless=1&output=json
      // this.options = await fetch(`https://archive.org/search.php?query=mediatype%3Atexts&and%5B%5D=creator%3A%22islam+sphere%22&headless=1&facets_xhr=facets&output=json&morf=${this.query}&headless=1&output=json`)
      this.options = await fetch(`https://archive.org/advancedsearch.php?q=title%3Ajaipur&output=json&rows=1&fl=identifier&user_aggs=${this.query}`
      ).then(response => {
          return response.json();
        })
        .then(data => {
          console.log(data)
          console.log(data.response)
          console.log(data.response.aggregations)
          
          Object.entries(data.response.aggregations ?? []).forEach(([key, buckets]) => {
            console.log('key', key)
            if (key != 'year_histogram') {
              var parts = key.split('__');
              var fieldNamePart = parts[2];
              console.log('fieldNamePart', fieldNamePart)
              var fieldName = fieldNamePart.split(':')[1];
              console.log('fieldName', fieldName)
              var facetMatch = Object.entries({
                subjectSorter: 'subject',
                mediatypeSorter: 'mediatype',
                languageSorter: 'language',
                creatorSorter: 'creator',
                collection: 'collection',
                year: 'year',
              }).find(([key2]) =>
                fieldName.includes(key2)
              );
              var option = facetMatch?.[1];
              data1.push(option);
              // if (!option) throw new Error(`Could not find facet option for key: ${key}`);
              // return option;
            }
          });

          console.log(data1)
          return data1;
          // console.log(data.response.aggregations.user_aggs__terms__field:year__size:25)
          return data;
        });
    } catch (err) {
      console.log(err)
    }
  }

  closeClicked() {
    this.showMoreContent = false;
    // console.log('here')
  }

  private emitMoreFacetsCloseClickedEvent() {
    this.showMoreContent = false;

    // console.log(e)
    const event = new CustomEvent('moreFacetsClosed', {
      // detail: facetGroup,
    });
    // this.dispatchEvent(event);
  }

  private get itemsTemplate() {
    return html`d`;
    // const options = this.options.map((option, n) => {
    //   const displayValue = option.txt ? option.txt : option.val
    //   const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'

    //   if (this.item === option.val) {
    //     return html``
    //   }

    //   return html`
    //     <div class="${optionWrapperClass}">
    //       <div class="facell">
    //         <input
    //           type="checkbox"
    //           ?checked=${this.checked[option.val]}
    //           name="${option.val}"
    //           value="${option.val}"
    //         />
    //       </div>
    //       <div class="facell">
    //         ${add_commas(option.n)}
    //       </div>
    //       <div class="facell">
    //         ${this.href.match(/morf=collection$/)
    // /**/      ? html`<a href="/details/${option.val}">${displayValue}</a>`
    // /**/      : html`${displayValue}`}
    //       </div>
    //     </div>`
    // })

    // return options;
  }

  render() {
    // console.log(this.options);
    const loadnote = (true
      ? html`<div class="loading">loading filters... <img alt="" src="/images/loading.gif"/></div>`
      : '');


    const paging: unknown = []
    // const npages = (Math.ceil(this.options.length / FACETS_PER_PAGE))
    // const loadnote = (loading
    //   ? html`<div class="loading">loading filters... <img alt="" src="/images/loading.gif"/></div>`
    //   : '')
    // if (!loading) {
    //   let page = 1
    //   for (page = 1; page <= npages; page++) {
    //     if (this.page === page)
    //       paging.push(html`<div class="topinblock">${page}</div>`)
    //     else
    //       paging.push(html`<a href="#${page}" @click="${this.pageClick}">${page}</a>`)
    //     paging.push(html` `)
    //   }
    //   if (this.page < npages) {
    //     paging.push(html`
    //       <a href="#${1 + this.page}" @click="${this.pageClick}" data-action="pager_next">
    //         <span class="iconochive-right-solid" />
    //       </a>`)
    //   }
    // }

    return html`
      <section
        class="facets-more-content ${this.showMoreContent ? 'show' : 'hide'}"
      >
        <div id="morf-page">
          <form>
            <div class="fatable"> 
              ${this.itemsTemplate}
            </div>
            ${loadnote}
            <div id="morf-paging">
              ${paging}
            </div>
            <center>
              <input class="btn '{loading ? 'btn-archive hidden' : 'btn-archive'}" type="button"
                value="Apply your filters" @click='{this.submitClick}' />
            </center>
          </form>
        </div>
      </section>
    `;
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
    `;
  }
}
