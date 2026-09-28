/**
 * Reduces text to a form suitable for loose "contains" matching: lowercased,
 * with accents and punctuation removed and runs of whitespace collapsed.
 * Apply it to both the filter term and the values being filtered, so that
 * e.g. `aor` matches `A.O.R.`, `dr drew` matches `Dr. Drew`, and `cafe`
 * matches `Café`.
 */
export function normalizeFilterText(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase()
    .replace(/\p{P}/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}
