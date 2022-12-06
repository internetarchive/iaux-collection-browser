import {
  css,
  html,
  HTMLTemplateResult,
  LitElement,
  nothing,
  PropertyValues,
} from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
import type { SortParam } from '@internetarchive/search-service';
import type { TileDisplayMode, TileModel } from '../models';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './grid/tile-hover-pane';
import './list/tile-list';
import './list/tile-list-compact';
import './list/tile-list-compact-header';
import type { TileHoverPane } from './grid/tile-hover-pane';

type HoverPaneState = 'hidden' | 'shown' | 'fading-out';

@customElement('tile-dispatcher')
export class TileDispatcher
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) tileDisplayMode?: TileDisplayMode;

  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Object })
  collectionNameCache?: CollectionNameCacheInterface;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Number }) mobileBreakpoint?: number;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: Boolean }) loggedIn = false;

  /** Whether this tile should include a hover pane at all (for applicable tile modes) */
  @property({ type: Boolean }) enableHoverPane = false;

  /**
   * The delay between the mouse idling within the tile and when the hover
   * pane should begin fading in (in milliseconds).
   */
  @property({ type: Number }) showHoverPaneDelay: number = 300;

  /**
   * The delay between when the mouse leaves the tile and when the hover
   * pane should begin fading out (in milliseconds).
   */
  @property({ type: Number }) hideHoverPaneDelay: number = 100;

  @property({ type: Number }) hoverPaneOffsetX: number = -10;

  @property({ type: Number }) hoverPaneOffsetY: number = 15;

  /**
   * Used to control the current state of this tile's hover pane.
   *  - `'hidden'` => The hover pane is not present at all.
   *  - `'shown'` => The hover pane is either fading in or fully visible.
   *  - `'fading-out'` => The hover pane is fading out and about to be removed.
   */
  @state()
  private hoverPaneState: HoverPaneState = 'hidden';

  /** The timer ID for showing the hover pane */
  @state()
  private showHoverPaneTimer?: number;

  /** The timer ID for hiding the hover pane */
  @state()
  private hideHoverPaneTimer?: number;

  /** A record of the last mouse position on the tile, for positioning the hover pane */
  private lastMouseClientPos = { x: 0, y: 0 };

  @query('#container')
  private container!: HTMLDivElement;

  @query('tile-hover-pane')
  private hoverPane?: TileHoverPane;

  /** Maps each display mode to whether hover panes should appear in that mode */
  private static readonly HOVER_PANE_DISPLAY_MODES: Record<
    TileDisplayMode,
    boolean
  > = {
    grid: true,
    'list-compact': true,
    'list-detail': false,
    'list-header': false,
  };

  render() {
    const isGridMode = this.tileDisplayMode === 'grid';
    return html`
      <div
        id="container"
        class=${isGridMode ? 'hoverable' : nothing}
        @mousemove=${this.shouldPrepareHoverPane
          ? this.handleMouseMove
          : nothing}
        @mouseleave=${this.shouldPrepareHoverPane
          ? this.handleMouseLeave
          : nothing}
      >
        ${this.tileDisplayMode === 'list-header'
          ? this.headerTemplate
          : this.tileTemplate}
        ${this.hoverPaneTemplate}
      </div>
    `;
  }

  private get headerTemplate() {
    const { currentWidth, sortParam, mobileBreakpoint } = this;
    return html`
      <tile-list-compact-header
        class="header"
        .currentWidth=${currentWidth}
        .sortParam=${sortParam}
        .mobileBreakpoint=${mobileBreakpoint}
      >
      </tile-list-compact-header>
    `;
  }

  private get tileTemplate() {
    return html`
      ${this.tileDisplayMode === 'list-detail'
        ? this.tile
        : this.linkTileTemplate}
    `;
  }

  private get linkTileTemplate() {
    return html`
      <a
        href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
        title=${this.shouldPrepareHoverPane
          ? nothing // Don't show title tooltips when we have the tile info popups
          : ifDefined(this.model?.title)}
        @click=${() =>
          this.dispatchEvent(
            new CustomEvent('resultSelected', { detail: this.model })
          )}
      >
        ${this.tile}
      </a>
    `;
  }

  private get hoverPaneTemplate(): HTMLTemplateResult | typeof nothing {
    return this.shouldRenderHoverPane
      ? html`<tile-hover-pane
          .model=${this.model}
          .baseNavigationUrl=${this.baseNavigationUrl}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .sortParam=${this.sortParam}
          .collectionNameCache=${this.collectionNameCache}
        ></tile-hover-pane>`
      : nothing;
  }

  /**
   * Whether hover pane behavior should be prepared for this tile
   * (e.g., whether mouse listeners should be attached, etc.)
   */
  private get shouldPrepareHoverPane(): boolean {
    return (
      this.enableHoverPane &&
      !!this.tileDisplayMode &&
      TileDispatcher.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode]
    );
  }

  /**
   * Whether this tile should currently render its hover pane.
   */
  private get shouldRenderHoverPane(): boolean {
    return this.shouldPrepareHoverPane && this.hoverPaneState !== 'hidden';
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
      left += (flipHorizontal ? -1 : 1) * this.hoverPaneOffsetX;
      top += (flipVertical ? -1 : 1) * this.hoverPaneOffsetY;
    }

    // Subtract off the tile's own offsets
    const tileRect = this.getBoundingClientRect();
    left -= tileRect.left;
    top -= tileRect.top;

    return { left, top };
  }

  handleResize(entry: ResizeObserverEntry): void {
    this.currentWidth = entry.contentRect.width;
    this.currentHeight = entry.contentRect.height;
  }

  disconnectedCallback(): void {
    this.stopResizeObservation(this.resizeObserver);
  }

  private stopResizeObservation(observer?: SharedResizeObserverInterface) {
    observer?.removeObserver({
      handler: this,
      target: this.container,
    });
  }

  private startResizeObservation() {
    this.stopResizeObservation(this.resizeObserver);
    this.resizeObserver?.addObserver({
      handler: this,
      target: this.container,
    });
  }

  updated(props: PropertyValues) {
    if (props.has('resizeObserver')) {
      const previousObserver = props.get(
        'resizeObserver'
      ) as SharedResizeObserverInterface;
      this.stopResizeObservation(previousObserver);
      this.startResizeObservation();
    }
  }

  /**
   * Handler for the mousemove event on this tile.
   * Aborts any pending hide/fade-out for the hover tile, and restarts the
   * timer to show it.
   */
  private handleMouseMove(e: MouseEvent): void {
    // The mouse is within the tile, so abort any pending removal of the hover pane
    clearTimeout(this.hideHoverPaneTimer);

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
  }

  /**
   * Handler for the mouseleave event on this tile.
   * Hides the hover pane if present, and aborts the timer for showing it.
   */
  private handleMouseLeave(): void {
    // Abort any timer to show the hover pane, as the mouse has left the tile
    clearTimeout(this.showHoverPaneTimer);

    // Hide the hover pane if it's already been shown
    clearTimeout(this.hideHoverPaneTimer);
    if (this.hoverPaneState !== 'hidden') {
      this.hideHoverPaneTimer = window.setTimeout(() => {
        this.fadeOutHoverPane();
      }, this.hideHoverPaneDelay);
    }
  }

  /**
   * Aborts and restarts the timer for showing the hover pane.
   */
  private restartShowHoverPaneTimer(): void {
    clearTimeout(this.showHoverPaneTimer);
    this.showHoverPaneTimer = window.setTimeout(() => {
      this.showHoverPane();
    }, this.showHoverPaneDelay);
  }

  /**
   * Causes this tile's hover pane to be rendered, positioned, and made visible.
   */
  private async showHoverPane(): Promise<void> {
    this.hoverPaneState = 'shown';

    // Wait for the state update to render the hover pane
    await this.updateComplete;
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
    this.hideHoverPaneTimer = window.setTimeout(() => {
      this.hoverPaneState = 'hidden';
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

  private get tile() {
    const {
      model,
      baseNavigationUrl,
      currentWidth,
      currentHeight,
      sortParam,
      mobileBreakpoint,
    } = this;

    if (!model) return nothing;

    switch (this.tileDisplayMode) {
      case 'grid':
        switch (model.mediatype) {
          case 'collection':
            return html`<collection-tile
              .model=${model}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            >
            </collection-tile>`;
          case 'account':
            return html`<account-tile
              .model=${model}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
            >
            </account-tile>`;
          default:
            return html`<item-tile
              .model=${model}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .collectionNameCache=${this.collectionNameCache}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${sortParam}
              .loggedIn=${this.loggedIn}
            >
            </item-tile>`;
        }
      case 'list-compact':
        return html`<tile-list-compact
          .model=${model}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list-compact>`;
      case 'list-detail':
        return html`<tile-list
          .model=${model}
          .collectionNameCache=${this.collectionNameCache}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
        >
        </tile-list>`;
      default:
        return nothing;
    }
  }

  static get styles() {
    return css`
      :host {
        display: block;
        height: 100%;
      }

      collection-tile {
        --tileBorderColor: #555555;
        --tileBackgroundColor: #666666;
        --imageBlockBackgroundColor: #666666;
      }

      account-tile {
        --tileBorderColor: #dddddd;
        --imageBlockBackgroundColor: #fcf5e6;
      }

      item-tile {
        --tileBorderColor: #dddddd;
        --imageBlockBackgroundColor: #f1f1f4;
      }

      #container {
        position: relative;
        height: 100%;
        border-radius: 4px;
      }

      #container.hoverable:hover {
        box-shadow: 0 0 6px 2px rgba(8, 8, 32, 0.8);
        transition: box-shadow 0.1s ease;
      }

      #container.hoverable:hover a {
        transform: scale(1.01);
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
        transition: transform 0.05s ease;
      }

      a :first-child {
        display: block;
        height: 100%;
      }

      tile-hover-pane {
        position: absolute;
        top: -1000px;
        left: -1000px;
        z-index: 1;

        /* Don't make it visible until it has been properly positioned */
        visibility: hidden;
      }

      tile-hover-pane.visible {
        visibility: visible;
      }
    `;
  }
}
