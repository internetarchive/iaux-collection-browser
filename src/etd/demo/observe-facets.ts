import type { Result } from '@internetarchive/result-type';
import type {
  Aggregation,
  SearchParams,
  SearchResponse,
  SearchServiceError,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import type { FacetDeclaringSearchService } from '../../serverless-search/serverless-search-service';

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
 * A service declaring its own facet groups keeps declaring them.
 */
export function observeFacets(
  service: SearchServiceInterface & Partial<FacetDeclaringSearchService>,
  listener: (facets: ObservedFacets) => void,
): SearchServiceInterface & Partial<FacetDeclaringSearchService> {
  let latest = 0;
  return {
    get extraFacetGroups() {
      return service.extraFacetGroups;
    },
    get allowFilterOnlySearch() {
      return service.allowFilterOnlySearch;
    },
    itemDetails: identifier => service.itemDetails(identifier),
    async search(
      params: SearchParams,
      searchType?: SearchType,
    ): Promise<Result<SearchResponse, SearchServiceError>> {
      if (params.rows !== 0) return service.search(params, searchType);

      latest += 1;
      const request = latest;
      listener({ state: 'loading' });
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
