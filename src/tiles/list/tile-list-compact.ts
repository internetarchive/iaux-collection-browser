import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { TileModel } from '../../models';
// import { collectionIcon } from '../../assets/img/icons/collection';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  render() {
    // Todo: Manage different date types
    return html`
      <div id="list-compact">
        <div id="views">${this.model?.viewCount}</div>
        <div id="title">
          <a
            href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
            title=${ifDefined(this.model?.title)}
          >
            ${this.model?.title}
          </a>
        </div>
        <div id="date-published">${this.model?.datePublished?.toDateString()}</div>
        <div id="creator">${this.model?.creator}</div>
        <div id="icon">icon</div>
      </div>
    `;
  }


  static get styles() {
    return css`
      #list-compact {
        display: grid;
        grid-template-columns: 80px auto 115px 278px 22px;
        column-gap: 10px;

        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 14px;
        line-height: 1.42857143;
        color: #333;
        background-color: #fff;
      }

      h1 {
        margin-top: 0;
      }
    `;
  }
}
