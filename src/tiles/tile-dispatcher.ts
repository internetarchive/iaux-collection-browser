import { css, html, nothing, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { msg } from '@lit/localize';
import type {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import type { TileDisplayMode } from '../models';
import type { CollectionTitles } from '../data-source/models';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './grid/search-tile';
import './hover/tile-hover-pane';
import './list/tile-list';
import './list/tile-list-compact';
import './list/tile-list-compact-header';
import type { TileHoverPane } from './hover/tile-hover-pane';
import { BaseTileComponent } from './base-tile-component';
import { SimpleLayoutType } from './models';
import {
  HoverPaneController,
  HoverPaneControllerInterface,
  HoverPaneProperties,
  HoverPaneProviderInterface,
} from './hover/hover-pane-controller';
import { srOnlyStyle } from '../styles/sr-only';

@customElement('tile-dispatcher')
export class TileDispatcher
  extends BaseTileComponent
  implements
    SharedResizeObserverResizeHandlerInterface,
    HoverPaneProviderInterface
{
  /*
   * Reactive properties inherited from BaseTileComponent:
   *  - model?: TileModel;
   *  - currentWidth?: number;
   *  - currentHeight?: number;
   *  - baseNavigationUrl?: string;
   *  - baseImageUrl?: string;
   *  - collectionPagePath?: string;
   *  - sortParam: SortParam | null = null;
   *  - defaultSortParam: SortParam | null = null;
   *  - creatorFilter?: string;
   *  - mobileBreakpoint?: number;
   *  - loggedIn = false;
   *  - suppressTileBlurring = false;
   *  - useLocalTime = false;
   */

  @property({ type: String }) tileDisplayMode?: TileDisplayMode;

  @property({ type: Boolean }) isManageView = false;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @property({ type: Object })
  collectionTitles?: CollectionTitles;

  @property({ type: Boolean }) showTvClips = false;

  /** What type of simple layout to use in grid mode, if any */
  @property({ type: String }) simpleLayoutType: SimpleLayoutType = 'none';

  /** Whether this tile should include a hover pane at all (for applicable tile modes) */
  @property({ type: Boolean }) enableHoverPane = false;

  @property({ type: String }) manageCheckTitle = msg(
    'Remove this item from the list',
  );

  private hoverPaneController?: HoverPaneControllerInterface;

  @query('#container')
  private container!: HTMLDivElement;

  @query('tile-hover-pane')
  private hoverPane?: TileHoverPane;

  @query('.tile-link')
  private tileLinkElement?: HTMLAnchorElement;

  acquireFocus(): void {
    this.tileLinkElement?.focus();
  }

  releaseFocus(): void {
    this.tileLinkElement?.blur();
  }

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
      <div id="container" class=${isGridMode ? 'hoverable' : ''}>
        ${this.tileDisplayMode === 'list-header'
          ? this.headerTemplate
          : this.tileTemplate}
        ${this.manageCheckTemplate} ${hoverPaneTemplate}
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
    const { currentWidth, sortParam, defaultSortParam, mobileBreakpoint } =
      this;
    return html`
      <tile-list-compact-header
        class="header"
        .currentWidth=${currentWidth}
        .sortParam=${sortParam ?? defaultSortParam}
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
        href=${this.linkTileHref}
        aria-label=${this.model?.title ?? 'Untitled item'}
        aria-describedby="link-aria-description"
        aria-haspopup=${this.shouldPrepareHoverPane ? 'dialog' : 'false'}
        title=${this.shouldPrepareHoverPane
          ? nothing // Don't show title tooltips when we have the tile info popups
          : ifDefined(this.model?.title)}
        @click=${this.handleLinkClicked}
        @contextmenu=${this.handleLinkContextMenu}
        class="tile-link"
      >
        ${this.tile}
      </a>
      <div id="link-aria-description" class="sr-only">
        ${msg('Press Down Arrow to preview item details')}
      </div>
    `;
  }

  private get linkTileHref(): string | typeof nothing {
    if (!this.model?.identifier || this.baseNavigationUrl == null)
      return nothing;

    // Use the server-specified href if available.
    // Otherwise, construct a details page URL from the item identifier.
    if (this.model.href) {
      return `${this.baseNavigationUrl}${this.model.href}`;
    }

    return this.displayValueProvider.itemPageUrl(
      this.model.identifier,
      this.model.mediatype === 'collection',
    );
  }

  private get manageCheckTemplate() {
    if (!this.isManageView || this.tileDisplayMode !== 'grid') return nothing;

    return html`
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle}
          ?checked=${this.model?.checked}
          @change=${this.handleLinkClicked}
        />
      </div>
    `;
  }

  /**
   * Whether hover pane behavior should be prepared for this tile
   * (e.g., whether mouse listeners should be attached, etc.)
   */
  private get shouldPrepareHoverPane(): boolean {
    return (
      this.enableHoverPane &&
      !!this.tileDisplayMode &&
      TileDispatcher.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode] &&
      this.model?.mediatype !== 'search' && // don't show hover panes on search tiles
      !this.model?.captureDates // don't show hover panes on web archive tiles
    );
  }

  private get isHoverEnabled(): boolean {
    return window.matchMedia('(hover: hover)').matches;
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
        'resizeObserver',
      ) as SharedResizeObserverInterface;
      this.stopResizeObservation(previousObserver);
      this.startResizeObservation();
    }
  }

  /**
   * Handler for when the tile link is left-clicked. Emits the `resultSelected` event.
   * In manage view, it also checks/unchecks the tile.
   */
  private handleLinkClicked(e: Event): void {
    if (this.isManageView) {
      e.preventDefault();
      if (this.model) this.model.checked = !this.model.checked;
    }

    this.dispatchEvent(
      new CustomEvent('resultSelected', { detail: this.model }),
    );
  }

  /**
   * Handler for when the tile link is right-clicked.
   * In manage view, it opens the item in a new tab. Otherwise, does nothing.
   */
  private handleLinkContextMenu(e: Event): void {
    if (this.isManageView && this.linkTileHref !== nothing) {
      e.preventDefault();
      window.open(this.linkTileHref, '_blank');
    }
  }

  private tileInfoButtonPressed(
    e: CustomEvent<{ x: number; y: number }>,
  ): void {
    this.hoverPaneController?.toggleHoverPane({
      coords: e.detail,
      enableTouchBackdrop: true,
    });
  }

  private get tile() {
    const {
      model,
      collectionPagePath,
      baseNavigationUrl,
      currentWidth,
      currentHeight,
      sortParam,
      creatorFilter,
      mobileBreakpoint,
      defaultSortParam,
    } = this;

    if (!model) return nothing;

    switch (this.tileDisplayMode) {
      case 'grid':
        switch (model.mediatype) {
          case 'collection':
            return html`<collection-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
              .creatorFilter=${creatorFilter}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;
          case 'account':
            return html`<account-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
              .creatorFilter=${creatorFilter}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${!this.isHoverEnabled}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;
          case 'search':
            return html`<search-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
              .creatorFilter=${creatorFilter}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${false}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </search-tile>`;
          default:
            return html`<item-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
              .baseImageUrl=${this.baseImageUrl}
              .sortParam=${sortParam}
              .defaultSortParam=${defaultSortParam}
              .creatorFilter=${creatorFilter}
              .loggedIn=${this.loggedIn}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .simpleLayoutType=${this.simpleLayoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${!this.isHoverEnabled}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`;
        }
      case 'list-compact':
        return html`<tile-list-compact
          .model=${model}
          .collectionPagePath=${collectionPagePath}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .defaultSortParam=${defaultSortParam}
          .creatorFilter=${creatorFilter}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;
      case 'list-detail':
        return html`<tile-list
          .model=${model}
          .collectionPagePath=${collectionPagePath}
          .collectionTitles=${this.collectionTitles}
          .currentWidth=${currentWidth}
          .currentHeight=${currentHeight}
          .baseNavigationUrl=${baseNavigationUrl}
          .sortParam=${sortParam}
          .defaultSortParam=${defaultSortParam}
          .creatorFilter=${creatorFilter}
          .mobileBreakpoint=${mobileBreakpoint}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .suppressBlurring=${this.suppressBlurring}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list>`;
      default:
        return nothing;
    }
  }

  static get styles() {
    return [
      srOnlyStyle,
      css`
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

        search-tile {
          --tileBorderColor: #555555;
          --tileBackgroundColor: #666666;
          --imageBlockBackgroundColor: #666666;
          --iconFillColor: #2c2c2c;
        }

        #container {
          position: relative;
          height: 100%;
          border-radius: 4px;
        }

        #container.hoverable a:focus,
        #container.hoverable a:hover {
          box-shadow: var(
            --tileHoverBoxShadow,
            0 0 6px 2px rgba(8, 8, 32, 0.8)
          );
          transition: box-shadow 0.1s ease;
        }

        a {
          display: block;
          height: 100%;
          color: unset;
          text-decoration: none;
          transition: transform 0.05s ease;
          border-radius: 4px;
          outline: none;
        }

        a :first-child {
          display: block;
          height: 100%;
        }

        .manage-check {
          position: absolute;
          right: 0;
          top: 0;
          border: 5px solid #2c2c2c;
          border-radius: 3px;
          background-color: #2c2c2c;
          z-index: 1;
        }

        .manage-check > input[type='checkbox'] {
          display: block;
          margin: 0;
        }

        #touch-backdrop {
          position: fixed;
          width: 100vw;
          height: 100vh;
          top: 0;
          left: 0;
          z-index: 2;
          background: transparent;
        }

        tile-hover-pane {
          position: absolute;
          top: 0;
          left: -9999px;
          z-index: 2;
        }
      `,
    ];
  }
}
