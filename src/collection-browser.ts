/* eslint-disable import/no-duplicates */
import { html, css, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { InfiniteScroller } from '@internetarchive/infinite-scroller';
import '@internetarchive/infinite-scroller';
import './tiles/tile-1';
import './tiles/tile-2';

type DisplayMode = 'list' | 'grid';

@customElement('collection-browser')
export class CollectionBrowser extends LitElement {
  @query('infinite-scroller') infiniteScroller!: InfiniteScroller;

  @state() displayMode: DisplayMode = 'grid';

  render() {
    return html`
      <h1>Collection Browser</h1>

      <button
        @click=${() => {
          this.displayMode = 'grid';
        }}
      >
        Grid
      </button>
      <button
        @click=${() => {
          this.displayMode = 'list';
        }}
      >
        List
      </button>

      <infinite-scroller
        class="${this.displayMode}"
        .itemCount=${100}
        .cellProvider=${this}
        @scrollThresholdReached=${this.scrollThresholdReached}
      >
      </infinite-scroller>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode')) {
      this.infiniteScroller.reload();
    }
  }

  cellForIndex(index: number) {
    switch (this.displayMode) {
      case 'grid':
        return html`<tile-1><p>${index}</p></tile-1>`;
      case 'list':
        return html`<tile-2><p>${index}</p></tile-2>`;
      default:
        return nothing;
    }
  }

  private scrollThresholdReached() {
    this.infiniteScroller.itemCount += 50;
  }

  static styles = css`
    :host {
      display: block;
    }

    infinite-scroller.list {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 4rem;
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: 16rem;
      --infiniteScrollerCellMinHeight: 22.5rem;
    }
  `;
}
