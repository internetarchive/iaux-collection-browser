import { __decorate } from "tslib";
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './list/tile-list';
import './list/tile-list-compact';
import './list/tile-list-compact-header';
let TileDispatcher = class TileDispatcher extends LitElement {
    constructor() {
        super(...arguments);
        this.sortParam = null;
    }
    render() {
        return html `
      <div id="container">
        ${this.tileDisplayMode === 'list-header'
            ? this.headerTemplate
            : this.tileTemplate}
      </div>
    `;
    }
    get headerTemplate() {
        const { currentWidth, sortParam, mobileBreakpoint } = this;
        return html `
      <tile-list-compact-header
        class="header"
        .currentWidth=${currentWidth}
        .sortParam=${sortParam}
        .mobileBreakpoint=${mobileBreakpoint}
      >
      </tile-list-compact-header>
    `;
    }
    get tileTemplate() {
        return html `
      ${this.tileDisplayMode === 'list-detail'
            ? this.tile
            : this.linkTileTemplate}
    `;
    }
    get linkTileTemplate() {
        var _a, _b;
        return html `
      <a
        href="${this.baseNavigationUrl}/details/${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}"
        title=${ifDefined((_b = this.model) === null || _b === void 0 ? void 0 : _b.title)}
      >
        ${this.tile}
      </a>
    `;
    }
    handleResize(entry) {
        this.currentWidth = entry.contentRect.width;
        this.currentHeight = entry.contentRect.height;
    }
    disconnectedCallback() {
        this.stopResizeObservation(this.resizeObserver);
    }
    stopResizeObservation(observer) {
        observer === null || observer === void 0 ? void 0 : observer.removeObserver({
            handler: this,
            target: this.container,
        });
    }
    startResizeObservation() {
        var _a;
        this.stopResizeObservation(this.resizeObserver);
        (_a = this.resizeObserver) === null || _a === void 0 ? void 0 : _a.addObserver({
            handler: this,
            target: this.container,
        });
    }
    updated(props) {
        if (props.has('resizeObserver')) {
            const previousObserver = props.get('resizeObserver');
            this.stopResizeObservation(previousObserver);
            this.startResizeObservation();
        }
    }
    get tile() {
        const { model, baseNavigationUrl, currentWidth, currentHeight, sortParam, mobileBreakpoint, } = this;
        if (!model)
            return nothing;
        switch (this.tileDisplayMode) {
            case 'grid':
                switch (model.mediatype) {
                    case 'collection':
                        return html `<collection-tile
              .model=${model}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            >
            </collection-tile>`;
                    case 'account':
                        return html `<account-tile
              .model=${model}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            ></account-tile>`;
                    default:
                        return html `<item-tile
              .model=${model}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
            ></item-tile>`;
                }
            case 'list-compact':
                return html `<tile-list-compact
          .model=${model}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list-compact>`;
            case 'list-detail':
                return html `<tile-list
          .model=${model}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
        ></tile-list>`;
            default:
                return nothing;
        }
    }
    static get styles() {
        return css `
      :host {
        display: block;
        height: 100%;
      }

      #container {
        height: 100%;
      }

      #delete-button {
        float: right;
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
      }

      a :first-child {
        display: block;
        height: 100%;
      }
    `;
    }
};
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "tileDisplayMode", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "model", void 0);
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: Number })
], TileDispatcher.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Number })
], TileDispatcher.prototype, "currentHeight", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "resizeObserver", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "collectionNameCache", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "sortParam", void 0);
__decorate([
    query('#container')
], TileDispatcher.prototype, "container", void 0);
__decorate([
    property({ type: Number })
], TileDispatcher.prototype, "mobileBreakpoint", void 0);
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "baseImageUrl", void 0);
TileDispatcher = __decorate([
    customElement('tile-dispatcher')
], TileDispatcher);
export { TileDispatcher };
//# sourceMappingURL=tile-dispatcher.js.map