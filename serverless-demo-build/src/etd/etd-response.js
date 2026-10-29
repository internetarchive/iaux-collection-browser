import { termBuckets, yearHistogram, } from '../serverless-search/source-response';
import { ETD_FACETS } from './etd-facets';
/** Identifier prefix that marks a hit as an ETD record rather than an item. */
export const ETD_IDENTIFIER_PREFIX = 'etd-';
/**
 * Aggregation keys ETD can produce, as collection-browser names them: each
 * facet in the table, and the date picker's histogram.
 */
export const ETD_AGGREGATION_KEYS = etdAggregationKeys(ETD_FACETS);
/**
 * Identifier prefix for a vector store record: its docIds are numbered apart
 * from the text index's, so the two never share an identifier.
 */
export const ETD_VECTOR_IDENTIFIER_PREFIX = 'etdv-';
/** The aggregation keys for a facet table, and the date picker's histogram. */
export function etdAggregationKeys(facets) {
    return [...facets.map(facet => facet.key), 'year_histogram'];
}
/**
 * The identifier an ETD record is shown under.
 */
export function etdIdentifier(docId, prefix = ETD_IDENTIFIER_PREFIX) {
    return `${prefix}${docId}`;
}
/**
 * The document id behind an ETD identifier, or undefined if it is not one.
 */
export function etdDocIdFromIdentifier(identifier, prefix = ETD_IDENTIFIER_PREFIX) {
    if (!identifier.startsWith(prefix))
        return undefined;
    const match = identifier.slice(prefix.length).match(/^([1-9]\d*)$/);
    return match ? Number(match[1]) : undefined;
}
/**
 * Raw hit JSON for one record. ETD records live off archive.org, so the hit
 * links to the thesis's own landing page (or its archived copy).
 */
export function etdHitJson(record, prefix = ETD_IDENTIFIER_PREFIX) {
    const fields = {
        identifier: etdIdentifier(record.docId, prefix),
        mediatype: 'texts',
        title: record.title,
        __href__: record.archivedUrl ?? record.url,
    };
    const creators = splitCreators(record.creators);
    if (creators.length)
        fields.creator = creators;
    if (record.date)
        fields.date = record.date;
    const year = Number.parseInt(record.date.slice(0, 4), 10);
    if (!Number.isNaN(year))
        fields.year = year;
    // A marked snippet replaces the description, which would repeat it.
    if (record.highlight) {
        // Beside fields, not in them, as full-text search hits carry it.
        return {
            hit_type: 'item',
            fields,
            highlight: { text: [record.highlight] },
        };
    }
    if (record.snippet)
        fields.description = record.snippet;
    return { hit_type: 'item', fields };
}
/**
 * The histogram starts here, as the live page's does: before 1900 the index
 * only knows decades, and the few theses there would stretch the date
 * picker across two centuries. A year filter still reaches them.
 */
const HISTOGRAM_FROM = 1900;
/**
 * Raw aggregations JSON for the requested keys: each facet's values by name
 * as term buckets, years as the date picker's histogram.
 */
export function etdAggregationsJson(facets, keys, size, table = ETD_FACETS) {
    const aggregations = {};
    for (const facet of table) {
        if (!keys.includes(facet.key))
            continue;
        aggregations[facet.key] = {
            buckets: facetBuckets(facet, facets.facets[facet.key] ?? {}, size),
        };
    }
    if (keys.includes('year_histogram')) {
        const years = Object.fromEntries(Object.entries(facets.year).filter(([year]) => Number(year) >= HISTOGRAM_FROM));
        const histogram = yearHistogram(years, 1);
        if (histogram)
            aggregations.year_histogram = histogram;
    }
    return aggregations;
}
/**
 * A facet's buckets, keyed by value name: codes sharing a name count
 * together (the facet shows one row), by count, as collection-browser's
 * sidebar sorts them too.
 */
function facetBuckets(facet, counts, size) {
    const byName = {};
    for (const [code, count] of Object.entries(counts)) {
        const name = facet.label(code);
        byName[name] = (byName[name] ?? 0) + count;
    }
    return termBuckets(byName, size);
}
function splitCreators(creators) {
    return creators
        .split(';')
        .map(name => name.trim())
        .filter(Boolean);
}
