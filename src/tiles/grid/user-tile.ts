import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('user-tile')
export class UserTile extends LitElement {
  render() {
    return html`
      <h1>User</h1>
      <h2><slot></slot></h2>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        outline: 1px solid green;
        height: 100%;
      }

      h1 {
        color: green;
        margin-top: 0;
      }
    `;
  }
}
