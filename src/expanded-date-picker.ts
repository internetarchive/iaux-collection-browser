import {
  css,
  html,
  LitElement,
  CSSResultGroup,
  TemplateResult,
  nothing,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';
import type { ModalManagerInterface } from '@internetarchive/modal-manager';
import type { AnalyticsManagerInterface } from '@internetarchive/analytics-manager';
import { BinSnappingInterval } from '@internetarchive/histogram-date-range';
import {
  analyticsActions,
  analyticsCategories,
} from './utils/analytics-events';

import '@internetarchive/histogram-date-range';

@customElement('expanded-date-picker')
export class ExpandedDatePicker extends LitElement {
  @property({ type: String }) minDate?: string;

  @property({ type: String }) maxDate?: string;

  @property({ type: String }) minSelectedDate?: string;

  @property({ type: String }) maxSelectedDate?: string;

  @property({ type: Array }) buckets?: number[];

  @property({ type: String }) dateFormat: string = 'YYYY';

  @property({ type: String }) tooltipDateFormat?: string;

  @property({ type: String }) tooltipLabel?: string;

  @property({ type: String }) binSnapping?: BinSnappingInterval;

  @property({ attribute: false }) barScalingFunction?: (x: number) => number;

  @property({ type: Object, attribute: false })
  modalManager?: ModalManagerInterface;

  @property({ type: Object, attribute: false })
  analyticsHandler?: AnalyticsManagerInterface;

  render(): TemplateResult {
    return html`
      <div id="container">
        <histogram-date-range
          id="date-picker"
          .minDate=${this.minDate}
          .maxDate=${this.maxDate}
          .minSelectedDate=${this.minSelectedDate ?? this.minDate}
          .maxSelectedDate=${this.maxSelectedDate ?? this.maxDate}
          .dateFormat=${this.dateFormat}
          tooltipDateFormat=${ifDefined(this.tooltipDateFormat)}
          tooltipLabel=${ifDefined(this.tooltipLabel)}
          binSnapping=${ifDefined(this.binSnapping)}
          .barScalingFunction=${this.barScalingFunction ?? nothing}
          .updateDelay=${0}
          updateWhileFocused
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
            ${msg('Apply date range')}
          </button>
        </histogram-date-range>
      </div>
    `;
  }

  connectedCallback(): void {
    super.connectedCallback?.();
    this.setupEscapeListener();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback?.();
    this.removeEscapeListener();
  }

  /**
   * Add an event listener to close the date picker modal when the Esc key is pressed
   */
  private setupEscapeListener() {
    document.addEventListener('keydown', this.boundEscapeListener);
  }

  /**
   * Remove the Esc key listener that was previously added
   */
  private removeEscapeListener() {
    document.removeEventListener('keydown', this.boundEscapeListener);
  }

  /**
   * Closes the modal dialog if the given event is pressing the Esc key.
   * Arrow function to ensure `this` remains bound to the current component.
   */
  private boundEscapeListener = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      this.closeModal();
    }
  };

  /**
   * When the histogram is updated, keep track of the newly selected date range.
   * We don't commit to the new range until the apply button is clicked.
   */
  private histogramDateRangeUpdated(
    e: CustomEvent<{
      minDate: string;
      maxDate: string;
    }>,
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
    this.closeModal();

    this.analyticsHandler?.sendEvent({
      category: analyticsCategories.default,
      action: analyticsActions.histogramChangedFromModal,
      label: window.location.href,
    });
  }

  /**
   * Closes the modal associated with this component (if it exists) and dispatches a
   * modalClosed event.
   */
  private closeModal(): void {
    if (this.modalManager) {
      this.modalManager.closeModal();
      this.dispatchEvent(new CustomEvent('modalClosed'));
    }
  }

  static get styles(): CSSResultGroup {
    return css`
      #container {
        display: flex;
        justify-content: center;
        padding: 40px 10px 10px;
        overflow: hidden;
      }

      #date-picker {
        --histogramDateRangeInputWidth: 50px;
        --histogramDateRangeInputRowMargin: 5px 0 0 0;
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
