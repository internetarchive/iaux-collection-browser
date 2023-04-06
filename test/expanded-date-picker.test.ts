/* eslint-disable import/no-duplicates */
import type { HistogramDateRange } from '@internetarchive/histogram-date-range';
import { ModalManager, ModalManagerMode } from '@internetarchive/modal-manager';
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import '../src/expanded-date-picker';

import type { ExpandedDatePicker } from '../src/expanded-date-picker';

describe('Expanded Date Picker', () => {
  it('should render with a date picker and Apply button', async () => {
    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker></expanded-date-picker>`
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
      ></expanded-date-picker>`
    );

    const datePicker = el.shadowRoot?.querySelector(
      '#date-picker'
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
      })
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
      ></expanded-date-picker>`
    );

    const applyBtn = el.shadowRoot?.querySelector(
      '#apply-btn'
    ) as HTMLButtonElement;
    expect(applyBtn).to.exist;

    applyBtn.click();
    await el.updateComplete;

    expect(applySpy.callCount).to.equal(1);
    expect(
      applySpy.calledWithMatch({ detail: { minDate: '1', maxDate: '5' } })
    );
  });

  it('should close and unstyle its modal when date range applied', async () => {
    const modalManager = new ModalManager();
    modalManager.mode = ModalManagerMode.Open;
    modalManager.classList.add('expanded-date-picker');

    const el = await fixture<ExpandedDatePicker>(
      html`<expanded-date-picker
        .buckets=${[1, 2, 3, 4, 5]}
        .minDate=${'1'}
        .maxDate=${'5'}
        .minSelectedDate=${'1'}
        .maxSelectedDate=${'5'}
        .modalManager=${modalManager}
      ></expanded-date-picker>`
    );

    const applyBtn = el.shadowRoot?.querySelector(
      '#apply-btn'
    ) as HTMLButtonElement;
    expect(applyBtn).to.exist;

    applyBtn.click();
    await el.updateComplete;

    expect(modalManager.getMode()).to.equal(ModalManagerMode.Closed);
    expect(modalManager.classList.contains('expanded-date-picker')).to.be.false;
  });
});
