/**
 * Returns the input string, but removing one set of quotes from all instances of
 * ""clauses wrapped in two sets of quotes"". This assumes the quotes are already
 * URL-encoded.
 *
 * This should be a temporary measure to address the fact that the __href__ field
 * sometimes acquires extra quotation marks during query rewriting. Once there is a
 * full Lucene parser in place that handles quoted queries correctly, this can likely
 * be removed.
 */
export function collapseRepeatedQuotes(str?: string): string | undefined {
  return str?.replace(/%22%22(?!%22%22)(.+?)%22%22/g, '%22$1%22');
}
