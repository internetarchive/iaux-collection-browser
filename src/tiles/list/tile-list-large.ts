import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tile-list-large')
export class TileListLarge extends LitElement {
  render() {
    return html`
      <h1>Large</h1>
      <h2><slot></slot></h2>
    `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        outline: 1px solid #dfbdfa;
        height: 100%;
      }

      ::slotted(*) {
        color: #dfbdfa;
      }

      h1 {
        color: #dfbdfa;
        margin-top: 0;
      }
    `;
  }
}
