import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';

import { TileModel } from '../src/models';
import type { ItemImage } from '../src/tiles/item-image';

import '../src/tiles/item-image';
import { MediaType } from '@internetarchive/field-parsers';

const baseImageUrl = 'https://archive.org';
const testBookModel: TileModel = new TileModel({});
testBookModel.checked = false;
testBookModel.collections = [];
testBookModel.commentCount = 0;
testBookModel.creators = [];
testBookModel.favCount = 0;
testBookModel.identifier = '18730130BloomfieldRecordCompleteIssue';
testBookModel.itemCount = 0;
testBookModel.mediatype = 'texts';
testBookModel.subjects = [];
testBookModel.title = 'Sample Waveform';
testBookModel.viewCount = 0;
testBookModel.loginRequired = false;
testBookModel.contentWarning = false;
testBookModel.collectionFilesCount = 0;
testBookModel.collectionSize = 0;

const testAudioModel: TileModel = new TileModel({});
testAudioModel.checked = false;
testAudioModel.collections = [];
testAudioModel.commentCount = 0;
testAudioModel.creators = [];
testAudioModel.favCount = 0;
testAudioModel.identifier = 'dwd2015-01-24';
testAudioModel.itemCount = 0;
testAudioModel.mediatype = 'audio';
testAudioModel.subjects = [];
testAudioModel.title = 'Sample Waveform';
testAudioModel.viewCount = 0;
testAudioModel.loginRequired = false;
testAudioModel.contentWarning = false;
testAudioModel.collectionFilesCount = 0;
testAudioModel.collectionSize = 0;

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

  it('should not fetch image with undefined base url', async () => {
    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${testBookModel}
      >
      </item-image>
    `);

    // Doesn't set the image src if base url is undefined
    const img = el.shadowRoot?.querySelector('img');
    expect(img).to.exist;
    expect(img?.getAttribute('src')).not.to.exist;
  });

  it('should not fetch image with undefined model', async () => {
    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    // Doesn't set the image src if model is not present
    const img = el.shadowRoot?.querySelector('img');
    expect(img).to.exist;
    expect(img?.getAttribute('src')).not.to.exist;
  });

  it('should not fetch image with undefined identifier', async () => {
    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${{}}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    // Doesn't set the image src if identifier is not present
    const img = el.shadowRoot?.querySelector('img');
    expect(img).to.exist;
    expect(img?.getAttribute('src')).not.to.exist;
  });

  it('should blur image if login required flag set', async () => {
    const model = new TileModel({ identifier: 'foo' });
    model.loginRequired = true;

    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${model}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    expect(dropShadow).to.exist;

    const imgClasses = dropShadow?.querySelector('img')?.classList;
    expect(imgClasses?.contains('blur')).to.be.true;
  });

  it('should blur image if content warning flag set', async () => {
    const model = new TileModel({ identifier: 'foo' });
    model.contentWarning = true;

    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${model}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    expect(dropShadow).to.exist;

    const imgClasses = dropShadow?.querySelector('img')?.classList;
    expect(imgClasses?.contains('blur')).to.be.true;
  });

  it('should not blur image if no login required nor content warning', async () => {
    const model = new TileModel({ identifier: 'foo' });

    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${model}
        .baseImageUrl=${baseImageUrl}
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    expect(dropShadow).to.exist;

    const imgClasses = dropShadow?.querySelector('img')?.classList;
    expect(imgClasses?.contains('blur')).to.be.false;
  });

  it('should not blur image if blurring is suppressed, regardless of content flags', async () => {
    const model = new TileModel({ identifier: 'foo' });
    model.loginRequired = true;
    model.contentWarning = true;

    const el = await fixture<ItemImage>(html`
      <item-image
        .isListTile=${false}
        .isCompactTile=${false}
        .model=${model}
        .baseImageUrl=${baseImageUrl}
        suppressBlurring
      >
      </item-image>
    `);

    const dropShadow = el.shadowRoot?.querySelector('.drop-shadow');
    expect(dropShadow).to.exist;

    const imgClasses = dropShadow?.querySelector('img')?.classList;
    expect(imgClasses?.contains('blur')).to.be.false;
  });
});
