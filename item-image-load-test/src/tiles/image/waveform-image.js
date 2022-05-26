import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
let WaveformImage = class WaveformImage extends LitElement {
    constructor() {
        super(...arguments);
        this.isCompactTile = false;
        this.isListTile = false;
        this.isWaveform = false;
    }
    render() {
        return html `
      <div class=${this.boxWaveformClass}>
        <img
          class=${this.itemImageWaveformClass}
          src="${ifDefined(this.imageSrc)}"
          alt="${ifDefined(this.identifier)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `;
    }
    // Classes
    hashStrToInt(str) {
        return str
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
    }
    get hashBasedGradient() {
        if (!this.identifier) {
            return 'grad1';
        }
        const gradient = this.hashStrToInt(this.identifier) % 6; // returns 0-5
        return `grad${gradient}`;
    }
    get boxWaveformClass() {
        return `${this.isListTile || this.isCompactTile
            ? 'list-item-audio'
            : 'grid-item-audio'} ${this.isWaveform ? this.hashBasedGradient : ''}`;
    }
    get itemImageWaveformClass() {
        return `item-image${this.isWaveform ? ' waveform' : ''}`;
    }
    onLoadItemImageCheck() {
        const aspectRatio = this.itemImageWaveform.naturalWidth /
            this.itemImageWaveform.naturalHeight;
        if (aspectRatio === 4) {
            this.isWaveform = true;
        }
    }
    static get styles() {
        return css `
      .list-item-audio {
        width: 100%;
        height: 100%;
      }

      .grid-item-audio {
        width: 16rem;
        height: 16rem;
      }

      .item-audio {
        width: 16rem;
        height: 16rem;
      }

      .item-image {
        width: 100%;
        height: 100%;
        object-fit: contain;
        -webkit-appearance: none;
        overflow: hidden;
      }

      .waveform {
        mix-blend-mode: screen;
        height: 100%;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
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
    property({ type: String })
], WaveformImage.prototype, "imageSrc", void 0);
__decorate([
    property({ type: String })
], WaveformImage.prototype, "identifier", void 0);
__decorate([
    property({ type: Boolean })
], WaveformImage.prototype, "isCompactTile", void 0);
__decorate([
    property({ type: Boolean })
], WaveformImage.prototype, "isListTile", void 0);
__decorate([
    state()
], WaveformImage.prototype, "isWaveform", void 0);
__decorate([
    query('.item-image')
], WaveformImage.prototype, "itemImageWaveform", void 0);
WaveformImage = __decorate([
    customElement('waveform-image')
], WaveformImage);
export { WaveformImage };
//# sourceMappingURL=waveform-image.js.map