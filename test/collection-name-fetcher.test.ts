import { expect } from '@open-wc/testing';
import { CollectionNameFetcher } from '../src/collection-name-fetcher';
import { MockSearchService } from './mocks/mock-search-service';

describe('CollectionNameFetcher', () => {
  it('queries for all of the pending identifiers', async () => {
    const mockSearchService = new MockSearchService();
    const collectionNameFetcher = new CollectionNameFetcher({
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
  });
});
