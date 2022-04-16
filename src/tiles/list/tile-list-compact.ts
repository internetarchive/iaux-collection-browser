import { css, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb">${this.imageTemplate}</div>
        <div id="title">${DOMPurify.sanitize(this.model?.title ?? '')}</div>
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="creator">${DOMPurify.sanitize(this.model?.creator ?? '')}</div>
        <div id="views">
          ${formatCount(this.model?.viewCount ?? 0, this.formatSize)}
        </div>
        <div id="icon">
          <mediatype-icon .mediatype=${this.model?.mediatype}></mediatype-icon>
        </div>
      </div>
    `;
  }

  private get imageTemplate() {
    if (!this.model?.identifier) {
      return nothing;
    }
    return html` <img
      src="${this.baseNavigationUrl}/services/img/${this.model.identifier}"
      alt="${this.model.identifier}"
      class="${this.model?.mediatype}"
    />`;
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
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      /* fields */

      #thumb {
        padding-left: 6px;
      }

      #thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb img {
        width: 30px;
        height: 30px;
      }

      .desktop #thumb img {
        width: 45px;
        height: 45px;
      }

      #thumb img.collection {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
      }

      .mobile #thumb img.account {
        border-radius: 15px;
        -webkit-border-radius: 15px;
        -moz-border-radius: 15px;
      }

      .desktop #thumb img.account {
        border-radius: 22.5px;
        -webkit-border-radius: 22.5px;
        -moz-border-radius: 22.5px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
      }

      #title,
      #creator {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }

      #views {
        text-align: right;
      }

      .mobile #views {
        display: none;
      }

      #icon {
        height: 20px;
        padding-right: 6px;
      }

      .mobile #icon {
        height: 14px;
      }

      .desktop #icon {
        height: 20px;
      }

      /* list-line */

      #list-line {
        display: grid;
        column-gap: 10px;
        border-top: 1px solid #ddd;
        align-items: center;
        line-height: 20px;
      }

      #list-line.mobile {
        grid-template-columns: 30px 3fr 29px 2fr 19px;
        padding-top: 2px;
        padding-bottom: 2px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 100px 2fr 60px 26px;
        padding-top: 5px;
        padding-bottom: 5px;
      }

      /*
      #title {
        flex-grow: 3;
        flex-shrink: 3;
        flex-basis: 0;
      }

      #creator {
        flex-grow: 2;
        flex-shrink: 2;
        flex-basis: 0;
      }

      #date {
        flex-grow: 1;
        flex-shrink: 1;
        flex-basis: 0;
      }
    */

      #list-line:hover #title {
        text-decoration: underline;
      }
    `;
  }
}
