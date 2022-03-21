import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { SortParam } from '@internetarchive/search-service';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

/*
at 750 creator, title trimmed
at 530
*/

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

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
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="creator">${this.model?.creator}</div>
        <div id="icon">
          <mediatype-icon .mediatype=${this.model?.mediatype}></mediatype-icon>
        </div>
      </div>
    `;
  }

  /*
   * TODO: fix field names to match model in src/collection-browser.ts
   * private get dateSortSelector()
   * @see src/models.ts
   */
  private get date(): Date | undefined {
    switch (this.sortParam?.field) {
      case 'date':
        return this.model?.datePublished;
      case 'reviewdate':
        return this.model?.dateReviewed;
      case 'addeddate':
        return this.model?.dateAdded;
      default:
        return this.model?.dateArchived; // publicdate
    }
  }

  private get classSize(): string {
    return (this.currentWidth ?? 531) < 530 ? 'mobile' : 'desktop';
  }

  private get formatSize(): DateFormat | NumberFormat {
    return (this.currentWidth ?? 531) < 530 ? 'short' : 'long';
  }

  static get styles() {
    return css`
      .mobile div {
        font-size: 9px;
      }
      .desktop div {
        font-size: 14px;
      }

      #list-compact {
        display: grid;
        grid-template-columns: 60px 3fr 90px 2fr 29.5px;
        column-gap: 10px;
        line-height: 1.42857143;
        border-top: 1px solid #ddd !important;
        padding-top: 5px;
        align-items: center;
      }

      h1 {
        margin-top: 0;
      }

      a {
        color: #4b64ff;
        text-decoration: none;
      }

      a:hover,
      a:focus {
        text-decoration: underline;
      }

      #title,
      #creator {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #views {
        text-align: right;
        color: #767676;
      }
      #icon {
        padding-right: 6px;
      }
    `;
  }
}
