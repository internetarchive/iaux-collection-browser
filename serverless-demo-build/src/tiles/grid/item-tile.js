var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';
import { classMap } from 'lit/directives/class-map.js';
import { localized, msg, str } from '@lit/localize';
import { isFirstMillisecondOfUTCYear } from '../../utils/local-date-from-utc';
import { BaseTileComponent } from '../base-tile-component';
import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import '../review-block';
import '../text-snippet-block';
import '../item-image';
import '../tile-mediatype-icon';
import './tile-stats';
let ItemTile = class ItemTile extends BaseTileComponent {
    constructor() {
        /*
         * Reactive properties inherited from BaseTileComponent:
         *  - model?: TileModel;
         *  - tileActions: TileAction[] = [];
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
         *  - suppressBlurring = false;
         *  - useLocalTime = false;
         */
        super(...arguments);
        this.showInfoButton = false;
        this.showTvClips = false;
        this.layoutType = 'default';
    }
    render() {
        const itemTitle = this.model?.title;
        const containerClasses = classMap({
            container: true,
            simple: this.layoutType !== 'default',
            'stats-only': this.layoutType === 'stats-only',
            'snippets-only': this.layoutType === 'snippets-only',
            minimal: this.layoutType === 'minimal',
        });
        return html `
      <div class=${containerClasses}>
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h3 class="truncated" title=${ifDefined(itemTitle)}>
                ${itemTitle}
              </h3>
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
    get creatorTemplate() {
        const displayedCreator = this.displayValueProvider.firstCreatorMatchingFilter;
        if (!displayedCreator)
            return nothing;
        return html `
      <div class="created-by">
        <span class="truncated" title=${displayedCreator}>
          ${msg(str `by\u00a0${displayedCreator}`)}
        </span>
      </div>
    `;
    }
    get imageBlockTemplate() {
        return html `
      <image-block
        .model=${this.model}
        .baseImageUrl=${this.baseImageUrl}
        .loggedIn=${this.loggedIn}
        .suppressBlurring=${this.suppressBlurring}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'grid'}
      >
      </image-block>
    `;
    }
    get sortedDateInfoTemplate() {
        let sortedValue;
        let format = 'long';
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
        const formattedDate = this.getFormattedDate(sortedValue.value, format);
        return html `
      <div class="date-sorted-by truncated">
        <span>${sortedValue.field} ${formattedDate}</span>
      </div>
    `;
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
    get reviewBlockTemplate() {
        if (!this.model?.review)
            return nothing;
        const { reviewtitle, reviewbody, stars } = this.model.review;
        return html `
      <review-block
        viewsize="grid"
        title=${ifDefined(reviewtitle)}
        body=${ifDefined(reviewbody)}
        starRating=${ifDefined(stars)}
      >
      </review-block>
    `;
    }
    get textSnippetsTemplate() {
        if (!this.hasSnippets)
            return nothing;
        if (['stats-only', 'minimal'].includes(this.layoutType)) {
            return nothing;
        }
        return html `
      <text-snippet-block viewsize="grid" .snippets=${this.model?.snippets}>
      </text-snippet-block>
    `;
    }
    get volumeIssueTemplate() {
        if (!this.model?.volume || !this.model?.issue)
            return nothing;
        return html `
      <div class="volume-issue">
        <span class="truncated" title=${msg('volume|issue')}>
          ${msg(str `Volume\u00a0${this.model.volume}, Issue\u00a0${this.model.issue}`)}
        </span>
      </div>
    `;
    }
    get webArchivesCaptureDatesTemplate() {
        if (!this.model?.captureDates || !this.model.title)
            return nothing;
        return html `
      <ul class="capture-dates">
        ${map(this.model.captureDates, date => html `<li>
              ${this.displayValueProvider.webArchivesCaptureLink(this.model.title, date)}
            </li>`)}
      </ul>
    `;
    }
    /**
     * Template for the stats row along the bottom of the tile.
     */
    get tileStatsTemplate() {
        if (['snippets-only', 'minimal'].includes(this.layoutType)) {
            return nothing;
        }
        const effectiveSort = this.sortParam ?? this.defaultSortParam;
        const [viewCount, viewLabel] = effectiveSort?.field === 'week'
            ? [this.model?.weeklyViewCount, msg('weekly views')]
            : [this.model?.viewCount, msg('all-time views')];
        return html `
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
    get isSortedByDate() {
        return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(this.effectiveSort?.field);
    }
    /**
     * Returns the active sort param if one is set, or the default sort param otherwise.
     */
    get effectiveSort() {
        return this.sortParam ?? this.defaultSortParam;
    }
    get hasSnippets() {
        return !!this.model?.snippets?.length;
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

        .simple.snippets-only .item-info,
        .simple.minimal .item-info {
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
};
__decorate([
    property({ type: Boolean })
], ItemTile.prototype, "showInfoButton", void 0);
__decorate([
    property({ type: Boolean })
], ItemTile.prototype, "showTvClips", void 0);
__decorate([
    property({ type: String })
], ItemTile.prototype, "layoutType", void 0);
ItemTile = __decorate([
    customElement('item-tile'),
    localized()
], ItemTile);
export { ItemTile };
