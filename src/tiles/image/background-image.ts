import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

@customElement('background-image')
export class BackgroundImage extends LitElement {
  @property({ type: String }) imageSrc?: string;

  @property({ type: String }) identifier?: string;

  @property({ type: Boolean }) isDeemphasize = false;

  render() {
    return html`
      <div class=${ifDefined(this.imageBoxClass)}>
        <img
          class=${this.imageClass}
          src="${ifDefined(this.imageSrc)}"
          alt="${ifDefined(this.identifier)}"
        />
        ${this.tileActionTemplate}
      </div>
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
  private get imageBoxClass() {
    return this.isDeemphasize ? 'item-image-box' : undefined;
  }

  private get imageClass() {
    return `item-image ${this.isDeemphasize ? 'deemphasize' : 'default'}`;
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
