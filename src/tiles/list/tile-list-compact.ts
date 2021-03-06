import { css, html, LitElement, nothing } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { customElement, property } from 'lit/decorators.js';
import { SortParam } from '@internetarchive/search-service';
import DOMPurify from 'dompurify';

import { TileModel } from '../../models';
import { formatCount, NumberFormat } from '../../utils/format-count';
import { formatDate, DateFormat } from '../../utils/format-date';
import { accountLabel } from './account-label';

import '../item-image';
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

  render() {
    return html`
      <div id="list-line" class="${this.classSize}">
        <div id="thumb" class="${ifDefined(this.model?.mediatype)}">
          ${this.imageTemplate}
        </div>
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
        <div id="views">
          ${formatCount(this.model?.viewCount ?? 0, this.formatSize)}
        </div>
      </div>
    `;
  }

  private get imageTemplate() {
    if (!this.model?.identifier) {
      return nothing;
    }
    return html`
      <item-image
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .isListTile=${true}
        .isCompactTile=${true}
        style="--imgHeight: 100%; --imgWidth: 100%"
      >
      </item-image>
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
      }

      #list-line.mobile {
        grid-template-columns: 36px 3fr 2fr 62px 19px;
      }

      #list-line.desktop {
        grid-template-columns: 51px 3fr 2fr 100px 20px 60px;
      }

      #list-line:hover #title {
        text-decoration: underline;
      }

      /* fields */
      #thumb {
        object-fit: cover;
        display: block;
      }

      .mobile #thumb {
        width: 30px;
        height: 30px;
        padding-top: 2px;
        padding-bottom: 2px;
        padding-left: 4px;
      }

      .desktop #thumb {
        width: 45px;
        height: 45px;
        padding-top: 5px;
        padding-bottom: 5px;
        padding-left: 6px;
      }

      #thumb.collection {
        --border-radius: 8px;
      }

      .mobile #thumb.account {
        --border-radius: 15px;
      }

      .desktop #thumb.account {
        --border-radius: 22.5px;
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
    `;
  }
}
