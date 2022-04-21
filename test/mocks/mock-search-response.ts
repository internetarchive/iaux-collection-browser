import { Metadata, SearchResponse } from '@internetarchive/search-service';
import { SearchServiceError } from '@internetarchive/search-service/dist/src/search-service-error';
import { Result } from '@internetarchive/result-type';

export const mockSearchResponse: Result<SearchResponse, SearchServiceError> = {
  success: {
    responseHeader: {
      status: 0,
      QTime: 0,
      params: {
        query: '',
        qin: '',
        fields: '',
        start: 0,
        wt: '',
      },
    },
    rawResponse: {},
    response: {
      numFound: 3,
      start: 0,
      docs: [
        new Metadata({
          identifier: 'foo-collection',
          title: 'Foo Collection',
        }),
        new Metadata({
          identifier: 'bar-collection',
          title: 'Bar Collection',
        }),
        new Metadata({
          identifier: 'baz-collection',
          title: 'Baz Collection',
        }),
      ],
    },
  },
};

export const mockSearchResponseOnlyFoo: Result<
  SearchResponse,
  SearchServiceError
> = {
  success: {
    responseHeader: {
      status: 0,
      QTime: 0,
      params: {
        query: '',
        qin: '',
        fields: '',
        start: 0,
        wt: '',
      },
    },
    rawResponse: {},
    response: {
      numFound: 3,
      start: 0,
      docs: [
        new Metadata({
          identifier: 'foo-collection',
          title: 'Foo Collection',
        }),
      ],
    },
  },
};
