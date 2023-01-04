import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import type { TileDispatcher } from '../../src/tiles/tile-dispatcher';

import '../../src/tiles/tile-dispatcher';
import type { ItemTile } from '../../src/tiles/grid/item-tile';
import { TileHoverPane } from '../../src/tiles/hover/tile-hover-pane';
import type { HoverPaneProperties } from '../../src/tiles/hover/hover-pane-controller';

describe('Tile Dispatcher', () => {
  it('should render item-tile for grid mode by default', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        .tileDisplayMode=${'grid'}
        .model=${{ mediatype: 'texts' }}
      >
      </tile-dispatcher>
    `);

    const itemTile = el.shadowRoot?.querySelector('item-tile');
    expect(itemTile).to.exist;
  });

  it('should render collection-tile for grid mode and collection mediatype', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        .tileDisplayMode=${'grid'}
        .model=${{ mediatype: 'collection' }}
      >
      </tile-dispatcher>
    `);

    const collectionTile = el.shadowRoot?.querySelector('collection-tile');
    expect(collectionTile).to.exist;
  });

  it('should render account-tile for grid mode and account mediatype', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        .tileDisplayMode=${'grid'}
        .model=${{ mediatype: 'account' }}
      >
      </tile-dispatcher>
    `);

    const accountTile = el.shadowRoot?.querySelector('account-tile');
    expect(accountTile).to.exist;
  });

  it('should render tile-list for extended list mode', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .tileDisplayMode=${'list-detail'} .model=${{}}>
      </tile-dispatcher>
    `);

    const listTile = el.shadowRoot?.querySelector('tile-list');
    expect(listTile).to.exist;
  });

  it('should render tile-list-compact for compact list mode', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .tileDisplayMode=${'list-compact'} .model=${{}}>
      </tile-dispatcher>
    `);

    const compactListTile = el.shadowRoot?.querySelector('tile-list-compact');
    expect(compactListTile).to.exist;
  });

  it('should return hover pane props', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .model=${{ identifier: 'foo' }}> </tile-dispatcher>
    `);

    expect(el.getHoverPaneProps()).to.satisfy(
      (props: HoverPaneProperties) => props?.model?.identifier === 'foo'
    );
  });

  describe('Hover pane info button behavior', () => {
    let oldMatchMedia: typeof window.matchMedia;

    before(() => {
      oldMatchMedia = window.matchMedia;
      // Pretend that there is no hover-capable input device
      window.matchMedia = () => ({ matches: false } as MediaQueryList);
    });

    after(() => {
      window.matchMedia = oldMatchMedia;
    });

    it('should toggle hover pane when tile info button is pressed', async () => {
      const el = await fixture<TileDispatcher>(html`
        <tile-dispatcher
          .tileDisplayMode=${'grid'}
          .model=${{ mediatype: 'texts' }}
          .enableHoverPane=${true}
        >
        </tile-dispatcher>
      `);

      const itemTile = el.shadowRoot?.querySelector('item-tile') as ItemTile;
      expect(itemTile).to.exist;

      const infoButton = itemTile.shadowRoot?.querySelector(
        '.info-button'
      ) as HTMLButtonElement;
      expect(infoButton).to.exist;

      infoButton.click();
      await aTimeout(500);
      await el.updateComplete;
      expect(el.getHoverPane()).to.be.instanceOf(TileHoverPane);

      infoButton.click();
      await aTimeout(500);
      await el.updateComplete;
      expect(el.getHoverPane()).not.to.exist;
    });
  });
});
