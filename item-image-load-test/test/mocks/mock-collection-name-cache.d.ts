import { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';
export declare class MockCollectionNameCache implements CollectionNameCacheInterface {
    collectionNamesRequested: string[];
    preloadIdentifiersRequested: string[];
    collectionNameFor(identifier: string): Promise<string | null>;
    preloadIdentifiers(identifiers: string[]): Promise<void>;
}
