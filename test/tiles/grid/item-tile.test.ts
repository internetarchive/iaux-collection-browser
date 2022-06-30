/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import { ItemTile } from '../../../src/tiles/grid/item-tile';

import '../../../src/tiles/grid/item-tile';

describe('Item Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemImage = el.shadowRoot?.querySelector('item-image');
    const itemTitle = el.shadowRoot?.querySelector('#title');

    expect(itemInfo).to.exist;
    expect(itemImage).to.exist;
    expect(itemTitle).to.exist;
  });

  it('should render with created-by element', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(createdBy).to.exist;
    expect(dateSortedBy).to.not.exist;
  });

  it('should not render with created-by but date-sorted-by element', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    el.sortParam = {
      field: 'addeddate',
      direction: 'desc',
    };
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });
});
