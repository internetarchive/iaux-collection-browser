import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { loginRequiredIcon } from '../../assets/img/icons/login-required';
import { restrictedIcon } from '../../assets/img/icons/restricted';

@customElement('icon-text-overlay')
export class IconTextOverlay extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

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
      ? 'Log in\nto view this item'
      : 'Content may be inappropriate';
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
        display: flex;
        align-items: center;
        border-radius: 1px;
        text-align: center;
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
      }

      .no-preview {
        background-color: #fffecb;
        border: 1px solid #2c2c2c;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
      }
    `;
  }
}
