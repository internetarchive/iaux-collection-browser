/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { MoreFacetsPagination } from '../../src/collection-facets/more-facets-pagination';
import '../../src/collection-facets/more-facets-pagination';

describe('More facets pagination', () => {
  it('should render pagination container', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    expect(el.shadowRoot?.querySelector('.facets-pagination')).to.exist;
  });

  it('should render pagination arrow icon', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    expect(
      el.shadowRoot
        ?.querySelectorAll('.arrow-icon')[0]
        ?.querySelector('svg')
        ?.querySelector('title')?.textContent
    ).to.equal('Go left icon');
  });

  it('should render pagination right arrow icon', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    expect(
      el.shadowRoot
        ?.querySelectorAll('.arrow-icon')[1]
        ?.querySelector('svg')
        ?.querySelector('title')?.textContent
    ).to.equal('Go right icon');
  });

  it('should render pagination pages', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    el.size = 2;
    await el.updateComplete;

    // at a time we render 5 pages
    expect(
      el.shadowRoot?.querySelector('.page-numbers')?.children.length
    ).to.equal(5);
  });

  it('should render current page as active page', async () => {
    const el = await fixture<MoreFacetsPagination>(
      html`<more-facets-pagination></more-facets-pagination>`
    );

    el.size = 2;
    el.currentPage = 3;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('.page-numbers')?.querySelector('.current')
        ?.textContent
    ).to.contains(3);
  });
});
