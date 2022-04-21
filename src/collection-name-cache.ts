/* eslint-disable camelcase */
/* eslint-disable no-continue */
import {
  SearchParams,
  SearchServiceInterface,
} from '@internetarchive/search-service';

export interface CollectionNameCacheInterface {
  collectionNameFor(identifier: string): Promise<string | null>;
  preloadIdentifiers(identifiers: string[]): Promise<void>;
}

// this is the callback type received after the name is fetched
type CollectionNameResolver = (name: string | null) => Promise<void>;

export class CollectionNameCache implements CollectionNameCacheInterface {
  async collectionNameFor(identifier: string): Promise<string | null> {
    const cachedName = this.collectionNameCache[identifier];
    // we're specifically looking for `undefined`, because `null`
    // means we queried the search service and found nothing so
    // don't query again
    if (cachedName !== undefined) return cachedName;

    return new Promise(resolve => {
      this.pendingIdentifierQueue.push(identifier);
      const currentPromises = this.pendingPromises[identifier] ?? [];
      const resultHandler: CollectionNameResolver = async (
        name: string | null
      ) => {
        resolve(name);
      };
      currentPromises.push(resultHandler);
      this.pendingPromises[identifier] = currentPromises;
    });
  }

  async preloadIdentifiers(identifiers: string[]): Promise<void> {
    for (const identifier of identifiers) {
      if (this.collectionNameCache[identifier]) continue;
      this.pendingIdentifierQueue.push(identifier);
    }
    await this.loadPendingIdentifiers();
  }

  private pendingIdentifierQueue: string[] = [];

  private pendingPromises: { [key: string]: CollectionNameResolver[] } = {};

  private collectionNameCache: { [key: string]: string | null | undefined } =
    {};

  private searchService: SearchServiceInterface;

  constructor(options: {
    searchService: SearchServiceInterface;
    loadInterval?: number;
  }) {
    this.searchService = options.searchService;

    setInterval(() => {
      this.loadPendingIdentifiers();
    }, options.loadInterval ?? 250);
  }

  private async loadPendingIdentifiers(): Promise<void> {
    const pendingIdentifiers = this.pendingIdentifierQueue.splice(0, 100);
    if (pendingIdentifiers.length === 0) return;

    const searchParams = new SearchParams({
      query: `identifier:(${pendingIdentifiers.join(' OR ')})`,
      fields: ['title', 'identifier'],
      rows: pendingIdentifiers.length,
    });

    const results = await this.searchService.search(searchParams);
    const docs = results.success?.response?.docs;

    // first process the identifiers that were received from the search service
    // and remove them from the pendingIdentifierQueue
    if (docs && docs.length > 0) {
      for (const result of docs) {
        const { identifier, title } = result;
        if (!identifier) continue;
        pendingIdentifiers.splice(pendingIdentifiers.indexOf(identifier), 1);
        const collectionName = title?.value ?? null;
        this.collectionNameCache[identifier] = collectionName;
        const currentPromises = this.pendingPromises[identifier];
        if (currentPromises) {
          for (const promise of currentPromises) {
            promise(collectionName);
          }
          delete this.pendingPromises[identifier];
        }
      }
    }

    // if the search service did not return titles for all of the identifiers,
    // we still need to complete the promises and just return `null` for the rest
    for (const identifier of pendingIdentifiers) {
      this.collectionNameCache[identifier] = null;
      const currentPromises = this.pendingPromises[identifier];
      if (currentPromises) {
        for (const promise of currentPromises) {
          promise(null);
        }
        delete this.pendingPromises[identifier];
      }
    }
  }
}
