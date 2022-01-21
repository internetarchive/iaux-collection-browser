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
            <h3>Archivist Since</h3>
            <div class="year-holder">
              <h3>2001</h3>
            </div>
          </div>
          <div class="status-holder">
            <h1>stats</h1>
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
        display: inline-block;
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
      }

      .avatar {
        background-color: #dad8d8;
        border-radius: 50%;
        width: calc(var(--collectionBrowserCellWidth) - 2rem);
        height: calc(var(--collectionBrowserCellWidth) - 2rem);
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
        height: 20px;
      }
    `;
  }
}
