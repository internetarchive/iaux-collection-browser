import { css, CSSResultGroup, html, nothing, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { msg } from '@lit/localize';

import type { SortParam } from '@internetarchive/search-service';
import { DateFormat, formatDate } from '../../utils/format-date';
import { isFirstMillisecondOfUTCYear } from '../../utils/local-date-from-utc';
import { BaseTileComponent } from '../base-tile-component';
import { baseTileStyles } from './styles/tile-grid-shared-styles';

import '../image-block';
import '../review-block';
import '../text-snippet-block';
import '../item-image';
import '../tile-mediatype-icon';
import './tile-stats';
import { SimpleLayoutType } from '../models';

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
   *  - defaultSortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   */

  @property({ type: Boolean }) showInfoButton = false;

  @property({ type: Boolean }) showTvClips = false;

  @property({ type: String }) simpleLayoutType: SimpleLayoutType = 'none';

  render() {
    const itemTitle = this.model?.title;
    const containerClasses = classMap({
      container: true,
      simple: this.simpleLayoutType !== 'none',
      'stats-only': this.simpleLayoutType === 'stats-only',
      'snippets-only': this.simpleLayoutType === 'snippets-only',
    });

    return html`
      <div class=${containerClasses}>
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
            ${this.webArchivesCaptureDatesTemplate} ${this.textSnippetsTemplate}
            ${this.reviewBlockTemplate}
          </div>

          ${this.tileStatsTemplate}
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
    switch (this.effectiveSort?.field) {
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

  private get reviewBlockTemplate(): TemplateResult | typeof nothing {
    if (!this.model?.review) return nothing;

    const { title, body, stars } = this.model.review;
    return html`
      <review-block
        viewsize="grid"
        .title=${title}
        .body=${body}
        .starRating=${stars}
      >
      </review-block>
    `;
  }

  private get textSnippetsTemplate(): TemplateResult | typeof nothing {
    if (!this.hasSnippets || this.simpleLayoutType === 'stats-only')
      return nothing;

    return html`
      <text-snippet-block viewsize="grid" .snippets=${this.model?.snippets}>
      </text-snippet-block>
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

  private get webArchivesCaptureDatesTemplate():
    | TemplateResult
    | typeof nothing {
    if (!this.model?.captureDates || !this.model.title) return nothing;

    return html`
      <ul class="capture-dates">
        ${map(
          this.model.captureDates,
          date =>
            html`<li>
              ${this.displayValueProvider.webArchivesCaptureLink(
                this.model!.title,
                date,
              )}
            </li>`,
        )}
      </ul>
    `;
  }

  /**
   * Template for the stats row along the bottom of the tile.
   */
  private get tileStatsTemplate(): TemplateResult | typeof nothing {
    if (this.simpleLayoutType === 'snippets-only') return nothing;

    const effectiveSort = this.sortParam ?? this.defaultSortParam;
    const [viewCount, viewLabel] =
      effectiveSort?.field === 'week'
        ? [this.model?.weeklyViewCount, 'weekly views']
        : [this.model?.viewCount, 'all-time views'];

    return html`
      <tile-stats
        .model=${this.model}
        .mediatype=${this.model?.mediatype}
        .viewCount=${viewCount}
        .viewLabel=${viewLabel}
        .favCount=${this.model?.favCount}
        .commentCount=${this.model?.commentCount}
        .tvClipCount=${this.model?.tvClipCount}
        .showTvClips=${this.showTvClips}
      >
      </tile-stats>
    `;
  }

  private get isSortedByDate(): boolean {
    return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(
      this.effectiveSort?.field as string,
    );
  }

  /**
   * Returns the active sort param if one is set, or the default sort param otherwise.
   */
  private get effectiveSort(): SortParam | null {
    return this.sortParam ?? this.defaultSortParam;
  }

  private get hasSnippets(): boolean {
    return !!this.model?.snippets?.length;
  }

  private infoButtonPressed(e: PointerEvent): void {
    e.preventDefault();
    const event = new CustomEvent<{ x: number; y: number }>(
      'infoButtonPressed',
      { detail: { x: e.clientX, y: e.clientY } },
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
        a:link {
          text-decoration: none;
          color: var(--ia-theme-link-color, #4b64ff);
        }
        a:hover {
          text-decoration: underline;
        }

        .container {
          border: 1px solid ${tileBorderColor};
        }

        .simple #title > .truncated {
          -webkit-line-clamp: 2;
        }

        .simple .created-by > .truncated,
        .simple .date-sorted-by > .truncated,
        .simple .volume-issue > .truncated {
          -webkit-line-clamp: 1;
        }

        .simple.snippets-only .item-info {
          padding-bottom: 5px;
        }

        .simple.snippets-only text-snippet-block {
          margin-top: auto; /* Force the snippets to the bottom of the tile */
        }

        .capture-dates {
          margin: 0;
          padding: 0 5px;
          list-style-type: none;
        }

        review-block,
        text-snippet-block {
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
