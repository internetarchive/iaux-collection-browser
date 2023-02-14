import type { CollectionNameCacheInterface } from '@internetarchive/collection-name-cache';

export class MockCollectionNameCache implements CollectionNameCacheInterface {
  collectionNamesRequested: string[] = [];

  preloadIdentifiersRequested: string[] = [];

  knownTitlesAdded: Record<string, string> = {};

  async collectionNameFor(identifier: string): Promise<string | null> {
    this.collectionNamesRequested.push(identifier);
    return `${identifier}-name`;
  }

  async preloadIdentifiers(identifiers: string[]): Promise<void> {
    this.preloadIdentifiersRequested = identifiers;
  }

  async addKnownTitles(
    identifierTitleMap: Record<string, string>
  ): Promise<void> {
    this.knownTitlesAdded = identifierTitleMap;
  }
}
