import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

/*
at 750 creator, title trimmed
at 530
*/

@customElement('tile-list-detail')
export class TileListDetail extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    return html`
      <div id="list-detail-1" class="${this.classSize}">
        <div id="views">
          ${formatCount(this.model?.viewCount ?? 0, this.formatSize)}
        </div>
        <div id="title">${this.model?.title}</div>
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="creator">${this.model?.creator}</div>
        <div id="icon">
          <mediatype-icon .mediatype=${this.model?.mediatype}></mediatype-icon>
        </div>
      </div>
      <div id="list-detail-2" class="${this.classSize}">
        <div></div>
        <div id="details">${this.description()}</div>
        <div></div>
      </div>
    `;
  }

  private description() {
    if (this.model?.description) {
      return html`
        <div id="description">
          <div id="description">${this.model?.description}</div>
        </div>
      `;
    }
    return html``;
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
        font-size: 11px;
      }
      .desktop div {
        font-size: 14px;
      }

      #list-detail-1 {
        display: grid;
        column-gap: 10px;
        line-height: 1.42857143;
        border-top: 1px solid #ddd !important;
        padding-top: 5px;
        align-items: center;
      }

      #list-detail-1.mobile {
        grid-template-columns: 33px 3fr 30px 2fr 29.5px;
      }
      #list-detail-1.desktop {
        grid-template-columns: 60px 3fr 90px 2fr 29.5px;
      }

      #list-detail-1:hover #title {
        text-decoration: underline;
      }

      #list-detail-2 {
        display: grid;
        column-gap: 10px;
        line-height: 1.42857143;
        align-items: center;
      }

      #list-detail-2.mobile {
        grid-template-columns: 33px auto 29.5px;
      }

      #list-detail-2.desktop {
        grid-template-columns: 60px auto 29.5px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
      }

      /*
    #details {
      /*
      max-height:3rem;
      overflow:hidden;
    }
*/
      #description {
        overflow: hidden;
        font-size: 12px;
        overflow-y: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        word-break: break-word;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
        text-align: left;
      }

      #title,
      #creator #description {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #views,
      #date {
        text-align: right;
      }

      #views,
      #details {
        color: #767676;
      }
      #icon {
        padding-right: 6px;
      }
    `;
  }
}
