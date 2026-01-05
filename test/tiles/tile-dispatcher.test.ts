import { aTimeout, expect, fixture } from '@open-wc/testing';
import { html } from 'lit';
import sinon from 'sinon';
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

  it('should render search-tile for grid mode and search mediatype', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        .tileDisplayMode=${'grid'}
        .model=${{ mediatype: 'search' }}
      >
      </tile-dispatcher>
    `);

    const searchTile = el.shadowRoot?.querySelector('search-tile');
    expect(searchTile).to.exist;
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

  it('should open item in new tab when right-clicked in manage mode', async () => {
    const oldWindowOpen = window.open;
    const spy = sinon.spy();
    window.open = spy;

    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        isManageView
        .model=${{ identifier: 'foo', href: '/foo' }}
        .baseNavigationUrl=${''}
      >
      </tile-dispatcher>
    `);

    const tileLink = el.shadowRoot?.querySelector(
      'a[href]',
    ) as HTMLAnchorElement;
    expect(tileLink).to.exist;

    tileLink.dispatchEvent(new Event('contextmenu'));
    await el.updateComplete;

    expect(spy.callCount).to.equal(1);
    expect(spy.args[0][0]).to.equal('/foo');
    expect(spy.args[0][1]).to.equal('_blank');

    window.open = oldWindowOpen;
  });

  it('should toggle model checked state when manage check clicked', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher
        isManageView
        .model=${{ identifier: 'foo', href: '/foo' }}
        .tileDisplayMode=${'grid'}
      ></tile-dispatcher>
    `);

    const manageCheck = el.shadowRoot?.querySelector(
      '.manage-check > input[type="checkbox"]',
    ) as HTMLButtonElement;

    manageCheck.click();
    await el.updateComplete;
    expect(el.model?.checked).to.be.true;

    manageCheck.click();
    await el.updateComplete;
    expect(el.model?.checked).to.be.false;
  });

  it('should return hover pane props', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .model=${{ identifier: 'foo' }}> </tile-dispatcher>
    `);

    expect(el.getHoverPaneProps()).to.satisfy(
      (props: HoverPaneProperties) => props?.model?.identifier === 'foo',
    );
  });

  it('should focus the tile link when requested', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .tileDisplayMode=${'grid'}> </tile-dispatcher>
    `);

    const tileLink = el.shadowRoot?.querySelector(
      '.tile-link',
    ) as HTMLAnchorElement;
    expect(tileLink).to.exist;

    const spyFocus = sinon.spy(tileLink, 'focus');
    el.acquireFocus();
    expect(spyFocus.callCount).to.equal(1);
  });

  it('should blur the tile link when requested', async () => {
    const el = await fixture<TileDispatcher>(html`
      <tile-dispatcher .tileDisplayMode=${'grid'}> </tile-dispatcher>
    `);

    const tileLink = el.shadowRoot?.querySelector(
      '.tile-link',
    ) as HTMLAnchorElement;
    expect(tileLink).to.exist;

    const spyBlur = sinon.spy(tileLink, 'blur');
    el.releaseFocus();
    expect(spyBlur.callCount).to.equal(1);
  });

  describe('Hover pane info button behavior', () => {
    let oldMatchMedia: typeof window.matchMedia;

    before(() => {
      oldMatchMedia = window.matchMedia;
      // Pretend that there is no hover-capable input device
      window.matchMedia = () => ({ matches: false }) as MediaQueryList;
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
        '.info-button',
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
