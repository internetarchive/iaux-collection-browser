import {
  Aggregation,
  SortParam,
  SearchParams,
  SearchService,
  SearchServiceInterface,
  Metadata,
  AggregateSearchParams,
} from '@internetarchive/search-service';
import { SelectedFacets } from './models';
import type { TileModel } from './models';

export interface DataManagerInterface {
  fetchFullYearHistogram(): Promise<Aggregation | undefined>;
  fetchFacets(): Promise<Record<string, Aggregation> | undefined>;
}

export class DataManager implements DataManagerInterface {
  searchService: SearchServiceInterface = SearchService.default;

  dataSource: Record<string, TileModel[]> = {};

  titleQuery?: string;

  creatorQuery?: string;

  baseQuery?: string;

  sortParam: SortParam | null = null;

  dateRangeQueryClause?: string;

  pageSize = 50;

  selectedFacets: SelectedFacets = {
    subject: {},
    creator: {},
    mediatype: {},
    language: {},
    collection: {},
    year: {},
  };

  endOfDataReached = false;

  // this maps the query to the pages being fetched for that query
  private pageFetchesInProgress: Record<string, Set<number>> = {};

  /**
   * The query key is a string that uniquely identifies the current query
   * without the date range.
   *
   * If this doesn't change, we don't need to re-fetch the histogram date range
   */
  private get fullQueryNoDateKey() {
    return `${this.fullQueryWithoutDate}-${this.sortParam?.asString}`;
  }

  /**
   * If we haven't changed the query, we don't need to fetch the full year histogram
   *
   * @private
   * @type {string}
   * @memberof CollectionBrowser
   */
  private previousFullQueryNoDate?: string;

  /**
   * This method is similar to fetching the facets above,
   * but only fetching the year histogram. There is a subtle difference
   * in how you have to fetch the year histogram where you can't use the
   * advanced JSON syntax like the other aggregations. It's a special
   * case that @ximm put it place.
   */
  async fetchFullYearHistogram(): Promise<Aggregation | undefined> {
    const { fullQueryNoDateKey } = this;
    if (
      !this.fullQueryWithoutDate ||
      fullQueryNoDateKey === this.previousFullQueryNoDate
    )
      return undefined;
    this.previousFullQueryNoDate = fullQueryNoDateKey;

    const aggregations = new AggregateSearchParams({
      simpleParams: ['year'],
    });

    const params = new SearchParams({
      query: this.fullQueryWithoutDate,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    });

    // this.fullYearAggregationLoading = true;
    const results = await this.searchService?.search(params);
    // this.fullYearAggregationLoading = false;

    // this.fullYearsHistogramAggregation =
    return results?.success?.response?.aggregations?.year_histogram;
  }

  async fetchFacets(): Promise<Record<string, Aggregation> | undefined> {
    if (!this.fullQuery) return undefined;

    const aggregations = new AggregateSearchParams({
      advancedParams: [
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
      ],
    });

    const params = new SearchParams({
      query: this.fullQuery,
      fields: ['identifier'],
      aggregations,
      rows: 1,
    });
    // this.facetsLoading = true;
    const results = await this.searchService?.search(params);
    // this.facetsLoading = false;

    return results?.success?.response.aggregations;
  }

  /**
   * Generates a query string for the given facets
   *
   * Example: `mediatype:("collection" OR "audio" OR -"etree") AND year:("2000" OR "2001")`
   */
  private get facetQuery(): string | undefined {
    const facetQuery = [];
    for (const [facetName, facetValues] of Object.entries(
      this.selectedFacets
    )) {
      const facetEntries = Object.entries(facetValues);
      // eslint-disable-next-line no-continue
      if (facetEntries.length === 0) continue;
      const facetValuesArray: string[] = [];
      for (const [key, facetState] of facetEntries) {
        facetValuesArray.push(`${facetState === 'hidden' ? '-' : ''}"${key}"`);
      }
      const valueQuery = facetValuesArray.join(` OR `);
      facetQuery.push(`${facetName}:(${valueQuery})`);
    }
    return facetQuery.length > 0 ? `(${facetQuery.join(' AND ')})` : undefined;
  }

  private get sortFilterQueries(): string {
    const queries = [this.titleQuery, this.creatorQuery];
    return queries.filter(q => q).join(' AND ');
  }

  private get fullQueryWithoutDate(): string | undefined {
    if (!this.baseQuery) return undefined;
    let fullQuery = this.baseQuery;
    const { facetQuery, sortFilterQueries } = this;
    if (facetQuery) {
      fullQuery += ` AND ${facetQuery}`;
    }
    if (sortFilterQueries) {
      fullQuery += ` AND ${sortFilterQueries}`;
    }
    return fullQuery;
  }

  private get fullQuery(): string | undefined {
    let { fullQueryWithoutDate } = this;
    const { dateRangeQueryClause } = this;
    if (dateRangeQueryClause) {
      fullQueryWithoutDate += ` AND ${dateRangeQueryClause}`;
    }
    return fullQueryWithoutDate;
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
        'avg_rating',
        'num_favorites',
        'num_reviews',
        'item_count',
        'description',
        'date',
        'addeddate',
        'publicdate',
        'reviewdate',
        'creator',
        'collections_raw',
      ],
      page: pageNumber,
      rows: this.pageSize,
      sort: sortParams,
    });
    const results = await this.searchService?.search(params);
    const success = results?.success;

    if (!success) return;

    // this.totalResults = success.response.numFound;

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
      // this.infiniteScroller.itemCount = this.actualTileCount;
    }
    this.pageFetchesInProgress[pageFetchQueryKey]?.delete(pageNumber);
    // this.searchResultsLoading = false;
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
        dateAdded: doc.addeddate?.value,
        dateArchived: doc.publicdate?.value,
        dateReviewed: doc.reviewdate?.value,
        datePublished: doc.date?.value,
        creator: doc.creator?.value,
        averageRating: doc.avg_rating?.value,
        collections: doc.collections_raw?.values ?? [],
      });
    });
    datasource[pageNumber] = tiles;
    this.dataSource = datasource;
    // const visiblePages = this.currentVisiblePageNumbers;
    // const needsReload = visiblePages.includes(pageNumber);
    // if (needsReload) {
    //   this.infiniteScroller.reload();
    // }
  }
}
