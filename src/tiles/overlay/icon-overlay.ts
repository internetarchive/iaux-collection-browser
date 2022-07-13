import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { restrictedIcon } from '../../assets/img/icons/restricted';
import { loginRequiredIcon } from '../../assets/img/icons/login-required';

@customElement('icon-overlay')
export class IconOverlay extends LitElement {
  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) loginRequired = false;

  render() {
    if (this.loginRequired && !this.loggedIn) {
      return html`${loginRequiredIcon} `;
    }
    return html`${restrictedIcon}`;
  }

  static get styles(): CSSResultGroup {
    return css`
      :host {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        width: 50%;
        z-index: 2;
      }
    `;
  }
}
