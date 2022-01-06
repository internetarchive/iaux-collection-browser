import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  render() {
    return html` <h1>Compact</h1> `;
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
