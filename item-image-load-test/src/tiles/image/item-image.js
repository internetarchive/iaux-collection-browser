import { __decorate } from "tslib";
import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { restrictedIcon } from '../../assets/img/icons/restricted';
let ItemImage = class ItemImage extends LitElement {
    constructor() {
        super(...arguments);
        this.isCompactTile = false;
        this.isDeemphasize = false;
        this.isListTile = false;
    }
    render() {
        return html `
      <div class=${ifDefined(this.imageBoxClass)}>
        ${this.itemTileImageTemplate} ${this.tileActionTemplate}
      </div>
    `;
    }
    get tileActionTemplate() {
        if (!this.isDeemphasize) {
            return nothing;
        }
        return html `
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
    }
    get itemTileImageTemplate() {
        return html `
      ${this.isListTile ? this.listImageTemplate : this.tileImageTemplate}
    `;
    }
    get tileImageTemplate() {
        var _a;
        return html `
      <img
        class=${this.imageClass}
        src="${ifDefined(this.imageSrc)}"
        alt="${ifDefined((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)}"
      />
      ${this.tileActionTemplate}
    `;
    }
    get listImageTemplate() {
        if (!this.model) {
            return nothing;
        }
        return html `
      <img
        src="${ifDefined(this.imageSrc)}"
        alt=""
        class="${this.listImageClass}"
      />
      ${this.restrictedIconTemplate}
    `;
    }
    get restrictedIconTemplate() {
        if (!this.isDeemphasize) {
            return nothing;
        }
        return html ` ${restrictedIcon} `;
    }
    // Classes
    get imageClass() {
        return `item-image ${this.isDeemphasize ? 'deemphasize' : 'default'}`;
    }
    get listImageClass() {
        var _a;
        return `list-image ${(_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype}${this.isCompactTile ? ' compact' : ''}`;
    }
    get imageBoxClass() {
        if (this.isListTile) {
            return `list-image-box${this.isDeemphasize ? ' deemphasize' : ''}`;
        }
        if (this.isDeemphasize) {
            return 'item-image-box';
        }
        return undefined;
    }
    static get styles() {
        return css `
      .item-image-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        box-shadow: 1px 1px 2px 0px;
        display: flex;
      }

      .item-image {
        width: 16rem;
        height: 16rem;
        object-fit: contain;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        -webkit-appearance: none;
        overflow: visible;
      }

      .list-image-box.deemphasize {
        border: 1px solid #767676;
      }

      .list-image-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        box-sizing: border-box;
        display: flex;
        position: relative;
      }

      .list-image {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }

      img.list-image {
        overflow: hidden;
        object-fit: contain;
        border-radius: var(--border-radius, 0);
        -webkit-border-radius: var(--border-radius, 0);
        -moz-border-radius: var(--border-radius, 0);
      }

      img.list-image.compact {
        object-fit: cover;
      }

      .deemphasize .list-image,
      .deemphasize.item-image {
        background-size: contain;
        filter: blur(15px);
        z-index: 1;
      }

      .deemphasize svg {
        padding: 25%;
        z-index: 2;
        position: absolute;
      }

      .tile-action {
        border: 1px solid currentColor;
        border-radius: 1px;
        padding: 5px;
        font-weight: 500;
        width: auto;
        position: absolute;
        z-index: 2;
        display: flex;
        top: 5.5rem;
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
      }

      .deemphasize {
        background-size: contain;
        filter: blur(15px);
        z-index: 1;
      }

      .tile-action {
        border: 1px solid currentColor;
        border-radius: 1px;
        padding: 5px;
        font-weight: 500;
        width: auto;
        position: absolute;
        z-index: 2;
        display: flex;
        top: 5.5rem;
      }

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], ItemImage.prototype, "model", void 0);
__decorate([
    property({ type: String })
], ItemImage.prototype, "imageSrc", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "isCompactTile", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "isDeemphasize", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "isListTile", void 0);
ItemImage = __decorate([
    customElement('item-image')
], ItemImage);
export { ItemImage };
//# sourceMappingURL=item-image.js.map