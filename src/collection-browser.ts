/* eslint-disable import/no-duplicates */
import { html, css, LitElement, PropertyValues } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type { InfiniteScroller } from '@internetarchive/infinite-scroller';
import {
  SearchParams,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import {
  SortDirection,
  SortParam,
} from '@internetarchive/search-service/dist/src/search-params';
import type { TileModel, CollectionDisplayMode } from './models';
import '@internetarchive/infinite-scroller';
import './tiles/tile-dispatcher';

@customElement('collection-browser')
export class CollectionBrowser extends LitElement {
  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) baseQuery?: string;

  @property({ type: Boolean }) showDeleteButtons = false;

  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: Object }) sortParam: SortParam = new SortParam(
    'date',
    'desc'
  );

  @state() private tileModels: TileModel[] = [];

  @query('infinite-scroller')
  private infiniteScroller!: InfiniteScroller;

  @query('#sort-field') sortField!: HTMLInputElement;

  @query('#sort-direction') sortDirectionField!: HTMLSelectElement;

  render() {
    return html`
      <h1>Collection Browser</h1>

      <div id="sort-filter">
        <div>
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
        </div>
        <div>
          <form @submit=${this.sortPressed}>
            <input type="text" id="sort-field" value="date" />
            <select id="sort-direction">
              <option value="desc" default>Descending</option>
              <option value="asc">Ascending</option>
            </select>
            <input type="submit" value="Change Sort" />
          </form>
        </div>
      </div>
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
    if (changed.has('baseQuery')) {
      this.resetSearch();
    }
    if (changed.has('showDeleteButtons')) {
      this.infiniteScroller.reload();
    }
  }

  private sortPressed(e: Event) {
    e.preventDefault();
    const sortField = this.sortField.value;
    const sortDirection = this.sortDirectionField.value;
    this.sortParam = new SortParam(sortField, sortDirection as SortDirection);
    this.resetSearch();
  }

  private resetSearch() {
    this.tileModels = [];
    this.pageCount = this.startPageNumber;
    this.updateQuery();
    this.infiniteScroller.reload();
  }

  // it's 1-indexed so making this a constant so we don't have to remember that
  private readonly startPageNumber = 1;

  private pageCount = this.startPageNumber;

  async updateQuery() {
    const params = new SearchParams({
      query: this.baseQuery ?? '',
      fields: [
        'identifier',
        'title',
        'mediatype',
        'downloads',
        'num_favorites',
        'num_reviews',
        'item_count',
        'description',
        'date',
      ],
      page: this.pageCount,
      rows: 50,
      sort: [this.sortParam],
    });
    this.pageCount += 1;
    const results = await this.searchService?.search(params);
    const tiles = [...this.tileModels];
    results?.success?.response.docs.forEach(doc => {
      if (!doc.identifier) return;
      tiles.push({
        identifier: doc.identifier,
        title: doc.title?.value ?? '',
        mediatype: doc.mediatype?.value ?? 'data',
        viewCount: doc.downloads?.value ?? 0,
        favCount: doc.num_favorites?.value ?? 0,
        commentCount: doc.num_reviews?.value ?? 0,
        itemCount: doc.item_count?.value ?? 0,
        description: doc.description?.value,
        date: doc.date?.value,
      });
    });
    this.tileModels = tiles;
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
    this.updateQuery();
  }

  static styles = css`
    :host {
      display: block;
    }

    infinite-scroller {
      display: block;
      --infiniteScrollerCellOutline: 1px solid #666;
    }

    infinite-scroller.list-compact {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 2rem;
    }

    infinite-scroller.list-detail {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 10rem;
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: 16rem;
      --infiniteScrollerCellMinHeight: 22.5rem;
    }
  `;
}
