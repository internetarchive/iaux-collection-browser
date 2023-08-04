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

    const placeholderElem = el.shadowRoot?.querySelector('.placeholder');
    expect(placeholderElem).to.exist;
    expect(placeholderElem).to.have.class('empty-query');
  });

  it('should render with empty-collection placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'empty-collection';
    await el.updateComplete;

    const placeholderElem = el.shadowRoot?.querySelector('.placeholder');
    expect(placeholderElem).to.exist;
    expect(placeholderElem).to.have.class('empty-collection');
  });

  it('should render with no-results placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'no-results';
    await el.updateComplete;

    const placeholderElem = el.shadowRoot?.querySelector('.placeholder');
    expect(placeholderElem).to.exist;
    expect(placeholderElem).to.have.class('no-results');
  });

  it('should render with query-error placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'query-error';
    await el.updateComplete;

    const placeholderElem = el.shadowRoot?.querySelector('.placeholder');
    expect(placeholderElem).to.exist;
    expect(placeholderElem).to.have.class('query-error');
  });

  it('should render with collection-error placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = 'collection-error';
    await el.updateComplete;

    const placeholderElem = el.shadowRoot?.querySelector('.placeholder');
    expect(placeholderElem).to.exist;
    expect(placeholderElem).to.have.class('collection-error');
  });

  it('should not render any empty placeholder', async () => {
    const el = await fixture<EmptyPlaceholder>(
      html`<empty-placeholder></empty-placeholder>`
    );

    el.placeholderType = null;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.placeholder')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-query')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.empty-collection')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.no-results')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.query-error')).to.not.exist;
    expect(el.shadowRoot?.querySelector('.collection-error')).to.not.exist;
  });
});
