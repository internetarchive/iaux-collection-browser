import type { EtdCallOptions } from '../etd-engine';
import { tokenize } from './codec';
import type { EtdPosfwd } from './posfwd';
import { phraseInDoc } from './posfwd';
import type { PosfwdText } from './posfwd';

/**
 * The phrase boost: for an unquoted query of a few words, docs holding the
 * words side by side, as typed, move to the top of the ranking.
 *
 * Ported from etd-search/search.html (phraseBoost, page build p112).
 */

/** How many top-ranked docs the boost re-orders. */
export const BOOST_HEAD = 200;

/** How long the boost may wait on posfwd before the plain order stands. */
export const BOOST_BUDGET_MS = 15000;

/**
 * The query's tokens when the boost applies to it, else undefined: plain
 * text of 2-6 words, with no field filters, quotes, field syntax, grouping
 * or boolean operators.
 */
export function boostTokens(
  query: string,
  hasFieldFilters: boolean,
): string[] | undefined {
  if (hasFieldFilters || /["():]|\b(AND|OR|NOT)\b/.test(query)) {
    return undefined;
  }
  const tokens = tokenize(query);
  return tokens.length >= 2 && tokens.length <= 6 ? tokens : undefined;
}

/** Where a doc holds the query's words side by side, as the boost judges it. */
export type WordsPlacement =
  | 'title'
  | 'creators'
  | 'abstract'
  | 'institution'
  | 'orcid'
  | 'apart';

const PLACEMENT_FIELDS: [prefix: string, placement: WordsPlacement][] = [
  ['t:', 'title'],
  ['c:', 'creators'],
  ['a:', 'abstract'],
  ['i:', 'institution'],
  ['o:', 'orcid'],
];

/**
 * The first field (title first) holding `tokens` side by side; 'apart' when
 * none does; undefined when the doc's text is unknown (not read, or none).
 */
export function wordsPlacement(
  text: PosfwdText | null | undefined,
  tokens: readonly string[],
): WordsPlacement | undefined {
  if (!text) return undefined;
  const found = PLACEMENT_FIELDS.find(([prefix]) =>
    phraseInDoc(text, tokens, prefix),
  );
  return found ? found[1] : 'apart';
}

export interface PhraseBoostOptions extends EtdCallOptions {
  budgetMs?: number;
}

/**
 * Re-orders the first BOOST_HEAD docs of `ranked` into three groups, each
 * keeping its rank order: the words adjacent in the title, then adjacent in
 * any other field, then the rest (including docs whose text isn't read in
 * time). Docs past the head keep their place.
 */
export async function phraseBoost(
  ranked: readonly number[],
  tokens: readonly string[],
  posfwd: Pick<EtdPosfwd, 'read' | 'get'>,
  options: PhraseBoostOptions = {},
): Promise<number[]> {
  const head = ranked.slice(0, BOOST_HEAD);
  let timer: ReturnType<typeof setTimeout> | undefined;
  const budget = new Promise<void>(resolve => {
    timer = setTimeout(resolve, options.budgetMs ?? BOOST_BUDGET_MS);
  });
  try {
    await Promise.race([
      posfwd.read(head, options).catch(err => {
        if (options.signal?.aborted) throw err;
        // Unreadable posfwd only costs the boost, not the search.
      }),
      budget,
    ]);
  } finally {
    clearTimeout(timer);
  }

  const group = (docId: number) => {
    const placement = wordsPlacement(posfwd.get(docId), tokens);
    if (placement === 'title') return 2;
    return placement && placement !== 'apart' ? 1 : 0;
  };
  const grouped = head.map((docId, rank) => ({ docId, rank, g: group(docId) }));
  if (!grouped.some(doc => doc.g)) return [...ranked];

  grouped.sort((a, b) => b.g - a.g || a.rank - b.rank);
  return [...grouped.map(doc => doc.docId), ...ranked.slice(BOOST_HEAD)];
}
