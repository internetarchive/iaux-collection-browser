import { expect } from '@open-wc/testing';
import { CollectionNameCache } from '../src/collection-name-cache';
import {
  mockSearchResponse,
  mockSearchResponseOnlyFoo,
} from './mocks/mock-search-response';
import { MockSearchService } from './mocks/mock-search-service';

describe('CollectionNameFetcher', () => {
  it('generates proper query for requested identifiers', async () => {
    const mockSearchService = new MockSearchService();
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('bar-collection'),
      collectionNameFetcher.collectionNameFor('baz-collection'),
    ]);

    expect(mockSearchService.searchParams?.query).to.equal(
      'identifier:(foo-collection OR bar-collection OR baz-collection)'
    );
    expect(mockSearchService.searchParams?.rows).to.equal(3);
    expect(mockSearchService.searchParams?.fields).to.deep.equal([
      'title',
      'identifier',
    ]);
    expect(mockSearchService.searchCallCount).to.equal(1);
  });

  it('returns proper names once load is complete', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponse;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    const results = await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('bar-collection'),
      collectionNameFetcher.collectionNameFor('baz-collection'),
    ]);

    expect(results[0]).to.equal('Foo Collection');
    expect(results[1]).to.equal('Bar Collection');
    expect(results[2]).to.equal('Baz Collection');
  });

  it('resolves all of the requests even if a name is missing', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponseOnlyFoo;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    const results = await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('bar-collection'),
      collectionNameFetcher.collectionNameFor('baz-collection'),
    ]);

    expect(results[0]).to.equal('Foo Collection');
    expect(results[1]).to.equal(null);
    expect(results[2]).to.equal(null);
  });

  it('returns the cached name if available', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponse;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('bar-collection'),
      collectionNameFetcher.collectionNameFor('baz-collection'),
    ]);

    // make one more request, but this time there should be no network request
    await collectionNameFetcher.collectionNameFor('foo-collection');

    expect(mockSearchService.searchCallCount).to.equal(1);
  });

  it('returns multiple requests for the same identifier', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponseOnlyFoo;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    const results = await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('foo-collection'),
    ]);

    expect(results[0]).to.equal('Foo Collection');
    expect(results[1]).to.equal('Foo Collection');
    expect(results[2]).to.equal('Foo Collection');
  });

  it('can preload a bunch of identifiers', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponse;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    await collectionNameFetcher.preloadIdentifiers([
      'foo-collection',
      'bar-collection',
      'baz-collection',
    ]);

    // should have loaded here
    expect(mockSearchService.searchCallCount).to.equal(1);

    const results = await Promise.all([
      collectionNameFetcher.collectionNameFor('foo-collection'),
      collectionNameFetcher.collectionNameFor('bar-collection'),
      collectionNameFetcher.collectionNameFor('baz-collection'),
    ]);

    // these should all be cached
    expect(results[0]).to.equal('Foo Collection');
    expect(results[1]).to.equal('Bar Collection');
    expect(results[2]).to.equal('Baz Collection');

    // no additional call should have been made
    expect(mockSearchService.searchCallCount).to.equal(1);
  });

  it('does not make another request when preloading if name is already cached', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponse;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    await collectionNameFetcher.preloadIdentifiers([
      'foo-collection',
      'bar-collection',
      'baz-collection',
    ]);

    // should have loaded here
    expect(mockSearchService.searchCallCount).to.equal(1);

    await collectionNameFetcher.preloadIdentifiers(['foo-collection']);

    // no additional call should have been made
    expect(mockSearchService.searchCallCount).to.equal(1);
  });

  it('preloads identifiers that have not yet been cached', async () => {
    const mockSearchService = new MockSearchService();
    mockSearchService.searchResult = mockSearchResponse;
    const collectionNameFetcher = new CollectionNameCache({
      searchService: mockSearchService,
      loadInterval: 50,
    });

    await collectionNameFetcher.preloadIdentifiers([
      'foo-collection',
      'bar-collection',
      'baz-collection',
    ]);

    // should have loaded here
    expect(mockSearchService.searchCallCount).to.equal(1);

    await collectionNameFetcher.preloadIdentifiers([
      'foo-collection',
      'beep-collection',
    ]);

    expect(mockSearchService.searchParams?.query).to.equal(
      'identifier:(beep-collection)'
    );

    // no additional call should have been made
    expect(mockSearchService.searchCallCount).to.equal(2);
  });
});
