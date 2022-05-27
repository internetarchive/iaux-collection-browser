import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { TileModel } from '../models';

import { restrictedIcon } from '../assets/img/icons/restricted';
import {
  baseItemImageStyles,
  contentWarningStyles,
  waveformGradientStyles,
} from '../styles';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @state() private isWaveform = false;

  @state() private tileActionText = '';

  @query('.base-img') private itemImageWaveform!: HTMLImageElement;

  render() {
    return html`
      <div>
        <div class=${classMap(this.itemBaseClass)}>
          <img
            class=${classMap(this.itemImageClass)}
            src="${this.imageSrc}"
            alt=""
            @load=${this.onLoadItemImageCheck}
          />
          ${this.restrictedIconTemplate}
        </div>
        ${this.contentWarningTemplate}
      </div>
    `;
  }

  private get contentWarningTemplate() {
    if (!this.model?.contentWarning || this.isListTile) {
      return nothing;
    }
    // add check if loggedIn
    // this.tileActionText = 'Log in to view this item'
    this.tileActionText = 'Content may be inappropriate';
    return this.tileActionTemplate;
  }

  private get restrictedIconTemplate() {
    if (!this.model?.contentWarning || !this.isListTile) {
      return nothing;
    }

    return html`<div class="svg-overlay">${restrictedIcon}</div>`;
  }

  private get tileActionTemplate() {
    return html`
      <div class="tile-action no-preview">${this.tileActionText}</div>
    `;
  }

  /**
   * Helpers
   */
  private get imageSrc() {
    return `${this.baseImageUrl}/services/img/${this.model?.identifier}`;
  }

  private get hashBasedGradient() {
    if (!this.model?.identifier) {
      return 'grad0';
    }
    const gradient = this.hashStrToInt(this.model.identifier) % 6; // returns 0-5
    return `grad${gradient}`;
  }

  private hashStrToInt(str: string): number {
    return str
      .split('')
      .reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
  }

  /**
   * Classes
   */
  private get itemBaseClass(): ClassInfo {
    return {
      'img-box': true,
      'list-image-box': this.isListTile,
      [this.hashBasedGradient]: this.isWaveform,
    };
  }

  private get itemImageClass(): ClassInfo {
    return {
      'base-img': true,
      'grid-tile': !this.isListTile,
      'list-tile': this.isListTile,
      'img-default': !this.isCompactTile,
      'img-list-compact': this.isCompactTile,
      blur: this.model?.contentWarning || false,
      waveform: this.isWaveform,
    };
  }

  /**
   * Event listener
   */
  private onLoadItemImageCheck() {
    const isAudioEtree =
      this.model?.mediatype === 'audio' || this.model?.mediatype === 'etree';

    if (!isAudioEtree) return;

    const aspectRatio =
      this.itemImageWaveform.naturalWidth /
      this.itemImageWaveform.naturalHeight;
    if (aspectRatio === 4) {
      this.isWaveform = true;
    }
  }

  /**
   * CSS
   */
  static get styles(): CSSResultGroup {
    return [
      baseItemImageStyles,
      waveformGradientStyles,
      contentWarningStyles,
      css`
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
      `,
    ];
  }
}
