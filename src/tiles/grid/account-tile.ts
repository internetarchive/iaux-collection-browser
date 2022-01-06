import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('account-tile')
export class UserTile extends LitElement {
  render() {
    return html` <h1>User</h1> `;
  }

  static get styles() {
    return css`
      h1 {
        color: green;
        margin-top: 0;
      }
    `;
  }
}
