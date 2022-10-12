import type { Result } from '@internetarchive/result-type';
import {
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
