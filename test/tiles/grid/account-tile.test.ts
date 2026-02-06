import { fixture } from '@open-wc/testing-helpers';
import { describe, it, expect } from 'vitest';
import sinon from 'sinon';
import { html } from 'lit';
import type { AccountTile } from '../../../src/tiles/grid/account-tile';

import '../../../src/tiles/grid/account-tile';

describe('Account Tile', () => {
  it('should render initial component', async () => {
    const el = await fixture<AccountTile>(html`<account-tile></account-tile>`);

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const itemImage = el.shadowRoot?.querySelector('image-block');
    const itemArchivist = el.shadowRoot?.querySelector('.archivist-since');
    const tileStats = el.shadowRoot?.querySelector('tile-stats');

    expect(itemInfo).to.exist;
    expect(itemImage).to.exist;
    expect(itemArchivist).to.exist;
    expect(tileStats).to.exist;
  });

  it('should render with title element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          identifier: '@jack-sparrow',
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const itemInfo = el.shadowRoot?.querySelector('.item-info');
    const accountTitle = el.shadowRoot?.querySelector('#title');

    expect(itemInfo).to.exist;
    expect(accountTitle).to.exist;
    expect(accountTitle?.querySelector('.truncated')?.textContent).to.equal(
      '@jack-sparrow',
    );
  });

  it('should render with archivist-since date element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          dateAdded: new Date('2022-02-02'),
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const itemArchivist = el.shadowRoot?.querySelector('.archivist-since');
    expect(itemArchivist?.textContent).contains('Archivist since 2022');
  });

  it('should render with tile-stats element', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile
        .model=${{
          identifier: '@jack-sparrow',
          mediatype: 'account',
          itemCount: 999,
          favCount: 100,
          commentCount: 3,
        }}
      >
      </account-tile>
    `);
    await el.updateComplete;

    const tileStats = el.shadowRoot?.querySelector('tile-stats');
    const statsElements = tileStats?.shadowRoot?.querySelector('#stats-row');

    expect(tileStats).to.exist;
    expect(statsElements).to.exist;

    const downloads = statsElements
      ?.querySelectorAll('.col')[1]
      .querySelector('.status-text');
    expect(downloads?.textContent).contains(999);

    const favorites = statsElements
      ?.querySelectorAll('.col')[2]
      .querySelector('.status-text');
    expect(favorites?.textContent).contains(100);

    const reviewCounts = statsElements
      ?.querySelectorAll('.col')[3]
      .querySelector('.status-text');
    expect(reviewCounts?.textContent).contains(3);
  });

  it('should render info button when showInfoButton flag is set', async () => {
    const el = await fixture<AccountTile>(html`
      <account-tile ?showInfoButton=${true}> </account-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector('.info-button');

    expect(infoButton).to.exist;
  });

  it('should dispatch event when info button tapped', async () => {
    const infoButtonSpy = sinon.spy();
    const el = await fixture<AccountTile>(html`
      <account-tile ?showInfoButton=${true} @infoButtonPressed=${infoButtonSpy}>
      </account-tile>
    `);

    const infoButton = el.shadowRoot?.querySelector(
      '.info-button',
    ) as HTMLButtonElement;
    infoButton.click();
    await el.updateComplete;

    expect(infoButtonSpy.callCount).to.equal(1);
  });
});
