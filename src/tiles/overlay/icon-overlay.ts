import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { restrictedIcon } from '../../assets/img/icons/restricted';
import { loginRequiredIcon } from '../../assets/img/icons/login-required';

@customElement('icon-overlay')
export class IconOverlay extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

  @property({ type: Boolean }) isCompactTile = false;

  render() {
    return html`<div class="icon-overlay ${this.getClass}">
      ${this.iconDisplay}
    </div>`;
  }

  private get getClass() {
    return this.isCompactTile ? 'list-compact' : 'list-detail';
  }

  private get iconDisplay() {
    return this.loginRequired && !this.loggedIn
      ? html`${loginRequiredIcon}`
      : html`${restrictedIcon}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        z-index: 2;
        background-color: rgb(255, 254, 203);
        display: flex;
        justify-content: center;
        border: 1px solid #2c2c2c;
      }

      .icon-overlay {
        height: 20px;
        width: 20px;
        padding: 2px;
        padding: 2px;
      }

      .list-detail {
        height: 20px;
        width: 20px;
      }
      .list-compact {
        height: 15px;
        width: 15px;
      }
    `;
  }
}
