/* eslint-disable import/no-duplicates */
import {
  css,
  CSSResultGroup,
  html,
  LitElement,
  nothing,
  TemplateResult,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { SortParam } from '@internetarchive/search-service';

import { formatDate } from '../../utils/format-date';
import type { TileModel } from '../../models';

import { baseTileStyles } from './styles/tile-grid-shared-styles';
import '../image-block';
import '../text-snippet-block';
import '../item-image';
import '../mediatype-icon';
import './tile-stats';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) model?: TileModel;

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: Boolean }) showInfoButton = false;

  render() {
    const itemTitle = this.model?.title;

    return html`
      <div class="container">
        ${this.infoButtonTemplate}
        <div class="tile-details">
          <div class="item-info">
            ${this.imageBlockTemplate}

            <div id="title">
              <h1 class="truncated" title=${ifDefined(itemTitle)}>
                ${itemTitle}
              </h1>
            </div>

            ${this.volumeIssueTemplate}
            ${this.doesSortedByDate
              ? this.sortedDateInfoTemplate
              : this.creatorTemplate}
            ${this.textSnippetsTemplate}
          </div>

          <tile-stats
            .mediatype=${this.model?.mediatype}
            .viewCount=${this.model?.viewCount}
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
    if (!this.model?.creator) return nothing;

    return html`
      <div class="created-by">
        <span class="truncated" title=${ifDefined(this.model?.creator)}>
          by&nbsp;${this.model?.creator}
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
    switch (this.sortParam?.field) {
      case 'date':
        sortedValue = { field: 'published', value: this.model?.datePublished };
        break;
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
          ${sortedValue?.field} ${formatDate(sortedValue?.value, 'long')}
        </span>
      </div>
    `;
  }

  private get infoButtonTemplate(): TemplateResult | typeof nothing {
    // &#9432; is an information icon
    return this.showInfoButton
      ? html`<button class="info-button" @click=${this.infoButtonPressed}>
          &#128712;
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

  private get doesSortedByDate() {
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
