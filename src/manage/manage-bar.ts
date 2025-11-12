import { msg } from '@lit/localize';
import { LitElement, html, css, TemplateResult, CSSResultGroup } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';
import {
  ModalConfig,
  type ModalManagerInterface,
} from '@internetarchive/modal-manager';
import type { ManageableItem } from '../models';
import iaButtonStyle from '../styles/ia-button';
import './remove-items-modal-content';

@customElement('manage-bar')
export class ManageBar extends LitElement {
  /**
   * The label displayed in front of the management buttons
   */
  @property({ type: String }) label = msg('Select items to remove');

  /**
   * The shared modal manager component for displaying modal dialogs on this page
   */
  @property({ type: Object }) modalManager?: ModalManagerInterface;

  /**
   * Array of items that have been selected for management
   */
  @property({ type: Object }) selectedItems: Array<ManageableItem> = [];

  /**
   * Message shows as note in the modal when removing items
   */
  @property({ type: String }) manageViewModalMsg?: string;

  /**
   * Whether to show the "Select All" button (default false)
   */
  @property({ type: Boolean }) showSelectAll = false;

  /**
   * Whether to show the "Unselect All" button (default false)
   */
  @property({ type: Boolean }) showUnselectAll = false;

  /**
   * Whether to show "Item Manager the items" button (default false)
   */
  @property({ type: Boolean }) showItemManageButton = false;

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
            @click=${this.showRemoveItemsModal}
          >
            ${msg('Remove selected items')} (${this.selectedItems.length})
          </button>
          ${when(
            this.showItemManageButton,
            () =>
              html` <button
                class="ia-button warning"
                ?disabled=${!this.removeAllowed}
                @click=${this.manageItemsClicked}
              >
                ${msg('Item Manager the items')} (${this.selectedItems.length})
              </button>`,
          )}
          <div class="selection-buttons">
            ${when(
              this.showSelectAll,
              () =>
                html` <button
                  class="ia-button link select-all-btn"
                  @click=${this.selectAllClicked}
                >
                  ${msg('Select all')}
                </button>`,
            )}
            ${when(
              this.showUnselectAll,
              () =>
                html` <button
                  class="ia-button link unselect-all-btn"
                  @click=${this.unselectAllClicked}
                >
                  ${msg('Unselect all')}
                </button>`,
            )}
          </div>
        </div>
      </div>
    `;
  }

  private cancelClicked(): void {
    this.dispatchEvent(new CustomEvent('cancel'));
  }

  private removeItemsClicked(): void {
    this.dispatchEvent(new CustomEvent('removeItems'));
  }

  private manageItemsClicked(): void {
    this.dispatchEvent(new CustomEvent('manageItems'));
  }

  private selectAllClicked(): void {
    this.dispatchEvent(new CustomEvent('selectAll'));
  }

  private unselectAllClicked(): void {
    this.dispatchEvent(new CustomEvent('unselectAll'));
  }

  /**
   * Shows a modal dialog confirming the list of items to be removed
   * @param items Which items to list in the modal
   */
  private showRemoveItemsModal(): void {
    const customModalContent = html`
      <remove-items-modal-content
        .items=${this.selectedItems}
        .message=${this.manageViewModalMsg}
        @confirm=${() => this.removeItemsClicked()}
      ></remove-items-modal-content>
    `;

    const config = new ModalConfig({
      showProcessingIndicator: false,
      processingImageMode: 'processing',
      bodyColor: '#fff',
      headerColor: '#194880',
      showHeaderLogo: false,
      closeOnBackdropClick: true,
      title: html`${msg('Are you sure you want to remove these items?')}`,
    });

    this.modalManager?.classList.add('remove-items');
    this.modalManager?.showModal({
      config,
      customModalContent,
      userClosedModalCallback: () => {
        this.modalManager?.classList.remove('remove-items');
      },
    });
  }

  /**
   * Shows a modal dialog indicating that item removal is being processed
   */
  showRemoveItemsProcessingModal(): void {
    const config = new ModalConfig({
      showProcessingIndicator: true,
      processingImageMode: 'processing',
      bodyColor: '#fff',
      headerColor: '#194880',
      showHeaderLogo: false,
      closeOnBackdropClick: true,
      title: html`${msg('Removing selected items...')}`,
    });

    this.modalManager?.classList.add('remove-items');
    this.modalManager?.showModal({
      config,
      userClosedModalCallback: () => {
        this.modalManager?.classList.remove('remove-items');
      },
    });
  }

  /**
   * Shows a modal dialog indicating that an error occurred while removing items
   */
  showRemoveItemsErrorModal(): void {
    const config = new ModalConfig({
      showProcessingIndicator: false,
      processingImageMode: 'processing',
      bodyColor: '#fff',
      headerColor: '#691916',
      showHeaderLogo: false,
      closeOnBackdropClick: true,
      title: html`${msg('Error: unable to remove items')}`,
      message: html`${msg(
        'An error occurred while removing items. Please try again in a few minutes.',
      )}`,
    });

    this.modalManager?.classList.add('remove-items');
    this.modalManager?.showModal({
      config,
      userClosedModalCallback: () => {
        this.modalManager?.classList.remove('remove-items');
      },
    });
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
