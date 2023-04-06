import { css, html, LitElement, CSSResultGroup, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';

@customElement('expanded-date-picker')
export class ExpandedDatePicker extends LitElement {
  @property({ type: String }) minDate?: string;

  @property({ type: String }) maxDate?: string;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Array }) buckets?: number[];

  @property({ type: Object }) modalManager?: ModalManagerInterface;

  render(): TemplateResult {
    return html`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${this.minSelectedDate}
          .maxSelectedDate=${this.maxSelectedDate}
          .updateDelay=${100}
          missingDataMessage="..."
          .width=${560}
          .height=${120}
          .bins=${this.buckets}
          @histogramDateRangeUpdated=${this.histogramDateRangeUpdated}
        >
          <button
            id="apply-btn"
            slot="inputs-right-side"
            @click=${this.applyBtnClicked}
          >
            Apply date range
          </button>
        </histogram-date-range>
      </div>
    `;
  }

  /**
   * When the histogram is updated, keep track of the newly selected date range.
   * We don't commit to the new range until the apply button is clicked.
   */
  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>
  ): void {
    this.minSelectedDate = e.detail.minDate;
    this.maxSelectedDate = e.detail.maxDate;
  }

  /**
   * When the Apply button is clicked, emit the current date range and close the modal.
   */
  private applyBtnClicked(): void {
    const event = new CustomEvent('histogramDateRangeApplied', {
      detail: {
        minDate: this.minSelectedDate,
        maxDate: this.maxSelectedDate,
      },
    });
    this.dispatchEvent(event);
    this.modalManager?.closeModal();
    this.modalManager?.classList.remove('expanded-date-picker');
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        display: flex;
        justify-content: center;
        padding: 40px 10px 20px;
        overflow: hidden;
      }

      #date-picker {
        --histogramDateRangeInputWidth: 50px;
      }

      #apply-btn {
        margin: 0 0 0 5px;
        padding: 8px 10px;
        border: 0;
        border-radius: 4px;
        background: var(--primaryButtonBGColor, #194880);
        color: white;
        cursor: pointer;
      }
    `;
  }
}
