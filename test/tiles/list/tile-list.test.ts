/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileList } from '../../../src/tiles/list/tile-list';

import '../../../src/tiles/list/tile-list';

describe('List Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileList>(html`<tile-list></tile-list>`);

    const listContainer = el.shadowRoot?.querySelector('#list-line');
    const itemTitle = el.shadowRoot?.querySelector('#title');
    const imageBlock = el.shadowRoot?.querySelector('image-block');

    expect(listContainer).to.exist;
    expect(itemTitle).to.exist;
    expect(imageBlock).to.exist;
  });

  it('should render with creator element but not dates', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .model=${{ creators: ['someone'] }}></tile-list>
    `);

    const creator = el.shadowRoot?.querySelector('#creator');
    const datesLine = el.shadowRoot?.querySelector('#dates-line');

    expect(creator).to.exist;
    expect(datesLine?.children.length).to.equal(0);
  });

  it('should render with snippet block when it has snippets', async () => {
    const el = await fixture<TileList>(html`
      <tile-list .model=${{ snippets: ['some {{{snippet}}} text'] }}>
      </tile-list>
    `);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.exist;
  });

  it('should not render snippet block when no snippets are present', async () => {
    const el = await fixture<TileList>(html`<tile-list></tile-list>`);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.not.exist;
  });
});
