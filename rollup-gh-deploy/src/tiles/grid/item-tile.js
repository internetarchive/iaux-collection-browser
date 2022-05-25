import { __decorate } from "tslib";
/* eslint-disable import/no-duplicates */
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { formatCount } from '../../utils/format-count';
import { favoriteFilledIcon } from './icons/favorite-filled';
import { reviewsIcon } from './icons/reviews';
import viewsIcon from './icons/views';
import '../mediatype-icon';
import '../item-image';
let ItemTile = class ItemTile extends LitElement {
    render() {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        const itemTitle = ((_a = this.model) === null || _a === void 0 ? void 0 : _a.title) || '';
        const itemCreator = ((_b = this.model) === null || _b === void 0 ? void 0 : _b.creator) || '-';
        return html `
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${itemTitle}>${(_c = this.model) === null || _c === void 0 ? void 0 : _c.title}</h1>
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              <span><strong>By:&nbsp;</strong>${itemCreator}</span>
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${(_d = this.model) === null || _d === void 0 ? void 0 : _d.mediatype}
                .collection=${(_e = this.model) === null || _e === void 0 ? void 0 : _e.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${viewsIcon}
              <p class="status-text">
                ${formatCount((_f = this.model) === null || _f === void 0 ? void 0 : _f.viewCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${favoriteFilledIcon}
              <p class="status-text">
                ${formatCount((_g = this.model) === null || _g === void 0 ? void 0 : _g.itemCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${reviewsIcon}
              <p class="status-text">
                ${formatCount((_h = this.model) === null || _h === void 0 ? void 0 : _h.favCount, 'short', 'short')}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    static get styles() {
        const cornerRadiusCss = css `var(--collectionTileCornerRadius, 4px)`;
        return css `
      #container {
        background-color: #ffffff;
        border-radius: ${cornerRadiusCss};
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      }

      #title-image-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0.5rem 0.5rem 0 0.5rem;
      }

      #item-title {
        color: #2c2c2c;
        font-size: 1.6rem;
        text-align: center;
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #item-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      .hidden {
        display: none;
      }

      #container:hover > #title-image-container > .item-title {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title-image-container:hover > #item-title {
        text-decoration: underline;
      }

      #container:hover > #item-title {
        background-color: #fcfcfc;
      }

      .item-creator {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Important to start text from bottom */
        height: 3rem;
        padding-top: 1rem;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
      }

      .truncated span {
        font-size: 1.4rem;
        color: #2c2c2c;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 2rem;
        text-align: center;
      }

      .hr {
        border: 0.5px solid #ccc;
      }

      #item-stats-container {
        align-items: center;
        display: flex;
        height: 5.5rem;
        padding-left: 1rem;
        padding-right: 0.5rem;
      }

      #stats-holder {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
      }

      svg {
        height: 10px;
        width: 10px;
      }

      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: center;
      }

      .col {
        width: 25%;
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], ItemTile.prototype, "model", void 0);
__decorate([
    property({ type: String })
], ItemTile.prototype, "baseImageUrl", void 0);
ItemTile = __decorate([
    customElement('item-tile')
], ItemTile);
export { ItemTile };
//# sourceMappingURL=item-tile.js.map