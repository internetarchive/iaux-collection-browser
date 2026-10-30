var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { localized, msg, str } from '@lit/localize';
import { collectionIcon } from '../../assets/img/icons/mediatype/collection';
import { formatUnitSize } from '../../utils/format-unit-size';
import { getLocale } from '../../utils/get-locale';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import { BaseTileComponent } from '../base-tile-component';
import '../image-block';
let CollectionTile = class CollectionTile extends BaseTileComponent {
    constructor() {
        /*
         * Reactive properties inherited from BaseTileComponent:
         *  - model?: TileModel;
         *  - currentWidth?: number;
         *  - currentHeight?: number;
         *  - baseNavigationUrl?: string;
         *  - baseImageUrl?: string;
         *  - collectionPagePath?: string;
         *  - sortParam: SortParam | null = null;
         *  - creatorFilter?: string;
         *  - mobileBreakpoint?: number;
         *  - loggedIn = false;
         *  - suppressBlurring = false;
         *  - useLocalTime = false;
         */
        super(...arguments);
        this.showInfoButton = false;
        this.layoutType = 'default';
    }
    render() {
        const containerClasses = classMap({
            container: true,
            minimal: this.layoutType === 'minimal',
        });
        return html `
      <div class=${containerClasses}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>

        ${this.getTileStatsTemplate}
      </div>
    `;
    }
    get getImageBlockTemplate() {
        return html `
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .viewSize=${'grid'}
        .suppressBlurring=${this.suppressBlurring}
      >
      </image-block>
    `;
    }
    get getTitleTemplate() {
        return html `<div id="title">
      <h3 class="truncated">${this.model?.title}</h3>
    </div>`;
    }
    get getTileStatsTemplate() {
        return html `
      <div id="item-stats">
        <div id="item-mediatype">${collectionIcon}</div>

        <div id="stats-row">
          ${this.getItemsTemplate} ${this.getSizeTemplate}
        </div>
      </div>
    `;
    }
    get getItemsTemplate() {
        const itemCount = this.model?.itemCount;
        const formattedCount = itemCount === undefined
            ? undefined
            : new Intl.NumberFormat(getLocale()).format(itemCount);
        const itemsLabel = itemCount === 1
            ? msg(str `${formattedCount} item`)
            : msg(str `${formattedCount} items`);
        return html `<span id="item-count">${itemsLabel}</span>`;
    }
    get getSizeTemplate() {
        const collectionSize = this.model?.collectionSize ?? 0;
        return collectionSize
            ? html `<span id="item-size">${formatUnitSize(collectionSize, 1)}</span>`
            : ``;
    }
    get infoButtonTemplate() {
        // &#9432; is an information icon
        return this.showInfoButton
            ? html `<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${msg('More info')}</span>
        </button>`
            : nothing;
    }
    infoButtonPressed(e) {
        e.preventDefault();
        const event = new CustomEvent('infoButtonPressed', { detail: { x: e.clientX, y: e.clientY } });
        this.dispatchEvent(event);
    }
    static get styles() {
        const tileBorderColor = css `var(--tileBorderColor, #555555)`;
        const tileBackgroundColor = css `var(--tileBackgroundColor, #666666)`;
        const whiteColor = css `#fff`;
        return [
            baseTileStyles,
            css `
        .container {
          background-color: ${tileBackgroundColor};
          border: 1px solid ${tileBorderColor};
        }

        .item-info {
          flex-grow: initial;
        }

        h4.truncated,
        h3.truncated {
          color: ${whiteColor};
        }

        #item-mediatype svg {
          filter: invert(100%);
          height: 2.5rem;
          align-items: baseline;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }

        #item-stats {
          display: flex;
          padding: 0 5px 5px;
          align-items: center;
        }

        #stats-row {
          display: flex;
          align-items: baseline;
          color: ${whiteColor};
          flex-direction: column;
          margin-left: 10px;
        }

        .minimal #item-stats {
          display: none;
        }

        .minimal .truncated {
          -webkit-line-clamp: initial;
        }

        .minimal .item-info {
          padding-bottom: 5px;
        }
      `,
        ];
    }
};
__decorate([
    property({ type: Boolean })
], CollectionTile.prototype, "showInfoButton", void 0);
__decorate([
    property({ type: String })
], CollectionTile.prototype, "layoutType", void 0);
CollectionTile = __decorate([
    customElement('collection-tile'),
    localized()
], CollectionTile);
export { CollectionTile };
