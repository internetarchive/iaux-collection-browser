import { css, CSSResultGroup, html, nothing, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import './item-image-overlay';
import { TileModel } from '../models';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) loggedIn = false;

  @state() private isWaveform = false;

  @query('.item-image') private itemImageWaveform!: HTMLImageElement;

  render() {
    return html`
      <div class=${ifDefined(this.imageBoxClass)}>
        ${this.model?.mediatype === 'audio'
          ? this.waveformTemplate
          : this.itemImageTemplate}
        ${this.ItemImageOverlayTemplate}
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
    `;
  }

  private get listImageTemplate() {
    if (!this.model) {
      return nothing;
    }
    return html`
      <img src="${this.imageSrc}" alt="" class="${this.listImageClass}" />
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

  private get ItemImageOverlayTemplate() {
    if (!this.model?.loginRequired && !this.model?.contentWarning) {
      return nothing;
    }
    return html`
      <item-image-overlay
        .isListTile=${this.isListTile}
        .loggedIn=${this.loggedIn}
        .loginRequired=${this.model?.loginRequired}
        .contentWarning=${this.model?.contentWarning}
      ></item-image-overlay>
    `;
  }

  private get tileActionTemplate() {
    if (!this.model?.contentWarning) {
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
    return `item-image ${
      this.model?.contentWarning ? 'deemphasize' : 'default'
    }`;
  }

  private get listImageClass() {
    return `list-image ${this.model?.mediatype}${
      this.isCompactTile ? ' compact' : ''
    }`;
  }

  private get imageBoxClass() {
    if (this.isListTile) {
      return `list-image-box${
        this.model?.contentWarning ? ' deemphasize' : ''
      }`;
    }
    if (this.model?.contentWarning) {
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
