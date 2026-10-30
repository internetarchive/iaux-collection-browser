import type { FilterMap } from '@internetarchive/search-service';

/**
 * Whether two searches filter by the same values. A field with no values
 * counts as no filter, since collection-browser sends every facet field,
 * mostly empty.
 */
export function sameFilters(a: FilterMap = {}, b: FilterMap = {}): boolean {
  return filtersKey(a) === filtersKey(b);
}

function filtersKey(filters: FilterMap): string {
  const fields = Object.entries(filters)
    .filter(([, values]) => Object.keys(values ?? {}).length > 0)
    .sort(([x], [y]) => x.localeCompare(y))
    .map(([field, values]) => [
      field,
      Object.entries(values ?? {}).sort(([x], [y]) => x.localeCompare(y)),
    ]);
  return JSON.stringify(fields);
}
