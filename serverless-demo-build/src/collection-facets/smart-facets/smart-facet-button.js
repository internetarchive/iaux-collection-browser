var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { mediatypeConfig, } from '../../mediatype/mediatype-config';
import closeCircleDark from '../../assets/img/icons/close-circle-dark';
function capitalize(str) {
    if (!str)
        return str;
    return str.charAt(0).toLocaleUpperCase() + str.slice(1);
}
let SmartFacetButton = class SmartFacetButton extends LitElement {
    constructor() {
        super(...arguments);
        this.selected = false;
    }
    //
    // COMPONENT LIFECYCLE METHODS
    //
    render() {
        if (!this.facetInfo)
            return nothing;
        const isSingleFacet = this.facetInfo.facets.length === 1;
        const firstFacet = this.facetInfo.facets[0];
        const displayText = capitalize((this.labelPrefix ? `${this.labelPrefix} ` : '') +
            (this.facetInfo.label ??
                firstFacet.displayText ??
                firstFacet.bucketKey));
        if (!displayText)
            return nothing;
        const icon = isSingleFacet && firstFacet.facetType === 'mediatype'
            ? mediatypeConfig[firstFacet.bucketKey].icon
            : nothing;
        return html `
      <a
        class="smart-facet-button ${this.selected ? 'selected' : ''}"
        href=${this.href}
        @click=${this.facetClicked}
      >
        ${icon} ${displayText}
        ${this.selected
            ? html `<span class="unselect-button">${closeCircleDark}</span>`
            : nothing}
      </a>
    `;
    }
    //
    // OTHER METHODS
    //
    get href() {
        const url = new URL(window.location.href);
        if (this.facetInfo) {
            for (const facet of this.facetInfo.facets) {
                url.searchParams.append('and[]', encodeURIComponent(`${facet.facetType}:"${facet.bucketKey}"`));
            }
        }
        return url.toString();
    }
    facetClicked(e) {
        e.preventDefault();
        if (!this.facetInfo)
            return;
        this.selected = !this.selected;
        this.dispatchEvent(new CustomEvent('facetClick', {
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
        }));
    }
    //
    // STYLES
    //
    static get styles() {
        return css `
      .smart-facet-button {
        display: inline-flex;
        align-items: center;
        column-gap: 5px;
        padding: 5px 5px;
        border-radius: 5px;
        background: white;
        color: #2c2c2c;
        border: 1px solid #194880;
        font-size: 1.4rem;
        font-family: inherit;
        line-height: normal;
        text-decoration: none;
      }

      .smart-facet-button.selected {
        background: #194880;
        color: white;
      }

      .unselect-button > svg {
        width: 10px;
        height: 10px;
        filter: invert(1);
      }

      .smart-facet-button > svg {
        width: 12px;
        height: 12px;
        filter: invert(0.16667);
      }

      .smart-facet-button.selected > svg {
        filter: invert(1);
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], SmartFacetButton.prototype, "facetInfo", void 0);
__decorate([
    property({ type: String })
], SmartFacetButton.prototype, "labelPrefix", void 0);
__decorate([
    property({ type: Boolean })
], SmartFacetButton.prototype, "selected", void 0);
SmartFacetButton = __decorate([
    customElement('smart-facet-button')
], SmartFacetButton);
export { SmartFacetButton };
