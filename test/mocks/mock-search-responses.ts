import type { Result } from '@internetarchive/result-type';
import {
  Metadata,
  SearchResponse,
  SearchServiceError,
} from '@internetarchive/search-service';

export const mockSuccessSingleResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    rawResponse: {},
    response: {
      numFound: 1,
      docs: [
        new Metadata({
          identifier: 'foo',
          collections_raw: ['foo', 'bar'],
        }),
      ],
      start: 0,
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

export const mockSuccessMultipleResults: Result<
  SearchResponse,
  SearchServiceError
> = {
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
