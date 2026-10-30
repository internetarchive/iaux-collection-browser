import type { SearchParams } from '@internetarchive/search-service';
import type {
  SearchSource,
  SourceCallOptions,
  SourceFacet,
  SourceQuery,
} from '../serverless-search/search-source';
import { log } from '../utils/log';
import type { EtdEngine, EtdQuery, EtdRecord } from './etd-engine';
import {
  etdRequestFromParams,
  etdRequestIsEmpty,
  etdRequestKey,
} from './etd-query';
import type { EtdRequest } from './etd-query';
import {
  ETD_IDENTIFIER_PREFIX,
  ETD_VECTOR_IDENTIFIER_PREFIX,
  etdAggregationKeys,
  etdAggregationsJson,
  etdDocIdFromIdentifier,
  etdHitJson,
} from './etd-response';
import { ETD_FACETS } from './etd-facets';
import type { EtdFacet } from './etd-facets';
import { ETD_VECTOR_FACETS } from './etd-vector-facets';

/** Which ETD search a source is: its facets, ids and whether it can list. */
export interface EtdSearchKind {
  facets: readonly EtdFacet[];
  /** Prefixed to a record's docId to make its identifier. */
  identifierPrefix: string;
  /** Whether the engine lists matches for filters with no words. */
  listsWithoutQuery: boolean;
}

/** Text search over the ETD index (the live page's "Text rank"). */
export const ETD_TEXT_SEARCH: EtdSearchKind = {
  facets: ETD_FACETS,
  identifierPrefix: ETD_IDENTIFIER_PREFIX,
  listsWithoutQuery: true,
};

/** Search by meaning over the vector store (the live page's "Vector rank"). */
export const ETD_VECTOR_SEARCH: EtdSearchKind = {
  facets: ETD_VECTOR_FACETS,
  identifierPrefix: ETD_VECTOR_IDENTIFIER_PREFIX,
  listsWithoutQuery: false,
};

/**
 * The ETD theses & dissertations index as a serverless search source.
 */
export class EtdSearchSource implements SearchSource<EtdRequest, EtdRecord> {
  readonly aggregationKeys: readonly string[];

  readonly facets: readonly SourceFacet[];

  readonly listsWithoutQuery: boolean;

  constructor(
    private readonly engine: EtdEngine,
    private readonly kind: EtdSearchKind = ETD_TEXT_SEARCH,
  ) {
    this.aggregationKeys = etdAggregationKeys(kind.facets);
    this.facets = kind.facets.map(
      ({ key, title, pluralTitle, after, combine }) => ({
        key,
        title,
        pluralTitle,
        after,
        combine,
      }),
    );
    this.listsWithoutQuery = kind.listsWithoutQuery;
  }

  get ready(): Promise<void> {
    return this.engine.ready;
  }

  toRequest(params: SearchParams): EtdRequest | undefined {
    const request = etdRequestFromParams(params, this.kind.facets);
    if (request.ignoredFields.length) {
      log('EtdSearchSource: ignoring filters on', request.ignoredFields);
    }
    return etdRequestIsEmpty(request) ? undefined : request;
  }

  requestKey(request: EtdRequest): string {
    return etdRequestKey(request);
  }

  async query(
    request: EtdRequest,
    options?: SourceCallOptions,
  ): Promise<SourceQuery<EtdRecord>> {
    return this.sourceQuery(
      await this.engine.query(request.text, request.filters, options),
    );
  }

  /** An engine query as a source query, and its refinements likewise. */
  private sourceQuery(query: EtdQuery): SourceQuery<EtdRecord> {
    return {
      result: query.result,
      next: (count, nextOptions) => query.next(count, nextOptions),
      aggregations: async (keys, size, aggOptions) =>
        etdAggregationsJson(
          await query.facets(aggOptions),
          keys,
          size,
          this.kind.facets,
        ),
      refined: query.refined?.then(next => next && this.sourceQuery(next)),
    };
  }

  async record(
    identifier: string,
    options?: SourceCallOptions,
  ): Promise<EtdRecord | undefined> {
    const docId = etdDocIdFromIdentifier(
      identifier,
      this.kind.identifierPrefix,
    );
    return docId === undefined ? undefined : this.engine.record(docId, options);
  }

  toHit(record: EtdRecord): Record<string, unknown> {
    return etdHitJson(record, this.kind.identifierPrefix);
  }
}
