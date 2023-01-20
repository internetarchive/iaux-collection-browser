import {
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import { getCookie, setCookie } from 'typescript-cookie';
import {
  MetadataSortField,
  FacetOption,
  CollectionBrowserContext,
  CollectionDisplayMode,
  SelectedFacets,
  SortField,
  FacetBucket,
  FacetState,
  URLFieldToSortField,
  URLSortField,
  getDefaultSelectedFacets,
  MetadataFieldToURLField,
} from './models';
import { arrayEquals } from './utils/array-equals';

export interface RestorationState {
  displayMode?: CollectionDisplayMode;
  searchType?: SearchType;
  sortParam?: SortParam;
  selectedSort?: SortField;
  sortDirection?: SortDirection;
  selectedFacets: SelectedFacets;
  baseQuery?: string;
  currentPage?: number;
  titleQuery?: string;
  creatorQuery?: string;
  minSelectedDate?: string;
  maxSelectedDate?: string;
  selectedTitleFilter?: string;
  selectedCreatorFilter?: string;
}

export interface RestorationStateHandlerInterface {
  persistState(state: RestorationState): void;
  getRestorationState(): RestorationState;
}

export class RestorationStateHandler
  implements RestorationStateHandlerInterface
{
  private context: CollectionBrowserContext;

  private cookieDomain = '.archive.org';

  private cookieExpiration = 30;

  private cookiePath = '/';

  constructor(options: { context: CollectionBrowserContext }) {
    this.context = options.context;
  }

  persistState(state: RestorationState): void {
    if (state.displayMode) this.persistViewStateToCookies(state.displayMode);
    this.persistQueryStateToUrl(state);
  }

  getRestorationState(): RestorationState {
    const restorationState = this.loadQueryStateFromUrl();
    const displayMode = this.loadTileViewStateFromCookies();
    restorationState.displayMode = displayMode;
    return restorationState;
  }

  private persistViewStateToCookies(displayMode: CollectionDisplayMode) {
    const gridState = displayMode === 'grid' ? 'tiles' : 'lists';
    setCookie(`view-${this.context}`, gridState, {
      domain: this.cookieDomain,
      expires: this.cookieExpiration,
      path: this.cookiePath,
    });
    const detailsState = displayMode === 'list-detail' ? 'showdetails' : '';
    setCookie(`showdetails-${this.context}`, detailsState, {
      domain: this.cookieDomain,
      expires: this.cookieExpiration,
      path: this.cookiePath,
    });
  }

  private loadTileViewStateFromCookies(): CollectionDisplayMode {
    const viewState = getCookie(`view-${this.context}`);
    const detailsState = getCookie(`showdetails-${this.context}`);
    if (viewState === 'tiles' || viewState === undefined) return 'grid';
    if (detailsState === 'showdetails') return 'list-detail';
    return 'list-compact';
  }

  private persistQueryStateToUrl(state: RestorationState) {
    console.log('persisting...', window.location.href, state);
    const url = new URL(window.location.href);
    const oldParams = new URLSearchParams(url.searchParams);
    const newParams = this.removeRecognizedParams(url.searchParams);

    if (state.baseQuery) {
      newParams.set('query', state.baseQuery);
    }

    if (state.searchType === SearchType.FULLTEXT) {
      newParams.set('sin', 'TXT');
    }

    if (state.currentPage) {
      if (state.currentPage > 1) {
        newParams.set('page', state.currentPage.toString());
      } else {
        newParams.delete('page');
      }
    }

    if (state.sortParam) {
      const prefix = state.sortParam.direction === 'desc' ? '-' : '';
      const readableSortField =
        MetadataFieldToURLField[state.sortParam.field as MetadataSortField];
      newParams.set('sort', `${prefix}${readableSortField}`);
    }

    if (state.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        state.selectedFacets
      )) {
        const facetEntries = Object.entries(facetValues);
        // eslint-disable-next-line no-continue
        if (facetEntries.length === 0) continue;
        for (const [key, data] of facetEntries) {
          const notValue = data.state === 'hidden';
          const paramValue = `${facetName}:"${key}"`;
          if (notValue) {
            newParams.append('not[]', paramValue);
          } else {
            newParams.append('and[]', paramValue);
          }
        }
      }
    }

    if (state.minSelectedDate && state.maxSelectedDate) {
      newParams.append(
        'and[]',
        `year:[${state.minSelectedDate} TO ${state.maxSelectedDate}]`
      );
    }

    if (state.titleQuery) {
      newParams.append('and[]', state.titleQuery);
    }

    if (state.creatorQuery) {
      newParams.append('and[]', state.creatorQuery);
    }

    // Ensure we aren't pushing consecutive identical states to the history stack.
    //  - If the state has changed, we push a new history entry.
    //  - If only the page number has changed, we replace the current history entry.
    //  - If the state hasn't changed, then do nothing.
    let historyMethod: 'pushState' | 'replaceState' = 'pushState';
    const nonQueryParamsMatch = this.paramsMatch(oldParams, newParams, [
      'sin',
      'sort',
      'and[]',
      'not[]',
    ]);

    if (
      nonQueryParamsMatch &&
      this.paramsMatch(oldParams, newParams, ['query'])
    ) {
      // For page number, we want to replace the page state when it changes,
      // not push a new history entry. If it hasn't changed, then we're done.
      if (this.paramsMatch(oldParams, newParams, ['page'])) {
        return;
      }
      historyMethod = 'replaceState';
    } else if (nonQueryParamsMatch && this.hasLegacyParam(oldParams)) {
      // Similarly, if the only non-matching param was a legacy query param, then
      // we just want to overwrite it.
      historyMethod = 'replaceState';
    }

    window.history[historyMethod]?.(
      {
        query: state.baseQuery,
        searchType: state.searchType,
        page: state.currentPage,
        sort: state.sortParam,
        minDate: state.minSelectedDate,
        maxDate: state.maxSelectedDate,
        facets: state.selectedFacets,
      },
      '',
      url
    );
    console.log('persisted!', window.location.href);
  }

  private loadQueryStateFromUrl(): RestorationState {
    console.log('restoring from', window.location.href);
    const url = new URL(window.location.href);
    const searchInside = url.searchParams.get('sin');
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    const sortQuery = url.searchParams.get('sort');
    const facetAnds = url.searchParams.getAll('and[]');
    const facetNots = url.searchParams.getAll('not[]');

    // Legacy search allowed `q` and `search` params for the query, so in the interest
    // of backwards-compatibility with old bookmarks, we recognize those here too.
    // (However, they still get upgraded to a `query` param when we persist our state
    // to the URL).
    const legacySearchQuery =
      url.searchParams.get('q') ?? url.searchParams.get('search');

    const restorationState: RestorationState = {
      selectedFacets: getDefaultSelectedFacets(),
    };

    if (searchQuery) {
      restorationState.baseQuery = searchQuery;
    } else if (legacySearchQuery) {
      restorationState.baseQuery = legacySearchQuery;
    }

    if (searchInside) {
      restorationState.searchType =
        searchInside === 'TXT' ? SearchType.FULLTEXT : SearchType.METADATA;
    }

    if (pageNumber) {
      const parsed = parseInt(pageNumber, 10);
      restorationState.currentPage = parsed;
    } else {
      restorationState.currentPage = 1;
    }

    if (sortQuery) {
      // check for two different sort formats: `date desc` and `-date`
      const hasSpace = sortQuery.indexOf(' ') > -1;
      if (hasSpace) {
        const [field, direction] = sortQuery.split(' ');
        const metadataField = URLFieldToSortField[field as URLSortField];

        if (metadataField) {
          restorationState.selectedSort = metadataField;
        }
        if (direction === 'desc' || direction === 'asc') {
          restorationState.sortDirection = direction as SortDirection;
        }
      } else {
        const direction = sortQuery.startsWith('-') ? 'desc' : 'asc';
        const field = sortQuery.startsWith('-')
          ? sortQuery.slice(1)
          : sortQuery;

        const metadataField = URLFieldToSortField[field as URLSortField];
        if (metadataField) {
          restorationState.selectedSort = metadataField;
          restorationState.sortDirection = direction as SortDirection;
        }
      }
    }

    if (facetAnds) {
      facetAnds.forEach(and => {
        // eslint-disable-next-line prefer-const
        let [field, value] = and.split(':');

        // Legacy search allowed and[] fields like 'creatorSorter', 'languageSorter', etc.
        // which we want to normalize to 'creator', 'language', etc. if redirected here.
        field = field.replace(/Sorter$/, '');

        switch (field) {
          case 'year': {
            const [minDate, maxDate] = value.split(' TO ');
            // we have two potential ways of filtering by date:
            // the range with "date TO date" or the single date with "date"
            // this is checking for the range case and if we don't have those, fall
            // back to the single date case
            if (minDate && maxDate) {
              restorationState.minSelectedDate = minDate.substring(
                1,
                minDate.length
              );
              restorationState.maxSelectedDate = maxDate.substring(
                0,
                maxDate.length - 1
              );
            } else {
              this.setSelectedFacetState(
                restorationState.selectedFacets,
                field as FacetOption,
                value,
                'selected'
              );
            }
            break;
          }
          case 'firstTitle':
            restorationState.selectedTitleFilter = value;
            break;
          case 'firstCreator':
            restorationState.selectedCreatorFilter = value;
            break;
          default:
            this.setSelectedFacetState(
              restorationState.selectedFacets,
              field as FacetOption,
              value,
              'selected'
            );
        }
      });
    }

    if (facetNots) {
      facetNots.forEach(not => {
        const [field, value] = not.split(':');
        this.setSelectedFacetState(
          restorationState.selectedFacets,
          field as FacetOption,
          value,
          'hidden'
        );
      });
    }

    console.log('restored!', window.location.href, restorationState);
    return restorationState;
  }

  // remove optional opening and closing quotes from a string
  private stripQuotes(value: string): string {
    if (value.startsWith('"') && value.endsWith('"')) {
      return value.substring(1, value.length - 1);
    }

    return value;
  }

  /**
   * Returns whether the two given URLSearchParams objects have
   * identical values for all of the given param keys. If either
   * object contains more than one value for a given key, then
   * all of the values for that key must match (disregarding order).
   */
  private paramsMatch(
    searchParams1: URLSearchParams,
    searchParams2: URLSearchParams,
    keys: string[]
  ): boolean {
    return keys.every(key =>
      arrayEquals(
        searchParams1.getAll(key).sort(),
        searchParams2.getAll(key).sort()
      )
    );
  }

  /**
   * Deletes any params from the given URLSearchParams object that are recognized
   * when loading state from the URL.
   */
  private removeRecognizedParams(
    searchParams: URLSearchParams
  ): URLSearchParams {
    // Remove all of our standard params
    searchParams.delete('query');
    searchParams.delete('sin');
    searchParams.delete('page');
    searchParams.delete('sort');
    searchParams.delete('and[]');
    searchParams.delete('not[]');

    // Also remove some legacy params that should have been upgraded to the ones above
    searchParams.delete('q');
    searchParams.delete('search');

    return searchParams;
  }

  /**
   * Returns whether the given URLSearchParams object contains a param that is
   * only recognized as a holdover from legacy search, and should not be
   * persisted to the URL.
   */
  private hasLegacyParam(searchParams: URLSearchParams): boolean {
    return searchParams.has('q') || searchParams.has('search');
  }

  /**
   * Sets the facet state for the given field & value to the given state,
   * creating any previously-undefined buckets as needed.
   */
  private setSelectedFacetState(
    selectedFacets: SelectedFacets,
    field: FacetOption,
    value: string,
    state: FacetState
  ): void {
    const facet = selectedFacets[field];
    if (!facet) return; // Unrecognized facet group, ignore it.

    const unQuotedValue = this.stripQuotes(value);
    facet[unQuotedValue] ??= this.getDefaultBucket(value);
    facet[unQuotedValue].state = state;
  }

  /** Returns a default bucket with the given key, count of 0, and state 'none'. */
  private getDefaultBucket(key: string): FacetBucket {
    return {
      key,
      count: 0,
      state: 'none',
    };
  }
}
