import { css, html, nothing } from 'lit';
import { customElement } from 'lit/decorators.js';
import DOMPurify from 'dompurify';
import type { SortParam } from '@internetarchive/search-service';
import { BaseTileComponent } from '../base-tile-component';

import { formatCount, NumberFormat } from '../../utils/format-count';
import { DateFormat } from '../../utils/format-date';
import { isFirstMillisecondOfUTCYear } from '../../utils/local-date-from-utc';

import '../image-block';
import '../tile-mediatype-icon';

@customElement('tile-list-compact')
export class TileListCompact extends BaseTileComponent {
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - currentWidth?: number;
   *  - currentHeight?: number;
   *  - baseNavigationUrl?: string;
   *  - baseImageUrl?: string;
   *  - collectionPagePath?: string;
   *  - sortParam: SortParam | null = null;
   *  - defaultSortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   *  - suppressBlurring = false;
   *  - useLocalTime = false;
   */

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
          .suppressBlurring=${this.suppressBlurring}
        >
        </image-block>
        <a href=${this.href} id="title"
          >${DOMPurify.sanitize(this.model?.title ?? '')}</a
        >
        <div id="creator">
          ${this.model?.mediatype === 'account'
            ? this.displayValueProvider.accountLabel
            : this.creator}
        </div>
        <div id="date">
          ${this.getFormattedDate(this.date, this.dateFormatSize)}
        </div>
        <div id="icon">
          <tile-mediatype-icon .model=${this.model}> </tile-mediatype-icon>
        </div>
        <div id="views">${formatCount(this.views ?? 0, this.formatSize)}</div>
      </div>
    `;
  }

  private get href(): string | typeof nothing {
    if (!this.model?.identifier || this.baseNavigationUrl == null)
      return nothing;

    // Use the server-specified href if available.
    // Otherwise, construct a details page URL from the item identifier.
    if (this.model.href) {
      return `${this.baseNavigationUrl}${this.model.href}`;
    }

    return this.displayValueProvider.itemPageUrl(
      this.model.identifier,
      this.model.mediatype === 'collection',
    );
  }

  private get creator(): string | typeof nothing {
    return this.displayValueProvider.firstCreatorMatchingFilter ?? nothing;
  }

  /*
   * TODO: fix field names to match model in src/collection-browser.ts
   * private get dateSortSelector()
   * @see src/models.ts
   */
  private get date(): Date | undefined {
    // Note on 'publicdate' vs. 'date':
    // The search engine metadata uses 'publicdate' as the key for the date the item
    // was created on archive.org, which in the UI is referred to as "Date Archived".
    // In contrast, the search engine metadata uses 'date' to refer to the actual
    // publication date of the underlying media ("Date Published" in the UI).
    // Refer to the full metadata schema for more info.
    switch (this.effectiveSort?.field) {
      case 'publicdate':
        return this.model?.dateArchived;
      case 'reviewdate':
        return this.model?.dateReviewed;
      case 'addeddate':
        return this.model?.dateAdded;
      default:
        return this.model?.datePublished;
    }
  }

  private get views(): number | undefined {
    return this.effectiveSort?.field === 'week'
      ? this.model?.weeklyViewCount // weekly views
      : this.model?.viewCount; // all-time views
  }

  /**
   * Returns the active sort param if one is set, or the default sort param otherwise.
   */
  private get effectiveSort(): SortParam | null {
    return this.sortParam ?? this.defaultSortParam;
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

  private get dateFormatSize(): DateFormat {
    // If we're showing a date published of Jan 1 at midnight, only show the year.
    // This is because items with only a year for their publication date are normalized to
    // Jan 1 at midnight timestamps in the search engine documents.
    if (
      (!this.isSortedByDate || this.effectiveSort?.field === 'date') && // Any sort except dates that aren't published date
      isFirstMillisecondOfUTCYear(this.model?.datePublished)
    ) {
      return 'year-only';
    }
    return this.formatSize;
  }

  private get formatSize(): NumberFormat {
    if (
      this.mobileBreakpoint &&
      this.currentWidth &&
      this.currentWidth < this.mobileBreakpoint
    ) {
      return 'short';
    }
    return 'long';
  }

  private get isSortedByDate(): boolean {
    return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(
      this.effectiveSort?.field as string,
    );
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
        margin-bottom: -5px;
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
        text-decoration: none;
      }

      #title:link {
        color: var(--ia-theme-link-color, #4b64ff);
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

      .mobile tile-mediatype-icon {
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
