var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var ItemImage_1;
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { baseItemImageStyles, waveformGradientStyles, } from '../styles/item-image-styles';
import { searchIcon } from '../assets/img/icons/mediatype/search';
let ItemImage = class ItemImage extends LitElement {
    constructor() {
        super(...arguments);
        this.isListTile = false;
        this.isCompactTile = false;
        this.loggedIn = false;
        this.suppressBlurring = false;
        this.isWaveform = false;
        this.isNotFound = false;
    }
    static { ItemImage_1 = this; }
    /**
     * Map to cache which identifiers have waveform-style thumbnails, so that
     * they can have their waveform styling applied immediately, rather than
     * waiting for the image content to load before applying it (which can
     * cause noticeable flicker when such tiles refresh).
     */
    static { this.waveformByIdentifier = new Map(); }
    willUpdate(changed) {
        if (changed.has('model')) {
            // If this identifier is known to have a waveform image, then set isWaveform upfront
            const identifier = this.model?.identifier;
            this.isWaveform =
                ItemImage_1.waveformByIdentifier.get(identifier) === true;
        }
    }
    render() {
        return html `
      <div class=${classMap(this.itemBaseClass)}>${this.imageTemplate}</div>
    `;
    }
    get imageTemplate() {
        if (this.model?.mediatype === 'search') {
            return html `${searchIcon}`;
        }
        return html `
      <img
        class=${classMap(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `;
    }
    /**
     * Helpers
     */
    get imageSrc() {
        if (this.isNotFound)
            return this.notFoundSrc;
        // Use the correct image for web capture tiles, if possible
        if (this.model?.captureDates && this.model.identifier) {
            try {
                const url = new URL(this.model.identifier);
                const domain = encodeURIComponent(url.hostname);
                return this.baseImageUrl
                    ? `https://web.archive.org/thumb/${domain}?generate=1`
                    : nothing;
            }
            catch {
                return this.notFoundSrc;
            }
        }
        // Use the thumbnail URL specified in the model if it exists
        if (this.model?.thumbnailUrl)
            return this.model.thumbnailUrl;
        // Don't try to load invalid image URLs
        return this.baseImageUrl && this.model?.identifier
            ? `${this.baseImageUrl}/services/img/${this.model.identifier}`
            : nothing;
    }
    get notFoundSrc() {
        return this.baseImageUrl
            ? `${this.baseImageUrl}/images/notfound.png`
            : nothing;
    }
    get hashBasedGradient() {
        if (!this.model?.identifier) {
            return 'waveform-grad0';
        }
        const gradient = this.hashStrToInt(this.model.identifier) % 6; // returns 0-5
        return `waveform-grad${gradient}`;
    }
    hashStrToInt(str) {
        return str
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
    /**
     * Classes
     */
    get itemBaseClass() {
        return {
            'drop-shadow': true,
            'list-box': this.isListTile,
            'search-image': this.model?.mediatype === 'search',
            [this.hashBasedGradient]: this.isWaveform,
        };
    }
    get itemImageClass() {
        const hasSensitiveContent = !!(this.model?.contentWarning || this.model?.loginRequired);
        const shouldBlur = hasSensitiveContent && !this.suppressBlurring;
        return {
            contain: !this.isCompactTile && !this.isWaveform,
            cover: this.isCompactTile,
            blur: shouldBlur,
            waveform: this.isWaveform,
            'account-image': this.isAccountImage, // for account tile image
            'collection-image': this.model?.mediatype === 'collection', // for collection tile image
        };
    }
    /**
     * Helper function to determine if account tile image
     */
    get isAccountImage() {
        return (this.model?.mediatype === 'account' &&
            !this.isCompactTile &&
            !this.isListTile);
    }
    /**
     * Event listener sets isWaveform true if image is waveform
     */
    onLoad() {
        if ((this.model?.mediatype === 'audio' ||
            this.model?.mediatype === 'etree') &&
            this.baseImage.naturalWidth / this.baseImage.naturalHeight === 4) {
            this.isWaveform = true;
            if (this.model?.identifier) {
                ItemImage_1.waveformByIdentifier.set(this.model.identifier, true);
            }
        }
    }
    onError() {
        this.isNotFound = true;
    }
    /**
     * CSS
     */
    static get styles() {
        return [
            baseItemImageStyles,
            waveformGradientStyles,
            css `
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }

        .search-image {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(245, 245, 247);
          border-radius: 4px;
        }

        svg {
          height: 10rem;
          width: 10rem;
        }
      `,
        ];
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
    property({ type: Boolean })
], ItemImage.prototype, "loggedIn", void 0);
__decorate([
    property({ type: Boolean })
], ItemImage.prototype, "suppressBlurring", void 0);
__decorate([
    state()
], ItemImage.prototype, "isWaveform", void 0);
__decorate([
    state()
], ItemImage.prototype, "isNotFound", void 0);
__decorate([
    query('img')
], ItemImage.prototype, "baseImage", void 0);
ItemImage = ItemImage_1 = __decorate([
    customElement('item-image')
], ItemImage);
export { ItemImage };
