import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileStats } from '../src/tiles/grid/tile-stats';

import '../src/tiles/grid/tile-stats';

describe('Tile Stats', () => {
  it('should render initial component', async () => {
    const el = await fixture<TileStats>(html`<tile-stats></tile-stats>`);

    const itemStats = el.shadowRoot?.querySelector('.item-stats');
    const statsRow = el.shadowRoot?.querySelector('#stats-row');
    const statsRowCount = statsRow?.childElementCount;

    expect(itemStats).to.exist;
    expect(statsRow).to.exist;
    expect(statsRowCount).to.equal(4);
  });

  it('should render component with value', async () => {
    const el = await fixture<TileStats>(html`
      <tile-stats
        .mediatype=${'account'}
        .itemCount=${1}
        .favCount=${2}
        .commentCount=${3}
      >
      </tile-stats>
    `);

    const statsRow = el.shadowRoot?.querySelector('#stats-row');

    const mediatypeStat = statsRow?.children.item(0);
    // get second column item in stats row
    const itemStatCount = statsRow?.children
      .item(1)
      ?.querySelector('.status-text')?.textContent;
    // get third column item in stats row
    const favoritesStatCount = statsRow?.children
      .item(2)
      ?.querySelector('.status-text')?.textContent;
    // get fourth column item in stats row
    const reviewsStatCount = statsRow?.children
      .item(3)
      ?.querySelector('.status-text')?.textContent;

    expect(mediatypeStat).to.exist;

    // Snapshot testing - reference: https://open-wc.org/docs/testing/semantic-dom-diff/#snapshot-testing
    expect(itemStatCount).to.equalSnapshot(1);
    expect(favoritesStatCount).to.equalSnapshot(2);
    expect(reviewsStatCount).to.equalSnapshot(3);
  });

  it('should render view count for non-account items', async () => {
    const el = await fixture<TileStats>(html`
      <tile-stats
        .mediatype=${'texts'}
        .viewCount=${4}
        .favCount=${5}
        .commentCount=${6}
      >
      </tile-stats>
    `);

    const statsRow = el.shadowRoot?.querySelector('#stats-row');

    const mediatypeStat = statsRow?.children.item(0);
    // get second column item in stats row
    const viewStatCount = statsRow?.children
      .item(1)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get third column item in stats row
    const favoritesStatCount = statsRow?.children
      .item(2)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get fourth column item in stats row
    const reviewsStatCount = statsRow?.children
      .item(3)
      ?.querySelector('.status-text')
      ?.textContent?.trim();

    expect(mediatypeStat).to.exist;
    expect(viewStatCount).to.match(/Views:\s+4/);
    expect(favoritesStatCount).to.match(/Favorites:\s+5/);
    expect(reviewsStatCount).to.match(/Reviews:\s+6/);
  });

  it('handles missing counts gracefully', async () => {
    const el = await fixture<TileStats>(html`
      <tile-stats .mediatype=${'texts'} .favCount=${5} .commentCount=${6}>
      </tile-stats>
    `);

    const statsRow = el.shadowRoot?.querySelector('#stats-row');

    const mediatypeStat = statsRow?.children.item(0);
    // get second column item in stats row
    const viewStatCount = statsRow?.children
      .item(1)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get third column item in stats row
    const favoritesStatCount = statsRow?.children
      .item(2)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get fourth column item in stats row
    const reviewsStatCount = statsRow?.children
      .item(3)
      ?.querySelector('.status-text')
      ?.textContent?.trim();

    expect(mediatypeStat).to.exist;
    expect(viewStatCount).to.match(/Views:\s+0/);
    expect(favoritesStatCount).to.match(/Favorites:\s+5/);
    expect(reviewsStatCount).to.match(/Reviews:\s+6/);
  });

  it('handles missing counts gracefully for accounts', async () => {
    const el = await fixture<TileStats>(html`
      <tile-stats .mediatype=${'account'} .favCount=${5} .commentCount=${6}>
      </tile-stats>
    `);

    const statsRow = el.shadowRoot?.querySelector('#stats-row');

    const mediatypeStat = statsRow?.children.item(0);
    // get second column item in stats row
    const itemStatCount = statsRow?.children
      .item(1)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get third column item in stats row
    const favoritesStatCount = statsRow?.children
      .item(2)
      ?.querySelector('.status-text')
      ?.textContent?.trim();
    // get fourth column item in stats row
    const reviewsStatCount = statsRow?.children
      .item(3)
      ?.querySelector('.status-text')
      ?.textContent?.trim();

    expect(mediatypeStat).to.exist;
    expect(itemStatCount).to.match(/Uploads:\s+0/);
    expect(favoritesStatCount).to.match(/Favorites:\s+5/);
    expect(reviewsStatCount).to.match(/Reviews:\s+6/);
  });
});
