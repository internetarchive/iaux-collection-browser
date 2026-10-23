import type { SearchParams } from '@internetarchive/search-service';
import type {
  SearchSource,
  SourceCallOptions,
  SourceQuery,
} from '../serverless-search/search-source';
import { log } from '../utils/log';
import type { EtdEngine, EtdRecord } from './etd-engine';
import {
  etdRequestFromParams,
  etdRequestIsEmpty,
  etdRequestKey,
} from './etd-query';
import type { EtdRequest } from './etd-query';
import {
  ETD_AGGREGATION_KEYS,
  etdAggregationsJson,
  etdDocIdFromIdentifier,
  etdHitJson,
} from './etd-response';

/**
 * The ETD theses & dissertations index as a serverless search source.
 */
export class EtdSearchSource implements SearchSource<EtdRequest, EtdRecord> {
  readonly aggregationKeys = ETD_AGGREGATION_KEYS;

  constructor(private readonly engine: EtdEngine) {}

  get ready(): Promise<void> {
    return this.engine.ready;
  }

  toRequest(params: SearchParams): EtdRequest | undefined {
    const request = etdRequestFromParams(params);
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
    const query = await this.engine.query(
      request.text,
      request.filters,
      options,
    );
    return {
      result: query.result,
      next: (count, nextOptions) => query.next(count, nextOptions),
      aggregations: async (keys, size, aggOptions) =>
        etdAggregationsJson(await query.facets(aggOptions), keys, size),
    };
  }

  async record(
    identifier: string,
    options?: SourceCallOptions,
  ): Promise<EtdRecord | undefined> {
    const docId = etdDocIdFromIdentifier(identifier);
    return docId === undefined ? undefined : this.engine.record(docId, options);
  }

  toHit(record: EtdRecord): Record<string, unknown> {
    return etdHitJson(record);
  }
}
