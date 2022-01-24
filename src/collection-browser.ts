/* eslint-disable import/no-duplicates */
import { html, css, LitElement, PropertyValues, TemplateResult } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import type {
  InfiniteScroller,
  InfiniteScrollerCellProviderInterface,
} from '@internetarchive/infinite-scroller';
import {
  Metadata,
  SearchParams,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import { SortParam } from '@internetarchive/search-service/dist/src/search-params';
import type { TileModel, CollectionDisplayMode } from './models';
import '@internetarchive/infinite-scroller';
import './tiles/tile-dispatcher';
import './tiles/loading-tile';
import './sort-filter-bar/sort-filter-bar';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements InfiniteScrollerCellProviderInterface
{
  @property({ type: Number }) initialPageNumber = 1;

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

  /**
   * This the the number of pages that we want to show.
   *
   * The data isn't necessarily loaded for all of the pages, but this lets us
   * know how many cells we should render.
   */
  @state() private pagesToRender = this.initialPageNumber;

  /**
   * When we're animated scrolling to the page, we don't want to fetch
   * all of the pages as it scrolls so this lets us know if we're scrolling
   */
  private isScrollingToCell = false;

  private placeholderCellTemplate = html`<loading-tile></loading-tile>`;

  private tileModelAtCellIndex(index: number): TileModel | undefined {
    const pageNumber = Math.floor(index / this.pageSize) + 1;
    const itemIndex = index % this.pageSize;
    const model = this.dataSource[pageNumber]?.[itemIndex];
    /**
     * If we encounter a model we don't have yet and we're not in the middle of an
     * automated scroll, fetch the page and just return undefined.
     * The datasource will be updated once the page is loaded and the cell will be rendered.
     *
     * We disable it during the automated scroll since we may fetch pages for cells the
     * user may never see.
     */
    if (!model && !this.isScrollingToCell) {
      this.fetchPage(pageNumber);
    }
    return model;
  }

  private get tileModelCount() {
    const tileCount = this.pagesToRender * this.pageSize;
    return tileCount;
  }

  /**
   * The results per page so we can paginate.
   *
   * This allows us to start in the middle of the search results and
   * fetch data before or after the current page. If we don't have a key
   * for the previous/next page, we'll fetch the next/previous page to populate it
   */
  private dataSource: Record<number, TileModel[]> = {};

  @query('infinite-scroller')
  private infiniteScroller!: InfiniteScroller;

  render() {
    return html`
      <h1>Collection Browser</h1>

      <infinite-scroller
        class="${this.displayMode}"
        .cellProvider=${this}
        .placeholderCellTemplate=${this.placeholderCellTemplate}
        @scrollThresholdReached=${this.scrollThresholdReached}
        @cellWidthChanged=${this.cellWidthChanged}
        @visibleCellsChanged=${this.visibleCellsChanged}
      >
      </infinite-scroller>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode') || changed.has('showDeleteButtons')) {
      this.infiniteScroller.reload();
    }
    if (changed.has('baseQuery') || changed.has('sortParam')) {
      this.handleQueryChange();
    }
    if (changed.has('pagesToRender')) {
      this.infiniteScroller.itemCount = this.tileModelCount;
    }
    if (changed.has('initialPageNumber')) {
      this.pagesToRender = this.initialPageNumber;
      this.scrollToPage(this.initialPageNumber);
    }
  }

  private visibleCellsChanged(
    e: CustomEvent<{ visibleCellIndices: number[] }>
  ) {
    if (this.isScrollingToCell) return;
    const { visibleCellIndices } = e.detail;
    if (visibleCellIndices.length === 0) return;
    const lastVisibleCellIndex =
      visibleCellIndices[visibleCellIndices.length - 1];
    const lastVisibleCellPage =
      Math.floor(lastVisibleCellIndex / this.pageSize) + 1;
    const event = new CustomEvent('visiblePageChanged', {
      detail: {
        pageNumber: lastVisibleCellPage,
      },
    });
    this.dispatchEvent(event);
  }

  private cellWidthChanged(e: CustomEvent<{ width: number }>) {
    (this.shadowRoot?.host as HTMLElement).style.setProperty(
      '--collectionBrowserCellWidth',
      `${e.detail.width}px`
    );
  }

  private async handleQueryChange() {
    this.dataSource = {};
    this.pagesToRender = this.initialPageNumber;
    this.scrollToPage(this.initialPageNumber);
    await this.fetchPage(this.initialPageNumber);
  }

  private scrollToPage(pageNumber: number) {
    const cellIndexToScrollTo = this.pageSize * (pageNumber - 1);
    // without this setTimeout, Safari just pauses until the `fetchPage` is complete
    // then scrolls to the cell
    setTimeout(() => {
      this.isScrollingToCell = true;
      this.infiniteScroller.scrollToCell(cellIndexToScrollTo, true);
      // This timeout is to give the scroll animation time to finish
      // then updating the infinite scroller once we're done scrolling
      // There's no scroll animation completion callback so we're
      // giving it 0.5s to finish.
      setTimeout(() => {
        this.isScrollingToCell = false;
        this.infiniteScroller.reload();
      }, 500);
    }, 0);
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
    const docs = results?.success?.response.docs;
    if (docs && docs.length > 0) {
      this.updateDataSource(pageNumber, docs);
    }
    this.pageFetchesInProgress.delete(pageNumber);
  }

  /**
   * This is useful for determining whether we need to reload the scroller.
   *
   * When the fetch completes, we need to reload the scroller if the cells for that
   * page are visible, but if the page is not currenlty visible, we don't need to reload
   */
  private get currentVisiblePageNumbers(): number[] {
    const visibleCells = this.infiniteScroller.getVisibleCellIndices();
    const visiblePages = new Set<number>();
    visibleCells.forEach(cellIndex => {
      const visiblePage = Math.floor(cellIndex / this.pageSize) + 1;
      visiblePages.add(visiblePage);
    });
    return Array.from(visiblePages);
  }

  private updateDataSource(pageNumber: number, docs: Metadata[]) {
    // copy our existing datasource so when we set it below, it gets set
    // instead of modifying the existing dataSource since object changes
    // don't trigger a re-render
    const datasource = { ...this.dataSource };
    const tiles: TileModel[] = [];
    docs?.forEach(doc => {
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
    const visiblePages = this.currentVisiblePageNumbers;
    const needsReload = visiblePages.includes(pageNumber);
    if (needsReload) {
      this.infiniteScroller.reload();
    }
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

  /**
   * When the user scrolls near to the bottom of the page, fetch the next page
   * increase the number of pages to render and start fetching data for the new page
   */
  private scrollThresholdReached() {
    this.pagesToRender += 1;
    this.fetchPage(this.pagesToRender);
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
      --infiniteScrollerCellMinHeight: 6rem;
      --infiniteScrollerCellMaxHeight: 6rem;
    }

    infinite-scroller.list-detail {
      --infiniteScrollerCellMinWidth: 100%;
      --infiniteScrollerCellMinHeight: 10rem;
      --infiniteScrollerCellMaxHeight: 10rem;
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: 16rem;
      --infiniteScrollerCellMaxWidth: 1fr;
      --infiniteScrollerCellMinHeight: 22rem;
      --infiniteScrollerCellMaxHeight: 22rem;
    }
  `;
}
