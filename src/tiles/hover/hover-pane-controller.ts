import type { SortParam } from '@internetarchive/search-service';
import {
  html,
  HTMLTemplateResult,
  nothing,
  ReactiveController,
  ReactiveControllerHost,
} from 'lit';
import type { TileModel } from '../../models';
import type { CollectionTitles } from '../../data-source/models';

type HoverPaneState = 'hidden' | 'shown' | 'fading-out';

// the attachment point of the hover pane relative
// can be either the mouse cursor or near the host element
// in the case of mouse navigation, we want it to follow the cursor
// in the case of keyboard navigation, we want it to appear near the host element
type HoverPaneAttachment = 'host' | 'cursor';

export interface HoverPaneProperties {
  model?: TileModel;
  baseNavigationUrl?: string;
  baseImageUrl?: string;
  loggedIn: boolean;
  suppressBlurring: boolean;
  sortParam: SortParam | null;
  collectionTitles?: CollectionTitles;
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

export interface ToggleHoverPaneOptions {
  coords: { x: number; y: number };
  enableTouchBackdrop?: boolean;
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

  /**
   * Requests to manually toggle the state of the hover pane.
   * If the hover pane is already shown, it will begin fading out and then
   * subsequently be hidden and removed. If the hover pane is already fading
   * out or hidden, it will fade back in and be shown.
   */
  toggleHoverPane(options: ToggleHoverPaneOptions): void;
}

const clamp = (val: number, min = -Infinity, max = Infinity) =>
  Math.max(min, Math.min(val, max));

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
  private mobileBreakpoint?: number = 600;

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
  private enableLongPress: boolean = false;

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

  /**
   * Whether the touch backdrop should currently be rendered irrespective of other touch
   * interactions being enabled.
   */
  private forceTouchBackdrop: boolean = false;

  /** A record of the last mouse position on the host element, for positioning the hover pane */
  private lastPointerClientPos = { x: 0, y: 0 };

  constructor(
    /** The host element to which this controller should attach listeners */
    private readonly host: ReactiveControllerHost &
      HoverPaneProviderInterface &
      HTMLElement,
    /** Options for adjusting the hover pane behavior (offsets, delays, etc.) */
    options: HoverPaneControllerOptions = {},
  ) {
    this.mobileBreakpoint = options.mobileBreakpoint ?? this.mobileBreakpoint;
    this.offsetX = options.offsetX ?? this.offsetX;
    this.offsetY = options.offsetY ?? this.offsetY;
    this.showDelay = options.showDelay ?? this.showDelay;
    this.hideDelay = options.hideDelay ?? this.hideDelay;
    this.longPressDelay = options.longPressDelay ?? this.longPressDelay;
    this.enableLongPress = options.enableLongPress ?? this.enableLongPress;

    this.host.addController(this);
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
    this.hoverPaneProps = this.host.getHoverPaneProps();

    return this.shouldRenderHoverPane
      ? html` ${this.touchBackdropTemplate}
          <tile-hover-pane
            popover
            tabindex="-1"
            .model=${this.hoverPaneProps?.model}
            .baseNavigationUrl=${this.hoverPaneProps?.baseNavigationUrl}
            .baseImageUrl=${this.hoverPaneProps?.baseImageUrl}
            .loggedIn=${this.hoverPaneProps?.loggedIn}
            .suppressBlurring=${this.hoverPaneProps?.suppressBlurring}
            .sortParam=${this.hoverPaneProps?.sortParam}
            .collectionTitles=${this.hoverPaneProps?.collectionTitles}
            .mobileBreakpoint=${this.mobileBreakpoint}
            .currentWidth=${window.innerWidth}
          ></tile-hover-pane>`
      : nothing;
  }

  /** @inheritdoc */
  toggleHoverPane(options: ToggleHoverPaneOptions): void {
    if (this.hoverPaneState === 'shown') {
      this.fadeOutHoverPane();
      this.forceTouchBackdrop = false;
    } else {
      this.lastPointerClientPos = options.coords;
      this.forceTouchBackdrop = options.enableTouchBackdrop ?? false;
      this.showHoverPane('cursor');
    }
  }

