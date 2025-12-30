import { expect, fixture } from '@open-wc/testing';
import { html, LitElement, nothing, TemplateResult } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import {
  HoverPaneController,
  HoverPaneControllerInterface,
  HoverPaneControllerOptions,
  HoverPaneProperties,
  HoverPaneProviderInterface,
} from '../../../src/tiles/hover/hover-pane-controller';
import type { TileHoverPane } from '../../../src/tiles/hover/tile-hover-pane';
import { TileModel } from '../../../src/models';

@customElement('host-element')
class HostElement extends LitElement implements HoverPaneProviderInterface {
  @property({ type: Object }) controllerOptions?: HoverPaneControllerOptions;

  @property({ type: Boolean }) suppressHoverPane: boolean = false;

  @query('tile-hover-pane') hoverPane?: TileHoverPane;

  controller?: HoverPaneControllerInterface;

  render(): TemplateResult {
    return html` ${this.controller?.getTemplate()} `;
  }

  protected firstUpdated(): void {
    this.controller = new HoverPaneController(this, this.controllerOptions);
  }

  acquireFocus(): void {}

  releaseFocus(): void {}

  getHoverPane(): HTMLElement | undefined {
    return this.suppressHoverPane ? undefined : this.hoverPane;
  }

  getHoverPaneProps(): HoverPaneProperties {
    const tileModel = new TileModel({});
    tileModel.checked = false;
    tileModel.collectionFilesCount = 1;
    tileModel.collections = ['foo', 'bar'];
    tileModel.collectionSize = 1;
    tileModel.commentCount = 1;
    tileModel.contentWarning = false;
    tileModel.creators = ['foo', 'bar'];
    tileModel.favCount = 1;
    tileModel.identifier = 'foo';
    tileModel.itemCount = 1;
    tileModel.loginRequired = false;
    tileModel.mediatype = 'data';
    tileModel.subjects = ['foo', 'bar'];
    tileModel.title = 'foo';
    tileModel.viewCount = 1;

    return {
      model: tileModel,
      loggedIn: false,
      suppressBlurring: false,
      sortParam: null,
    };
  }
}

