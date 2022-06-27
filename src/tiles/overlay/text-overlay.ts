import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-overlay')
export class TextOverlay extends LitElement {
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
    return html`
      <div class="tile-action no-preview">Log in<br />to view this item</div>
    `;
  }

  private get contentWarningTemplate() {
    return html`
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .tile-action {
        border: 1px solid #2c2c2c;
        border-radius: 1px;
        position: absolute;
        right: 0;
        left: 0;
        top: 35%;
        margin: auto;
        width: auto;
        padding: 5px;
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
