import { LitElement, html, css, nothing, TemplateResult, CSSResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { msg } from '@lit/localize';
import { map } from 'lit/directives/map.js';
import type { ManageableItem } from '../models';

@customElement('remove-items-modal-content')
export class RemoveItemsModalContent extends LitElement {
  @property({ type: Object }) items: ManageableItem[] = [];

  @property({ type: String }) message?: string;

  render(): TemplateResult {
    return html`
      <ul>
        ${map(
          this.items,
          ({ title, date }) => html`
            <li>
              <span class="item-title">${title ?? '[untitled]'}</span>
              <span class="item-date">${date ?? ''}</span>
            </li>
          `,
        )}
      </ul>
      ${this.message ? html`<p class="message">${this.message}</p>` : nothing}
      <div class="button-bar">
        <button class="remove-items-btn" @click=${this.removeItemsBtnClicked}>
          ${msg('Remove items')}
        </button>
      </div>
    `;
  }

  private removeItemsBtnClicked(): void {
    this.dispatchEvent(
      new CustomEvent<{ items: ManageableItem[] }>('confirm', {
        detail: {
          items: this.items,
        },
      }),
    );
  }

  static get styles(): CSSResult {
    return css`
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
}
