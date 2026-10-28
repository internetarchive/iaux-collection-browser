import type { SearchParams } from '@internetarchive/search-service';
import type {
  SearchSource,
  SourceFacet,
  SourceCallOptions,
  SourceQuery,
} from '../../src/serverless-search/search-source';
import { yearBounds } from '../../src/serverless-search/filter-map';
import type { YearBounds } from '../../src/serverless-search/filter-map';
import {
  termBuckets,
  yearHistogram,
} from '../../src/serverless-search/source-response';

/**
 * A book in the mock source. Deliberately not ETD-shaped, so the serverless
 * layer's tests cannot lean on anything ETD-specific.
 */
export interface MockBook {
  id: string;
  title: string;
  year: number;
  subject: string;
  url: string;
}

export interface MockBookRequest {
  text: string;
  year?: YearBounds;
}

/**
 * Builds `count` books: ids book-1..book-count, years cycling through
 * 1990-2019, subjects alternating poetry/history.
 */
export function mockBooks(count: number): MockBook[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `book-${i + 1}`,
    title: `Book ${i + 1} about rivers`,
    year: 1990 + (i % 30),
    subject: i % 2 === 0 ? 'poetry' : 'history',
    url: `https://books.example.org/${i + 1}`,
  }));
}

/**
 * An in-memory SearchSource over books. Text matches on title words; matches
 * come back in list order. Records calls and can be told to fail, so tests
 * can check how ServerlessSearchService drives a source.
 */
export class MockSearchSource
  implements SearchSource<MockBookRequest, MockBook>
{
  readonly ready: Promise<void> = Promise.resolve();

  readonly aggregationKeys = ['subject', 'year_histogram'] as const;

  /** The source's facets, as a test sets them. */
  facets?: SourceFacet[];

  /** Whether it can list books for filters alone, as a test sets it. */
  listsWithoutQuery?: boolean;

  /** Every query() call's request, in order. */
  readonly queryCalls: MockBookRequest[] = [];

  /** Signals handed to query(), in order. */
  readonly querySignals: (AbortSignal | undefined)[] = [];

  /** Every next() call's count across all queries, in order. */
  readonly nextCalls: number[] = [];

  /** When set, the next query() call rejects with this error, once. */
  failNextQuery?: Error;

  /** When set, the next next() call rejects with this error, once. */
  failNextRead?: Error;

  /** Caps how many matches paging can reach. */
  reachableCap = Number.POSITIVE_INFINITY;

  /** Overrides the reported total, e.g. to simulate an estimated count. */
  totalOverride?: number;

  /** next() returns at most this many per call, like a filtering cursor. */
  maxPerRead = Number.POSITIVE_INFINITY;

  constructor(private readonly books: MockBook[]) {}

  toRequest(params: SearchParams): MockBookRequest | undefined {
    const text = (params.query ?? '').trim();
    const year = params.filters?.year
      ? yearBounds(params.filters.year, false)
      : undefined;
    if (!text && !year) return undefined;
    return year ? { text, year } : { text };
  }

  requestKey(request: MockBookRequest): string {
    return JSON.stringify([
      request.text,
      request.year?.min ?? null,
      request.year?.max ?? null,
    ]);
  }

  async query(
    request: MockBookRequest,
    options?: SourceCallOptions,
  ): Promise<SourceQuery<MockBook>> {
    this.queryCalls.push(request);
    this.querySignals.push(options?.signal);
    if (this.failNextQuery) {
      const err = this.failNextQuery;
      this.failNextQuery = undefined;
      throw err;
    }

    const words = request.text.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = this.books.filter(
      book =>
        words.every(word => book.title.toLowerCase().includes(word)) &&
        (request.year?.min === undefined || book.year >= request.year.min) &&
        (request.year?.max === undefined || book.year <= request.year.max),
    );
    const result = {
      total: this.totalOverride ?? matches.length,
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
        const batch = matches.slice(cursor, end);
        cursor = end;
        return batch;
      },
      aggregations: async (keys, size, aggOptions) => {
        throwIfAborted(aggOptions?.signal);
        const subjects: Record<string, number> = {};
        const decades: Record<string, number> = {};
        for (const book of matches) {
          subjects[book.subject] = (subjects[book.subject] ?? 0) + 1;
          const decade = String(book.year - (book.year % 10));
          decades[decade] = (decades[decade] ?? 0) + 1;
        }
        const aggregations: Record<string, unknown> = {};
        if (keys.includes('subject')) {
          aggregations.subject = { buckets: termBuckets(subjects, size) };
        }
        if (keys.includes('year_histogram')) {
          aggregations.year_histogram = yearHistogram(decades, 10);
        }
        return aggregations;
      },
    };
  }

  async record(identifier: string): Promise<MockBook | undefined> {
    return this.books.find(book => book.id === identifier);
  }

  toHit(book: MockBook): Record<string, unknown> {
    return {
      hit_type: 'item',
      fields: {
        identifier: book.id,
        mediatype: 'texts',
        title: book.title,
        year: book.year,
        __href__: book.url,
      },
    };
  }
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) {
    throw new DOMException('The operation was aborted.', 'AbortError');
  }
}
