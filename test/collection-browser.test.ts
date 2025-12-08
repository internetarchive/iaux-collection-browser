import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
import type { InfiniteScroller } from '@internetarchive/infinite-scroller';
import { FilterConstraint, SearchType } from '@internetarchive/search-service';
import type { HistogramDateRange } from '@internetarchive/histogram-date-range';
import type { CollectionBrowser } from '../src/collection-browser';
import '../src/collection-browser';
import {
  getDefaultSelectedFacets,
  FacetBucket,
  SelectedFacets,
  SortField,
} from '../src/models';
import { MockSearchService } from './mocks/mock-search-service';
import { MockAnalyticsHandler } from './mocks/mock-analytics-handler';
import {
  analyticsActions,
  analyticsCategories,
} from '../src/utils/analytics-events';
import type { TileDispatcher } from '../src/tiles/tile-dispatcher';
import type { CollectionFacets } from '../src/collection-facets';
import type { EmptyPlaceholder } from '../src/empty-placeholder';
import type { SortFilterBar } from '../src/sort-filter-bar/sort-filter-bar';

/**
 * Wait for the next tick of the event loop.
 *
 * This is necessary in some of the tests because certain collection browser
 * updates take more than one tick to render (e.g., date picker & query changes).
 * These delays are non-ideal and should eventually be investigated and fixed,
 * but they are minor enough that waiting for the next tick is a reasonable
 * testing solution for now.
 */
const nextTick = () => aTimeout(0);

