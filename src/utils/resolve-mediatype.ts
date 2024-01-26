import type { MediaType } from '@internetarchive/field-parsers';
import type { SearchResult } from '@internetarchive/search-service';

/**
 * Returns the mediatype string for the given search result, taking into account
 * the special `favorited_search` hit type.
 * @param result The search result to extract a mediatype from
 */
export function resolveMediatype(result: SearchResult): MediaType {
  /**
   * hit_type == 'favorited_search' is basically a new hit_type
   * - we are getting from PPS.
   * - which gives response for fav- collection
   * - having favorited items like account/collection/item etc..
   * - as user can also favorite a search result (a search page)
   * - so we need to have response (having fav- items and fav- search results)
   *
   * if backend hit_type == 'favorited_search'
   * - let's assume a "search" as new mediatype
   */
  if (result?.rawMetadata?.hit_type === 'favorited_search') {
    return 'search';
  }

  return result.mediatype?.value ?? 'data';
}
