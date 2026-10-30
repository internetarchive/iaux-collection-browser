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
import type { EtdFileCheck } from './file-checks';
import { EtdIndexFiles } from './index-files';
import { markTerms, termsToMark } from './mark-terms';
import { boostTokens, phraseBoost, wordsPlacement } from './phrase-boost';
import { EtdPosfwd } from './posfwd';
import { EtdFacets } from './facets';
import type { EtdInstitutions } from './institutions';
import type { EtdFacetReader, EtdFacetRows } from './facets';
import { decodePostings } from './postings';
import type { FieldFilterClause, FieldPrefix } from './query-parser';
import { institutionValues, parseQuery } from './query-parser';
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

  /**
   * The facets to count and filter by. The engine knows none by name: ETD's
   * are in src/etd/etd-facets.ts. Year is always there (the date picker).
   */
  facets?: readonly EtdFacetReader[];
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
  /** Facet values per doc, for filters and facet counts. */
  facets: EtdFacets;
  readers: readonly EtdFacetReader[];
  prefixes: FieldPrefix[];
}

/**
 * The ETD search engine: ranks the static index in the browser with Range
 * reads, as etd-search/search.html does.
 *
 * A query is about three rounds of requests: dictionary buckets, posting
 * lists (each one multi-range request), then a page of records.
 *
 * Not yet ported (later phases): `field:` filters other than a known
 * `inst:`, and exact phrase verification (quoted phrases currently match
 * their words anywhere in a document).
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
    return {
      files,
      dictionary,
      records,
      posfwd,
      facets,
      readers: options.facets ?? [],
      prefixes,
    };
  }

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery> {
    const { files, dictionary, records, posfwd, facets, readers, prefixes } =
      await this.loading;
    // inst: values the institution list knows filter by institution, as on
    // the live page; it's looked up first because the parser is synchronous.
    const institutions = await resolveInstitutions(
      text,
      facets.institutions,
      options,
    );
    const { tree, filters: clauses } = parseQuery(text, { institutions });
    const unported = clauses.filter(clause => clause.field !== 'inst');
    if (unported.length) {
      const names = unported.map(c => `${c.field}:`).join(', ');
      throw new Error(`ETD engine: ${names} filters are not ported yet`);
    }
    const passes = filterFor(
      filters,
      readers,
      clauses.map(clause => institutionCheck(clause, institutions)),
    );

    const terms = queryTerms(tree, prefixes);
    if (!terms.length) {
      return passes
        ? listFiltered(
            await facets.rows(options),
            files.meta.n_docs,
            passes,
            readers,
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
    if (passes) {
      const rows = await facets.rows(options);
      for (const docId of [...scores.keys()]) {
        if (!passes(rows, docId)) scores.delete(docId);
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
        return countFacets(
          await facets.rows(facetOptions),
          scores.keys(),
          readers,
        );
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

  /** What the item's file list said about the index's files. */
  async fileCheck(): Promise<EtdFileCheck> {
    const { files } = await this.loading;
    return files.fileCheck;
  }
}

/** A doc check for the filters; undefined when they filter nothing. */
export type DocFilter = (rows: EtdFacetRows, docId: number) => boolean;

/**
 * Each `inst:` value in the query that the institution list knows, with its
 * institution ids. A failed lookup leaves the value to be searched as text,
 * as on the live page.
 */
async function resolveInstitutions(
  text: string,
  institutions: EtdInstitutions,
  options?: EtdCallOptions,
): Promise<Map<string, Set<number>>> {
  const resolved = new Map<string, Set<number>>();
  for (const value of institutionValues(text)) {
    try {
      resolved.set(value, await institutions.idsFor(value, options));
    } catch (err) {
      if (options?.signal?.aborted) throw err;
    }
  }
  return resolved;
}

