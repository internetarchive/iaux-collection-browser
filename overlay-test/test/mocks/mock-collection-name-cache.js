export class MockCollectionNameCache {
    constructor() {
        this.collectionNamesRequested = [];
        this.preloadIdentifiersRequested = [];
    }
    async collectionNameFor(identifier) {
        this.collectionNamesRequested.push(identifier);
        return `${identifier}-name`;
    }
    async preloadIdentifiers(identifiers) {
        this.preloadIdentifiersRequested = identifiers;
    }
}
//# sourceMappingURL=mock-collection-name-cache.js.map