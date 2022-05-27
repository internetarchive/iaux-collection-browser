import { mockSuccessResponse } from './mock-search-responses';
export class MockSearchService {
    async search(params) {
        this.searchParams = params;
        return mockSuccessResponse;
    }
    async fetchMetadata(identifier) {
        console.debug('fetchMetadata', identifier);
        throw new Error('Method not implemented.');
    }
    async fetchMetadataValue(identifier, keypath) {
        console.debug('fetchMetadataValue', identifier, keypath);
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=mock-search-service.js.map