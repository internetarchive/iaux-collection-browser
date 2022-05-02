import { expect } from '@open-wc/testing';
import { mediatypeConfig } from '../src/mediatype/mediatypeConfig';

describe('mediatypeConfig', () => {
  it('returns undefined', () => {
    expect(mediatypeConfig['']).to.equal(undefined);
    expect(mediatypeConfig.test).to.equal(undefined);
    expect(mediatypeConfig.media).to.equal(undefined);
    expect(mediatypeConfig.testing).to.equal(undefined);
  });

  it('returns audio', () => {
    expect(mediatypeConfig.audio).to.exist;
    expect(mediatypeConfig.audio.color).to.exist;
    expect(mediatypeConfig.audio.icon).to.exist;
    expect(mediatypeConfig.audio.text).to.exist;
  });
});
