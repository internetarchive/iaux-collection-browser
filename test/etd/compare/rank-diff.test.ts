import { expect } from '@open-wc/testing';
import { diffRankings } from '../../../src/etd/compare/rank-diff';

describe('diffRankings', () => {
  it('reports a faithful port as identical, with full overlap', () => {
    const ranking = [7, 3, 9, 1];
    const diff = diffRankings(ranking, [...ranking], [2, 4]);

    expect(diff.identical).to.be.true;
    expect(diff.overlap).to.deep.equal([
      { depth: 2, shared: 2 },
      { depth: 4, shared: 4 },
    ]);
    expect(diff.moved).to.be.empty;
    expect(diff.onlyOurs).to.be.empty;
    expect(diff.onlyTheirs).to.be.empty;
  });

  it('shows a re-ranked head (the live page phrase boost) as moves, not misses', () => {
    // The live page boosts docs holding the words adjacent: 9 jumps to the top.
    const ours = [3, 7, 9, 1];
    const theirs = [9, 3, 7, 1];
    const diff = diffRankings(ours, theirs, [1, 4]);

    expect(diff.identical).to.be.false;
    expect(diff.overlap).to.deep.equal([
      { depth: 1, shared: 0 },
      { depth: 4, shared: 4 },
    ]);
    expect(diff.moved).to.deep.equal([
      { docId: 3, ours: 1, theirs: 2 },
      { docId: 7, ours: 2, theirs: 3 },
      { docId: 9, ours: 3, theirs: 1 },
    ]);
    expect(diff.onlyOurs).to.be.empty;
    expect(diff.onlyTheirs).to.be.empty;
  });

  it('separates docs only one side ranks, keeping each side order', () => {
    // inst:mit robotics: we match on text aliases, the live page on the
    // institution authority, so each side ranks docs the other doesn't.
    const diff = diffRankings([5, 2, 8], [2, 6, 4]);

    expect(diff.onlyOurs.map(d => d.docId)).to.deep.equal([5, 8]);
    expect(diff.onlyTheirs).to.deep.equal([
      { docId: 6, theirs: 2 },
      { docId: 4, theirs: 3 },
    ]);
    expect(diff.moved).to.deep.equal([{ docId: 2, ours: 2, theirs: 1 }]);
    // Ours first, then the live page's leftovers.
    expect(diff.docs.map(d => d.docId)).to.deep.equal([5, 2, 8, 6, 4]);
  });

  it('only reports overlap depths the rankings reach', () => {
    const diff = diffRankings([1, 2, 3], [1, 2, 3], [2, 10, 50]);

    expect(diff.overlap.map(o => o.depth)).to.deep.equal([2]);
  });

  it('treats two empty rankings (no matches anywhere) as identical', () => {
    const diff = diffRankings([], []);

    expect(diff.identical).to.be.true;
    expect(diff.overlap).to.be.empty;
    expect(diff.docs).to.be.empty;
  });
});
