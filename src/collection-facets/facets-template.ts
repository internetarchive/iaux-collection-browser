/* eslint-disable import/no-duplicates */
import {
  css,
  html,
  LitElement,
  PropertyValues,
  nothing,
  TemplateResult,
  CSSResultGroup,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type {
  Aggregation,
} from '@internetarchive/search-service';
import eyeIcon from './../assets/img/icons/eye';
import eyeClosedIcon from './../assets/img/icons/eye-closed';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import { FacetGroup, FacetBucket, FacetOption, SelectedFacets, defaultSelectedFacets } from '../models';
// import type { FacetBucket } from '../../dist/src/models';

@customElement('facets-template')
export class FacetsTemplate extends LitElement {
  @property({ type: Object }) facetGroup?: any;
  
  @property({ type: String }) facetKey?: any;
  @property({ type: String }) facetTitle?: any;
  @property({ type: Object }) facetBucket?: any;
  // @property({ type: Object }) selectedFacets?: any;
  @property({ type: Object }) selectedFacets?: SelectedFacets;

 
  @property({ type: String }) type = 'page';
  @property({ type: Number }) pageNumber = 1;
  @property({ type: Number }) facetsPerPage = 60;

  @property({ type: Object }) collectionNameCache?: CollectionNameCacheInterface;

  @state() aggregations?: Record<string, Aggregation>;

  render() {
    // console.log(this.facetGroup)
    console.log(this.selectedFacets);
    return html`<div>${this.getFacetsTemplate(this.facetGroup)}</div>`;
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


  private getFacetsTemplate(facetGroup: FacetGroup): TemplateResult {
    let facetsBucket = facetGroup?.buckets?.filter(
      bucket => bucket.key.startsWith('fav-') === false
    );

    // console.log(this.selectedFacets[facetGroup.key])
    // window.value = this.selectedFacets;
    return html`
      <ul class="facet-list">
        ${repeat(
          facetsBucket,
          bucket => `${facetGroup.key}:${bucket.key}`,
          bucket => {
            const showOnlyCheckboxId = `${facetGroup.key}:${bucket.key}-show-only`;
            const negativeCheckboxId = `${facetGroup.key}:${bucket.key}-negative`;

            // for collections, we need to asynchronously load the collection name
            // so we use the `async-collection-name` widget and for the rest, we have
            // a static value to use
            const bucketTextDisplay =
              facetGroup.key !== 'collection'
                ? html`${bucket.displayText ?? bucket.key}`
                : html`
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${bucket.key}
                      placeholder="-"
                    ></async-collection-name>
                  `;

            // 
            // this.currentSelectedFacets;

            // let selectedFacet = {} as object
            // Object.entries(this.selectedFacets as SelectedFacets).map(
            //   ([key, selectedFacets]) => {
            //     if (key === facetGroup.key) {
            //       // selectedFacet = selectedFacets;
            //       const buckets = Object.entries(selectedFacets).map(
            //         ([value, facetState]) => {
            //           let displayText = value;
            //         }
            //       );
            //     }
            //   }
            // );
            

            const facetHidden = bucket.state === 'hidden';
            const facetSelected = bucket.state === 'selected';

            console.log(facetHidden, facetSelected)
            const titleText = `${facetGroup.key}: ${
              bucket.displayText ?? bucket.key
            }`;
            const onlyShowText = facetSelected
              ? `Show all ${facetGroup.key}s`
              : `Only show ${titleText}`;
            const hideText = `Hide ${titleText}`;
            const unhideText = `Unhide ${titleText}`;
            const showHideText = facetHidden ? unhideText : hideText;

            return html`
              <li>
                <div class="facet-row">
                  <div class="facet-checkbox">
                    <input
                      type="checkbox"
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e: Event) => {
                        this.facetClicked(e, bucket, false);
                      }}
                      .checked=${facetSelected}
                      class="select-facet-checkbox"
                      title=${onlyShowText}
                      id=${showOnlyCheckboxId}
                    />
                    <input
                      type="checkbox"
                      id=${negativeCheckboxId}
                      .name=${facetGroup.key}
                      .value=${bucket.key}
                      @click=${(e: Event) => {
                        this.facetClicked(e, bucket, true);
                      }}
                      .checked=${facetHidden}
                      class="hide-facet-checkbox"
                    />
                    <label
                      for=${negativeCheckboxId}
                      class="hide-facet-icon${facetHidden ? ' active' : ''}"
                      title=${showHideText}
                    >
                      <span class="eye">${eyeIcon}</span>
                      <span class="eye-closed">${eyeClosedIcon}</span>
                    </label>
                  </div>

                  <label
                    for=${showOnlyCheckboxId}
                    class="facet-info-display"
                    title=${onlyShowText}
                  >
                    <div class="facet-title">${bucketTextDisplay}</div>
                    <div class="facet-count">${bucket.count}</div>
                  </label>
                </div>
              </li>
            `;
          }
        )}
      </ul>
    `;
  }

  private facetClicked(e: Event, bucket: FacetBucket, negative: boolean) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name as FacetOption, value, negative);
    } else {
      this.facetUnchecked(name as FacetOption, value);
    }
  }

  private facetChecked(key: FacetOption, value: string, negative: boolean) {
    const { selectedFacets } = this;
    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = defaultSelectedFacets;
    }
    newFacets[key][value] = negative ? 'hidden' : 'selected';
    console.log('facetChecked', this.selectedFacets)


    this.selectedFacets = newFacets;
    this.dispatchSelectedFacetsChanged();
  }

  private facetUnchecked(key: FacetOption, value: string) {
    const { selectedFacets } = this;
    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = defaultSelectedFacets;
    }
    delete newFacets[key][value];
    console.log('facetUnchecked', this.selectedFacets)

    this.selectedFacets = newFacets;
    this.dispatchSelectedFacetsChanged();
  }

  private dispatchSelectedFacetsChanged() {
    const event = new CustomEvent<SelectedFacets>('selectedFacetsChanged', {
      detail: this.selectedFacets,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
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

      ul.facet-list li {
        margin-bottom: 0.2rem;
      }

      .facet-checkbox {
        margin-right: 0.5rem;
        display: flex;
        align-items: center;
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

      .select-facet-checkbox {
        cursor: pointer;
        margin-right: 5px;
      }

      .hide-facet-checkbox {
        display: none;
      }

      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
        opacity: 0.3;
      }
      .hide-facet-icon:hover,
      .active {
        opacity: 1;
      }
      .hide-facet-icon:hover .eye,
      .hide-facet-icon .eye-closed {
        display: none;
      }
      .hide-facet-icon:hover .eye-closed,
      .hide-facet-icon.active .eye-closed {
        display: inline;
      }
      .hide-facet-icon.active .eye {
        display: none;
      }
      .sorting-icon {
        cursor: pointer;
      }
    `;
  }
}
