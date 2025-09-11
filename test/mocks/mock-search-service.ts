import type { Result } from '@internetarchive/result-type';
import type {
  SearchParams,
  SearchResponse,
  SearchServiceInterface,
  SearchServiceError,
  SearchType,
} from '@internetarchive/search-service';
import {
  getMockSuccessSingleResult,
  getMockSuccessMultipleResults,
  getMockSuccessSingleResultWithSort,
  getMockSuccessLoggedInResult,
  getMockSuccessNoPreviewResult,
  getMockSuccessLoggedInAndNoPreviewResult,
  getMockSuccessWithYearHistogramAggs,
  getMockSuccessWithDateHistogramAggs,
  getMockSuccessMultiLineDescription,
  getMockSuccessFirstTitleResult,
  getMockSuccessFirstCreatorResult,
  getMockErrorResult,
  getMockMalformedResult,
  getMockSuccessWithCollectionTitles,
  getMockSuccessWithChannelAliases,
  getMockSuccessWithCollectionAggregations,
  getMockSuccessExtraQuotedHref,
  getMockSuccessWithDefaultSort,
  getMockSuccessWithConciseDefaultSort,
  getMockSuccessWithDefaultFavSort,
  getMockSuccessWithParentCollections,
  getMockSuccessForTvCollection,
  getMockSuccessManyFields,
  getMockSuccessNoResults,
  getMockSuccessWithWebArchiveHits,
  getMockSuccessWithManyAggregations,
  getMockSuccessTvFields,
  getMockSuccessArchiveOrgUserResult,
  getMockSuccessArchiveOrgUserNoBlurResult,
} from './mock-search-responses';

const responses: Record<
  string,
  () => Result<SearchResponse, SearchServiceError>
> = {
  'single-result': getMockSuccessSingleResult,
  years: getMockSuccessWithYearHistogramAggs,
  months: getMockSuccessWithDateHistogramAggs,
  'multi-line-description': getMockSuccessMultiLineDescription,
  loggedin: getMockSuccessLoggedInResult,
  'no-preview': getMockSuccessNoPreviewResult,
  'loggedin-no-preview': getMockSuccessLoggedInAndNoPreviewResult,
  'archive-org-user-loggedin': getMockSuccessArchiveOrgUserResult,
  'archive-org-user-loggedin-noblur': getMockSuccessArchiveOrgUserNoBlurResult,
  'first-title': getMockSuccessFirstTitleResult,
  'first-creator': getMockSuccessFirstCreatorResult,
  'collection-titles': getMockSuccessWithCollectionTitles,
  'channel-aliases': getMockSuccessWithChannelAliases,
  'collection-aggregations': getMockSuccessWithCollectionAggregations,
  'extra-quoted-href': getMockSuccessExtraQuotedHref,
  'default-sort': getMockSuccessWithDefaultSort,
  'default-sort-concise': getMockSuccessWithConciseDefaultSort,
  'fav-sort': getMockSuccessWithDefaultFavSort,
  'parent-collections': getMockSuccessWithParentCollections,
  'tv-collection': getMockSuccessForTvCollection,
  'web-archive': getMockSuccessWithWebArchiveHits,
  'more-facets': getMockSuccessWithManyAggregations,
  'many-fields': getMockSuccessManyFields,
  'tv-fields': getMockSuccessTvFields,
  'no-results': getMockSuccessNoResults,
  error: getMockErrorResult,
  malformed: getMockMalformedResult,
};

export class MockSearchService implements SearchServiceInterface {
  searchParams?: SearchParams;

  searchType?: SearchType;

  asyncResponse: boolean;

  asyncResponseDelay: number;

  resultsSpy: Function;

  constructor({
    asyncResponse = false,
    asyncResponseDelay = 0,
    resultsSpy = () => {},
  } = {}) {
    this.asyncResponse = asyncResponse;
    this.asyncResponseDelay = asyncResponseDelay;
    this.resultsSpy = resultsSpy;
  }

  async search(
    params: SearchParams,
    searchType: SearchType,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    this.searchParams = params;
    this.searchType = searchType;

    if (this.asyncResponse) {
      // Add an artificial 1-tick delay
      await new Promise(res => {
        setTimeout(res, this.asyncResponseDelay);
      });
    }

    const responseKey =
      (this.searchParams.query || this.searchParams.pageTarget) ?? '';
    const resultFn: () => Result<SearchResponse, SearchServiceError> =
      responses[responseKey] ?? getMockSuccessMultipleResults;
    let result = resultFn();

    // with-sort query has special handling
    if (this.searchParams.query === 'with-sort') {
      result = getMockSuccessSingleResultWithSort(this.resultsSpy);
    }

    // Apply any uid param from the request
    if (result.success) {
      (result.success.request.clientParameters as any).uid = params.uid;
    }

    return result;
  }

  async itemDetails(
    _: string,
  ): Promise<Result<SearchResponse, SearchServiceError>> {
    // We don't currently use the itemDetails method in collection-browser
    return {};
  }
}
