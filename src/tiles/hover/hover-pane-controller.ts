import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { SortParam } from '@internetarchive/search-service';
import {
  html,
  HTMLTemplateResult,
  nothing,
  ReactiveController,
  ReactiveControllerHost,
} from 'lit';
import type { TileModel } from '../../models';

type HoverPaneState = 'hidden' | 'shown' | 'fading-out';

export interface HoverPaneProperties {
  model?: TileModel;
  baseNavigationUrl?: string;
  baseImageUrl?: string;
  loggedIn: boolean;
  sortParam: SortParam | null;
  collectionNameCache?: CollectionNameCacheInterface;
}

export interface HoverPaneControllerOptions {
  offsetX?: number;
  offsetY?: number;
  enableLongPress?: boolean;
  showDelay?: number;
  hideDelay?: number;
  longPressDelay?: number;
  mobileBreakpoint?: number;
}

/** A common interface for providing a hover pane element. */
export interface HoverPaneProviderInterface {
  /** Returns the provider's currently rendered hover pane element. */
  getHoverPane(): HTMLElement | undefined;
  /** Returns properties that should be passed to the hover pane. */
  getHoverPaneProps(): HoverPaneProperties;
}

/**
 * An interface for interacting with hover pane controllers (e.g.,
 * to retrieve their current hover pane template).
 */
export interface HoverPaneControllerInterface extends ReactiveController {
  /**
   * Returns the hover pane template to render based on this controller's
   * current state. The returned template may be `nothing` if the hover
   * pane should not currently be rendered.
   */
  getTemplate(): HTMLTemplateResult | typeof nothing;
}

export class HoverPaneController implements HoverPaneControllerInterface {
  /**
   * The hover pane element attached to this controller's host.
   */
  private hoverPane?: HTMLElement;

  /**
   * The properties to be passed to the hover pane element
   */
  private hoverPaneProps?: HoverPaneProperties;

  /**
   * The breakpoint (in pixels) below which the mobile interface should be used.
   */
  private mobileBreakpoint?: number;

  /**
   * The number of horizontal pixels the hover pane should be offset from the
   * pointer position.
   */
  private offsetX: number = -10;

  /**
   * The number of vertical pixels the hover pane should be offset from the
   * pointer position.
   */
  private offsetY: number = 15;

  /**
   * The delay between the mouse idling within the host element and when the hover
   * pane should begin fading in (in milliseconds).
   */
  private showDelay: number = 300;

  /**
   * The delay between when the mouse leaves the host element and when the hover
   * pane should begin fading out (in milliseconds).
   */
  private hideDelay: number = 100;

  /**
   * The delay between when a touch event begins on the host element and when the
   * hover pane should begin fading in (in milliseconds).
   */
  private longPressDelay: number = 600;

  /**
   * Whether long press interactions should cause the hover pane to appear (when
   * below the mobile breakpoint).
   */
  private enableLongPress: boolean = true;

  /**
   * Used to control the current state of this provider's hover pane.
   *  - `'hidden'` => The hover pane is not present at all.
   *  - `'shown'` => The hover pane is either fading in or fully visible.
   *  - `'fading-out'` => The hover pane is fading out and about to be removed.
   */
  private hoverPaneState: HoverPaneState = 'hidden';

  /** The timer ID for showing the hover pane */
  private showTimer?: number;

  /** The timer ID for hiding the hover pane */
  private hideTimer?: number;

  /** The timer ID for recognizing a long press event */
  private longPressTimer?: number;

