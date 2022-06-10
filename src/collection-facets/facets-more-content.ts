import { css, CSSResultGroup, html, LitElement, nothing, PropertyValues, render, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import type {
  Aggregation,
  Bucket,
  Metadata,
  SearchParams,
  SearchServiceInterface,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';

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

  @property({ type: Array }) options = [];
  @property({ type: Object }) selectedFacets?: SelectedFacets;
  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: Object }) aggr = [];
  @property({ type: Object })
  languageCodeHandler?: LanguageCodeHandlerInterface;

  @property({ type: Object }) allFacetGroups?: FacetGroup[] = [];

  // @state() private options?: {};

  updated(changed: PropertyValues) {
    if (changed.has('query') || changed.has('aggr')) {
      // console.log('changed called in more-facets');

      // console.log(this.aggr)

      // this.renderMoreFacets;
    }
  }

  private renderMoreFacets() {
    return html`${Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
      // console.log(key, buckets)
      const castedBuckets = buckets['buckets'] as FacetBucket[];
      // console.log(castedBuckets)
      return repeat(
        castedBuckets,
        // bucket => `${facetGroup.key}:${bucket.key}`,
        option => {
          const displayValue = option.displayText ? option.displayText : option.key
          // const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'

          return html`
            <div class="">
              <div class="facell">
                <input
                  type="checkbox"
                  name="${option.key}"
                  value="${option.key}"
                />
              </div>
              <div class="facell">
                ${displayValue}
              </div>
              <div class="facell">
                <a href="/details/${option.key}">${option.displayText}</a>
              </div>
            </div>`;
        }
      )
      // castedBuckets.forEach(bucket => {
      //   const option = bucket;
      //   // console.log(option)
      //   // console.log(option.displayText);
      //   const displayValue = option.displayText ? option.displayText : option.key
      //   // const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'

      //   return html`
      //     <div class="">
      //       <div class="facell">
      //         <input
      //           type="checkbox"
      //           name="${option.key}"
      //           value="${option.key}"
      //         />
      //       </div>
      //       <div class="facell">
      //         ${displayValue}
      //       </div>
      //       <div class="facell">
      //         <a href="/details/${option.key}">${option.displayText}</a>
      //       </div>
      //     </div>`;
      // })
      // return facetBuckets;
    })}`
    // console.log(dd)
    // return dd; 
    // return 1
  }



  closeClicked() {
    this.showMoreContent = false;
    // console.log('here')
  }



  render() {

    const options = Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
      // console.log(key, buckets)
      const castedBuckets = buckets['buckets'] as FacetBucket[];
      // console.log(castedBuckets)
      repeat(
        castedBuckets,
        // bucket => `${facetGroup.key}:${bucket.key}`,
        option => {
          const displayValue = option.displayText ? option.displayText : option.key
          // const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'

          return html`
            <div class="">
              <div class="facell">
                <input
                  type="checkbox"
                  name="${option.key}"
                  value="${option.key}"
                />
              </div>
              <div class="facell">
                ${displayValue}
              </div>
              <div class="facell">
                <a href="/details/${option.key}">${option.displayText}</a>
              </div>
            </div>`;
        }
      )
    });
    const loadnote = (true
      ? html`<div class="loading">loading filters... <img alt="" src="/images/loading.gif"/></div>`
      : '');


    return html`
      <section
        class="facets-more-content ${this.showMoreContent ? 'show' : 'hide'}"
      >
        <div id="morf-page">
        <form>
        ${this.renderMoreFacets}

        ${
          Object.entries(this.aggr ?? []).forEach(([key, buckets]) => {
            // console.log(key, buckets)

            if (key === 'year_histogram') return;

            const castedBuckets = buckets['buckets'] as FacetBucket[];
            console.log(castedBuckets)

            castedBuckets.forEach(bucket => {
            const option = bucket;
            // console.log(option)
            // console.log(option.displayText);
            const displayValue = option.displayText ? option.displayText : option.key
            // const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'
            
            html`
              <div class="">
                <div class="facell">
                  <input
                    type="checkbox"
                    name="${option.key}"
                    value="${option.key}"
                  />
                </div>
                <div class="facell">
                  ${displayValue}
                </div>
                <div class="facell">
                  <a href="/details/${option.key}">${option.displayText}</a>
                </div>
              </div>`;
            })


          
            return repeat(
              castedBuckets,
              bucket => `${bucket.key}`,
              option => {
                const displayValue = option.displayText ? option.displayText : option.key
                // const optionWrapperClass = (n >= min && n <= max && !loading) ? 'farow' : 'farow hidden'
                console.log(displayValue)
                html`
                  <div class="">
                    <div class="facell">
                      <input
                        type="checkbox"
                        name="${option.key}"
                        value="${option.key}"
                      />
                    </div>
                    <div class="facell">
                      ${displayValue}
                    </div>
                    <div class="facell">
                      <a href="/details/${option.key}">${option.displayText}</a>
                    </div>
                  </div>`;
              }
            )
        })}

            
            ${loadnote}
            <div id="morf-paging">
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

      .fatable { /* xxx pull these rules out of archive.less if decide to pull "no JS" facets page.. */
  /**/-webkit-column-width: 250px;/*android*/
  /**/   -moz-column-width: 250px;/*firefox*/
  /**/        column-width: 250px;/*SUPERGREAT CSS3 FEATURE*/
  font-size: 12px;
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
  padding:7px 5px;
  margin-top:-7px;
  margin-bottom:-7px;
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

