/* eslint-disable import/no-duplicates */
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { SortParam } from '@internetarchive/search-service';

import { formatDate } from '../../utils/format-date';
import type { TileModel } from '../../models';

import '../image-block';
import '../item-image';
import '../mediatype-icon';
import './tile-stats';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Object }) model?: TileModel;

  @property({ type: Object }) sortParam?: SortParam;

  render() {
    const itemTitle = this.model?.title;

    return html`
      <div class="container">
        <div class="item-info">
          <div id="title">
            <h1 class="truncated" title=${ifDefined(itemTitle)}>
              ${itemTitle}
            </h1>
          </div>

          <image-block 
            .model=${this.model}
            .baseImageUrl=${this.baseImageUrl}
            .loggedIn=${this.loggedIn}
            .isCompactTile=${false}
            .isListTile=${false}
            .viewSize=${'grid'}>
          </image-block>

          ${
            this.doesSortedByDate
              ? this.sortedDateInfoTemplate
              : this.creatorTemplate
          }
        </div>

        <tile-stats 
          .mediatype=${this.model?.mediatype}
          .viewCount=${this.model?.viewCount}
          .favCount=${this.model?.favCount}
          .commentCount=${this.model?.commentCount}>
        </tile-stats>
        </div>
      </div>
    `;
  }

  /**
   * Templates
   */
  private get doesSortedByDate() {
    return ['date', 'reviewdate', 'addeddate', 'publicdate'].includes(
      this.sortParam?.field as string
    );
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

    return html`
      <div class="date-sorted-by truncated">
        <span>
          ${sortedValue?.field} ${formatDate(sortedValue?.value, 'long')}
        </span>
      </div>
    `;
  }

  private get creatorTemplate() {
    return html`
      <div class="created-by truncated">
        ${this.model?.creator
          ? html`<span>by&nbsp;${this.model?.creator}</span>`
          : nothing}
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .container {
        background-color: #ffffff;
        border-radius: var(--collectionTileCornerRadius, 4px);
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
      }

      .item-info {
        padding: 5px 5px 0 5px;
        flex-grow: 1;
      }

      #title {
        flex-shrink: 0;
      }

      .hidden {
        display: none;
      }

      .container:hover > .item-info > #title > .truncated {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title:hover > .truncated {
        text-decoration: underline;
      }

      .created-by,
      .date-sorted-by {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Important to start text from bottom */
        height: 3rem;
        padding-top: 1rem;
        margin-top: 5px;
      }

      .truncated {
        flex: 1;
        color: #2c2c2c;
        min-width: 0; /* Important for long words! */
        text-align: center;
        line-height: 2rem;
        text-overflow: ellipsis;
        overflow: hidden;
        word-wrap: break-word;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .truncated span {
        font-size: 1.4rem;
        display: -webkit-box;
      }

      h1.truncated {
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        font-size: 1.6rem;
        height: 4rem;
        display: -webkit-box;
      }
    `;
  }
}