describe('Collection Browser', () => {
  beforeEach(async () => {
    // Apparently query params set by one test can bleed into other tests.
    // Since collection browser restores its state from certain query params, we need
    // to clear these before each test to ensure they run in isolation from one another.
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.delete('sin');
    searchParams.delete('sort');
    searchParams.delete('query');
    searchParams.delete('page');
    searchParams.delete('and[]');
    searchParams.delete('not[]');
    window.history.replaceState({}, '', url);
  });

  it('clears selected facets when requested', async () => {
    const selectedFacets = getDefaultSelectedFacets();
    selectedFacets.creator.foo = { count: 1, key: 'foo', state: 'selected' };
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`,
    );

    el.selectedFacets = selectedFacets;
    await el.updateComplete;
    el.clearFilters(); // By default, sort is not cleared

    expect(el.selectedFacets).to.deep.equal(getDefaultSelectedFacets());
  });

  it('clears existing filters but not sort by default', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`,
    );

    el.selectedSort = 'title' as SortField;
    el.sortDirection = 'asc';
    await el.updateComplete;
    el.clearFilters(); // By default, sort is not cleared

    expect(el.selectedFacets).to.deep.equal(getDefaultSelectedFacets());
    expect(el.selectedSort).to.equal('title');
    expect(el.sortDirection).to.equal('asc');
    expect(el.sortParam).to.deep.equal({
      field: 'titleSorter',
      direction: 'asc',
    });
    expect(el.selectedCreatorFilter).to.be.null;
    expect(el.selectedTitleFilter).to.be.null;
  });

  it('clears existing filters for facets & sort via option', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`,
    );

    el.selectedSort = 'title' as SortField;
    await el.updateComplete;
    el.clearFilters({ sort: true }); // Sort is reset too due to the option

    expect(el.selectedFacets).to.deep.equal(getDefaultSelectedFacets());
    expect(el.selectedSort).to.equal(SortField.default);
    expect(el.sortDirection).to.be.null;
    expect(el.sortParam).to.be.null;
    expect(el.selectedCreatorFilter).to.be.null;
    expect(el.selectedTitleFilter).to.be.null;
  });

  it('filterBy creator with analytics', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`,
    );

    el.searchContext = 'betaSearchService';
    el.selectedSort = 'creator' as SortField;
    el.sortDirection = 'asc';
    el.selectedCreatorFilter = 'A';
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('betaSearchService');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByCreator');
    expect(mockAnalyticsHandler.callLabel).to.equal('start-A');

    el.clearFilters();
    await el.updateComplete;

    expect(el.selectedTitleFilter).to.be.null;
    expect(mockAnalyticsHandler.callCategory).to.equal('betaSearchService');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByCreator');
    expect(mockAnalyticsHandler.callLabel).to.equal('clear-A');
  });

  it('filterBy title with analytics', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .analyticsHandler=${mockAnalyticsHandler}>
      </collection-browser>`,
    );

    el.searchContext = 'beta-search-service';
    el.selectedSort = 'title' as SortField;
    el.sortDirection = 'asc';
    el.selectedTitleFilter = 'A';
    await el.updateComplete;

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('filterByTitle');
    expect(mockAnalyticsHandler.callLabel).to.equal('start-A');

    el.clearFilters();
    await el.updateComplete;

    expect(el.selectedTitleFilter).to.be.null;
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
      </collection-browser>`,
    );

    el.searchContext = 'search-service';
    el.selectedFacets = mockedSelectedFacets;
    await el.updateComplete;

    el.facetClickHandler(
      new CustomEvent('facetClick', {
        detail: {
          facetType: 'mediatype',
          bucket: {
            key: '',
            state: 'selected',
            count: 123,
          },
          negative: false,
        },
      }),
    );
    expect(mockAnalyticsHandler.callCategory).to.equal('search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetSelected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');

    el.facetClickHandler(
      new CustomEvent('facetClick', {
        detail: {
          facetType: 'mediatype',
          bucket: {
            key: '',
            state: 'none',
            count: 123,
          },
          negative: false,
        },
      }),
    );
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
      </collection-browser>`,
    );

    el.searchContext = 'beta-search-service';
    el.selectedFacets = mockedSelectedFacets;
    await el.updateComplete;

    el.facetClickHandler(
      new CustomEvent('facetClick', {
        detail: {
          facetType: 'mediatype',
          bucket: {
            key: '',
            state: 'hidden',
            count: 123,
          },
          negative: true,
        },
      }),
    );
    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetNegativeSelected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');

    el.facetClickHandler(
      new CustomEvent('facetClick', {
        detail: {
          facetType: 'mediatype',
          bucket: {
            key: '',
            state: 'none',
            count: 123,
          },
          negative: true,
        },
      }),
    );
    expect(el.selectedFacets).to.equal(mockedSelectedFacets);
    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search-service');
    expect(mockAnalyticsHandler.callAction).to.equal('facetNegativeDeselected');
    expect(mockAnalyticsHandler.callLabel).to.equal('mediatype');
  });

  it('should render with a sort bar, facets, and infinite scroller', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'hello';
    await el.updateComplete;
    await nextTick();

    const facets = el.shadowRoot?.querySelector('collection-facets');
    const sortBar = el.shadowRoot?.querySelector('sort-filter-bar');
    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    expect(facets, 'facets').to.exist;
    expect(sortBar, 'sort bar').to.exist;
    expect(infiniteScroller, 'infinite scroller').to.exist;
  });

  it('queries the search service when given a base query', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Results');
  });

  it('queries the search service with a metadata search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.searchType = SearchType.METADATA;
    await el.updateComplete;

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.METADATA);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Results');
  });

  it('can change search type', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    el.searchType = SearchType.FULLTEXT;
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchType).to.equal(SearchType.FULLTEXT);
  });

  it('queries the search service with a fulltext search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.searchType = SearchType.FULLTEXT;
    await el.updateComplete;

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.FULLTEXT);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Results');
  });

  it('queries the search service with a radio search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.searchType = SearchType.RADIO;
    await el.updateComplete;

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.RADIO);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Results');
  });

  it('queries the search service with a TV search', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html` <collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.searchType = SearchType.TV;
    await el.updateComplete;

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.TV);
    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Results');
  });

  it('queries the search service with facets selected/negated', async () => {
    const searchService = new MockSearchService();
    const selectedFacets: SelectedFacets = {
      subject: {
        foo: {
          key: 'foo',
          count: 1,
          state: 'selected',
        },
        bar: {
          key: 'bar',
          count: 2,
          state: 'hidden',
        },
      },
      lending: {},
      mediatype: {},
      language: {
        en: {
          key: 'en',
          count: 1,
          state: 'selected',
        },
      },
      creator: {},
      collection: {},
      year: {},
    };

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    el.selectedFacets = selectedFacets;
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchParams?.filters).to.deep.equal({
      subject: {
        foo: 'inc',
        bar: 'exc',
      },
      language: {
        en: 'inc',
      },
    });
  });

  it('fails gracefully if no search service provided', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    // This shouldn't throw an error
    expect(el.dataSource.fetchPage(3)).to.exist;

    // Should continue showing the empty placeholder
    expect(el.shadowRoot?.querySelector('empty-placeholder')).to.exist;
  });

  it('restores search type from URL param', async () => {
    // Add a sin=TXT param to the URL
    const url = new URL(window.location.href);
    url.searchParams.append('sin', 'TXT');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    expect(el.searchType).to.equal(SearchType.FULLTEXT);
  });

  it('does not persist or restore search type from URL param if suppressed', async () => {
    // Add a sin=TXT param to the URL
    let url = new URL(window.location.href);
    url.searchParams.append('sin', 'TXT');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        suppressURLSinParam
      >
      </collection-browser>`,
    );

    url = new URL(window.location.href);
    expect(el.searchType).to.equal(SearchType.DEFAULT);
    expect(url.searchParams.has('sin')).to.be.false; // Removes existing sin param

    el.searchType = SearchType.RADIO;
    await el.updateComplete;

    url = new URL(window.location.href);
    expect(url.searchParams.has('sin')).to.be.false; // Doesn't add sin param
  });

  it('can construct tile models with many fields present', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'many-fields';
    await el.updateComplete;
    await el.initialSearchComplete;

    const cellTemplate = el.cellForIndex(0);
    expect(cellTemplate).to.exist;

    const cell = await fixture<TileDispatcher>(cellTemplate!);
    expect(cell).to.exist;
  });

  it('emits empty results event when search fetches no results', async () => {
    const searchService = new MockSearchService();
    const emptyResultsSpy = sinon.spy();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        @emptyResults=${emptyResultsSpy}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'no-results';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(emptyResultsSpy.callCount).to.equal(1);
  });

  it('emits searchError event when search results in an error', async () => {
    const searchService = new MockSearchService();
    const searchErrorSpy = sinon.spy();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        @searchError=${searchErrorSpy}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'error';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchErrorSpy.callCount).to.equal(1);
  });

  it('applies loggedin flag to tile models if needed', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'loggedin';
    await el.updateComplete;
    await el.initialSearchComplete;

    const cellTemplate = el.cellForIndex(0);
    expect(cellTemplate).to.exist;

    const cell = await fixture<TileDispatcher>(cellTemplate!);
    expect(cell).to.exist;

    expect(cell.model?.loginRequired).to.be.true;
  });

  it('applies no-preview flag to tile models if needed', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'no-preview';
    await el.updateComplete;
    await el.initialSearchComplete;

    const cellTemplate = el.cellForIndex(0);
    expect(cellTemplate).to.exist;

    const cell = await fixture<TileDispatcher>(cellTemplate!);
    expect(cell).to.exist;

    expect(cell.model?.contentWarning).to.be.true;
  });

  it('both loggedin and no-preview flags can be set simultaneously', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'loggedin-no-preview';
    await el.updateComplete;
    await el.initialSearchComplete;

    const cellTemplate = el.cellForIndex(0);
    expect(cellTemplate).to.exist;

    const cell = await fixture<TileDispatcher>(cellTemplate!);
    expect(cell).to.exist;

    expect(cell.model?.loginRequired).to.be.true;
    expect(cell.model?.contentWarning).to.be.true;
  });

  it('joins full description array into a single string with line breaks', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    // This query receives an array description like ['line1', 'line2']
    el.baseQuery = 'multi-line-description';
    await el.updateComplete;
    await el.initialSearchComplete;

    const cellTemplate = el.cellForIndex(0);
    expect(cellTemplate).to.exist;

    const cell = await fixture<TileDispatcher>(cellTemplate!);
    expect(cell).to.exist;

    // Actual model description should be joined
    expect(cell.model?.description).to.equal('line1\nline2');
  });

  it('can change search type', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .searchType=${SearchType.METADATA}
      ></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    el.searchType = SearchType.FULLTEXT;
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchType).to.equal(SearchType.FULLTEXT);
  });

  it('trims queries of leading/trailing whitespace', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
      ></collection-browser>`,
    );

    el.baseQuery = '   collection:foo   ';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('collection:foo');
  });

  it('shows error message when error response received', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
      ></collection-browser>`,
    );

    el.baseQuery = 'error';
    await el.updateComplete;
    await el.initialSearchComplete;

    const errorPlaceholder = el.shadowRoot?.querySelector(
      'empty-placeholder',
    ) as EmptyPlaceholder;
    const errorDetails = errorPlaceholder?.shadowRoot?.querySelector(
      '.error-details',
    ) as HTMLParagraphElement;

    expect(errorDetails).to.exist;
    expect(errorDetails.textContent).to.contain('foo');
  });

  it('shows error message when error response received for a collection', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
      ></collection-browser>`,
    );

    el.withinCollection = 'error';
    await el.updateComplete;
    await el.initialSearchComplete;

    const errorPlaceholder = el.shadowRoot?.querySelector(
      'empty-placeholder',
    ) as EmptyPlaceholder;
    const errorDetails = errorPlaceholder?.shadowRoot?.querySelector(
      '.error-details',
    ) as HTMLParagraphElement;

    expect(errorDetails).to.exist;
    expect(errorDetails.textContent).to.contain('foo');
  });

  it('reports malformed response errors to Sentry', async () => {
    const sentrySpy = sinon.spy();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).Sentry = { captureMessage: sentrySpy };
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
      ></collection-browser>`,
    );

    el.baseQuery = 'malformed';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(sentrySpy.callCount).to.be.greaterThanOrEqual(1);
  });

  it('adds collection names to cache when present on response', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'collection-titles';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(el.dataSource.collectionTitles.get('foo')).to.equal(
      'Foo Collection',
    );
    expect(el.dataSource.collectionTitles.get('bar')).to.equal(
      'Bar Collection',
    );
    expect(el.dataSource.collectionTitles.get('baz')).to.equal(
      'Baz Collection',
    );
    expect(el.dataSource.collectionTitles.get('boop')).to.equal(
      'Boop Collection',
    );
  });

  it('adds tv channel aliases to cache when present on response', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'channel-aliases';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(el.dataSource.tvChannelAliases.get('foo')).to.equal('Foo Network');
    expect(el.dataSource.tvChannelAliases.get('bar')).to.equal('Bar Network');
  });

  it('keeps search results from fetch if no change to query or sort param', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'with-sort';
    el.selectedSort = SortField.date;
    el.sortDirection = 'asc';
    await el.updateComplete;

    await el.dataSource.fetchPage(3);

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
      </collection-browser>`,
    );

    el.baseQuery = 'with-sort';
    el.selectedSort = SortField.date;
    el.sortDirection = 'asc';
    await el.updateComplete;

    // We want to spy exclusively on the first set of results, not the second
    searchService.asyncResponse = false;
    searchService.resultsSpy = () => {};

    el.sortDirection = 'desc';
    await el.updateComplete;
    await el.initialSearchComplete;

    // If the different sort param causes the results to be discarded,
    // the first results array should never be read.
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
      </collection-browser>`,
    );

    el.baseQuery = 'single-result';
    await el.updateComplete;

    // We want to spy exclusively on the first set of results, not the second
    searchService.asyncResponse = false;
    searchService.resultsSpy = () => {};

    el.selectedSort = SortField.date;
    el.sortDirection = 'asc';
    await el.updateComplete;
    await el.initialSearchComplete;

    // If the different sort param causes the results to be discarded,
    // the first results array should never be read.
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
      </collection-browser>`,
    );

    el.baseQuery = 'with-sort';
    el.selectedSort = SortField.date;
    el.sortDirection = 'asc';
    await el.updateComplete;

    // We want to spy exclusively on the first set of results, not the second
    searchService.asyncResponse = false;
    searchService.resultsSpy = () => {};

    el.selectedSort = SortField.default;
    await el.updateComplete;
    await el.initialSearchComplete;

    // If the different sort param causes the results to be discarded,
    // the first results array should never be read.
    expect(resultsSpy.callCount).to.equal(0);
  });

  it('sets sort properties when user changes sort', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    expect(el.selectedSort).to.equal(SortField.default);

    el.baseQuery = 'foo';
    await el.updateComplete;
    await nextTick();

    const sortBar = el.shadowRoot?.querySelector(
      '#content-container sort-filter-bar',
    );
    const sortSelector = sortBar?.shadowRoot?.querySelector(
      '#desktop-sort-selector',
    );
    expect(sortSelector, 'sort bar').to.exist;

    // Click the title sorter
    Array.from(sortSelector!.children)
      .find(child => child.textContent?.trim() === 'Title')
      ?.querySelector('button')
      ?.click();

    await el.updateComplete;

    expect(el.selectedSort).to.equal(SortField.title);

    // Click the creator sorter
    Array.from(sortSelector!.children)
      .find(child => child.textContent?.trim() === 'Creator')
      ?.querySelector('button')
      ?.click();

    await el.updateComplete;

    expect(el.selectedSort).to.equal(SortField.creator);
  });

  it('sets sort filter properties when user selects title filter', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'first-title';
    el.selectedSort = 'title' as SortField;
    el.sortDirection = 'asc';
    el.selectedTitleFilter = 'X';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('first-title');
    expect(searchService.searchParams?.filters?.firstTitle?.X).to.equal(
      FilterConstraint.INCLUDE,
    );
  });

  it('sets sort filter properties when user selects creator filter', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'first-creator';
    el.selectedSort = 'creator' as SortField;
    el.sortDirection = 'asc';
    el.selectedCreatorFilter = 'X';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('first-creator');
    expect(searchService.searchParams?.filters?.firstCreator?.X).to.equal(
      FilterConstraint.INCLUDE,
    );
  });

  it('sets sort filter properties simultaneous with facets and date range', async () => {
    const searchService = new MockSearchService();
    const selectedFacets: SelectedFacets = {
      collection: { foo: { key: 'foo', state: 'selected', count: 1 } },
      creator: {},
      language: {},
      lending: {},
      mediatype: {},
      subject: {},
      year: {},
    };

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'first-creator';
    el.selectedSort = 'creator' as SortField;
    el.selectedFacets = selectedFacets;
    el.minSelectedDate = '1950';
    el.maxSelectedDate = '1970';
    el.sortDirection = 'asc';
    el.selectedCreatorFilter = 'X';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.query).to.equal('first-creator');
    expect(searchService.searchParams?.filters).to.deep.equal({
      collection: {
        foo: 'inc',
      },
      year: {
        '1950': 'gte',
        '1970': 'lte',
      },
      firstCreator: {
        X: 'inc',
      },
    });
  });

  it('applies correct search filter when TV clip filter set to commercials', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'tv-fields';
    el.searchType = SearchType.TV;
    el.tvClipFilter = 'commercials';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.filters?.ad_id?.['*']).to.equal(
      FilterConstraint.INCLUDE,
    );
  });

  it('applies correct search filter when TV clip filter set to factchecks', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'tv-fields';
    el.searchType = SearchType.TV;
    el.tvClipFilter = 'factchecks';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.filters?.factcheck?.['*']).to.equal(
      FilterConstraint.INCLUDE,
    );
  });

  it('applies correct search filter when TV clip filter set to quotes', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'tv-fields';
    el.searchType = SearchType.TV;
    el.tvClipFilter = 'quotes';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(searchService.searchParams?.filters?.clip?.['1']).to.equal(
      FilterConstraint.INCLUDE,
    );
  });

  it('resets letter filters when query changes', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'first-creator';
    el.selectedSort = 'creator' as SortField;
    el.sortDirection = 'asc';
    el.selectedCreatorFilter = 'X';
    await el.updateComplete;
    await el.initialSearchComplete;
    await nextTick();

    expect(searchService.searchParams?.query).to.equal('first-creator');
    expect(searchService.searchParams?.filters?.firstCreator?.X).to.equal(
      FilterConstraint.INCLUDE,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await nextTick();

    expect(searchService.searchParams?.query).to.equal('collection:foo');
    expect(searchService.searchParams?.filters?.firstCreator).not.to.exist;
  });

  it('sets date range query when date picker selection changed', async () => {
    const searchService = new MockSearchService();
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .analyticsHandler=${mockAnalyticsHandler}
        .suppressPlaceholders=${true}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'years'; // Includes year_histogram aggregation in response
    el.showHistogramDatePicker = true;
    await el.updateComplete;

    const facets = el.shadowRoot?.querySelector(
      'collection-facets',
    ) as CollectionFacets;
    await facets?.updateComplete;

    // Wait for the date picker to be rendered (which may take until the next tick)
    await nextTick();

    const histogram = facets?.shadowRoot?.querySelector(
      'histogram-date-range',
    ) as HistogramDateRange;

    expect(histogram, 'histogram exists').to.exist;

    // Enter a new min date into the date picker
    const minDateInput = histogram.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    const pressEnterEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
    });

    minDateInput.value = '1960';
    minDateInput.dispatchEvent(pressEnterEvent);

    // Wait for the histogram's update delay
    await aTimeout(histogram.updateDelay + 50);

    // Ensure that the histogram change propagated to the collection browser's
    // date query correctly.
    await el.updateComplete;
    expect(el.minSelectedDate).to.equal('1960');
    expect(el.maxSelectedDate).to.equal('2009');
  });

  it('sets date range query when monthly date picker selection changed', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .suppressPlaceholders=${true}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'months'; // Includes date_histogram aggregation in response
    el.searchType = SearchType.TV;
    el.showHistogramDatePicker = true;
    await el.updateComplete;

    const facets = el.shadowRoot?.querySelector(
      'collection-facets',
    ) as CollectionFacets;
    await facets?.updateComplete;

    // Wait for the date picker to be rendered (which may take until the next tick)
    await nextTick();

    const histogram = facets?.shadowRoot?.querySelector(
      'histogram-date-range',
    ) as HistogramDateRange;

    expect(histogram, 'histogram exists').to.exist;

    // Enter a new min date into the date picker
    const minDateInput = histogram.shadowRoot?.querySelector(
      '#date-min',
    ) as HTMLInputElement;

    const pressEnterEvent = new KeyboardEvent('keyup', {
      key: 'Enter',
    });

    minDateInput.value = '2001-02';
    minDateInput.dispatchEvent(pressEnterEvent);

    // Wait for the histogram's update delay
    await aTimeout(histogram.updateDelay + 50);

    // Ensure that the histogram change propagated to the collection browser's
    // date query correctly.
    await el.updateComplete;
    expect(el.minSelectedDate).to.equal('2001-02');
    expect(el.maxSelectedDate).to.equal('2002-12');
  });

  it('emits event when results start and end loading', async () => {
    const spy = sinon.spy();
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        @searchResultsLoadingChanged=${spy}
      ></collection-browser>`,
    );
    spy.resetHistory();

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    // Should initially emit loading=true, then later emit loading=false
    expect(spy.callCount).to.equal(2);
    expect(spy.firstCall.firstArg?.detail?.loading).to.equal(true);
    expect(spy.secondCall.firstArg?.detail?.loading).to.equal(false);
  });

  it('collapses extra set of quotes around href field', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );

    el.baseQuery = 'extra-quoted-href';
    await el.updateComplete;
    await el.initialSearchComplete;
    await el.updateComplete;
    await aTimeout(50);

    // Original href q param starts/ends with %22%22, but should be collapsed to %22 before render
    expect(el.dataSource.getTileModelAt(0)?.href).to.equal(
      '/details/foo?q=%22quoted+query%22',
    );
  });

  it('sets default sort from collection metadata', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );

    el.withinCollection = 'default-sort';
    await el.updateComplete;
    await el.initialSearchComplete;
    await el.updateComplete;
    await aTimeout(50);

    const sortBar = el.shadowRoot?.querySelector(
      'sort-filter-bar',
    ) as SortFilterBar;
    expect(sortBar).to.exist;
    expect(sortBar.defaultSortField).to.equal(SortField.title);
    expect(sortBar.defaultSortDirection).to.equal('asc');
    expect(sortBar.selectedSort).to.equal(SortField.default);
    expect(sortBar.sortDirection).to.be.null;
  });

  it('sets default sort from collection metadata in "-field" format', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );

    el.withinCollection = 'default-sort-concise';
    await el.updateComplete;
    await el.initialSearchComplete;
    await el.updateComplete;
    await aTimeout(50);

    const sortBar = el.shadowRoot?.querySelector(
      'sort-filter-bar',
    ) as SortFilterBar;
    expect(sortBar).to.exist;
    expect(sortBar.defaultSortField).to.equal(SortField.dateadded);
    expect(sortBar.defaultSortDirection).to.equal('desc');
    expect(sortBar.selectedSort).to.equal(SortField.default);
    expect(sortBar.sortDirection).to.be.null;
  });

  it('falls back to weekly views default sorting on profiles when tab not set', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .withinProfile=${'@foobar'}
      ></collection-browser>`,
    );

    el.applyDefaultProfileSort();
    expect(el.defaultSortParam).to.deep.equal({
      field: 'week',
      direction: 'desc',
    });
  });

  it('uses relevance sort as default when a query is set', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );

    el.withinCollection = 'default-sort';
    el.baseQuery = 'default-sort';
    await el.updateComplete;
    await el.initialSearchComplete;
    await el.updateComplete;
    await aTimeout(50);

    const sortBar = el.shadowRoot?.querySelector(
      'sort-filter-bar',
    ) as SortFilterBar;
    expect(sortBar).to.exist;
    expect(sortBar.defaultSortField).to.equal(SortField.relevance);
    expect(sortBar.defaultSortDirection).to.be.null;
    expect(sortBar.selectedSort).to.equal(SortField.default);
    expect(sortBar.sortDirection).to.be.null;
  });

  it('uses date favorited sort as default when targeting fav- collection', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      ></collection-browser>`,
    );

    el.withinCollection = 'fav-sort';
    await el.updateComplete;
    await el.initialSearchComplete;
    await el.updateComplete;
    await aTimeout(50);

    const sortBar = el.shadowRoot?.querySelector(
      'sort-filter-bar',
    ) as SortFilterBar;
    expect(sortBar).to.exist;
    expect(sortBar.defaultSortField).to.equal(SortField.datefavorited);
    expect(sortBar.defaultSortDirection).to.equal('desc');
    expect(sortBar.selectedSort).to.equal(SortField.default);
    expect(sortBar.sortDirection).to.be.null;
  });

  it('scrolls to page', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    // Infinite scroller won't exist unless there's a base query.
    // First ensure that we don't throw errors when it doesn't exist.
    await el.goToPage(1);

    // And make sure it correctly calls scrollToCell when the
    // infinite scroller does exist.
    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await nextTick();

    const infiniteScroller = el.shadowRoot?.querySelector(
      'infinite-scroller',
    ) as InfiniteScroller;
    expect(infiniteScroller).to.exist;

    const oldScrollToCell = infiniteScroller.scrollToCell;
    const spy = sinon.spy();
    infiniteScroller.scrollToCell = spy;

    await el.goToPage(1);
    expect(spy.callCount, 'scroll to page fires once').to.equal(1);

    infiniteScroller.scrollToCell = oldScrollToCell;
  });

  it('shows mobile facets in mobile view', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .mobileBreakpoint=${9999}
      ></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    const contentContainer = el.shadowRoot?.querySelector(
      '#content-container',
    ) as HTMLElement;

    el.handleResize({
      target: contentContainer,
      contentRect: contentContainer.getBoundingClientRect(),
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
    });
    await el.updateComplete;

    const mobileFacets = el.shadowRoot?.querySelector(
      '#mobile-filter-collapse',
    );
    expect(mobileFacets).to.exist;
  });

  it('fires analytics when mobile facets toggled', async () => {
    const searchService = new MockSearchService();
    const analyticsHandler = new MockAnalyticsHandler();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .analyticsHandler=${analyticsHandler}
        .searchContext=${'foobar-context'}
        .mobileBreakpoint=${9999}
      ></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    const contentContainer = el.shadowRoot?.querySelector(
      '#content-container',
    ) as HTMLElement;

    el.handleResize({
      target: contentContainer,
      contentRect: contentContainer.getBoundingClientRect(),
      borderBoxSize: [],
      contentBoxSize: [],
      devicePixelContentBoxSize: [],
    });
    await el.updateComplete;

    const mobileFacets = el.shadowRoot?.querySelector(
      '#mobile-filter-collapse',
    ) as HTMLDetailsElement;
    expect(mobileFacets).to.exist;

    // We set up a Promise to wait for the 'toggle' event on the collapser,
    // which is what triggers the analytics.
    let facetsToggled = new Promise(resolve => {
      mobileFacets.addEventListener('toggle', resolve);
    });

    // Open the mobile facets accordion & check analytics
    const mobileFacetsHeader = mobileFacets.querySelector('summary');
    expect(mobileFacetsHeader).to.exist;
    mobileFacetsHeader!.click();
    await facetsToggled;
    expect(analyticsHandler.callCategory).to.equal('foobar-context');
    expect(analyticsHandler.callAction).to.equal(
      analyticsActions.mobileFacetsToggled,
    );
    expect(analyticsHandler.callLabel).to.equal('open');

    // Close the mobile facets accordion & check analytics
    facetsToggled = new Promise(resolve => {
      mobileFacets.addEventListener('toggle', resolve);
    });
    mobileFacetsHeader!.click();
    await facetsToggled;
    expect(analyticsHandler.callCategory).to.equal('foobar-context');
    expect(analyticsHandler.callAction).to.equal(
      analyticsActions.mobileFacetsToggled,
    );
    expect(analyticsHandler.callLabel).to.equal('closed');
  });

  it('sets parent collections to prop when searching a collection', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinCollection=${'fake'}
      ></collection-browser>`,
    );

    el.baseQuery = 'parent-collections';
    await el.updateComplete;
    await el.initialSearchComplete;
    await aTimeout(0);

    expect(el.dataSource.parentCollections).to.deep.equal(['foo', 'bar']);
  });

  it('recognizes TV collections', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinCollection=${'TV-FOO'}
      ></collection-browser>`,
    );

    el.baseQuery = 'tv-collection';
    await el.updateComplete;
    await el.initialSearchComplete;
    await aTimeout(0);

    expect(el.isTVCollection).to.be.true;
  });

  it('refreshes when certain properties change - with some analytics event sampling', async () => {
    const mockAnalyticsHandler = new MockAnalyticsHandler();
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .analyticsHandler=${mockAnalyticsHandler}
        .searchService=${searchService}
      ></collection-browser>`,
    );
    const infiniteScrollerRefreshSpy = sinon.spy();

    // Infinite scroller won't exist unless there's a base query
    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await nextTick();

    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    (infiniteScroller as InfiniteScroller).reload = infiniteScrollerRefreshSpy;
    expect(infiniteScrollerRefreshSpy.called).to.be.false;
    expect(infiniteScrollerRefreshSpy.callCount).to.equal(0);

    // testing: `loggedIn`
    el.loggedIn = true;
    await el.updateComplete;

    expect(infiniteScrollerRefreshSpy.called, 'Infinite Scroller Refresh').to.be
      .true;
    expect(
      infiniteScrollerRefreshSpy.callCount,
      'Infinite Scroller Refresh call count',
    ).to.equal(1);

    el.loggedIn = false;
    await el.updateComplete;

    expect(
      infiniteScrollerRefreshSpy.callCount,
      '2nd Infinite Scroller Refresh',
    ).to.equal(2);

    // testing: `displayMode`
    el.displayMode = 'list-compact';
    el.searchContext = 'beta-search';
    await el.updateComplete;
    expect(
      infiniteScrollerRefreshSpy.callCount,
      '3rd Infinite Scroller Refresh',
    ).to.equal(3);

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search');
    expect(mockAnalyticsHandler.callAction).to.equal('displayMode');
    expect(mockAnalyticsHandler.callLabel).to.equal('list-compact');

    el.displayMode = 'list-detail';
    await el.updateComplete;
    expect(
      infiniteScrollerRefreshSpy.callCount,
      '4th Infinite Scroller Refresh',
    ).to.equal(4);

    expect(mockAnalyticsHandler.callCategory).to.equal('beta-search');
    expect(mockAnalyticsHandler.callAction).to.equal('displayMode');
    expect(mockAnalyticsHandler.callLabel).to.equal('list-detail');

    // testing: `baseNavigationUrl`
    el.baseNavigationUrl = 'https://funtestsite.com';
    await el.updateComplete;
    expect(
      infiniteScrollerRefreshSpy.callCount,
      '5th Infinite Scroller Refresh',
    ).to.equal(5);

    // testing: `baseImageUrl`
    el.baseImageUrl = 'https://funtestsiteforimages.com';
    await el.updateComplete;
    expect(
      infiniteScrollerRefreshSpy.callCount,
      '6th Infinite Scroller Refresh',
    ).to.equal(6);
  });

  it('query the search service for single result', async () => {
    const searchService = new MockSearchService();

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'single-result';
    await el.updateComplete;
    await el.initialSearchComplete;

    expect(
      el.shadowRoot?.querySelector('#big-results-label')?.textContent,
    ).to.contains('Result');
  });

  it('`searchContext` prop helps describe where component is being used', async () => {
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser></collection-browser>`,
    );

    expect(el.searchContext).to.equal(analyticsCategories.default);

    el.searchContext = 'unicorn-search';
    await el.updateComplete;

    expect(el.searchContext).to.equal('unicorn-search');

    // property is reflected as attribute
    expect(el.getAttribute('searchcontext')).to.equal('unicorn-search');
  });

  it('respects the initial set of URL parameters for a general search', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.set('sin', 'TXT');
    searchParams.set('sort', 'title');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    await el.initialSearchComplete;
    await el.updateComplete;

    expect(el.baseQuery).to.equal('foo');
    expect(el.searchType).to.equal(SearchType.FULLTEXT);
    expect(el.selectedSort).to.equal(SortField.title);
    expect(el.selectedFacets?.mediatype?.data?.state).to.equal('hidden');
    expect(el.selectedFacets?.subject?.baz?.state).to.equal('selected');
    expect(el.selectedTitleFilter).to.equal('X');
    expect(el.minSelectedDate).to.equal('2000');
    expect(el.maxSelectedDate).to.equal('2010');
  });

  it('respects the initial set of URL parameters within a collection', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.set('sin', 'TXT');
    searchParams.set('sort', 'title');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinCollection=${'foobar'}
      >
      </collection-browser>`,
    );

    await el.initialSearchComplete;
    await el.updateComplete;

    expect(el.withinCollection).to.equal('foobar');
    expect(el.baseQuery).to.equal('foo');
    expect(el.searchType).to.equal(SearchType.FULLTEXT);
    expect(el.selectedSort).to.equal(SortField.title);
    expect(el.selectedFacets?.mediatype?.data?.state).to.equal('hidden');
    expect(el.selectedFacets?.subject?.baz?.state).to.equal('selected');
    expect(el.selectedTitleFilter).to.equal('X');
    expect(el.minSelectedDate).to.equal('2000');
    expect(el.maxSelectedDate).to.equal('2010');
  });

  it('respects the initial set of URL parameters within a profile page', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinProfile=${'@foobar'}
        .profileElement=${'uploads'}
      >
      </collection-browser>`,
    );

    await el.initialSearchComplete;
    await el.updateComplete;

    expect(el.withinProfile).to.equal('@foobar');
    expect(el.profileElement).to.equal('uploads');
    expect(el.baseQuery).to.equal('foo');
    expect(el.searchType).to.equal(SearchType.DEFAULT);
    expect(el.selectedFacets?.mediatype?.data?.state).to.equal('hidden');
    expect(el.selectedFacets?.subject?.baz?.state).to.equal('selected');
    expect(el.selectedTitleFilter).to.equal('X');
    expect(el.minSelectedDate).to.equal('2000');
    expect(el.maxSelectedDate).to.equal('2010');
  });

  it('clears filters except sort when query changes for a general search', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.set('sin', 'TXT');
    searchParams.set('sort', 'title');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    await el.initialSearchComplete;
    await el.updateComplete;

    el.baseQuery = 'bar';
    await el.updateComplete;

    expect(el.baseQuery).to.equal('bar');
    expect(el.searchType).to.equal(SearchType.FULLTEXT);
    expect(el.selectedSort).to.equal(SortField.title);
    expect(el.selectedFacets?.mediatype?.data).not.to.exist;
    expect(el.selectedFacets?.subject?.baz).not.to.exist;
    expect(el.selectedTitleFilter).not.to.exist;
    expect(el.minSelectedDate).not.to.exist;
    expect(el.maxSelectedDate).not.to.exist;
  });

  it('clears filters except sort when query changes within a collection', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.set('sin', 'TXT');
    searchParams.set('sort', 'title');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinCollection=${'foobar'}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'bar';
    await el.updateComplete;

    expect(el.withinCollection).to.equal('foobar');
    expect(el.baseQuery).to.equal('bar');
    expect(el.searchType).to.equal(SearchType.FULLTEXT);
    expect(el.selectedSort).to.equal(SortField.title);
    expect(el.selectedFacets?.mediatype?.data).not.to.exist;
    expect(el.selectedFacets?.subject?.baz).not.to.exist;
    expect(el.selectedTitleFilter).not.to.exist;
    expect(el.minSelectedDate).not.to.exist;
    expect(el.maxSelectedDate).not.to.exist;
  });

  it('clears filters *including* sort when target collection changes', async () => {
    const url = new URL(window.location.href);
    const { searchParams } = url;
    searchParams.set('query', 'foo');
    searchParams.set('sin', 'TXT');
    searchParams.set('sort', 'title');
    searchParams.append('not[]', 'mediatype:"data"');
    searchParams.append('and[]', 'subject:"baz"');
    searchParams.append('and[]', 'firstTitle:X');
    searchParams.append('and[]', 'year:[2000 TO 2010]');
    window.history.replaceState({}, '', url);

    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinCollection=${'foobar'}
      >
      </collection-browser>`,
    );

    el.withinCollection = 'bar';
    await el.updateComplete;

    expect(el.withinCollection).to.equal('bar');
    expect(el.baseQuery).to.equal('foo');
    expect(el.searchType).to.equal(SearchType.FULLTEXT);
    expect(el.selectedSort).to.equal(SortField.default);
    expect(el.selectedFacets?.mediatype?.data).not.to.exist;
    expect(el.selectedFacets?.subject?.baz).not.to.exist;
    expect(el.selectedTitleFilter).not.to.exist;
    expect(el.minSelectedDate).not.to.exist;
    expect(el.maxSelectedDate).not.to.exist;
  });

  it('correctly retrieves web archive hits', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .withinProfile=${'@foo'}
        .profileElement=${'web_archives'}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'web-archive';
    await el.updateComplete;
    await el.initialSearchComplete;
    await nextTick();

    console.log(
      '\n\n*****\n\n*****\n\n',
      el.dataSource.getAllPages(),
      '\n\n*****\n\n*****\n\n',
    );
    expect(el.dataSource.totalResults, 'total results').to.equal(1);
    expect(el.dataSource.getTileModelAt(0)?.title).to.equal(
      'https://example.com',
    );
    expect(
      el.dataSource.getTileModelAt(0)?.captureDates?.length,
      'capture dates',
    ).to.equal(1);
  });

  it('shows dropdown accordion in facet sidebar when opt-in strategy is specified', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        facetLoadStrategy=${'opt-in'}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    const facetsDropdown = el.shadowRoot?.querySelector(
      '.desktop-facets-dropdown',
    );
    expect(facetsDropdown).to.exist;
  });

  it('shows temporarily unavailable message when facets suppressed', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        facetLoadStrategy=${'off'}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    const facetsMsg = el.shadowRoot?.querySelector('.facets-message');
    expect(facetsMsg).to.exist;
    expect(facetsMsg?.textContent?.trim()).to.equal(
      'Facets are temporarily unavailable.',
    );
  });

  it('shows manage bar interface instead of sort bar when in manage view', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('manage-bar')).to.exist;
    expect(el.shadowRoot?.querySelector('sort-filter-bar')).not.to.exist;

    el.isManageView = false;
    await el.updateComplete;

    expect(el.shadowRoot?.querySelector('manage-bar')).not.to.exist;
    expect(el.shadowRoot?.querySelector('sort-filter-bar')).to.exist;
  });

  it('switches to grid display mode when manage view activated', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseQuery=${'foo'}
        .displayMode=${'list-detail'}
      >
      </collection-browser>`,
    );

    el.isManageView = true;
    await el.updateComplete;

    expect(el.displayMode).to.equal('grid');
  });

  it('can remove all checked tiles', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    el.pageSize = 1; // To hit the edge case of a page break while offsetting tiles
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    expect(infiniteScroller).to.exist;

    let tiles =
      infiniteScroller!.shadowRoot?.querySelectorAll('tile-dispatcher');
    expect(tiles).to.exist;
    expect(tiles?.length).to.equal(2);

    const firstTile = tiles![0] as TileDispatcher;
    const firstTileLink = firstTile.shadowRoot?.querySelector(
      'a[href]',
    ) as HTMLAnchorElement;
    expect(firstTile.model?.identifier).to.equal('foo');
    expect(firstTileLink).to.exist;

    // No effect if no tiles checked
    el.removeCheckedTiles();
    await el.updateComplete;
    tiles = infiniteScroller!.shadowRoot?.querySelectorAll('tile-dispatcher');
    expect(tiles).to.exist;
    expect(tiles?.length).to.equal(2);

    // Check the first tile
    firstTileLink!.click();
    expect(firstTile.model?.checked).to.be.true;

    // Remove checked tiles and verify that we only kept the second tile
    el.removeCheckedTiles();
    await el.updateComplete;
    expect(el?.dataSource?.size, 'data source count').to.equal(1);

    tiles = el.shadowRoot
      ?.querySelector('infinite-scroller')!
      .shadowRoot?.querySelectorAll('tile-dispatcher');
    expect(tiles).to.exist;
    expect(
      tiles!.length,
      'tile count after `el.removeCheckedTiles()`',
    ).to.equal(1);
  });

  it('can check/uncheck all tiles', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    expect(el.dataSource.checkedTileModels.length).to.equal(0);
    expect(el.dataSource.uncheckedTileModels.length).to.equal(2);

    el.dataSource.checkAllTiles();
    expect(el.dataSource.checkedTileModels.length).to.equal(2);
    expect(el.dataSource.uncheckedTileModels.length).to.equal(0);

    el.dataSource.uncheckAllTiles();
    expect(el.dataSource.checkedTileModels.length).to.equal(0);
    expect(el.dataSource.uncheckedTileModels.length).to.equal(2);
  });

  it('emits event when manage view state changes', async () => {
    const spy = sinon.spy();
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
        @manageModeChanged=${spy}
      ></collection-browser>`,
    );

    el.isManageView = true;
    await el.updateComplete;

    expect(spy.callCount).to.equal(1);
    expect(spy.args[0][0]?.detail).to.be.true;

    el.isManageView = false;
    await el.updateComplete;

    expect(spy.callCount).to.equal(2);
    expect(spy.args[1][0]?.detail).to.be.false;
  });

  it('emits event when item removal requested', async () => {
    const spy = sinon.spy();
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
        @itemRemovalRequested=${spy}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    expect(infiniteScroller).to.exist;

    const tiles =
      infiniteScroller!.shadowRoot?.querySelectorAll('tile-dispatcher');
    expect(tiles).to.exist.and.have.length(2);

    const firstTile = tiles![0] as TileDispatcher;
    const firstTileLink = firstTile.shadowRoot?.querySelector(
      'a[href]',
    ) as HTMLAnchorElement;
    expect(firstTile.model?.identifier).to.equal('foo');
    expect(firstTileLink).to.exist;

    // Check the first tile
    firstTileLink!.click();
    await el.updateComplete;

    const manageBar = el.shadowRoot?.querySelector('manage-bar');
    expect(manageBar).to.exist;

    // Emit remove event from manage bar
    manageBar!.dispatchEvent(new CustomEvent('removeItems'));

    await el.updateComplete;
    expect(spy.callCount).to.equal(1);
    expect(spy.args[0].length).to.equal(1);
    expect(spy.args[0][0].detail.items[0]).to.equal('foo');
  });

  it('disables manage view when manage bar cancelled', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        .baseNavigationUrl=${''}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    const manageBar = el.shadowRoot?.querySelector('manage-bar');
    expect(manageBar).to.exist;

    // Emit remove event from manage bar
    manageBar!.dispatchEvent(new CustomEvent('cancel'));

    await el.updateComplete;
    expect(el.isManageView).to.be.false;
  });

  it('enable/disable manage view delete button when you selectAll/unselectAll', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    el.baseQuery = 'foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    el.isManageView = true;
    await el.updateComplete;

    const manageBar = el.shadowRoot?.querySelector('manage-bar');
    expect(manageBar).to.exist;

    // disable button exists
    expect(manageBar?.shadowRoot?.querySelector('.danger:disabled')).to.be
      .exist;

    // Emit remove event from manage bar
    manageBar!.dispatchEvent(new CustomEvent('selectAll'));
    await el.updateComplete;

    // disable button does not exists
    expect(manageBar?.shadowRoot?.querySelector('.danger:disabled')).to.be.not
      .exist;

    // Emit remove event from manage bar
    manageBar!.dispatchEvent(new CustomEvent('unselectAll'));
    await el.updateComplete;

    // disable button exists again
    expect(manageBar?.shadowRoot?.querySelector('.danger:disabled')).to.be
      .exist;
  });

  it('shows Blurring checkbox for admin users', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .baseNavigationUrl=${''}
        .searchService=${searchService}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'archive-org-user-loggedin';
    await el.updateComplete;
    await el.initialSearchComplete;

    const blurringCheck = el.shadowRoot?.querySelector(
      '#tile-blur-check',
    ) as HTMLInputElement;
    expect(blurringCheck).to.exist;
    expect(blurringCheck.checked).to.be.true;
  });

  it('unchecks Blurring checkbox for admin users with blurring preference off', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .baseNavigationUrl=${''}
        .searchService=${searchService}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'archive-org-user-loggedin-noblur';
    await el.updateComplete;
    await el.initialSearchComplete;

    const blurringCheck = el.shadowRoot?.querySelector(
      '#tile-blur-check',
    ) as HTMLInputElement;
    expect(blurringCheck).to.exist;
    expect(blurringCheck.checked).to.be.false;
  });

  it('toggles blur state when Blurring checkbox is toggled', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .baseNavigationUrl=${''}
        .searchService=${searchService}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'archive-org-user-loggedin';
    await el.updateComplete;
    await el.initialSearchComplete;

    const blurringCheck = el.shadowRoot?.querySelector(
      '#tile-blur-check',
    ) as HTMLInputElement;
    expect(blurringCheck).to.exist;

    blurringCheck.dispatchEvent(new PointerEvent('click'));
    await el.updateComplete;

    const infiniteScroller = el.shadowRoot?.querySelector(
      'infinite-scroller',
    ) as InfiniteScroller;
    const firstTile = infiniteScroller?.shadowRoot?.querySelector(
      'tile-dispatcher',
    ) as TileDispatcher;
    expect(firstTile.suppressBlurring).to.be.true;
  });

  it('applies loans tab properties to sort bar', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .baseNavigationUrl=${''}
        .searchService=${searchService}
        .enableSortOptionsSlot=${true}
      >
      </collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await aTimeout(10);

    const sortBar = el.shadowRoot?.querySelector(
      'sort-filter-bar',
    ) as SortFilterBar;
    expect(sortBar?.enableSortOptionsSlot, 'show loans in sort bar').to.be.true;
    expect(el.enableSortOptionsSlot, 'collection browser is loans tab').to.be
      .true;

    const loansTabSlot = sortBar.querySelector('slot[name="sort-options"]');
    expect(loansTabSlot).to.exist;
  });

  it('can suppress presence of result count', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        suppressResultCount
      ></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;
    await el.initialSearchComplete;

    const resultCount = el.shadowRoot?.querySelector('#results-total');
    expect(resultCount).not.to.exist;
  });

  it('can suppress presence of result tiles', async () => {
    const searchService = new MockSearchService();
    const el = await fixture<CollectionBrowser>(
      html`<collection-browser
        .searchService=${searchService}
        suppressResultTiles
      ></collection-browser>`,
    );

    el.baseQuery = 'collection:foo';
    await el.updateComplete;

    const infiniteScroller = el.shadowRoot?.querySelector('infinite-scroller');
    expect(infiniteScroller).not.to.exist;
  });

  it('fetch larger result on search page for admin user to manage items', async () => {
    const resultsSpy = sinon.spy();
    const searchService = new MockSearchService({
      asyncResponse: true,
      resultsSpy,
    });

    const el = await fixture<CollectionBrowser>(
      html`<collection-browser .searchService=${searchService}>
      </collection-browser>`,
    );

    const numberOfPages = 15;

    el.baseQuery = 'jack';
    el.isManageView = true;
    await el.dataSource.fetchPage(1, numberOfPages);
    await el.updateComplete;

    const initialResults = el.dataSource.getAllPages();
    expect(Object.keys(initialResults).length).to.deep.equal(numberOfPages);
  });
});
