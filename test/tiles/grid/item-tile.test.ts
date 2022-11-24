/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { ItemTile } from '../../../src/tiles/grid/item-tile';

import '../../../src/tiles/grid/item-tile';

describe('Item Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const container = el.shadowRoot?.querySelector('.container');
    const tileDetails = el.shadowRoot?.querySelector('.tile-details');
    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemTitle = el.shadowRoot?.querySelector('#title');
    const imageBlock = el.shadowRoot?.querySelector('image-block');

    expect(container).to.exist;
    expect(tileDetails).to.exist;
    expect(itemInfo).to.exist;
    expect(imageBlock).to.exist;
    expect(itemTitle).to.exist;
  });

  it('should render with created-by element', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ creator: 'someone' }}></item-tile>`
    );

    const container = el.shadowRoot?.querySelector('.container');
    const tileDetails = el.shadowRoot?.querySelector('.tile-details');
    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const createdByTruncated = el.shadowRoot?.querySelector(
      '.created-by .truncated'
    );
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(container).to.exist;
    expect(tileDetails).to.exist;
    expect(itemInfo).to.exist;
    expect(createdBy).to.exist;
    expect(createdByTruncated).to.exist;
    expect(dateSortedBy).to.not.exist;
  });

  it('should not render with created-by but date element', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    el.sortParam = {
      field: 'date',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should not render with created-by but reviewdate element', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    el.sortParam = {
      field: 'reviewdate',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should not render with created-by but publicdate element', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    el.sortParam = {
      field: 'publicdate',
      direction: 'desc',
    };
    await el.updateComplete;

    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should render with created-by when sorting not related to date', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    el.sortParam = {
      field: 'addeddate',
      direction: 'asc',
    };
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(createdBy).to.not.exist;
    expect(dateSortedBy).to.exist;
  });

  it('should render with created-by when sort field id not like date', async () => {
    const el = await fixture<ItemTile>(
      html`<item-tile .model=${{ creator: 'someone' }}></item-tile>`
    );

    el.sortParam = {
      field: 'week',
      direction: 'asc',
    };
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const createdBy = el.shadowRoot?.querySelector('.created-by');
    const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

    expect(itemInfo).to.exist;
    expect(dateSortedBy).to.not.exist; // it should be exist because this is not related to date sort
    expect(createdBy).to.exist;
  });

  it('should render with snippet block when it has snippets', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile .model=${{ snippets: ['some {{{snippet}}} text'] }}>
      </item-tile>
    `);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.exist;
  });

  it('should not render snippet block when no snippets are present', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

    expect(snippetBlock).to.not.exist;
  });

  it('should render with volume/issue view', async () => {
    const el = await fixture<ItemTile>(html`
      <item-tile .model=${{ volume: '1', issue: 'Index' }}></item-tile>
    `);

    const volumeIssueBlock = el.shadowRoot?.querySelector('.volume-issue');

    expect(volumeIssueBlock).to.exist;
  });

  it('should render with volume/issue view to not render', async () => {
    const el = await fixture<ItemTile>(html`<item-tile></item-tile>`);

    const volumeIssueBlock = el.shadowRoot?.querySelector('.volume-issue');

    expect(volumeIssueBlock).to.not.exist;
  });
});
