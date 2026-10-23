import { expect } from '@open-wc/testing';
import type { Aggregation } from '@internetarchive/search-service';
import { TileModel } from '../../src/models';
import type { EtdFacetCounts, EtdRecord } from '../../src/etd/etd-engine';
import {
  etdAggregationsJson,
  etdDocIdFromIdentifier,
  etdIdentifier,
  etdSearchResponse,
} from '../../src/etd/etd-response';

const record: EtdRecord = {
  docId: 4242,
  title: 'Sea ice and the Arctic carbon budget',
  creators: 'Okafor, Ada; Lindqvist, Sven',
  date: '2014-05',
  domain: 'dspace.mit.edu',
  url: 'https://dspace.mit.edu/handle/1721.1/4242',
  snippet: 'We measure carbon flux under seasonal sea ice.',
};

const facets: EtdFacetCounts = {
  decade: { '1990': 4, '2010': 9, '0': 3, '1995': 1 },
  language: { eng: 12, fre: 5, ger: 5, spa: 0 },
  country: { CA: 3 },
  domain: { 'dspace.mit.edu': 3 },
  institution: { MIT: 3 },
};

function tileFor(r: EtdRecord): TileModel {
  const response = etdSearchResponse({ records: [r], total: 1 });
  return new TileModel(response.response.results[0]);
}

describe('etdSearchResponse', () => {
  it('builds a tile that links off archive.org to the thesis landing page', () => {
    const tile = tileFor(record);
    expect(tile.identifier).to.equal('etd-4242');
    expect(tile.href).to.equal('https://dspace.mit.edu/handle/1721.1/4242');
    expect(tile.mediatype).to.equal('texts');
  });

  it('links to the archived copy when one is known', () => {
    const archivedUrl =
      'https://web.archive.org/web/2020/https://dspace.mit.edu/handle/1721.1/4242';
    expect(tileFor({ ...record, archivedUrl }).href).to.equal(archivedUrl);
  });

  it('carries title, each creator, date and abstract onto the tile', () => {
    const tile = tileFor(record);
    expect(tile.title).to.equal('Sea ice and the Arctic carbon budget');
    expect(tile.creators).to.deep.equal(['Okafor, Ada', 'Lindqvist, Sven']);
    expect(tile.creator).to.equal('Okafor, Ada');
    expect(tile.datePublished?.getFullYear()).to.equal(2014);
    expect(tile.description).to.equal(
      'We measure carbon flux under seasonal sea ice.',
    );
  });

  it('leaves out fields a record does not have', () => {
    const tile = tileFor({
      ...record,
      creators: '',
      date: '',
      snippet: undefined,
    });
    expect(tile.creators).to.deep.equal([]);
    expect(tile.datePublished).to.be.undefined;
    expect(tile.description).to.be.undefined;
  });

  it('reports the total separately from the records returned', () => {
    const response = etdSearchResponse({ records: [record], total: 1234567 });
    expect(response.response.totalResults).to.equal(1234567);
    expect(response.response.returnedCount).to.equal(1);
  });
});

describe('etdAggregationsJson', () => {
  function build(size?: number) {
    const response = etdSearchResponse({
      records: [],
      total: 0,
      aggregations: etdAggregationsJson(
        facets,
        ['language', 'year_histogram'],
        size,
      ),
    });
    return response.response.aggregations as Record<string, Aggregation>;
  }

  it('turns decades into a year histogram with empty decades filled in', () => {
    const histogram = build().year_histogram;
    expect(histogram.first_bucket_key).to.equal(1990);
    expect(histogram.last_bucket_key).to.equal(2010);
    expect(histogram.interval).to.equal(10);
    // 1990s, 2000s (none), 2010s; the unknown-year '0' and non-decade '1995' are dropped
    expect(histogram.buckets).to.deep.equal([4, 0, 9]);
  });

  it('lists languages by count, ties alphabetically, without empty ones', () => {
    expect(build().language.buckets).to.deep.equal([
      { key: 'eng', doc_count: 12 },
      { key: 'fre', doc_count: 5 },
      { key: 'ger', doc_count: 5 },
    ]);
  });

  it('caps language buckets at the requested size', () => {
    expect(build(2).language.buckets).to.have.length(2);
  });

  it('only builds the requested aggregations', () => {
    const only = etdAggregationsJson(facets, ['language']);
    expect(Object.keys(only)).to.deep.equal(['language']);
  });
});

describe('ETD identifiers', () => {
  it('round-trip a document id', () => {
    expect(etdDocIdFromIdentifier(etdIdentifier(77))).to.equal(77);
  });

  it('reject identifiers that are not ETD records', () => {
    expect(etdDocIdFromIdentifier('goody')).to.be.undefined;
    expect(etdDocIdFromIdentifier('etd-0')).to.be.undefined;
    expect(etdDocIdFromIdentifier('etd-12abc')).to.be.undefined;
  });
});
