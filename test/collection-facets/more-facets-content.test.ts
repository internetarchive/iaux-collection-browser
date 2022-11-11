/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { Aggregation } from '@internetarchive/search-service';
import type { MoreFacetsContent } from '../../src/collection-facets/more-facets-content';
import '../../src/collection-facets/more-facets-content';
import { MockSearchService } from '../mocks/mock-search-service';
import { MockAnalyticsHandler } from '../mocks/mock-analytics-handler';

const selectedFacetsGroup = {
  title: 'Media Type',
  key: 'mediatype',
  buckets: [
    { displayText: 'audio', key: 'audio', count: 1001, state: 'none' },
    { displayText: 'movies', key: 'movies', count: 901, state: 'none' },
    { displayText: 'texts', key: 'texts', count: 2101, state: 'none' },
    { displayText: 'data', key: 'data', count: 230, state: 'none' },
    { displayText: 'web', key: 'web', count: 453, state: 'none' },
  ],
};

const aggregations: Record<string, Aggregation> = {
  collection: new Aggregation({
    buckets: [
      {
        key: 'foo',
        doc_count: 5,
      },
    ],
  }),
};

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
    el.query = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
  });

  it('filter raw selectedFacets object', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .selectedFacets=${selectedFacetsGroup}
      ></more-facets-content>`
    );

    el.facetKey = 'collection';
    el.query = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
  });

  it('combine selectedFacets and aggregationFacets and render on modal', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .selectedFacets=${selectedFacetsGroup}
        .aggregations=${aggregations}
      ></more-facets-content>`
    );

    await el.updateComplete;

    expect(el.facetGroupTitle).to.equal('Collection');

    const facetGroup = el.facetGroup?.shift();
    expect(facetGroup?.key).to.equal('collection');
    expect(facetGroup?.title).to.equal('Collection');

    const bucket = facetGroup?.buckets[0];
    expect(bucket?.key).to.equal('foo');
    expect(bucket?.count).to.equal(5);
  });

  it('cancel button clicked event', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .analyticsHandler=${mockAnalyticsHandler}
      ></more-facets-content>`
    );

    el.facetsLoading = false;
    el.paginationSize = 5;
    await el.updateComplete;

    // select cancel button
    const cancelButton = el.shadowRoot?.querySelector(
      '.footer > .btn-cancel'
    ) as HTMLButtonElement;
    cancelButton?.click();

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('closeMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('undefined');
  });

  it('facet apply button clicked event', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .analyticsHandler=${mockAnalyticsHandler}
      ></more-facets-content>`
    );

    el.facetsLoading = false;
    el.paginationSize = 5;
    el.facetKey = 'collection';
    await el.updateComplete;

    // select submit button
    const submitButton = el.shadowRoot?.querySelector(
      '.footer > .btn-submit'
    ) as HTMLButtonElement;
    submitButton?.click();

    expect(mockAnalyticsHandler.callCategory).to.equal('collection-browser');
    expect(mockAnalyticsHandler.callAction).to.equal('applyMoreFacetsModal');
    expect(mockAnalyticsHandler.callLabel).to.equal('collection');
  });
});
