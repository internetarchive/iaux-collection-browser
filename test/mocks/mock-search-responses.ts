import type { Result } from '@internetarchive/result-type';
import {
  Metadata,
  SearchResponse,
  SearchServiceError,
} from '@internetarchive/search-service';

export const mockSuccessResponse: Result<SearchResponse, SearchServiceError> = {
  success: {
    rawResponse: {},
    response: {
      numFound: 2,
      docs: [
        new Metadata({
          identifier: 'foo',
          collections_raw: ['foo', 'bar'],
        }),
        new Metadata({
          identifier: 'bar',
          collections_raw: ['baz', 'boop'],
        }),
      ],
      start: 0,
      aggregations: {
        'user_aggs__terms__field:mediatypeSorter__size:100': {
          buckets: [
            { key: 'audio', doc_count: 121 },
            { key: 'movies', doc_count: 2195 },
            { key: 'texts', doc_count: 1392 },
            { key: 'data', doc_count: 605 },
            { key: 'web', doc_count: 301 },
            { key: 'collection', doc_count: 167 },
          ],
        },
      },
    },
    responseHeader: {
      status: 0,
      QTime: 0,
      params: {
        query: 'collection:foo',
        qin: 'collection:foo',
        fields: 'identifier, collections_raw',
        wt: 'foo',
        start: 0,
      },
    },
  },
};
