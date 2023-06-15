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

    expect(el.shadowRoot?.querySelector('.empty-collection')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.no-results')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.query-error')).to.not.exist;
  });

  it('should render with empty-collection placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'empty-collection';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.empty-collection')).to.exist;

    expect(el.shadowRoot?.querySelector('.no-results')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.query-error')).to.not.exist;
  });

  it('should render with no-results placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'no-results';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.no-results')).to.exist;

    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-collection')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.query-error')).to.not.exist;
  });

  it('should render with query-error placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'query-error';
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.query-error')).to.exist;

    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-collection')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.no-results')).to.not.exist;
  });

  it('should not render any empty placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = null;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-collection')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.no-results')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.query-error')).to.not.exist;
  });
});
