import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

import './tile-stats';

@customElement('account-tile')
export class AccountTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div class="outer-holder">
        <div id="header-holder">
          <div id="title-holder">
            <h1 class="truncated">${this.model?.identifier}</h1>
          </div>
        </div>

        <div class="inner-holder">
          <div id="avatar-holder">
            <img
              id="avatar"
              alt="patron-avatar"
              src="https://archive.org/services/img/${this.model?.identifier}"
            />
          </div>

          <div id="year-holder">
            <div id="archivist-since">
              <span>
                Archivist since ${this.model?.dateAdded?.getFullYear()}
              </span>
            </div>
          </div>
        </div>

        <tile-stats
          .mediatype=${this.model?.mediatype}
          .itemCount=${this.model?.itemCount}
          .favCount=${this.model?.favCount}
          .commentCount=${this.model?.commentCount}
        >
        </tile-stats>
      </div>
    `;
  }

  static get styles() {
    return css`
      h1 {
        color: black;
        font-size: 16px;
        margin: 0;
      }

      span {
        font-size: 14px;
        color: #2c2c2c;
        margin: 0px;
      }

      .outer-holder {
        background-color: #fcf5e6;
        border: 1px #2c2c2c;
        border-radius: 4px;
        box-shadow: 1px 1px 2px 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        text-align: center;
        width: 100%;
        padding-bottom: 5px;
      }

      .inner-holder {
        flex-grow: 1;
      }

      #title-holder {
        flex-shrink: 0;
        height: 40px;
        margin-bottom: 5px;
      }

      #avatar-holder {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #avatar {
        background-position: 50% 50%;
        border-radius: 50%;
        width: 160px;
        height: 160px;
        box-shadow: 1px 1px 2px #888888;
      }

      #year-holder {
        margin-bottom: 5px;
        height: 40px;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
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
