/* eslint-disable import/no-duplicates */
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { MoreFacetsContent } from '../../src/collection-facets/more-facets-content';
import '../../src/collection-facets/more-facets-content';
import { MockSearchService } from '../mocks/mock-search-service';

describe('More facets content', () => {
  it('should render more facets template', async () => {
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content></more-facets-content>`
    );

    el.facetsLoading = false;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-content')).to.exist;
  });

  it('should render more facets loader template', async () => {
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content></more-facets-content>`
    );

    el.facetsLoading = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('.facets-loader')).to.exist;
  });

  it('should render more facets empty template', async () => {
    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content></more-facets-content>`
    );

    el.facetsLoading = false;
    el.paginationSize = 0;
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('#more-facets-page')?.textContent
    ).to.contains('No result found. please try again later.');
  });

  it('should render pagination for more facets', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`
    );

    el.facetKey = 'mediatype';
    el.facetsLoading = false;
    el.paginationSize = 6;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelectorAll('more-facets-pagination')).to.exist;
  });

  it('query for more facets content using search service', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`
    );

    el.facetKey = 'collection';
    el.fullQuery = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
  });

  it('query for specific facets data', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`
    );

    el.facetKey = 'language';
    el.facetsLoading = false;
    await el.updateComplete;

    expect(el.paginationSize).to.equal(1);
    expect(el.shadowRoot?.querySelector('.facet-list')).to.exist;
    expect(Object.keys(el.castedBuckets as []).length).to.equal(7);
  });

  it('page number clicked event', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
      ></more-facets-content>`
    );

    setTimeout(() =>
      el.dispatchEvent(
        new CustomEvent('pageNumberClicked', { detail: { page: 15 } })
      )
    );
    const { detail } = await oneEvent(el, 'pageNumberClicked');
    expect(detail?.page).to.equal(15);
  });
});
