import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { TileModel } from '../models';

import {
  baseItemImageStyles,
  waveformGradientStyles,
} from '../styles/item-image-styles';

import './overlay/icon-overlay';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) loggedIn = false;

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
   * Templates
   */
  // private get iconOverlayTemplate() {
  //   if (!this.isListTile) return nothing;

  //   if (!this.model?.loginRequired && !this.model?.contentWarning) {
  //     return nothing;
  //   }
  //   return html`
  //     <icon-overlay
  //       .loggedIn=${this.loggedIn}
  //       .loginRequired=${this.model?.loginRequired}
  //       .isListTile=${this.isListTile}
  //       .isCompactTile=${this.isCompactTile}
  //     >
  //     </icon-overlay>
  //   `;
  // }

  /**
   * Helpers
   */
  private get imageSrc() {
    return `${this.baseImageUrl}/services/img/${this.model?.identifier}`;
  }

  private get hashBasedGradient() {
    if (!this.model?.identifier) {
      return 'waveform-grad0';
    }
    const gradient = this.hashStrToInt(this.model.identifier) % 6; // returns 0-5
    return `waveform-grad${gradient}`;
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
    const toBlur = this.model?.contentWarning || this.model?.loginRequired;

    return {
      contain: !this.isCompactTile && !this.isWaveform,
      cover: this.isCompactTile,
      blur: toBlur || false,
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
      css`
        img {
          height: var(--imgHeight, 16rem);
          width: var(--imgWidth, 16rem);
        }
      `,
    ];
  }
}
