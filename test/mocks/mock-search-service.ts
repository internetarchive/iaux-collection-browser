import type { Result } from '@internetarchive/result-type';
import type {
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchServiceError,
} from '@internetarchive/search-service';
import {
  mockSuccessSingleResult,
  mockSuccessMultipleResults,
} from './mock-search-responses';

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  async search(
    params: SearchParams
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;

    if (this.searchParams?.query === 'single-result') {
      return mockSuccessSingleResult;
    }

    return mockSuccessMultipleResults;
  }
}
