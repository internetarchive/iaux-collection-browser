var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import './facet-row';
let FacetsTemplate = class FacetsTemplate extends LitElement {
    facetClicked(e) {
        this.dispatchFacetClickEvent(e.detail);
    }
    dispatchFacetClickEvent(detail) {
        const event = new CustomEvent('facetClick', {
            detail,
            composed: true,
        });
        this.dispatchEvent(event);
    }
    get facetsTemplate() {
        const { facetGroup } = this;
        if (!facetGroup)
            return nothing;
        const facetBuckets = facetGroup.buckets;
        const isLoneBucket = facetBuckets.length === 1;
        // Added data-testid for Playwright testing
        // Using className and aria-labels is not ideal for Playwright locator
        return html `
      <div class="facet-rows" data-testid="facets-on-${facetGroup.key}">
        ${repeat(facetBuckets, bucket => `${facetGroup.key}:${bucket.key}`, bucket => html `<facet-row
              .facetType=${facetGroup.key}
              .extraFacetGroups=${this.extraFacetGroups}
              .bucket=${bucket}
              .collectionTitles=${this.collectionTitles}
              ?omitHideButton=${isLoneBucket}
              @facetClick=${this.facetClicked}
            ></facet-row>`)}
      </div>
    `;
    }
    render() {
        return html `${this.facetsTemplate}`;
    }
    static get styles() {
        const columnCount = css `var(--facetsColumnCount, 1)`;
        const columnGap = css `var(--facetsColumnGap, 15px)`;
        return css `
      .facet-rows {
        column-count: ${columnCount};
        column-gap: ${columnGap};
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
};
__decorate([
    property({ type: Object })
], FacetsTemplate.prototype, "facetGroup", void 0);
__decorate([
    property({ type: Object })
], FacetsTemplate.prototype, "collectionTitles", void 0);
__decorate([
    property({ type: Array, attribute: false })
], FacetsTemplate.prototype, "extraFacetGroups", void 0);
FacetsTemplate = __decorate([
    customElement('facets-template')
], FacetsTemplate);
export { FacetsTemplate };
