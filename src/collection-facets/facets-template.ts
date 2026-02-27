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
import type { FacetGroup, FacetBucket, FacetEventDetails } from '../models';
import type { CollectionTitles } from '../data-source/models';
import './facet-row';

@customElement('facets-template')
export class FacetsTemplate extends LitElement {
  @property({ type: Object }) facetGroup?: FacetGroup;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  private facetClicked(e: CustomEvent<FacetEventDetails>) {
    this.dispatchFacetClickEvent(e.detail);
  }

  private dispatchFacetClickEvent(detail: FacetEventDetails) {
    const event = new CustomEvent<FacetEventDetails>('facetClick', {
      detail,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  private get facetsTemplate(): TemplateResult | typeof nothing {
    const { facetGroup } = this;
    if (!facetGroup) return nothing;

    const facetBuckets = facetGroup.buckets as FacetBucket[];

    // Added data-testid for Playwright testing
    // Using className and aria-labels is not ideal for Playwright locator
    return html`
      <div class="facet-rows" data-testid="facets-on-${facetGroup.key}">
        ${repeat(
          facetBuckets,
          bucket => `${facetGroup.key}:${bucket.key}`,
          bucket =>
            html`<facet-row
              .facetType=${facetGroup.key}
              .bucket=${bucket}
              .collectionTitles=${this.collectionTitles}
              @facetClick=${this.facetClicked}
            ></facet-row>`,
        )}
      </div>
    `;
  }

  render() {
    return html`${this.facetsTemplate}`;
  }

  static get styles(): CSSResultGroup {
    const columnCount = css`var(--facetsColumnCount, 1)`;
    const columnGap = css`var(--facetsColumnGap, 15px)`;
    const columnWidth = css`var(--facetsColumnWidth, auto)`;
    const maxHeight = css`var(--facetsMaxHeight, none)`;

    return css`
      .facet-rows {
        column-count: ${columnCount};
        column-gap: ${columnGap};
        column-width: ${columnWidth};
        max-height: ${maxHeight};
        column-fill: auto;
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
