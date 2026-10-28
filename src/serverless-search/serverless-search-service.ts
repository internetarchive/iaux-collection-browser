import type { Result } from '@internetarchive/result-type';
import { SearchServiceError } from '@internetarchive/search-service';
import type {
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchType,
} from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import type { SearchSource, SourceFacet, SourceQuery } from './search-source';
import { facetTitles } from '../models';
import type { ExtraFacetGroup } from '../models';
import { SourcePager } from './source-pager';
import { sourceSearchResponse } from './source-response';

/**
 * What a page passes on to collection-browser so it shows a search
 * service's own facets and searches it the way it can be searched:
 *
 *   <collection-browser
 *     .extraFacetGroups=${service.extraFacetGroups}
 *     ?allowFilterOnlySearch=${service.allowFilterOnlySearch}>
 */
export interface FacetDeclaringSearchService {
  /** The service's facet groups that collection-browser doesn't have. */
  readonly extraFacetGroups: readonly ExtraFacetGroup[];
  /** Whether it can search by filters alone, with no query. */
  readonly allowFilterOnlySearch: boolean;
}

/** Marks a title whose picked values must all match, e.g. "Availability (all that apply)". */
function groupTitle(facet: SourceFacet): string {
  return facet.combine === 'all'
    ? `${facet.title} (all that apply)`
    : facet.title;
}

/** The source's facets that aren't collection-browser's own, as its groups. */
function extraFacetGroupsOf(
  facets: readonly SourceFacet[] = [],
): ExtraFacetGroup[] {
  return facets
    .filter(
      facet => !Object.prototype.hasOwnProperty.call(facetTitles, facet.key),
    )
    .map(facet => ({
      key: facet.key,
      title: groupTitle(facet),
      pluralTitle: facet.pluralTitle,
      sort: facet.sort,
      after: facet.after,
    }));
}

export interface ServerlessSearchServiceOptions {
  /**
   * How many recent queries to keep. Older ones are dropped and their
   * pending reads cancelled. Defaults to 3.
   */
  cachedQueries?: number;
}

/** collection-browser's page size, used when a request gives no `rows`. */
const DEFAULT_ROWS = 50;

interface CachedQuery<SourceRecord> {
  query: Promise<SourceQuery<SourceRecord>>;
  pager: Promise<SourcePager<SourceRecord>>;
  controller: AbortController;
}

/**
 * A SearchServiceInterface over a SearchSource, so collection-browser can
 * browse a search that does not go through the page production service.
 *
 * collection-browser sends a search's hits and aggregations as separate
 * requests, and pages by number; this keeps one query per search for all of
 * them and pages over the source's forward-only cursor.
 *
 * Results come back in the source's own order, so `params.sort` is ignored.
 * If the source's hits link off archive.org, the collection-browser using
 * this should set `baseNavigationUrl` to ''.
 */
export class ServerlessSearchService<Request, SourceRecord>
  implements SearchServiceInterface, FacetDeclaringSearchService
{
  /**
   * Built once: the same array every time, so passing it to
   * collection-browser on each render changes nothing.
   */
  readonly extraFacetGroups: readonly ExtraFacetGroup[];

  readonly allowFilterOnlySearch: boolean;

  private readonly cacheSize: number;

  private readonly cache = new Map<string, CachedQuery<SourceRecord>>();

  constructor(
    private readonly source: SearchSource<Request, SourceRecord>,
    options: ServerlessSearchServiceOptions = {},
  ) {
    this.cacheSize = Math.max(1, options.cachedQueries ?? 3);
    this.extraFacetGroups = extraFacetGroupsOf(source.facets);
    this.allowFilterOnlySearch = !!source.listsWithoutQuery;
  }

  async search(
    params: SearchParams,
    // A serverless source has a single search type.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _searchType?: SearchType,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const startTime = Date.now();
    try {
      await this.source.ready;

      const request = this.source.toRequest(params);
      if (request === undefined) {
        return { success: sourceSearchResponse({ hits: [], total: 0 }) };
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

      const keys = this.requestedAggregations(params);
      const aggregations = keys.length
        ? await (
            await cached.query
          ).aggregations(keys, params.aggregationsSize, { signal })
        : undefined;

      return {
        success: sourceSearchResponse({
          hits: records.map(record => this.source.toHit(record)),
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
    try {
      await this.source.ready;
      const record = await this.source.record(identifier);
      if (record === undefined) {
        return {
          error: new SearchServiceError(
            SearchServiceErrorType.itemNotFound,
            `No record for ${identifier}`,
          ),
        };
      }
      return {
        success: sourceSearchResponse({
          hits: [this.source.toHit(record)],
          total: 1,
        }),
      };
    } catch (err) {
      return { error: toSearchServiceError(err) };
    }
  }

  /**
   * Which of the source's aggregations a request wants. Hits requests send
   * `omit`; a facet's "more" dialog names its facet in `simpleParams`;
   * anything else is the default facets request, which gets them all.
   */
  private requestedAggregations(params: SearchParams): string[] {
    const { aggregations } = params;
    if (aggregations?.omit) return [];

    const named = [
      ...(aggregations?.simpleParams ?? []),
      ...(aggregations?.advancedParams ?? []).map(param => param.field),
    ];
    if (!named.length) return [...this.source.aggregationKeys];

    return this.source.aggregationKeys.filter(key => named.includes(key));
  }

  /**
   * The query for a request, shared by every request for the same search.
   */
  private cachedQuery(request: Request): CachedQuery<SourceRecord> {
    const key = this.source.requestKey(request);
    const existing = this.cache.get(key);
    if (existing) {
      // Re-insert so the Map's order stays least-recently-used first.
      this.cache.delete(key);
      this.cache.set(key, existing);
      return existing;
    }

    const controller = new AbortController();
    const query = this.source.query(request, { signal: controller.signal });
    const entry: CachedQuery<SourceRecord> = {
      query,
      pager: query.then(q => new SourcePager(q)),
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
