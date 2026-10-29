var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import { BaseTileComponent } from '../base-tile-component';
import '../image-block';
let SearchTile = class SearchTile extends BaseTileComponent {
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
         */
        super(...arguments);
        this.showInfoButton = false;
    }
    render() {
        return html `
      <div class="container">
        <div class="tile-details">
          <div class="item-info">
            ${this.getImageBlockTemplate} ${this.getTitleTemplate}
          </div>
        </div>
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
          -webkit-line-clamp: 4;
        }

        .container:hover > #title {
          text-decoration: underline;
        }

        /* this is a workaround for Safari 15 where the hover effects are not working */
        image-block:hover > #title {
          text-decoration: underline;
        }
      `,
        ];
    }
};
__decorate([
    property({ type: Boolean })
], SearchTile.prototype, "showInfoButton", void 0);
SearchTile = __decorate([
    customElement('search-tile')
], SearchTile);
export { SearchTile };
