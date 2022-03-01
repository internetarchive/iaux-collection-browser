import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

import accountIcon from './icons/account';
import favoriteFilledIcon from './icons/favorite-filled';
import reviewsIcon from './icons/reviews';
import uploadIcon from './icons/upload';

@customElement('account-tile')
export class UserTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div class="outer-holder">
        <div class="inner-holder">
          <div id="header-holder">
            <div id="title-holder">
              <h1>${this.model?.identifier}</h1>
            </div>
            <div id="avatar-holder">
              <div
                id="avatar"
                style="background-image: url('https://archive.org/services/img/${this
                  .model?.identifier}')"
              ></div>
            </div>
          </div>
          <div id="year-holder">
            <div id="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div id="year-holder">
              <h3>${this.model?.dateAdded?.getFullYear()}</h3>
            </div>
          </div>
          <div id="status-holder">
            <div id="patron-icon">${accountIcon}</div>
            <div class="stat-icon">
              ${uploadIcon}
              <h3>${this.model?.itemCount}</h3>
            </div>
            <div class="stat-icon">
              ${favoriteFilledIcon}
              <h3>${this.model?.favCount}</h3>
            </div>
            <div class="stat-icon">
              ${reviewsIcon}
              <h3>${this.model?.commentCount}</h3>
            </div>
          </div>
        </div>
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

      h3 {
        font-size: 14px;
        font-weight: bold;
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
        text-align: center;
        width: 100%;
      }

      .inner-holder {
        padding: 5px;
        width: 100%;
        display: flex;
        flex-direction: column;
      }

      #header-holder {
        flex: 1;
      }

      #title-holder {
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

      #year-holder {
        margin: 0px;
      }

      #status-holder {
        height: 25px;
        display: flex;
        justify-content: space-evenly;
      }

      #patron-icon {
        height: 25px;
        width: 25px;
      }

      .stat-icon {
        height: 10px;
        width: 10px;
      }
    `;
  }
}
