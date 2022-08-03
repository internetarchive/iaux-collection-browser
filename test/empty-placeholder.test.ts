/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import '../src/empty-placeholder';

import type { EmptyPlaceholder } from '../src/empty-placeholder';

describe('Empty Placeholder', () => {
  it('should render with empty-query placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'empty-query';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.empty-query')).to.exist;
    expect(el.shadowRoot?.querySelector('.null-result')).to.not.exist;
    expect(el.shadowRoot?.querySelector('infinite-scroller')).to.not.exist;
  });

  it('should render with null-result placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'null-result';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.null-result')).to.exist;
    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('collection-facets')).to.not.exist;
  });

  it('should not render any empty placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = null;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.null-result')).to.not.exist;
    expect(el.shadowRoot?.querySelector('collection-facets')).to.not.exist;
  });
});
