import { css, html, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import {
  SharedResizeObserverInterface,
  SharedResizeObserverResizeHandlerInterface,
} from '@internetarchive/shared-resize-observer';
import type { CollectionDisplayMode, TileModel } from '../models';
import './grid/collection-tile';
import './grid/item-tile';
import './grid/account-tile';
import './list/tile-list-detail';
import './list/tile-list-compact';

@customElement('tile-dispatcher')
export class TileDispatcher
  extends LitElement
  implements SharedResizeObserverResizeHandlerInterface
{
  @property({ type: String }) displayMode?: CollectionDisplayMode;

  @property({ type: Object }) model?: TileModel;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Boolean }) showDeleteButton = false;

  @property({ type: Number }) currentWidth?: number;

  @property({ type: Number }) currentHeight?: number;

  @property({ type: Object }) resizeObserver?: SharedResizeObserverInterface;

  @query('#container') private container!: HTMLDivElement;

  render() {
    return html`
      <div id="container">
        ${this.showDeleteButton
          ? html`<button id="delete-button">X</button>`
          : nothing}
        <a
          href="${this.baseNavigationUrl}/details/${this.model?.identifier}"
          title=${ifDefined(this.model?.title)}
        >
          ${this.tile}
        </a>
      </div>
    `;
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
    const { model } = this;
    if (!model) return nothing;

    switch (this.displayMode) {
      case 'grid':
        switch (model.mediatype) {
          case 'collection':
            return html`<collection-tile
              .model=${model}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
            >
            </collection-tile>`;
          case 'account':
            return html`<account-tile
              .model=${model}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
            ></account-tile>`;
          default:
            return html`<item-tile
              .model=${model}
              .baseNavigationUrl=${this.baseNavigationUrl}
              .currentWidth=${this.currentWidth}
              .currentHeight=${this.currentHeight}
            ></item-tile>`;
        }
      case 'list-compact':
        return html`<tile-list-compact
          .model=${model}
          .currentWidth=${this.currentWidth}
          .currentHeight=${this.currentHeight}
        ></tile-list-compact>`;
      case 'list-detail':
        return html`<tile-list-detail
          .model=${model}
          .currentWidth=${this.currentWidth}
          .currentHeight=${this.currentHeight}
        ></tile-list-detail>`;
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

      #container {
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
    `;
  }
}
