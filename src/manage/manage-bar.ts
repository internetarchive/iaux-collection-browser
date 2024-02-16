import { msg } from '@lit/localize';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

export interface ManageableItem {
  identifier: string;
  title?: string;
  dateStr?: string;
}

@customElement('manage-bar')
export class ManageBar extends LitElement {
  /**
   * The label displayed in front of the management buttons
   */
  @property({ type: String }) label = msg('Select items to remove');

  /**
   * Whether to show the "Select All" button (default false)
   */
  @property({ type: Boolean }) showSelectAll = false;

  /**
   * Whether to show the "Unselect All" button (default false)
   */
  @property({ type: Boolean }) showUnselectAll = false;

  /**
   * Whether to active delete button for selectable items
   */
  @property({ type: Boolean }) enableRemoveButton = false;

  render(): TemplateResult {
    return html`
      <div class="manage-container">
        <span class="manage-label">${this.label}</span>
        <div class="manage-buttons">
          <button class="cancel-btn" @click=${this.cancelClicked}>
            ${msg('Cancel')}
          </button>
          <button
            class="remove-btn ${!this.enableRemoveButton ? 'disable' : ''}"
            @click=${this.removeClicked}
          >
            ${msg('Remove selected items')}
          </button>
          <div class="selection-buttons">
            ${when(
              this.showSelectAll,
              () => html` <button
                class="link-styled select-all-btn"
                @click=${this.selectAllClicked}
              >
                ${msg('Select all')}
              </button>`
            )}
            ${when(
              this.showUnselectAll,
              () => html` <button
                class="link-styled unselect-all-btn"
                @click=${this.unselectAllClicked}
              >
                ${msg('Unselect all')}
              </button>`
            )}
          </div>
        </div>
      </div>
    `;
  }

  private cancelClicked(): void {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  private removeClicked(): void {
    this.dispatchEvent(new CustomEvent('removeItems'));
  }

  private selectAllClicked(): void {
    this.dispatchEvent(new CustomEvent('selectAll'));
  }

  private unselectAllClicked(): void {
    this.dispatchEvent(new CustomEvent('unselectAll'));
  }

  static get styles(): CSSResultGroup {
    return css`
      .manage-container {
        display: flex;
        align-items: center;
        column-gap: 5px;
        padding: 20px 0 20px;
        flex-wrap: wrap;
      }

      .manage-label {
        display: inline-block;
        font-weight: bold;
        font-size: 1.8rem;
        padding-right: 10px;
      }

      .manage-buttons {
        display: flex;
        align-items: center;
        column-gap: 5px;
      }

      button {
        display: inline-block;
        font-size: 1.4rem;
        cursor: pointer;
        white-space: nowrap;
      }

      button.link-styled {
        margin: 0;
        padding: 6px;
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

      /* Button styles derived from legacy version */
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

      .remove-btn.disable {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
        background: #767676;
        border: 1px solid #999;
        user-select: none;
      }
    `;
  }
}
