import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('tile-list-detail')
export class TileListDetail extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html` <h1>Detail</h1> `;
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
