/* eslint-disable import/no-duplicates */
import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileListCompact } from '../../../src/tiles/list/tile-list-compact';

import '../../../src/tiles/list/tile-list-compact';
import type { TileModel } from '../../../src/models';

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

  it('should render title link with model href if provided', async () => {
    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .baseNavigationUrl=${''}
        .model=${{ title: 'foo', href: '/foo/bar' }}
      ></tile-list-compact>
    `);

    const title = el.shadowRoot?.querySelector('#title');

    expect(title).to.exist;
    expect(title?.getAttribute('href')).to.equal('/foo/bar');
  });

  it('should render weekly views when sorting by week', async () => {
    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${{ viewCount: 50, weeklyViewCount: 10 }}
        .sortParam=${{ field: 'week', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const viewsColumn = el.shadowRoot?.getElementById('views');
    expect(viewsColumn).to.exist;
    expect(viewsColumn?.textContent?.trim()).to.equal('10');
  });

  it('should render 0 for views if missing model', async () => {
    const el = await fixture<TileListCompact>(html`
      <tile-list-compact .sortParam=${{ field: 'week', direction: 'desc' }}>
      </tile-list-compact>
    `);

    const viewsColumn = el.shadowRoot?.getElementById('views');
    expect(viewsColumn).to.exist;
    expect(viewsColumn?.textContent?.trim()).to.equal('0');
  });

  it('should render published date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date('2010-01-02'),
      dateArchived: new Date('2011-01-02'),
      datePublished: new Date('2012-01-02'),
      dateReviewed: new Date('2013-01-02'),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 02, 2012');
  });

  it('should render added date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date('2010-01-02'),
      dateArchived: new Date('2011-01-02'),
      datePublished: new Date('2012-01-02'),
      dateReviewed: new Date('2013-01-02'),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 02, 2010');
  });

  it('should render archived date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date('2010-01-02'),
      dateArchived: new Date('2011-01-02'),
      datePublished: new Date('2012-01-02'),
      dateReviewed: new Date('2013-01-02'),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'publicdate', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 02, 2011');
  });

  it('should render reviewed date when sorting by it', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date('2010-01-02'),
      dateArchived: new Date('2011-01-02'),
      datePublished: new Date('2012-01-02'),
      dateReviewed: new Date('2013-01-02'),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'reviewdate', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 02, 2013');
  });

  it('should only show the year for a date published of Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      datePublished: new Date(2012, 0, 1, 0, 0, 0, 0),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'date', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    const dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('2012');
  });

  it('should show full date added/archived/reviewed, even on Jan 1 at midnight UTC', async () => {
    const model: Partial<TileModel> = {
      dateAdded: new Date(2010, 0, 1, 0, 0, 0, 0),
      dateArchived: new Date(2011, 0, 1, 0, 0, 0, 0),
      datePublished: new Date(2012, 0, 1, 0, 0, 0, 0),
      dateReviewed: new Date(2013, 0, 1, 0, 0, 0, 0),
    };

    const el = await fixture<TileListCompact>(html`
      <tile-list-compact
        .model=${model}
        .sortParam=${{ field: 'addeddate', direction: 'desc' }}
      >
      </tile-list-compact>
    `);

    let dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 01, 2010');

    el.sortParam = { field: 'publicdate', direction: 'desc' };
    await el.updateComplete;
    dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 01, 2011');

    el.sortParam = { field: 'reviewdate', direction: 'desc' };
    await el.updateComplete;
    dateColumn = el.shadowRoot?.getElementById('date');
    expect(dateColumn).to.exist;
    expect(dateColumn?.textContent?.trim()).to.equal('Jan 01, 2013');
  });
});
