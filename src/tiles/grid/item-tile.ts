/* eslint-disable import/no-duplicates */
import { css, CSSResultGroup, html, LitElement, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { TileModel } from '../../models';

import '../mediatype-icon';
import '../item-image';
import './tile-stats';

@customElement('item-tile')
export class ItemTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseImageUrl?: string;

  render() {
    const itemTitle = this.model?.title;
    const itemCreator = this.model?.creator;
    return html`
      <div id="container">
        <div id="inner-wrapper">
          <div class="title-wrapper">
            <h1 id="item-title" title=${ifDefined(itemTitle)}>${itemTitle}</h1>
          </div>

          <div class="image-wrapper">
            <div id="item-image-container">
              <item-image .model=${this.model} .baseImageUrl=${
      this.baseImageUrl
    }>
              </item-image>
            </div>
            <div class="item-creator">
              <div class="truncated">
                ${
                  itemCreator
                    ? html`<span>by&nbsp;${itemCreator}</span>`
                    : nothing
                }
              </div>
            </div>
          </div>
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

  static get styles(): CSSResultGroup {
    return css`
      #container {
        background-color: #ffffff;
        border-radius: var(--collectionTileCornerRadius, 4px);
        box-shadow: 1px 1px 2px 0px;
        display: flex;
        flex-direction: column;
        height: 100%;
        padding-bottom: 5px;
      }

      #inner-wrapper {
        padding-top: 5px;
        padding-left: 5px;
        padding-right: 5px;
      }

      .title-wrapper {
        flex-shrink: 0;
      }

      .image-wrapper {
        flex-grow: 1;
      }

      #item-title {
        flex: 1;
        color: #2c2c2c;
        min-width: 0; /* Important for long words! */
        font-size: 1.6rem;
        text-align: center;
        margin-top: 0rem;
        margin-bottom: 0.5rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        word-wrap: break-word;
        word-break: break-all;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        line-height: 2rem;
        height: 4rem;
      }

      #item-image-container {
        display: flex;
        justify-content: center;
        flex: 1;
        height: 16rem;
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
        margin-top: 5px;
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
        word-break: break-all;
        line-height: 2rem;
        text-align: center;
      }
    `;
  }
}
