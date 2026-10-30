var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var TileDispatcher_1;
import { css, html, nothing } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { localized, msg } from '@lit/localize';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './grid/search-tile';
import './hover/tile-hover-pane';
import './list/tile-list';
import './list/tile-list-compact';
import './list/tile-list-compact-header';
import { BaseTileComponent } from './base-tile-component';
import { HoverPaneController, } from './hover/hover-pane-controller';
import { srOnlyStyle } from '../styles/sr-only';
import { tileActionStyles } from '../styles/tile-action-styles';
let TileDispatcher = class TileDispatcher extends BaseTileComponent {
    constructor() {
        /*
         * Reactive properties inherited from BaseTileComponent:
         *  - model?: TileModel;
         *  - tileActions: TileAction[] = [];
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
        super(...arguments);
        this.isManageView = false;
        this.showTvClips = false;
        /** What type of simplified layout to use in grid mode, if any */
        this.layoutType = 'default';
        /** Whether this tile should include a hover pane at all (for applicable tile modes) */
        this.enableHoverPane = false;
        /**
         * When the mouse enters the grid-mode tile actions area, dispatch a
         * synthetic mouseleave on the host to cancel the hover pane's show timer
         * and hide any visible pane.
         */
        this.handleGridActionsMouseEnter = () => {
            this.dispatchEvent(new MouseEvent('mouseleave', { bubbles: false }));
        };
    }
    static { TileDispatcher_1 = this; }
    acquireFocus() {
        this.tileLinkElement?.focus();
    }
    releaseFocus() {
        this.tileLinkElement?.blur();
    }
    /** Maps each display mode to whether hover panes should appear in that mode */
    static { this.HOVER_PANE_DISPLAY_MODES = {
        grid: true,
        'list-compact': true,
        'list-detail': false,
        'list-header': false,
    }; }
    render() {
        const isGridMode = this.tileDisplayMode === 'grid';
        const hasTileActions = isGridMode && this.showGridTileActions;
        const hoverPaneTemplate = this.hoverPaneController?.getTemplate() ?? nothing;
        const containerClasses = classMap({
            hoverable: isGridMode,
            'has-tile-actions': hasTileActions,
        });
        return html `
      <div id="container" class=${containerClasses}>
        ${this.tileDisplayMode === 'list-header'
            ? this.headerTemplate
            : this.tileTemplate}
        ${this.gridTileActionsTemplate} ${this.manageCheckTemplate}
        ${hoverPaneTemplate}
      </div>
    `;
    }
    firstUpdated() {
        if (this.shouldPrepareHoverPane) {
            this.hoverPaneController = new HoverPaneController(this, {
                mobileBreakpoint: this.mobileBreakpoint,
                enableLongPress: false,
            });
        }
    }
    get headerTemplate() {
        const { currentWidth, sortParam, defaultSortParam, mobileBreakpoint } = this;
        return html `
      <tile-list-compact-header
        class="header"
        .currentWidth=${currentWidth}
        .sortParam=${sortParam ?? defaultSortParam}
        .mobileBreakpoint=${mobileBreakpoint}
        .tileActions=${this.tileActions}
      >
      </tile-list-compact-header>
    `;
    }
    get tileTemplate() {
        return html `
      ${this.tileDisplayMode === 'list-detail'
            ? this.tile
            : this.linkTileTemplate}
    `;
    }
    get linkTileTemplate() {
        return html `
      <a
        href=${this.linkTileHref}
        aria-label=${this.model?.title ?? msg('Untitled item')}
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
    get linkTileHref() {
        if (!this.model?.identifier || this.baseNavigationUrl == null)
            return nothing;
        // Use the server-specified href if available.
        // Otherwise, construct a details page URL from the item identifier.
        if (this.model.href) {
            return `${this.baseNavigationUrl}${this.model.href}`;
        }
        return this.displayValueProvider.itemPageUrl(this.model.identifier, this.model.mediatype === 'collection');
    }
    get manageCheckTemplate() {
        if (!this.isManageView || this.tileDisplayMode !== 'grid')
            return nothing;
        return html `
      <div class="manage-check">
        <input
          type="checkbox"
          title=${this.manageCheckTitle ??
            msg('Remove this item from the list')}
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
    get shouldPrepareHoverPane() {
        return (this.enableHoverPane &&
            !!this.tileDisplayMode &&
            TileDispatcher_1.HOVER_PANE_DISPLAY_MODES[this.tileDisplayMode] &&
            this.model?.mediatype !== 'search' && // don't show hover panes on search tiles
            !this.model?.captureDates // don't show hover panes on web archive tiles
        );
    }
    get isHoverEnabled() {
        return window.matchMedia('(hover: hover)').matches;
    }
    /**
     * Whether the info button should be shown on this tile.
     * Only shown on touch/non-hover devices where a hover pane is available,
     * so the button always has something to toggle.
     */
    get shouldShowInfoButton() {
        return !this.isHoverEnabled && this.shouldPrepareHoverPane;
    }
    /** @inheritdoc */
    getHoverPane() {
        return this.hoverPane;
    }
    /** @inheritdoc */
    getHoverPaneProps() {
        return this;
    }
    handleResize(entry) {
        this.currentWidth = entry.contentRect.width;
        this.currentHeight = entry.contentRect.height;
    }
    disconnectedCallback() {
        this.stopResizeObservation(this.resizeObserver);
    }
    stopResizeObservation(observer) {
        observer?.removeObserver({
            handler: this,
            target: this.container,
        });
    }
    startResizeObservation() {
        this.stopResizeObservation(this.resizeObserver);
        this.resizeObserver?.addObserver({
            handler: this,
            target: this.container,
        });
    }
    updated(props) {
        if (props.has('resizeObserver')) {
            const previousObserver = props.get('resizeObserver');
            this.stopResizeObservation(previousObserver);
            this.startResizeObservation();
        }
    }
    /**
     * Handler for when the tile link is left-clicked. Emits the `resultSelected` event.
     * In manage view, it also checks/unchecks the tile.
     */
    handleLinkClicked(e) {
        if (this.isManageView) {
            e.preventDefault();
            if (this.model)
                this.model.checked = !this.model.checked;
        }
        this.dispatchEvent(new CustomEvent('resultSelected', { detail: this.model }));
    }
    /**
     * Handler for when the tile link is right-clicked.
     * In manage view, it opens the item in a new tab. Otherwise, does nothing.
     */
    handleLinkContextMenu(e) {
        if (this.isManageView && this.linkTileHref !== nothing) {
            e.preventDefault();
            window.open(this.linkTileHref, '_blank');
        }
    }
    tileInfoButtonPressed(e) {
        this.hoverPaneController?.toggleHoverPane({
            coords: e.detail,
            enableTouchBackdrop: true,
        });
    }
    /** Whether tile action buttons should be rendered in grid mode */
    get showGridTileActions() {
        return (this.tileActions.length > 0 &&
            !this.isManageView &&
            this.tileDisplayMode === 'grid');
    }
    /**
     * Template for the grid-mode action buttons. Rendered alongside the inner
     * tile link inside the dispatcher's shadow root so the action buttons can
     * suppress the hover pane on hover.
     */
    get gridTileActionsTemplate() {
        if (!this.showGridTileActions)
            return nothing;
        return html `
      <div
        class="tile-actions grid-tile-actions"
        @mouseenter=${this.handleGridActionsMouseEnter}
        @mousemove=${(e) => e.stopPropagation()}
      >
        ${this.tileActions.map(action => html `
            <button
              class="tile-action-btn"
              @click=${(e) => this.handleTileActionClick(e, action)}
            >
              ${action.label}
            </button>
          `)}
      </div>
    `;
    }
    get tile() {
        const { model, collectionPagePath, baseNavigationUrl, currentWidth, currentHeight, sortParam, creatorFilter, mobileBreakpoint, defaultSortParam, } = this;
        if (!model)
            return nothing;
        switch (this.tileDisplayMode) {
            case 'grid':
                switch (model.mediatype) {
                    case 'collection':
                        return html `<collection-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
              .creatorFilter=${creatorFilter}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              .layoutType=${this.layoutType}
              ?showInfoButton=${this.shouldShowInfoButton}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </collection-tile>`;
                    case 'account':
                        return html `<account-tile
              .model=${model}
              .collectionPagePath=${collectionPagePath}
              .baseImageUrl=${this.baseImageUrl}
              .currentWidth=${currentWidth}
              .currentHeight=${currentHeight}
              .creatorFilter=${creatorFilter}
              .suppressBlurring=${this.suppressBlurring}
              .isManageView=${this.isManageView}
              ?showInfoButton=${this.shouldShowInfoButton}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </account-tile>`;
                    case 'search':
                        return html `<search-tile
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
                        return html `<item-tile
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
              .layoutType=${this.layoutType}
              ?showTvClips=${this.showTvClips}
              ?showInfoButton=${this.shouldShowInfoButton}
              ?useLocalTime=${this.useLocalTime}
              @infoButtonPressed=${this.tileInfoButtonPressed}
            >
            </item-tile>`;
                }
            case 'list-compact':
                return html `<tile-list-compact
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
          .tileActions=${this.isManageView ? [] : this.tileActions}
          ?useLocalTime=${this.useLocalTime}
        >
        </tile-list-compact>`;
            case 'list-detail':
                return html `<tile-list
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
          .tileActions=${this.isManageView ? [] : this.tileActions}
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
            tileActionStyles,
            css `
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

        /*
         * When tile actions are present, the container takes on the role of
         * the tile's visual card so the tile content and action row appear
         * as a single unified element. The inner tile's own shadow/radius
         * are disabled via CSS variable overrides to avoid visual
         * duplication, and the action row sits as a footer inside the same
         * card.
         */
        #container.has-tile-actions {
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: var(--tileShadow, 1px 1px 2px 0);
          --tileBoxShadow: none;
          --tileCornerRadius: 0;
        }

        #container.has-tile-actions .tile-link {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          border-radius: 0;
        }

        /* Normal hover shadow lives on the inner anchor for plain tiles */
        #container.hoverable:not(.has-tile-actions) a:focus,
        #container.hoverable:not(.has-tile-actions) a:hover {
          box-shadow: var(
            --tileHoverBoxShadow,
            0 0 6px 2px rgba(8, 8, 32, 0.8)
          );
          transition: box-shadow 0.1s ease;
        }

        /*
         * When the container owns the card visuals, the hover shadow needs
         * to move up to the container so it wraps the action row too.
         */
        #container.hoverable.has-tile-actions:hover {
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

        /*
         * Grid-mode action row sits flush against the bottom of the card —
         * the buttons' own borders form the visible bottom edge. The outer
         * buttons get rounded bottom corners to match the container so the
         * red border traces cleanly around the card's bottom corners.
         */
        .grid-tile-actions .tile-action-btn:first-child {
          border-bottom-left-radius: 4px;
        }

        .grid-tile-actions .tile-action-btn:last-child {
          border-bottom-right-radius: 4px;
        }
      `,
        ];
    }
};
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "tileDisplayMode", void 0);
__decorate([
    property({ type: Boolean })
], TileDispatcher.prototype, "isManageView", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "resizeObserver", void 0);
__decorate([
    property({ type: Object })
], TileDispatcher.prototype, "collectionTitles", void 0);
__decorate([
    property({ type: Boolean })
], TileDispatcher.prototype, "showTvClips", void 0);
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "layoutType", void 0);
__decorate([
    property({ type: Boolean })
], TileDispatcher.prototype, "enableHoverPane", void 0);
__decorate([
    property({ type: String })
], TileDispatcher.prototype, "manageCheckTitle", void 0);
__decorate([
    query('#container')
], TileDispatcher.prototype, "container", void 0);
__decorate([
    query('tile-hover-pane')
], TileDispatcher.prototype, "hoverPane", void 0);
__decorate([
    query('.tile-link')
], TileDispatcher.prototype, "tileLinkElement", void 0);
TileDispatcher = TileDispatcher_1 = __decorate([
    customElement('tile-dispatcher'),
    localized()
], TileDispatcher);
export { TileDispatcher };
