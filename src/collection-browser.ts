/* eslint-disable import/no-duplicates */
import {
  html,
  css,
  LitElement,
  PropertyValues,
  TemplateResult,
  nothing,
} from 'lit';
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
import {
  AggregateSearchParams,
  SortParam,
} from '@internetarchive/search-service/dist/src/search-params';
import type { TileModel, CollectionDisplayMode } from './models';
import '@internetarchive/infinite-scroller';
import './tiles/tile-dispatcher';
import './tiles/loading-tile';
import './sort-filter-bar/sort-filter-bar';
import './collection-facets';
import { CollectionFacets } from './collection-facets';
import './circular-activity-indicator';

@customElement('collection-browser')
export class CollectionBrowser
  extends LitElement
  implements InfiniteScrollerCellProviderInterface
{
  @property({ type: String }) baseNavigationUrl?: string;

  @property({ type: Object }) searchService?: SearchServiceInterface;

  @property({ type: String }) baseQuery?: string;

  @property({ type: Boolean }) showDeleteButtons = false;

  @property({ type: String }) displayMode: CollectionDisplayMode = 'grid';

  @property({ type: Object }) sortParam?: SortParam;

  @property({ type: String }) additionalQueryClause?: string;

  @property({ type: Number }) pageSize = 50;

  @query('collection-facets') collectionFacets!: CollectionFacets;

  /**
   * The page that the consumer wants to load.
   */
  private initialPageNumber = 1;

  /**
   * This the the number of pages that we want to show.
   *
   * The data isn't necessarily loaded for all of the pages, but this lets us
   * know how many cells we should render.
   */
  @state() private pagesToRender = this.initialPageNumber;

  @state() private searchResultsLoading = false;

  @state() private facetsLoading = false;

  /**
   * When we're animated scrolling to the page, we don't want to fetch
   * all of the pages as it scrolls so this lets us know if we're scrolling
   */
  private isScrollingToCell = false;

  /**
   * When we've reached the end of the data, stop trying to fetch more
   */
  private endOfDataReached = false;

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

  // this is the total number of tiles we expect if
  // the data returned is a full page worth
  // this is useful for putting in placeholders for the expected number of tiles
  private get estimatedTileCount(): number {
    return this.pagesToRender * this.pageSize;
  }

  // this is the actual number of tiles in the datasource,
  // which is useful for removing excess placeholder tiles
  // once we reached the end of the data
  private get actualTileCount(): number {
    return Object.keys(this.dataSource).reduce(
      (acc, page) => acc + this.dataSource[page].length,
      0
    );
  }

  /**
   * The results per page so we can paginate.
   *
   * This allows us to start in the middle of the search results and
   * fetch data before or after the current page. If we don't have a key
   * for the previous/next page, we'll fetch the next/previous page to populate it
   */
  private dataSource: Record<string, TileModel[]> = {};

  @query('infinite-scroller')
  private infiniteScroller!: InfiniteScroller;

  /**
   *
   * @param pageNumber
   * @param scroll
   */
  goToPage(pageNumber: number) {
    this.initialPageNumber = pageNumber;
    this.pagesToRender = pageNumber;
    this.scrollToPage(pageNumber);
  }

  render() {
    return html`
      <h1>Collection Browser</h1>

      <div id="query">
        <ul>
          <li>Base Query: ${this.baseQuery}</li>
          <li>Facet Query: ${this.facetQuery}</li>
          <li>Additional Query: ${this.additionalQueryClause}</li>
          <li>Sort: ${this.sortParam?.field} ${this.sortParam?.direction}</li>
          <li>Full Query: ${this.fullQuery}</li>
        </ul>
      </div>

      <div id="content-container">
        <div id="facets-container">
          ${this.facetsLoading ? this.loadingTemplate : nothing}
          <collection-facets
            @facetsChanged=${this.facetsChanged}
          ></collection-facets>
        </div>
        <div id="infinite-scroller-container">
          ${this.searchResultsLoading ? this.loadingTemplate : nothing}
          <infinite-scroller
            class="${this.displayMode}"
            .cellProvider=${this}
            .placeholderCellTemplate=${this.placeholderCellTemplate}
            @scrollThresholdReached=${this.scrollThresholdReached}
            @cellWidthChanged=${this.cellWidthChanged}
            @visibleCellsChanged=${this.visibleCellsChanged}
          >
          </infinite-scroller>
        </div>
      </div>
    `;
  }

  private get loadingTemplate() {
    return html`
      <div class="loading-cover">
        <circular-activity-indicator></circular-activity-indicator>
      </div>
    `;
  }

  updated(changed: PropertyValues) {
    if (changed.has('displayMode') || changed.has('showDeleteButtons')) {
      this.infiniteScroller.reload();
    }
    if (
      changed.has('baseQuery') ||
      changed.has('additionalQueryClause') ||
      changed.has('sortParam') ||
      changed.has('selectedFacets')
    ) {
      this.handleQueryChange();
    }
    if (changed.has('pagesToRender')) {
      if (!this.endOfDataReached) {
        this.infiniteScroller.itemCount = this.estimatedTileCount;
      }
    }
  }

  /**
   * When the visible cells change from the infinite scroller, we want to emit
   * which page is currently visible so the consumer can update its UI or the URL
   *
   * @param e
   * @returns
   */
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

  // we only want to scroll on the very first query change
  // so this keeps track of whether we've already set the initial query
  private initialQueryChangeHappened = false;

  // this lets us store the query key so we know if it's actually changed or not
  private previousQueryKey?: string;

  private async handleQueryChange() {
    // only reset if the query has actually changed
    if (this.pageFetchQueryKey === this.previousQueryKey) return;
    this.previousQueryKey = this.pageFetchQueryKey;

    this.dataSource = {};
    this.pageFetchesInProgress = {};
    this.endOfDataReached = false;
    this.pagesToRender = this.initialPageNumber;
    if (!this.initialQueryChangeHappened && this.initialPageNumber > 1) {
      this.scrollToPage(this.initialPageNumber);
    }
    this.initialQueryChangeHappened = true;

    await Promise.all([this.doInitialPageFetch(), this.fetchFacets()]);
  }

  @state() private selectedFacets: Record<string, string[]> = {};

  private async doInitialPageFetch() {
    this.searchResultsLoading = true;
    await this.fetchPage(this.initialPageNumber);
    this.searchResultsLoading = false;
  }

  private get fullQuery(): string | undefined {
    if (!this.baseQuery) return undefined;
    let fullQuery = this.baseQuery;
    const { facetQuery, additionalQueryClause } = this;
    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (additionalQueryClause) {
      fullQuery += ` AND ${additionalQueryClause}`;
    }
    return fullQuery;
  }

  private get facetQuery(): string | undefined {
    const facetQuery = [];
    for (const [facetName, selectedValues] of Object.entries(
      this.selectedFacets
    )) {
      const values: string[] = [];
      for (const value of selectedValues) {
        values.push(`${facetName}:"${value}"`);
      }
      const valueQuery = values.join(' OR ');
      facetQuery.push(`(${valueQuery})`);
    }
    return facetQuery.length > 0 ? `(${facetQuery.join(' AND ')})` : undefined;
  }

  facetsChanged(e: CustomEvent<Record<string, string[]>>) {
    this.selectedFacets = e.detail;
  }

  // 'subjectSorter',
  // 'mediatypeSorter',
  // 'languageSorter',
  // 'creatorSorter',
  // 'collection' => Facet::MAX_SHOW_COLLECTION,
  // 'year' => Facet::MAX_SHOW_YEAR,

  // const MAX_SHOW = 6;
  // const MAX_SHOW_COLLECTION = 12;
  // const MAX_SHOW_TXT = 50; // "search inside" API has *actual* lower number; we wanna pass thru facets ;-)
  // const MAX_SHOW_YEAR = 50; // "year" facet (up to 50 entries)

  // // MORF == MORe Facets 8-)
  // const MORF_MAX_FACETS = 5000;
  // const MORF_MAX_FACETS_NO_JS = 1000;

  // const KEY_YEAR = 'year';

  // // YEAR histogram
  // const YEAR_HISTOGRAM_BIN_COUNT_TARGET = 50;

  private async fetchFacets() {
    if (!this.fullQuery) return;

    const aggregations = new AggregateSearchParams([
      {
        field: 'subjectSorter',
        size: 6,
      },
      {
        field: 'mediatypeSorter',
        size: 6,
      },
      {
        field: 'languageSorter',
        size: 6,
      },
      {
        field: 'creatorSorter',
        size: 6,
      },
      {
        field: 'collection',
        size: 12,
      },
      {
        field: 'year',
        size: 50,
      },
    ]);

    const params = new SearchParams({
      query: this.fullQuery,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    });
    this.facetsLoading = true;
    const results = await this.searchService?.search(params);
    this.facetsLoading = false;

    this.collectionFacets.aggregations =
      results?.success?.response.aggregations;
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

  /**
   * The query key is a string that uniquely identifies the current query
   *
   * This lets us keep track of queries so we don't persist data that's
   * no longer relevant.
   */
  private get pageFetchQueryKey() {
    return `${this.fullQuery}-${this.sortParam?.asString}`;
  }

  // this maps the query to the pages being fetched for that query
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  async fetchPage(pageNumber: number) {
    if (!this.fullQuery) return;

    // if we already have data, don't fetch again
    if (this.dataSource[pageNumber]) return;

    if (this.endOfDataReached) return;

    // if a fetch is already in progress for this query and page, don't fetch again
    const { pageFetchQueryKey } = this;
    const pageFetches =
      this.pageFetchesInProgress[pageFetchQueryKey] ?? new Set();
    if (pageFetches.has(pageNumber)) return;
    pageFetches.add(pageNumber);
    this.pageFetchesInProgress[pageFetchQueryKey] = pageFetches;

    const sortParams = this.sortParam ? [this.sortParam] : [];
    const params = new SearchParams({
      query: this.fullQuery,
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
        'addeddate',
        'creator',
      ],
      page: pageNumber,
      rows: this.pageSize,
      sort: sortParams,
    });
    const results = await this.searchService?.search(params);
    const success = results?.success;

    if (!success) return;

    // this is checking to see if the query has changed since the data was fetched
    // if so, we just want to discard the data since there should be a new query
    // right behind it
    const searchQuery = success.responseHeader.params.qin;
    const searchSort = success.responseHeader.params.sort;
    const queryChangedSinceFetch =
      searchQuery !== this.fullQuery || searchSort !== this.sortParam?.asString;
    if (queryChangedSinceFetch) return;

    const { docs } = success.response;
    if (docs && docs.length > 0) {
      this.updateDataSource(pageNumber, docs);
    }
    if (docs.length < this.pageSize) {
      this.endOfDataReached = true;
      // this updates the infinite scroller to show the actual size
      this.infiniteScroller.itemCount = this.actualTileCount;
    }
    this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber);
    this.searchResultsLoading = false;
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

  /**
   * Update the datasource from the fetch response
   *
   * @param pageNumber
   * @param docs
   */
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
        dateAdded: doc.addeddate?.value,
        creator: doc.creator?.value,
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

    #content-container {
      display: flex;
    }

    #infinite-scroller-container {
      flex: 1;
      position: relative;
    }

    #facets-container {
      width: 15rem;
      position: relative;
    }

    .loading-cover {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(255, 255, 255, 0.75);
      display: flex;
      justify-content: center;
      z-index: 1;
      padding-top: 50px;
    }

    circular-activity-indicator {
      width: 30px;
      height: 30px;
    }

    infinite-scroller {
      display: block;
    }

    infinite-scroller.list-compact {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        100%
      );
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        5rem
      );
      --infiniteScrollerCellMaxHeight: var(
        --collectionBrowserCellMaxHeight,
        5rem
      );
    }

    infinite-scroller.list-detail {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        100%
      );
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        5rem
      );
    }

    infinite-scroller.grid {
      --infiniteScrollerCellMinWidth: var(
        --collectionBrowserCellMinWidth,
        18rem
      );
      --infiniteScrollerCellMaxWidth: var(--collectionBrowserCellMaxWidth, 1fr);
      --infiniteScrollerCellMinHeight: var(
        --collectionBrowserCellMinHeight,
        29rem
      );
      --infiniteScrollerCellMaxHeight: var(
        --collectionBrowserCellMaxHeight,
        29rem
      );
    }
  `;
}
