/* eslint-disable import/no-duplicates */
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { TileModel } from '../../models';
import { formatCount } from '../../utils/format-count';
import { formatDate } from '../../utils/format-date';

import { SortParam } from '@internetarchive/search-service';

import { favoriteFilledIcon } from './icons/favorite-filled';
import { reviewsIcon } from './icons/reviews';
import viewsIcon from './icons/views';

import '../mediatype-icon';
import '../item-image';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Object }) sortParam: SortParam | null = null;

  private get getSortedValue() {
    let sortedValue = '' as any;

    switch (this.sortParam?.field) {
      case 'date':
        sortedValue = { field : 'published', value: this.model?.datePublished };
      case 'reviewdate':
        sortedValue = { field : 'reviewed', value: this.model?.dateReviewed };
      case 'addeddate':
        sortedValue = { field : 'added', value: this.model?.dateAdded };
      case 'publicdate':
        sortedValue = { field : 'archived', value: this.model?.dateArchived };

      return html`<span>${sortedValue.field as string} ${formatDate(sortedValue.value, 'long')}</span>`;
    }
  }

  private get getCreator() {
    return this.model?.creator
      ? html`<span>by&nbsp;${this.model?.creator}</span>`
      : nothing;
  }

  render() {
    const itemTitle = this.model?.title || nothing;
    return html`
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${itemTitle}>${itemTitle}</h1>
          <div id="item-image-container">
            <item-image .model=${this.model} .baseImageUrl=${this.baseImageUrl}>
            </item-image>
          </div>
          <div class="item-creator">
            <div class="truncated">
              ${this.sortParam 
                ? this.getSortedValue
                : this.getCreator}
            </div>
          </div>
        </div>

        <div class="hr"></div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${this.model?.mediatype}
                .collection=${this.model?.collections}
                style="--iconHeight:25px; --iconWidth:25px;"
              >
              </mediatype-icon>
            </div>
            <div class="col">
              ${viewsIcon}
              <p class="status-text">
                ${formatCount(this.model?.viewCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${favoriteFilledIcon}
              <p class="status-text">
                ${formatCount(this.model?.itemCount, 'short', 'short')}
              </p>
            </div>
            <div class="col">
              ${reviewsIcon}
              <p class="status-text">
                ${formatCount(this.model?.favCount, 'short', 'short')}
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    const cornerRadiusCss = css`var(--collectionTileCornerRadius, 4px)`;

    return css`
      #container {
        background-color: #ffffff;
        border-radius: ${cornerRadiusCss};
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        position: relative;
      }

      #title-image-container {
        display: flex;
        flex: 1;
        flex-direction: column;
        padding: 0.5rem 0.5rem 0 0.5rem;
      }

      #item-title {
        color: #2c2c2c;
        font-size: 1.6rem;
        text-align: center;
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #item-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
      }

      .hidden {
        display: none;
      }

      #container:hover > #title-image-container > .item-title {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title-image-container:hover > #item-title {
        text-decoration: underline;
      }

      #container:hover > #item-title {
        background-color: #fcfcfc;
      }

      .item-creator {
        display: flex;
        justify-content: center;
        align-items: flex-end; /* Important to start text from bottom */
        height: 3rem;
        padding-top: 1rem;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
      }

      .truncated span {
        font-size: 1.4rem;
        color: #2c2c2c;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        line-height: 2rem;
        text-align: center;
      }

      .hr {
        border: 0.5px solid #ccc;
      }

      #item-stats-container {
        align-items: center;
        display: flex;
        height: 5.5rem;
        padding-left: 1rem;
        padding-right: 0.5rem;
      }

      #stats-holder {
        align-items: center;
        display: flex;
        flex: 1;
        justify-content: space-evenly;
        text-align: center;
        width: 100%;
      }

      svg {
        height: 10px;
        width: 10px;
      }

      .status-text {
        font-size: 14px;
        color: #2c2c2c;
        margin: auto;
        display: block;
        text-align: center;
      }

      .col {
        width: 25%;
      }
    `;
  }
}
