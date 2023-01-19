import {
  SearchType,
  SortDirection,
  SortParam,
} from '@internetarchive/search-service';
import { getCookie, setCookie } from 'typescript-cookie';
import {
  MetadataFieldToSortField,
  MetadataSortField,
  FacetOption,
  CollectionBrowserContext,
  CollectionDisplayMode,
  SelectedFacets,
  SortField,
  FacetBucket,
  FacetState,
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
    const url = new URL(window.location.href);
    const { searchParams } = url;
    const oldParams = new URLSearchParams(searchParams);

    searchParams.delete('query');
    searchParams.delete('sin');
    searchParams.delete('page');
    searchParams.delete('sort');
    searchParams.delete('and[]');
    searchParams.delete('not[]');

    if (state.baseQuery) {
      searchParams.set('query', state.baseQuery);
    }

    if (state.searchType === SearchType.FULLTEXT) {
      searchParams.set('sin', 'TXT');
    }

    if (state.currentPage) {
      if (state.currentPage > 1) {
        searchParams.set('page', state.currentPage.toString());
      } else {
        searchParams.delete('page');
      }
    }

    if (state.sortParam) {
      const prefix = state.sortParam.direction === 'desc' ? '-' : '';
      searchParams.set('sort', `${prefix}${state.sortParam.field}`);
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
            searchParams.append('not[]', paramValue);
          } else {
            searchParams.append('and[]', paramValue);
          }
        }
      }
    }

    if (state.minSelectedDate && state.maxSelectedDate) {
      searchParams.append(
        'and[]',
        `year:[${state.minSelectedDate} TO ${state.maxSelectedDate}]`
      );
    }

    if (state.titleQuery) {
      searchParams.append('and[]', state.titleQuery);
    }

    if (state.creatorQuery) {
      searchParams.append('and[]', state.creatorQuery);
    }

    // Ensure we aren't pushing an identical state to the stack.
    // Note: page number is not included in this condition, because we
    // don't want a separate history entry for each page scrolled through.
    if (
      oldParams.get('query') === searchParams.get('query') &&
      oldParams.get('sin') === searchParams.get('sin') &&
      oldParams.get('sort') === searchParams.get('sort') &&
      arrayEquals(
        oldParams.getAll('and[]').sort(),
        searchParams.getAll('and[]').sort()
      ) &&
      arrayEquals(
        oldParams.getAll('not[]').sort(),
        searchParams.getAll('not[]').sort()
      )
    ) {
      return;
    }

    window.history.pushState(
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
  }

  private loadQueryStateFromUrl(): RestorationState {
    const url = new URL(window.location.href);
    const searchInside = url.searchParams.get('sin');
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    const sortQuery = url.searchParams.get('sort');
    const facetAnds = url.searchParams.getAll('and[]');
    const facetNots = url.searchParams.getAll('not[]');

    const restorationState: RestorationState = {
      selectedFacets: {
        subject: {},
        lending: {},
        creator: {},
        mediatype: {},
        language: {},
        collection: {},
        year: {},
      },
    };

    if (searchQuery) {
      restorationState.baseQuery = searchQuery;
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
        const metadataField =
          MetadataFieldToSortField[field as MetadataSortField];
        if (metadataField) {
          restorationState.selectedSort = metadataField;
        }
        if (direction === 'desc' || direction === 'asc') {
          restorationState.sortDirection = direction as SortDirection;
        }
      } else {
        const sortDirection = sortQuery.startsWith('-') ? 'desc' : 'asc';
        const sortField = sortQuery.startsWith('-')
          ? sortQuery.slice(1)
          : sortQuery;
        const metadataField =
          MetadataFieldToSortField[sortField as MetadataSortField];
        if (metadataField) restorationState.selectedSort = metadataField;
        restorationState.sortDirection = sortDirection as SortDirection;
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
