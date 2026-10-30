export function observeFacets(service, listener, onRequest) {
    let latest = 0;
    return {
        get extraFacetGroups() {
            return service.extraFacetGroups;
        },
        get allowFilterOnlySearch() {
            return service.allowFilterOnlySearch;
        },
        itemDetails: identifier => service.itemDetails(identifier),
        // Only there if the service has it: collection-browser checks for it.
        ...(service.onResultsChanged && {
            onResultsChanged: (changed) => service.onResultsChanged(changed),
        }),
        async search(params, searchType) {
            if (params.rows !== 0)
                return service.search(params, searchType);
            latest += 1;
            const request = latest;
            listener({ state: 'loading' });
            onRequest?.(params);
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
