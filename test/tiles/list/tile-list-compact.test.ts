/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileListCompact } from '../../../src/tiles/list/tile-list-compact';

import '../../../src/tiles/list/tile-list-compact';

describe('List Tile Compact', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileListCompact>(
      html`<tile-list-compact></tile-list-compact>`
    );

    const listContainer = el.shadowRoot?.querySelector('#list-line');
    const itemTitle = el.shadowRoot?.querySelector('#title');
    const imageBlock = el.shadowRoot?.querySelector('image-block');
    const itemIcon = el.shadowRoot?.querySelector('#icon');
    const itemViews = el.shadowRoot?.querySelector('#views');

    expect(listContainer).to.exist;
    expect(itemTitle).to.exist;
    expect(imageBlock).to.exist;
    expect(itemIcon).to.exist;
    expect(itemViews).to.exist;
  });

  it('should render with creator element with title', async () => {
    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${{ creators: ['someone'] }}
      ></tile-list-compact>
    `);

    const creator = el.shadowRoot?.querySelector('#creator');

    expect(creator).to.exist;
  });
});
