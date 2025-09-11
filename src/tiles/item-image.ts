import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import type { TileModel } from '../models';

import {
  baseItemImageStyles,
  waveformGradientStyles,
} from '../styles/item-image-styles';
import { searchIcon } from '../assets/img/icons/mediatype/search';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) suppressBlurring = false;

  @state() private isWaveform = false;

  @state() private isNotFound = false;

  @query('img') private baseImage!: HTMLImageElement;

  render() {
    return html`
      <div class=${classMap(this.itemBaseClass)}>${this.imageTemplate}</div>
    `;
  }

  private get imageTemplate() {
    if (this.model?.mediatype === 'search') {
      return html`${searchIcon}`;
    }

    return html`
      <img
        class=${classMap(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
        @error=${this.onError}
      />
    `;
  }

  /**
   * Helpers
   */
  private get imageSrc() {
    if (this.isNotFound) return this.notFoundSrc;

    // Use the correct image for web capture tiles, if possible
    if (this.model?.captureDates && this.model.identifier) {
      try {
        const url = new URL(this.model.identifier);
        const domain = encodeURIComponent(url.hostname);
        return this.baseImageUrl
          ? `https://web.archive.org/thumb/${domain}?generate=1`
          : nothing;
      } catch {
        return `${this.baseImageUrl}/images/notfound.png`;
      }
    }

    // Use the thumbnail URL specified in the model if it exists
    if (this.model?.thumbnailUrl) return this.model.thumbnailUrl;

    // Don't try to load invalid image URLs
    return this.baseImageUrl && this.model?.identifier
      ? `${this.baseImageUrl}/services/img/${this.model.identifier}`
      : nothing;
  }

  private get notFoundSrc() {
    return this.baseImageUrl
      ? `${this.baseImageUrl}/images/notfound.png`
      : nothing;
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
      'search-image': this.model?.mediatype === 'search',
      [this.hashBasedGradient]: this.isWaveform,
    };
  }

  private get itemImageClass(): ClassInfo {
    const hasSensitiveContent = !!(
      this.model?.contentWarning || this.model?.loginRequired
    );
    const shouldBlur = hasSensitiveContent && !this.suppressBlurring;

    return {
      contain: !this.isCompactTile && !this.isWaveform,
      cover: this.isCompactTile,
      blur: shouldBlur,
      waveform: this.isWaveform,
      'account-image': this.isAccountImage, // for account tile image
      'collection-image': this.model?.mediatype === 'collection', // for collection tile image
    };
  }

  /**
   * Helper function to determine if account tile image
   */
  private get isAccountImage() {
    return (
      this.model?.mediatype === 'account' &&
      !this.isCompactTile &&
      !this.isListTile
    );
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

  private onError() {
    this.isNotFound = true;
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

        .search-image {
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgb(245, 245, 247);
          border-radius: 4px;
        }

        svg {
          height: 10rem;
          width: 10rem;
        }
      `,
    ];
  }
}
