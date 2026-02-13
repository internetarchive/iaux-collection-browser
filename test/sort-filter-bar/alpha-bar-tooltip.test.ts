import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { AlphaBarTooltip } from '../../src/sort-filter-bar/alpha-bar-tooltip';

import '../../src/sort-filter-bar/alpha-bar-tooltip';

describe('Alphabet Filter Bar Tooltips', () => {
  it('renders component', async () => {
    const el = await fixture<AlphaBarTooltip>(
      html`<alpha-bar-tooltip .numResults=${42}></alpha-bar-tooltip>`,
    );

    // Should render the number of results
    const tooltipText = el.shadowRoot?.querySelector('#tooltip-text');
    expect(tooltipText?.textContent?.trim()).to.equal('42 results');
  });
});
