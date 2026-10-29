var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { BaseTileComponent } from '../base-tile-component';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import './tile-stats';
let AccountTile = class AccountTile extends BaseTileComponent {
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
    }
    render() {
        return html `
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.getAvatarTemplate} ${this.getTitleTemplate}
            ${this.getArchivistTemplate}
          </div>
          ${this.getTileStatsTemplate}
        </div>
      </div>
    `;
    }
    get getAvatarTemplate() {
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
      <h4 class="truncated">${this.model?.identifier}</h4>
    </div>`;
    }
    get getArchivistTemplate() {
        return html `<div class="archivist-since">
      <span>${this.displayValueProvider.accountLabel}</span>
    </div>`;
    }
    get getTileStatsTemplate() {
        return html `<tile-stats
      .mediatype=${this.model?.mediatype}
      .itemCount=${this.model?.itemCount}
      .favCount=${this.model?.favCount}
      .commentCount=${this.model?.commentCount}
    >
    </tile-stats>`;
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
    /**
     * CSS
     */
    static get styles() {
        const tileBorderColor = css `var(--tileBorderColor, #dddddd)`;
        return [
            baseTileStyles,
            css `
        .container {
          border: 1px solid ${tileBorderColor};
        }
      `,
        ];
    }
};
__decorate([
    property({ type: Boolean })
], AccountTile.prototype, "showInfoButton", void 0);
AccountTile = __decorate([
    customElement('account-tile'),
    localized()
], AccountTile);
export { AccountTile };
