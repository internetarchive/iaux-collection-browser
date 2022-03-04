import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <h1>${this.model?.title}</h1>
      <h2>${this.model?.datePublished?.toDateString()}</h2>
    `;
  }

  static get styles() {
    return css`
      h1 {
        margin-top: 0;
      }
    `;
  }
}
