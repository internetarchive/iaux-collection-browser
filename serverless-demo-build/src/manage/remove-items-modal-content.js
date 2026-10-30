var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { localized, msg } from '@lit/localize';
import { map } from 'lit/directives/map.js';
let RemoveItemsModalContent = class RemoveItemsModalContent extends LitElement {
    constructor() {
        super(...arguments);
        this.items = [];
    }
    render() {
        return html `
      <ul>
        ${map(this.items, ({ title, date }) => html `
            <li>
              <span class="item-title">${title ?? '[untitled]'}</span>
              <span class="item-date">${date ?? ''}</span>
            </li>
          `)}
      </ul>
      ${this.message ? html `<p class="message">${this.message}</p>` : nothing}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${msg('Remove items')}
        </button>
      </div>
    `;
    }
    removeItemsBtnClicked() {
        this.dispatchEvent(new CustomEvent('confirm', {
            detail: {
                items: this.items,
            },
        }));
    }
    static get styles() {
        return css `
      ul {
        margin: 0;
        padding: 0 10px;
        font-size: 1.4rem;
        list-style-type: none;
        max-height: min(400px, 40vh);
        overflow-y: auto;
      }

      li {
        display: flex;
        justify-content: space-between;
        padding: 2px 0;
      }
      li:not(:last-of-type) {
        border-bottom: 1px solid rgb(232, 232, 232);
      }

      .item-title {
        word-break: break-word;
      }

      .item-date {
        white-space: nowrap;
      }

      .message {
        font-size: 1.4rem;
        padding: 5px 10px;
      }

      .button-bar {
        display: flex;
        justify-content: center;
        margin: 10px 5px;
      }

      .remove-items-btn {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid var(--primaryErrorCTABorder, #d43f3a);
        border-radius: 4px;
        color: white;
        background: var(--primaryErrorCTAFill, #d9534f);
        appearance: none;
        cursor: pointer;
      }
      .remove-items-btn:hover {
        background: rgba(var(--primaryErrorCTAFillRGB, 229, 28, 38), 0.9);
      }
      .remove-items-btn:active {
        background: rgba(var(--primaryErrorCTAFillRGB, 229, 28, 38), 0.7);
      }
    `;
    }
};
__decorate([
    property({ type: Object })
], RemoveItemsModalContent.prototype, "items", void 0);
__decorate([
    property({ type: String })
], RemoveItemsModalContent.prototype, "message", void 0);
RemoveItemsModalContent = __decorate([
    customElement('remove-items-modal-content'),
    localized()
], RemoveItemsModalContent);
export { RemoveItemsModalContent };
