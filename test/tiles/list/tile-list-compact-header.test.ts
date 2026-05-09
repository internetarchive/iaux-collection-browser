import { expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileListCompactHeader } from '../../../src/tiles/list/tile-list-compact-header';

import '../../../src/tiles/list/tile-list-compact-header';

describe('List Tile Compact Header', () => {
  it('should render Weekly views header when sorting by week', async () => {
    const el = await fixture<TileListCompactHeader>(html`
      <tile-list-compact-header
        .sortParam=${{ field: 'week', direction: 'desc' }}
      >
      </tile-list-compact-header>
    `);

    const viewsColumn = el.shadowRoot?.getElementById('views');
    expect(viewsColumn).to.exist;
    expect(viewsColumn?.textContent?.trim()).to.equal('Weekly views');
  });

  it('should render All-time views header when sorting by non-week field', async () => {
    const el = await fixture<TileListCompactHeader>(html`
      <tile-list-compact-header
        .sortParam=${{ field: 'downloads', direction: 'desc' }}
      >
      </tile-list-compact-header>
    `);

    const viewsColumn = el.shadowRoot?.getElementById('views');
    expect(viewsColumn).to.exist;
    expect(viewsColumn?.textContent?.trim()).to.equal('All-time views');
  });

  it('should render All-time views header with no sort param', async () => {
    const el = await fixture<TileListCompactHeader>(html`
      <tile-list-compact-header> </tile-list-compact-header>
    `);

    const viewsColumn = el.shadowRoot?.getElementById('views');
    expect(viewsColumn).to.exist;
    expect(viewsColumn?.textContent?.trim()).to.equal('All-time views');
  });
});
