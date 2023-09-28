/* eslint-disable import/no-duplicates */
import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';

import { DateFormat, formatDate } from '../../utils/format-date';
import { isFirstMillisecondOfUTCYear } from '../../utils/local-date-from-utc';
import { BaseTileComponent } from '../base-tile-component';

import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import '../text-snippet-block';
import '../review-block';
import '../item-image';
import '../mediatype-icon';
import './tile-stats';

@customElement('item-tile')
export class ItemTile extends BaseTileComponent {
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
   */

  @property({ type: Boolean }) showInfoButton = false;

  render() {
    const itemTitle = this.model?.title;
    const [viewCount, viewLabel] =
      this.sortParam?.field === 'week'
        ? [this.model?.weeklyViewCount, 'weekly views']
        : [this.model?.viewCount, 'all-time views'];

    return html`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h4 class="truncated" title=${ifDefined(itemTitle)}>
                ${itemTitle}
              </h4>
            </div>

            ${this.volumeIssueTemplate}
            ${this.isSortedByDate
              ? this.sortedDateInfoTemplate
              : this.creatorTemplate}
            ${this.textSnippetsTemplate} ${this.reviewBlockTemplate}
          </div>

          <tile-stats
            .mediatype=${this.model?.mediatype}
            .viewCount=${viewCount}
            .viewLabel=${viewLabel}
            .favCount=${this.model?.favCount}
            .commentCount=${this.model?.commentCount}
          >
          </tile-stats>
        </div>
      </div>
    `;
  }

  /**
   * Templates
   */
  private get creatorTemplate(): TemplateResult | typeof nothing {
    const displayedCreator =
      this.displayValueProvider.firstCreatorMatchingFilter;
    if (!displayedCreator) return nothing;

    return html`
      <div class="created-by">
        <span class="truncated" title=${displayedCreator}>
          by&nbsp;${displayedCreator}
        </span>
      </div>
    `;
  }

  private get imageBlockTemplate(): TemplateResult {
    return html`
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'grid'}
      >
      </image-block>
    `;
  }

  private get sortedDateInfoTemplate() {
    let sortedValue;
    let format: DateFormat = 'long';
    switch (this.sortParam?.field) {
      case 'date': {
        const datePublished = this.model?.datePublished;
        sortedValue = { field: 'published', value: datePublished };
        if (isFirstMillisecondOfUTCYear(datePublished)) {
          format = 'year-only';
        }
        break;
      }
      case 'reviewdate':
        sortedValue = { field: 'reviewed', value: this.model?.dateReviewed };
        break;
      case 'addeddate':
        sortedValue = { field: 'added', value: this.model?.dateAdded };
        break;
      case 'publicdate':
        sortedValue = { field: 'archived', value: this.model?.dateArchived };
        break;
      default:
        break;
    }

    if (!sortedValue?.value) {
      return nothing;
    }
    return html`
      <div class="date-sorted-by truncated">
        <span>
          ${sortedValue?.field} ${formatDate(sortedValue?.value, format)}
        </span>
      </div>
    `;
  }

  private get infoButtonTemplate(): TemplateResult | typeof nothing {
    // &#9432; is an information icon
    return this.showInfoButton
      ? html`<button class="info-button" @click=${this.infoButtonPressed}>
          &#9432;
          <span class="sr-only">${msg('More info')}</span>
        </button>`
      : nothing;
  }

  private get textSnippetsTemplate(): TemplateResult | typeof nothing {
    if (!this.hasSnippets) return nothing;

    return html`
      <text-snippet-block viewsize="grid" .snippets=${this.model?.snippets}>
      </text-snippet-block>
    `;
  }

  private get reviewBlockTemplate(): TemplateResult | typeof nothing {
    if (!this.model?.review) return nothing;

    const { id, title, body, starRating } = this.model.review;
    return html`
      <review-block
        viewsize="grid"
        .identifier=${this.model.identifier}
        .reviewId=${id}
        .reviewTitle=${title}
        .reviewBody=${body}
        .starRating=${starRating}
      >
      </review-block>
    `;
  }

  private get volumeIssueTemplate(): TemplateResult | typeof nothing {
    if (!this.model?.volume || !this.model?.issue) return nothing;

    return html`
      <div class="volume-issue">
        <span class="truncated" title="volume|issue">
          Volume&nbsp;${this.model?.volume}, Issue&nbsp;${this.model?.issue}
        </span>
      </div>
    `;
  }

  private get isSortedByDate(): boolean {
    return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(
      this.sortParam?.field as string
    );
  }

  private get hasSnippets(): boolean {
    return !!this.model?.snippets?.length;
  }

  private infoButtonPressed(e: PointerEvent): void {
    e.preventDefault();
    const event = new CustomEvent<{ x: number; y: number }>(
      'infoButtonPressed',
      { detail: { x: e.clientX, y: e.clientY } }
    );
    this.dispatchEvent(event);
  }

  /**
   * CSS
   */
  static get styles(): CSSResultGroup {
    const tileBorderColor = css`var(--tileBorderColor, #dddddd)`;

    return [
      baseTileStyles,
      css`
        .container {
          border: 1px solid ${tileBorderColor};
        }

        text-snippet-block,
        review-block {
          --containerLeftMargin: 5px;
          --containerTopMargin: 5px;
        }

        /**
         * iOS Safari long-press on tiles (to bring up hover pane)
         * gets messy without this
         */
        @media screen and (pointer: coarse) and (hover: none) {
          .container {
            -webkit-touch-callout: none;
          }

          .truncated {
            -webkit-touch-callout: default;
          }
        }
      `,
    ];
  }
}
