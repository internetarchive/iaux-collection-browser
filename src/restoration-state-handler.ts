import { SortDirection, SortParam } from '@internetarchive/search-service';
import { getCookie, setCookie } from 'typescript-cookie';
import {
  MetadataFieldToSortField,
  MetadataSortField,
  FacetOption,
  CollectionBrowserContext,
  CollectionDisplayMode,
  SelectedFacets,
  SortField,
} from './models';

export interface RestorationState {
  displayMode?: CollectionDisplayMode;
  sortParam?: SortParam;
  selectedSort?: SortField;
  sortDirection?: SortDirection;
  selectedFacets: SelectedFacets;
  baseQuery?: string;
  currentPage?: number;
  dateRangeQueryClause?: string;
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
    searchParams.delete('sort');
    searchParams.delete('query');
    searchParams.delete('page');
    searchParams.delete('and[]');
    searchParams.delete('not[]');

    if (state.sortParam) {
      url.searchParams.set('sort', state.sortParam.asString);
    }

    if (state.baseQuery) {
      url.searchParams.set('query', state.baseQuery);
    }

    if (state.currentPage) {
      if (state.currentPage > 1) {
        url.searchParams.set('page', state.currentPage.toString());
      } else {
        url.searchParams.delete('page');
      }
    }

    if (state.selectedFacets) {
      for (const [facetName, facetValues] of Object.entries(
        state.selectedFacets
      )) {
        const facetEntries = Object.entries(facetValues);
        // eslint-disable-next-line no-continue
        if (facetEntries.length === 0) continue;
        for (const [key, facetState] of facetEntries) {
          const notValue = facetState === 'hidden';
          const paramValue = `${facetName}:${key}`;
          if (notValue) {
            url.searchParams.append('not[]', paramValue);
          } else {
            url.searchParams.append('and[]', paramValue);
          }
        }
      }
    }

    if (state.dateRangeQueryClause) {
      url.searchParams.append('and[]', state.dateRangeQueryClause);
    }
    if (state.titleQuery) {
      url.searchParams.append('and[]', state.titleQuery);
    }
    if (state.creatorQuery) {
      url.searchParams.append('and[]', state.creatorQuery);
    }

    window.history.pushState(
      {
        page: state.currentPage,
        query: state.baseQuery,
      },
      '',
      url
    );
  }

  private loadQueryStateFromUrl(): RestorationState {
    const url = new URL(window.location.href);
    const pageNumber = url.searchParams.get('page');
    const searchQuery = url.searchParams.get('query');
    const sortQuery = url.searchParams.get('sort');
    const facetAnds = url.searchParams.getAll('and[]');
    const facetNots = url.searchParams.getAll('not[]');

    const restorationState: RestorationState = {
      selectedFacets: {
        subject: {},
        creator: {},
        mediatype: {},
        language: {},
        collection: {},
        year: {},
      },
    };

    if (pageNumber) {
      const parsed = parseInt(pageNumber, 10);
      restorationState.currentPage = parsed;
    } else {
      restorationState.currentPage = 1;
    }
    if (searchQuery) {
      restorationState.baseQuery = searchQuery;
    }
    if (sortQuery) {
      const [field, direction] = sortQuery.split(' ');
      const metadataField =
        MetadataFieldToSortField[field as MetadataSortField];
      if (metadataField) {
        restorationState.selectedSort = metadataField;
      }
      if (direction === 'desc' || direction === 'asc') {
        restorationState.sortDirection = direction as SortDirection;
      }
    }
    if (facetAnds) {
      facetAnds.forEach(and => {
        const [field, value] = and.split(':');
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
              restorationState.dateRangeQueryClause = `year:${value}`;
            } else {
              restorationState.selectedFacets[field as FacetOption][value] =
                'selected';
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
            restorationState.selectedFacets[field as FacetOption][value] =
              'selected';
        }
      });
    }
    if (facetNots) {
      facetNots.forEach(not => {
        const [field, value] = not.split(':');
        restorationState.selectedFacets[field as FacetOption][value] = 'hidden';
      });
    }
    return restorationState;
  }
}
