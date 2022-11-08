import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loginRequiredIcon } from '../../assets/img/icons/login-required';
import { restrictedIcon } from '../../assets/img/icons/restricted';

@customElement('text-overlay')
export class TextOverlay extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

  @property({ type: Boolean }) iconRequired = false;

  render() {
    return html`
      <div class="overlay no-preview">
        <div class="icon-overlay">${this.iconDisplay}</div>
        <p class="text-overlay">${this.textDisplay}</p>
      </div>
    `;
  }

  private get iconDisplay() {
    return this.loginRequired && !this.loggedIn
      ? html`${loginRequiredIcon}`
      : html`${restrictedIcon}`;
  }

  private get textDisplay() {
    return this.loginRequired && !this.loggedIn
      ? html`Log in to view this item`
      : html`Content may be inappropriate`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        align-items: center;
        display: flex;
      }

      .overlay {
        border: 1px solid #2c2c2c;
        border-radius: 1px;
        position: absolute;
        right: 0;
        left: 0;
        width: auto;
        height: auto;
        padding: 5px;
        background-color: #fffecb;
        display: flex;
        align-items: center;
        border-radius: 1px;
      }

      .icon-overlay {
        width: 40px;
        height: 40px;
        display: inherit;
      }
      .text-overlay {
        margin: 0;
        vertical-align: bottom;
        padding-left: 5px;
        text-align: center;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `;
  }
}
