import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TileModel } from '../../models';

import { restrictedIcon } from '../../assets/img/icons/restricted';

@customElement('item-image')
export class ItemImage extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) imageSrc?: string;

  @property({ type: Boolean }) isCompactTile = false;

  @property({ type: Boolean }) isListTile = false;

  render() {
    return html`
      <div class=${ifDefined(this.imageBoxClass)}>
        ${this.itemTileImageTemplate} ${this.tileActionTemplate}
      </div>
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

  private get itemTileImageTemplate() {
    return html`
      ${this.isListTile ? this.listImageTemplate : this.tileImageTemplate}
    `;
  }

  private get tileImageTemplate() {
    return html`
      <img
        class=${this.imageClass}
        src="${ifDefined(this.imageSrc)}"
        alt="${ifDefined(this.model?.identifier)}"
      />
      ${this.tileActionTemplate}
    `;
  }

  private get listImageTemplate() {
    if (!this.model) {
      return nothing;
    }
    return html`
      <img
        src="${ifDefined(this.imageSrc)}"
        alt=""
        class="${this.listImageClass}"
      />
      ${this.restrictedIconTemplate}
    `;
  }

  private get restrictedIconTemplate() {
    if (!this.model?.contentWarning) {
      return nothing;
    }
    return html` ${restrictedIcon} `;
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

  static get styles(): CSSResultGroup {
    return css`
      .item-image-box {
        width: 100%;
        height: 100%;
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

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
      }

      .deemphasize {
        background-size: contain;
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
