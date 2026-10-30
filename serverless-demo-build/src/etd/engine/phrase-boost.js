import { tokenize } from './codec';
import { phraseInDoc } from './posfwd';
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
export function boostTokens(query, hasFieldFilters) {
    if (hasFieldFilters || /["():]|\b(AND|OR|NOT)\b/.test(query)) {
        return undefined;
    }
    const tokens = tokenize(query);
    return tokens.length >= 2 && tokens.length <= 6 ? tokens : undefined;
}
const PLACEMENT_FIELDS = [
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
export function wordsPlacement(text, tokens) {
    if (!text)
        return undefined;
    const found = PLACEMENT_FIELDS.find(([prefix]) => phraseInDoc(text, tokens, prefix));
    return found ? found[1] : 'apart';
}
/**
 * Re-orders the first BOOST_HEAD docs of `ranked` into three groups, each
 * keeping its rank order: the words adjacent in the title, then adjacent in
 * any other field, then the rest (including docs whose text isn't read in
 * time). Docs past the head keep their place.
 */
export async function phraseBoost(ranked, tokens, posfwd, options = {}) {
    const head = ranked.slice(0, BOOST_HEAD);
    let timer;
    const budget = new Promise(resolve => {
        timer = setTimeout(resolve, options.budgetMs ?? BOOST_BUDGET_MS);
    });
    try {
        await Promise.race([
            posfwd.read(head, options).catch(err => {
                if (options.signal?.aborted)
                    throw err;
                // Unreadable posfwd only costs the boost, not the search.
            }),
            budget,
        ]);
    }
    finally {
        clearTimeout(timer);
    }
    const group = (docId) => {
        const placement = wordsPlacement(posfwd.get(docId), tokens);
        if (placement === 'title')
            return 2;
        return placement && placement !== 'apart' ? 1 : 0;
    };
    const grouped = head.map((docId, rank) => ({ docId, rank, g: group(docId) }));
    if (!grouped.some(doc => doc.g))
        return [...ranked];
    grouped.sort((a, b) => b.g - a.g || a.rank - b.rank);
    return [...grouped.map(doc => doc.docId), ...ranked.slice(BOOST_HEAD)];
}
