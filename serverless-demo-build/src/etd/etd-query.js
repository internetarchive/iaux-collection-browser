import { includesAndExcludes, yearBounds, } from '../serverless-search/filter-map';
import { ETD_FACETS } from './etd-facets';
/**
 * Translates collection-browser's SearchParams into an ETD engine request,
 * for an engine with these facets.
 */
export function etdRequestFromParams(params, facets = ETD_FACETS) {
    const filters = {};
    const ignoredFields = [];
    for (const [field, fieldFilter] of Object.entries(params.filters ?? {})) {
        const facet = facets.find(candidate => candidate.key === field);
        if (field === 'year' || field === 'date') {
            // The ETD index only knows years, so a date (YYYY-MM) range is widened.
            const year = yearBounds(fieldFilter, field === 'date');
            if (year)
                filters.year = { ...filters.year, ...year };
        }
        else if (facet) {
            // collection-browser filters by the names a facet shows; the engine
            // by the codes behind them.
            const { include, exclude } = includesAndExcludes(fieldFilter);
            const codes = (names) => names.length ? names.flatMap(name => facet.codesFor(name)) : undefined;
            filters.facets = {
                ...filters.facets,
                [field]: { include: codes(include), exclude: codes(exclude) },
            };
        }
        else {
            ignoredFields.push(field);
        }
    }
    return { text: (params.query ?? '').trim(), filters, ignoredFields };
}
/**
 * A stable key for an engine request, so the hits and aggregations requests
 * that collection-browser sends for the same search share one ranked query.
 */
export function etdRequestKey(request) {
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
export function etdRequestIsEmpty(request) {
    const { year, facets = {} } = request.filters;
    return (!request.text &&
        year?.min === undefined &&
        year?.max === undefined &&
        Object.values(facets).every(filter => !filter.include?.length && !filter.exclude?.length));
}
