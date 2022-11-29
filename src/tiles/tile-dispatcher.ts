import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
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

  @property({ type: Number }) showHoverPaneDelay: number = 1000;

  @state()
  private showHoverPaneTimer?: number;

  @state()
  private hoverPaneShown: boolean = false;

  @query('#container') private container!: HTMLDivElement;

  render() {
    const isGridMode = this.tileDisplayMode === 'grid';
    return html`
      <div
        id="container"
        @mouseenter=${isGridMode ? this.handleMouseEnter : nothing}
        @mouseleave=${isGridMode ? this.handleMouseLeave : nothing}
        @mousemove=${isGridMode ? this.handleMouseMove : nothing}
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
        title=${this.tileDisplayMode === 'grid'
          ? nothing // Don't show title tooltips in grid mode (where we have the tile info popups)
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

  private get hoverPaneTemplate(): TemplateResult | typeof nothing {
    return this.hoverPaneShown
      ? html`<tile-hover-pane
          class=${this.getBoundingClientRect().left + 10 > window.innerWidth / 2
            ? 'flip' // Flip the pane to grow leftward instead of rightward if it might overflow the viewport
            : nothing}
          role="tooltip"
          .model=${this.model}
          .baseNavigationUrl=${this.baseNavigationUrl}
          .baseImageUrl=${this.baseImageUrl}
          .loggedIn=${this.loggedIn}
          .sortParam=${this.sortParam}
          .collectionNameCache=${this.collectionNameCache}
        ></tile-hover-pane>`
      : nothing;
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

  private restartHoverPaneTimer(): void {
    clearTimeout(this.showHoverPaneTimer);
    this.showHoverPaneTimer = window.setTimeout(() => {
      this.showHoverPane();
    }, this.showHoverPaneDelay);
  }

  private handleMouseEnter(): void {
    this.handleMouseMove();
  }

  private handleMouseLeave(): void {
    // Abort any timer to show the hover pane, as the mouse has left the item
    clearTimeout(this.showHoverPaneTimer);
    // And hide the pane if it's already been shown
    this.hideHoverPane();
  }

  private handleMouseMove(): void {
    // Restart the timer to show the hover pane anytime the mouse moves within the tile
    if (!this.hoverPaneShown) {
      this.restartHoverPaneTimer();
    }
  }

  private showHoverPane(): void {
    this.hoverPaneShown = true;
  }

  private hideHoverPane(): void {
    this.hoverPaneShown = false;
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
      }

      #delete-button {
        float: right;
      }

      a {
        display: block;
        height: 100%;
        color: unset;
        text-decoration: none;
      }

      a :first-child {
        display: block;
        height: 100%;
      }

      tile-hover-pane {
        position: absolute;
        top: 10px;
        left: 10px;
        z-index: 1;
      }

      tile-hover-pane.flip {
        left: unset;
        right: 10px;
      }
    `;
  }
}
