import { FilterConstraint } from '@internetarchive/search-service';
/**
 * Reads inclusive year bounds out of a `year` or `date` field filter, as the
 * date picker sends them. A `date` filter (YYYY-MM) is widened to whole
 * years, for sources that only know years.
 */
export function yearBounds(fieldFilter, isDateField) {
    const bounds = {};
    for (const [value, constraints] of Object.entries(fieldFilter)) {
        const year = Number.parseInt(value.slice(0, 4), 10);
        if (Number.isNaN(year))
            continue;
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
/**
 * Splits a facet's field filter into selected (include) and hidden (exclude)
 * values.
 */
export function includesAndExcludes(fieldFilter) {
    const include = [];
    const exclude = [];
    for (const [value, constraints] of Object.entries(fieldFilter)) {
        const all = [constraints].flat();
        if (all.includes(FilterConstraint.INCLUDE))
            include.push(value);
        if (all.includes(FilterConstraint.EXCLUDE))
            exclude.push(value);
    }
    return { include, exclude };
}
