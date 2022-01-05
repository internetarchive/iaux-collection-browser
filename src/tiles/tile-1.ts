import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('tile-1')
export class Tile1 extends LitElement {
  render() {
    return html`
      <h1>Tile1</h1>
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
      }
    `;
  }
}
