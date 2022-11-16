import type { Result } from '@internetarchive/result-type';
import {
  Aggregation,
  ItemHit,
  SearchResponse,
  SearchServiceError,
} from '@internetarchive/search-service';

export const mockSuccessSingleResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'bar'],
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessWithYearHistogramAggs: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'years',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'years',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      aggregations: {
        subject: new Aggregation({
          buckets: [
            {
              key: 'foo',
              doc_count: 3,
            },
          ],
        }),
        year_histogram: new Aggregation({
          buckets: [1, 2, 3, 3, 2, 1],
          first_bucket_key: 1950,
          last_bucket_key: 2000,
          interval: 10,
          number_buckets: 6,
        }),
      },
      results: [],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessLoggedInResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'loggedin',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'loggedin',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'loggedin', 'bar'],
            title: 'foo',
            mediatype: 'data',
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessNoPreviewResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'no-preview',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'no-preview',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'no-preview', 'bar'],
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessLoggedInAndNoPreviewResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'loggedin-no-preview',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'loggedin-no-preview',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'loggedin', 'no-preview', 'bar'],
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessFirstTitleResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'first-title',
        sort: ['title', 'asc'],
      },
      finalizedParameters: {
        user_query: 'first-title',
        sort: ['title', 'asc'],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      aggregations: {
        firstTitle: new Aggregation({
          buckets: [{ key: 'X', doc_count: 1 }],
        }),
      },
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessFirstCreatorResult: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'first-creator',
        sort: ['creator', 'asc'],
      },
      finalizedParameters: {
        user_query: 'first-creator',
        sort: ['creator', 'asc'],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      aggregations: {
        firstCreator: new Aggregation({
          buckets: [{ key: 'X', doc_count: 1 }],
        }),
      },
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const getMockSuccessSingleResultWithSort: (
  resultsSpy: Function
) => Result<SearchResponse, SearchServiceError> = (resultsSpy: Function) => ({
  success: {
    request: {
      clientParameters: {
        user_query: 'with-sort',
        sort: ['foo:asc'],
      },
      finalizedParameters: {
        user_query: 'with-sort',
        sort: ['foo:asc'],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      get results() {
        resultsSpy();
        return [
          new ItemHit({
            fields: {
              identifier: 'foo',
              collection: ['foo', 'bar'],
            },
          }),
        ];
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const mockSuccessMultipleResults: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 2,
      returnedCount: 2,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'bar'],
          },
        }),
        new ItemHit({
          fields: {
            identifier: 'bar',
            collection: ['baz', 'boop'],
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};

export const mockSuccessMultiLineDescription: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    request: {
      clientParameters: {
        user_query: 'multi-line-description',
        sort: [],
      },
      finalizedParameters: {
        user_query: 'multi-line-description',
        sort: [],
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'bar'],
            description: ['line1', 'line2'],
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
};
