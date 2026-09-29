/**
 * The forms of a piece of text that loose "contains" matching compares. See
 * `normalizeFilterText`.
 */
export type NormalizedFilterText = {
  /** With word-joining punctuation turned into spaces */
  spaced: string;

  /** With word-joining punctuation removed */
  joined: string;
};

/** Punctuation that joins words: hyphens and dashes, underscores, slashes */
const WORD_JOINERS = /[\p{Pd}\p{Pc}/]/gu;

/**
 * Reduces text to the forms used for loose "contains" matching: lowercased,
 * with accents and punctuation removed and runs of whitespace collapsed.
 * Apply it to both the filter term and the values being filtered, then
 * compare them with `filterTextIncludes`.
 *
 * Punctuation that joins words goes both ways, since people type those words
 * apart and together: `spaced` turns it into spaces, so `wc tv` matches
 * `WC-TV`, and `joined` removes it, so `wctv` does too. Other punctuation is
 * removed outright, so `aor` matches `A.O.R.` and `dr drew` matches
 * `Dr. Drew`. The two forms only differ for text with word-joining
 * punctuation.
 */
export function normalizeFilterText(text: string): NormalizedFilterText {
  const base = text
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .toLocaleLowerCase();
  return {
    spaced: removePunctuation(base.replace(WORD_JOINERS, ' ')),
    joined: removePunctuation(base.replace(WORD_JOINERS, '')),
  };
}

/**
 * Whether normalized `text` contains the normalized `filter`, in either form
 */
export function filterTextIncludes(
  text: NormalizedFilterText,
  filter: NormalizedFilterText,
): boolean {
  return (
    text.spaced.includes(filter.spaced) || text.joined.includes(filter.joined)
  );
}

function removePunctuation(text: string): string {
  return text.replace(/\p{P}/gu, '').replace(/\s+/g, ' ').trim();
}
