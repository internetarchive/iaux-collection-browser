import type { SearchParams } from '@internetarchive/search-service';
import {
  includesAndExcludes,
  yearBounds,
} from '../serverless-search/filter-map';
import type { EtdFilters } from './etd-engine';
import { etdFacet } from './etd-facets';

/**
 * What a SearchParams asks of the ETD engine.
 */
export interface EtdRequest {
  /** The query text, passed through in the engine's own syntax. */
  text: string;

  filters: EtdFilters;

  /**
   * Filter fields the engine has no equivalent for (e.g. `subject`,
   * `firstTitle`). They are dropped rather than failing the search.
   */
  ignoredFields: string[];
}

/**
 * Translates collection-browser's SearchParams into an ETD engine request.
 */
export function etdRequestFromParams(params: SearchParams): EtdRequest {
  const filters: EtdFilters = {};
  const ignoredFields: string[] = [];

  for (const [field, fieldFilter] of Object.entries(params.filters ?? {})) {
    if (field === 'year' || field === 'date') {
      // The ETD index only knows years, so a date (YYYY-MM) range is widened.
      const year = yearBounds(fieldFilter, field === 'date');
      if (year) filters.year = { ...filters.year, ...year };
    } else if (etdFacet(field)) {
      // collection-browser filters by the names a facet shows; the engine
      // by the codes behind them.
      const facet = etdFacet(field)!;
      const { include, exclude } = includesAndExcludes(fieldFilter);
      const codes = (names: string[]) =>
        names.length ? names.flatMap(name => facet.codesFor(name)) : undefined;
      filters.facets = {
        ...filters.facets,
        [field]: { include: codes(include), exclude: codes(exclude) },
      };
    } else {
      ignoredFields.push(field);
    }
  }

  return { text: (params.query ?? '').trim(), filters, ignoredFields };
}

/**
 * A stable key for an engine request, so the hits and aggregations requests
 * that collection-browser sends for the same search share one ranked query.
 */
export function etdRequestKey(request: EtdRequest): string {
  const { year, facets = {} } = request.filters;
  return JSON.stringify([
    request.text,
    year?.min ?? null,
    year?.max ?? null,
    Object.keys(facets)
      .sort()
      .map(key => [
        key,
        [...(facets[key].include ?? [])].sort(),
        [...(facets[key].exclude ?? [])].sort(),
      ]),
  ]);
}

/**
 * Whether a request has anything for the engine to search on.
 */
export function etdRequestIsEmpty(request: EtdRequest): boolean {
  const { year, facets = {} } = request.filters;
  return (
    !request.text &&
    year?.min === undefined &&
    year?.max === undefined &&
    Object.values(facets).every(
      filter => !filter.include?.length && !filter.exclude?.length,
    )
  );
}