  /**
   * Produces a template for the invisible touch capture backdrop that
   * is used to cancel the hover pane on touch devices. We want any
   * touch interaction on the backdrop to remove the hover pane, and
   * we don't want to bubble up mouse events that would otherwise
   * affect the state of the hover pane (e.g., fading it back in).
   */
  private get touchBackdropTemplate(): HTMLTemplateResult | typeof nothing {
    return this.showTouchBackdrop
      ? html`<div
          id="touch-backdrop"
          @touchstart=${this.handleBackdropInteraction}
          @touchmove=${this.handleBackdropInteraction}
          @touchend=${this.handleBackdropInteraction}
          @touchcancel=${this.handleBackdropInteraction}
          @mouseenter=${(e: MouseEvent) => e.stopPropagation()}
          @mousemove=${(e: MouseEvent) => e.stopPropagation()}
          @mouseleave=${(e: MouseEvent) => e.stopPropagation()}
        ></div>`
      : nothing;
  }

  private get showTouchBackdrop(): boolean {
    return (
      (this.isTouchEnabled && this.enableLongPress) || this.forceTouchBackdrop
    );
  }

  /** Whether to use the mobile layout */
  private get isMobileView(): boolean {
    return !!this.mobileBreakpoint && window.innerWidth < this.mobileBreakpoint;
  }

  private get isHoverEnabled(): boolean {
    return window.matchMedia('(hover: hover)').matches;
  }

  private get isTouchEnabled(): boolean {
    return (
      'ontouchstart' in window &&
      window.matchMedia('(any-pointer: coarse)').matches
    );
  }

  /** Whether this controller should currently render its hover pane. */
  private get shouldRenderHoverPane(): boolean {
    return this.hoverPaneState !== 'hidden';
  }

  /**
   * Returns the desired top/left offsets (in pixels) for this tile's hover pane.
   * The desired offsets balance positioning the hover pane under the primary pointer
   * while preventing it from flowing outside the viewport. The returned offsets are
   * relative to the viewport, intended to position the pane as a popover element.
   *
   * These offsets are only valid if the hover pane is already rendered with its
   * correct width and height. If the hover pane is not present, the returned offsets
   * will simply represent the current pointer position.
   */
  private makePaneDesiredOffsets(attachment: HoverPaneAttachment): {
    top: number;
    left: number;
  } {
    // Try to find offsets for the hover pane that:
    //  (a) cause it to lie entirely within the viewport, and
    //  (b) to the extent possible, minimize the distance between the
    //      nearest corner of the hover pane and the mouse position
    //      (with some additional offsets applied after the fact).

    let [left, top] = [0, 0];
    switch (attachment) {
      case 'host':
        const hostRect = this.host.getBoundingClientRect();
        // slight offset from host top left corner
        left = hostRect.left + 20;
        top = hostRect.top + 30;
        break;
      case 'cursor':
        left = this.lastPointerClientPos.x;
        top = this.lastPointerClientPos.y;
        break;
    }

    // Flip the hover pane according to which quadrant of the viewport the coordinates are in.
    // (Similar to how Wikipedia's link hover panes work)
    const flipHorizontal = left > window.innerWidth / 2;
    const flipVertical = top > window.innerHeight / 2;

    const hoverPaneRect = this.hoverPane?.getBoundingClientRect();
    if (hoverPaneRect) {
      // If we need to flip the hover pane, do so by subtracting its width/height from left/top
      if (flipHorizontal) {
        left -= hoverPaneRect.width;
      }
      if (flipVertical) {
        top -= hoverPaneRect.height;
      }

      // Apply desired offsets from the target position
      left += (flipHorizontal ? -1 : 1) * this.offsetX;
      top += (flipVertical ? -1 : 1) * this.offsetY;

      // On mobile view, shunt the hover pane to avoid overflowing the viewport
      if (this.isMobileView) {
        left = clamp(left, 20, window.innerWidth - hoverPaneRect.width - 20);
        top = clamp(top, 20, window.innerHeight - hoverPaneRect.height - 20);
      }
    }

    left += window.scrollX;
    top += window.scrollY;

    return { left, top };
  }

