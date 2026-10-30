import { ServerlessSearchService } from '../serverless-search/serverless-search-service';
import type { ServerlessSearchServiceOptions } from '../serverless-search/serverless-search-service';
import type { EtdEngine, EtdRecord } from './etd-engine';
import type { EtdRequest } from './etd-query';
import { EtdSearchSource } from './etd-search-source';
import type { EtdSearchKind } from './etd-search-source';

export interface EtdSearchServiceOptions
  extends ServerlessSearchServiceOptions {
  engine: EtdEngine;
  /** Text search (the default) or search by meaning, with its facets. */
  kind?: EtdSearchKind;
}

/**
 * A SearchServiceInterface over the ETD static-index search engine, so
 * collection-browser can browse the theses & dissertations index.
 *
 * Hits link off archive.org to each thesis's landing page, so the
 * collection-browser using this should set `baseNavigationUrl` to ''.
 * Results are always in relevance order: the engine has no other sort.
 */
export class EtdSearchService extends ServerlessSearchService<
  EtdRequest,
  EtdRecord
> {
  constructor(options: EtdSearchServiceOptions) {
    super(new EtdSearchSource(options.engine, options.kind), options);
  }
}
