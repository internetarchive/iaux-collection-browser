import { html, LitElement, nothing, PropertyValues, TemplateResult } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import type { SortParam } from '@internetarchive/search-service';
import { TileDisplayValueProvider } from './tile-display-value-provider';
import type { TileModel } from '../models';
import { DateFormat, formatDate } from '../utils/format-date';
import type { TileAction } from './models';

export abstract class BaseTileComponent extends LitElement {
  @property({ type: Object }) model?: TileModel;

  /** Action buttons to display on this tile (rendered by subclasses) */
  @property({ type: Array }) tileActions: TileAction[] = [];

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: String }) baseImageUrl?: string;

  @property({ type: String }) collectionPagePath?: string;

  @property({ type: Object }) sortParam: SortParam | null = null;

  @property({ type: Object }) defaultSortParam: SortParam | null = null;

  @property({ type: String }) creatorFilter?: string;

  @property({ type: Number }) mobileBreakpoint?: number;

  @property({ type: Boolean }) loggedIn = false;

  @property({ type: Boolean }) suppressBlurring = false;

  @property({ type: Boolean }) useLocalTime = false;

  protected displayValueProvider = new TileDisplayValueProvider();

  protected willUpdate(changed: PropertyValues<this>) {
    // Ensure the TileDisplayValueProvider stays up-to-date as properties change
    if (
      changed.has('model') ||
      changed.has('baseNavigationUrl') ||
      changed.has('collectionPagePath') ||
      changed.has('sortParam') ||
      changed.has('defaultSortParam') ||
      changed.has('creatorFilter')
    ) {
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
  protected getFormattedDate(date?: Date, format?: DateFormat): string {
    const { useLocalTime } = this;
    return formatDate(date, format, { useLocalTime });
  }

  /**
   * Renders the action buttons configured for this tile, or `nothing` if
   * there are none. Optional `extraClass` is appended to the container's
   * class list so subclasses can target their own layout tweaks.
   */
  protected renderTileActions(
    extraClass: string = '',
  ): TemplateResult | typeof nothing {
    if (!this.tileActions.length) return nothing;

    const containerClasses = classMap({
      'tile-actions': true,
      ...(extraClass && { [extraClass]: true }),
    });

    return html`
      <div class=${containerClasses}>
        ${this.tileActions.map(
          action => html`
            <button
              class="tile-action-btn"
              @click=${(e: Event) => this.handleTileActionClick(e, action)}
            >
              ${action.label}
            </button>
          `,
        )}
      </div>
    `;
  }

  /**
   * Click handler for tile action buttons. Stops propagation so the click
   * doesn't activate a wrapping tile link, and dispatches a
   * `tileActionClicked` event (bubbling + composed) carrying the action ID
   * and the tile model.
   */
  protected handleTileActionClick(e: Event, action: TileAction): void {
    e.preventDefault();
    e.stopPropagation();
    // Pre-set the hover pane controller's clicking flag so that focus
    // restoration after a consumer-opened modal won't trigger the hover pane.
    this.dispatchEvent(
      new PointerEvent('pointerdown', { bubbles: true, composed: true }),
    );
    this.dispatchEvent(
      new CustomEvent('tileActionClicked', {
        detail: { actionId: action.id, model: this.model },
        bubbles: true,
        composed: true,
      }),
    );
  }
}
