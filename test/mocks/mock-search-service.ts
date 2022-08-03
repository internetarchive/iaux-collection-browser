import type { Result } from '@internetarchive/result-type';
import type {
  MetadataResponse,
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchServiceError,
} from '@internetarchive/search-service';
import { mockSuccessResponse } from './mock-search-responses';

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  async search(
    params: SearchParams
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;
    return mockSuccessResponse;
  }

  async fetchMetadata(
    identifier: string
  ): Promise<Result<MetadataResponse, SearchServiceError>> {
    console.debug('fetchMetadata', identifier);
    throw new Error('Method not implemented.');
  }

  async fetchMetadataValue<T>(
    identifier: string,
    keypath: string
  ): Promise<Result<T, SearchServiceError>> {
    console.debug('fetchMetadataValue', identifier, keypath);
    throw new Error('Method not implemented.');
  }
}
