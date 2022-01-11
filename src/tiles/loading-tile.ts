import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('loading-tile')
export class LoadingTile extends LitElement {
  render() {
    return html` <div id="container"></div> `;
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }

      #container {
        background: linear-gradient(
          to right,
          rgba(0, 0, 0, 0.1),
          rgb(0, 0, 0, 0.2)
        );
        display: block;
        height: 100%;
      }
    `;
  }
}
