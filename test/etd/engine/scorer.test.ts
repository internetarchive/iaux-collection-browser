import { expect } from '@open-wc/testing';
import type { EtdTermEntry } from '../../../src/etd/engine/dictionary';
import type { EtdPosting } from '../../../src/etd/engine/postings';
import { parseQuery } from '../../../src/etd/engine/query-parser';
import {
  BASE_PREFIXES,
  boostSharedFields,
  proximityMultiplier,
  queryTerms,
  rankScores,
  scoreQuery,
} from '../../../src/etd/engine/scorer';
import type { ScoringContext } from '../../../src/etd/engine/scorer';

const N_DOCS = 1000;

/**
 * A scoring context from term -> postings. docFrequency defaults to the
 * list length (an untruncated list); pass `df` to make a list truncated.
 */
function context(
  lists: Record<string, EtdPosting[]>,
  df: Record<string, number> = {},
  posfwd = true,
): ScoringContext {
  const entries = new Map<string, EtdTermEntry>();
  for (const [term, list] of Object.entries(lists)) {
    entries.set(term, {
      offset: 0,
      length: 0,
      docFrequency: df[term] ?? list.length,
    });
  }
  return {
    entries,
    lists: new Map(Object.entries(lists)),
    nDocs: N_DOCS,
    prefixes: BASE_PREFIXES,
    posfwd,
  };
}

const p = (docId: number, impact = 10, positions?: number[]): EtdPosting =>
  positions ? { docId, impact, positions } : { docId, impact };

function score(query: string, ctx: ScoringContext) {
  return scoreQuery(parseQuery(query).tree, ctx);
}

describe('queryTerms', () => {
  it('searches every base field for an unfielded word', () => {
    expect(queryTerms(parseQuery('Ice').tree, BASE_PREFIXES)).to.deep.equal([
      't:ice',
      'c:ice',
      'a:ice',
      'i:ice',
    ]);
  });

  it('searches only the named field for a fielded word', () => {
    expect(
      queryTerms(parseQuery('title:"sea ice"').tree, BASE_PREFIXES),
    ).to.deep.equal(['t:sea', 't:ice']);
  });
});

describe('scoreQuery', () => {
  it('ORs words, summing a document’s matches', () => {
    const { scores } = score(
      'sea ice',
      context({ 't:sea': [p(1), p(2)], 't:ice': [p(2), p(3)] }),
    );
    expect([...scores.keys()].sort()).to.deep.equal([1, 2, 3]);
    expect(scores.get(2)).to.be.greaterThan(scores.get(1)!);
  });

  it('ANDs words, keeping only documents with both', () => {
    const { scores } = score(
      'sea AND ice',
      context({ 't:sea': [p(1), p(2)], 't:ice': [p(2), p(3)] }),
    );
    expect([...scores.keys()]).to.deep.equal([2]);
  });

  it('removes NOT words', () => {
    const { scores } = score(
      'sea NOT ice',
      context({ 't:sea': [p(1), p(2)], 't:ice': [p(2), p(3)] }),
    );
    expect([...scores.keys()]).to.deep.equal([1]);
  });

  it('weights a rare word above a common one', () => {
    const { scores } = score(
      'rare common',
      context({ 't:rare': [p(1)], 't:common': [p(2)] }, { 't:common': 900 }),
    );
    expect(scores.get(1)).to.be.greaterThan(scores.get(2)!);
  });

  it('weights an author match above the same impact in a title', () => {
    const { scores } = score(
      'okafor',
      context({ 't:okafor': [p(1)], 'c:okafor': [p(2)] }),
    );
    expect(scores.get(2)! / scores.get(1)!).to.be.closeTo(2.2, 1e-9);
  });

  it('marks an AND over a truncated list approximate', () => {
    const exact = score(
      'sea AND ice',
      context({ 't:sea': [p(1)], 't:ice': [p(1)] }),
    );
    const truncated = score(
      'sea AND ice',
      context({ 't:sea': [p(1)], 't:ice': [p(1)] }, { 't:ice': 500 }),
    );
    expect(exact.approximate).to.be.false;
    expect(truncated.approximate).to.be.true;
  });

  describe('phrases on a posfwd index', () => {
    it('retrieves documents holding every reliable word', () => {
      const { scores } = score(
        '"sea ice"',
        context({ 't:sea': [p(1), p(2)], 't:ice': [p(2), p(3)] }),
      );
      expect([...scores.keys()]).to.deep.equal([2]);
    });

    it('does not require a word whose list is truncated', () => {
      // "the" is cut at the impact limit; requiring it would drop doc 2,
      // whose "the" posting sits past the cut.
      const { scores } = score(
        '"the ice"',
        context({ 't:the': [p(1)], 't:ice': [p(1), p(2)] }, { 't:the': 800 }),
      );
      expect([...scores.keys()].sort()).to.deep.equal([1, 2]);
    });
  });

  it('degrades a phrase to co-presence on an index without posfwd', () => {
    const { scores } = score(
      '"sea ice"',
      context({ 't:sea': [p(1), p(2)], 't:ice': [p(2), p(3)] }, {}, false),
    );
    expect([...scores.keys()]).to.deep.equal([2]);
  });
});

describe('boostSharedFields', () => {
  const terms = ['t:sea', 'c:sea', 't:ice', 'c:ice'];

  it('boosts documents with every word in one title', () => {
    const scores = new Map([
      [1, 10],
      [2, 10],
    ]);
    boostSharedFields(
      scores,
      terms,
      new Map([
        ['t:sea', [p(1), p(2)]],
        ['t:ice', [p(1)]],
        ['c:ice', [p(2)]],
      ]),
      BASE_PREFIXES,
    );
    expect(scores.get(1)).to.be.closeTo(16, 1e-9);
    expect(scores.get(2)).to.equal(10);
  });

  it('boosts adjacent words more than distant ones', () => {
    const scores = new Map([
      [1, 10],
      [2, 10],
    ]);
    boostSharedFields(
      scores,
      ['a:sea', 'a:ice'],
      new Map([
        ['a:sea', [p(1, 10, [4]), p(2, 10, [4])]],
        ['a:ice', [p(1, 10, [5]), p(2, 10, [90])]],
      ]),
      BASE_PREFIXES,
    );
    expect(scores.get(1)).to.be.greaterThan(scores.get(2)!);
  });

  it('leaves a one-word query alone', () => {
    const scores = new Map([[1, 10]]);
    boostSharedFields(
      scores,
      ['t:ice'],
      new Map([['t:ice', [p(1)]]]),
      BASE_PREFIXES,
    );
    expect(scores.get(1)).to.equal(10);
  });
});

describe('proximityMultiplier', () => {
  it('gives adjacent words the full boost', () => {
    expect(proximityMultiplier([[3], [4]])).to.be.closeTo(1.35, 1e-9);
    expect(proximityMultiplier([[3], [4], [5]])).to.be.closeTo(1.7, 1e-9);
  });

  it('uses the tightest window', () => {
    expect(proximityMultiplier([[1, 40], [41]])).to.be.closeTo(1.35, 1e-9);
  });

  it('fades with distance', () => {
    expect(proximityMultiplier([[0], [100]])).to.be.lessThan(1.01);
  });
});

describe('rankScores', () => {
  it('orders by score, then docId, capped', () => {
    const scores = new Map([
      [5, 1],
      [3, 2],
      [1, 2],
      [9, 0.5],
    ]);
    expect(rankScores(scores)).to.deep.equal([1, 3, 5, 9]);
    expect(rankScores(scores, 2)).to.deep.equal([1, 3]);
  });
});
