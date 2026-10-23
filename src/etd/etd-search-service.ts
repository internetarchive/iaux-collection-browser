import type { Result } from '@internetarchive/result-type';
import { SearchServiceError } from '@internetarchive/search-service';
import type {
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import { log } from '../utils/log';
import type { EtdEngine, EtdQuery } from './etd-engine';
import { EtdPager } from './etd-pager';
import {
  etdRequestFromParams,
  etdRequestIsEmpty,
  etdRequestKey,
} from './etd-query';
import type { EtdRequest } from './etd-query';
import {
  ETD_AGGREGATION_KEYS,
  etdAggregationsJson,
  etdDocIdFromIdentifier,
  etdSearchResponse,
} from './etd-response';
import type { EtdAggregationKey } from './etd-response';

export interface EtdSearchServiceOptions {
  engine: EtdEngine;

  /**
   * How many recent queries to keep ranked. Older ones are dropped and their
   * pending reads cancelled. Defaults to 3.
   */
  cachedQueries?: number;
}

/** collection-browser's page size, used when a request gives no `rows`. */
const DEFAULT_ROWS = 50;

interface CachedQuery {
  query: Promise<EtdQuery>;
  pager: Promise<EtdPager>;
  controller: AbortController;
}

/**
 * A SearchServiceInterface over the ETD static-index search engine, so
 * collection-browser can browse the theses & dissertations index.
 *
 * Hits link off archive.org to each thesis's landing page, so the
 * collection-browser using this should set `baseNavigationUrl` to ''.
 *
 * Results always come back in relevance order: the engine has no other sort,
 * so `params.sort` is ignored.
 */
export class EtdSearchService implements SearchServiceInterface {
  private readonly engine: EtdEngine;

  private readonly cacheSize: number;

  private readonly cache = new Map<string, CachedQuery>();

  constructor(options: EtdSearchServiceOptions) {
    this.engine = options.engine;
    this.cacheSize = Math.max(1, options.cachedQueries ?? 3);
  }

  async search(
    params: SearchParams,
    // The engine has a single search type.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _searchType?: SearchType,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const startTime = Date.now();
    try {
      await this.engine.ready;

      const request = etdRequestFromParams(params);
      if (request.ignoredFields.length) {
        log('EtdSearchService: ignoring filters on', request.ignoredFields);
      }
      if (etdRequestIsEmpty(request)) {
        return { success: etdSearchResponse({ records: [], total: 0 }) };
      }

      const cached = this.cachedQuery(request);
      const { signal } = cached.controller;
      const pager = await cached.pager;

      const rows = params.rows ?? DEFAULT_ROWS;
      const page = params.page ?? 1;
      const records =
        rows > 0
          ? await pager.slice((page - 1) * rows, page * rows, { signal })
          : [];

      const aggregationKeys = requestedAggregations(params);
      const aggregations = aggregationKeys.length
        ? etdAggregationsJson(
            await (await cached.query).facets({ signal }),
            aggregationKeys,
            params.aggregationsSize,
          )
        : undefined;

      return {
        success: etdSearchResponse({
          records,
          total: pager.result.total,
          aggregations,
          queryTimeMs: Date.now() - startTime,
        }),
      };
    } catch (err) {
      return { error: toSearchServiceError(err) };
    }
  }

  async itemDetails(
    identifier: string,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const docId = etdDocIdFromIdentifier(identifier);
    if (docId === undefined) return { error: notFound(identifier) };

    try {
      await this.engine.ready;
      const record = await this.engine.record(docId);
      if (!record) return { error: notFound(identifier) };
      return { success: etdSearchResponse({ records: [record], total: 1 }) };
    } catch (err) {
      return { error: toSearchServiceError(err) };
    }
  }

  /**
   * The ranked query for a request, shared by every request for the same
   * search (collection-browser sends hits and aggregations separately).
   */
  private cachedQuery(request: EtdRequest): CachedQuery {
    const key = etdRequestKey(request);
    const existing = this.cache.get(key);
    if (existing) {
      // Re-insert so the Map's order stays least-recently-used first.
      this.cache.delete(key);
      this.cache.set(key, existing);
      return existing;
    }

    const controller = new AbortController();
    const query = this.engine.query(request.text, request.filters, {
      signal: controller.signal,
    });
    const entry: CachedQuery = {
      query,
      pager: query.then(q => new EtdPager(q)),
      controller,
    };
    // A failed query is not worth keeping: let the next request try again.
    query.catch(() => {
      if (this.cache.get(key) === entry) this.cache.delete(key);
    });

    this.cache.set(key, entry);
    this.evictOldest();
    return entry;
  }

  private evictOldest(): void {
    while (this.cache.size > this.cacheSize) {
      const [oldestKey, oldest] = this.cache.entries().next().value!;
      this.cache.delete(oldestKey);
      oldest.controller.abort();
    }
  }
}

/**
 * Which aggregations a request wants. Hits requests send `omit`; a facet's
 * "more" dialog names its facet in `simpleParams`; anything else is the
 * default facets request, which gets every aggregation this adapter has.
 */
function requestedAggregations(params: SearchParams): EtdAggregationKey[] {
  const { aggregations } = params;
  if (aggregations?.omit) return [];

  const named = [
    ...(aggregations?.simpleParams ?? []),
    ...(aggregations?.advancedParams ?? []).map(param => param.field),
  ];
  if (!named.length) return [...ETD_AGGREGATION_KEYS];

  return ETD_AGGREGATION_KEYS.filter(key =>
    named.includes(key === 'year_histogram' ? 'year' : key),
  );
}

function notFound(identifier: string): SearchServiceError {
  return new SearchServiceError(
    SearchServiceErrorType.itemNotFound,
    `No ETD record for ${identifier}`,
  );
}

function toSearchServiceError(err: unknown): SearchServiceError {
  if (err instanceof SearchServiceError) return err;

  const message = err instanceof Error ? err.message : String(err);
  const isNetwork =
    err instanceof TypeError ||
    (err instanceof DOMException && err.name === 'AbortError');
  return new SearchServiceError(
    isNetwork
      ? SearchServiceErrorType.networkError
      : SearchServiceErrorType.searchEngineError,
    message,
    err,
  );
}
