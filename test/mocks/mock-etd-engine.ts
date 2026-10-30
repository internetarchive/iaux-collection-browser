import type {
  EtdCallOptions,
  EtdEngine,
  EtdFacetCounts,
  EtdFilters,
  EtdQuery,
  EtdQueryBoost,
  EtdQueryResult,
  EtdRecord,
} from '../../src/etd/etd-engine';

/**
 * A thesis for the mock index: the record plus the fields the mock filters
 * and counts facets on.
 */
export interface MockEtdThesis extends EtdRecord {
  language?: string;
  country?: string;
}

/**
 * Builds `count` theses with predictable fields: docIds 1..count, years
 * cycling through 1990-2019, languages alternating en/fr.
 */
export function mockEtdTheses(count: number): MockEtdThesis[] {
  return Array.from({ length: count }, (_, i) => {
    const docId = i + 1;
    return {
      docId,
      title: `Thesis ${docId} on climate`,
      creators: `Author ${docId}; Advisor ${docId}`,
      date: String(1990 + (i % 30)),
      domain: 'dspace.example.edu',
      url: `https://dspace.example.edu/handle/${docId}`,
      language: i % 2 === 0 ? 'en' : 'fr',
      country: 'CA',
    };
  });
}

/**
 * An in-memory EtdEngine. Text matches on title words; every matching record
 * ranks in docId order. Records calls so tests can check how the adapter
 * drives the engine.
 */
export class MockEtdEngine implements EtdEngine {
  readonly ready: Promise<void> = Promise.resolve();

  /** Every query() call, in order. */
  readonly queryCalls: { text: string; filters: EtdFilters }[] = [];

  /** Every next() call across all queries, in order. */
  readonly nextCalls: number[] = [];

  /** Signals handed to query(), in order. */
  readonly querySignals: (AbortSignal | undefined)[] = [];

  /** When set, the next next() call rejects with this error once. */
  failNextRead?: Error;

  /** When set, query() rejects with this error once. */
  failNextQuery?: Error;

  /** Overrides the reachable cap, like the real engine's top-ranked limit. */
  reachableCap = Number.POSITIVE_INFINITY;

  /** Overrides the reported total, e.g. to simulate an estimated count. */
  totalOverride?: { total: number; approximate: boolean };

  /** Simulated phrase verification: next() returns at most this many per call. */
  maxPerRead = Number.POSITIVE_INFINITY;

  /** Attached to every query as its phrase boost, when set. */
  boost?: EtdQueryBoost;

  constructor(private readonly theses: MockEtdThesis[]) {}

  async query(
    text: string,
    filters: EtdFilters,
    options?: EtdCallOptions,
  ): Promise<EtdQuery> {
    this.queryCalls.push({ text, filters });
    this.querySignals.push(options?.signal);
    if (this.failNextQuery) {
      const err = this.failNextQuery;
      this.failNextQuery = undefined;
      throw err;
    }

    const matches = this.theses.filter(
      thesis => matchesText(thesis, text) && matchesFilters(thesis, filters),
    );
    const total = this.totalOverride?.total ?? matches.length;
    const result: EtdQueryResult = {
      total,
      approximate: this.totalOverride?.approximate ?? false,
      reachable: Math.min(matches.length, this.reachableCap),
    };

    let cursor = 0;
    return {
      result,
      next: async (count, nextOptions) => {
        this.nextCalls.push(count);
        throwIfAborted(nextOptions?.signal);
        if (this.failNextRead) {
          const err = this.failNextRead;
          this.failNextRead = undefined;
          throw err;
        }
        const end = Math.min(
          cursor + Math.min(count, this.maxPerRead),
          result.reachable,
        );
        const batch = matches.slice(cursor, end).map(toRecord);
        cursor = end;
        return batch;
      },
      facets: async facetOptions => {
        throwIfAborted(facetOptions?.signal);
        return facetCounts(matches);
      },
      rankOf: docId => {
        const rank = matches.findIndex(t => t.docId === docId) + 1;
        return rank >= 1 && rank <= result.reachable ? rank : undefined;
      },
      matches: docId => matches.some(t => t.docId === docId),
      boost: this.boost,
    };
  }

  async record(docId: number): Promise<EtdRecord | undefined> {
    const thesis = this.theses.find(t => t.docId === docId);
    return thesis ? toRecord(thesis) : undefined;
  }
}

function toRecord(thesis: MockEtdThesis): EtdRecord {
  const record: MockEtdThesis = { ...thesis };
  delete record.language;
  delete record.country;
  return record;
}

function matchesText(thesis: MockEtdThesis, text: string): boolean {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const title = thesis.title.toLowerCase();
  return words.every(word => title.includes(word));
}

/** The mock's facets: one value each, straight off the thesis. */
const MOCK_FACETS: Record<
  string,
  (thesis: MockEtdThesis) => string | undefined
> = {
  language: thesis => thesis.language,
  country: thesis => thesis.country,
};

function matchesFilters(thesis: MockEtdThesis, filters: EtdFilters): boolean {
  const year = Number.parseInt(thesis.date, 10);
  if (filters.year?.min !== undefined && !(year >= filters.year.min)) {
    return false;
  }
  if (filters.year?.max !== undefined && !(year <= filters.year.max)) {
    return false;
  }
  for (const [key, filter] of Object.entries(filters.facets ?? {})) {
    const value = MOCK_FACETS[key]?.(thesis) ?? '';
    if (filter.include?.length && !filter.include.includes(value)) return false;
    if (filter.exclude?.includes(value)) return false;
  }
  return true;
}

function facetCounts(theses: MockEtdThesis[]): EtdFacetCounts {
  const counts: EtdFacetCounts = { year: {}, facets: {} };
  const bump = (group: Record<string, number>, key?: string) => {
    if (key) group[key] = (group[key] ?? 0) + 1;
  };
  for (const thesis of theses) {
    const year = Number.parseInt(thesis.date, 10);
    if (!Number.isNaN(year)) bump(counts.year, String(year));
    for (const [key, read] of Object.entries(MOCK_FACETS)) {
      counts.facets[key] ??= {};
      bump(counts.facets[key], read(thesis));
    }
  }
  return counts;
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('The operation was aborted.', 'AbortError');
  }
}
