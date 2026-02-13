import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { SearchTile } from '../../../src/tiles/grid/search-tile';

import '../../../src/tiles/grid/search-tile';

describe('Search Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<SearchTile>(html`<search-tile></search-tile>`);

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemImage = el.shadowRoot?.querySelector('image-block');
    const title = el.shadowRoot?.querySelector('#title');
    const itemStats = el.shadowRoot?.querySelector('#item-stats');

    expect(itemInfo).to.exist;
    expect(itemImage).to.exist;
    expect(title).to.exist;
    expect(itemStats).not.exist; // search tiles doesn't have stats bar
  });

  it('should render with title element', async () => {
    const el = await fixture<SearchTile>(html`
      <search-tile
        .model=${{
          identifier: 'searched query',
          title: 'searched query',
        }}
      >
      </search-tile>
    `);
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemTitle = el.shadowRoot?.querySelector('#title');

    expect(itemInfo).to.exist;
    expect(itemTitle).to.exist;
    expect(itemTitle?.querySelector('.truncated')?.textContent).to.equal(
      'searched query',
    );
  });

  it('should render with image-block element', async () => {
    const el = await fixture<SearchTile>(html`
      <search-tile
        .model=${{
          identifier: 'title:hello-world',
        }}
      >
      </search-tile>
    `);
    await el.updateComplete;

    const itemImageBlock = el.shadowRoot?.querySelector('image-block');
    expect(itemImageBlock).to.exist;
  });

  it('should not render with item stats element', async () => {
    const el = await fixture<SearchTile>(html`
      <search-tile
        .model=${{
          identifier: '@jack-sparrow',
          itemCount: 14521,
          collectionSize: 23222543,
        }}
      >
      </search-tile>
    `);
    await el.updateComplete;

    const itemStats = el.shadowRoot?.querySelector('#item-stats');
    expect(itemStats).not.exist;
  });
});
