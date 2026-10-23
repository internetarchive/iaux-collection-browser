import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { FilterConstraint } from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import type { CollectionBrowser } from '../../src/collection-browser';
import '../../src/collection-browser';
import { EtdSearchService } from '../../src/etd/etd-search-service';
import { MockEtdEngine, mockEtdTheses } from '../mocks/mock-etd-engine';

const identifiers = (results: { identifier?: string }[]) =>
  results.map(r => r.identifier);

describe('EtdSearchService', () => {
  let engine: MockEtdEngine;
  let service: EtdSearchService;

  beforeEach(() => {
    engine = new MockEtdEngine(mockEtdTheses(120));
    service = new EtdSearchService({ engine });
  });

  describe('search', () => {
    it('returns the requested page of hits with the full total', async () => {
      const result = await service.search({
        query: 'climate',
        page: 2,
        rows: 10,
        aggregations: { omit: true },
      });

      const response = result.success!.response;
      expect(response.totalResults).to.equal(120);
      expect(identifiers(response.results)).to.deep.equal(
        Array.from({ length: 10 }, (_, i) => `etd-${11 + i}`),
      );
      expect(response.aggregations).to.be.undefined;
    });

    it('applies date picker and language facet filters', async () => {
      const result = await service.search({
        query: 'climate',
        rows: 50,
        filters: {
          year: {
            '2000': FilterConstraint.GREATER_OR_EQUAL,
            '2009': FilterConstraint.LESS_OR_EQUAL,
          },
          language: { fre: FilterConstraint.EXCLUDE },
        },
        aggregations: { omit: true },
      });

      expect(engine.queryCalls[0].filters).to.deep.equal({
        year: { min: 2000, max: 2009 },
        excludeLanguages: ['fre'],
      });
      // 2000-2009 is 10 of every 30 theses, and only the even (eng) ones: 120 / 30 * 10 / 2
      expect(result.success!.response.totalResults).to.equal(20);
    });

    it('ranks a search once for its hits and aggregations requests', async () => {
      const filters = { language: { eng: FilterConstraint.INCLUDE } };
      await Promise.all([
        service.search({
          query: 'climate',
          filters,
          page: 1,
          rows: 50,
          aggregations: { omit: true },
        }),
        service.search({ query: 'climate', filters, rows: 0 }),
        service.search({
          query: 'climate',
          filters,
          page: 2,
          rows: 50,
          aggregations: { omit: true },
        }),
      ]);
      expect(engine.queryCalls).to.have.length(1);
    });

    it('answers the default facets request with language and year facets', async () => {
      const result = await service.search({ query: 'climate', rows: 0 });

      const response = result.success!.response;
      expect(response.results).to.deep.equal([]);
      expect(Object.keys(response.aggregations!).sort()).to.deep.equal([
        'language',
        'year_histogram',
      ]);
      expect(response.aggregations!.year_histogram.buckets).to.deep.equal([
        40, 40, 40,
      ]);
    });

    it('answers a "more" facets request with only that facet', async () => {
      const result = await service.search({
        query: 'climate',
        rows: 0,
        aggregations: { simpleParams: ['language'] },
        aggregationsSize: 1,
      });

      const { aggregations } = result.success!.response;
      expect(Object.keys(aggregations!)).to.deep.equal(['language']);
      expect(aggregations!.language.buckets).to.have.length(1);
    });

    it('returns no letter buckets for the title/creator letter bar', async () => {
      const result = await service.search({
        query: 'climate',
        rows: 0,
        aggregations: { simpleParams: ['firstTitle'] },
        aggregationsSize: 26,
      });
      expect(result.success!.response.aggregations).to.be.undefined;
    });

    it('reports the full total but stops serving at the reachable cap', async () => {
      engine.reachableCap = 75;
      engine.totalOverride = { total: 1200000, approximate: true };

      const page2 = await service.search({
        query: 'climate',
        page: 2,
        rows: 50,
      });
      const page3 = await service.search({
        query: 'climate',
        page: 3,
        rows: 50,
      });

      expect(page2.success!.response.totalResults).to.equal(1200000);
      expect(page2.success!.response.results).to.have.length(25);
      // An empty page is what tells collection-browser it has reached the end
      expect(page3.success!.response.results).to.deep.equal([]);
    });

    it('returns an empty response without ranking when there is nothing to search', async () => {
      const result = await service.search({
        query: '  ',
        filters: { subject: { physics: FilterConstraint.INCLUDE } },
      });
      expect(result.success!.response.totalResults).to.equal(0);
      expect(engine.queryCalls).to.deep.equal([]);
    });

    it('cancels reads for searches that fall out of the cache', async () => {
      service = new EtdSearchService({ engine, cachedQueries: 2 });
      await service.search({ query: 'climate', rows: 0 });
      await service.search({ query: 'thesis', rows: 0 });
      await service.search({ query: 'climate', rows: 0 }); // refreshes 'climate'
      await service.search({ query: 'thesis 1', rows: 0 }); // evicts 'thesis'

      const [climate, thesis, thesis1] = engine.querySignals;
      expect(engine.queryCalls).to.have.length(3);
      expect(climate?.aborted).to.be.false;
      expect(thesis?.aborted).to.be.true;
      expect(thesis1?.aborted).to.be.false;
    });

    it('does not cache a failed search, so a retry ranks again', async () => {
      engine.failNextQuery = new Error('dict.bin HTTP 500');

      const failed = await service.search({ query: 'climate', rows: 10 });
      expect(failed.error?.type).to.equal(
        SearchServiceErrorType.searchEngineError,
      );
      expect(failed.error?.message).to.equal('dict.bin HTTP 500');

      await aTimeout(0); // let the cache drop the failed entry
      const retried = await service.search({ query: 'climate', rows: 10 });
      expect(retried.success!.response.results).to.have.length(10);
      expect(engine.queryCalls).to.have.length(2);
    });

    it('reports a fetch failure as a network error', async () => {
      engine.failNextRead = new TypeError('Failed to fetch');
      const result = await service.search({ query: 'climate', rows: 10 });
      expect(result.error?.type).to.equal(SearchServiceErrorType.networkError);
    });
  });

  describe('itemDetails', () => {
    it('returns the record behind an ETD identifier', async () => {
      const result = await service.itemDetails('etd-7');
      const [hit] = result.success!.response.results;
      expect(hit.identifier).to.equal('etd-7');
      expect(hit.title?.value).to.equal('Thesis 7 on climate');
    });

    it('reports a missing record as not found', async () => {
      const result = await service.itemDetails('etd-9999');
      expect(result.error?.type).to.equal(SearchServiceErrorType.itemNotFound);
    });

    it('reports an archive.org identifier as not found', async () => {
      const result = await service.itemDetails('goody');
      expect(result.error?.type).to.equal(SearchServiceErrorType.itemNotFound);
    });
  });

  describe('in collection-browser', () => {
    it('shows ETD hits as tiles linking to each thesis', async () => {
      const el = await fixture<CollectionBrowser>(
        html`<collection-browser
          .searchService=${service}
          .baseNavigationUrl=${''}
        ></collection-browser>`,
      );

      el.baseQuery = 'climate';
      await el.updateComplete;
      await el.initialSearchComplete;
      await el.updateComplete;
      await aTimeout(50);

      const tile = el.dataSource.getTileModelAt(0);
      expect(tile?.identifier).to.equal('etd-1');
      expect(tile?.title).to.equal('Thesis 1 on climate');
      expect(tile?.href).to.equal('https://dspace.example.edu/handle/1');
      expect(el.dataSource.totalResults).to.equal(120);
    });
  });
});
