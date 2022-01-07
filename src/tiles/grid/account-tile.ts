import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('account-tile')
export class UserTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <h1>User</h1>
      <h2>${this.model?.title}</h2>
    `;
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
