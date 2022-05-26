import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

import { TileModel } from '../models';

import { baseItemImageStyles, waveformGradientStyles } from '../styles';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) isCompactTile = false;

  @state() private isWaveform = false;

  @query('.item-image') private itemImageWaveform!: HTMLImageElement;

  render() {
    return html`
      <div class=${classMap(this.getItemBaseClass())}>
        <img
          class=${classMap(this.getItemImageClass())}
          src="${this.imageSrc}"
          alt=""
          @load=${this.onLoadItemImageCheck}
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
  private getItemBaseClass(): ClassInfo {
    return {
      'list-image-box': this.isListTile,
      default: true,
      [this.hashBasedGradient]: this.isWaveform,
    };
  }

  private getItemImageClass(): ClassInfo {
    return {
      'grid-tile': !this.isListTile,
      'list-tile': this.isListTile,
      'item-image': true,
      waveform: this.isWaveform,
    };
  }

  /**
   * Event listener
   */
  private onLoadItemImageCheck() {
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
      css`
        .list-image-box.deemphasize {
          border: 1px solid #767676;
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
      `,
    ];
  }
}
