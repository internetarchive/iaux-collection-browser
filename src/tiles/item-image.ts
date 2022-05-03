import {
  css,
  CSSResultGroup,
  html,
  nothing,
  PropertyValues,
  LitElement,
} from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { TileModel } from '../models';
import './waveform-thumbnail';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @state() private isDeemphasize = false;

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
      <div class=${this.imageBoxClass}>
        ${this.model?.mediatype === 'audio'
          ? this.waveformTemplate
          : this.backgroundImageTemplate}
        ${this.tileActionTemplate}
      </div>
    `;
  }

  private get imageSrc() {
    return `${this.baseNavigationUrl}/services/img/${this.model?.identifier}`;
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
      <waveform-thumbnail
        .baseNavigationUrl=${this.baseNavigationUrl}
        .identifier=${this.model?.identifier}
      >
      </waveform-thumbnail>
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

  // Classes
  private get imageClass() {
    return `item-image ${this.isDeemphasize ? 'deemphasize' : 'default'}`;
  }

  private get imageBoxClass() {
    return `${this.isDeemphasize ? 'item-image-box' : ''}`;
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
        object-fit: cover;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        -webkit-appearance: none;
        overflow: visible;
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
    `;
  }
}
