import type { Result } from '@internetarchive/result-type';
import type {
  Aggregation,
  SearchParams,
  SearchResponse,
  SearchServiceError,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import type {
  FacetDeclaringSearchService,
  RefiningSearchService,
} from '../../serverless-search/serverless-search-service';

/** The facets collection-browser last asked for, as it got them. */
export type ObservedFacets =
  | { state: 'loading' }
  | { state: 'loaded'; aggregations: Record<string, Aggregation> }
  | { state: 'failed' };

/**
 * Wraps a search service so the demo can see the facets collection-browser
 * gets, without collection-browser telling it: every call passes through
 * unchanged, and each facets request (rows: 0) is reported as it starts and
 * when it lands. A request a newer one has replaced isn't reported, as
 * collection-browser drops it too.
 *
 * `onRequest`, when given, gets each facets request's params as it starts:
 * the query and filters of the search collection-browser is showing, even
 * one it found in its cache.
 *
 * A service declaring its own facet groups keeps declaring them, and one
 * that refines its results still says so.
 */
type ObservableService = SearchServiceInterface &
  Partial<FacetDeclaringSearchService> &
  Partial<RefiningSearchService>;

export function observeFacets(
  service: ObservableService,
  listener: (facets: ObservedFacets) => void,
  onRequest?: (params: SearchParams) => void,
): ObservableService {
  let latest = 0;
  return {
    get extraFacetGroups() {
      return service.extraFacetGroups;
    },
    get allowFilterOnlySearch() {
      return service.allowFilterOnlySearch;
    },
    itemDetails: identifier => service.itemDetails(identifier),
    // Only there if the service has it: collection-browser checks for it.
    ...(service.onResultsChanged && {
      onResultsChanged: (changed: () => void) =>
        service.onResultsChanged!(changed),
    }),
    async search(
      params: SearchParams,
      searchType?: SearchType,
    ): Promise<Result<SearchResponse, SearchServiceError>> {
      if (params.rows !== 0) return service.search(params, searchType);

      latest += 1;
      const request = latest;
      listener({ state: 'loading' });
      onRequest?.(params);
      let result: Result<SearchResponse, SearchServiceError>;
      try {
        result = await service.search(params, searchType);
      } catch (err) {
        if (request === latest) listener({ state: 'failed' });
        throw err;
      }
      if (request === latest) {
        const aggregations = result.success?.response.aggregations;
        listener(
          aggregations
            ? { state: 'loaded', aggregations }
            : { state: 'failed' },
        );
      }
      return result;
    },
  };
}
