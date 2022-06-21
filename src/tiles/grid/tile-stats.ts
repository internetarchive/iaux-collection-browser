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
        <div id="stats-row">
          <div class="col">
            <mediatype-icon .mediatype=${this.mediatype}> </mediatype-icon>
          </div>
          <div class="col">
            ${this.mediatype === 'account' ? uploadIcon : viewsIcon}
            <p class="status-text">
              ${formatCount(
                this.mediatype === 'account' ? this.itemCount : this.viewCount,
                'short',
                'short'
              )}
            </p>
          </div>
          <div class="col">
            ${favoriteFilledIcon}
            <p class="status-text">
              ${formatCount(this.favCount, 'short', 'short')}
            </p>
          </div>
          <div class="col">
            ${reviewsIcon}
            <p class="status-text">
              ${formatCount(this.commentCount, 'short', 'short')}
            </p>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      mediatype-icon {
        --iconHeight: 25px;
        --iconWidth: 25px;
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
