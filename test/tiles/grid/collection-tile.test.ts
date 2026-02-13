import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { html } from 'lit';
import type { CollectionTile } from '../../../src/tiles/grid/collection-tile';

import '../../../src/tiles/grid/collection-tile';

describe('Collection Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<CollectionTile>(
      html`<collection-tile></collection-tile>`,
    );

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemImage = el.shadowRoot?.querySelector('image-block');
    const itemStats = el.shadowRoot?.querySelector('#item-stats');

    expect(itemInfo).to.exist;
    expect(itemImage).to.exist;
    expect(itemStats).to.exist;
  });

  it('should render with title element', async () => {
    const el = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{
          identifier: 'books',
          title: 'Books',
          itemCount: 121,
        }}
      >
      </collection-tile>
    `);
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemTitle = el.shadowRoot?.querySelector('#title');

    expect(itemInfo).to.exist;
    expect(itemTitle).to.exist;
    expect(itemTitle?.querySelector('.truncated')?.textContent).to.equal(
      'Books',
    );
  });

  it('should render with image-block element', async () => {
    const el = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{
          identifier: '@jack-sparrow',
          itemCount: 1233,
        }}
      >
      </collection-tile>
    `);
    await el.updateComplete;

    const itemImageBlock = el.shadowRoot?.querySelector('image-block');
    expect(itemImageBlock).to.exist;
  });

  it('should render with item stats element', async () => {
    const el = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{
          identifier: '@jack-sparrow',
          itemCount: 14521,
          collectionSize: 23222543,
        }}
      >
      </collection-tile>
    `);
    await el.updateComplete;

    const itemStats = el.shadowRoot?.querySelector('#item-stats');
    const itemMediaType = el.shadowRoot?.querySelector('#item-mediatype');
    const itemCount = el.shadowRoot?.querySelector('#item-count');
    const itemSize = el.shadowRoot?.querySelector('#item-size');

    expect(itemStats).to.exist;
    expect(itemMediaType).to.exist;
    expect(itemCount).to.exist;
    expect(itemSize).to.exist;
  });

  it('should render info button when showInfoButton flag is set', async () => {
    const el = await fixture<CollectionTile>(html`
      <collection-tile ?showInfoButton=${true}> </collection-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector('.info-button');

    expect(infoButton).to.exist;
  });

  it('should dispatch event when info button tapped', async () => {
    const infoButtonSpy = sinon.spy();
    const el = await fixture<CollectionTile>(html`
      <collection-tile
        ?showInfoButton=${true}
        @infoButtonPressed=${infoButtonSpy}
      >
      </collection-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector(
      '.info-button',
    ) as HTMLButtonElement;
    infoButton.click();
    await el.updateComplete;

    expect(infoButtonSpy.callCount).to.equal(1);
  });
});
