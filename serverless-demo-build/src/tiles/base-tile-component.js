var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { TileDisplayValueProvider } from './tile-display-value-provider';
import { formatDate } from '../utils/format-date';
export class BaseTileComponent extends LitElement {
    constructor() {
        super(...arguments);
        /** Action buttons to display on this tile (rendered by subclasses) */
        this.tileActions = [];
        this.sortParam = null;
        this.defaultSortParam = null;
        this.loggedIn = false;
        this.suppressBlurring = false;
        this.useLocalTime = false;
        this.displayValueProvider = new TileDisplayValueProvider();
    }
    willUpdate(changed) {
        // Ensure the TileDisplayValueProvider stays up-to-date as properties change
        if (changed.has('model') ||
            changed.has('baseNavigationUrl') ||
            changed.has('collectionPagePath') ||
            changed.has('sortParam') ||
            changed.has('defaultSortParam') ||
            changed.has('creatorFilter')) {
            this.displayValueProvider = new TileDisplayValueProvider({
                model: this.model,
                baseNavigationUrl: this.baseNavigationUrl,
                collectionPagePath: this.collectionPagePath,
                sortParam: this.sortParam ?? this.defaultSortParam ?? undefined,
                creatorFilter: this.creatorFilter,
            });
        }
    }
    /**
     * The formatted date string for given date and format type, taking into
     * account whether this tile component should be using local time or UTC.
     */
    getFormattedDate(date, format) {
        const { useLocalTime } = this;
        return formatDate(date, format, { useLocalTime });
    }
    /**
     * Renders the action buttons configured for this tile, or `nothing` if
     * there are none. Optional `extraClass` is appended to the container's
     * class list so subclasses can target their own layout tweaks.
     */
    renderTileActions(extraClass = '') {
        if (!this.tileActions.length)
            return nothing;
        const containerClasses = classMap({
            'tile-actions': true,
            ...(extraClass && { [extraClass]: true }),
        });
        return html `
      <div class=${containerClasses}>
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
    /**
     * Click handler for tile action buttons. Stops propagation so the click
     * doesn't activate a wrapping tile link, and dispatches a
     * `tileActionClicked` event (bubbling + composed) carrying the action ID
     * and the tile model.
     */
    handleTileActionClick(e, action) {
        e.preventDefault();
        e.stopPropagation();
        // Pre-set the hover pane controller's clicking flag so that focus
        // restoration after a consumer-opened modal won't trigger the hover pane.
        this.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, composed: true }));
        this.dispatchEvent(new CustomEvent('tileActionClicked', {
            detail: { actionId: action.id, model: this.model },
            bubbles: true,
            composed: true,
        }));
    }
}
__decorate([
    property({ type: Object })
], BaseTileComponent.prototype, "model", void 0);
__decorate([
    property({ type: Array })
], BaseTileComponent.prototype, "tileActions", void 0);
__decorate([
    property({ type: Number })
], BaseTileComponent.prototype, "currentWidth", void 0);
__decorate([
    property({ type: Number })
], BaseTileComponent.prototype, "currentHeight", void 0);
__decorate([
    property({ type: String })
], BaseTileComponent.prototype, "baseNavigationUrl", void 0);
__decorate([
    property({ type: String })
], BaseTileComponent.prototype, "baseImageUrl", void 0);
__decorate([
    property({ type: String })
], BaseTileComponent.prototype, "collectionPagePath", void 0);
__decorate([
    property({ type: Object })
], BaseTileComponent.prototype, "sortParam", void 0);
__decorate([
    property({ type: Object })
], BaseTileComponent.prototype, "defaultSortParam", void 0);
__decorate([
    property({ type: String })
], BaseTileComponent.prototype, "creatorFilter", void 0);
__decorate([
    property({ type: Number })
], BaseTileComponent.prototype, "mobileBreakpoint", void 0);
__decorate([
    property({ type: Boolean })
], BaseTileComponent.prototype, "loggedIn", void 0);
__decorate([
    property({ type: Boolean })
], BaseTileComponent.prototype, "suppressBlurring", void 0);
__decorate([
    property({ type: Boolean })
], BaseTileComponent.prototype, "useLocalTime", void 0);
