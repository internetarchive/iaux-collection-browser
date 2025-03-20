import { css, html, LitElement, CSSResultGroup, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mediatypeConfig } from '../../mediatype/mediatype-config';
import type { SmartFacet, SmartFacetEvent } from './models';

function capitalize(str?: string): string | undefined {
  if (!str) return str;
  return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}

@customElement('smart-facet-button')
export class SmartFacetButton extends LitElement {
  @property({ type: Object }) facetInfo?: SmartFacet;

  @property({ type: String }) labelPrefix?: string;

  @property({ type: Boolean }) selected = false;

  //
  // COMPONENT LIFECYCLE METHODS
  //

  render() {
    if (!this.facetInfo) return nothing;

    const isSingleFacet = this.facetInfo.facets.length === 1;
    const firstFacet = this.facetInfo.facets[0];

    const displayText = capitalize(
      (this.labelPrefix ? `${this.labelPrefix} ` : '') +
        (this.facetInfo.label ??
          firstFacet.displayText ??
          firstFacet.bucketKey),
    );
    if (!displayText) return nothing;

    const icon =
      isSingleFacet && firstFacet.facetType === 'mediatype'
        ? mediatypeConfig[firstFacet.bucketKey].icon
        : nothing;

    return html`
      <a
        class="smart-facet-button ${this.selected ? 'selected' : ''}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${icon} ${displayText}
        ${this.selected
          ? html`<span style="margin-left: 5px;">×</span>`
          : nothing}
      </a>
    `;
  }

  //
  // OTHER METHODS
  //

  private get href(): string {
    const url = new URL(window.location.href);
    if (this.facetInfo) {
      for (const facet of this.facetInfo.facets) {
        url.searchParams.append(
          'and[]',
          encodeURIComponent(`${facet.facetType}:"${facet.bucketKey}"`),
        );
      }
    }
    return url.toString();
  }

  private facetClicked(e: Event): void {
    e.preventDefault();
    if (!this.facetInfo) return;

    this.selected = !this.selected;

    this.dispatchEvent(
      new CustomEvent<SmartFacetEvent>('facetClick', {
        detail: {
          smartFacet: this.facetInfo,
          details: this.facetInfo.facets.map(f => ({
            facetType: f.facetType,
            bucket: {
              key: f.bucketKey,
              count: 0,
              state: this.selected ? 'selected' : 'none',
            },
            negative: false,
          })),
        },
      }),
    );
  }

  //
  // STYLES
  //

  static get styles(): CSSResultGroup {
    return css`
      .smart-facet-button {
        padding: 5px 10px;
        border-radius: 15px;
        background: #194880;
        color: white;
        font-size: 1.6rem;
        font-family: inherit;
        text-decoration: none;
        box-shadow: 1px 1px rgba(0, 0, 0, 0.4);
      }

      .smart-facet-button.selected {
        background: #4c76aa;
      }

      .smart-facet-button > svg {
        width: 15px;
        filter: invert(1);
        vertical-align: text-top;
      }
    `;
  }
}
