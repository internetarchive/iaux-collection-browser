import { __decorate } from "tslib";
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { restrictedIcon } from '../assets/img/icons/restricted';
import { LoginRequiredIcon } from '../assets/img/icons/login-required';
let ItemImageOverlay = class ItemImageOverlay extends LitElement {
    constructor() {
        super(...arguments);
        this.isListTile = false;
        this.loggedIn = false;
        this.loginRequired = false;
        this.contentWarning = false;
    }
    render() {
        if (this.loginRequired && !this.loggedIn) {
            return html ` ${this.loginRequiredTemplate} `;
        }
        return html ` ${this.contentWarningTemplate} `;
    }
    get loginRequiredTemplate() {
        if (this.isListTile) {
            return html ` ${LoginRequiredIcon} `;
        }
        return html `
      <div class="tile-action no-preview">Log in to view this item</div>
    `;
    }
    get contentWarningTemplate() {
        if (this.isListTile) {
            return html ` ${restrictedIcon} `;
        }
        return html `
      <div class="tile-action no-preview">Content may be inappropriate</div>
    `;
    }
    static get styles() {
        return css `
      :host {
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
      }

      svg {
        padding: 25%;
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
      }

      .no-preview {
        background-color: #fffecb;
        color: #2c2c2c;
        font-size: 1.4rem;
        line-height: 2rem;
        text-align: center;
      }
    `;
    }
};
__decorate([
    property({ type: Boolean })
], ItemImageOverlay.prototype, "isListTile", void 0);
__decorate([
    property({ type: Boolean })
], ItemImageOverlay.prototype, "loggedIn", void 0);
__decorate([
    property({ type: Boolean })
], ItemImageOverlay.prototype, "loginRequired", void 0);
__decorate([
    property({ type: Boolean })
], ItemImageOverlay.prototype, "contentWarning", void 0);
ItemImageOverlay = __decorate([
    customElement('item-image-overlay')
], ItemImageOverlay);
export { ItemImageOverlay };
//# sourceMappingURL=item-image-overlay.js.map