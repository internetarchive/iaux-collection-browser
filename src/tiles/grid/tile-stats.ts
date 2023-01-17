import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { favoriteFilledIcon } from '../../assets/img/icons/favorite-filled';
import { reviewsIcon } from '../../assets/img/icons/reviews';
import { uploadIcon } from '../../assets/img/icons/upload';
import { viewsIcon } from '../../assets/img/icons/views';

import { formatCount } from '../../utils/format-count';

@customElement('tile-stats')
export class TileStats extends LitElement {
  @property({ type: String }) mediatype?: string;

  @property({ type: Number }) itemCount?: number;

  @property({ type: Number }) viewCount?: number;

  @property({ type: String }) viewLabel?: number;

  @property({ type: Number }) favCount?: number;

  @property({ type: Number }) commentCount?: number;

  render() {
    const formattedFavCount = formatCount(this.favCount, 'short', 'short');
    const formattedReviewCount = formatCount(
      this.commentCount,
      'short',
      'short'
    );

    const uploadsOrViewsTitle =
      this.mediatype === 'account'
        ? `${this.itemCount} uploads`
        : `${this.viewCount} ${this.viewLabel ?? 'all-time views'}`;

    return html`
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype === 'account' ? 'Account Stats' : 'Item Stats'}
        </p>
        <ul id="stats-row">
          <li class="col">
            <p class="sr-only">Mediatype:</p>
            <mediatype-icon .mediatype=${this.mediatype}></mediatype-icon>
          </li>
          <li class="col" title="${uploadsOrViewsTitle}">
            ${this.mediatype === 'account' ? uploadIcon : viewsIcon}
            <p class="status-text">
              <span class="sr-only">
                ${this.mediatype === 'account' ? 'Uploads:' : 'Views:'}
              </span>
              ${formatCount(
                this.mediatype === 'account' ? this.itemCount : this.viewCount,
                'short',
                'short'
              )}
            </p>
          </li>
          <li class="col" title="${formattedFavCount} favorites">
            ${favoriteFilledIcon}
            <p class="status-text">
              <span class="sr-only">Favorites:</span>
              ${formattedFavCount}
            </p>
          </li>
          <li class="col reviews" title="${formattedReviewCount} reviews">
            ${reviewsIcon}
            <p class="status-text">
              <span class="sr-only">Reviews:</span>
              ${formattedReviewCount}
            </p>
          </li>
        </ul>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      mediatype-icon {
        --iconHeight: 25px;
        --iconWidth: 25px;
      }

      ul {
        all: unset; // unset all property values
        list-style-type: none; // remove default list-style
      }

      li {
        list-style-type: none; // remove default list-style
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

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
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
    `;
  }
}
