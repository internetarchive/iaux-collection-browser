import { expect } from '@open-wc/testing';
import { mediatypeConfig } from '../src/mediatype/mediatype-config';

describe('mediatypeConfig', () => {
  it('returns audio', () => {
    expect(mediatypeConfig.audio).to.exist;
    expect(mediatypeConfig.audio.color).to.exist;
    expect(mediatypeConfig.audio.icon).to.exist;
    expect(mediatypeConfig.audio.text).to.exist;
  });
});
