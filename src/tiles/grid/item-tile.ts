/* eslint-disable import/no-duplicates */
import { css, CSSResultGroup, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';
import { formatCount } from '../../utils/format-count';

import '../../mediatype-icon';

import { favoriteFilledIcon } from './icons/favorite-filled';
import { reviewsIcon } from './icons/reviews';
import viewsIcon from './icons/views';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  private readonly mediatypeIconsColor: { [key: string]: any } = {
    account: '#000000',
    audio: '#8fdaef',
    data: '#333333',
    etree: '#3871c1',
    film: '#bf1b2c',
    image: '#62c4a9',
    movies: '#bf1b2c',
    software: '#80cc28',
    texts: '#f9a72b',
    tv: '#f25d54',
    video: '#bf1b2c',
    web: '#fddd10',
  };

  get renderItemImageView() {
    const imgSrcUrl = `${this.baseNavigationUrl}/services/img/${this.model?.identifier}`;

    const containsDeemphasize = this.model?.collections.includes('deemphasize');
    const itemImageBoxClass = containsDeemphasize ? 'item-image-box' : '';
    const itemImageClass = `item-image ${
      !containsDeemphasize ? 'default' : 'deemphasize'
    }`;
    const tileActionClass = `tile-action no-preview${
      !containsDeemphasize ? ' hidden' : ''
    }`;

    return html`
      <div class=${itemImageBoxClass}>
        <div
          class=${itemImageClass}
          style="background-image:url(${imgSrcUrl})"
        ></div>
        <div class=${tileActionClass}>Content may be inappropriate</div>
      </div>
    `;
  }

  render() {
    const mediatype = this.model?.mediatype || '';
    const iconFillColor = this.mediatypeIconsColor[mediatype];

    const itemTitle = this.model?.title || '';
    const itemCreator = this.model?.creator || '-';

    return html`
      <div id="container">
        <div id="title-image-container">
          <h1 id="item-title" title=${itemTitle}>${this.model?.title}</h1>
          <div id="item-image-container">${this.renderItemImageView}</div>
          <div class="item-creator">
            <span><strong>By:&nbsp;</strong>${itemCreator}</span>
          </div>
        </div>

        <div id="item-stats-container">
          <div id="stats-holder">
            <div class="col">
              <mediatype-icon
                .mediatype=${mediatype}
                .collection=${this.model?.collections}
                ?showText=${true}
                style="--iconFillColor: ${iconFillColor};"
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

      .item-image-box {
        width: 16rem;
        height: 16rem;
        overflow: hidden;
        position: relative;
        box-shadow: 1px 1px 2px 0px;
        display: flex;
      }

      .item-image {
        width: 16rem;
        height: 16rem;
        object-fit: cover;
        background-repeat: no-repeat;
        background-position: center center;
        position: relative;
        -webkit-appearance: none;
        overflow: visible;
      }

      .default {
        background-size: contain;
        filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.8));
      }

      .deemphasize {
        background-size: cover;
        filter: blur(15px);
        z-index: 1;
      }

      .tile-action {
        border: 1px solid currentColor;
        border-radius: 1px;
        padding: 5px;
        font-weight: 500;
        width: auto;
        position: absolute;
        z-index: 2;
        display: flex;
        top: 5.5rem;
      }

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
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
        color: #2c2c2c;
        font-size: 1.4rem;
        height: 3rem;
        overflow: hidden;
        text-align: center;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        padding-top: 1rem;
        padding-bottom: 0.5rem;
      }

      #item-stats-container {
        align-items: center;
        display: flex;
        height: 5.5rem;
        padding-left: 1rem;
        padding-right: 0.5rem;
        border-top: 1px solid #ccc;
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
