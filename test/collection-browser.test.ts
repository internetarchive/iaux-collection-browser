/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import type { InfiniteScroller } from '@internetarchive/infinite-scroller';
import { SearchType } from '@internetarchive/search-service';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';
import {
  defaultSelectedFacets,
  FacetBucket,
  SelectedFacets,
  SortField,
} from '../src/models';
import { MockSearchService } from './mocks/mock-search-service';
import { MockCollectionNameCache } from './mocks/mock-collection-name-cache';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';
import { analyticsCategories } from '../src/utils/analytics-events';

describe('Collection Browser', () => {
  it('clear existing filter for facets & sort-bar', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`
    );

    el.selectedSort = 'title' as SortField;
    await el.updateComplete;
    el.clearFilters();

    expect(el.selectedFacets).to.equal(defaultSelectedFacets);
    expect(el.selectedSort).to.equal('relevance');
    expect(el.sortDirection).to.null;
    expect(el.sortParam).to.null;
    expect(el.selectedCreatorFilter).to.null;
    expect(el.selectedTitleFilter).to.null;
  });

  it('filterBy creator with analytics', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`
    );

    el.searchContext = 'betaSearchService';
    el.selectedCreatorFilter = 'A';
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('betaSearchService');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByCreator');
    expect(mockAnalyticsHandler.callLabel).to.equal('start-A');

    el.clearFilters();
    await el.updateComplete;

    expect(el.selectedTitleFilter).to.null;
    expect(mockAnalyticsHandler.callCategory).to.equal('betaSearchService');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByCreator');
    expect(mockAnalyticsHandler.callLabel).to.equal('clear-A');
  });

  it('filterBy title with analytics', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`
    );

    el.searchContext = 'beta-search-service';
    el.selectedSort = 'title' as SortField;
    el.selectedTitleFilter = 'A';
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByTitle');
    expect(mockAnalyticsHandler.callLabel).to.equal('start-A');

    el.clearFilters();
    await el.updateComplete;

    expect(el.selectedTitleFilter).to.null;
    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByTitle');
    expect(mockAnalyticsHandler.callLabel).to.equal('clear-A');
  });

  it('selected facets with analytics - not negative facets', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const mediaTypeBucket = { count: 123, state: 'selected' } as FacetBucket;
    const mockedSelectedFacets: SelectedFacets = {
      subject: {},
      lending: {},
      mediatype: { data: mediaTypeBucket },
      language: {},
      creator: {},
      collection: {},
      year: {},
    };

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`
    );

    el.searchContext = 'search-service';
    el.selectedFacets = mockedSelectedFacets;
    await el.updateComplete;

    el.facetClickHandler('mediatype', true, false);
    expect(mockAnalyticsHandler.callCategory).to.equal('search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetSelected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');

    el.facetClickHandler('mediatype', false, false);
    expect(el.selectedFacets).to.equal(mockedSelectedFacets);
    expect(mockAnalyticsHandler.callCategory).to.equal('search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetDeselected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');
  });

  it('selected facets with analytics - negative facets', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const mediaTypeBucket = { count: 123, state: 'selected' } as FacetBucket;
    const mockedSelectedFacets: SelectedFacets = {
      subject: {},
      lending: {},
      mediatype: { data: mediaTypeBucket },
      language: {},
      creator: {},
      collection: {},
      year: {},
    };

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`
    );

    el.searchContext = 'beta-search-service';
    el.selectedFacets = mockedSelectedFacets;
    await el.updateComplete;

    el.facetClickHandler('mediatype', true, true);
    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetNegativeSelected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');

    el.facetClickHandler('mediatype', false, true);
    expect(el.selectedFacets).to.equal(mockedSelectedFacets);
    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetNegativeDeselected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');
  });

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
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent
    ).to.contains('Results');
  });

  it('queries the search service with a metadata search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser
        .searchService=${searchService}
        .searchType=${SearchType.METADATA}
      >
      </collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.METADATA);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent
    ).to.contains('Results');
  });

  it('queries the search service with a fulltext search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser
        .searchService=${searchService}
        .searchType=${SearchType.FULLTEXT}
      >
      </collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.FULLTEXT);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent
    ).to.contains('Results');
  });

  it('can search on demand if only search type has changed', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .searchType=${SearchType.METADATA}
      ></collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    el.searchType = SearchType.FULLTEXT;
    await el.updateComplete;

    // Haven't performed the search yet
    expect(searchService.searchType).to.equal(SearchType.METADATA);

    el.requestSearch();
    expect(searchService.searchType).to.equal(SearchType.FULLTEXT);
  });

  it('queries for collection names after a fetch', async () => {
    const searchService = new MockSearchService();
    const collectionNameCache = new MockCollectionNameCache();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .collectionNameCache=${collectionNameCache}
      >
      </collection-browser>`
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    expect(collectionNameCache.preloadIdentifiersRequested).to.deep.equal([
      'foo',
      'bar',
      'baz',
      'boop',
    ]);
  });

  it('keeps search results from fetch if no change to query or sort param', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'with-sort';
    el.sortParam = { field: 'foo', direction: 'asc' };
    await el.updateComplete;

    await el.fetchPage(2);

    // If there is no change to the query or sort param during the fetch, the results
    // should be read.
    expect(resultsSpy.callCount).to.be.greaterThanOrEqual(1);
  });

  it('discards obsolete search results if sort params changed before arrival', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'with-sort';
    el.sortParam = { field: 'foo', direction: 'asc' };
    await el.updateComplete;

    const fetchPromise = el.fetchPage(2);
    el.sortParam = { field: 'foo', direction: 'desc' };
    await fetchPromise;

    // If the different sort param causes the results to be discarded,
    // the results array should never be read.
    expect(resultsSpy.callCount).to.equal(0);
  });

  it('discards obsolete search results if sort param added before arrival', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'single-result';
    await el.updateComplete;

    const fetchPromise = el.fetchPage(2);
    el.sortParam = { field: 'foo', direction: 'asc' };
    await fetchPromise;

    // If the different sort param causes the results to be discarded,
    // the results array should never be read.
    expect(resultsSpy.callCount).to.equal(0);
  });

  it('discards obsolete search results if sort param cleared before arrival', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'with-sort';
    await el.updateComplete;

    const fetchPromise = el.fetchPage(2);
    el.sortParam = null;
    await fetchPromise;

    // If the different sort param causes the results to be discarded,
    // the results array should never be read.
    expect(resultsSpy.callCount).to.equal(0);
  });

  it('sets sort properties when user changes sort', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`
    );

    expect(el.selectedSort).to.equal(SortField.relevance);

    el.baseQuery = 'foo';
    await el.updateComplete;

    const sortBar = el.shadowRoot?.querySelector('sort-filter-bar');
    const sortSelector = sortBar?.shadowRoot?.querySelector(
      '#desktop-sort-selector'
    );
    expect(sortSelector).to.exist;

    // Click the title sorter
    [...(sortSelector?.children as HTMLCollection & Iterable<any>)] // tsc doesn't know children is iterable
      .find(child => child.textContent?.trim() === 'Title')
      ?.querySelector('a[href]')
      ?.click();

    await el.updateComplete;

    expect(el.selectedSort).to.equal(SortField.title);
  });

  it('scrolls to page', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`
    );

    const infiniteScroller = el.shadowRoot?.querySelector(
      'infinite-scroller'
    ) as InfiniteScroller;
    expect(infiniteScroller).to.exist;

    const oldScrollToCell = infiniteScroller.scrollToCell;
    const spy = sinon.spy();
    infiniteScroller.scrollToCell = spy;

    el.goToPage(1);

    // Give it a second to scroll
    await new Promise(res => {
      setTimeout(res, 1000);
    });

    expect(spy.callCount).to.equal(1);

    infiniteScroller.scrollToCell = oldScrollToCell;
  });

  it('refreshes when certain properties change - with some analytics event sampling', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const searchService = new MockSearchService();
    const collectionNameCache = new MockCollectionNameCache();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .analyticsHandler=${mockAnalyticsHandler}
        .searchService=${searchService}
        .collectionNameCache=${collectionNameCache}
      ></collection-browser>`
    );
    const infiniteScrollerRefreshSpy = sinon.spy();

    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    (infiniteScroller as InfiniteScroller).reload = infiniteScrollerRefreshSpy;
    expect(infiniteScrollerRefreshSpy.called).to.be.false;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(0);

    // testing: `loggedIn`
    el.loggedIn = true;
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.called).to.be.true;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(1);

    el.loggedIn = false;
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(2);

    // testing: `displayMode`
    el.displayMode = 'list-compact';
    el.searchContext = 'beta-search';
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(3);

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search');
    expect(mockAnalyticsHandler.callAction).to.equal('displayMode');
    expect(mockAnalyticsHandler.callLabel).to.equal('list-compact');

    el.displayMode = 'list-detail';
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(4);

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search');
    expect(mockAnalyticsHandler.callAction).to.equal('displayMode');
    expect(mockAnalyticsHandler.callLabel).to.equal('list-detail');

    // testing: `baseNavigationUrl`
    el.baseNavigationUrl = 'https://funtestsite.com';
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(5);

    // testing: `baseImageUrl`
    el.baseImageUrl = 'https://funtestsiteforimages.com';
    await el.updateComplete;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(6);
  });

  it('query the search service for single result', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`
    );

    el.baseQuery = 'single-result';
    await el.updateComplete;

    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent
    ).to.contains('Result');
  });

  it('`searchContext` prop helps describe where component is being used', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`
    );

    expect(el.searchContext).to.equal(analyticsCategories.default);

    el.searchContext = 'unicorn-search';
    await el.updateComplete;

    expect(el.searchContext).to.equal('unicorn-search');

    // property is reflected as attribute
    expect(el.getAttribute('searchcontext')).to.equal('unicorn-search');
  });
});
