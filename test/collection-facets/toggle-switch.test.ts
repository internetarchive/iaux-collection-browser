import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { html } from 'lit';
import type { ToggleSwitch } from '../../src/collection-facets/toggle-switch';

import '../../src/collection-facets/toggle-switch';

describe('Toggle switch', () => {
  it('renders component', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch></toggle-switch>`,
    );

    expect(el.shadowRoot?.querySelector('#switch-button')).to.exist;
    expect(el.shadowRoot?.querySelector('#knob')).to.exist;
  });

  it('renders provided L/R values', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .rightValue=${'R'}
      ></toggle-switch>`,
    );

    expect(el.value).to.equal('L');
    expect(el.selectedLabel).to.equal('L');

    expect(
      el.shadowRoot
        ?.querySelector('label[for=switch-left]')
        ?.textContent?.trim(),
    ).to.equal('L');
    expect(
      el.shadowRoot
        ?.querySelector('label[for=switch-right]')
        ?.textContent?.trim(),
    ).to.equal('R');
  });

  it('renders provided L/R labels instead of values', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .leftLabel=${'L-label'}
        .rightValue=${'R'}
        .rightLabel=${'R-label'}
      ></toggle-switch>`,
    );

    expect(el.value).to.equal('L');
    expect(el.selectedLabel).to.equal('L-label');

    expect(
      (el.shadowRoot?.querySelector('#switch-left') as HTMLInputElement)?.value,
    ).to.equal('L');
    expect(
      (el.shadowRoot?.querySelector('#switch-right') as HTMLInputElement)
        ?.value,
    ).to.equal('R');

    expect(
      el.shadowRoot
        ?.querySelector('label[for=switch-left]')
        ?.textContent?.trim(),
    ).to.equal('L-label');
    expect(
      el.shadowRoot
        ?.querySelector('label[for=switch-right]')
        ?.textContent?.trim(),
    ).to.equal('R-label');
  });

  it('sets the initial side', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .rightValue=${'R'}
        .side=${'right'}
      ></toggle-switch>`,
    );

    expect(el.value).to.equal('R');
    expect(el.selectedLabel).to.equal('R');
  });

  it('toggles on click', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .rightValue=${'R'}
      ></toggle-switch>`,
    );

    const button = el.shadowRoot?.querySelector(
      '#switch-button',
    ) as HTMLButtonElement;

    expect(el.value).to.equal('L');
    button.click();
    await el.updateComplete;

    expect(el.value).to.equal('R');
    button.click();
    await el.updateComplete;

    expect(el.value).to.equal('L');
  });

  it('toggles on radio change', async () => {
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .rightValue=${'R'}
      ></toggle-switch>`,
    );

    const leftRadio = el.shadowRoot?.querySelector(
      '#switch-left',
    ) as HTMLInputElement;
    const rightRadio = el.shadowRoot?.querySelector(
      '#switch-right',
    ) as HTMLInputElement;

    expect(el.value).to.equal('L');
    rightRadio.click();
    await el.updateComplete;

    expect(el.value).to.equal('R');
    leftRadio.click();
    await el.updateComplete;

    expect(el.value).to.equal('L');
  });

  it('emits change event when toggled', async () => {
    const changeSpy = sinon.spy();
    const el = await fixture<ToggleSwitch>(
      html`<toggle-switch
        .leftValue=${'L'}
        .rightValue=${'R'}
        @change=${changeSpy}
      ></toggle-switch>`,
    );

    const button = el.shadowRoot?.querySelector(
      '#switch-button',
    ) as HTMLButtonElement;

    button.click();
    await el.updateComplete;

    expect(changeSpy.callCount).to.equal(1);

    const leftRadio = el.shadowRoot?.querySelector(
      '#switch-left',
    ) as HTMLInputElement;

    leftRadio.click();
    await el.updateComplete;

    expect(changeSpy.callCount).to.equal(2);
  });
});
