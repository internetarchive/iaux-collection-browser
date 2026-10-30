var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@a11y/focus-trap';
import { suppressedCollections } from '../../models';
import '../list/tile-list';
let TileHoverPane = class TileHoverPane extends LitElement {
    constructor() {
        super(...arguments);
        this.loggedIn = false;
        this.suppressBlurring = false;
    }
    render() {
        return html `
      <div id="container">
        <focus-trap>
          ${this.headerTemplate}
          <div id="hover-tile-list">
            <tile-list
              .model=${this.model}
              .baseNavigationUrl=${this.baseNavigationUrl}
              .baseImageUrl=${this.baseImageUrl}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .sortParam=${this.sortParam}
              .collectionTitles=${this.collectionTitles}
              .mobileBreakpoint=${this.mobileBreakpoint}
              .currentWidth=${this.currentWidth}
            ></tile-list>
          </div>
        </focus-trap>
      </div>
    `;
    }
    get headerTemplate() {
        // early return if item does't have parent collection
        if (this.model?.collections?.length === 0)
            return nothing;
        let collectionTitle = '';
        let collectionIdentifier = '';
        for (const collection of this.model?.collections || []) {
            if (!suppressedCollections[collection] &&
                !collection.startsWith('fav-')) {
                collectionTitle = this.collectionTitles?.get(collection) ?? collection;
                collectionIdentifier = collection;
                break;
            }
        }
        // sometimes item does have collections but they are in suppressed or favorite list,
        // let's not render that
        if (!collectionIdentifier)
            return nothing;
        return html `
      <div id="list-line-header">
        <a href="${this.baseNavigationUrl}/details/${collectionIdentifier}">
          <img
            src="${this.baseImageUrl}/services/img/${collectionIdentifier}"
            alt=""
          /><span>${collectionTitle}</span>
        </a>
      </div>
    `;
    }
    static get styles() {
        const hoverPaneHeaderBGColor = css `var(--hoverPaneHeaderBGColor, #edf0ff)`;
        const iaLinkColor = css `var(--ia-theme-link-color, #4b64ff)`;
        const iaFontFamily = css `var(--ia-theme-base-font-family, "Helvetica Neue", Helvetica, Arial, sans-serif);`;
        return css `
      :host {
        margin: 0;
        border: 0;
        padding: 0;
        overflow: visible;
        color: inherit;
        background: none;
        visibility: hidden;
        opacity: 0;
        transform: translateY(8px);
        transition:
          opacity 0.1s ease-in,
          transform 0.1s ease-in;
        --image-width: auto;
      }

      :host(.visible) {
        visibility: visible;
      }

      :host(.fade-in) {
        opacity: 1;
        transform: translateY(0);
      }

      @media (prefers-reduced-motion: reduce) {
        :host {
          transition-duration: 0.001s !important; /* Imperceptibly fast */
        }
      }

      #container {
        width: max-content;
        max-width: min(45vw, 600px);
        border: 1px solid #ddd;
        border-radius: 4px;
        box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.8);
        background: white;
      }

      @media screen and (max-width: 600px) {
        #container {
          max-width: 80vw;
        }
      }

      /* main tile-list container */
      #hover-tile-list {
        padding: 10px;
      }

      /* header on hover panel to show collection icon and title */
      #list-line-header {
        background: ${hoverPaneHeaderBGColor};
      }
      #list-line-header a {
        display: flex;
        align-items: center;
        column-gap: 5px;
        height: 3.4rem;
        padding: 0 10px;
        border-radius: 4px 4px 0 0;
        width: fit-content;
        font-size: 1.4rem;
        color: ${iaLinkColor};
        font-family: ${iaFontFamily};
        text-decoration: none;
        width: auto;
      }
      #list-line-header a span {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      #list-line-header a:hover {
        text-decoration: underline;
      }
      #list-line-header a img {
        width: 30px;
        max-height: 30px;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], TileHoverPane.prototype, "model", void 0);
__decorate([
    property({ type: String })
], TileHoverPane.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: String })
], TileHoverPane.prototype, "baseImageUrl", void 0);
__decorate([
    property({ type: Boolean })
], TileHoverPane.prototype, "loggedIn", void 0);
__decorate([
    property({ type: Boolean })
], TileHoverPane.prototype, "suppressBlurring", void 0);
__decorate([
    property({ type: Object })
], TileHoverPane.prototype, "sortParam", void 0);
__decorate([
    property({ type: Number })
], TileHoverPane.prototype, "mobileBreakpoint", void 0);
__decorate([
    property({ type: Number })
], TileHoverPane.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Object })
], TileHoverPane.prototype, "collectionTitles", void 0);
TileHoverPane = __decorate([
    customElement('tile-hover-pane')
], TileHoverPane);
export { TileHoverPane };
