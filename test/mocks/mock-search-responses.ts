import type { Result } from '@internetarchive/result-type';
import {
  Aggregation,
  ItemHit,
  SearchResponse,
  SearchServiceError,
  TextHit,
} from '@internetarchive/search-service';
import { WebArchiveHit } from '@internetarchive/search-service/dist/src/models/hit-types/web-archive-hit';
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
    sessionContext: {},
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

export const getMockSuccessManyFields: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'many-fields',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'many-fields',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            avg_rating: 3.5,
            collection: ['foo', 'bar', 'no-preview', 'loggedin'],
            collection_files_count: 123,
            collection_size: 234,
            creator: ['baz', 'boop'],
            date: '2010-01-03T01:23:45Z',
            addeddate: '2010-01-01T01:23:45Z',
            publicdate: '2010-01-02T01:23:45Z',
            reviewdate: '2010-01-04T01:23:45Z',
            description: 'foo bar baz',
            downloads: 246,
            issue: 1,
            item_count: 20,
            mediatype: 'texts',
            num_favorites: 12,
            num_reviews: 23,
            source: 'foo bar',
            subject: ['baz', 'quux'],
            title: 'Foo Bar',
            volume: 2,
            week: 50,
            __href__: 'https://archive.org/details/foo',
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
      collectionTitles: {
        foo: 'Foo',
        bar: 'Bar',
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
    sessionContext: {},
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
    sessionContext: {},
    response: {
      totalResults: 2,
      returnedCount: 2,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'bar'],
            __href__: '/foo',
          },
        }),
        new ItemHit({
          fields: {
            identifier: 'bar',
            collection: ['baz', 'boop'],
            __href__: '/bar',
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

export const getMockSuccessNoResults: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'no-results',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'no-results',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {},
    response: {
      totalResults: 0,
      returnedCount: 0,
      results: [],
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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
    sessionContext: {},
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

export const getMockSuccessWithDefaultFavSort: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'fav-sort',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'fav-sort',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {},
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
          identifier: 'fav-foo',
        },
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessWithParentCollections: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'parent-collections',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'parent-collections',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {},
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
          collection: ['foo', 'bar'],
        },
      },
    },
    responseHeader: {
      succeeded: true,
      query_time: 0,
    },
  },
});

export const getMockSuccessWithWebArchiveHits: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'web-archive',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'web-archive',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {},
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new WebArchiveHit({
          fields: {
            url: 'https://example.com',
            capture_dates: ['2010-01-02T03:04:05Z'],
            __href__:
              'https://web.archive.org/web/20100102030405/https%3A%2F%2Fexample.com',
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
