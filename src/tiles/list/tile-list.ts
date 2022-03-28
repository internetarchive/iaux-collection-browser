import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';
// import * as HtmlSanitizer from '@jitbit/htmlsanitizer';
// import sanitizeHtml from 'sanitize-html';
// - error
// import DOMPurify from 'dompurify';
// - no types
import { CollectionDisplayMode, TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

/*
at 750 creator, title trimmed
at 530
*/

@customElement('tile-list')
export class TileList extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: String }) displayMode: CollectionDisplayMode =
    'list-compact';

  // private HtmlSanitizer = HtmlSanitizer();

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
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
      ${this.displayMode === 'list-detail' ? this.detail() : html``}
    `;
  }

  private detail() {
    const descriptionHtml = this.description();
    const topicHtml = this.topic();
    const sourceHtml = this.source();

    if (descriptionHtml || topicHtml || sourceHtml) {
      return html`
        <div id="list-detail" class="${this.classSize}">
          <div></div>
          <div id="details">${descriptionHtml} ${topicHtml} ${sourceHtml}</div>
          <div></div>
        </div>
      `;
    }
    return html``;
  }

  private description() {
    if (this.model?.description) {
      const description = DOMPurify.sanitize(`${this.model?.description}`);
      return html` <div id="description">${description}</div> `;
    }
    return html``;
  }

  private topic() {
    if (this.model?.subject) {
      return html` <div id="topic">Topic: ${this.model?.subject}</div> `;
    }
    return html``;
  }

  private source() {
    if (this.model?.source) {
      return html` <div id="source">Source: ${this.model?.source}</div> `;
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

      /* fields */

      #title {
        color: #4b64ff;
        text-decoration: none;
      }

      #title,
      #creator,
      #topic,
      #source {
        text-overflow: ellipsis;
        overflow: hidden;
      }

      #title,
      #creator {
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

      .desktop #description,
      .desktop #topic,
      .desktop #source {
        font-size: 12px;
      }

      .mobile #description,
      .mobile #topic,
      .mobile #source {
        font-size: 11px;
      }

      #description {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: -webkit-box;
        word-break: break-word;
        -webkit-line-clamp: 3; /* number of lines to show */
        line-clamp: 3;
        -webkit-box-orient: vertical;
        text-align: left;
      }

      /* list-line */

      #list-line {
        display: grid;
        column-gap: 10px;
        line-height: 1.42857143;
        border-top: 1px solid #ddd !important;
        padding-top: 5px;
        align-items: center;
      }

      #list-line.mobile {
        grid-template-columns: 33px 3fr 30px 2fr 29.5px;
      }
      #list-line.desktop {
        grid-template-columns: 60px 3fr 90px 2fr 29.5px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      /* list-detail */

      #list-detail {
        display: grid;
        column-gap: 10px;
        line-height: 1.42857143;
        align-items: center;
      }

      #list-detail.mobile {
        grid-template-columns: 33px auto 29.5px;
      }

      #list-detail.desktop {
        grid-template-columns: 60px auto 29.5px;
      }
    `;
  }
}
