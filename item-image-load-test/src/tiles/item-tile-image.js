import { __decorate } from "tslib";
import { html, LitElement } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import './image/item-image';
import './image/waveform-image';
let ItemImage = class ItemImage extends LitElement {
    constructor() {
        super(...arguments);
        this.isListTile = false;
        this.isCompactTile = false;
        this.isDeemphasize = false;
    }
    updated(changed) {
        if (changed.has('model')) {
            this.setDeemphasize();
        }
    }
    // Don't deemphasize if item is a collection
    setDeemphasize() {
        var _a, _b, _c;
        this.isDeemphasize =
            (_c = (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) !== 'collection' &&
                ((_b = this.model) === null || _b === void 0 ? void 0 : _b.collections.includes('deemphasize')))) !== null && _c !== void 0 ? _c : false;
    }
    render() {
        return html `
      ${this.isWithWaveformMediatype
            ? this.waveformImageTemplate
            : this.itemImageTemplate}
    `;
    }
    get imageSrc() {
        var _a;
        return `${this.baseImageUrl}/services/img/${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}`;
    }
    get isWithWaveformMediatype() {
        var _a, _b;
        return (((_a = this.model) === null || _a === void 0 ? void 0 : _a.mediatype) === 'audio' || ((_b = this.model) === null || _b === void 0 ? void 0 : _b.mediatype) === 'etree');
    }
    // Templates
    get itemImageTemplate() {
        return html `
      <item-image
        .model=${this.model}
        .imageSrc=${this.imageSrc}
        .isDeemphasize=${this.isDeemphasize}
        .isCompactTile=${this.isCompactTile}
        .isListTile=${this.isListTile}
      >
      </item-image>
    `;
    }
    get waveformImageTemplate() {
        var _a;
        return html `
      <waveform-image
        .imageSrc=${this.imageSrc}
        .identifier=${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}
        .isCompactTile=${this.isCompactTile}
        .isListTile=${this.isListTile}
      >
      </waveform-image>
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
], ItemImage.prototype, "isDeemphasize", void 0);
ItemImage = __decorate([
    customElement('item-tile-image')
], ItemImage);
export { ItemImage };
//# sourceMappingURL=item-tile-image.js.map