describe('Hover Pane Controller', () => {
  let oldMatchMedia: typeof window.matchMedia;
  let oldOnTouchStart: typeof window.ontouchstart;

  before(() => {
    oldMatchMedia = window.matchMedia;
    oldOnTouchStart = window.ontouchstart;
    window.matchMedia = () => ({ matches: true }) as MediaQueryList;
    window.ontouchstart = () => {};
  });

  after(() => {
    window.matchMedia = oldMatchMedia;
    window.ontouchstart = oldOnTouchStart;
  });

  it('should initially provide empty template', async () => {
    const host = await fixture<HostElement>(
      html`<host-element></host-element>`,
    );
    expect(host.controller?.getTemplate()).to.equal(nothing);
  });

  it('should produce a hover pane template after mousemove, and hide it after mouseleave', async () => {
    const host = await fixture<HostElement>(
      html`<host-element
        .controllerOptions=${{ showDelay: 0, hideDelay: 0 }}
      ></host-element>`,
    );

    host.dispatchEvent(new MouseEvent('mousemove'));
    // Need to wait a tick for the event handlers to run
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(host.controller?.getTemplate()).not.to.equal(nothing); // Is a TemplateResult

    host.dispatchEvent(new MouseEvent('mouseleave'));
    // Need to wait for the fade out transition
    await new Promise(resolve => {
      setTimeout(resolve, 150);
    });

    expect(host.controller?.getTemplate()).to.equal(nothing);
  });

  it('should produce a hover pane template after mouseenter, even without mousemove', async () => {
    const host = await fixture<HostElement>(
      html`<host-element
        .controllerOptions=${{ showDelay: 0, hideDelay: 0 }}
      ></host-element>`,
    );

    host.dispatchEvent(new MouseEvent('mouseenter'));
    // Need to wait a tick for the event handlers to run
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(host.controller?.getTemplate()).not.to.equal(nothing); // Is a TemplateResult
  });

  it('should immediately fade back in if mouse enters while fading out', async () => {
    const host = await fixture<HostElement>(
      html`<host-element
        .controllerOptions=${{ showDelay: 0, hideDelay: 0 }}
      ></host-element>`,
    );

    // Enter the host element and wait for the show handlers to run
    host.dispatchEvent(new MouseEvent('mousemove'));
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    // Leave the host element so it begins fading out, but not all the way
    host.dispatchEvent(new MouseEvent('mouseleave'));
    await new Promise(resolve => {
      setTimeout(resolve, 20);
    });

    // Re-enter the host element and wait long enough that it would disappear
    // if the hide were not cancelled
    host.dispatchEvent(new MouseEvent('mousemove'));
    await new Promise(resolve => {
      setTimeout(resolve, 150);
    });

    expect(host.controller?.getTemplate()).not.to.equal(nothing);
  });

  it('should flip hover pane if it would overflow the viewport', async () => {
    const host = await fixture<HostElement>(
      html`<host-element
        .controllerOptions=${{ showDelay: 0, hideDelay: 0 }}
      ></host-element>`,
    );

    host.dispatchEvent(
      new MouseEvent('mousemove', { clientX: 800, clientY: 600 }),
    );
    // Need to wait a tick for the event handlers to run
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });
    await host.updateComplete;

    expect(host.controller?.getTemplate()).not.to.equal(nothing);
    expect(host.getHoverPane()?.getBoundingClientRect()?.right).to.be.lessThan(
      window.innerWidth,
    );
    expect(host.getHoverPane()?.getBoundingClientRect()?.bottom).to.be.lessThan(
      window.innerHeight,
    );
  });

  it('should gracefully handle undefined hover pane from host element', async () => {
    const host = await fixture<HostElement>(
      html`<host-element
        .controllerOptions=${{ showDelay: 0, hideDelay: 0 }}
        ?suppressHoverPane=${true}
      ></host-element>`,
    );

    host.dispatchEvent(new MouseEvent('mousemove'));
    // Need to wait a tick for the event handlers to run
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    expect(host.controller?.getTemplate()).not.to.equal(nothing);

    host.dispatchEvent(new MouseEvent('mouseleave'));
    await new Promise(resolve => {
      setTimeout(resolve, 20);
    });

    host.dispatchEvent(new MouseEvent('mousemove'));
    await new Promise(resolve => {
      setTimeout(resolve, 0);
    });

    host.dispatchEvent(new MouseEvent('mouseleave'));
    // Need to wait for the fade out transition
    await new Promise(resolve => {
      setTimeout(resolve, 150);
    });

    expect(host.controller?.getTemplate()).to.equal(nothing);
  });

  describe('Touch & long-press', () => {
    const getTouchStartEvent = (host: EventTarget) =>
      new TouchEvent('touchstart', {
        touches: [new Touch({ identifier: 0, target: host })],
      });

    it('should produce a hover pane after long press', async () => {
      const host = await fixture<HostElement>(
        html`<host-element
          .controllerOptions=${{
            showDelay: 0,
            longPressDelay: 0,
            enableLongPress: true,
          }}
        ></host-element>`,
      );

      // Touch the host element and wait for the long press handlers to run
      host.dispatchEvent(getTouchStartEvent(host));
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      expect(host.controller?.getTemplate()).not.to.equal(nothing); // Is a TemplateResult
    });

    it('should cancel a long press by moving', async () => {
      const host = await fixture<HostElement>(
        html`<host-element
          .controllerOptions=${{
            showDelay: 0,
            longPressDelay: 100,
            enableLongPress: true,
          }}
        ></host-element>`,
      );

      // Touch the host element
      host.dispatchEvent(getTouchStartEvent(host));
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      // Move the touch point, cancelling the long press
      host.dispatchEvent(new TouchEvent('touchmove'));
      await new Promise(resolve => {
        setTimeout(resolve, 150);
      });

      expect(host.controller?.getTemplate()).to.equal(nothing);
    });

    it('should cancel a long press by ending touch', async () => {
      const host = await fixture<HostElement>(
        html`<host-element
          .controllerOptions=${{
            showDelay: 0,
            longPressDelay: 100,
            enableLongPress: true,
          }}
        ></host-element>`,
      );

      // Touch the host element
      host.dispatchEvent(getTouchStartEvent(host));
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      // Lift the touch point, cancelling the long press
      host.dispatchEvent(new TouchEvent('touchend'));
      await new Promise(resolve => {
        setTimeout(resolve, 150);
      });

      expect(host.controller?.getTemplate()).to.equal(nothing);
    });

    it('should cancel a long press by cancelling touch (e.g., too many touch points)', async () => {
      const host = await fixture<HostElement>(
        html`<host-element
          .controllerOptions=${{
            showDelay: 0,
            longPressDelay: 100,
            enableLongPress: true,
          }}
        ></host-element>`,
      );

      // Touch the host element
      host.dispatchEvent(getTouchStartEvent(host));
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      // Cancel the touch point, also cancelling the long press
      host.dispatchEvent(new TouchEvent('touchcancel'));
      await new Promise(resolve => {
        setTimeout(resolve, 150);
      });

      expect(host.controller?.getTemplate()).to.equal(nothing);
    });

    it('should close the hover pane on mobile when touching the backdrop', async () => {
      const host = await fixture<HostElement>(
        html`<host-element
          .controllerOptions=${{
            showDelay: 0,
            hideDelay: 0,
            longPressDelay: 0,
            enableLongPress: true,
            mobileBreakpoint: 9999, // Ensure we get the mobile view
          }}
        ></host-element>`,
      );

      // Touch the host element
      host.dispatchEvent(getTouchStartEvent(host));
      await new Promise(resolve => {
        setTimeout(resolve, 0);
      });

      expect(host.controller?.getTemplate()).not.to.equal(nothing);

      await host.updateComplete;

      // Touch the backdrop
      host.shadowRoot
        ?.querySelector('#touch-backdrop')
        ?.dispatchEvent(new TouchEvent('touchstart'));
      await new Promise(resolve => {
        setTimeout(resolve, 150);
      });

      expect(host.controller?.getTemplate()).to.equal(nothing);
    });
  });
});
