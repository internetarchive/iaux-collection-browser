import { Result } from '@internetarchive/result-type';
import { MetadataResponse, SearchParams, SearchResponse, SearchServiceInterface, SearchServiceError } from '@internetarchive/search-service';
export declare class MockSearchService implements SearchServiceInterface {
    searchParams?: SearchParams;
    search(params: SearchParams): Promise<Result<SearchResponse, SearchServiceError>>;
    fetchMetadata(identifier: string): Promise<Result<MetadataResponse, SearchServiceError>>;
    fetchMetadataValue<T>(identifier: string, keypath: string): Promise<Result<T, SearchServiceError>>;
}
