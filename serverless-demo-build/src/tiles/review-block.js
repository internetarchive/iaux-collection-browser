var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement, nothing, } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { favoriteFilledIcon } from '../assets/img/icons/favorite-filled';
import { favoriteUnfilledIcon } from '../assets/img/icons/favorite-unfilled';
import { srOnlyStyle } from '../styles/sr-only';
let ReviewBlock = class ReviewBlock extends LitElement {
    constructor() {
        super(...arguments);
        this.title = '';
        this.body = '';
        this.starRating = 0;
        this.viewSize = 'desktop';
    }
    render() {
        if (!this.title && !this.body && !this.starRating)
            return nothing;
        return html `
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.title}</p>
          <p class="review-body">${this.body}</p>
        </div>
      </div>
    `;
    }
    get starsTemplate() {
        if (this.starRating <= 0)
            return nothing;
        const numFilledStars = Math.min(5, this.starRating);
        const numUnfilledStars = Math.min(5, 5 - this.starRating);
        return html `
      <div class="star-rating">
        <span class="sr-only">${this.starRating} ${msg('out of 5 stars')}</span>
        ${Array(numFilledStars).fill(this.filledStarTemplate)}
        ${Array(numUnfilledStars).fill(this.unfilledStarTemplate)}
      </div>
    `;
    }
    get filledStarTemplate() {
        return html `<span aria-hidden="true">${favoriteFilledIcon}</span>`;
    }
    get unfilledStarTemplate() {
        return html `
      <span class="unfilled-star" aria-hidden="true">
        ${favoriteUnfilledIcon}
      </span>
    `;
    }
    static get styles() {
        return [
            srOnlyStyle,
            css `
        .review-container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: calc(100% - 10px);
          border: 1px solid #ccc;
          margin-top: var(--containerTopMargin, 10px);
          margin-left: var(--containerLeftMargin, 0px);
          padding: 5px;
          box-sizing: border-box;
        }

        .review-title,
        .review-body {
          display: -webkit-box;
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          overflow: hidden;
          overflow-wrap: break-word;
          word-break: break-word;
          -webkit-line-clamp: var(--maxLines, 3);
          -webkit-box-orient: vertical;
          margin: 0;
        }

        .review-title {
          font-size: 1.4rem;
          line-height: 2rem;
          max-height: 6rem;
        }

        .review-title > a[href] {
          color: inherit;
          text-decoration: none;
        }

        .review-title > a[href]:hover {
          text-decoration: underline;
        }

        .review-body {
          font-size: 1rem;
          line-height: 1.4rem;
          max-height: 4.2rem;
        }

        .star-rating svg {
          width: 10px;
          height: 10px;
        }

        .unfilled-star {
          fill: #ccc;
        }

        .list {
          margin: 0;
          padding-left: 5px;
        }
      `,
        ];
    }
};
__decorate([
    property({ type: String })
], ReviewBlock.prototype, "title", void 0);
__decorate([
    property({ type: String })
], ReviewBlock.prototype, "body", void 0);
__decorate([
    property({ type: Number })
], ReviewBlock.prototype, "starRating", void 0);
__decorate([
    property({ type: String })
], ReviewBlock.prototype, "viewSize", void 0);
ReviewBlock = __decorate([
    customElement('review-block'),
    localized()
], ReviewBlock);
export { ReviewBlock };
