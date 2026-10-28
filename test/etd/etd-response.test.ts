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
  year: { '1871': 2, '1990': 4, '1992': 9 },
  language: { en: 12, fr: 3, fre: 2, pt: 5, zz: 1 },
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
  it('shows years from 1900 as the date picker histogram, a bucket a year', () => {
    // 1871 stands for the 1870s, which the index only knows as a decade.
    const json = etdAggregationsJson(facets, ['year_histogram']);
    expect(json).to.deep.equal({
      year_histogram: {
        buckets: [4, 0, 9],
        first_bucket_key: 1990,
        last_bucket_key: 1992,
        interval: 1,
        number_buckets: 3,
      },
    });
  });

  it('shows languages by name, codes sharing a name counted together', () => {
    const json = etdAggregationsJson(facets, ['language']);
    expect(json).to.deep.equal({
      language: {
        buckets: [
          { key: 'English', doc_count: 12 },
          // fr (3) + fre (2): both are French.
          { key: 'French', doc_count: 5 },
          // Not in collection-browser's mapping: named by the browser.
          { key: 'Portuguese', doc_count: 5 },
          // Named by nothing: shown as the code.
          { key: 'zz', doc_count: 1 },
        ],
      },
    });
  });

  it('caps languages at the requested size', () => {
    const json = etdAggregationsJson(facets, ['language'], 2) as {
      language: { buckets: unknown[] };
    };
    expect(json.language.buckets).to.have.length(2);
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
