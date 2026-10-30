import { ServerlessSearchService } from '../serverless-search/serverless-search-service';
import { EtdSearchSource } from './etd-search-source';
/**
 * A SearchServiceInterface over the ETD static-index search engine, so
 * collection-browser can browse the theses & dissertations index.
 *
 * Hits link off archive.org to each thesis's landing page, so the
 * collection-browser using this should set `baseNavigationUrl` to ''.
 * Results are always in relevance order: the engine has no other sort.
 */
export class EtdSearchService extends ServerlessSearchService {
    constructor(options) {
        super(new EtdSearchSource(options.engine, options.kind), options);
    }
}
