import { expect, fixture } from '@open-wc/testing';
import { html, nothing } from 'lit';
import { HoverPaneController } from '../../../src/tiles/hover/hover-pane-controller';
import type { TileDispatcher } from '../../../src/tiles/tile-dispatcher';

import '../../../src/tiles/tile-dispatcher';

describe('Hover Pane Controller', () => {
  it('should initially provide empty template', async () => {
    const host = await fixture<TileDispatcher>(
      html`<tile-dispatcher></tile-dispatcher>`
    );

    const controller = new HoverPaneController(host);
    expect(controller.getTemplate()).to.equal(nothing);
  });
});
