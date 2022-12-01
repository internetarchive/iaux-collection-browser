/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { CollectionTile } from '../../../src/tiles/grid/collection-tile';

import '../../../src/tiles/grid/collection-tile';

describe('Account Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<CollectionTile>(
      html`<collection-tile></collection-tile>`
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
      'Books'
    );
  });

  it('should render with image-block element', async () => {
    const el = await fixture<CollectionTile>(html`
      <collection-tile
        .model=${{
          identifier: '@jack-sparrow',
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
});
