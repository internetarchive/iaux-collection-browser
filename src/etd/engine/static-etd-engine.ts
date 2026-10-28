import type {
  EtdCallOptions,
  EtdEngine,
  EtdFacetCounts,
  EtdFilters,
  EtdQuery,
  EtdQueryBoost,
  EtdRecord,
} from '../etd-engine';
import { EtdDictionary } from './dictionary';
import { EtdIndexFiles } from './index-files';
import { markTerms, termsToMark } from './mark-terms';
import { boostTokens, phraseBoost, wordsPlacement } from './phrase-boost';
import { EtdPosfwd } from './posfwd';
import { EtdFacets } from './facets';
import type { EtdFacetRows } from './facets';
import { decodePostings } from './postings';
import type { FieldPrefix } from './query-parser';
import { parseQuery } from './query-parser';
import { EtdRecords } from './records';
import {
  BASE_PREFIXES,
  boostSharedFields,
  queryTerms,
  rankScores,
  scoreQuery,
} from './scorer';

export interface StaticEtdEngineOptions {
  /** The index item's download url. Defaults to archive.org's etd-search. */
  baseUrl?: string;

  /** For tests: the fetch to read index files with. */
  fetch?: typeof fetch;

  /** Keep the facets file in Cache Storage across visits (default true). */
  cacheFacets?: boolean;
}

/** Past this many matches the page marks a count as approximate. */
const APPROXIMATE_AT = 10000;

/**
 * How many of a filter-only query's matches paging can reach, as on the
 * live page: with no words to rank by, matches come in docId order, and
 * the total still counts them all.
 */
const LISTED_CAP = 5000;

interface Loaded {
  files: EtdIndexFiles;
  dictionary: EtdDictionary;
  records: EtdRecords;
  /** Per-doc token text for the phrase boost; absent on an index without it. */
  posfwd?: EtdPosfwd;
  /** Year and language per doc, for filters and facet counts. */
  facets: EtdFacets;
  prefixes: FieldPrefix[];
}

/**
 * The ETD search engine: ranks the static index in the browser with Range
 * reads, as etd-search/search.html does.
 *
 * A query is about three rounds of requests: dictionary buckets, posting
 * lists (each one multi-range request), then a page of records.
 *
 * Not yet ported (later phases): facets beyond year and language,
 * filter-only `field:` syntax, exact phrase verification (quoted phrases currently match their
 * words anywhere in a document), and institution authority lookup.
 */
export class StaticEtdEngine implements EtdEngine {
  readonly ready: Promise<void>;

  private readonly loading: Promise<Loaded>;

  constructor(options: StaticEtdEngineOptions = {}) {
    this.loading = StaticEtdEngine.load(options);
    this.ready = this.loading.then(() => undefined);
    // Callers see a boot failure through `ready` or their first query.
    this.ready.catch(() => {});
  }

  private static async load(options: StaticEtdEngineOptions): Promise<Loaded> {
    const files = await EtdIndexFiles.open(options.baseUrl, {
      fetch: options.fetch,
    });
    const [dictionary, records, posfwd] = await Promise.all([
      EtdDictionary.load(files),
      EtdRecords.load(files),
      EtdPosfwd.load(files),
    ]);
    const prefixes: FieldPrefix[] = [...BASE_PREFIXES];
    if (files.meta.prefixed_fields?.o) prefixes.push('o:');
    // Loaded on first use: ~29 MB a plain search never needs.
    const facets = new EtdFacets(files, { cache: options.cacheFacets });
    return { files, dictionary, records, posfwd, facets, prefixes };
  }

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery> {
    const { files, dictionary, records, posfwd, facets, prefixes } =
      await this.loading;

    const { tree, filters: clauses } = parseQuery(text);
    if (clauses.length) {
      const names = clauses.map(c => `${c.field}:`).join(', ');
      throw new Error(`ETD engine: ${names} filters are not ported yet`);
    }

    const terms = queryTerms(tree, prefixes);
    if (!terms.length) {
      return hasFilters(filters)
        ? listFiltered(
            await facets.rows(options),
            files.meta.n_docs,
            filters,
            records,
          )
        : emptyQuery();
    }

    // Round 1: dictionary entries. Round 2: every posting list in one request.
    const entries = await dictionary.lookup(terms, options);
    const present = [...new Set(terms)].filter(term => entries.has(term));
    const buffers = await files.ranges(
      'postings.bin',
      present.map(term => {
        const entry = entries.get(term)!;
        return [entry.offset, entry.length] as const;
      }),
      64,
      options,
    );
    const positional = !!files.meta.positional;
    const lists = new Map(
      present.map((term, i) => [term, decodePostings(buffers[i], positional)]),
    );

    const { scores, approximate } = scoreQuery(tree, {
      entries,
      lists,
      nDocs: files.meta.n_docs,
      prefixes,
      posfwd: !!files.meta.posfwd,
    });
    // A docId outside the index would make a record read run past the end
    // of stubs.bin; drop any rather than fail the search.
    for (const docId of [...scores.keys()]) {
      if (!(docId >= 1 && docId <= files.meta.n_docs)) scores.delete(docId);
    }
    // Filtered across every match, before ranking, so the total and paging
    // both reflect the filter.
    if (hasFilters(filters)) {
      const rows = await facets.rows(options);
      for (const docId of [...scores.keys()]) {
        if (!passesFilters(rows, docId, filters)) scores.delete(docId);
      }
    }
    boostSharedFields(scores, terms, lists, prefixes);

    const plain = rankScores(scores);
    let ranked = plain;
    // Re-ranked before the first page: collection-browser can't swap results
    // it has shown, so unlike the live page this can't land progressively.
    const words = boostTokens(text, clauses.length > 0);
    let boost: EtdQueryBoost | undefined;
    if (words && posfwd) {
      ranked = await phraseBoost(plain, words, posfwd, options);
      let plainRanks: Map<number, number> | undefined;
      boost = {
        words,
        topBefore: count => plain.slice(0, count),
        rankBefore: docId => {
          plainRanks ??= new Map(plain.map((id, i) => [id, i + 1]));
          return plainRanks.get(docId);
        },
        placement: docId => wordsPlacement(posfwd.get(docId), words),
      };
    }
    const marked = termsToMark(terms);
    let ranks: Map<number, number> | undefined;
    let cursor = 0;
    return {
      result: {
        total: scores.size,
        approximate: approximate || scores.size >= APPROXIMATE_AT,
        reachable: ranked.length,
      },
      async next(count, nextOptions) {
        const ids = ranked.slice(cursor, cursor + count);
        const page = await records.read(ids, nextOptions);
        // Only advance once the read succeeded, so a retry resumes here.
        cursor += ids.length;
        return page.map(record =>
          record.snippet
            ? { ...record, highlight: markTerms(record.snippet, marked) }
            : record,
        );
      },
      async facets(facetOptions) {
        return countFacets(await facets.rows(facetOptions), scores.keys());
      },
      rankOf(docId) {
        ranks ??= new Map(ranked.map((id, i) => [id, i + 1]));
        return ranks.get(docId);
      },
      matches(docId) {
        return scores.has(docId);
      },
      boost,
    };
  }

