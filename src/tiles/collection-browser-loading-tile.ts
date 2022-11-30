import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('collection-browser-loading-tile')
export class CollectionBrowserLoadingTile extends LitElement {
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
        background: linear-gradient(to right bottom, #dddddd, #d8d8d8);
        border-radius: var(--tileCornerRadius, 4px);
        background-size: 100% 100%;
        display: block;
        height: 100%;
      }
    `;
  }
}
