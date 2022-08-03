/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import { TileModel } from '../src/models';
import { ItemImage } from '../src/tiles/item-image';

import '../src/tiles/item-image';

const baseImageUrl = 'https://archive.org';
const testBookModel: TileModel = {
  collections: [],
  commentCount: 0,
  creators: [],
  favCount: 0,
  identifier: '18730130BloomfieldRecordCompleteIssue',
  itemCount: 0,
  mediatype: 'texts',
  subjects: [],
  title: 'Sample Waveform',
  viewCount: 0,
  loginRequired: false,
  contentWarning: false,
};

const testAudioModel: TileModel = {
  collections: [],
  commentCount: 0,
  creators: [],
  favCount: 0,
  identifier: 'dwd2015-01-24',
  itemCount: 0,
  mediatype: 'audio',
  subjects: [],
  title: 'Sample Waveform',
  viewCount: 0,
  loginRequired: false,
  contentWarning: false,
};

describe('ItemImage component', () => {
  it('should render initial component', async () => {
    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${testBookModel}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    const imgClassName = dropShadow?.querySelector('img')?.className;

    expect(dropShadow).to.exist;
    expect(imgClassName).to.eql(' contain ');
  });

  it('should render component if mediatype is waveform', async () => {
    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${testAudioModel}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    const image = dropShadow?.querySelector('img');
    expect(dropShadow).to.exist;
    expect(image).to.exist;

    // simulate image onLoad event check if image className is waveform
    setTimeout(() => {
      const imgClassName = image?.className;
      expect(imgClassName).to.eql(' waveform ');
    }, 1000);
  });
});
