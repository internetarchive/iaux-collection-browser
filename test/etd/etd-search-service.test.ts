import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { FilterConstraint } from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import type { CollectionBrowser } from '../../src/collection-browser';
import '../../src/collection-browser';
import { EtdSearchService } from '../../src/etd/etd-search-service';
import { MockEtdEngine, mockEtdTheses } from '../mocks/mock-etd-engine';

// Paging, caching and error handling are covered generically in
// serverless-search-service.test.ts. These cover what is ETD's own.
describe('EtdSearchService', () => {
  let engine: MockEtdEngine;
  let service: EtdSearchService;

  beforeEach(() => {
    engine = new MockEtdEngine(mockEtdTheses(120));
    service = new EtdSearchService({ engine });
  });

  describe('search', () => {
    it('applies date picker and language facet filters in the engine', async () => {
      const result = await service.search({
        query: 'climate',
        rows: 50,
        filters: {
          year: {
            '2000': FilterConstraint.GREATER_OR_EQUAL,
            '2009': FilterConstraint.LESS_OR_EQUAL,
          },
          // The language facet filters by name, as it shows them.
          language: { French: FilterConstraint.EXCLUDE },
        },
        aggregations: { omit: true },
      });

      const { filters } = engine.queryCalls[0];
      expect(filters.year).to.deep.equal({ min: 2000, max: 2009 });
      expect(filters.excludeLanguages).to.include('fr');
      // 2000-2009 is 10 of every 30 theses, and only the even (en) ones: 120 / 30 * 10 / 2
      expect(result.success!.response.totalResults).to.equal(20);
    });

    it('passes query syntax through to the engine untouched', async () => {
      await service.search({ query: '"sea ice" year:[2000 TO 2010]', rows: 0 });
      expect(engine.queryCalls[0].text).to.equal(
        '"sea ice" year:[2000 TO 2010]',
      );
    });

    it('answers the default facets request with language and year facets', async () => {
      const result = await service.search({ query: 'climate', rows: 0 });

      const { aggregations } = result.success!.response;
      expect(Object.keys(aggregations!).sort()).to.deep.equal([
        'language',
        'year_histogram',
      ]);
      // Per year: 1990-2019, 4 theses each.
      expect(aggregations!.year_histogram.first_bucket_key).to.equal(1990);
      expect(aggregations!.year_histogram.buckets).to.deep.equal(
        Array(30).fill(4),
      );
      expect(aggregations!.language.buckets).to.deep.equal([
        { key: 'English', doc_count: 60 },
        { key: 'French', doc_count: 60 },
      ]);
    });

    it('returns no results without ranking when only unsupported filters are set', async () => {
      const result = await service.search({
        query: '  ',
        filters: { subject: { physics: FilterConstraint.INCLUDE } },
      });
      expect(result.success!.response.totalResults).to.equal(0);
      expect(engine.queryCalls).to.deep.equal([]);
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
