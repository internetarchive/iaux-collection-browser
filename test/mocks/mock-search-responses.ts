import type { Result } from '@internetarchive/result-type';
import {
  Aggregation,
  ItemHit,
  SearchResponse,
  SearchServiceError,
  TextHit,
} from '@internetarchive/search-service';
import { SearchServiceErrorType } from '@internetarchive/search-service/dist/src/search-service-error';

export const getMockSuccessSingleResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'collection:foo',
            sort: [],
          },
        },
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
});

export const getMockSuccessWithYearHistogramAggs: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'years',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'years',
            sort: [],
          },
        },
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
});

export const getMockSuccessLoggedInResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'loggedin',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'loggedin',
            sort: [],
          },
        },
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
});

export const getMockSuccessNoPreviewResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'no-preview',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'no-preview',
            sort: [],
          },
        },
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
});

export const getMockSuccessLoggedInAndNoPreviewResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'loggedin-no-preview',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'loggedin-no-preview',
            sort: [],
          },
        },
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
});

export const getMockSuccessFirstTitleResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'first-title',
        sort: ['title', 'asc'],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'first-title',
            sort: ['title', 'asc'],
          },
        },
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
});

export const getMockSuccessFirstCreatorResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'first-creator',
        sort: ['creator', 'asc'],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'first-creator',
            sort: ['creator', 'asc'],
          },
        },
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
});

export const getMockSuccessWithCollectionTitles: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'collection:foo',
            sort: [],
          },
        },
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
      collectionTitles: {
        foo: 'Foo Collection',
        bar: 'Bar Collection',
        baz: 'Baz Collection',
        boop: 'Boop Collection',
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessWithCollectionAggregations: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'collection:foo',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    response: {
      totalResults: 0,
      returnedCount: 0,
      results: [],
      aggregations: {
        collection: new Aggregation({
          buckets: [
            {
              key: 'foo',
              doc_count: 10,
            },
            {
              key: 'bar',
              doc_count: 10,
            },
          ],
        }),
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessSingleResultWithSort: (
  resultsSpy: Function
) => Result<SearchResponse, SearchServiceError> = (resultsSpy: Function) => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'with-sort',
        sort: ['foo:asc'],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'with-sort',
            sort: ['foo:asc'],
          },
        },
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

export const getMockSuccessMultipleResults: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'collection:foo',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'collection:foo',
            sort: [],
          },
        },
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
});

export const getMockSuccessMultiLineDescription: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'multi-line-description',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'multi-line-description',
            sort: [],
          },
        },
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
});

export const getMockSuccessExtraQuotedHref: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'extra-quoted-href',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'extra-quoted-href',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new TextHit({
          fields: {
            identifier: 'foo',
            title: 'Foo',
            __href__: '/details/foo?q=%22%22quoted+query%22%22',
          },
        }),
      ],
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessWithDefaultSort: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'default-sort',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'default-sort',
            sort: ['titleSorter', 'identifier'],
          },
        },
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
            title: 'Foo',
          },
        }),
      ],
      collectionExtraInfo: {
        public_metadata: {
          'sort-by': 'titleSorter',
        },
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessWithConciseDefaultSort: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'default-sort-concise',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'default-sort-concise',
            sort: ['addeddate:desc', 'identifier'],
          },
        },
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
            title: 'Foo',
          },
        }),
      ],
      collectionExtraInfo: {
        public_metadata: {
          'sort-by': '-addeddate',
        },
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockErrorResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  error: new SearchServiceError(SearchServiceErrorType.networkError, 'foo', {
    message: 'bar',
  }),
});

export const getMockMalformedResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({});
