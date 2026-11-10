import type { Result } from '@internetarchive/result-type';
import {
  Aggregation,
  FilterConstraint,
  ItemHit,
  type FilterMap,
  type SearchParams,
  type SearchResponse,
  type SearchServiceError,
  type SearchServiceInterface,
} from '@internetarchive/search-service';

/** A made-up item: just the fields the demo searches, filters and facets. */
export interface DemoItem {
  identifier: string;
  title: string;
  mediatype: string;
  language: string;
  year: number;
  country: string;
}

/**
 * Made-up items for the demo. `country` is a field collection-browser has no
 * facet group for, so the demo can show one added with `extraFacetGroups`.
 */
export const DEMO_ITEMS: readonly DemoItem[] = [
  ['River maps of the north', 'texts', 'English', 1998, 'Canada'],
  ['Harbour songs', 'audio', 'English', 2004, 'Canada'],
  ['Prairie weather notes', 'texts', 'French', 2011, 'Canada'],
  ['Ice road footage', 'movies', 'English', 2016, 'Canada'],
  ['Notas da floresta', 'texts', 'Portuguese', 2001, 'Brazil'],
  ['Samba recordings', 'audio', 'Portuguese', 2007, 'Brazil'],
  ['City trams of the south', 'movies', 'Portuguese', 2013, 'Brazil'],
  ['Alpine hut logbook', 'texts', 'German', 1995, 'Austria'],
  ['Vienna street sounds', 'audio', 'German', 2009, 'Austria'],
  ['Glacier survey film', 'movies', 'English', 2019, 'Austria'],
  ['Desert star charts', 'texts', 'English', 2002, 'Kenya'],
  ['Market day radio', 'audio', 'English', 2014, 'Kenya'],
].map(([title, mediatype, language, year, country], i) => ({
  identifier: `demo-item-${String(i + 1).padStart(2, '0')}`,
  title: title as string,
  mediatype: mediatype as string,
  language: language as string,
  year: year as number,
  country: country as string,
}));

/** The fields the demo service returns aggregations for. */
const FACET_FIELDS = ['mediatype', 'language', 'year', 'country'] as const;

/** An item's values for a filter or facet field, as strings. */
function fieldValues(item: DemoItem, field: string): string[] {
  switch (field) {
    case 'firstTitle':
      return [item.title.charAt(0).toUpperCase()];
    case 'date':
      return [String(item.year)];
    default: {
      const value = (item as unknown as Record<string, unknown>)[field];
      return value === undefined ? [] : [String(value)];
    }
  }
}

/** Whether an item passes one field's filters, as a search service would. */
function passesFieldFilter(
  item: DemoItem,
  field: string,
  filter: FilterMap[string],
): boolean {
  const values = fieldValues(item, field);
  const includes: string[] = [];
  for (const [value, constraints] of Object.entries(filter)) {
    for (const constraint of ([] as FilterConstraint[]).concat(constraints)) {
      const num = Number(values[0]);
      switch (constraint) {
        case FilterConstraint.INCLUDE:
          includes.push(value);
          break;
        case FilterConstraint.EXCLUDE:
          if (values.includes(value)) return false;
          break;
        case FilterConstraint.GREATER_OR_EQUAL:
          if (!(num >= Number(value.slice(0, 4)))) return false;
          break;
        case FilterConstraint.GREATER_THAN:
          if (!(num > Number(value.slice(0, 4)))) return false;
          break;
        case FilterConstraint.LESS_OR_EQUAL:
          if (!(num <= Number(value.slice(0, 4)))) return false;
          break;
        case FilterConstraint.LESS_THAN:
          if (!(num < Number(value.slice(0, 4)))) return false;
          break;
        default:
          break;
      }
    }
  }
  // Included values are alternatives: any one of them will do.
  return !includes.length || includes.some(value => values.includes(value));
}

/** Whether every word of the query is in the item's title. */
function matchesQuery(item: DemoItem, query: string): boolean {
  const title = item.title.toLowerCase();
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every(word => title.includes(word));
}

/**
 * A search service over `DEMO_ITEMS`, for trying collection-browser's options
 * without a backend. Unlike archive.org's, it searches with no query (listing
 * every item that passes the filters), and returns a `country` aggregation it
 * can also filter by.
 */
export class DemoSearchService implements SearchServiceInterface {
  constructor(private readonly items: readonly DemoItem[] = DEMO_ITEMS) {}

  async search(
    params: SearchParams,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    const query = params.query?.trim() ?? '';
    const filters = params.filters ?? {};
    const matches = this.items.filter(
      item =>
        matchesQuery(item, query) &&
        Object.entries(filters).every(([field, filter]) =>
          passesFieldFilter(item, field, filter),
        ),
    );

    const rows = params.rows ?? 50;
    const page = params.page ?? 1;
    const pageOfMatches = matches.slice((page - 1) * rows, page * rows);

    const aggregations: Record<string, Aggregation> = {};
    for (const field of FACET_FIELDS) {
      const counts = new Map<string, number>();
      for (const item of matches) {
        for (const value of fieldValues(item, field)) {
          counts.set(value, (counts.get(value) ?? 0) + 1);
        }
      }
      aggregations[field] = new Aggregation({
        buckets: [...counts]
          .map(([key, doc_count]) => ({ key, doc_count }))
          // By count, as search services return them.
          .sort((a, b) => b.doc_count - a.doc_count),
      });
    }
    aggregations.year_histogram = this.yearHistogram(matches);

    return {
      success: {
        request: {
          kind: 'hits',
          clientParameters: { user_query: query, sort: [] },
          backendRequests: {
            primary: {
              kind: 'hits',
              finalized_parameters: { user_query: query, sort: [] },
            },
          },
        },
        rawResponse: {},
        sessionContext: {},
        response: {
          totalResults: matches.length,
          returnedCount: pageOfMatches.length,
          results: pageOfMatches.map(
            item =>
              new ItemHit({
                fields: {
                  identifier: item.identifier,
                  title: item.title,
                  mediatype: item.mediatype,
                  language: [item.language],
                  year: item.year,
                  __href__: `/details/${item.identifier}`,
                },
              }),
          ),
          aggregations,
        },
        responseHeader: { succeeded: true, query_time: 0 },
      },
    };
  }

  /**
   * Yearly counts over every item's years, so the date picker's range stays
   * put as filters narrow the matches.
   */
  private yearHistogram(matches: readonly DemoItem[]): Aggregation {
    const years = this.items.map(item => item.year);
    const first = Math.min(...years);
    const last = Math.max(...years);
    const buckets = new Array<number>(last - first + 1).fill(0);
    for (const item of matches) buckets[item.year - first] += 1;
    return new Aggregation({
      buckets,
      first_bucket_key: first,
      last_bucket_key: last,
      interval: 1,
      number_buckets: buckets.length,
    });
  }

  async itemDetails(): Promise<Result<SearchResponse, SearchServiceError>> {
    // collection-browser doesn't call this.
    throw new Error('not implemented');
  }
}
