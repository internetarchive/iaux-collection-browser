import {
  termBuckets,
  yearHistogram,
} from '../serverless-search/source-response';
import type { EtdFacetCounts, EtdRecord } from './etd-engine';

/** Identifier prefix that marks a hit as an ETD record rather than an item. */
export const ETD_IDENTIFIER_PREFIX = 'etd-';

/** Aggregation keys ETD can produce, as collection-browser names them. */
export const ETD_AGGREGATION_KEYS = ['language', 'year_histogram'] as const;

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
 * Raw hit JSON for one record. ETD records live off archive.org, so the hit
 * links to the thesis's own landing page (or its archived copy).
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
 * Raw aggregations JSON for the requested keys: language as term buckets,
 * decades as the date picker's year histogram.
 */
export function etdAggregationsJson(
  facets: EtdFacetCounts,
  keys: readonly string[],
  size?: number,
): Record<string, unknown> {
  const aggregations: Record<string, unknown> = {};
  if (keys.includes('language')) {
    aggregations.language = { buckets: termBuckets(facets.language, size) };
  }
  if (keys.includes('year_histogram')) {
    const histogram = yearHistogram(facets.decade, 10);
    if (histogram) aggregations.year_histogram = histogram;
  }
  return aggregations;
}

function splitCreators(creators: string): string[] {
  return creators
    .split(';')
    .map(name => name.trim())
    .filter(Boolean);
}
