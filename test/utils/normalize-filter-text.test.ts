import { expect } from '@open-wc/testing';
import {
  filterTextIncludes,
  normalizeFilterText,
} from '../../src/utils/normalize-filter-text';

/** Whether filtering for `filter` would find `text` */
function finds(text: string, filter: string): boolean {
  return filterTextIncludes(
    normalizeFilterText(text),
    normalizeFilterText(filter),
  );
}

describe('normalizeFilterText', () => {
  it('lowercases text', () => {
    expect(normalizeFilterText('Puppies')).to.deep.equal({
      spaced: 'puppies',
      joined: 'puppies',
    });
  });

  it('removes punctuation other than word joiners', () => {
    expect(normalizeFilterText('A.O.R.').spaced).to.equal('aor');
    expect(normalizeFilterText('Dr. Drew').spaced).to.equal('dr drew');
    expect(normalizeFilterText("Children's books").spaced).to.equal(
      'childrens books',
    );
  });

  it('turns word joiners into spaces in one form and removes them in the other', () => {
    expect(normalizeFilterText('WC-TV')).to.deep.equal({
      spaced: 'wc tv',
      joined: 'wctv',
    });
    expect(normalizeFilterText('AC/DC')).to.deep.equal({
      spaced: 'ac dc',
      joined: 'acdc',
    });
    expect(normalizeFilterText('snake_case')).to.deep.equal({
      spaced: 'snake case',
      joined: 'snakecase',
    });
    expect(normalizeFilterText('1950–1960').spaced).to.equal('1950 1960');
  });

  it('removes accents', () => {
    expect(normalizeFilterText('Café Müller').spaced).to.equal('cafe muller');
  });

  it('collapses and trims whitespace', () => {
    expect(normalizeFilterText('  Dogs -- Fiction ')).to.deep.equal({
      spaced: 'dogs fiction',
      joined: 'dogs fiction',
    });
  });

  it('keeps symbols that carry meaning', () => {
    expect(normalizeFilterText('C++').spaced).to.equal('c++');
  });

  it('reduces text that is only punctuation to nothing', () => {
    expect(normalizeFilterText('...')).to.deep.equal({
      spaced: '',
      joined: '',
    });
    expect(normalizeFilterText(' - ').spaced).to.equal('');
  });
});

describe('filterTextIncludes', () => {
  it('matches hyphenated words typed apart or together', () => {
    expect(finds('WC-TV', 'wc tv')).to.be.true;
    expect(finds('WC-TV', 'wctv')).to.be.true;
    expect(finds('WC-TV', 'wc-tv')).to.be.true;
    expect(finds('Human-animal relationships', 'human animal')).to.be.true;
  });

  it('matches regardless of other punctuation', () => {
    expect(finds('A.O.R.', 'aor')).to.be.true;
    expect(finds('Dr. Drew', 'dr drew')).to.be.true;
  });

  it("doesn't match words that are apart in the value but typed together", () => {
    expect(finds('WC TV', 'wctv')).to.be.false;
  });
});
