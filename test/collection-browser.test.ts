/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';
import { MockSearchService } from './mocks/mock-search-service';
import { MockCollectionNameCache } from './mocks/mock-collection-name-cache';

describe('Collection Browser', () => {
  it('should render with a sort bar, facets, and infinite scroller', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`
    );

    el.baseQuery = 'hello';
    await el.updateComplete;

    const facets = el.shadowRoot?.querySelector('collection-facets');
    const sortBar = el.shadowRoot?.querySelector('sort-filter-bar');
    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    expect(facets).to.exist;
    expect(sortBar).to.exist;
    expect(infiniteScroller).to.exist;
  });

  it('queries the search service when given a base query', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
      ></collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
  });

  it('queries for collection names after a fetch', async () => {
    const searchService = new MockSearchService();
    const collectionNameCache = new MockCollectionNameCache();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .collectionNameCache=${collectionNameCache}
      ></collection-browser>`
    );

    el.baseQuery = 'blahblah';
    await el.updateComplete;

    expect(collectionNameCache.preloadIdentifiersRequested).to.deep.equal([
      'foo',
      'bar',
      'baz',
      'boop',
    ]);
  });
});
