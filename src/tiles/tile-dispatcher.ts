import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
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
import './hover/tile-hover-pane';
import './list/tile-list';
import './list/tile-list-compact';
import './list/tile-list-compact-header';
import type { TileHoverPane } from './hover/tile-hover-pane';
import {
  HoverPaneController,
  HoverPaneControllerInterface,
  HoverPaneProperties,
  HoverPaneProviderInterface,
} from './hover/hover-pane-controller';

@customElement('tile-dispatcher')
export class TileDispatcher
  extends LitElement
  implements
    SharedResizeObserverResizeHandlerInterface,
    HoverPaneProviderInterface
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

  private hoverPaneController?: HoverPaneControllerInterface;

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
    const hoverPaneTemplate =
      this.hoverPaneController?.getTemplate() ?? nothing;
    return html`
      <div id="container" class=${isGridMode ? 'hoverable' : nothing}>
        ${this.tileDisplayMode === 'list-header'
          ? this.headerTemplate
          : this.tileTemplate}
        ${hoverPaneTemplate}
      </div>
    `;
  }

  protected firstUpdated(): void {
    if (this.shouldPrepareHoverPane) {
      this.hoverPaneController = new HoverPaneController(this, {
        mobileBreakpoint: this.mobileBreakpoint,
        enableLongPress: false,
      });
    }
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
        href="${this.linkTileHref}"
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

  private get linkTileHref() {
    // Use the server-specified href if available.
    // Otherwise, construct a details page URL from the item identifier.
    return (
      `${this.baseNavigationUrl}${this.model?.href}` ??
      `${this.baseNavigationUrl}/details/${this.model?.identifier}`
    );
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

  /** @inheritdoc */
  getHoverPane(): TileHoverPane | undefined {
    return this.hoverPane;
  }

  /** @inheritdoc */
  getHoverPaneProps(): HoverPaneProperties {
    return this;
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

      #touch-backdrop {
        position: fixed;
        width: 100vw;
        height: 100vh;
        top: 0;
        left: 0;
        z-index: 1;
        background: transparent;
      }

      tile-hover-pane {
        position: absolute;
        top: 0;
        left: -9999px;
        z-index: 2;
      }
    `;
  }
}
