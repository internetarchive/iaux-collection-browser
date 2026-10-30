/**
 * Marks a query's terms in a record's abstract, for the result snippet.
 *
 * The marking follows etd-search/search.html (makeSnippet, page build p110),
 * minus its excerpt window: the whole snippet is kept. Marks are
 * collection-browser's `{{{term}}}` delimiters, which its snippet block
 * renders as <mark> without parsing HTML, so the text isn't escaped here.
 */

/** The index's field prefixes the live page strips from its marked terms. */
const MARKED_PREFIX = /^[tcai]:/;

/**
 * The words to mark for a query's index terms: each once, without its field
 * prefix. ORCID (`o:`) terms keep theirs, so they never match, as on the
 * live page.
 */
export function termsToMark(terms: readonly string[]): string[] {
  return [...new Set(terms.map(term => term.replace(MARKED_PREFIX, '')))];
}

/**
 * Wraps every occurrence of `terms` in `text` in `{{{ }}}`.
 *
 * Like the live page, terms match anywhere, including inside longer words
 * ('ice' in 'service'), case-insensitively; terms shorter than two
 * characters are skipped; and the longest term wins where two overlap, so
 * marks never nest.
 */
export function markTerms(text: string, terms: readonly string[]): string {
  const words = [...new Set(terms.map(t => t.replace(/_/g, ' ').trim()))]
    .filter(word => word.length >= 2)
    .sort((a, b) => b.length - a.length);
  if (!words.length) return text;
  const pattern = new RegExp(`(${words.map(escapeRegExp).join('|')})`, 'gi');
  return text.replace(pattern, '{{{$1}}}');
}

function escapeRegExp(text: string): string {
  return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
