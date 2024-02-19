import { msg } from '@lit/localize';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import iaButtonStyle from '../styles/ia-button';

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
          <button class="ia-button dark" @click=${this.cancelClicked}>
            ${msg('Cancel')}
          </button>
          <button
            class="ia-button danger"
            ?disabled=${!this.enableRemoveButton}
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
      ${iaButtonStyle}
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

      .ia-button,
      button {
        padding: 6px 12px;
        font-size: 1.4rem;
      }

      .ia-button.danger:disabled {
        opacity: 0.5;
      }

      button.link-styled {
        margin: 0;
        padding: 6px;
        border: 0;
        appearance: none;
        background: none;
        color: var(--ia-theme-link-color, #4b64ff);
        text-decoration: none;
        cursor: pointer;
      }
      button.link-styled:hover {
        text-decoration: underline;
      }
    `;
  }
}
