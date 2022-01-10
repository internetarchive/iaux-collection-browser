/* eslint-disable import/no-duplicates */
import { html, css, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type {
  InfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from '@internetarchive/infinite-scroller';
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
import './sort-filter-bar/sort-filter-bar';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements InfiniteScrollerCellProviderInterface
{
  @property({ type: Number }) initialPageNumber: number = 1;

  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) baseQuery?: string;

  @property({ type: Boolean }) showDeleteButtons = false;

  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: Object }) sortParam: SortParam = new SortParam(
    'date',
    'desc'
  );

  @property({ type: Number }) pageSize = 50;

  // @property({ type: Number }) pageNumber = 1;

  @state() private currentPageNumber = this.initialPageNumber;

  private tileModelAtCellIndex(index: number): TileModel | undefined {
    const pageNumber = Math.floor(index / this.pageSize) + 1;
    const itemIndex = index % this.pageSize;
    const model = this.dataSource[pageNumber]?.[itemIndex];
    if (!model) {
      // if we encounter a model we don't have yet, fetch the page and just
      // return undefined.. the datasource will be updated once the
      // page is loaded and the cell will be rendered
      this.fetchPage(pageNumber);
    }
    return model;
  }

  private get tileModelCount() {
    const tileCount = this.currentPageNumber * this.pageSize;
    console.debug('tileModelCount', this.currentPageNumber, tileCount);
    return tileCount;
  }

  /**
   * The results per page so we can paginate.
   *
   * This allows us to start in the middle of the search results and
   * fetch data before or after the current page. If we don't have a key
   * for the previous/next page, we'll fetch the next/previous page to populate it
   */
  @state() private dataSource: Record<number, TileModel[]> = {};

  @query('infinite-scroller')
  private infiniteScroller!: InfiniteScroller;

  render() {
    return html`
      <h1>Collection Browser</h1>

      <sort-filter-bar
        @sortDirectionChanged=${this.sortDirectionChanged}
        @displayModeChanged=${this.displayModeChanged}
      ></sort-filter-bar>

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
    if (changed.has('dataSource')) {
      this.infiniteScroller.itemCount = this.tileModelCount;
      this.infiniteScroller.reload();
    }
    if (changed.has('baseQuery')) {
      this.resetSearch();
    }
    if (changed.has('showDeleteButtons')) {
      this.infiniteScroller.reload();
    }
  }

  private sortDirectionChanged(e: CustomEvent<{ direction: 'asc' | 'desc' }>) {
    console.debug('sortDirectionChanged', e.detail.direction);
    const sortField = this.sortParam.field;
    const sortDirection = e.detail.direction;
    this.sortParam = new SortParam(sortField, sortDirection as SortDirection);
    this.resetSearch();
  }

  private displayModeChanged(
    e: CustomEvent<{ displayMode: CollectionDisplayMode }>
  ) {
    this.displayMode = e.detail.displayMode;
  }

  private async resetSearch() {
    this.dataSource = {};
    this.currentPageNumber = this.initialPageNumber;
    await this.fetchPage(this.currentPageNumber);
    const cellIndexToScrollTo = this.pageSize * (this.currentPageNumber - 1);
    this.infiniteScroller.scrollToCell(cellIndexToScrollTo, true);
  }

  private pageFetchesInProgress: Set<number> = new Set<number>();

  async fetchPage(pageNumber: number) {
    // if we already have data, don't fetch again
    if (this.dataSource[pageNumber]) return;
    // if a fetch is already in progress for this page, don't fetch again
    if (this.pageFetchesInProgress.has(pageNumber)) return;

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
      page: pageNumber,
      rows: this.pageSize,
      sort: [this.sortParam],
    });
    this.pageFetchesInProgress.add(pageNumber);
    const results = await this.searchService?.search(params);
    // copy our existing datasource so when we set it below, it gets set
    // instead of modifying the existing dataSource since object changes
    // don't trigger a re-render
    const datasource = { ...this.dataSource };
    const tiles: TileModel[] = [];
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
    datasource[pageNumber] = tiles;
    this.dataSource = datasource;
    this.pageFetchesInProgress.delete(pageNumber);
  }

  cellForIndex(index: number): TemplateResult | undefined {
    const model = this.tileModelAtCellIndex(index);
    if (!model) return undefined;

    return html` <tile-dispatcher
      .baseNavigationUrl=${this.baseNavigationUrl}
      .model=${model}
      .displayMode=${this.displayMode}
      ?showDeleteButton=${this.showDeleteButtons}
    ></tile-dispatcher>`;
  }

  private scrollThresholdReached() {
    this.currentPageNumber += 1;
    console.debug('scrollThresholdReached', this.currentPageNumber);
    this.fetchPage(this.currentPageNumber);
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
