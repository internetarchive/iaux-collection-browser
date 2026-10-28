import { expect } from '@open-wc/testing';
import { TileModel } from '../../src/models';
import { sourceSearchResponse } from '../../src/serverless-search/source-response';
import type { EtdFacetCounts, EtdRecord } from '../../src/etd/etd-engine';
import {
  etdAggregationsJson,
  etdDocIdFromIdentifier,
  etdHitJson,
  etdIdentifier,
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
  decade: { '1990': 4, '2010': 9, '0': 3 },
  language: { eng: 12, fre: 5, ger: 5 },
  country: { CA: 3 },
  domain: { 'dspace.mit.edu': 3 },
  institution: { MIT: 3 },
};

function tileFor(r: EtdRecord): TileModel {
  const response = sourceSearchResponse({ hits: [etdHitJson(r)], total: 1 });
  return new TileModel(response.response.results[0]);
}

describe('etdHitJson', () => {
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

  it('shows a marked snippet in place of the description', () => {
    const tile = tileFor({
      ...record,
      highlight: 'We measure carbon flux under seasonal {{{sea}}} {{{ice}}}.',
    });
    expect(tile.snippets).to.deep.equal([
      'We measure carbon flux under seasonal {{{sea}}} {{{ice}}}.',
    ]);
    // Otherwise the list view would show the same abstract twice.
    expect(tile.description).to.be.undefined;
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
    expect(tile.snippets).to.deep.equal([]);
  });
});

describe('etdAggregationsJson', () => {
  it('shows decades as the date picker histogram, dropping unknown years', () => {
    const json = etdAggregationsJson(facets, ['year_histogram']);
    expect(json).to.deep.equal({
      year_histogram: {
        buckets: [4, 0, 9],
        first_bucket_key: 1990,
        last_bucket_key: 2010,
        interval: 10,
        number_buckets: 3,
      },
    });
  });

  it('shows languages as facet buckets, capped at the requested size', () => {
    const json = etdAggregationsJson(facets, ['language'], 2);
    expect(json).to.deep.equal({
      language: {
        buckets: [
          { key: 'eng', doc_count: 12 },
          { key: 'fre', doc_count: 5 },
        ],
      },
    });
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
