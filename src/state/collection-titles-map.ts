/**
 * A Map extended to serve as a map from collection identifiers to their titles,
 * such that attempting to retrieve a title that is not known will automatically
 * fall back to the identifier itself.
 */
export class CollectionTitlesMap extends Map<string, string> {
  /**
   * Retrieves the collection title from its identifier, falling back to return the
   * identifier itself when the title is not known.
   *
   * @param identifier The collection identifier to look up
   * @returns The collection title for the given identifier if available, or the
   * identifier itself otherwise.
   */
  get(identifier: string): string {
    return super.get(identifier) ?? identifier;
  }
}
