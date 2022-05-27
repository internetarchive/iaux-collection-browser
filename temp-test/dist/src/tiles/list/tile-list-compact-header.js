import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { dateLabel } from './date-label';
let TileListCompactHeader = class TileListCompactHeader extends LitElement {
    constructor() {
        super(...arguments);
        this.sortParam = null;
    }
    render() {
        var _a;
        return html `
      <div id="list-line-header" class="${this.classSize}">
        <div id="thumb"></div>
        <div id="title">Title</div>
        <div id="creator">Creator</div>
        <div id="date">${dateLabel((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field)}</div>
        <div id="icon"></div>
        <div id="views">Views</div>
      </div>
    `;
    }
    get classSize() {
        if (this.mobileBreakpoint &&
            this.currentWidth &&
            this.currentWidth < this.mobileBreakpoint) {
            return 'mobile';
        }
        return 'desktop';
    }
    static get styles() {
        return css `
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
      }

      .mobile #views {
        display: none;
      }

      #views {
        text-align: right;
      }

      #list-line-header {
        display: grid;
        column-gap: 10px;
        align-items: flex-end;
        padding-bottom: 2px;
      }

      #list-line-header.mobile {
        grid-template-columns: 36px 3fr 2fr 91px;
      }

      #list-line-header.desktop {
        grid-template-columns: 51px 3fr 2fr 100px 20px 60px;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], TileListCompactHeader.prototype, "model", void 0);
__decorate([
    property({ type: Number })
], TileListCompactHeader.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Object })
], TileListCompactHeader.prototype, "sortParam", void 0);
__decorate([
    property({ type: Number })
], TileListCompactHeader.prototype, "mobileBreakpoint", void 0);
TileListCompactHeader = __decorate([
    customElement('tile-list-compact-header')
], TileListCompactHeader);
export { TileListCompactHeader };
//# sourceMappingURL=tile-list-compact-header.js.map