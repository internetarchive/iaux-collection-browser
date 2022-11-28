/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { AccountTile } from '../../../src/tiles/grid/account-tile';

import '../../../src/tiles/grid/account-tile';

describe('Account Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

    const itemInfo = el.shadowRoot?.querySelector('.account-info');
    const itemAvatar = el.shadowRoot?.querySelector('#avatar-info');
    const itemArchivist = el.shadowRoot?.querySelector('#archivist-since');
    const tileStats = el.shadowRoot?.querySelector('tile-stats');

    expect(itemInfo).to.exist;
    expect(itemAvatar).to.exist;
    expect(itemArchivist).to.exist;
    expect(tileStats).to.exist;
  });

  it('should render with account-avatar and title element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          identifier: '@jack-sparrow',
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.account-info');
    const accountAvatar = el.shadowRoot?.querySelector('#avatar');
    const accountTitle = el.shadowRoot?.querySelector('#title');

    expect(itemInfo).to.exist;
    expect(accountAvatar).to.exist;
    expect(accountAvatar?.getAttribute('src')).to.equal(
      'https://archive.org/services/img/@jack-sparrow'
    );

    expect(accountTitle).to.exist;
    expect(accountTitle?.querySelector('.truncated')?.textContent).to.equal(
      '@jack-sparrow'
    );
  });

  it('should render with tile-stats element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          identifier: '@jack-sparrow',
          mediatype: 'account',
          itemCount: 10000,
          favCount: 100,
          commentCount: 3,
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const tileStats = el.shadowRoot?.querySelector('tile-stats');
    expect(tileStats).to.exist;
  });

  // it('should not render with created-by but publicdate element', async () => {
  //   const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

  //   el.sortParam = {
  //     field: 'publicdate',
  //     direction: 'desc',
  //   };
  //   await el.updateComplete;

  //   const createdBy = el.shadowRoot?.querySelector('.created-by');
  //   const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

  //   expect(createdBy).to.not.exist;
  //   expect(dateSortedBy).to.exist;
  // });

  // it('should render with created-by when sorting not related to date', async () => {
  //   const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

  //   el.sortParam = {
  //     field: 'addeddate',
  //     direction: 'asc',
  //   };
  //   await el.updateComplete;

  //   const itemInfo = el.shadowRoot?.querySelector('.item-info');
  //   const createdBy = el.shadowRoot?.querySelector('.created-by');
  //   const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

  //   expect(itemInfo).to.exist;
  //   expect(createdBy).to.not.exist;
  //   expect(dateSortedBy).to.exist;
  // });

  // it('should render with created-by when sort field id not like date', async () => {
  //   const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

  //   el.sortParam = {
  //     field: 'week',
  //     direction: 'asc',
  //   };
  //   await el.updateComplete;

  //   const itemInfo = el.shadowRoot?.querySelector('.item-info');
  //   const createdBy = el.shadowRoot?.querySelector('.created-by');
  //   const dateSortedBy = el.shadowRoot?.querySelector('.date-sorted-by');

  //   expect(itemInfo).to.exist;
  //   expect(dateSortedBy).to.not.exist; // it should be exist because this is not related to date sort
  //   expect(createdBy).to.exist;
  // });

  // it('should render with snippet block when it has snippets', async () => {
  //   const el = await fixture<AccountTile>(html`
  //     <account-tile .model=${{ snippets: ['some {{{snippet}}} text'] }}>
  //     </account-tile>
  //   `);

  //   const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

  //   expect(snippetBlock).to.exist;
  // });

  // it('should not render snippet block when no snippets are present', async () => {
  //   const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

  //   const snippetBlock = el.shadowRoot?.querySelector('text-snippet-block');

  //   expect(snippetBlock).to.not.exist;
  // });
});
