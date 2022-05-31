import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { TileModel } from '../models';

import {
  baseItemImageStyles,
  contentWarningStyles,
  waveformGradientStyles,
} from '../styles/item-image-styles';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @state() private isWaveform = false;

  @query('img') private baseImage!: HTMLImageElement;

  render() {
    return html`
      <div class=${classMap(this.itemBaseClass)}>
        <img
          class=${classMap(this.itemImageClass)}
          src="${this.imageSrc}"
          alt=""
          @load=${this.onLoad}
        />
      </div>
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
      'drop-shadow': true,
      'list-box': this.isListTile,
      [this.hashBasedGradient]: this.isWaveform,
    };
  }

  private get itemImageClass(): ClassInfo {
    return {
      'grid-tile': !this.isListTile,
      'list-tile': this.isListTile,
      contain: !this.isCompactTile,
      cover: this.isCompactTile,
      blur: this.model?.contentWarning || false,
      waveform: this.isWaveform,
    };
  }

  /**
   * Event listener sets isWaveform true if image is waveform
   */
  private onLoad() {
    if (
      (this.model?.mediatype === 'audio' ||
        this.model?.mediatype === 'etree') &&
      this.baseImage.naturalWidth / this.baseImage.naturalHeight === 4
    ) {
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
