import { SearchType, SortDirection } from '@internetarchive/search-service';
import { getCookie, setCookie } from 'typescript-cookie';
import {
  FacetOption,
  CollectionBrowserContext,
  CollectionDisplayMode,
  SelectedFacets,
  SortField,
  FacetBucket,
  FacetState,
  getDefaultSelectedFacets,
  sortOptionFromAPIString,
  SORT_OPTIONS,
  tvClipURLParamsToFilters,
} from './models';
import { arrayEquals } from './utils/array-equals';

export interface RestorationState {
  displayMode?: CollectionDisplayMode;
  searchType?: SearchType;
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

export interface RestorationStatePersistOptions {
  forceReplace?: boolean;
  persistMetadataSearchType?: boolean;
}

export interface RestorationStateHandlerInterface {
  persistState(
    state: RestorationState,
    options?: RestorationStatePersistOptions,
  ): void;
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

  persistState(
    state: RestorationState,
    options: RestorationStatePersistOptions = {},
  ): void {
    if (state.displayMode) this.persistViewStateToCookies(state.displayMode);
    this.persistQueryStateToUrl(state, options);
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

  private persistQueryStateToUrl(
    state: RestorationState,
    options: RestorationStatePersistOptions = {},
  ) {
    const url = new URL(window.location.href);
    const oldParams = new URLSearchParams(url.searchParams);
    const newParams = this.removeRecognizedParams(url.searchParams);

    let replaceEmptySin = false;

    if (state.baseQuery) {
      newParams.set('query', state.baseQuery);
    }

    switch (state.searchType) {
      case SearchType.FULLTEXT:
        newParams.set('sin', 'TXT');
        break;
      case SearchType.RADIO:
        newParams.set('sin', 'RADIO');
        break;
      case SearchType.TV:
        newParams.set('sin', 'TV');
        break;
      case SearchType.METADATA:
        // Only write the param for metadata when it isn't already the default.
        // Currently this is only the case within TV collections.
        if (options.persistMetadataSearchType || oldParams.get('sin') === 'MD')
          newParams.set('sin', 'MD');
        break;
    }

    if (oldParams.get('sin') === '') {
      // Treat empty sin the same as no sin at all
      oldParams.delete('sin');
      replaceEmptySin = true;
    }

    if (state.currentPage) {
      if (state.currentPage > 1) {
        newParams.set('page', state.currentPage.toString());
      } else {
        newParams.delete('page');
      }
    }

    if (state.selectedSort) {
      const sortOption = SORT_OPTIONS[state.selectedSort];
      let prefix = this.sortDirectionPrefix(state.sortDirection);

      if (sortOption.field === SortField.unrecognized) {
        // For unrecognized sorts, use the existing param, possibly updating its direction
        const oldSortParam = oldParams.get('sort') ?? '';
        const { field, direction } =
          this.getSortFieldAndDirection(oldSortParam);

        // Use the state-specified direction if available, or extract one from the param if not
        if (!state.sortDirection) prefix = this.sortDirectionPrefix(direction);

        if (field) {
          newParams.set('sort', `${prefix}${field}`);
        } else {
          newParams.set('sort', oldSortParam);
        }
      } else if (sortOption.shownInURL) {
        // Otherwise, use the canonical API form of the sort option
        const canonicalApiSort = sortOption.urlNames[0];
        newParams.set('sort', `${prefix}${canonicalApiSort}`);
      }
    }

    if (state.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        state.selectedFacets,
      )) {
        const facetEntries = Object.entries(facetValues);
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

    const dateField =
      state.minSelectedDate?.includes('-') ||
      state.maxSelectedDate?.includes('-')
        ? 'date'
        : 'year';

    if (state.minSelectedDate && state.maxSelectedDate) {
      newParams.append(
        'and[]',
        `${dateField}:[${state.minSelectedDate} TO ${state.maxSelectedDate}]`,
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
    let historyMethod: 'pushState' | 'replaceState' = options.forceReplace
      ? 'replaceState'
      : 'pushState';
    const nonQueryParamsMatch = this.paramsMatch(oldParams, newParams, [
      'sin',
      'sort',
      'and[]',
      'not[]',
      'only_commercials',
      'only_factchecks',
      'only_quotes',
    ]);

    if (
      nonQueryParamsMatch &&
      this.paramsMatch(oldParams, newParams, ['query'])
    ) {
      if (replaceEmptySin) {
        // Get rid of any empty sin param
        newParams.delete('sin');
      } else if (this.paramsMatch(oldParams, newParams, ['page'])) {
        // For page number, we want to replace the page state when it changes,
        // not push a new history entry. If it hasn't changed, then we're done.
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
        sort: { field: state.selectedSort, direction: state.sortDirection },
        minDate: state.minSelectedDate,
        maxDate: state.maxSelectedDate,
        facets: state.selectedFacets,
      },
      '',
      url,
    );
  }

  private loadQueryStateFromUrl(): RestorationState {
    const url = new URL(window.location.href);
    const searchInside = url.searchParams.get('sin');
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    const sortQuery = url.searchParams.get('sort');
    const facetAnds = url.searchParams.getAll('and[]');
    const facetNots = url.searchParams.getAll('not[]');

    // We also need to check for the presence of params like 'and[0]', 'not[1]', etc.
    // since Facebook automatically converts URLs with [] into those forms.
    for (const [key, val] of url.searchParams.entries()) {
      if (/and\[\d+\]/.test(key)) {
        facetAnds.push(val);
      } else if (/not\[\d+\]/.test(key)) {
        facetNots.push(val);
      }
    }

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

    switch (searchInside) {
      case 'TXT':
        restorationState.searchType = SearchType.FULLTEXT;
        break;
      case 'RADIO':
        restorationState.searchType = SearchType.RADIO;
        break;
      case 'TV':
        restorationState.searchType = SearchType.TV;
        break;
      case 'MD':
        restorationState.searchType = SearchType.METADATA;
        break;
      default:
        restorationState.searchType = SearchType.DEFAULT;
        break;
    }

    if (pageNumber) {
      const parsed = parseInt(pageNumber, 10);
      restorationState.currentPage = parsed;
    } else {
      restorationState.currentPage = 1;
    }

    if (sortQuery) {
      const { field, direction } = this.getSortFieldAndDirection(sortQuery);

      const sortOption = sortOptionFromAPIString(field);
      restorationState.selectedSort = sortOption.field;

      if (['asc', 'desc'].includes(direction)) {
        restorationState.sortDirection = direction as SortDirection;
      }
    }

    if (facetAnds) {
      facetAnds.forEach(and => {
        // eslint-disable-next-line prefer-const
        let [field, value] = and.split(':');

        // Legacy search allowed and[] fields like 'creatorSorter', 'languageSorter', etc.
        // which we want to normalize to 'creator', 'language', etc. if redirected here.
        field = field.replace(/Sorter$/, '');

        // Legacy search also allowed a form of negative faceting like `and[]=-collection:foo`
        // which we want to normalize to a not[] param instead
        if (field.startsWith('-')) {
          facetNots.push(and.slice(1));
          return;
        }

        switch (field) {
          case 'date':
          case 'year': {
            const [minDate, maxDate] = value.split(' TO ');
            // we have two potential ways of filtering by date:
            // the range with "date TO date" or the single date with "date"
            // this is checking for the range case and if we don't have those, fall
            // back to the single date case
            if (minDate && maxDate) {
              restorationState.minSelectedDate = minDate.substring(
                1,
                minDate.length,
              );
              restorationState.maxSelectedDate = maxDate.substring(
                0,
                maxDate.length - 1,
              );
            } else {
              this.setSelectedFacetState(
                restorationState.selectedFacets,
                field as FacetOption,
                value,
                'selected',
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
              'selected',
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
          'hidden',
        );
      });
    }

    // TV clip special filters (carryovers from legacy page)
    for (const [paramKey, facetKey] of Object.entries(
      tvClipURLParamsToFilters,
    )) {
      if (url.searchParams.get(paramKey)) {
        this.setSelectedFacetState(
          restorationState.selectedFacets,
          'clip_type',
          facetKey,
          'selected',
        );
        break;
      }
    }

    return restorationState;
  }

  /**
   * Converts a URL sort param into a field/direction pair, if possible.
   * Either or both may be undefined if the param is not in a recognized format.
   */
  private getSortFieldAndDirection(sortParam: string) {
    // check for two different sort formats: `date desc` and `-date`
    const hasSpace = sortParam.indexOf(' ') > -1;
    let field;
    let direction;
    if (hasSpace) {
      [field, direction] = sortParam.split(' ');
    } else {
      field = sortParam.startsWith('-') ? sortParam.slice(1) : sortParam;
      direction = sortParam.startsWith('-') ? 'desc' : 'asc';
    }

    return { field, direction };
  }

  /** Returns the `-` prefix for `desc` sort, or the empty string otherwise. */
  private sortDirectionPrefix(sortDirection?: string) {
    return sortDirection === 'desc' ? '-' : '';
  }

  /** Remove optional opening and closing quotes from a string */
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
    keys: string[],
  ): boolean {
    return keys.every(key =>
      arrayEquals(
        searchParams1.getAll(key).sort(),
        searchParams2.getAll(key).sort(),
      ),
    );
  }

  /**
   * Deletes any params from the given URLSearchParams object that are recognized
   * when loading state from the URL.
   */
  private removeRecognizedParams(
    searchParams: URLSearchParams,
  ): URLSearchParams {
    // Remove all of our standard params
    searchParams.delete('query');
    searchParams.delete('sin');
    searchParams.delete('page');
    searchParams.delete('sort');
    searchParams.delete('and[]');
    searchParams.delete('not[]');

    // Remove any and/not facet params that contain numbers in their square brackets
    for (const key of searchParams.keys()) {
      if (/(and|not)\[\d+\]/.test(key)) {
        searchParams.delete(key);
      }
    }

    // Also remove some legacy params that should have been upgraded to the ones above
    searchParams.delete('q');
    searchParams.delete('search');
    searchParams.delete('only_commercials');
    searchParams.delete('only_factchecks');
    searchParams.delete('only_quotes');

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
    state: FacetState,
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
