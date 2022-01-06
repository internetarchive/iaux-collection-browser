import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <h1>Compact</h1>
      <p>${this.model?.title}</p>
      <p>${this.model?.identifier}</p>
    `;
  }

  static get styles() {
    return css`
      h1 {
        color: #dfbdfa;
        margin-top: 0;
      }
    `;
  }
}
