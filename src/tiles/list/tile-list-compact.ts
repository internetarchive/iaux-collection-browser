import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div id="list-compact">
        <div id="views">${this.model?.viewCount}</div>
        <div id="title">${this.model?.title}</div>
        <div id="date-published">${this.model?.datePublished?.toDateString()}</div>
        <div id="creator">${this.model?.creator}</div>
        <div id="icon">${this.model?.mediatype}</div>
      </div>
    `;
  }


  static get styles() {
    return css`
      #list-compact {
        display: table-row;
        border-spacing: 5px 10px;
        border-top: 1px solid #ddd;
        text-align: left;
        overflow-x: hidden;
      }
      #list-compact div {
        display: table-cell;
      }

      h1 {
        margin-top: 0;
      }
    `;
  }
}
