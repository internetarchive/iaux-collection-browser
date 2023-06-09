import { css, html, LitElement, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import eyeIcon from '../assets/img/icons/eye';
import eyeClosedIcon from '../assets/img/icons/eye-closed';
import {
  FacetGroup,
  FacetOption,
  FacetBucket,
  SelectedFacets,
  getDefaultSelectedFacets,
  FacetEventDetails,
  FacetState,
} from '../models';

@customElement('facets-template')
export class FacetsTemplate extends LitElement {
  @property({ type: Object }) facetGroup?: FacetGroup;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: String }) renderOn?: string;

  @property({ type: String }) collectionPagePath: string = '/details/';

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  private facetClicked(e: Event, count: number, negative: boolean) {
    const target = e.target as HTMLInputElement;
    const { checked, name, value } = target;
    if (checked) {
      this.facetChecked(name as FacetOption, value, count, negative);
    } else {
      this.facetUnchecked(name as FacetOption, value);
    }

    this.dispatchFacetClickEvent(
      name as FacetOption,
      this.getFacetState(checked, negative),
      negative
    );
  }

  private facetChecked(
    key: FacetOption,
    value: string,
    count: number,
    negative: boolean
  ) {
    const { selectedFacets } = this;
    let newFacets: SelectedFacets;
    if (selectedFacets) {
      newFacets = {
        ...selectedFacets,
      };
    } else {
      newFacets = getDefaultSelectedFacets();
    }
    newFacets[key][value] = {
      state: this.getFacetState(true, negative),
      count,
    } as FacetBucket;

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
      newFacets = getDefaultSelectedFacets();
    }
    delete newFacets[key][value];

    this.selectedFacets = newFacets;
    this.dispatchSelectedFacetsChanged();
  }

  /** Returns the composed facet state corresponding to a positive or negative facet's checked state */
  private getFacetState(checked: boolean, negative: boolean): FacetState {
    let state: FacetState;
    if (checked) {
      state = negative ? 'hidden' : 'selected';
    } else {
      state = 'none';
    }
    return state;
  }

  private dispatchFacetClickEvent(
    key: FacetOption,
    state: FacetState,
    negative: boolean
  ) {
    const event = new CustomEvent<FacetEventDetails>('facetClick', {
      detail: { key, state, negative },
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private dispatchSelectedFacetsChanged() {
    const event = new CustomEvent<SelectedFacets>('selectedFacetsChanged', {
      detail: this.selectedFacets,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private getFacetsTemplate(facetGroup: FacetGroup): TemplateResult {
    let facetsBucket = facetGroup?.buckets as FacetBucket[];

    /**
     * sorting FacetBucket before render page / modal
     * - first, selected items should be at top having sorted
     * - second, suppressed/hidden items should be after selected having sorted
     * - and then no-selected / not suppressed items should render having sorted
     */
    facetsBucket = [
      ...facetsBucket
        .filter(x => x.state === 'selected')
        .sort((a, b) => (a.count < b.count ? 1 : -1)),
      ...facetsBucket
        .filter(x => x.state === 'hidden')
        .sort((a, b) => (a.count < b.count ? 1 : -1)),
      ...facetsBucket.filter(x => x.state === 'none'),
    ];

    return html`
      <div class="facets-on-${this.renderOn}">
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
                : html`<a href="${this.collectionPagePath}${bucket.key}">
                    <async-collection-name
                      .collectionNameCache=${this.collectionNameCache}
                      .identifier=${bucket.key}
                      placeholder="-"
                    ></async-collection-name>
                  </a> `;
            const facetHidden = bucket.state === 'hidden';
            const facetSelected = bucket.state === 'selected';
            const titleText = `${facetGroup.key}: ${
              bucket.displayText ?? bucket.key
            }`;
            const onlyShowText = facetSelected
              ? `Show all ${facetGroup.key}s`
              : `Only show ${titleText}`;
            const hideText = `Hide ${titleText}`;
            const unhideText = `Unhide ${titleText}`;
            const showHideText = facetHidden ? unhideText : hideText;
            const ariaLabel = `${titleText}, ${bucket.count} results`;
            return html`
              <div class="facet-row">
                <div class="facet-checkbox">
                  <input
                    type="checkbox"
                    .name=${facetGroup.key}
                    .value=${bucket.key}
                    @click=${(e: Event) => {
                      this.facetClicked(e, bucket.count, false);
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
                      this.facetClicked(e, bucket.count, true);
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
                  aria-label=${ariaLabel}
                >
                  <div class="facet-title">${bucketTextDisplay}</div>
                  <div class="facet-count">
                    ${bucket.count.toLocaleString()}
                  </div>
                </label>
              </div>
            `;
          }
        )}
      </div>
    `;
  }

  render() {
    return html`${this.getFacetsTemplate(this.facetGroup as FacetGroup)}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      @media (max-width: 560px) {
        .facets-on-modal {
          column-count: 1 !important;
        }
      }
      .facets-on-modal {
        column-gap: 15px;
        column-count: 3;
      }
      async-collection-name {
        display: contents;
      }
      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul.facet-list li {
        margin-bottom: 0.2rem;
        display: grid;
      }
      .facet-checkbox {
        margin: 0 5px 0 0;
        display: flex;
        height: 15px;
      }
      .facet-checkbox input:first-child {
        margin-right: 5px;
      }
      .facet-checkbox input {
        height: 15px;
        width: 15px;
        margin: 0;
      }
      .facet-row {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
        margin: 2.5px auto;
        height: auto;
        border-top: var(--facet-row-border-top, 1px solid transparent);
        border-bottom: var(--facet-row-border-bottom, 1px solid transparent);
        overflow: hidden;
      }
      .facet-info-display {
        display: flex;
        flex: 1 1 0%;
        cursor: pointer;
        flex-wrap: wrap;
      }
      .facet-title {
        word-break: break-word;
        display: inline-block;
        flex: 1 1 0%;
      }
      .facet-count {
        text-align: right;
      }
      .select-facet-checkbox {
        cursor: pointer;
        display: inline-block;
      }
      .hide-facet-checkbox {
        display: none;
      }
      .hide-facet-icon {
        width: 15px;
        height: 15px;
        cursor: pointer;
        opacity: 0.3;
        display: inline-block;
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

      a:link,
      a:visited {
        text-decoration: none;
        color: var(--ia-theme-link-color, #4b64ff);
      }
      a:hover {
        text-decoration: underline;
      }
    `;
  }
}
