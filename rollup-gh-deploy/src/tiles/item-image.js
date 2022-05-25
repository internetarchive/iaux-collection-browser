import { __decorate } from "tslib";
import { css, html, nothing, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { restrictedIcon } from '../assets/img/icons/restricted';
let ItemImage = class ItemImage extends LitElement {
    constructor() {
        super(...arguments);
        this.isListTile = false;
        this.isCompactTile = false;
        this.isWaveform = false;
    }
    render() {
        var _a;
        return html `
      <div class=${ifDefined(this.imageBoxClass)}>
        ${((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) === 'audio'
            ? this.waveformTemplate
            : this.itemImageTemplate}
      </div>
    `;
    }
    get imageSrc() {
        var _a;
        return `${this.baseImageUrl}/services/img/${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}`;
    }
    // Templates
    get itemImageTemplate() {
        return html `
      ${this.isListTile ? this.listImageTemplate : this.tileImageTemplate}
    `;
    }
    get tileImageTemplate() {
        return html `
      <div
        class=${this.imageClass}
        style="background-image:url(${this.imageSrc})"
      ></div>
      ${this.tileActionTemplate}
    `;
    }
    get listImageTemplate() {
        if (!this.model) {
            return nothing;
        }
        return html `
      <img src="${this.imageSrc}" alt="" class="${this.listImageClass}" />
      ${this.restrictedIconTemplate}
    `;
    }
    get waveformTemplate() {
        var _a;
        return html `
      <div class=${this.boxWaveformClass}>
        <img
          class=${this.itemImageWaveformClass}
          src="${this.imageSrc}"
          alt="${ifDefined((_a = this.model) === null || _a === void 0 ? void 0 : _a.title)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `;
    }
    get restrictedIconTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning)) {
            return nothing;
        }
        return html ` ${restrictedIcon} `;
    }
    get tileActionTemplate() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning)) {
            return nothing;
        }
        return html `
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
    }
    onLoadItemImageCheck() {
        const aspectRatio = this.itemImageWaveform.naturalWidth /
            this.itemImageWaveform.naturalHeight;
        if (aspectRatio === 4) {
            this.isWaveform = true;
        }
    }
    // Classes
    get imageClass() {
        var _a;
        return `item-image ${((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning) ? 'deemphasize' : 'default'}`;
    }
    get listImageClass() {
        var _a;
        return `list-image ${(_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype}${this.isCompactTile ? ' compact' : ''}`;
    }
    get imageBoxClass() {
        var _a, _b;
        if (this.isListTile) {
            return `list-image-box${((_a = this.model) === null || _a === void 0 ? void 0 : _a.contentWarning) ? ' deemphasize' : ''}`;
        }
        if ((_b = this.model) === null || _b === void 0 ? void 0 : _b.contentWarning) {
            return 'item-image-box';
        }
        return undefined;
    }
    get boxWaveformClass() {
        return `item-audio${this.isWaveform ? ` ${this.hashBasedGradient}` : ''}`;
    }
    get itemImageWaveformClass() {
        return `item-image${this.isWaveform ? ' waveform' : ''}`;
    }
    get hashBasedGradient() {
        var _a;
        if (!((_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier)) {
            return 'grad1';
        }
        const gradient = this.hashStrToInt(this.model.identifier) % 6; // returns 0-5
        return `grad${gradient}`;
    }
    hashStrToInt(str) {
        return str
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
    static get styles() {
        return css `
      .item-image-box {
        width: 16rem;
        height: 16rem;
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

      .waveform {
        mix-blend-mode: screen;
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
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

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
      }

      .grad0 {
        background: linear-gradient(
          hsl(340, 80%, 55%),
          hsl(0, 80%, 33%) 35%,
          hsl(0, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad1 {
        background: linear-gradient(
          hsl(300, 80%, 55%),
          hsl(330, 80%, 33%) 35%,
          hsl(330, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad2 {
        background: linear-gradient(
          hsl(200, 80%, 55%),
          hsl(230, 80%, 33%) 35%,
          hsl(230, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad3 {
        background: linear-gradient(
          hsl(160, 80%, 55%),
          hsl(190, 80%, 33%) 35%,
          hsl(190, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad4 {
        background: linear-gradient(
          hsl(250, 80%, 55%),
          hsl(280, 80%, 33%) 35%,
          hsl(280, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      .grad5 {
        background: linear-gradient(
          hsl(280, 80%, 55%),
          hsl(310, 80%, 33%) 35%,
          hsl(310, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], ItemImage.prototype, "model", void 0);
__decorate([
    property({ type: String })
], ItemImage.prototype, "baseImageUrl", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "isListTile", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "isCompactTile", void 0);
__decorate([
    state()
], ItemImage.prototype, "isWaveform", void 0);
__decorate([
    query('.item-image')
], ItemImage.prototype, "itemImageWaveform", void 0);
ItemImage = __decorate([
    customElement('item-image')
], ItemImage);
export { ItemImage };
//# sourceMappingURL=item-image.js.map