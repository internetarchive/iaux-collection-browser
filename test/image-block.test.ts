/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { ImageBlock } from '../src/tiles/image-block';

import '../src/tiles/image-block';

describe('Image block component', () => {
  it('should render component grid display mode', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loggedInRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'grid'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const viewSize = el.shadowRoot?.querySelector('.grid');
    const itemImage = el.shadowRoot?.querySelector('item-image');
    const textOverlay = el.shadowRoot?.querySelector('text-overlay');

    expect(viewSize).to.exist;
    expect(itemImage).to.exist;
    expect(textOverlay).to.exist;
  });

  it('should render component list display mode', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loggedInRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${true}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const viewSize = el.shadowRoot?.querySelector('.list.desktop');
    const itemImage = el.shadowRoot?.querySelector('item-image');
    const iconOverlay = el.shadowRoot?.querySelector('icon-overlay');

    expect(viewSize).to.exist;
    expect(itemImage).to.exist;
    expect(iconOverlay).to.exist;
  });

  it('should render component compact display mode', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loggedInRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${true}
        .isListTile=${true}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const viewSize = el.shadowRoot?.querySelector('.list-compact.desktop');
    const itemImage = el.shadowRoot?.querySelector('item-image');
    const iconOverlay = el.shadowRoot?.querySelector('icon-overlay');

    expect(viewSize).to.exist;
    expect(itemImage).to.exist;
    expect(iconOverlay).to.exist;
  });
});
