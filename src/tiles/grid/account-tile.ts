import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { TileModel } from '../../models';

@customElement('account-tile')
export class UserTile extends LitElement {
  @property({ type: Object }) model?: TileModel;

  render() {
    return html`
      <div class="outter-holder">
        <div class="title-holder">
          <h1>User Profile</h1>
        </div>
        <div class="avatar-holder">
          <div class="avatar"></div>
        </div>
        <div class="credit-holder">
          <h2>${this.model?.title}</h2>
        </div>
        <div class="status-holder"></div>
      </div>
    `;
  }

  static get styles() {
    return css`
      h1 {
        color: black;
        font-size: 16px;
        margin-top: 0;
      }

      .outter-holder {
        background-color: #fcf5e6;
        border: 1px #2c2c2c;
        border-radius: 4px;
        box-shadow: 1 1 2 0;
        height: auto;
        text-align: center;
        padding: 5px;
      }

      .title-holder {
        background-color: pink;
      }

      .avatar-holder {
        background-color: gray;
      }

      .avatar {
        background-color: white;
        border-radius: 50%;
        height: 10vh;
        width: 10vw;
        display: inline-block;
        margin: 5px;
      }

      .credit-holder {
        background-color: greenyellow;
        height: 30px;
        margin-bottom: 5px;
      }

      .status-holder {
        background-color: rebeccapurple;
        height: 30px;
        margin-bottom: 5px;
      }
    `;
  }
}
