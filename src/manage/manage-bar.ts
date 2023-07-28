import { msg } from '@lit/localize';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export interface ManageableItem {
  identifier: string;
  title?: string;
  date?: string;
}

@customElement('manage-bar')
export class ManageBar extends LitElement {
  @property({ type: String }) label = msg('Select items to un-favorite');

  render(): TemplateResult {
    return html`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <button class="cancel-btn" @click=${this.cancelClicked}>
          ${msg('Cancel')}
        </button>
        <button class="remove-btn" @click=${this.removeClicked}>
          ${msg('Remove selected items')}
        </button>
        <button
          class="link-styled toggle-all-btn"
          @click=${this.toggleAllClicked}
        >
          ${msg('Toggle all')}
        </button>
      </div>
    `;
  }

  private cancelClicked(): void {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  private removeClicked(): void {
    this.dispatchEvent(new CustomEvent('removeItems'));
  }

  private toggleAllClicked(): void {
    this.dispatchEvent(new CustomEvent('toggleAll'));
  }

  static get styles(): CSSResultGroup {
    return css`
      .manage-container {
        display: flex;
        align-items: center;
        column-gap: 5px;
        padding: 10px 0 20px;
      }

      .manage-label {
        display: inline-block;
        font-weight: bold;
        font-size: 1.8rem;
        padding-right: 10px;
      }

      button {
        display: inline-block;
        font-size: 1.4rem;
        cursor: pointer;
      }

      button.link-styled {
        margin: 0;
        padding: 5px;
        border: 0;
        appearance: none;
        background: none;
        color: var(--ia-theme-link-color, #4b64ff);
        text-decoration: none;
      }
      button.link-styled:hover {
        text-decoration: underline;
      }

      button:not(.link-styled) {
        margin: 0;
        padding: 6px 12px;
        border-radius: 4px;
        color: white;
      }

      .cancel-btn {
        background: #777777;
        border: 1px solid #666666;
      }
      .cancel-btn:hover {
        background: #6b6b6b;
        border: 1px solid #505050;
      }

      .remove-btn {
        background: #d9534f;
        border: 1px solid #d43f3a;
      }
      .remove-btn:hover {
        background: #d2322d;
        border: 1px solid #ac2925;
      }
    `;
  }
}
