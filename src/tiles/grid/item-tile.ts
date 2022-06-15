/* eslint-disable import/no-duplicates */
import { CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TileModel } from '../../models';
import { formatCount } from '../../utils/format-count';

import { favoriteFilledIcon } from './icons/favorite-filled';
import { reviewsIcon } from './icons/reviews';
import viewsIcon from './icons/views';

import '../mediatype-icon';
import '../item-image';

import '../../styles/item-tile-styles';
import { baseItemTileStyles } from '../../styles/item-tile-styles';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  render() {
    const itemTitle = this.model?.title;
    const itemCreator = this.model?.creator;
    return html`
      <div id="container">
        <div class="title-wrapper">
          <h1 id="item-title" title=${ifDefined(itemTitle)}>${itemTitle}</h1>
        </div>
        <div class="image-wrapper">
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              ${itemCreator
                ? html`<span>by&nbsp;${itemCreator}</span>`
                : nothing}
            </div>
          </div>
        </div>
        <div class="stats-wrapper">
          <div class="hr"></div>
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${this.model?.mediatype}
                .collection=${this.model?.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${viewsIcon}
              <p class="status-text">
                ${formatCount(this.model?.viewCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${favoriteFilledIcon}
              <p class="status-text">
                ${formatCount(this.model?.itemCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${reviewsIcon}
              <p class="status-text">
                ${formatCount(this.model?.favCount, 'short', 'short')}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [baseItemTileStyles];
  }
}
