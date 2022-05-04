import {
  css,
  CSSResultGroup,
  html,
  nothing,
  PropertyValues,
  LitElement,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TileModel } from '../models';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @state() private isDeemphasize = false;

  @query('.item-image') private itemImageWaveform!: HTMLImageElement;

  protected updated(changed: PropertyValues): void {
    if (changed.has('model')) {
      this.setDeemphsize();
    }
  }

  private setDeemphsize() {
    this.isDeemphasize =
      this.model?.collections.includes('deemphasize') ?? false;
  }

  render() {
    return html`
      <div class=${ifDefined(this.imageBoxClass)}>
        ${this.model?.mediatype === 'audio'
          ? this.waveformTemplate
          : this.backgroundImageTemplate}
        ${this.tileActionTemplate}
      </div>
    `;
  }

  private get imageSrc() {
    return `${this.baseImageUrl}/services/img/${this.model?.identifier}`;
  }

  // Templates
  private get backgroundImageTemplate() {
    return html`
      <div
        class=${this.imageClass}
        style="background-image:url(${this.imageSrc})"
      ></div>
    `;
  }

  private get waveformTemplate() {
    return html`
      <div class="box" id=${this.randomGradient}>
        <img
          class="item-image"
          src="${this.imageSrc}"
          alt="${ifDefined(this.model?.identifier)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `;
  }

  private get tileActionTemplate() {
    if (!this.isDeemphasize) {
      return nothing;
    }
    return html`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
  }

  private onLoadItemImageCheck() {
    const aspectRatio =
      this.itemImageWaveform.naturalWidth /
      this.itemImageWaveform.naturalHeight;
    if (aspectRatio === 4) {
      this.itemImageWaveform.classList.add('waveform');
    }
  }

  // Classes
  private get imageClass() {
    return `item-image ${this.isDeemphasize ? 'deemphasize' : 'default'}`;
  }

  private get imageBoxClass() {
    return this.isDeemphasize ? 'item-image-box' : undefined;
  }

  private get randomGradient() {
    return `grad${Math.floor(Math.random() * (6 - 1) + 1)}`;
  }

  static get styles(): CSSResultGroup {
    return css`
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

      .waveform {
        mix-blend-mode: screen;
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
      }

      .deemphasize {
        background-size: cover;
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

      #grad1 {
        background: linear-gradient(
          hsl(300, 80%, 55%),
          hsl(330, 80%, 33%) 35%,
          hsl(330, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      #grad2 {
        background: linear-gradient(
          hsl(200, 80%, 55%),
          hsl(230, 80%, 33%) 35%,
          hsl(230, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      #grad3 {
        background: linear-gradient(
          hsl(160, 80%, 55%),
          hsl(190, 80%, 33%) 35%,
          hsl(190, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      #grad4 {
        background: linear-gradient(
          hsl(250, 80%, 55%),
          hsl(280, 80%, 33%) 35%,
          hsl(280, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      #grad5 {
        background: linear-gradient(
          hsl(280, 80%, 55%),
          hsl(310, 80%, 33%) 35%,
          hsl(310, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }

      #grad6 {
        background: linear-gradient(
          hsl(340, 80%, 55%),
          hsl(0, 80%, 33%) 35%,
          hsl(0, 80%, 22%) 70%,
          hsl(0, 0%, 0%)
        );
      }
    `;
  }
}