  /**
   * Adds to the host element all the listeners necessary to make the
   * hover pane functional.
   */
  private attachListeners(): void {
    if (this.isHoverEnabled) {
      this.host.addEventListener('mouseenter', this.handleMouseEnter);
      this.host.addEventListener('mousemove', this.handleMouseMove);
      this.host.addEventListener('mouseleave', this.handleMouseLeave);
    }

    this.host.addEventListener('focus', this.handleFocus);
    this.host.addEventListener('blur', this.handleBlur);
    this.host.addEventListener('keyup', this.handleKeyUp);
    this.host.addEventListener('keydown', this.handleKeyDown);

    if (this.isTouchEnabled && this.enableLongPress) {
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

    this.host.removeEventListener('focus', this.handleFocus);
    this.host.removeEventListener('blur', this.handleBlur);
    this.host.removeEventListener('keyup', this.handleKeyUp);
    this.host.removeEventListener('keydown', this.handleKeyDown);
  }

  private handleFocus = (): void => {
    if (this.hoverPaneState === 'hidden') {
      this.showHoverPane('host');
    }
  };

  private handleBlur = (): void => {
    if (this.hoverPaneState !== 'hidden') {
      this.fadeOutHoverPane();
    }
  };

  private handleKeyDown = (e: KeyboardEvent): void => {
    if (
      (e.key === 'ArrowDown' || e.key === 'ArrowUp') &&
      this.hoverPaneState !== 'hidden'
    ) {
      e.preventDefault();
    }
  };

  private handleKeyUp = (e: KeyboardEvent): void => {
    if (e.key === 'ArrowDown' && this.hoverPaneState !== 'hidden') {
      if (this.hoverPane) {
        this.hoverPane.tabIndex = 1;
        this.hoverPane.focus();
      }
    }
    if (
      (e.key === 'ArrowUp' || e.key === 'Escape') &&
      this.hoverPaneState !== 'hidden'
    ) {
      if (this.hoverPane) {
        this.hoverPane.tabIndex = -1;
      }
      this.hoverPaneState = 'hidden';
      this.fadeOutHoverPane();
      console.log('focusing back to host', this.host);
      this.host.focus();
    }
  };

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
      this.lastPointerClientPos = { x: e.clientX, y: e.clientY };
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
  private handleTouchStart = (e: TouchEvent): void => {
    clearTimeout(this.longPressTimer);

    if (e.touches.length === 1) {
      this.longPressTimer = window.setTimeout(() => {
        if (this.hoverPaneState === 'hidden') {
          this.showHoverPane('cursor');
        }
      }, this.longPressDelay);

      this.lastPointerClientPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    }
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
  private handleBackdropInteraction = (e: Event): void => {
    if (this.hoverPaneState !== 'hidden') {
      this.fadeOutHoverPane();
    }
    e.stopPropagation();
  };

  /**
   * Aborts and restarts the timer for showing the hover pane.
   */
  private restartShowHoverPaneTimer(): void {
    clearTimeout(this.showTimer);
    this.showTimer = window.setTimeout(() => {
      this.showHoverPane('cursor');
    }, this.showDelay);
  }

  /**
   * Causes this tile's hover pane to be rendered, positioned, and made visible.
   */
  private async showHoverPane(attachment: HoverPaneAttachment): Promise<void> {
    this.hoverPaneState = 'shown';
    this.host.requestUpdate();

    // Wait for the state update to render the hover pane
    await this.host.updateComplete;

    // Ensure the hover pane element is still in the document before showing,
    // as it might have been removed by the previous update.
    if (!this.hoverPane?.isConnected) return;

    this.hoverPane?.showPopover?.();
    await new Promise(resolve => {
      // Pane sizes aren't accurate until next frame
      requestAnimationFrame(resolve);
    });

    // Apply the correct positioning to the hover pane
    this.repositionHoverPane(attachment);

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
  private repositionHoverPane(attachment: HoverPaneAttachment): void {
    if (!this.hoverPane) return;

    const { top, left } = this.makePaneDesiredOffsets(attachment);

    console.log('repositionHoverPane', top, left);

    this.hoverPane.style.top = `${top}px`;
    this.hoverPane.style.left = `${left}px`;
  }
}
