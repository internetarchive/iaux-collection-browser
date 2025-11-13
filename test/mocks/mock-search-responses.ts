// eslint-disable @typescript-eslint/no-unsafe-function-type
import type { Result } from '@internetarchive/result-type';
import {
  Aggregation,
  ItemHit,
  SearchResponse,
  SearchServiceError,
  TextHit,
} from '@internetarchive/search-service';
import { TvClipHit } from '@internetarchive/search-service/dist/src/models/hit-types/tv-clip-hit';
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
            num_clips: 34,
            source: 'foo bar',
            subject: ['baz', 'quux'],
            title: 'Foo Bar',
            volume: 2,
            week: 50,
            __href__: 'https://archive.org/details/foo',
            __img__: '//services/img/foo',
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

export const getMockSuccessTvFields: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'tv-fields',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'tv-fields',
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
        new TvClipHit({
          fields: {
            identifier: 'foo',
            ad_id: ['foo-ad'],
            clip: true,
            collection: ['foo', 'bar', 'tvnews'],
            creator: ['baz', 'boop'],
            date: '2010-01-03T01:23:45Z',
            addeddate: '2010-01-01T01:23:45Z',
            publicdate: '2010-01-02T01:23:45Z',
            reviewdate: '2010-01-04T01:23:45Z',
            description: 'foo bar baz',
            downloads: 246,
            factcheck: ['https://foo.bar'],
            files_count: 75,
            indexflag: ['index', 'nonoindex'],
            item_size: 123456,
            language: 'eng',
            mediatype: 'movies',
            num_favorites: 12,
            nclips: 34,
            source: 'foo bar',
            start: '1234',
            subject: ['baz', 'quux'],
            title: 'Foo Bar',
            week: 50,
            year: 2010,
            __href__: 'https://archive.org/details/foo',
            __img__: '//services/img/foo',
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

export const getMockSuccessWithDateHistogramAggs: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'months',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'months',
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
        date_histogram: new Aggregation({
          buckets: [1, 2, 3, 3, 2, 1],
          first_bucket_year: 2000,
          first_bucket_month: 1,
          last_bucket_year: 2002,
          last_bucket_month: 7,
          interval_in_months: 6,
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

export const getMockSuccessArchiveOrgUserResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'archive-org-user-loggedin',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'archive-org-user-loggedin',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {
      is_archive_user: true,
      pps_relevant_user_preferences: {
        display__blur_moderated_content: 'on',
      },
    },
    response: {
      totalResults: 2,
      returnedCount: 2,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['foo', 'loggedin', 'bar'],
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

export const getMockSuccessArchiveOrgUserNoBlurResult: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'archive-org-user-loggedin-noblur',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'archive-org-user-loggedin-noblur',
            sort: [],
          },
        },
      },
    },
    rawResponse: {},
    sessionContext: {
      is_archive_user: true,
      pps_relevant_user_preferences: {
        display__blur_moderated_content: 'off',
      },
    },
    response: {
      totalResults: 1,
      returnedCount: 1,
      results: [
        new ItemHit({
          fields: {
            identifier: 'foo',
            collection: ['loggedin'],
            title: 'foo',
            mediatype: 'texts',
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

export const getMockSuccessWithChannelAliases: () => Result<
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
        new TvClipHit({
          fields: {
            identifier: 'foo',
            creator: ['foo', 'bar'],
          },
        }),
      ],
      tvChannelAliases: {
        foo: 'Foo Network',
        bar: 'Bar Network',
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
  resultsSpy: Function,
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
        search: {
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
        search: {
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

export const getMockSuccessForTvCollection: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'hits',
      clientParameters: {
        user_query: 'tv-collection',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'hits',
          finalized_parameters: {
            user_query: 'tv-collection',
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
          identifier: 'TV-FOO',
          collection: ['tvarchive'],
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

export const getMockSuccessWithManyAggregations: () => Result<
  SearchResponse,
  SearchServiceError
> = () => ({
  success: {
    request: {
      kind: 'aggregations',
      clientParameters: {
        user_query: 'more-facets',
        sort: [],
      },
      backendRequests: {
        primary: {
          kind: 'aggregations',
          finalized_parameters: {
            user_query: 'more-facets',
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
        year: new Aggregation({
          buckets: [
            { key: '1980', doc_count: 5 },
            { key: '1981', doc_count: 6 },
            { key: '1982', doc_count: 7 },
            { key: '1983', doc_count: 8 },
            { key: '1984', doc_count: 5 },
            { key: '1985', doc_count: 6 },
            { key: '1986', doc_count: 7 },
            { key: '1987', doc_count: 8 },
            { key: '1988', doc_count: 5 },
            { key: '1989', doc_count: 6 },
            { key: '1990', doc_count: 7 },
            { key: '1991', doc_count: 8 },
            { key: '1992', doc_count: 5 },
            { key: '1993', doc_count: 6 },
            { key: '1994', doc_count: 7 },
            { key: '1995', doc_count: 8 },
            { key: '1996', doc_count: 5 },
            { key: '1997', doc_count: 6 },
            { key: '1998', doc_count: 7 },
            { key: '1999', doc_count: 8 },
            { key: '2000', doc_count: 5 },
            { key: '2001', doc_count: 6 },
            { key: '2002', doc_count: 7 },
            { key: '2003', doc_count: 8 },
            { key: '2004', doc_count: 5 },
            { key: '2005', doc_count: 6 },
            { key: '2006', doc_count: 7 },
            { key: '2007', doc_count: 8 },
            { key: '2008', doc_count: 5 },
            { key: '2009', doc_count: 6 },
            { key: '2010', doc_count: 7 },
            { key: '2011', doc_count: 8 },
            { key: '2012', doc_count: 5 },
            { key: '2013', doc_count: 6 },
            { key: '2014', doc_count: 7 },
            { key: '2015', doc_count: 8 },
            { key: '2016', doc_count: 5 },
            { key: '2017', doc_count: 6 },
            { key: '2018', doc_count: 7 },
            { key: '2019', doc_count: 8 },
            { key: '2020', doc_count: 5 },
            { key: '2021', doc_count: 6 },
            { key: '2022', doc_count: 7 },
            { key: '2023', doc_count: 8 },
            { key: '2024', doc_count: 5 },
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
