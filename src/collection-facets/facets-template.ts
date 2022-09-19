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
  defaultSelectedFacets,
} from '../models';

@customElement('facets-template')
export class FacetsTemplate extends LitElement {
  @property({ type: Object }) facetGroup?: FacetGroup;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: String }) renderOn?: string;

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
      newFacets = defaultSelectedFacets;
    }
    newFacets[key][value] = {
      state: negative ? 'hidden' : 'selected',
      count,
    };

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
                : html`<a href="/details/${bucket.key}">
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
                <div
                  for=${showOnlyCheckboxId}
                  class="facet-info-display"
                  title=${onlyShowText}
                >
                  <div class="facet-title">${bucketTextDisplay}</div>
                  <div class="facet-count">${bucket.count}</div>
                </div>
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
      .facets-on-modal {
        /* For Chrome, Safari, Opera browsers */
        -webkit-column-width: 100px;
        /* For Firefox browser */
        -moz-column-width: 100px;
        column-width: 25rem;
        column-gap: 15px;
      }
      .facets-on-page .select-facet-checkbox {
        margin-left: 0;
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
        display: inline-block;
        align-items: baseline;
      }
      .facet-row {
        display: flex;
        font-weight: 500;
        font-size: 1.2rem;
      }
      .facet-info-display {
        display: flex;
        flex: 1 1 0%;
        cursor: pointer;
        flex-wrap: wrap;
        align-content: center;
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
