import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { restrictedIcon } from '../assets/img/icons/restricted';
import { LoginRequiredIcon } from '../assets/img/icons/login-required';

@customElement('item-image-overlay')
export class ItemImageOverlay extends LitElement {
  @property({ type: Boolean }) isListTile = false;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

  @property({ type: Boolean }) contentWarning = false;

  render() {
    if (this.loginRequired && !this.loggedIn) {
      return html` ${this.loginRequiredTemplate} `;
    }
    return html` ${this.contentWarningTemplate} `;
  }

  private get loginRequiredTemplate() {
    if (this.isListTile) {
      // List views
      return html`<div class="svg-overlay logged-in">
        ${LoginRequiredIcon}
      </div>`;
    }
    // Tile view
    return html`
      <div class="tile-action no-preview">Log in to view this item</div>
    `;
  }

  private get contentWarningTemplate() {
    if (this.isListTile) {
      // List views
      return html`<div class="svg-overlay">${restrictedIcon}</div>`;
    }
    // Tile view
    return html`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
      }

      svg {
        padding: 10%;
      }

      .svg-overlay {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        height: 40%;
        width: 40%;
      }

      .logged-in {
        background-color: #eeeeee;
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
