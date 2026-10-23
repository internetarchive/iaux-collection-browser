import { ItemHit, SearchResponse } from '@internetarchive/search-service';

/**
 * An ItemHit that also carries the `__href__` link override.
 *
 * Records from a serverless source often live off archive.org, so each tile
 * has to link to its own url. TileModel reads `__href__`, but search-service
 * 2.7.2 only exposes it on WebArchiveHit, which drops creator and date.
 * Remove this once ItemHit exposes `__href__` itself.
 */
export class LinkedItemHit extends ItemHit {
  // Typed through ItemHit: search-service pins its own copy of
  // iaux-item-metadata, so this package's StringField is a different type.
  get __href__(): ItemHit['title'] {
    return this.fields.__href__;
  }
}

/**
 * Builds a SearchResponse from raw hit and aggregations JSON, in the page
 * production service's shape.
 */
export function sourceSearchResponse(options: {
  hits: Record<string, unknown>[];
  total: number;
  aggregations?: Record<string, unknown>;
  queryTimeMs?: number;
}): SearchResponse {
  const { hits } = options;
  const response = new SearchResponse({
    request: { kind: 'hits', client_parameters: {}, backend_requests: {} },
    response: {
      header: { succeeded: true, query_time: options.queryTimeMs ?? 0 },
      body: {
        hits: { total: options.total, returned: hits.length, hits },
        aggregations: options.aggregations,
      },
      hit_schema: { hit_type: 'item' },
    },
  });
  response.response.results = hits.map(hit => new LinkedItemHit(hit));
  return response;
}

/**
 * Term aggregation buckets from value counts: highest count first, ties
 * alphabetical, empty values dropped, capped at `size` when given.
 */
export function termBuckets(
  counts: Record<string, number>,
  size?: number,
): { key: string; doc_count: number }[] {
  const buckets = Object.entries(counts)
    .filter(([, count]) => count > 0)
    .map(([key, doc_count]) => ({ key, doc_count }))
    .sort((a, b) => b.doc_count - a.doc_count || a.key.localeCompare(b.key));
  return size === undefined ? buckets : buckets.slice(0, size);
}

/**
 * The numeric histogram collection-browser's date picker reads, from counts
 * keyed by each bucket's first year (e.g. decades with interval 10). Empty
 * buckets in between are filled in; keys that are not positive multiples of
 * the interval are dropped.
 */
export function yearHistogram(
  counts: Record<string, number>,
  interval: number,
): Record<string, unknown> | undefined {
  const byStart = new Map<number, number>();
  for (const [key, count] of Object.entries(counts)) {
    const start = Number(key);
    if (Number.isInteger(start) && start > 0 && start % interval === 0) {
      byStart.set(start, count);
    }
  }
  if (!byStart.size) return undefined;

  const first = Math.min(...byStart.keys());
  const last = Math.max(...byStart.keys());
  const buckets: number[] = [];
  for (let start = first; start <= last; start += interval) {
    buckets.push(byStart.get(start) ?? 0);
  }

  return {
    buckets,
    first_bucket_key: first,
    last_bucket_key: last,
    interval,
    number_buckets: buckets.length,
  };
}
