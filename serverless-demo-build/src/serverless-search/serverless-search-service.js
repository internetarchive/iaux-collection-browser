import { SearchServiceError } from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';
import { facetTitles } from '../models';
import { SourcePager } from './source-pager';
import { sourceSearchResponse } from './source-response';
/** Marks a title whose picked values must all match, e.g. "Availability (all that apply)". */
function groupTitle(facet) {
    return facet.combine === 'all'
        ? `${facet.title} (all that apply)`
        : facet.title;
}
/** The source's facets that aren't collection-browser's own, as its groups. */
function extraFacetGroupsOf(facets = []) {
    return facets
        .filter(facet => !Object.prototype.hasOwnProperty.call(facetTitles, facet.key))
        .map(facet => ({
        key: facet.key,
        title: groupTitle(facet),
        pluralTitle: facet.pluralTitle,
        sort: facet.sort,
        after: facet.after,
    }));
}
/** collection-browser's page size, used when a request gives no `rows`. */
const DEFAULT_ROWS = 50;
/**
 * A SearchServiceInterface over a SearchSource, so collection-browser can
 * browse a search that does not go through the page production service.
 *
 * collection-browser sends a search's hits and aggregations as separate
 * requests, and pages by number; this keeps one query per search for all of
 * them and pages over the source's forward-only cursor.
 *
 * Results come back in the source's own order, so `params.sort` is ignored.
 * If the source's hits link off archive.org, the collection-browser using
 * this should set `baseNavigationUrl` to ''.
 */
export class ServerlessSearchService {
    constructor(source, options = {}) {
        this.source = source;
        this.cache = new Map();
        this.resultsListeners = new Set();
        this.cacheSize = Math.max(1, options.cachedQueries ?? 3);
        this.extraFacetGroups = extraFacetGroupsOf(source.facets);
        this.allowFilterOnlySearch = !!source.listsWithoutQuery;
    }
    async search(params, 
    // A serverless source has a single search type.
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _searchType) {
        const startTime = Date.now();
        try {
            await this.source.ready;
            const request = this.source.toRequest(params);
            if (request === undefined) {
                return { success: sourceSearchResponse({ hits: [], total: 0 }) };
            }
            const cached = this.cachedQuery(request);
            const { signal } = cached.controller;
            const pager = await cached.pager;
            const rows = params.rows ?? DEFAULT_ROWS;
            const page = params.page ?? 1;
            const records = rows > 0
                ? await pager.slice((page - 1) * rows, page * rows, { signal })
                : [];
            const keys = this.requestedAggregations(params);
            const aggregations = keys.length
                ? await (await cached.query).aggregations(keys, params.aggregationsSize, { signal })
                : undefined;
            return {
                success: sourceSearchResponse({
                    hits: records.map(record => this.source.toHit(record)),
                    total: pager.result.total,
                    aggregations,
                    queryTimeMs: Date.now() - startTime,
                }),
            };
        }
        catch (err) {
            return { error: toSearchServiceError(err) };
        }
    }
    onResultsChanged(listener) {
        this.resultsListeners.add(listener);
        return () => this.resultsListeners.delete(listener);
    }
    async itemDetails(identifier) {
        try {
            await this.source.ready;
            const record = await this.source.record(identifier);
            if (record === undefined) {
                return {
                    error: new SearchServiceError(SearchServiceErrorType.itemNotFound, `No record for ${identifier}`),
                };
            }
            return {
                success: sourceSearchResponse({
                    hits: [this.source.toHit(record)],
                    total: 1,
                }),
            };
        }
        catch (err) {
            return { error: toSearchServiceError(err) };
        }
    }
    /**
     * Which of the source's aggregations a request wants. Hits requests send
     * `omit`; a facet's "more" dialog names its facet in `simpleParams`;
     * anything else is the default facets request, which gets them all.
     */
    requestedAggregations(params) {
        const { aggregations } = params;
        if (aggregations?.omit)
            return [];
        const named = [
            ...(aggregations?.simpleParams ?? []),
            ...(aggregations?.advancedParams ?? []).map(param => param.field),
        ];
        if (!named.length)
            return [...this.source.aggregationKeys];
        return this.source.aggregationKeys.filter(key => named.includes(key));
    }
    /**
     * The query for a request, shared by every request for the same search.
     */
    cachedQuery(request) {
        const key = this.source.requestKey(request);
        const existing = this.cache.get(key);
        if (existing) {
            // Re-insert so the Map's order stays least-recently-used first.
            this.cache.delete(key);
            this.cache.set(key, existing);
            return existing;
        }
        const controller = new AbortController();
        const query = this.source.query(request, { signal: controller.signal });
        const entry = {
            query,
            pager: query.then(q => new SourcePager(q)),
            controller,
        };
        // A failed query is not worth keeping: let the next request try again.
        query.catch(() => {
            if (this.cache.get(key) === entry)
                this.cache.delete(key);
        });
        query.then(first => this.serveRefinements(key, entry, first), () => { });
        this.cache.set(key, entry);
        this.evictOldest();
        return entry;
    }
    /**
     * Serves each better answer to a request in place of the last, with a
     * fresh pager, and tells listeners when it's the latest search's. One for
     * a search that has since been dropped from the cache is ignored.
     */
    serveRefinements(key, entry, query) {
        query.refined?.then(next => {
            if (!next || this.cache.get(key) !== entry)
                return;
            entry.query = Promise.resolve(next);
            entry.pager = Promise.resolve(new SourcePager(next));
            this.serveRefinements(key, entry, next);
            // A Map keeps insertion order, and each use re-inserts: last is latest.
            if ([...this.cache.keys()].pop() === key) {
                for (const listener of this.resultsListeners)
                    listener();
            }
        }, 
        // The first answer stays: refining improves results, it doesn't gate them.
        () => { });
    }
    evictOldest() {
        while (this.cache.size > this.cacheSize) {
            const [oldestKey, oldest] = this.cache.entries().next().value;
            this.cache.delete(oldestKey);
            oldest.controller.abort();
        }
    }
}
function toSearchServiceError(err) {
    if (err instanceof SearchServiceError)
        return err;
    const message = err instanceof Error ? err.message : String(err);
    // A server answering 5xx (after any retries) failed the same way as one
    // not answering: try again later. A 4xx or anything else is the search's.
    const status = err?.status;
    const isNetwork = err instanceof TypeError ||
        (err instanceof DOMException && err.name === 'AbortError') ||
        (typeof status === 'number' && status >= 500);
    return new SearchServiceError(isNetwork
        ? SearchServiceErrorType.networkError
        : SearchServiceErrorType.searchEngineError, message, err);
}
