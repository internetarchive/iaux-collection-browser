import { expect } from '@open-wc/testing';
import { sampleOf } from '../../../src/etd/engine/sample';

describe('sampleOf', () => {
  it('keeps every item, in order, when there are no more than asked', () => {
    expect(sampleOf([5, 3, 9], 3)).to.deep.equal({ picked: [5, 3, 9], of: 3 });
    expect(sampleOf([], 3)).to.deep.equal({ picked: [], of: 0 });
  });

  it('counts every item, even ones it leaves out', () => {
    const { picked, of } = sampleOf(new Set([1, 2, 3, 4, 5, 6]).keys(), 2);
    expect(of).to.equal(6);
    expect(picked).to.have.length(2);
  });

  it('reads a generator once, as the filter-only listing hands it one', () => {
    let reads = 0;
    function* docIds() {
      for (let id = 1; id <= 100; id += 1) {
        reads += 1;
        yield id;
      }
    }
    expect(sampleOf(docIds(), 10).of).to.equal(100);
    expect(reads).to.equal(100);
  });

  it('gives each item the same chance, not just the first ones', () => {
    // A query's matches arrive best-ranked first; the sample must not lean
    // toward them. 10 items, 3 picked, 6,000 runs: each expects 1,800.
    const picks = new Array(10).fill(0);
    for (let run = 0; run < 6000; run += 1) {
      for (const item of sampleOf([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 3).picked) {
        picks[item] += 1;
      }
    }
    for (const count of picks) expect(count).to.be.within(1600, 2000);
  });

  it('picks from the given random numbers', () => {
    // Always 0: each later item replaces the first slot.
    expect(sampleOf([1, 2, 3, 4], 2, () => 0).picked).to.deep.equal([4, 2]);
    // Always just under 1: no later item gets in.
    expect(sampleOf([1, 2, 3, 4], 2, () => 0.999).picked).to.deep.equal([1, 2]);
  });
});
