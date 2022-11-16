import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { AlphaBar } from '../../src/sort-filter-bar/alpha-bar';

import '../../src/sort-filter-bar/alpha-bar';

describe('Alphabetical Filter Bar', () => {
  it('renders component', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    // Should have all the letters
    const letters = el.shadowRoot?.querySelectorAll('li');
    expect(letters?.length).to.equal(26);
  });

  it('renders letters with items as links', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.letterCounts = { U: 10, X: 10 };
    await el.updateComplete;

    // Should have exactly two letter links
    const letterLinks = el.shadowRoot?.querySelectorAll('li > a[href]');
    expect(letterLinks?.length).to.equal(2);
    expect(letterLinks?.item(0).textContent?.trim()).to.equal('U');
    expect(letterLinks?.item(1).textContent?.trim()).to.equal('X');
  });

  it('renders letters without items as uninteractive text', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.letterCounts = { U: 10, X: 10 };
    await el.updateComplete;

    // All but the two letters above should just be inert spans, not links
    const letterNonLinks = el.shadowRoot?.querySelectorAll('li > span');
    expect(letterNonLinks?.length).to.equal(24);
    expect(letterNonLinks?.item(0).textContent?.trim()).to.equal('A');
    expect(letterNonLinks?.item(23).textContent?.trim()).to.equal('Z');
  });

  it('renders the selected letter with the "selected" class', async () => {
    const el = await fixture<AlphaBar>(html`<alpha-bar></alpha-bar>`);

    el.selectedLetter = 'B';
    await el.updateComplete;

    const selectedLetter = el.shadowRoot?.querySelector('li.selected');
    expect(selectedLetter).to.exist;
    expect(selectedLetter?.textContent?.trim()).to.equal('B');
  });
});
