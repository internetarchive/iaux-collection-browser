/* eslint-disable import/no-duplicates */
import { expect, fixture, oneEvent } from '@open-wc/testing';
import { html } from 'lit';
import type { Aggregation } from '@internetarchive/search-service';
import type { MoreFacetsContent } from '../../src/collection-facets/more-facets-content';
import '../../src/collection-facets/more-facets-content';
import { MockSearchService } from '../mocks/mock-search-service';

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

const aggregation: Record<string, Aggregation> = {
  'user_aggs__terms__field:collectionSorter__size:1': {
    buckets: [
      {
        key: 'foo',
        doc_count: 5,
      },
    ],
  },
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
    el.fullQuery = 'title:hello';
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
    el.fullQuery = 'title:hello';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('title:hello');
  });

  it('combine selectedFacets and aggregationFacets and render on modal', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<MoreFacetsContent>(
      html`<more-facets-content
        .searchService=${searchService}
        .selectedFacets=${selectedFacetsGroup}
        .aggregations=${aggregation}
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
