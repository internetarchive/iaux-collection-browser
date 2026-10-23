import { ItemHit, SearchResponse } from '@internetarchive/search-service';
import type { EtdFacetCounts, EtdRecord } from './etd-engine';

/** Identifier prefix that marks a hit as an ETD record rather than an item. */
export const ETD_IDENTIFIER_PREFIX = 'etd-';

/** Aggregation keys this adapter can produce, as collection-browser names them. */
export const ETD_AGGREGATION_KEYS = ['language', 'year_histogram'] as const;
export type EtdAggregationKey = (typeof ETD_AGGREGATION_KEYS)[number];

/**
 * An ItemHit that also carries the `__href__` link override.
 *
 * ETD records live off archive.org, so each tile has to link to its own
 * landing url. TileModel reads `__href__`, but search-service 2.7.2 only
 * exposes it on WebArchiveHit, which drops creator and date. Remove this
 * once ItemHit exposes `__href__` itself.
 */
export class EtdHit extends ItemHit {
  // Typed through ItemHit: search-service pins its own copy of
  // iaux-item-metadata, so this package's StringField is a different type.
  get __href__(): ItemHit['title'] {
    return this.fields.__href__;
  }
}

/**
 * The identifier an ETD record is shown under.
 */
export function etdIdentifier(docId: number): string {
  return `${ETD_IDENTIFIER_PREFIX}${docId}`;
}

/**
 * The document id behind an ETD identifier, or undefined if it is not one.
 */
export function etdDocIdFromIdentifier(identifier: string): number | undefined {
  const match = identifier.match(/^etd-([1-9]\d*)$/);
  return match ? Number(match[1]) : undefined;
}

/**
 * Raw hit JSON for one record, in the shape the page production service
 * returns, so search-service builds it like any other item hit.
 */
export function etdHitJson(record: EtdRecord): Record<string, unknown> {
  const fields: Record<string, unknown> = {
    identifier: etdIdentifier(record.docId),
    mediatype: 'texts',
    title: record.title,
    __href__: record.archivedUrl ?? record.url,
  };

  const creators = splitCreators(record.creators);
  if (creators.length) fields.creator = creators;

  if (record.date) fields.date = record.date;

  const year = Number.parseInt(record.date.slice(0, 4), 10);
  if (!Number.isNaN(year)) fields.year = year;

  if (record.snippet) fields.description = record.snippet;

  return { hit_type: 'item', fields };
}

/**
 * Raw aggregations JSON for the requested keys.
 */
export function etdAggregationsJson(
  facets: EtdFacetCounts,
  keys: readonly EtdAggregationKey[],
  size?: number,
): Record<string, unknown> {
  const aggregations: Record<string, unknown> = {};
  for (const key of keys) {
    if (key === 'language') {
      aggregations.language = { buckets: termBuckets(facets.language, size) };
    } else {
      const histogram = decadeHistogram(facets.decade);
      if (histogram) aggregations.year_histogram = histogram;
    }
  }
  return aggregations;
}

/**
 * Builds a SearchResponse for the given records and aggregations.
 */
export function etdSearchResponse(options: {
  records: EtdRecord[];
  total: number;
  aggregations?: Record<string, unknown>;
  queryTimeMs?: number;
}): SearchResponse {
  const hits = options.records.map(etdHitJson);
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
  response.response.results = hits.map(hit => new EtdHit(hit));
  return response;
}

function splitCreators(creators: string): string[] {
  return creators
    .split(';')
    .map(name => name.trim())
    .filter(Boolean);
}

function termBuckets(
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
 * Turns decade counts into the numeric histogram collection-browser's date
 * picker reads: one bucket per decade, with empty decades filled in.
 */
function decadeHistogram(
  decades: Record<string, number>,
): Record<string, unknown> | undefined {
  const counts = new Map<number, number>();
  for (const [key, count] of Object.entries(decades)) {
    const decade = Number(key);
    if (Number.isInteger(decade) && decade > 0 && decade % 10 === 0) {
      counts.set(decade, count);
    }
  }
  if (!counts.size) return undefined;

  const first = Math.min(...counts.keys());
  const last = Math.max(...counts.keys());
  const buckets: number[] = [];
  for (let decade = first; decade <= last; decade += 10) {
    buckets.push(counts.get(decade) ?? 0);
  }

  return {
    buckets,
    first_bucket_key: first,
    last_bucket_key: last,
    interval: 10,
    number_buckets: buckets.length,
  };
}
