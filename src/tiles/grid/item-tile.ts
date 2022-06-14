/* eslint-disable import/no-duplicates */
import { CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TileModel } from '../../models';

import '../mediatype-icon';
import '../item-image';
import '../item-stats';

import { itemTileStyles } from '../../styles/item-tile-styles';

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
              ${
                itemCreator
                  ? html`<span>by&nbsp;${itemCreator}</span>`
                  : nothing
              }
            </div>
          </div>
        </div>

        <item-stats 
          .mediatype=${this.model?.mediatype}
          .viewCount=${this.model?.viewCount}
          .favCount=${this.model?.favCount}
          .commentCount=${this.model?.commentCount}>
        </item-stats>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [itemTileStyles];
  }
}
