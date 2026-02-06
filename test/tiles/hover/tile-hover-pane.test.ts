import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import { html } from 'lit';
import type { TileModel } from '../../../src/models';
import type { TileHoverPane } from '../../../src/tiles/hover/tile-hover-pane';

import '../../../src/tiles/hover/tile-hover-pane';

describe('Tile Hover Pane', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileHoverPane>(
      html`<tile-hover-pane></tile-hover-pane>`,
    );

    const container = el.shadowRoot?.querySelector('#container');
    const listView = el.shadowRoot?.querySelector('tile-list');

    expect(container).to.exist;
    expect(listView).to.exist;
  });

  it('should render component with header element', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'texts',
      collections: ['collection1', 'fav-jack-sparrow'],
    };

    const el = await fixture<TileHoverPane>(
      html`<tile-hover-pane .model=${model}></tile-hover-pane>`,
    );

    const container = el.shadowRoot?.querySelector('#container');
    const listView = container?.querySelector('tile-list');
    const headerElement = container?.querySelector('#list-line-header');

    expect(container).to.exist;
    expect(listView).to.exist;
    expect(headerElement).to.exist;
    expect(headerElement?.querySelector('a')?.getAttribute('href')).contains(
      '/details/collection1',
    );
  });

  it('should NOT render header element when fav- collection', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'texts',
      collections: ['fav-jack-sparrow'],
    };

    const el = await fixture<TileHoverPane>(
      html`<tile-hover-pane .model=${model}></tile-hover-pane>`,
    );

    const container = el.shadowRoot?.querySelector('#container');
    const listView = container?.querySelector('tile-list');
    const headerElement = container?.querySelector('#list-line-header');

    expect(container).to.exist;
    expect(listView).to.exist;
    expect(headerElement).not.exist;
  });

  it('should NOT render header element when no collections', async () => {
    const model: Partial<TileModel> = {
      mediatype: 'texts',
      collections: [],
    };

    const el = await fixture<TileHoverPane>(
      html`<tile-hover-pane .model=${model}></tile-hover-pane>`,
    );

    const container = el.shadowRoot?.querySelector('#container');
    const listView = container?.querySelector('tile-list');
    const headerElement = container?.querySelector('#list-line-header');

    expect(container).to.exist;
    expect(listView).to.exist;
    expect(headerElement).not.exist;
  });
});
