import type { HistogramDateRange } from '@internetarchive/histogram-date-range';
import {
  ModalManager,
  ModalManagerInterface,
  ModalManagerMode,
} from '@internetarchive/modal-manager';
import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import sinon from 'sinon';
import '../src/expanded-date-picker';

import type { ExpandedDatePicker } from '../src/expanded-date-picker';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';
import {
  analyticsActions,
  analyticsCategories,
} from '../src/utils/analytics-events';

describe('Expanded Date Picker', () => {
  it('should render with a date picker and Apply button', async () => {
    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker></expanded-date-picker>`,
    );

    expect(el.shadowRoot?.querySelector('#date-picker')).to.exist;
    expect(el.shadowRoot?.querySelector('#apply-btn')).to.exist;
  });

  it('should update its min/max selected date when date picker changes', async () => {
    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .minSelectedDate=${'1'}
        .maxSelectedDate=${'5'}
      ></expanded-date-picker>`,
    );

    const datePicker = el.shadowRoot?.querySelector(
      '#date-picker',
    ) as HistogramDateRange;
    expect(datePicker).to.exist;

    datePicker.minSelectedDate = '2';
    datePicker.maxSelectedDate = '4';
    datePicker.dispatchEvent(
      new CustomEvent('histogramDateRangeUpdated', {
        detail: {
          minDate: datePicker.minSelectedDate,
          maxDate: datePicker.maxSelectedDate,
        },
      }),
    );
    await el.updateComplete;

    expect(el.minSelectedDate).to.equal('2');
    expect(el.maxSelectedDate).to.equal('4');
  });

  it('should emit an event when a date range is applied', async () => {
    const applySpy = sinon.spy();
    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .minSelectedDate=${'1'}
        .maxSelectedDate=${'5'}
        @histogramDateRangeApplied=${applySpy}
      ></expanded-date-picker>`,
    );

    const applyBtn = el.shadowRoot?.querySelector(
      '#apply-btn',
    ) as HTMLButtonElement;
    expect(applyBtn).to.exist;

    applyBtn.click();
    await el.updateComplete;

    expect(applySpy.callCount).to.equal(1);
    expect(
      applySpy.calledWithMatch({ detail: { minDate: '1', maxDate: '5' } }),
    );
  });

  it('should close its modal and emit close event when date range applied', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );
    modalManager.mode = ModalManagerMode.Open;

    const modalClosed = sinon.spy();

    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .minSelectedDate=${'1'}
        .maxSelectedDate=${'5'}
        .modalManager=${modalManager}
        @modalClosed=${modalClosed}
      ></expanded-date-picker>`,
    );

    const applyBtn = el.shadowRoot?.querySelector(
      '#apply-btn',
    ) as HTMLButtonElement;
    expect(applyBtn).to.exist;

    applyBtn.click();
    await el.updateComplete;

    expect(modalManager.getMode()).to.equal(ModalManagerMode.Closed);
    expect(modalClosed.callCount).to.equal(1);
  });

  it('closes the modal when Esc key is pressed', async () => {
    const modalManager = await fixture<ModalManager>(
      html`<modal-manager></modal-manager>`,
    );

    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .minSelectedDate=${'1'}
        .maxSelectedDate=${'5'}
        .modalManager=${modalManager}
      ></expanded-date-picker>`,
    );

    const closeModalSpy = sinon.spy(
      el.modalManager as ModalManagerInterface,
      'closeModal',
    );

    // Dispatch an Esc keydown event
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    await el.updateComplete;

    expect(closeModalSpy.callCount).to.equal(1);
    expect(el.modalManager?.classList.contains('expanded-date-picker')).to.be
      .false;
  });

  it('sends analytics when date range is applied', async () => {
    const analyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .analyticsHandler=${analyticsHandler}
      ></expanded-date-picker>`,
    );

    const applyBtn = el.shadowRoot?.querySelector(
      '#apply-btn',
    ) as HTMLButtonElement;
    expect(applyBtn).to.exist;

    applyBtn.click();
    await el.updateComplete;

    expect(analyticsHandler.callCategory).to.equal(analyticsCategories.default);
    expect(analyticsHandler.callAction).to.equal(
      analyticsActions.histogramChangedFromModal,
    );
    expect(analyticsHandler.callLabel).to.equal(window.location.href);

    const datePicker = el.shadowRoot?.querySelector(
      '#date-picker',
    ) as HistogramDateRange;
    expect(datePicker).to.exist;

    datePicker.minSelectedDate = '2';
    datePicker.maxSelectedDate = '5';
    datePicker.dispatchEvent(
      new CustomEvent('histogramDateRangeUpdated', {
        detail: {
          minDate: datePicker.minSelectedDate,
          maxDate: datePicker.maxSelectedDate,
        },
      }),
    );
    await el.updateComplete;

    applyBtn.click();
    await el.updateComplete;

    expect(analyticsHandler.callCategory).to.equal(analyticsCategories.default);
    expect(analyticsHandler.callAction).to.equal(
      analyticsActions.histogramChangedFromModal,
    );
    expect(analyticsHandler.callLabel).to.equal(window.location.href);
  });
});
