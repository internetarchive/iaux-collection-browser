import { expect } from '@open-wc/testing';
import { normalizeFilterText } from '../../src/utils/normalize-filter-text';

describe('normalizeFilterText', () => {
  it('lowercases text', () => {
    expect(normalizeFilterText('Puppies')).to.equal('puppies');
  });

  it('removes punctuation', () => {
    expect(normalizeFilterText('A.O.R.')).to.equal('aor');
    expect(normalizeFilterText('Dr. Drew')).to.equal('dr drew');
    expect(normalizeFilterText("Children's books")).to.equal('childrens books');
  });

  it('removes accents', () => {
    expect(normalizeFilterText('Café Müller')).to.equal('cafe muller');
  });

  it('collapses and trims whitespace', () => {
    expect(normalizeFilterText('  Dogs -- Fiction ')).to.equal('dogs fiction');
  });

  it('keeps symbols that carry meaning', () => {
    expect(normalizeFilterText('C++')).to.equal('c++');
  });

  it('reduces text that is only punctuation to nothing', () => {
    expect(normalizeFilterText('...')).to.equal('');
  });
});
