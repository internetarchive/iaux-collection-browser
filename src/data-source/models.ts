import type {
  PageElementName,
  PageType,
} from '@internetarchive/search-service';

/**
 * A Map from collection identifiers to their corresponding collection titles.
 */
export type CollectionTitles = Map<string, string>;

/**
 * A Map from channel names to their corresponding, more human-readable network name.
 */
export type TVChannelAliases = Map<string, string>;

/**
 * The subset of search service params that uniquely specify the type of results
 * that are sought by an instance of collection browser.
 */
export type PageSpecifierParams = {
  /**
   * What high-level type of page is being fetched for (search results, collection, or profile)
   */
  pageType: PageType;
  /**
   * The target identifier for collection or profile pages (e.g., "prelinger", "@brewster", ...)
   */
  pageTarget?: string;
  /**
   * Which specific elements of a profile page to fetch. Corresponds to individual tab data
   * (e.g., "uploads", "reviews", ...)
   */
  pageElements?: PageElementName[];
};

/**
 * List of profile page elements that do not currently allow faceting
 */
export const FACETLESS_PAGE_ELEMENTS: PageElementName[] = [
  'forum_posts',
  'lending',
  'web_archives',
];
