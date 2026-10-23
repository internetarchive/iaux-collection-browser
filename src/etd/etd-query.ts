import { FilterConstraint } from '@internetarchive/search-service';
import type {
  FieldFilter,
  SearchParams,
} from '@internetarchive/search-service';
import type { EtdFilters } from './etd-engine';

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
      const year = yearBounds(fieldFilter, field === 'date');
      if (year) filters.year = { ...filters.year, ...year };
    } else if (field === 'language') {
      const { include, exclude } = includesAndExcludes(fieldFilter);
      if (include.length) filters.includeLanguages = include;
      if (exclude.length) filters.excludeLanguages = exclude;
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
  const { year, includeLanguages, excludeLanguages } = request.filters;
  return JSON.stringify([
    request.text,
    year?.min ?? null,
    year?.max ?? null,
    [...(includeLanguages ?? [])].sort(),
    [...(excludeLanguages ?? [])].sort(),
  ]);
}

/**
 * Whether a request has anything for the engine to search on.
 */
export function etdRequestIsEmpty(request: EtdRequest): boolean {
  const { year, includeLanguages, excludeLanguages } = request.filters;
  return (
    !request.text &&
    year?.min === undefined &&
    year?.max === undefined &&
    !includeLanguages?.length &&
    !excludeLanguages?.length
  );
}

/**
 * Reads year bounds out of a year or date field filter. The ETD index only
 * knows years, so a `date` filter (YYYY-MM) is widened to whole years.
 */
function yearBounds(
  fieldFilter: FieldFilter,
  isDateField: boolean,
): { min?: number; max?: number } | undefined {
  const bounds: { min?: number; max?: number } = {};
  for (const [value, constraints] of Object.entries(fieldFilter)) {
    const year = Number.parseInt(value.slice(0, 4), 10);
    if (Number.isNaN(year)) continue;

    for (const constraint of [constraints].flat()) {
      switch (constraint) {
        case FilterConstraint.GREATER_OR_EQUAL:
          bounds.min = year;
          break;
        case FilterConstraint.GREATER_THAN:
          bounds.min = isDateField ? year : year + 1;
          break;
        case FilterConstraint.LESS_OR_EQUAL:
          bounds.max = year;
          break;
        case FilterConstraint.LESS_THAN:
          bounds.max = isDateField ? year : year - 1;
          break;
        case FilterConstraint.INCLUDE:
          bounds.min = year;
          bounds.max = year;
          break;
        default:
          break;
      }
    }
  }
  return bounds.min === undefined && bounds.max === undefined
    ? undefined
    : bounds;
}

function includesAndExcludes(fieldFilter: FieldFilter): {
  include: string[];
  exclude: string[];
} {
  const include: string[] = [];
  const exclude: string[] = [];
  for (const [value, constraints] of Object.entries(fieldFilter)) {
    const all = [constraints].flat();
    if (all.includes(FilterConstraint.INCLUDE)) include.push(value);
    if (all.includes(FilterConstraint.EXCLUDE)) exclude.push(value);
  }
  return { include, exclude };
}
