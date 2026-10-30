import { expect } from '@open-wc/testing';
import { languageCodes, languageName } from '../../src/etd/etd-languages';
import { codeToLanguageMap } from '../../src/language-code-handler/language-code-mapping';

describe('ETD language names', () => {
  it('names codes from collection-browser’s mapping first, then the browser', () => {
    expect(languageName('en')).to.equal('English'); // shared mapping
    expect(languageName('pt')).to.equal('Portuguese'); // browser
    expect(languageName('zz')).to.equal('zz'); // nothing names it
  });

  it('names ng as Ndonga, not English as the shared mapping does', () => {
    expect(languageName('ng')).to.equal('Ndonga');
    // The shared mapping, which archive.org's facet uses, is left alone.
    expect(codeToLanguageMap.ng).to.equal('English');
  });

  it('filters English without Ndonga, and Ndonga by its own name', () => {
    expect(languageCodes('English')).to.include('en');
    expect(languageCodes('English')).to.not.include('ng');
    expect(languageCodes('Ndonga')).to.deep.equal(['ng']);
  });

  it('takes a value that is no known name as a code', () => {
    expect(languageCodes('zz')).to.deep.equal(['zz']);
  });
});
