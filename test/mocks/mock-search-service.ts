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
  getMockSuccessSingleResultWithSort,
} from './mock-search-responses';

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  searchType?: SearchType;

  asyncResponse: boolean;

  resultsSpy: Function;

  constructor({ asyncResponse = false, resultsSpy = () => {} } = {}) {
    this.asyncResponse = asyncResponse;
    this.resultsSpy = resultsSpy;
  }

  async search(
    params: SearchParams,
    searchType: SearchType
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;
    this.searchType = searchType;

    if (this.asyncResponse) {
      // Add an artificial 1-tick delay
      await new Promise(res => {
        setTimeout(res, 0);
      });
    }

    if (this.searchParams?.query === 'single-result') {
      return mockSuccessSingleResult;
    }

    if (this.searchParams?.query === 'with-sort') {
      return getMockSuccessSingleResultWithSort(this.resultsSpy);
    }

    return mockSuccessMultipleResults;
  }
}
