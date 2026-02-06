import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { ImageBlock } from '../src/tiles/image-block';
import type { TextOverlay } from '../src/tiles/overlay/text-overlay';

import '../src/tiles/image-block';

describe('Image block component', () => {
  it('should render component grid display mode', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
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
          loginRequired: true,
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
          loginRequired: true,
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

  it('should render a login-required overlay if model requires it and not logged in', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).to.exist;
    expect(textOverlay.type).to.equal('login-required');
  });

  it('should render no overlay if logged in and model only requires login', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${true}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).not.to.exist;
  });

  it('should render a content-warning overlay if model requires it and no login overlay is present', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).to.exist;
    expect(textOverlay.type).to.equal('content-warning');
  });

  it('should prioritize login-required overlay over content-warning if both required and logged out', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).to.exist;
    expect(textOverlay.type).to.equal('login-required');
  });

  it('should show content-warning overlay if both types required and logged in', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${true}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).to.exist;
    expect(textOverlay.type).to.equal('content-warning');
  });

  it('should render no overlay if neither loginRequired nor contentWarning flag present', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${false}
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).not.to.exist;
  });

  it('should render no overlay if blurring is suppressed', async () => {
    const el = await fixture<ImageBlock>(html`
      <image-block
        .model=${{
          loginRequired: true,
          contentWarning: true,
          identifier: 'goody',
        }}
        .baseImageUrl=${'https://archive.org'}
        .isCompactTile=${false}
        .isListTile=${false}
        .viewSize=${'desktop'}
        .loggedIn=${true}
        suppressBlurring
      >
      </image-block>
    `);

    const textOverlay = el.shadowRoot?.querySelector(
      'text-overlay',
    ) as TextOverlay;
    expect(textOverlay).not.to.exist;
  });
});
