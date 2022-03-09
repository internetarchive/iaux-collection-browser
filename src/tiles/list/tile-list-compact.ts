import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';

// import { collectionIcon } from '../../assets/img/icons/collection';

/*
at 750 creator, title trimmed
at 530

css elipsis property
*/

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  render() {
    // Todo: Manage different date types
    return html`
      <div id="list-compact" class="${this.classSize}">
        <div id="views">
          ${formatCount(this.model?.viewCount ?? 0, this.formatSize)}
        </div>
        <div id="title">
          <a
            href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
            title=${ifDefined(this.model?.title)}
          >
            ${this.model?.title}
          </a>
        </div>
        <div id="date-published">
          ${formatDate(this.model?.datePublished, this.formatSize)}
        </div>
        <div id="creator">${this.model?.creator}</div>
        <div id="icon">icon</div>
      </div>
    `;
  }

  private get classSize(): string {
    return (this.currentWidth ?? 531) < 530 ? 'mobile' : 'desktop';
  }

  private get formatSize(): DateFormat | NumberFormat {
    return (this.currentWidth ?? 511) < 530 ? 'short' : 'long';
  }

  static get styles() {
    return css`
      :host(.mobile) div {
        font-size: 9px;
      }
      :host(.desktop) div {
        font-size: 14px;
      }
      #list-compact {
        display: grid;
        grid-template-columns: 80px 3fr 115px 2fr 22px;
        column-gap: 10px;

        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        line-height: 1.42857143;
        color: #333;
        /* background-color: #fff;
        */
      }

      h1 {
        margin-top: 0;
      }
    `;
  }
}
