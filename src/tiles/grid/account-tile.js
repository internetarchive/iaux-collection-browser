import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { accountIcon } from './icons/account';
import { favoriteFilledIcon } from './icons/favorite-filled';
import { reviewsIcon } from './icons/reviews';
import { uploadIcon } from './icons/upload';
let AccountTile = class AccountTile extends LitElement {
    render() {
        var _a, _b, _c, _d, _e, _f, _g;
        return html `
      <div class="outer-holder">
        <div class="inner-holder">
          <div id="header-holder">
            <div id="title-holder">
              <h1>${(_a = this.model) === null || _a === void 0 ? void 0 : _a.identifier}</h1>
            </div>
            <div id="avatar-holder">
              <div
                id="avatar"
                style="background-image: url('https://archive.org/services/img/${(_b = this
            .model) === null || _b === void 0 ? void 0 : _b.identifier}')"
              ></div>
            </div>
          </div>
          <div id="year-holder">
            <div id="archivist-since">
              <h3>Archivist Since</h3>
            </div>
            <div id="year-holder">
              <h3>${(_d = (_c = this.model) === null || _c === void 0 ? void 0 : _c.dateAdded) === null || _d === void 0 ? void 0 : _d.getFullYear()}</h3>
            </div>
          </div>
          <div id="status-holder">
            <div id="patron-icon">${accountIcon}</div>
            <div class="stat-icon">
              ${uploadIcon}
              <h3>${(_e = this.model) === null || _e === void 0 ? void 0 : _e.itemCount}</h3>
            </div>
            <div class="stat-icon">
              ${favoriteFilledIcon}
              <h3>${(_f = this.model) === null || _f === void 0 ? void 0 : _f.favCount}</h3>
            </div>
            <div class="stat-icon">
              ${reviewsIcon}
              <h3>${(_g = this.model) === null || _g === void 0 ? void 0 : _g.commentCount}</h3>
            </div>
          </div>
        </div>
      </div>
    `;
    }
    static get styles() {
        return css `
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
};
__decorate([
    property({ type: Object })
], AccountTile.prototype, "model", void 0);
AccountTile = __decorate([
    customElement('account-tile')
], AccountTile);
export { AccountTile };
//# sourceMappingURL=account-tile.js.map