  /** A record of the last mouse position on the host element, for positioning the hover pane */
  private lastMouseClientPos = { x: 0, y: 0 };

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost &
      HoverPaneProviderInterface &
      HTMLElement,
    /** Options for adjusting the hover pane behavior (offsets, delays, etc.) */
    options: HoverPaneControllerOptions = {}
  ) {
    this.host.addController(this);
    Object.assign(this, options);
  }

  hostConnected(): void {
    this.attachListeners();
  }

  hostDisconnected(): void {
    this.detachListeners();
  }

  hostUpdated(): void {
    this.hoverPane = this.host.getHoverPane();
    this.hoverPaneProps = this.host.getHoverPaneProps();
  }

  /** @inheritdoc */
  getTemplate(): HTMLTemplateResult | typeof nothing {
    return this.shouldRenderHoverPane
      ? html` ${this.touchBackdropTemplate}
          <tile-hover-pane
            .model=${this.hoverPaneProps?.model}
            .baseNavigationUrl=${this.hoverPaneProps?.baseNavigationUrl}
            .baseImageUrl=${this.hoverPaneProps?.baseImageUrl}
            .loggedIn=${this.hoverPaneProps?.loggedIn}
            .sortParam=${this.hoverPaneProps?.sortParam}
            .collectionNameCache=${this.hoverPaneProps?.collectionNameCache}
          ></tile-hover-pane>`
      : nothing;
  }

  private get touchBackdropTemplate(): HTMLTemplateResult | typeof nothing {
    return this.isMobile && this.enableLongPress
      ? html`<div id="touch-backdrop" @touchstart=${this.clearHoverPane}></div>`
      : nothing;
  }

  /** Whether to use the mobile layout */
  private get isMobile(): boolean {
    return !!this.mobileBreakpoint && window.innerWidth < this.mobileBreakpoint;
  }

  /** Whether this controller should currently render its hover pane. */
  private get shouldRenderHoverPane(): boolean {
    return this.hoverPaneState !== 'hidden';
  }

  /**
   * Returns the desired top/left offsets (in pixels) for this tile's hover pane.
   * The desired offsets balance positioning the hover pane under the mouse pointer
   * while preventing it from flowing outside the viewport. The returned offsets are
   * given relative to this tile's content box.
   *
   * These offsets are only valid if the hover pane is already rendered with its
   * correct width and height. If the hover pane is not present, the returned offsets
   * will simply represent the current mouse position.
   */
  private get hoverPaneDesiredOffsets(): { top: number; left: number } {
    // Try to find offsets for the hover pane that:
    //  (a) cause it to lie entirely within the viewport, and
    //  (b) to the extent possible, minimize the distance between the
    //      nearest corner of the hover pane and the mouse position
    //      (with some additional offsets applied after the fact).

    let [left, top] = [this.lastMouseClientPos.x, this.lastMouseClientPos.y];

    // Flip the hover pane according to which quadrant of the viewport the mouse is in.
    // (Similar to how Wikipedia's link hover panes work)
    const flipHorizontal = this.lastMouseClientPos.x > window.innerWidth / 2;
    const flipVertical = this.lastMouseClientPos.y > window.innerHeight / 2;

    const hoverPaneRect = this.hoverPane?.getBoundingClientRect();
    if (hoverPaneRect) {
      // If we need to flip the hover pane, do so by subtracting its width/height from left/top
      if (flipHorizontal) {
        left -= hoverPaneRect.width;
      }
      if (flipVertical) {
        top -= hoverPaneRect.height;
      }

      // Apply desired offsets from the mouse position
      left += (flipHorizontal ? -1 : 1) * this.offsetX;
      top += (flipVertical ? -1 : 1) * this.offsetY;
    }

    // Subtract off the tile's own offsets
    const hostRect = this.host.getBoundingClientRect();
    left -= hostRect.left;
    top -= hostRect.top;

    return { left, top };
  }

  /**
   * Adds to the host element all the listeners necessary to make the
   * hover pane functional.
   */
  private attachListeners(): void {
    this.host.addEventListener('mouseenter', this.handleMouseEnter);
    this.host.addEventListener('mousemove', this.handleMouseMove);
    this.host.addEventListener('mouseleave', this.handleMouseLeave);

    if (this.enableLongPress) {
      this.host.addEventListener('touchstart', this.handleTouchStart);
      this.host.addEventListener('touchmove', this.handleLongPressCancel);
      this.host.addEventListener('touchend', this.handleLongPressCancel);
      this.host.addEventListener('touchcancel', this.handleLongPressCancel);
      this.host.addEventListener('contextmenu', this.handleContextMenu);
    }
  }

  /**
   * Removes all the hover pane listeners from the host element.
   */
  private detachListeners(): void {
    this.host.removeEventListener('mouseenter', this.handleMouseEnter);
    this.host.removeEventListener('mousemove', this.handleMouseMove);
    this.host.removeEventListener('mouseleave', this.handleMouseLeave);
    this.host.removeEventListener('touchstart', this.handleTouchStart);
    this.host.removeEventListener('touchmove', this.handleLongPressCancel);
    this.host.removeEventListener('touchend', this.handleLongPressCancel);
    this.host.removeEventListener('touchcancel', this.handleLongPressCancel);
    this.host.removeEventListener('contextmenu', this.handleContextMenu);
  }

  /**
   * Handler for the mouseenter event on the host element.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleMouseEnter = (e: MouseEvent): void => {
    // Delegate to the mousemove handler, as they are currently processed identically
    this.handleMouseMove(e);
  };

  /**
   * Handler for the mousemove event on the host element.
   * Aborts any pending hide/fade-out for the hover pane, and restarts the
   * timer to show it.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleMouseMove = (e: MouseEvent): void => {
    // The mouse is within the tile, so abort any pending removal of the hover pane
    clearTimeout(this.hideTimer);

    // If the hover pane is currently fading out, just make it fade back in where it is
    if (this.hoverPaneState === 'fading-out') {
      this.hoverPaneState = 'shown';
      this.hoverPane?.classList.add('fade-in');
    }

    // Restart the timer to show the hover pane anytime the mouse moves within the tile
    if (this.hoverPaneState === 'hidden') {
      this.restartShowHoverPaneTimer();
      this.lastMouseClientPos = { x: e.clientX, y: e.clientY };
    }
  };

  /**
   * Handler for the mouseleave event on the host element.
   * Hides the hover pane if present, and aborts the timer for showing it.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleMouseLeave = (): void => {
    // Abort any timer to show the hover pane, as the mouse has left the tile
    clearTimeout(this.showTimer);

    // Hide the hover pane if it's already been shown
    clearTimeout(this.hideTimer);
    if (this.hoverPaneState !== 'hidden') {
      this.hideTimer = window.setTimeout(() => {
        this.fadeOutHoverPane();
      }, this.hideDelay);
    }
  };

  /**
   * Handler for the touchstart event on the host element.
   * Begins the timer for recognizing a long press event.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleTouchStart = (): void => {
    clearTimeout(this.longPressTimer);
    this.longPressTimer = window.setTimeout(() => {
      if (this.hoverPaneState === 'hidden') {
        this.showHoverPane();
      }
    }, this.longPressDelay);
  };

  /**
   * Handler for events that should cancel a pending long press event
   * (touchmove, touchend, touchcancel). Aborts the timer for recognizing
   * a long press.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleLongPressCancel = (): void => {
    clearTimeout(this.longPressTimer);
  };

  /**
   * Handler for the contextmenu event, which should be suppressed during
   * mobile long-press events on the host element.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private handleContextMenu = (e: Event): void => {
    e.preventDefault();
  };

  /**
   * Immediately causes the hover pane to begin fading out, if it is present.
   */
  // NB: Arrow function so 'this' remains bound to the controller
  private clearHoverPane = (): void => {
    if (this.hoverPaneState !== 'hidden') {
      this.fadeOutHoverPane();
    }
  };

  /**
   * Aborts and restarts the timer for showing the hover pane.
   */
  private restartShowHoverPaneTimer(): void {
    clearTimeout(this.showTimer);
    this.showTimer = window.setTimeout(() => {
      this.showHoverPane();
    }, this.showDelay);
  }

  /**
   * Causes this tile's hover pane to be rendered, positioned, and made visible.
   */
  private async showHoverPane(): Promise<void> {
    this.hoverPaneState = 'shown';
    this.host.requestUpdate();

    // Wait for the state update to render the hover pane
    await this.host.updateComplete;
    await new Promise(resolve => {
      // Pane sizes aren't accurate until next frame
      requestAnimationFrame(resolve);
    });

    // Apply the correct positioning to the hover pane
    this.repositionHoverPane();

    // The hover pane is initially not visible (to avoid it shifting around
    // while being positioned). Since it now has the correct positioning, we
    // can make it visible and begin its fade-in animation.
    this.hoverPane?.classList.add('visible', 'fade-in');
  }

  /**
   * Causes this tile's hover pane to begin fading out and starts
   * the timer for it to be removed.
   */
  private fadeOutHoverPane(): void {
    this.hoverPaneState = 'fading-out';
    this.hoverPane?.classList.remove('fade-in');

    clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => {
      this.hoverPaneState = 'hidden';
      this.host.requestUpdate();
    }, 100);
  }

  /**
   * Positions the hover pane with the correct offsets.
   */
  private repositionHoverPane(): void {
    if (!this.hoverPane) return;

    const { top, left } = this.hoverPaneDesiredOffsets;
    this.hoverPane.style.top = `${top}px`;
    this.hoverPane.style.left = `${left}px`;
  }
}
