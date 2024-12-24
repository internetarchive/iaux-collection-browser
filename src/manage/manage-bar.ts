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
   * Specifies the context in which the collection browser is being used
   */
  @property({ type: String }) pageContext?: string;

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
  @property({ type: Boolean }) removeAllowed = false;

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
            ?disabled=${!this.removeAllowed}
            @click=${this.removeClicked}
          >
            ${msg('Remove selected items')}
          </button>
          ${this.pageContext === 'search'
            ? html`
                <button
                  class="ia-button warning"
                  ?disabled=${!this.removeAllowed}
                  @click=${this.removeClicked}
                >
                  ${msg('Item Manager the items')}
                </button>
              `
            : ''}
          <div class="selection-buttons">
            ${when(
              this.showSelectAll,
              () => html` <button
                class="ia-button link select-all-btn"
                @click=${this.selectAllClicked}
              >
                ${msg('Select all')}
              </button>`
            )}
            ${when(
              this.showUnselectAll,
              () => html` <button
                class="ia-button link unselect-all-btn"
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
        flex-wrap: wrap;
        align-items: center;
        column-gap: 5px;
      }

      .selection-buttons {
        display: inherit;
      }

      .ia-button,
      button {
        padding: 6px 12px;
        font-size: 1.4rem;
        margin: 3px 0;
      }
    `;
  }
}
