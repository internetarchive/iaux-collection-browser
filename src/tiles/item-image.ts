import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import type { TileModel } from '../models';

import {
  baseItemImageStyles,
  waveformGradientStyles,
} from '../styles/item-image-styles';

const searchIcon = html`<svg
  viewBox="0 0 100 100"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="m17.0555551 41.3194459c0-12.7430552 10.3541664-23.1027772 23.0847216-23.1027772 12.7166664 0 23.0777773 10.359722 23.0777773 23.1027772 0 12.7361108-10.3611109 23.0986106-23.0777773 23.0986106-12.7305552 0-23.0847216-10.3624998-23.0847216-23.0986106zm-17.24305512 0c0 22.2916661 18.04583292 40.3472213 40.32777672 40.3472213 8.9208332 0 17.145833-2.9319449 23.8194439-7.8527776l24.1513883 24.0777771c1.2125 1.1402778 2.8430555 1.8430556 4.6374999 1.8430556 3.7444443 0 6.7805554-3.0361111 6.7805554-6.7791665 0-2.0652778-.9222222-3.9069444-2.3736111-5.1499999l-23.718055-23.7458328c4.4152777-6.4791665 7.0152776-14.3055552 7.0152776-22.7402772 0-22.2791661-18.0458328-40.34861006-40.312499-40.34861006-22.2819438 0-40.32777672 18.06944396-40.32777672 40.34861006z"
    fill="#000"
    fill-rule="evenodd"
  />
</svg>`;

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
      <div class=${classMap(this.itemBaseClass)}>${this.imageTemplate}</div>
    `;
  }

  private get imageTemplate() {
    if (this.model?.mediatype === 'favorited_search') {
      return html`${searchIcon}`;
    }

    return html`
      <img
        class=${classMap(this.itemImageClass)}
        src="${this.imageSrc}"
        alt=""
        @load=${this.onLoad}
      />
    `;
  }

  /**
   * Helpers
   */
  private get imageSrc() {
    // Don't try to load invalid image URLs
    return this.baseImageUrl && this.model?.identifier
      ? `${this.baseImageUrl}/services/img/${this.model.identifier}`
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
      'search-image': this.model?.mediatype === 'favorited_search',
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
