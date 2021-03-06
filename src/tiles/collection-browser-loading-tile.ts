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
        background: linear-gradient(
          to right,
          rgba(25, 69, 154, 0.1),
          rgb(105, 161, 234, 0.2)
        );
        background-size: 100% 100%;
        display: block;
        height: 100%;
      }
    `;
  }
}
