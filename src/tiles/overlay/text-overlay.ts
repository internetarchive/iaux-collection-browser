import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('text-overlay')
export class TextOverlay extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

  render() {
    return html` <div class="overlay no-preview">${this.textDisplay}</div> `;
  }

  private get textDisplay() {
    return this.loginRequired && !this.loggedIn
      ? 'Log in\nto view this item'
      : 'Content may be inappropriate';
  }

  static get styles(): CSSResultGroup {
    return css`
      .overlay {
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
        white-space: pre-wrap; // for the newline character
      }
    `;
  }
}
