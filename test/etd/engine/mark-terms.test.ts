import { expect } from '@open-wc/testing';
import { markTerms, termsToMark } from '../../../src/etd/engine/mark-terms';

describe('termsToMark', () => {
  it('turns index terms into the words a reader typed, once each', () => {
    // 'sea ice' searched across title, creators, abstract and institution.
    const terms = ['t:sea', 'c:sea', 'a:sea', 'i:sea', 't:ice', 'a:ice'];
    expect(termsToMark(terms)).to.deep.equal(['sea', 'ice']);
  });

  it('keeps ORCID terms prefixed, so an ORCID never marks abstract digits', () => {
    expect(termsToMark(['o:0000', 't:0000'])).to.deep.equal(['o:0000', '0000']);
  });
});

describe('markTerms', () => {
  it('marks every occurrence, keeping the abstract’s own case', () => {
    expect(
      markTerms('Sea ice thickness: the sea ICE record.', ['sea', 'ice']),
    ).to.equal(
      '{{{Sea}}} {{{ice}}} thickness: the {{{sea}}} {{{ICE}}} record.',
    );
  });

  it('marks inside longer words, as the live page does', () => {
    expect(markTerms('A service for icebergs.', ['ice'])).to.equal(
      'A serv{{{ice}}} for {{{ice}}}bergs.',
    );
  });

  it('prefers the longest term, so marks never nest', () => {
    expect(
      markTerms('Glacier and glaciers.', ['glacier', 'glaciers']),
    ).to.equal('{{{Glacier}}} and {{{glaciers}}}.');
  });

  it('skips one-character terms, which would mark half the text', () => {
    expect(markTerms('Vitamin a in a diet.', ['a', 'diet'])).to.equal(
      'Vitamin a in a {{{diet}}}.',
    );
  });

  it('treats query characters literally', () => {
    expect(markTerms('C++ (and c) code.', ['c++'])).to.equal(
      '{{{C++}}} (and c) code.',
    );
  });

  it('leaves text with no matching term as it was', () => {
    expect(markTerms('Merchants crossed in winter.', ['sea'])).to.equal(
      'Merchants crossed in winter.',
    );
    expect(markTerms('Anything.', [])).to.equal('Anything.');
  });
});