  async record(
    docId: number,
    options?: EtdCallOptions,
  ): Promise<EtdRecord | undefined> {
    const { records } = await this.loading;
    const [record] = await records.read([docId], options);
    return record;
  }
}

function hasFilters(filters: EtdFilters): boolean {
  return (
    filters.year?.min !== undefined ||
    filters.year?.max !== undefined ||
    !!filters.includeLanguages?.length ||
    !!filters.excludeLanguages?.length
  );
}

function passesFilters(
  rows: EtdFacetRows,
  docId: number,
  filters: EtdFilters,
): boolean {
  const { year, includeLanguages, excludeLanguages } = filters;
  if (year?.min !== undefined || year?.max !== undefined) {
    const docYear = knownYear(rows.year(docId));
    if (!docYear) return false; // an unknown year is in no range
    if (year.min !== undefined && docYear < year.min) return false;
    if (year.max !== undefined && docYear > year.max) return false;
  }
  const language = rows.language(docId);
  if (includeLanguages?.length) {
    if (!language || !includeLanguages.includes(language)) return false;
  }
  if (language && excludeLanguages?.includes(language)) return false;
  return true;
}

/**
 * A year, or 0 for one too far in the future to be real (bad dates in the
 * source records), as the live page treats them.
 */
function knownYear(year: number): number {
  return year > new Date().getFullYear() + 2 ? 0 : year;
}

/** Year and language counts over every doc in `docIds`. */
export function countFacets(
  rows: EtdFacetRows,
  docIds: Iterable<number>,
): EtdFacetCounts {
  const counts = emptyFacets();
  for (const docId of docIds) {
    const year = knownYear(rows.year(docId));
    if (year) counts.year[year] = (counts.year[year] ?? 0) + 1;
    const language = rows.language(docId);
    if (language)
      counts.language[language] = (counts.language[language] ?? 0) + 1;
  }
  return counts;
}

function emptyFacets(): EtdFacetCounts {
  return { year: {}, language: {}, country: {}, domain: {}, institution: {} };
}

/**
 * A query with filters but no words ('everything in Portuguese'): every doc
 * passing the filters, in docId order. Each pass reads the whole facet file
 * (~26M rows), once to list and once more for facet counts.
 */
function listFiltered(
  rows: EtdFacetRows,
  nDocs: number,
  filters: EtdFilters,
  records: EtdRecords,
): EtdQuery {
  const passing = function* passing() {
    for (let docId = 1; docId <= nDocs; docId += 1) {
      if (passesFilters(rows, docId, filters)) yield docId;
    }
  };
  const listed: number[] = [];
  let total = 0;
  for (const docId of passing()) {
    total += 1;
    if (listed.length < LISTED_CAP) listed.push(docId);
  }

  let cursor = 0;
  return {
    result: { total, approximate: false, reachable: listed.length },
    async next(count, options) {
      const ids = listed.slice(cursor, cursor + count);
      const page = await records.read(ids, options);
      cursor += ids.length;
      return page;
    },
    async facets() {
      return countFacets(rows, passing());
    },
    rankOf(docId) {
      const rank = listed.indexOf(docId) + 1;
      return rank || undefined;
    },
    matches(docId) {
      return (
        docId >= 1 && docId <= nDocs && passesFilters(rows, docId, filters)
      );
    },
  };
}

function emptyQuery(): EtdQuery {
  return {
    result: { total: 0, approximate: false, reachable: 0 },
    async next() {
      return [];
    },
    async facets() {
      return emptyFacets();
    },
    rankOf() {
      return undefined;
    },
    matches() {
      return false;
    },
  };
}
