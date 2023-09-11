import {
  css,
  html,
  LitElement,
  TemplateResult,
  CSSResultGroup,
  nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import {
  FacetGroup,
  FacetOption,
  FacetBucket,
  SelectedFacets,
  getDefaultSelectedFacets,
  FacetEventDetails,
  FacetState,
} from '../models';
import './facet-row';

@customElement('facets-template')
export class FacetsTemplate extends LitElement {
  @property({ type: Object }) facetGroup?: FacetGroup;

  @property({ type: Object }) selectedFacets?: SelectedFacets;

  @property({ type: String }) renderOn?: string;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  private facetClicked(e: CustomEvent<FacetEventDetails>) {
    const { facetType, bucket, negative } = e.detail;
    if (bucket.state === 'none') {
      this.facetUnchecked(facetType, bucket.key);
    } else {
      this.facetChecked(facetType, bucket.key, bucket.count, negative);
    }

    this.dispatchFacetClickEvent({
      facetType,
      bucket,
      negative,
    });
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

  private dispatchFacetClickEvent(detail: FacetEventDetails) {
    const event = new CustomEvent<FacetEventDetails>('facetClick', {
      detail,
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

  private get facetsTemplate(): TemplateResult | typeof nothing {
    const { facetGroup } = this;
    if (!facetGroup) return nothing;

    let facetBuckets = facetGroup.buckets as FacetBucket[];

    /**
     * sorting FacetBucket before render page / modal
     * - first, selected items should be at top having sorted
     * - second, suppressed/hidden items should be after selected having sorted
     * - and then no-selected / not suppressed items should render having sorted
     */
    facetBuckets = [
      ...facetBuckets
        .filter(x => x.state === 'selected')
        .sort((a, b) => (a.count < b.count ? 1 : -1)),
      ...facetBuckets
        .filter(x => x.state === 'hidden')
        .sort((a, b) => (a.count < b.count ? 1 : -1)),
      ...facetBuckets.filter(x => x.state === 'none'),
    ];

    return html`
      <div class="facets-on-${this.renderOn}">
        ${repeat(
          facetBuckets,
          bucket => `${facetGroup.key}:${bucket.key}`,
          bucket => html`<facet-row
            .facetType=${facetGroup.key}
            .bucket=${bucket}
            .collectionNameCache=${this.collectionNameCache}
            @facetClick=${this.facetClicked}
          ></facet-row>`
        )}
      </div>
    `;
  }

  render() {
    return html`${this.facetsTemplate}`;
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

      ul.facet-list {
        list-style: none;
        margin: 0;
        padding: 0;
      }
      ul.facet-list li {
        margin-bottom: 0.2rem;
        display: grid;
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
