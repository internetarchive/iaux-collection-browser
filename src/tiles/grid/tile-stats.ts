import { css, CSSResultGroup, html, LitElement, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { msg } from '@lit/localize';
import { favoriteFilledIcon } from '../../assets/img/icons/favorite-filled';
import { reviewsIcon } from '../../assets/img/icons/reviews';
import { uploadIcon } from '../../assets/img/icons/upload';
import { viewsIcon } from '../../assets/img/icons/views';
import { quoteIcon } from '../../assets/img/icons/quote';
import { srOnlyStyle } from '../../styles/sr-only';

import { formatCount } from '../../utils/format-count';

@customElement('tile-stats')
export class TileStats extends LitElement {
  @property({ type: String }) mediatype?: string;

  @property({ type: Number }) itemCount?: number;

  @property({ type: Number }) viewCount?: number;

  @property({ type: String }) viewLabel?: string;

  @property({ type: Number }) favCount?: number;

  @property({ type: Number }) commentCount?: number;

  @property({ type: Boolean }) showTvClips = false;

  @property({ type: Number }) tvClipCount?: number;

  render() {
    return html`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype === 'account' ? 'Account Stats' : 'Item Stats'}
        </p>
        <ul id="stats-row">
          ${this.mediatypeIconColumnTemplate}
          ${this.mediatype === 'account'
            ? this.uploadsColumnTemplate
            : this.viewsColumnTemplate}
          ${this.favoritesColumnTemplate}
          ${this.showTvClips
            ? this.tvClipsColumnTemplate
            : this.reviewsColumnTemplate}
        </ul>
      </div>
    `;
  }

  /**
   * Template for the mediatype icon column.
   */
  private get mediatypeIconColumnTemplate(): TemplateResult {
    return html`
      <li class="col">
        <p class="sr-only">${msg('Mediatype:')}</p>
        <mediatype-icon .mediatype=${this.mediatype}></mediatype-icon>
      </li>
    `;
  }

  /**
   * Helper method to construct a template for one of the tile stat columns,
   * given its stat count, labels, and icon.
   *
   * @param count The numeric count to show for the stat
   * @param label The textual label describing the stat (used in the title and screenreader text)
   * @param icon The icon representing the stat
   * @param classes Any additional CSS classes the stat column should have (optional)
   */
  private columnTemplate(
    count: number | undefined,
    label: string,
    icon: TemplateResult,
    classes: string[] = [],
  ): TemplateResult {
    const formattedCount = formatCount(count ?? 0, 'short', 'short');
    const title = `${formattedCount} ${label}`;
    const srLabel = label + ':';

    return html`
      <li class="col ${classes.join(' ')}" title=${title}>
        ${icon}
        <p class="status-text">
          <span class="sr-only">${srLabel}</span>
          ${formattedCount}
        </p>
      </li>
    `;
  }

  /**
   * Template for the views count column.
   */
  private get viewsColumnTemplate(): TemplateResult {
    return this.columnTemplate(
      this.viewCount,
      this.viewLabel ?? msg('all-time views'),
      viewsIcon,
    );
  }

  /**
   * Template for the uploads count column (replaces views for account tiles).
   */
  private get uploadsColumnTemplate(): TemplateResult {
    return this.columnTemplate(this.itemCount, msg('uploads'), uploadIcon);
  }

  /**
   * Template for the favorites count column.
   */
  private get favoritesColumnTemplate(): TemplateResult {
    return this.columnTemplate(
      this.favCount,
      msg('favorites'),
      favoriteFilledIcon,
    );
  }

  /**
   * Template for the reviews count column.
   */
  private get reviewsColumnTemplate(): TemplateResult {
    return this.columnTemplate(this.commentCount, msg('reviews'), reviewsIcon, [
      'reviews',
    ]);
  }

  /**
   * Template for the TV clips count column (replaces reviews for TV tiles).
   */
  private get tvClipsColumnTemplate(): TemplateResult {
    return this.columnTemplate(this.tvClipCount, msg('clips'), quoteIcon);
  }

  static get styles(): CSSResultGroup {
    return [
      srOnlyStyle,
      css`
        mediatype-icon {
          --iconHeight: 25px;
          --iconWidth: 25px;
        }

        ul {
          all: unset;
          list-style-type: none;
        }

        li {
          list-style-type: none;
        }

        svg {
          height: 13px;
          width: 13px;
          display: block;
          margin: auto;
          pointer-events: none;
        }

        /* Make the reviews icon slightly smaller/lower, for even visual weight */
        .reviews svg {
          height: 11px;
          width: 11px;
          margin-top: 2px;
        }

        .item-stats {
          height: 30px;
          padding-left: 5px;
          padding-right: 5px;
          font-family: 'Helvetica Neue', ui-sans-serif, system-ui, sans-serif;
          text-align: center;
        }

        #stats-row {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          width: 100%;
          padding-bottom: 5px;
        }

        .col {
          min-width: 15px;
          max-width: 25%;
          height: 25px;
        }

        .status-text {
          font-size: 14px;
          height: 15px;
          color: #2c2c2c;
          line-height: 17px;
          margin: auto;
          display: block;
          text-align: center;
        }
      `,
    ];
  }
}
