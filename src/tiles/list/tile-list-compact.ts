import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import DOMPurify from 'dompurify';
import type { SortParam } from '@internetarchive/search-service';
import type { TileModel } from '../../models';

import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import { accountLabel } from './account-label';

import '../image-block';
import '../mediatype-icon';

@customElement('tile-list-compact')
export class TileListCompact extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Number }) mobileBreakpoint?: number;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn = false;

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        <image-block
          .model=${this.model}
          .baseImageUrl=${this.baseImageUrl}
          .isCompactTile=${true}
          .isListTile=${true}
          .viewSize=${this.classSize}
          .loggedIn=${this.loggedIn}
        >
        </image-block>
        <div id="title">${DOMPurify.sanitize(this.model?.title ?? '')}</div>
        <div id="creator">
          ${this.model?.mediatype === 'account'
            ? accountLabel(this.model?.dateAdded)
            : DOMPurify.sanitize(this.model?.creator ?? '')}
        </div>
        <div id="date">${formatDate(this.date, this.formatSize)}</div>
        <div id="icon">
          <mediatype-icon
            .mediatype=${this.model?.mediatype}
            .collections=${this.model?.collections}
          >
          </mediatype-icon>
        </div>
        <div id="views">${formatCount(this.views ?? 0, this.formatSize)}</div>
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
      case 'publicdate':
        return this.model?.dateArchived;
      case 'reviewdate':
        return this.model?.dateReviewed;
      case 'addeddate':
        return this.model?.dateAdded;
      default:
        return this.model?.datePublished; // 'date'
    }
  }

  private get views(): number | undefined {
    return this.sortParam?.field === 'week'
      ? this.model?.weeklyViewCount // weekly views
      : this.model?.viewCount; // all-time views
  }

  private get classSize(): string {
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'mobile';
    }
    return 'desktop';
  }

  private get formatSize(): DateFormat | NumberFormat {
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'short';
    }
    return 'long';
  }

  static get styles() {
    return css`
      html {
        font-size: unset;
      }

      div {
        font-size: 14px;
      }

      #list-line {
        display: grid;
        column-gap: 10px;
        border-top: 1px solid #ddd;
        align-items: center;
        line-height: 20px;
        padding-top: 5px;
        padding-bottom: 5px;
      }

      #list-line.mobile {
        grid-template-columns: 36px 3fr 2fr 68px 35px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 2fr 95px 30px 60px;
      }

      #list-line:hover #title {
        text-decoration: underline;
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

      #icon {
        margin-left: 2px;
      }

      #views {
        text-align: right;
        padding-right: 8px;
      }

      .mobile #views {
        display: none;
      }

      .mobile mediatype-icon {
        --iconHeight: 14px;
        --iconWidth: 14px;
      }

      .desktop #icon {
        --iconHeight: 20px;
        --iconWidth: 20px;
      }

      item-image {
        --imgHeight: 100%;
        --imgWidth: 100%;
      }
    `;
  }
}
