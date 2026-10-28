import { expect } from '@open-wc/testing';
import { EtdIndexFiles } from '../../../src/etd/engine/index-files';
import { EtdPosfwd, phraseInDoc } from '../../../src/etd/engine/posfwd';
import type { PosfwdText } from '../../../src/etd/engine/posfwd';
import { FIXTURE_BASE, buildFixtureIndex } from './fixture-index';

// Shaped like the real index's entries (doc 12204808, 2026-10-26 build).
const deformation: PosfwdText = {
  t: 'sea ice deformation and sea ice thickness change',
  c: 'von albedyll luisa ; luisa von albedyll',
  a: 'the arctic ocean is undergoing a major transition',
  i: 'university of bremen',
};

describe('phraseInDoc', () => {
  it('finds the words side by side, in order, in a field', () => {
    expect(phraseInDoc(deformation, ['sea', 'ice'])).to.be.true;
    expect(phraseInDoc(deformation, ['arctic', 'ocean'])).to.be.true;
  });

  it('does not count words that are only both present, or out of order', () => {
    expect(phraseInDoc(deformation, ['sea', 'thickness'])).to.be.false;
    expect(phraseInDoc(deformation, ['ice', 'sea'])).to.be.false;
  });

  it('matches whole tokens, not parts of words', () => {
    expect(phraseInDoc({ t: 'seasonal ice' }, ['sea', 'ice'])).to.be.false;
  });

  it('checks only the given field when there is one', () => {
    expect(phraseInDoc(deformation, ['arctic', 'ocean'], 't:')).to.be.false;
    expect(phraseInDoc(deformation, ['sea', 'ice'], 't:')).to.be.true;
    expect(phraseInDoc(deformation, ['of', 'bremen'], 'i:')).to.be.true;
  });

  it('matches an author name in either order, with middle names between', () => {
    const feynman = { c: 'feynman carl richard ; carl richard feynman' };
    expect(phraseInDoc(feynman, ['carl', 'feynman'], 'c:')).to.be.true;
    expect(phraseInDoc(feynman, ['feynman', 'carl'], 'c:')).to.be.true;
    expect(phraseInDoc({ c: 'feynman carl richard' }, ['carl', 'feynman'])).to
      .be.true;
  });

  it('never matches a name across two co-authors', () => {
    const coauthors = { c: 'carl sagan ; richard feynman' };
    expect(phraseInDoc(coauthors, ['carl', 'feynman'], 'c:')).to.be.false;
  });

  it('needs two words and some text', () => {
    expect(phraseInDoc(deformation, ['sea'])).to.be.false;
    expect(phraseInDoc(null, ['sea', 'ice'])).to.be.false;
    expect(phraseInDoc(undefined, ['sea', 'ice'])).to.be.false;
  });
});

describe('EtdPosfwd', () => {
  const theses = [
    { title: 'Sea ice drift', creators: 'Okafor, Ada; Lindqvist, Sven' },
    { title: '' },
  ];

  async function open(options?: { posfwd?: boolean }) {
    const index = await buildFixtureIndex(theses, options);
    const files = await EtdIndexFiles.open(FIXTURE_BASE, {
      fetch: index.fetch,
    });
    return { index, posfwd: await EtdPosfwd.load(files) };
  }

  it('reads each doc’s token text, and nothing for a doc without any', async () => {
    const { posfwd } = await open();
    await posfwd!.read([1, 2]);
    expect(posfwd!.get(1)).to.deep.equal({
      t: 'sea ice drift',
      c: 'okafor ada ; lindqvist sven',
    });
    expect(posfwd!.get(2)).to.be.null;
  });

  it('reads a doc once, then serves it from the cache', async () => {
    const { index, posfwd } = await open();
    await posfwd!.read([1]);
    const before = index.requests.length;
    await posfwd!.read([1]);
    expect(index.requests.length).to.equal(before);
  });

  it('is absent when the index has no posfwd', async () => {
    const { posfwd } = await open({ posfwd: false });
    expect(posfwd).to.be.undefined;
  });
});
