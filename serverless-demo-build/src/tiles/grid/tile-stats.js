var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg, str } from '@lit/localize';
import { favoriteFilledIcon as favIcon } from '../../assets/img/icons/favorite-filled';
import { reviewsIcon } from '../../assets/img/icons/reviews';
import { uploadIcon } from '../../assets/img/icons/upload';
import { viewsIcon } from '../../assets/img/icons/views';
import { quoteIcon } from '../../assets/img/icons/quote';
import { srOnlyStyle } from '../../styles/sr-only';
import { formatCount } from '../../utils/format-count';
let TileStats = class TileStats extends LitElement {
    constructor() {
        super(...arguments);
        /** Whether to show the number of TV clips in place of reviews */
        this.showTvClips = false;
    }
    render() {
        return html `
      <div class="item-stats">
        <p class="sr-only">
          ${this.mediatype === 'account'
            ? msg('Account Stats')
            : msg('Item Stats')}
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
    get mediatypeIconColumnTemplate() {
        return html `
      <li class="col">
        <p class="sr-only">${msg('Mediatype:')}</p>
        <tile-mediatype-icon .model=${this.model}></tile-mediatype-icon>
      </li>
    `;
    }
    /**
     * Helper method to construct a template for one of the tile stat columns,
     * given its stat count, labels, and icon.
     *
     * @param count The numeric count to show for the stat. If undefined, will be treated as 0.
     * @param label The textual label describing the stat (used in the title and screenreader text).
     * @param icon The icon visually representing the stat.
     * @param classes Any additional CSS classes the stat column should have (optional).
     */
    columnTemplate(count, label, icon, classes = []) {
        const formattedCount = formatCount(count ?? 0, 'short', 'short');
        const title = msg(str `${formattedCount} ${label}`);
        const srLabel = label + ':';
        return html `
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
    get viewsColumnTemplate() {
        const label = this.viewLabel ?? msg('all-time views');
        return this.columnTemplate(this.viewCount, label, viewsIcon);
    }
    /**
     * Template for the uploads count column (replaces views for account tiles).
     */
    get uploadsColumnTemplate() {
        return this.columnTemplate(this.itemCount, msg('uploads'), uploadIcon);
    }
    /**
     * Template for the favorites count column.
     */
    get favoritesColumnTemplate() {
        return this.columnTemplate(this.favCount, msg('favorites'), favIcon);
    }
    /**
     * Template for the reviews count column.
     */
    get reviewsColumnTemplate() {
        return this.columnTemplate(this.commentCount, msg('reviews'), reviewsIcon, [
            'reviews',
        ]);
    }
    /**
     * Template for the TV clips count column (replaces reviews for TV tiles).
     */
    get tvClipsColumnTemplate() {
        return this.columnTemplate(this.tvClipCount, msg('clips'), quoteIcon);
    }
    static get styles() {
        return [
            srOnlyStyle,
            css `
        tile-mediatype-icon {
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
};
__decorate([
    property({ type: Object })
], TileStats.prototype, "model", void 0);
__decorate([
    property({ type: String })
], TileStats.prototype, "mediatype", void 0);
__decorate([
    property({ type: Number })
], TileStats.prototype, "itemCount", void 0);
__decorate([
    property({ type: Number })
], TileStats.prototype, "viewCount", void 0);
__decorate([
    property({ type: String })
], TileStats.prototype, "viewLabel", void 0);
__decorate([
    property({ type: Number })
], TileStats.prototype, "favCount", void 0);
__decorate([
    property({ type: Number })
], TileStats.prototype, "commentCount", void 0);
__decorate([
    property({ type: Boolean })
], TileStats.prototype, "showTvClips", void 0);
__decorate([
    property({ type: Number })
], TileStats.prototype, "tvClipCount", void 0);
TileStats = __decorate([
    customElement('tile-stats'),
    localized()
], TileStats);
export { TileStats };
