import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('account-tile')
export class UserTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div class="outter-holder">
        <div class="inner-holder">
          <div class="title-holder">
            <h1>Beez Kneez</h1>
          </div>
          <div class="avatar-holder">
            <div class="avatar"></div>
          </div>
          <div class="credit-holder">
            <div class="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div class="year-holder">
              <h3>${this.model?.date?.toDateString}</h3>
            </div>
          </div>
          <div class="status-holder">
            <div class="patron">
              <h3>hi</h3>
            </div>
            <div class="uploads">
              <h3>${this.model?.itemCount}</h3>
            </div>
            <div class="favorites">
              <h3>${this.model?.favCount}</h3>
            </div>
            <div class="reviews">
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

      h2 {
        margin: 0;
      }

      h3 {
        font-size: 14px;
        font-weight: bold;
        color: #2c2c2c;
        margin: 0px;
      }

      .outter-holder {
        background-color: #fcf5e6;
        border: 1px #2c2c2c;
        border-radius: 4px;
        box-shadow: 1 1 2 0;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        width: var(--collectionBrowserCellWidth, 180px);
      }

      .inner-holder {
        width: calc(var(--collectionBrowserCellWidth) - 10px);
        height: 96%;
        display: flex;
        flex-direction: column;
        outline: 2px dashed blue;
      }

      .title-holder {
        height: 40px;
        margin-bottom: 5px;
      }

      .avatar-holder {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        max-height: 160px;
      }

      .avatar {
        background-color: #dad8d8;
        border-radius: 50%;
        width: 160px;
        height: 160px;
        box-shadow: 1px 1px 2px #888888;
      }

      .credit-holder {
        margin-bottom: 5px;
        height: 40px;
      }

      .year-holder {
        margin: 0px;
      }

      .status-holder {
        height: 25px;
        display: flex;
        justify-content: space-evenly;
      }

      .patron {
        height: 25px;
        width: 30px;
      }

      .uploads {
        height: 25px;
        width: 30px;
      }

      .favorites {
        height: 25px;
        width: 30px;
      }

      .reviews {
        height: 25px;
        width: 30px;
      }
    `;
  }
}
