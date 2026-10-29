import { aTimeout, expect } from '@open-wc/testing';
import { FilterConstraint } from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import { ServerlessSearchService } from '../../src/serverless-search/serverless-search-service';
import { TileModel } from '../../src/models';
import { MockSearchSource, mockBooks } from '../mocks/mock-search-source';
import type { MockBook, MockBookRequest } from '../mocks/mock-search-source';

const identifiers = (results: { identifier?: string }[]) =>
  results.map(r => r.identifier);

describe('ServerlessSearchService', () => {
  let source: MockSearchSource;
  let service: ServerlessSearchService<MockBookRequest, MockBook>;

  beforeEach(() => {
    source = new MockSearchSource(mockBooks(120));
    service = new ServerlessSearchService(source);
  });

  describe('search', () => {
    it('returns the requested page of hits with the full total', async () => {
      const result = await service.search({
        query: 'rivers',
        page: 2,
        rows: 10,
        aggregations: { omit: true },
      });

      const response = result.success!.response;
      expect(response.totalResults).to.equal(120);
      expect(identifiers(response.results)).to.deep.equal(
        Array.from({ length: 10 }, (_, i) => `book-${11 + i}`),
      );
      expect(response.aggregations).to.be.undefined;
    });

    it("builds tiles from the source's hits, linking where the source says", async () => {
      const result = await service.search({ query: 'rivers', rows: 1 });
      const tile = new TileModel(result.success!.response.results[0]);
      expect(tile.identifier).to.equal('book-1');
      expect(tile.title).to.equal('Book 1 about rivers');
      expect(tile.href).to.equal('https://books.example.org/1');
    });

    it('passes the params to the source to turn into its own request', async () => {
      await service.search({
        query: ' rivers ',
        rows: 10,
        filters: { year: { '2000': FilterConstraint.GREATER_OR_EQUAL } },
      });
      expect(source.queryCalls).to.deep.equal([
        { text: 'rivers', year: { min: 2000 } },
      ]);
    });

    it('queries once for all the hits and aggregations requests of one search', async () => {
      await Promise.all([
        service.search({
          query: 'rivers',
          page: 1,
          rows: 50,
          aggregations: { omit: true },
        }),
        service.search({ query: 'rivers', rows: 0 }),
        service.search({
          query: 'rivers',
          page: 2,
          rows: 50,
          aggregations: { omit: true },
        }),
      ]);
      expect(source.queryCalls).to.have.length(1);
    });

    it('answers the default aggregations request with every aggregation the source has', async () => {
      const result = await service.search({ query: 'rivers', rows: 0 });

      const response = result.success!.response;
      expect(response.results).to.deep.equal([]);
      expect(Object.keys(response.aggregations!).sort()).to.deep.equal([
        'subject',
        'year_histogram',
      ]);
    });

    it('answers a "more" facets request with only that facet, capped at its size', async () => {
      const result = await service.search({
        query: 'rivers',
        rows: 0,
        aggregations: { simpleParams: ['subject'] },
        aggregationsSize: 1,
      });

      const { aggregations } = result.success!.response;
      expect(Object.keys(aggregations!)).to.deep.equal(['subject']);
      expect(aggregations!.subject.buckets).to.have.length(1);
    });

    it('returns no aggregations for keys the source does not have', async () => {
      // e.g. the title/creator letter bar's firstTitle request
      const result = await service.search({
        query: 'rivers',
        rows: 0,
        aggregations: { simpleParams: ['firstTitle'] },
        aggregationsSize: 26,
      });
      expect(result.success!.response.aggregations).to.be.undefined;
    });

    it('reports the full total but stops serving at the reachable cap', async () => {
      source.reachableCap = 75;
      source.totalOverride = 1200000;

      const page2 = await service.search({
        query: 'rivers',
        page: 2,
        rows: 50,
      });
      const page3 = await service.search({
        query: 'rivers',
        page: 3,
        rows: 50,
      });

      expect(page2.success!.response.totalResults).to.equal(1200000);
      expect(page2.success!.response.results).to.have.length(25);
      // An empty page is what tells collection-browser it has reached the end
      expect(page3.success!.response.results).to.deep.equal([]);
    });

    it('returns no results without querying when the source has nothing to search', async () => {
      const result = await service.search({ query: '  ' });
      expect(result.success!.response.totalResults).to.equal(0);
      expect(source.queryCalls).to.deep.equal([]);
    });

    it('cancels reads for queries that fall out of the cache', async () => {
      service = new ServerlessSearchService(source, { cachedQueries: 2 });
      await service.search({ query: 'rivers', rows: 0 });
      await service.search({ query: 'book', rows: 0 });
      await service.search({ query: 'rivers', rows: 0 }); // refreshes 'rivers'
      await service.search({ query: 'book 1', rows: 0 }); // evicts 'book'

      const [rivers, book, book1] = source.querySignals;
      expect(source.queryCalls).to.have.length(3);
      expect(rivers?.aborted).to.be.false;
      expect(book?.aborted).to.be.true;
      expect(book1?.aborted).to.be.false;
    });

    it('does not cache a failed query, so a retry queries again', async () => {
      source.failNextQuery = new Error('dict.bin HTTP 500');

      const failed = await service.search({ query: 'rivers', rows: 10 });
      expect(failed.error?.type).to.equal(
        SearchServiceErrorType.searchEngineError,
      );
      expect(failed.error?.message).to.equal('dict.bin HTTP 500');

      await aTimeout(0); // let the cache drop the failed entry
      const retried = await service.search({ query: 'rivers', rows: 10 });
      expect(retried.success!.response.results).to.have.length(10);
      expect(source.queryCalls).to.have.length(2);
    });

    it('reports a fetch failure as a network error', async () => {
      source.failNextRead = new TypeError('Failed to fetch');
      const result = await service.search({ query: 'rivers', rows: 10 });
      expect(result.error?.type).to.equal(SearchServiceErrorType.networkError);
    });

    it('reports a server failing (5xx) as a network error, not the query', async () => {
      source.failNextRead = Object.assign(new Error('cells.bin: HTTP 502'), {
        status: 502,
      });
      const result = await service.search({ query: 'rivers', rows: 10 });
      expect(result.error?.type).to.equal(SearchServiceErrorType.networkError);
      expect(result.error?.message).to.equal('cells.bin: HTTP 502');
    });

    it("reports a missing file (4xx) as the search engine's error", async () => {
      source.failNextRead = Object.assign(new Error('dict.bin: HTTP 404'), {
        status: 404,
      });
      const result = await service.search({ query: 'rivers', rows: 10 });
      expect(result.error?.type).to.equal(
        SearchServiceErrorType.searchEngineError,
      );
    });
  });

  describe('refined results', () => {
    const hitsOf = async (query: string) =>
      identifiers(
        (await service.search({ query, rows: 3, aggregations: { omit: true } }))
          .success!.response.results,
      );

    it('serves the better answer once it comes, and says the results changed', async () => {
      let refine!: (books: MockBook[]) => void;
      source.refineNext = new Promise(resolve => {
        refine = resolve;
      });
      let changed = 0;
      service.onResultsChanged(() => {
        changed += 1;
      });

      expect(await hitsOf('rivers')).to.deep.equal([
        'book-1',
        'book-2',
        'book-3',
      ]);
      refine(mockBooks(120).reverse());
      await aTimeout(0);

      expect(changed).to.equal(1);
      expect(await hitsOf('rivers')).to.deep.equal([
        'book-120',
        'book-119',
        'book-118',
      ]);
      // Still one query: the better answer replaced the first, unasked.
      expect(source.queryCalls).to.have.length(1);
    });

    it('says nothing about a search that is no longer the latest', async () => {
      let refine!: (books: MockBook[]) => void;
      source.refineNext = new Promise(resolve => {
        refine = resolve;
      });
      let changed = 0;
      service.onResultsChanged(() => {
        changed += 1;
      });
      await hitsOf('rivers');
      await hitsOf('book'); // a newer search

      refine(mockBooks(120).reverse());
      await aTimeout(0);

      expect(changed).to.equal(0);
      // Its results are still the better ones, should it be searched again.
      expect(await hitsOf('rivers')).to.deep.equal([
        'book-120',
        'book-119',
        'book-118',
      ]);
    });

    it('keeps the first answer when refining fails', async () => {
      source.refineNext = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('cells.bin: HTTP 502')));
      });
      let changed = 0;
      service.onResultsChanged(() => {
        changed += 1;
      });
      await hitsOf('rivers');
      await aTimeout(10);

      expect(changed).to.equal(0);
      expect(await hitsOf('rivers')).to.deep.equal([
        'book-1',
        'book-2',
        'book-3',
      ]);
    });

    it('stops telling a listener that stopped listening', async () => {
      let refine!: (books: MockBook[]) => void;
      source.refineNext = new Promise(resolve => {
        refine = resolve;
      });
      let changed = 0;
      const stop = service.onResultsChanged(() => {
        changed += 1;
      });
      await hitsOf('rivers');
      stop();
      refine(mockBooks(3));
      await aTimeout(0);
      expect(changed).to.equal(0);
    });
  });

  describe('itemDetails', () => {
    it('returns the record behind an identifier as a single hit', async () => {
      const result = await service.itemDetails('book-7');
      expect(identifiers(result.success!.response.results)).to.deep.equal([
        'book-7',
      ]);
    });

    it('reports an unknown identifier as not found', async () => {
      const result = await service.itemDetails('book-9999');
      expect(result.error?.type).to.equal(SearchServiceErrorType.itemNotFound);
    });
  });

  describe('declaring its facets to collection-browser', () => {
    // A books source: `subject` is one of collection-browser's own groups,
    // `shelf` and `format` aren't.
    function serviceWith(
      facets: MockSearchSource['facets'],
      listsWithoutQuery?: boolean,
    ) {
      const books = new MockSearchSource(mockBooks(3));
      books.facets = facets;
      books.listsWithoutQuery = listsWithoutQuery;
      return new ServerlessSearchService(books);
    }

    it('offers the facets collection-browser lacks as extra groups', () => {
      const declared = serviceWith([
        { key: 'subject', title: 'Subject', pluralTitle: 'Subjects' },
        {
          key: 'shelf',
          title: 'Shelf',
          pluralTitle: 'Shelves',
          after: 'subject',
        },
      ]);
      expect(declared.extraFacetGroups).to.deep.equal([
        {
          key: 'shelf',
          title: 'Shelf',
          pluralTitle: 'Shelves',
          sort: undefined,
          after: 'subject',
        },
      ]);
    });

    it('marks a facet whose picked values must all match', () => {
      const declared = serviceWith([
        {
          key: 'format',
          title: 'Format',
          pluralTitle: 'Formats',
          combine: 'all',
        },
      ]);
      expect(declared.extraFacetGroups[0].title).to.equal(
        'Format (all that apply)',
      );
    });

    it('gives the same groups every time, so a re-render changes nothing', () => {
      const declared = serviceWith([
        { key: 'shelf', title: 'Shelf', pluralTitle: 'Shelves' },
      ]);
      expect(declared.extraFacetGroups).to.equal(declared.extraFacetGroups);
    });

    it('allows filter-only search only for a source that can list without a query', () => {
      expect(serviceWith([], true).allowFilterOnlySearch).to.be.true;
      expect(serviceWith([]).allowFilterOnlySearch).to.be.false;
      expect(service.extraFacetGroups).to.deep.equal([]);
    });
  });
});
