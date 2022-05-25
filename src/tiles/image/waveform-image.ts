import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('waveform-image')
export class WaveformImage extends LitElement {
  @property({ type: String }) imageSrc?: string;

  @property({ type: String }) identifier?: string;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) isListTile = false;

  @state() private isWaveform: boolean = false;

  @query('.item-image') private itemImageWaveform!: HTMLImageElement;

  render() {
    return html`
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
  private hashStrToInt(str: string): number {
    return str
      .split('')
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  }

  private get hashBasedGradient() {
    if (!this.identifier) {
      return 'grad1';
    }
    const gradient = this.hashStrToInt(this.identifier) % 6; // returns 0-5
    return `grad${gradient}`;
  }

  private get boxWaveformClass() {
    return `${
      this.isListTile || this.isCompactTile
        ? 'list-item-audio'
        : 'grid-item-audio'
    } ${this.isWaveform ? this.hashBasedGradient : ''}`;
  }

  private get itemImageWaveformClass() {
    return `item-image${this.isWaveform ? ' waveform' : ''}`;
  }

  private onLoadItemImageCheck() {
    const aspectRatio =
      this.itemImageWaveform.naturalWidth /
      this.itemImageWaveform.naturalHeight;
    if (aspectRatio === 4) {
      this.isWaveform = true;
    }
  }

  static get styles(): CSSResultGroup {
    return css`
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
}
