import { expect } from '@open-wc/testing';
import {
  BOOST_HEAD,
  boostTokens,
  phraseBoost,
  wordsPlacement,
} from '../../../src/etd/engine/phrase-boost';
import type { PosfwdText } from '../../../src/etd/engine/posfwd';

/** A posfwd reader over fixed texts; `delayMs` holds every read back. */
function posfwdOf(texts: Record<number, PosfwdText>, delayMs = 0) {
  const cache = new Map<number, PosfwdText | null>();
  return {
    reads: 0,
    async read(docIds: readonly number[]) {
      this.reads += 1;
      if (delayMs) await new Promise(r => setTimeout(r, delayMs));
      for (const d of docIds) cache.set(d, texts[d] ?? null);
    },
    get: (docId: number) => cache.get(docId),
  };
}

describe('boostTokens', () => {
  it('boosts a plain query of two to six words', () => {
    expect(boostTokens('sea ice', false)).to.deep.equal(['sea', 'ice']);
    expect(boostTokens('Sea  Ice thickness', false)).to.deep.equal([
      'sea',
      'ice',
      'thickness',
    ]);
    expect(boostTokens('a b c d e f', false)).to.have.length(6);
  });

  it('leaves one word, or more than six, alone', () => {
    expect(boostTokens('glacier', false)).to.be.undefined;
    expect(boostTokens('a b c d e f g', false)).to.be.undefined;
  });

  it('leaves queries with their own syntax alone', () => {
    for (const query of [
      '"sea ice"',
      'title:sea ice',
      '(sea ice)',
      'sea AND ice',
      'sea OR ice',
      'sea NOT ice',
    ]) {
      expect(boostTokens(query, false), query).to.be.undefined;
    }
    expect(boostTokens('sea ice', true)).to.be.undefined;
  });

  it('only counts upper-case operators, like the parser', () => {
    expect(boostTokens('sea and ice', false)).to.deep.equal([
      'sea',
      'and',
      'ice',
    ]);
  });
});

describe('wordsPlacement', () => {
  const words = ['sea', 'ice'];

  it('names the field holding the words side by side, title first', () => {
    expect(
      wordsPlacement({ t: 'arctic sea ice', a: 'sea ice' }, words),
    ).to.equal('title');
    expect(wordsPlacement({ t: 'carbon', a: 'under sea ice' }, words)).to.equal(
      'abstract',
    );
    expect(wordsPlacement({ c: 'ice sea mara' }, words)).to.equal('creators');
  });

  it('says apart when no field has them side by side', () => {
    expect(wordsPlacement({ t: 'sea level and ice' }, words)).to.equal('apart');
  });

  it('knows nothing about a doc whose text it does not have', () => {
    expect(wordsPlacement(undefined, words)).to.be.undefined;
    expect(wordsPlacement(null, words)).to.be.undefined;
  });
});

describe('phraseBoost', () => {
  const texts: Record<number, PosfwdText> = {
    1: { t: 'sea level and ice', a: 'ice on the sea' }, // only both present
    2: { t: 'carbon budget', a: 'under seasonal sea ice' }, // adjacent: abstract
    3: { t: 'arctic sea ice' }, // adjacent: title
    4: { t: 'ice ages', c: 'sea mara' }, // only both present
    5: { a: 'sea ice extent' }, // adjacent: abstract
  };

  it('puts title matches first, then other fields, keeping rank order in each', async () => {
    const boosted = await phraseBoost(
      [1, 2, 3, 4, 5],
      ['sea', 'ice'],
      posfwdOf(texts),
    );
    expect(boosted).to.deep.equal([3, 2, 5, 1, 4]);
  });

  it('leaves the order alone when no doc has the words together', async () => {
    const ranked = [1, 4];
    expect(
      await phraseBoost(ranked, ['sea', 'ice'], posfwdOf(texts)),
    ).to.deep.equal([1, 4]);
  });

  it('only re-orders the head; the rest keep their place', async () => {
    const ranked = Array.from({ length: BOOST_HEAD + 2 }, (_, i) => 1000 + i);
    const adjacent = { t: 'sea ice' };
    const posfwd = posfwdOf({
      [ranked[5]]: adjacent,
      [ranked[BOOST_HEAD + 1]]: adjacent, // past the head: not moved
    });
    const boosted = await phraseBoost(ranked, ['sea', 'ice'], posfwd);
    expect(boosted[0]).to.equal(ranked[5]);
    expect(boosted.slice(BOOST_HEAD)).to.deep.equal(ranked.slice(BOOST_HEAD));
    expect([...boosted].sort()).to.deep.equal([...ranked].sort());
  });

  it('keeps the plain order when posfwd is slower than the budget', async () => {
    const boosted = await phraseBoost(
      [1, 2, 3],
      ['sea', 'ice'],
      posfwdOf(texts, 200),
      { budgetMs: 20 },
    );
    expect(boosted).to.deep.equal([1, 2, 3]);
  });

  it('keeps the plain order when posfwd cannot be read', async () => {
    const failing = {
      read: async () => {
        throw new Error('HTTP 500');
      },
      get: () => undefined,
    };
    expect(await phraseBoost([1, 2, 3], ['sea', 'ice'], failing)).to.deep.equal(
      [1, 2, 3],
    );
  });

  it('gives up with the search when it is aborted', async () => {
    const controller = new AbortController();
    controller.abort();
    const aborted = {
      read: async () => {
        throw new DOMException('aborted', 'AbortError');
      },
      get: () => undefined,
    };
    let error: unknown;
    try {
      await phraseBoost([1, 2], ['sea', 'ice'], aborted, {
        signal: controller.signal,
      });
    } catch (err) {
      error = err;
    }
    expect((error as Error)?.name).to.equal('AbortError');
  });
});
