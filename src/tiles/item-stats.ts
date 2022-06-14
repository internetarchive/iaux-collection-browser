import { CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { favoriteFilledIcon } from '../assets/img/icons/favorite-filled';
import { reviewsIcon } from '../assets/img/icons/reviews';
import { uploadIcon } from '../assets/img/icons/upload';
import { viewsIcon } from '../assets/img/icons/views';

import { statusWrapperStyles } from '../styles/item-stats-styles';
import { formatCount } from '../utils/format-count';

@customElement('item-stats')
export class ItemStats extends LitElement {
  @property({ type: String }) mediatype?: string;

  @property({ type: Number }) itemCount?: number;

  @property({ type: Number }) viewCount?: number;

  @property({ type: Number }) favCount?: number;

  @property({ type: Number }) commentCount?: number;

  render() {
    return html`
      <div class="stats-wrapper">
        <div class="hr"></div>

        <div id="stats-holder">
          <div class="col">
            <mediatype-icon
              .mediatype=${this.mediatype}
              style="--iconHeight:25px; --iconWidth:25px;"
            >
            </mediatype-icon>
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
    return [statusWrapperStyles];
  }
}
