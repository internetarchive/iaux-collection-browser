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

  it('should render with archivist-since date element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          dateAdded: new Date('2022-01-01'),
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const itemArchivist = el.shadowRoot?.querySelector('#archivist-since');
    expect(itemArchivist?.textContent).contains('Archivist since 2022');
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
});