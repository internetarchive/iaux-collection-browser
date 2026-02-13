import { aTimeout, fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { AlphaBar } from '../../src/sort-filter-bar/alpha-bar';

import '../../src/sort-filter-bar/alpha-bar';
import type { AlphaBarTooltip } from '../../src/sort-filter-bar/alpha-bar-tooltip';

describe('Alphabetical Filter Bar', () => {
  it('renders component', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    // Should have all the letters
    const letters = el.shadowRoot?.querySelectorAll('li');
    expect(letters?.length).to.equal(26);
  });

  it('renders letters with items as buttons', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.letterCounts = { U: 10, X: 10 };
    await el.updateComplete;

    // Should have exactly two letter buttons
    const letterButtons = el.shadowRoot?.querySelectorAll(
      'li > button:not(:disabled)',
    );
    expect(letterButtons?.length).to.equal(2);
    expect(letterButtons?.item(0).textContent?.trim()).to.equal('U');
    expect(letterButtons?.item(1).textContent?.trim()).to.equal('X');
  });

  it('renders letters without items as disabled buttons', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.letterCounts = { U: 10, X: 10 };
    await el.updateComplete;

    // All but the two letters above should be disabled
    const letterButtons = el.shadowRoot?.querySelectorAll(
      'li > button:disabled',
    );
    expect(letterButtons?.length).to.equal(24);
    expect(letterButtons?.item(0).textContent?.trim()).to.equal('A');
    expect(letterButtons?.item(23).textContent?.trim()).to.equal('Z');
  });

  it('renders the selected letter with the "selected" class', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.selectedLetter = 'B';
    await el.updateComplete;

    const selectedLetter = el.shadowRoot?.querySelector('li.selected');
    expect(selectedLetter).to.exist;
    expect(selectedLetter?.textContent?.trim()).to.equal('B');
  });

  it('renders a tooltip when hovered and removes it when un-hovered', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);
    const firstLetter = el.shadowRoot?.querySelector('li') as HTMLLIElement;
    expect(firstLetter).to.exist;

    firstLetter.dispatchEvent(new MouseEvent('mousemove'));
    await el.updateComplete;

    const tooltip = el.shadowRoot?.querySelector(
      'alpha-bar-tooltip',
    ) as AlphaBarTooltip;
    expect(tooltip).to.exist;

    // Should be positioned after next tick
    await aTimeout(0);
    expect(tooltip.style.left).to.exist;

    firstLetter.dispatchEvent(new MouseEvent('mouseleave'));
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('alpha-bar-tooltip')).not.to.exist;
  });

  it('positions tooltip correctly when it would overflow viewport', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);
    const letters = el.shadowRoot?.querySelectorAll('li');
    const lastLetter = letters?.item(letters.length - 1) as HTMLLIElement;
    expect(lastLetter).to.exist;

    lastLetter.dispatchEvent(new MouseEvent('mousemove'));
    await el.updateComplete;

    const tooltip = el.shadowRoot?.querySelector(
      'alpha-bar-tooltip',
    ) as AlphaBarTooltip;
    expect(tooltip).to.exist;

    // Should be positioned after next tick, but not off-screen
    await aTimeout(0);
    expect(tooltip.getBoundingClientRect().right).to.be.lessThan(
      window.innerWidth,
    );
  });
});
