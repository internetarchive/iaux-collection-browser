import type {
  EtdCallOptions,
  EtdEngine,
  EtdFacetCounts,
  EtdFilters,
  EtdQuery,
  EtdRecord,
} from '../etd-engine';
import { EtdDictionary } from './dictionary';
import { EtdIndexFiles } from './index-files';
import { markTerms, termsToMark } from './mark-terms';
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
}

/** Past this many matches the page marks a count as approximate. */
const APPROXIMATE_AT = 10000;

interface Loaded {
  files: EtdIndexFiles;
  dictionary: EtdDictionary;
  records: EtdRecords;
  prefixes: FieldPrefix[];
}

/**
 * The ETD search engine: ranks the static index in the browser with Range
 * reads, as etd-search/search.html does.
 *
 * A query is about three rounds of requests: dictionary buckets, posting
 * lists (each one multi-range request), then a page of records.
 *
 * Not yet ported (later phases): facet filters and counts, filter-only
 * queries, exact phrase verification (quoted phrases currently match their
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
    const [dictionary, records] = await Promise.all([
      EtdDictionary.load(files),
      EtdRecords.load(files),
    ]);
    const prefixes: FieldPrefix[] = [...BASE_PREFIXES];
    if (files.meta.prefixed_fields?.o) prefixes.push('o:');
    return { files, dictionary, records, prefixes };
  }

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery> {
    const { files, dictionary, records, prefixes } = await this.loading;

    if (hasFilters(filters)) {
      throw new Error(
        'ETD engine: year and language filters are not ported yet',
      );
    }
    const { tree, filters: clauses } = parseQuery(text);
    if (clauses.length) {
      const names = clauses.map(c => `${c.field}:`).join(', ');
      throw new Error(`ETD engine: ${names} filters are not ported yet`);
    }

    const terms = queryTerms(tree, prefixes);
    if (!terms.length) return emptyQuery();

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
    boostSharedFields(scores, terms, lists, prefixes);

    const ranked = rankScores(scores);
    const marked = termsToMark(terms);
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
      async facets() {
        return emptyFacets();
      },
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

function emptyFacets(): EtdFacetCounts {
  return { decade: {}, language: {}, country: {}, domain: {}, institution: {} };
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
  };
}
