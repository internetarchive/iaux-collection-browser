import { log } from '../utils/log';
import { etdRequestFromParams, etdRequestIsEmpty, etdRequestKey, } from './etd-query';
import { ETD_IDENTIFIER_PREFIX, ETD_VECTOR_IDENTIFIER_PREFIX, etdAggregationKeys, etdAggregationsJson, etdDocIdFromIdentifier, etdHitJson, } from './etd-response';
import { ETD_FACETS } from './etd-facets';
import { ETD_VECTOR_FACETS } from './etd-vector-facets';
/** Text search over the ETD index (the live page's "Text rank"). */
export const ETD_TEXT_SEARCH = {
    facets: ETD_FACETS,
    identifierPrefix: ETD_IDENTIFIER_PREFIX,
    listsWithoutQuery: true,
};
/** Search by meaning over the vector store (the live page's "Vector rank"). */
export const ETD_VECTOR_SEARCH = {
    facets: ETD_VECTOR_FACETS,
    identifierPrefix: ETD_VECTOR_IDENTIFIER_PREFIX,
    listsWithoutQuery: false,
};
/**
 * The ETD theses & dissertations index as a serverless search source.
 */
export class EtdSearchSource {
    constructor(engine, kind = ETD_TEXT_SEARCH) {
        this.engine = engine;
        this.kind = kind;
        this.aggregationKeys = etdAggregationKeys(kind.facets);
        this.facets = kind.facets.map(({ key, title, pluralTitle, after, combine }) => ({
            key,
            title,
            pluralTitle,
            after,
            combine,
        }));
        this.listsWithoutQuery = kind.listsWithoutQuery;
    }
    get ready() {
        return this.engine.ready;
    }
    toRequest(params) {
        const request = etdRequestFromParams(params, this.kind.facets);
        if (request.ignoredFields.length) {
            log('EtdSearchSource: ignoring filters on', request.ignoredFields);
        }
        return etdRequestIsEmpty(request) ? undefined : request;
    }
    requestKey(request) {
        return etdRequestKey(request);
    }
    async query(request, options) {
        const query = await this.engine.query(request.text, request.filters, options);
        return {
            result: query.result,
            next: (count, nextOptions) => query.next(count, nextOptions),
            aggregations: async (keys, size, aggOptions) => etdAggregationsJson(await query.facets(aggOptions), keys, size, this.kind.facets),
        };
    }
    async record(identifier, options) {
        const docId = etdDocIdFromIdentifier(identifier, this.kind.identifierPrefix);
        return docId === undefined ? undefined : this.engine.record(docId, options);
    }
    toHit(record) {
        return etdHitJson(record, this.kind.identifierPrefix);
    }
}
