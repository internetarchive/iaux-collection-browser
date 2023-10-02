import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { favoriteFilledIcon } from '../assets/img/icons/favorite-filled';
import { favoriteUnfilledIcon } from '../assets/img/icons/favorite-unfilled';
import { srOnlyStyle } from '../styles/sr-only';

@customElement('review-block')
export class ReviewBlock extends LitElement {
  @property({ type: String }) identifier?: string;

  @property({ type: String }) reviewTitle = '';

  @property({ type: String }) reviewBody = '';

  @property({ type: String }) reviewId = '';

  @property({ type: Number }) starRating = 0;

  @property({ type: String }) viewSize = 'desktop';

  render() {
    if (!this.reviewTitle && !this.reviewBody && !this.starRating)
      return nothing;

    return html`
      <div class="review-container">
        <div class="snippet-view ${this.viewSize}">
          ${this.starsTemplate}
          <p class="review-title">${this.reviewTitle}</p>
          <p class="review-body">${this.reviewBody}</p>
        </div>
      </div>
    `;
  }

  private get starsTemplate(): TemplateResult | typeof nothing {
    if (this.starRating <= 0) return nothing;

    const numFilledStars = Math.min(5, this.starRating);
    const numUnfilledStars = Math.min(5, 5 - this.starRating);
    return html`
      <div class="star-rating">
        <span class="sr-only">${this.starRating} out of 5 stars</span>
        ${Array(numFilledStars).fill(this.filledStarTemplate)}
        ${Array(numUnfilledStars).fill(this.unfilledStarTemplate)}
      </div>
    `;
  }

  private get filledStarTemplate(): TemplateResult {
    return html`<span aria-hidden="true">${favoriteFilledIcon}</span>`;
  }

  private get unfilledStarTemplate(): TemplateResult {
    return html`
      <span class="unfilled-star" aria-hidden="true">
        ${favoriteUnfilledIcon}
      </span>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      srOnlyStyle,
      css`
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

        .star-rating {
        }

        .star-rating svg {
          width: 10px;
          height: 10px;
        }

        .unfilled-star {
          fill: #ccc;
        }

        .grid {
        }

        .list {
          margin: 0;
          padding-left: 5px;
        }
      `,
    ];
  }
}
