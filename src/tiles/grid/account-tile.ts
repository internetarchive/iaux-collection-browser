import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { TileModel } from '../../models';

import './tile-stats';

@customElement('account-tile')
export class AccountTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div class="container">
        <div class="account-info">
          ${this.getAvatar} ${this.getTitle} ${this.getArchivist}
        </div>
        ${this.getTileStats}
      </div>
    `;
  }

  private get getAvatar() {
    return html`<div id="avatar-info">
      <img
        id="avatar"
        alt="patron-avatar"
        src="https://archive.org/services/img/${this.model?.identifier}"
      />
    </div>`;
  }

  private get getTitle() {
    return html`<div id="title">
      <h1 class="truncated">${this.model?.identifier}</h1>
    </div>`;
  }

  private get getArchivist() {
    return html`<div id="archivist-since">
      Archivist since ${this.model?.dateAdded?.getFullYear()}
    </div>`;
  }

  private get getTileStats() {
    return html`<tile-stats
      .mediatype=${this.model?.mediatype}
      .itemCount=${this.model?.itemCount}
      .favCount=${this.model?.favCount}
      .commentCount=${this.model?.commentCount}
    >
    </tile-stats>`;
  }

  static get styles() {
    return css`
      .container {
        background-color: #fcf5e6;
        border: 1px #2c2c2c;
        border-radius: 4px;
        box-shadow: 1px 1px 2px 0px;
        height: 100%;
        display: flex;
        flex-direction: column;
        width: 100%;
      }

      .account-info {
        flex-grow: 1;
        padding: 5px;
      }

      #title {
        margin: 5px 0 10px 0;
      }
      #title h1 {
        font-size: 1.4rem;
        text-align: left;
        margin: 0;
      }

      .container:hover > .account-info > #title > .truncated {
        text-decoration: underline;
      }

      /** this is a workaround for Safari 15 where the hover effects are not working */
      #title:hover > .truncated {
        text-decoration: underline;
      }

      #avatar-info {
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
        margin: 0 auto;
      }

      #archivist-since {
        margin-bottom: 5px;
        font-size: 1.4rem;
      }

      .truncated {
        flex: 1;
        min-width: 0; /* Important for long words! */
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        word-wrap: break-word;
        text-align: center;
      }
    `;
  }
}
