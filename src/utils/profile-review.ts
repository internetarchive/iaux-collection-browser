import { SearchReview, SearchResult } from '@internetarchive/search-service';

/**
 * Finds the profile owner's review in a hit. The search backend sends it either
 * as a single `review` object or as `fields.reviews_data`, a list of JSON strings
 * holding every review of the item that the profile page cares about (the profile
 * owner's, plus others such as a bot account's). Only the profile owner's review
 * belongs on their profile tile.
 *
 * @param result The search hit
 * @param profile The profile being viewed, with or without a leading `@`
 */
export function findProfileReview(
  result: SearchResult,
  profile?: string,
): SearchReview | undefined {
  if (result.review) return result.review;

  const reviewsData: unknown = result.rawMetadata?.fields?.reviews_data;
  if (!profile || !Array.isArray(reviewsData)) return undefined;

  const profileName = profile.replace(/^@/, '').toLowerCase();
  for (const entry of reviewsData) {
    let parsed: Record<string, string> | undefined;
    try {
      parsed = typeof entry === 'string' ? JSON.parse(entry) : entry;
    } catch {
      continue;
    }
    const names = [parsed?.reviewer_itemname, parsed?.reviewer];
    if (names.some(n => n?.replace(/^@/, '').toLowerCase() === profileName)) {
      return new SearchReview(parsed as any);
    }
  }
  return undefined;
}
