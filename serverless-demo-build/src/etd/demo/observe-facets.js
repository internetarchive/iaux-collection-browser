/**
 * Wraps a search service so the demo can see the facets collection-browser
 * gets, without collection-browser telling it: every call passes through
 * unchanged, and each facets request (rows: 0) is reported as it starts and
 * when it lands. A request a newer one has replaced isn't reported, as
 * collection-browser drops it too.
 *
 * A service declaring its own facet groups keeps declaring them.
 */
export function observeFacets(service, listener) {
    let latest = 0;
    return {
        get extraFacetGroups() {
            return service.extraFacetGroups;
        },
        get allowFilterOnlySearch() {
            return service.allowFilterOnlySearch;
        },
        itemDetails: identifier => service.itemDetails(identifier),
        async search(params, searchType) {
            if (params.rows !== 0)
                return service.search(params, searchType);
            latest += 1;
            const request = latest;
            listener({ state: 'loading' });
            let result;
            try {
                result = await service.search(params, searchType);
            }
            catch (err) {
                if (request === latest)
                    listener({ state: 'failed' });
                throw err;
            }
            if (request === latest) {
                const aggregations = result.success?.response.aggregations;
                listener(aggregations
                    ? { state: 'loaded', aggregations }
                    : { state: 'failed' });
            }
            return result;
        },
    };
}
