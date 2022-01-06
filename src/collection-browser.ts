/* eslint-disable import/no-duplicates */
import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { InfiniteScroller } from '@internetarchive/infinite-scroller';
import '@internetarchive/infinite-scroller';
import { TileModel, MediaType } from './models';
import './tiles/tile-dispatcher';

export type CollectionDisplayMode = 'grid' | 'list-compact' | 'list-detail';

@customElement('collection-browser')
export class CollectionBrowser extends LitElement {
  @property({ type: String }) baseNavigationUrl?: string;

  @query('infinite-scroller') infiniteScroller!: InfiniteScroller;

  @state() private displayMode: CollectionDisplayMode = 'grid';

  @state() private showDeleteButtons = false;

  @state() private tileModels: TileModel[] = [];

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
          this.displayMode = 'list-compact';
        }}
      >
        List Compact
      </button>
      <button
        @click=${() => {
          this.displayMode = 'list-detail';
        }}
      >
        List Detail
      </button>
      <button
        @click=${() => {
          this.showDeleteButtons = !this.showDeleteButtons;
          this.infiniteScroller.reload();
        }}
      >
        Toggle Delete Mode
      </button>

      <infinite-scroller
        class="${this.displayMode}"
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
    if (changed.has('tileModels')) {
      this.infiniteScroller.itemCount = this.tileModels.length;
    }
  }

  cellForIndex(index: number) {
    const model = this.tileModels[index];
    return html` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .model=${model}
      .displayMode=${this.displayMode}
      ?showDeleteButton=${this.showDeleteButtons}
    ></tile-dispatcher>`;
  }

  private scrollThresholdReached() {
    this.addMoreTiles();
  }

  /**
   * Generate some random data
   */
  private addMoreTiles() {
    // we're making a copy of the tiles array
    // so when we set it again at the end, it's setting it to a new array
    // otherwise, Lit doesn't recognize the change since it's a refrefence
    // to the same array
    const tiles = [...this.tileModels];

    for (let i = 0; i < 50; i += 1) {
      // get a random mediatype
      const mediaType = ['collection', 'item', 'account'][
        Math.floor(Math.random() * 3)
      ];
      tiles.push({
        identifier: `${mediaType}-${i}`,
        title: `${mediaType} ${i}`,
        mediatype: mediaType as MediaType,
        viewCount: Math.floor(Math.random() * 100),
        favCount: Math.floor(Math.random() * 100),
        commentCount: Math.floor(Math.random() * 100),
        itemCount: Math.floor(Math.random() * 100),
      });
    }
    console.debug('tiles', tiles);
    this.tileModels = tiles;
  }

  static styles = css`
    :host {
      display: block;
    }

    infinite-scroller {
      outline: 1px solid orange;
      display: block;
      --infiniteScrollerCellOutline: 1px solid purple;
    }

    infinite-scroller.list-compact {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 2rem;
    }

    infinite-scroller.list-detail {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 16rem;
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: 16rem;
      --infiniteScrollerCellMinHeight: 22.5rem;
    }
  `;
}
