var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized } from '@lit/localize';
import { mediatypeConfig, } from '../mediatype/mediatype-config';
const TV_COMMERCIAL_COLLECTION = 'tv_ads';
const TV_FACT_CHECK_COLLECTION = 'factchecked';
const TV_COLLECTIONS = new Set(['tvnews', 'tvarchive', 'television']);
const RADIO_COLLECTIONS = new Set(['radio', 'radioprogram']);
let TileMediatypeIcon = class TileMediatypeIcon extends LitElement {
    constructor() {
        super(...arguments);
        this.showText = false;
    }
    /**
     * Returns the appropriate mediatype config key for the current mediatype/collections.
     */
    get displayMediatype() {
        if (this.isTvItem)
            return this.tvDisplayMediatype;
        if (this.isRadioItem)
            return 'radio';
        return this.model?.mediatype ?? 'none';
    }
    /**
     * Returns the appropriate TV mediatype, depending on the current collections.
     */
    get tvDisplayMediatype() {
        if (this.isTvCommercial) {
            return 'tvCommercial';
        }
        else if (this.model?.isTvSearchResult && this.isTvFactCheck) {
            return 'tvFactCheck';
        }
        else if (this.model?.isTvSearchResult && this.isTvQuote) {
            return 'tvQuote';
        }
        return 'tv';
    }
    /**
     * Whether this represents a TV item
     */
    get isTvItem() {
        return !!(this.model?.mediatype === 'movies' &&
            this.model?.collections.some(id => TV_COLLECTIONS.has(id)));
    }
    get isTvCommercial() {
        // Contains one or more TV ad identifiers or is in the tv_ads collection
        return !!(this.model?.adIds?.length ||
            this.model?.collections.includes(TV_COMMERCIAL_COLLECTION));
    }
    get isTvFactCheck() {
        // Contains one or more fact-check URLs or is in the factchecked collection
        return !!(this.model?.factChecks?.length ||
            this.model?.collections.includes(TV_FACT_CHECK_COLLECTION));
    }
    get isTvQuote() {
        return !!this.model?.isClip;
    }
    /**
     * Whether this represents a radio item
     */
    get isRadioItem() {
        return !!(this.model?.mediatype === 'audio' &&
            this.model?.collections.some(id => RADIO_COLLECTIONS.has(id)));
    }
    render() {
        const config = mediatypeConfig[this.displayMediatype];
        if (!config) {
            return html ``;
        }
        return html `
      <div
        id="icon"
        class="${this.showText ? 'show-text' : 'hide-text'}"
        title="${config.text}"
        style="--iconFillColor: ${config.color}"
      >
        ${config.icon}
        <p class="status-text">${config.text}</p>
      </div>
    `;
    }
    static get styles() {
        return css `
      #icon {
        height: var(--iconHeight, 25px);
      }

      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: var(--iconTextAlign, center);
      }

      #icon.hide-text p {
        display: none;
      }

      svg {
        height: var(--iconHeight, 10px);
        width: var(--iconWidth, 10px);
        pointer-events: none;
      }

      .fill-color {
        fill: var(--iconFillColor, '#000000');
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], TileMediatypeIcon.prototype, "model", void 0);
__decorate([
    property({ type: Boolean })
], TileMediatypeIcon.prototype, "showText", void 0);
TileMediatypeIcon = __decorate([
    customElement('tile-mediatype-icon'),
    localized()
], TileMediatypeIcon);
export { TileMediatypeIcon };
