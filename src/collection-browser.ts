/* eslint-disable import/no-duplicates */
import { html, css, LitElement, nothing, PropertyValues } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { InfiniteScroller } from '@internetarchive/infinite-scroller';
import '@internetarchive/infinite-scroller';
import './tiles/grid/collection-tile';
import './tiles/grid/item-tile';
import './tiles/grid/user-tile';
import './tiles/list/tile-list-large';
import './tiles/list/tile-list-small';
import { TileModel, MediaType } from './models';

type DisplayMode = 'list' | 'grid';

@customElement('collection-browser')
export class CollectionBrowser extends LitElement {
  @query('infinite-scroller') infiniteScroller!: InfiniteScroller;

  @state() private displayMode: DisplayMode = 'grid';

  @state() private tileModels: TileModel[] = [];

  render() {
    console.debug('render', this.tileModels.length);

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
        .cellProvider=${this}
        @scrollThresholdReached=${this.scrollThresholdReached}
      >
      </infinite-scroller>
    `;
  }

  firstUpdated(): void {
    this.addMoreTiles();
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
    switch (this.displayMode) {
      case 'grid':
        switch (model.mediatype) {
          case 'collection':
            return html`<collection-tile .model=${model}></collection-tile>`;
          case 'item':
            return html`<item-tile .model=${model}></item-tile>`;
          case 'account':
            return html`<user-tile .model=${model}></user-tile>`;
          default:
            return nothing;
        }
      case 'list':
        return html`<tile-list-large><p>${index}</p></tile-list-large>`;
      default:
        return nothing;
    }
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
