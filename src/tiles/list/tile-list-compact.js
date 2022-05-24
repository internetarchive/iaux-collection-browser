import { __decorate } from "tslib";
import { css, html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import DOMPurify from 'dompurify';
import { formatCount } from '../../utils/format-count';
import { formatDate } from '../../utils/format-date';
import { accountLabel } from './account-label';
import '../mediatype-icon';
let TileListCompact = class TileListCompact extends LitElement {
    constructor() {
        super(...arguments);
        this.sortParam = null;
    }
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        return html `
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${ifDefined((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype)}">
          ${this.imageTemplate}
        </div>
        <div id="title">${DOMPurify.sanitize((_c = (_b = this.model) === null || _b === void 0 ? void 0 : _b.title) !== null && _c !== void 0 ? _c : '')}</div>
        <div id="creator">
          ${((_d = this.model) === null || _d === void 0 ? void 0 : _d.mediatype) === 'account'
            ? accountLabel((_e = this.model) === null || _e === void 0 ? void 0 : _e.dateAdded)
            : DOMPurify.sanitize((_g = (_f = this.model) === null || _f === void 0 ? void 0 : _f.creator) !== null && _g !== void 0 ? _g : '')}
        </div>
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${(_h = this.model) === null || _h === void 0 ? void 0 : _h.mediatype}
            .collections=${(_j = this.model) === null || _j === void 0 ? void 0 : _j.collections}
            style="--iconCustomFillColor: ${ifDefined(this.collectionColor)}"
          >
          </mediatype-icon>
        </div>
        <div id="views">
          ${formatCount((_l = (_k = this.model) === null || _k === void 0 ? void 0 : _k.viewCount) !== null && _l !== void 0 ? _l : 0, this.formatSize)}
        </div>
      </div>
    `;
    }
    // Only in list, not tile
    get collectionColor() {
        var _a;
        if (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) !== 'collection') {
            return undefined;
        }
        return '#4666FF';
    }
    get imageTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
            return nothing;
        }
        return html `
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
        .isCompactTile=${true}
      >
      </item-image>
    `;
    }
    /*
     * TODO: fix field names to match model in src/collection-browser.ts
     * private get dateSortSelector()
     * @see src/models.ts
     */
    get date() {
        var _a, _b, _c, _d, _e;
        switch ((_a = this.sortParam) === null || _a === void 0 ? void 0 : _a.field) {
            case 'date':
                return (_b = this.model) === null || _b === void 0 ? void 0 : _b.datePublished;
            case 'reviewdate':
                return (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateReviewed;
            case 'addeddate':
                return (_d = this.model) === null || _d === void 0 ? void 0 : _d.dateAdded;
            default:
                return (_e = this.model) === null || _e === void 0 ? void 0 : _e.dateArchived; // publicdate
        }
    }
    get classSize() {
        if (this.mobileBreakpoint &&
            this.currentWidth &&
            this.currentWidth < this.mobileBreakpoint) {
            return 'mobile';
        }
        return 'desktop';
    }
    get formatSize() {
        if (this.mobileBreakpoint &&
            this.currentWidth &&
            this.currentWidth < this.mobileBreakpoint) {
            return 'short';
        }
        return 'long';
    }
    static get styles() {
        return css `
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      #list-line {
        display: grid;
        column-gap: 10px;
        border-top: 1px solid #ddd;
        align-items: center;
        line-height: 20px;
      }

      #list-line.mobile {
        grid-template-columns: 36px 3fr 2fr 62px 19px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 2fr 100px 20px 60px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      /* fields */
      #thumb {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb {
        width: 30px;
        height: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 4px;
      }

      .desktop #thumb {
        width: 45px;
        height: 45px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 6px;
      }

      #thumb.collection {
        --border-radius: 8px;
      }

      .mobile #thumb.account {
        --border-radius: 15px;
      }

      .desktop #thumb.account {
        --border-radius: 22.5px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
      }

      #title,
      #creator {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #views {
        text-align: right;
        padding-right: 8px;
      }

      .mobile #views {
        display: none;
      }

      .mobile mediatype-icon {
        --iconHeight: 14px;
        --iconWidth: 14px;
      }

      .desktop #icon {
        --iconHeight: 20px;
        --iconWidth: 20px;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], TileListCompact.prototype, "model", void 0);
__decorate([
    property({ type: String })
], TileListCompact.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: Number })
], TileListCompact.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Number })
], TileListCompact.prototype, "currentHeight", void 0);
__decorate([
    property({ type: Object })
], TileListCompact.prototype, "sortParam", void 0);
__decorate([
    property({ type: Number })
], TileListCompact.prototype, "mobileBreakpoint", void 0);
__decorate([
    property({ type: String })
], TileListCompact.prototype, "baseImageUrl", void 0);
TileListCompact = __decorate([
    customElement('tile-list-compact')
], TileListCompact);
export { TileListCompact };
//# sourceMappingURL=tile-list-compact.js.map