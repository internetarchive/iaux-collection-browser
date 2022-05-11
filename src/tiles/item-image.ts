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
import { restrictedIcon } from '../assets/img/icons/restricted';
import { TileModel } from '../models';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @state() private isDeemphasize = false;

  @state() private isWaveform = false;

  @state() private isWithWaveformMediatype: boolean = false;

  @query('.item-image') private itemImageWaveform!: HTMLImageElement;

  protected updated(changed: PropertyValues): void {
    if (changed.has('model')) {
      this.setDeemphasize();
      this.setWithWaveformMediatype();
    }
  }

  // Don't deemphasize if item is a collection
  private setDeemphasize() {
    this.isDeemphasize =
      (this.model?.mediatype !== 'collection' &&
        this.model?.collections.includes('deemphasize')) ??
      false;
  }

  private setWithWaveformMediatype() {
    const withWaveformMediatype = ['audio', 'etree'];
    if (this.model?.mediatype)
      this.isWithWaveformMediatype = withWaveformMediatype.includes(
        this.model?.mediatype
      );
  }

  render() {
    return html`
      <div class=${ifDefined(this.imageBoxClass)}>
        ${this.isWithWaveformMediatype
          ? this.waveformTemplate
          : this.itemImageTemplate}
      </div>
    `;
  }

  private get imageSrc() {
    return `${this.baseImageUrl}/services/img/${this.model?.identifier}`;
  }

  // Templates
  private get itemImageTemplate() {
    return html`
      ${this.isListTile ? this.listImageTemplate : this.tileImageTemplate}
    `;
  }

  private get tileImageTemplate() {
    return html`
      <div
        class=${this.imageClass}
        style="background-image:url(${this.imageSrc})"
      ></div>
      ${this.tileActionTemplate}
    `;
  }

  private get listImageTemplate() {
    if (!this.model) {
      return nothing;
    }
    return html`
      <img src="${this.imageSrc}" alt="" class="${this.listImageClass}" />
      ${this.restrictedIconTemplate}
    `;
  }

  private get waveformTemplate() {
    return html`
      <div class=${this.boxWaveformClass}>
        <img
          class=${this.itemImageWaveformClass}
          src="${this.imageSrc}"
          alt="${ifDefined(this.model?.title)}"
          @load=${this.onLoadItemImageCheck}
        />
      </div>
    `;
  }

  private get restrictedIconTemplate() {
    if (!this.isDeemphasize) {
      return nothing;
    }
    return html` ${restrictedIcon} `;
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
      this.isWaveform = true;
    }
  }

  // Classes
  private get imageClass() {
    return `item-image ${this.isDeemphasize ? 'deemphasize' : 'default'}`;
  }

  private get listImageClass() {
    return `list-image ${this.model?.mediatype}${
      this.isCompactTile ? ' compact' : ''
    }`;
  }

  private get imageBoxClass() {
    if (this.isListTile) {
      return `list-image-box${this.isDeemphasize ? ' deemphasize' : ''}`;
    }
    if (this.isDeemphasize) {
      return 'item-image-box';
    }
    return undefined;
  }

  private get boxWaveformClass() {
    return `item-audio${this.isWaveform ? ` ${this.hashBasedGradient}` : ''}`;
  }

  private get itemImageWaveformClass() {
    return `item-image${this.isWaveform ? ' waveform' : ''}`;
  }

  private get hashBasedGradient() {
    if (!this.model?.identifier) {
      return 'grad1';
    }
    const gradient = this.hashStrToInt(this.model.identifier) % 6; // returns 0-5
    return `grad${gradient}`;
  }

  private hashStrToInt(str: string): number {
    return str
      .split('')
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
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

      .item-audio {
        width: 16rem;
        height: 16rem;
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
        width: 16rem;
        height: 10rem;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
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
}
