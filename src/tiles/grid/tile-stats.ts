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

  @property({ type: Number }) favCount?: number;

  @property({ type: Number }) commentCount?: number;

  render() {
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
          <li class="col">
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
          <li class="col">
            ${favoriteFilledIcon}
            <p class="status-text">
              <span class="sr-only">Favorites:</span>
              ${formatCount(this.favCount, 'short', 'short')}
            </p>
          </li>
          <li class="col">
            ${reviewsIcon}
            <p class="status-text">
              <span class="sr-only">Reviews:</span>
              ${formatCount(this.commentCount, 'short', 'short')}
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

      .item-stats {
        height: 35px;
      }

      #stats-row {
        border-top: 1px solid #bbb;
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
        padding-top: 5px;
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
        width: 25%;
        height: 25px;
      }

      svg {
        height: 10px;
        width: 10px;
        display: block;
        margin: auto;
      }

      .status-text {
        font-size: 14px;
        height: 15px;
        color: #2c2c2c;
        line-height: 20px;
        margin: auto;
        display: block;
        text-align: center;
      }
    `;
  }
}
