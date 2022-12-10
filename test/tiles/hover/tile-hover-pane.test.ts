import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileHoverPane } from '../../../src/tiles/hover/tile-hover-pane';

import '../../../src/tiles/hover/tile-hover-pane';

describe('Tile Hover Pane', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileHoverPane>(
      html`<tile-hover-pane></tile-hover-pane>`
    );

    const container = el.shadowRoot?.querySelector('#container');
    const listView = el.shadowRoot?.querySelector('tile-list');

    expect(container).to.exist;
    expect(listView).to.exist;
  });
});
