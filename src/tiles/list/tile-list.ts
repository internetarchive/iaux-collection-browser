/* eslint-disable lit/no-invalid-html */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';
import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import '../../mediatype-icon';

@customElement('tile-list')
export class TileList extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        <div id="list-line-left">
          <div id="thumb">${this.img()}</div>
          ${this.iconLeft()}
        </div>
        <div id="list-line-right">
          <div id="title">${DOMPurify.sanitize(this.model?.title ?? '')}</div>
          ${this.itemLine()} ${this.creator()}
          <div id="date">
            <span class="label">Published:</span> ${formatDate(
              this.date,
              this.formatSize
            )}
          </div>
          <div id="views-line">
            ${this.views()} ${this.rating()} ${this.reviews()}
          </div>
          ${this.topics()} ${this.description()}
        </div>
      </div>
    `;
  }

  private img() {
    if (!this.model?.identifier) {
      return html``;
    }
    return html` <img
      src="${this.baseNavigationUrl}/services/img/${this.model.identifier}"
      alt="${this.model.identifier}"
      class=${this.model?.mediatype}
    />`;
  }

  private iconLeft() {
    if (this.classSize !== 'desktop') {
      return html``;
    }
    return html`
      <div id="icon-left">
        <mediatype-icon .mediatype=${this.model?.mediatype} .showText=${true}>
        </mediatype-icon>
      </div>
    `;
  }

  private creator() {
    if (!this.model?.creator) {
      return html``;
    }
    return html`
      <div id="creator">
        <span class="label">By: </span>
        ${DOMPurify.sanitize(this.model?.creator ?? '')}
      </div>
    `;
  }

  private itemLine() {
    const source = this.source();
    if (!source) {
      return html``;
    }
    return html` <div id="item-line">${source}</div> `;
  }

  private views() {
    return html`
      <div id="views">
        <span class="label">Views: </span>
        ${formatCount(this.model?.viewCount ?? 0, this.formatSize)}
      </div>
    `;
  }

  private rating() {
    if (!this.model?.averageRating) {
      return html``;
    }
    return html`
      <div id="reviews">
        <span class="label">Avg Rating: </span>
        ${this.model?.averageRating}
      </div>
    `;
  }

  private reviews() {
    if (!this.model?.commentCount) {
      return html``;
    }
    return html`
      <div id="reviews">
        <span class="label">Reviews: </span>
        ${this.model?.commentCount}
      </div>
    `;
  }

  private description() {
    if (!this.model?.description) {
      return html``;
    }
    const description = DOMPurify.sanitize(`${this.model?.description}`);
    return html`<div id="description">${description}</div>`;
  }

  private topics() {
    if (!this.model?.subject) {
      return html``;
    }
    return html` <div id="topics">
      <span class="label">Topics: </span>
      ${DOMPurify.sanitize(this.model?.subject)}
    </div>`;
  }

  private source() {
    if (this.model?.source) {
      return html`<div id="source">
        <span class="label">Source: </span>${this.searchLink(
          'source',
          this.model.source
        )}
      </div>`;
    }
    return html``;
  }

  private searchLink(field: string, searchTerm: string) {
    if (!field || !searchTerm) {
      return html``;
    }
    const query = encodeURIComponent(`${field}:"${searchTerm}"`);
    // eslint-disable-next-line lit/no-invalid-html
    return html`
      <a href="${this.baseNavigationUrl}/search.php?query=${query}">
        ${DOMPurify.sanitize(searchTerm)}
      </a>
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
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      .label {
        font-weight: bold;
      }

      .mobile {
        --infiniteScrollerRowGap: 20px;
        --infiniteScrollerRowHeight: auto;
      }

      .desktop {
        --infiniteScrollerRowGap: 30px;
        --infiniteScrollerRowHeight: auto;
      }
      /* fields */

      #thumb img {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb img {
        width: 90px;
        height: 90px;
      }

      .desktop #thumb img {
        width: 100px;
        height: 100px;
      }

      #thumb img.collection {
        border-radius: 8px;
        -webkit-border-radius: 8px;
        -moz-border-radius: 8px;
      }

      .mobile #thumb img.account {
        border-radius: 45px;
        -webkit-border-radius: 45px;
        -moz-border-radius: 45px;
      }

      .desktop #thumb img.account {
        border-radius: 50px;
        -webkit-border-radius: 50px;
        -moz-border-radius: 50px;
      }

      #icon.show-text svg {
        height: unset;
        width: unset;
      }

      #iconLeft #icon.show-text svg {
        height: 20px;
      }

      #title {
        color: #4b64ff;
        text-decoration: none;
        font-size: 22px;
        font-weight: bold;
        line-height: 30px;
      }

      #creator,
      #date,
      #topics,
      #item-line {
        line-height: 20px;
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

      #icon {
        padding-top: 5px;
      }

      mediatype-icon {
        --iconHeight: 20px;
      }

      #description {
        padding-top: 10px;
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
        display: flex;
        column-gap: 5px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      #item-line,
      #views-line {
        display: flex;
        flex-direction: row;
        gap: 10px;
        line-height: 20px;
      }
    `;
  }
}