/** An `inst` clause as a doc check: from one of its institutions, or not. */
function institutionCheck(
  clause: FieldFilterClause,
  institutions: ReadonlyMap<string, ReadonlySet<number>>,
): DocFilter {
  const ids = institutions.get(clause.value) ?? new Set<number>();
  return (rows, docId) => ids.has(rows.institution(docId)) !== clause.negated;
}

/**
 * Compiles the filters, and any checks from the query, into one check per
 * doc, or undefined when there are none. A facet filter rules out docs with
 * any excluded value, then needs any of the included values, or all of them
 * for an 'all' facet.
 */
export function filterFor(
  filters: EtdFilters,
  readers: readonly EtdFacetReader[],
  queryChecks: DocFilter[] = [],
): DocFilter | undefined {
  const checks: DocFilter[] = [...queryChecks];
  const { year } = filters;
  if (year?.min !== undefined || year?.max !== undefined) {
    checks.push((rows, docId) => {
      const docYear = knownYear(rows.year(docId));
      if (!docYear) return false; // an unknown year is in no range
      if (year.min !== undefined && docYear < year.min) return false;
      if (year.max !== undefined && docYear > year.max) return false;
      return true;
    });
  }
  for (const [key, filter] of Object.entries(filters.facets ?? {})) {
    const include = filter.include ?? [];
    const exclude = filter.exclude ?? [];
    if (!include.length && !exclude.length) continue;
    const reader = readers.find(candidate => candidate.key === key);
    if (!reader) throw new Error(`ETD engine: no "${key}" facet to filter by`);
    const needsAll = reader.combine === 'all';
    checks.push((rows, docId) => {
      const codes: string[] = [];
      reader.read(rows, docId, code => codes.push(code));
      if (exclude.some(code => codes.includes(code))) return false;
      if (!include.length) return true;
      return needsAll
        ? include.every(code => codes.includes(code))
        : include.some(code => codes.includes(code));
    });
  }
  if (!checks.length) return undefined;
  return (rows, docId) => checks.every(check => check(rows, docId));
}

/**
 * A year, or 0 for one too far in the future to be real (bad dates in the
 * source records), as the live page treats them.
 */
function knownYear(year: number): number {
  return year > new Date().getFullYear() + 2 ? 0 : year;
}

/** Year and facet value counts over every doc in `docIds`. */
export function countFacets(
  rows: EtdFacetRows,
  docIds: Iterable<number>,
  readers: readonly EtdFacetReader[],
): EtdFacetCounts {
  const counts = emptyFacets();
  // One counter per facet, made once rather than per doc.
  const counters = readers.map(reader => {
    const values: Record<string, number> = {};
    counts.facets[reader.key] = values;
    return {
      reader,
      add: (code: string) => {
        values[code] = (values[code] ?? 0) + 1;
      },
    };
  });
  for (const docId of docIds) {
    const year = knownYear(rows.year(docId));
    if (year) counts.year[year] = (counts.year[year] ?? 0) + 1;
    for (const { reader, add } of counters) reader.read(rows, docId, add);
  }
  return counts;
}

function emptyFacets(): EtdFacetCounts {
  return { year: {}, facets: {} };
}

/**
 * A query with filters but no words ('everything in Portuguese'): every doc
 * passing the filters, in docId order. Each pass reads the whole facet file
 * (~26M rows), once to list and once more for facet counts.
 */
function listFiltered(
  rows: EtdFacetRows,
  nDocs: number,
  passes: DocFilter,
  readers: readonly EtdFacetReader[],
  records: EtdRecords,
): EtdQuery {
  const passing = function* passing() {
    for (let docId = 1; docId <= nDocs; docId += 1) {
      if (passes(rows, docId)) yield docId;
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
      return countFacets(rows, passing(), readers);
    },
    rankOf(docId) {
      const rank = listed.indexOf(docId) + 1;
      return rank || undefined;
    },
    matches(docId) {
      return docId >= 1 && docId <= nDocs && passes(rows, docId);
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
