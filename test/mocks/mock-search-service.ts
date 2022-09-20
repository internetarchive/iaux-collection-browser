import type { Result } from '@internetarchive/result-type';
import type {
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchServiceError,
  SearchType,
} from '@internetarchive/search-service';
import {
  mockSuccessSingleResult,
  mockSuccessMultipleResults,
} from './mock-search-responses';

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  searchType?: SearchType;

  async search(
    params: SearchParams,
    searchType: SearchType
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;
    this.searchType = searchType;

    if (this.searchParams?.query === 'single-result') {
      return mockSuccessSingleResult;
    }

    return mockSuccessMultipleResults;
  }
}
