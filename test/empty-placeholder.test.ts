/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { EmptyPlaceholder } from '../src/empty-placeholder';
import '../src/empty-placeholder';

describe('Empty Placeholder', () => {
  it('should render with no-search-term placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'no-search-term';
    await el.updateComplete;

    const notSearchTerm = el.shadowRoot?.querySelector('.no-search-term');
    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');

    expect(notSearchTerm).to.exist;
    expect(infiniteScroller).to.not.exist;
  });

  it('should render with no-search-result placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'no-search-result';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.no-search-result')).to.exist;
    expect(el.shadowRoot?.querySelector('.no-search-term')).to.not.exist;
    expect(el.shadowRoot?.querySelector('collection-facets')).to.not.exist;
  });

  it('should not render any empty placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = null;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.no-search-result')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.no-search.term')).to.not.exist;
    expect(el.shadowRoot?.querySelector('collection-facets')).to.not.exist;
  });
});
