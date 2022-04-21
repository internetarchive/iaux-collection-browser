import { Result } from '@internetarchive/result-type';
import {
  MetadataResponse,
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import { SearchServiceError } from '@internetarchive/search-service/dist/src/search-service-error';

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  searchCallCount = 0;

  fetchMetadataIdentifier?: string;

  fetchMatadataValues?: [identifier: string, keypath: string];

  searchResult?: Result<SearchResponse, SearchServiceError>;

  search(
    params: SearchParams
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;
    this.searchCallCount += 1;
    return Promise.resolve(this.searchResult ?? { success: undefined });
  }

  fetchMetadata(
    identifier: string
  ): Promise<Result<MetadataResponse, SearchServiceError>> {
    this.fetchMetadataIdentifier = identifier;
    return Promise.resolve({ success: undefined });
  }

  fetchMetadataValue<T>(
    identifier: string,
    keypath: string
  ): Promise<Result<T, SearchServiceError>> {
    this.fetchMatadataValues = [identifier, keypath];
    return Promise.resolve({ success: undefined });
  }
}
