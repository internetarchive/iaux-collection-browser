import { expect } from '@open-wc/testing';
import { TileModel } from '../../src/models';
import {
  sourceSearchResponse,
  termBuckets,
  yearHistogram,
} from '../../src/serverless-search/source-response';

describe('sourceSearchResponse', () => {
  it('builds tiles that link to the hit’s own url', () => {
    const response = sourceSearchResponse({
      hits: [
        {
          hit_type: 'item',
          fields: {
            identifier: 'x-1',
            title: 'Somewhere else',
            __href__: 'https://example.org/records/1',
          },
        },
      ],
      total: 1,
    });
    const tile = new TileModel(response.response.results[0]);
    expect(tile.href).to.equal('https://example.org/records/1');
    expect(tile.title).to.equal('Somewhere else');
  });

  it('reports the total separately from the hits returned', () => {
    const response = sourceSearchResponse({
      hits: [{ hit_type: 'item', fields: { identifier: 'x-1' } }],
      total: 1234567,
    });
    expect(response.response.totalResults).to.equal(1234567);
    expect(response.response.returnedCount).to.equal(1);
  });
});

describe('termBuckets', () => {
  const counts = { eng: 12, fre: 5, ger: 5, spa: 0 };

  it('orders by count, ties alphabetically, without empty values', () => {
    expect(termBuckets(counts)).to.deep.equal([
      { key: 'eng', doc_count: 12 },
      { key: 'fre', doc_count: 5 },
      { key: 'ger', doc_count: 5 },
    ]);
  });

  it('caps at the requested size', () => {
    expect(termBuckets(counts, 2)).to.have.length(2);
  });
});

describe('yearHistogram', () => {
  it('fills in empty buckets between the first and last', () => {
    expect(yearHistogram({ '1990': 4, '2010': 9 }, 10)).to.deep.equal({
      buckets: [4, 0, 9],
      first_bucket_key: 1990,
      last_bucket_key: 2010,
      interval: 10,
      number_buckets: 3,
    });
  });

  it('drops keys that are not bucket starts, including unknown years', () => {
    const histogram = yearHistogram({ '0': 3, '1995': 1, '2000': 2 }, 10);
    expect(histogram?.buckets).to.deep.equal([2]);
  });

  it('works for any interval', () => {
    const histogram = yearHistogram({ '2000': 1, '2010': 2 }, 5);
    expect(histogram?.buckets).to.deep.equal([1, 0, 2]);
  });

  it('is undefined with nothing to show', () => {
    expect(yearHistogram({}, 10)).to.be.undefined;
  });
});
