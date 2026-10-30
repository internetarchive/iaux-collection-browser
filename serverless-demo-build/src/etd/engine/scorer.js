import { tokenize } from './codec';
/**
 * Ranking over impact-ordered postings: each matching (term, field) adds
 * `impact * idf * fieldWeight`; AND intersects, OR sums, NOT subtracts. Then
 * documents where all query words share one field, or sit close together,
 * are boosted.
 *
 * Ported from etd-search/search.html (page build p110). The constants are
 * the page's query-time tuning and are kept identical so rankings match.
 */
/** Ranked hits kept per query: what paging can reach. */
export const RANK_CAP = 3000;
/** The fields every index build has. o: (orcid) only when the manifest lists it. */
export const BASE_PREFIXES = ['t:', 'c:', 'a:', 'i:'];
/** Query-time field weights, multiplied onto the index-time impacts. */
export const FIELD_WEIGHT = {
    't:': 1.0,
    'c:': 2.2,
    'a:': 1.0,
    'i:': 1.0,
    'o:': 2.2,
};
/** Boost when every query word lands in one field of a document. */
export const SAME_FIELD_BOOST = {
    't:': 1.6,
    'c:': 2.6,
    'a:': 1.25,
    'i:': 1.6,
    'o:': 2.6,
};
/** Proximity strength: m adjacent words multiply by 1 + PROXIMITY * (m - 1). */
export const PROXIMITY = 0.35;
/**
 * The prefixed terms whose postings a query needs.
 */
export function queryTerms(node, prefixes, out = []) {
    if (node === null)
        return out;
    switch (node.op) {
        case 'term':
        case 'phrase':
            for (const token of tokenize(node.text)) {
                for (const prefix of node.prefix ? [node.prefix] : prefixes) {
                    out.push(prefix + token);
                }
            }
            return out;
        case 'all':
            return out;
        default:
            queryTerms(node.left, prefixes, out);
            return queryTerms(node.right, prefixes, out);
    }
}
/**
 * Scores a query tree. `approximate` is set when an AND or NOT had to work
 * from a truncated list, so its result may be missing documents.
 */
export function scoreQuery(tree, context) {
    const state = { approximate: false };
    const [scores] = evaluate(tree, context, state);
    return { scores, approximate: state.approximate };
}
function evaluate(node, context, state) {
    if (node === null)
        return [new Map(), true];
    switch (node.op) {
        case 'term':
        case 'phrase':
            return scoreUnit(node.text, node.op, context, node.prefix);
        case 'all':
            return [new Map(), false];
        case 'not': {
            const [a, aComplete] = evaluate(node.left, context, state);
            const [b, bComplete] = evaluate(node.right, context, state);
            if (!bComplete)
                state.approximate = true;
            for (const docId of [...a.keys()])
                if (b.has(docId))
                    a.delete(docId);
            return [a, aComplete && bComplete];
        }
        case 'and': {
            const [a, aComplete] = evaluate(node.left, context, state);
            const [b, bComplete] = evaluate(node.right, context, state);
            if (!(aComplete && bComplete))
                state.approximate = true;
            const out = new Map();
            for (const [docId, score] of a) {
                const other = b.get(docId);
                if (other !== undefined)
                    out.set(docId, score + other);
            }
            return [out, aComplete && bComplete];
        }
        default: {
            const [a, aComplete] = evaluate(node.left, context, state);
            const [b, bComplete] = evaluate(node.right, context, state);
            for (const [docId, score] of b)
                a.set(docId, (a.get(docId) ?? 0) + score);
            return [a, aComplete && bComplete];
        }
    }
}
function idf(nDocs, docFrequency) {
    return Math.log(1 + (nDocs - docFrequency + 0.5) / (docFrequency + 0.5));
}
/**
 * Scores one term or phrase across its fields.
 */
function scoreUnit(text, kind, context, prefix) {
    const tokens = tokenize(text);
    const prefixes = prefix ? [prefix] : context.prefixes;
    if (kind === 'phrase' && context.posfwd && tokens.length > 1) {
        return phraseCandidates(tokens, prefixes, context);
    }
    // A term is the union of its tokens across fields. On an index without
    // posfwd a phrase degrades to co-presence of its tokens.
    const scores = new Map();
    const tokenSets = [];
    let complete = true;
    for (const token of tokens) {
        let found = false;
        let docFrequency = 0;
        let tokenComplete = true;
        const union = new Set();
        const perField = [];
        for (const px of prefixes) {
            const entry = context.entries.get(px + token);
            const list = context.lists.get(px + token);
            if (!entry || !list || !list.length) {
                if (entry?.docFrequency)
                    tokenComplete = false;
                continue;
            }
            found = true;
            docFrequency += entry.docFrequency;
            if (list.length < entry.docFrequency) {
                tokenComplete = false;
            }
            else {
                for (const posting of list)
                    union.add(posting.docId);
            }
            perField.push([px, list]);
        }
        if (!found) {
            complete = false;
            continue;
        }
        if (!tokenComplete)
            complete = false;
        else if (kind === 'phrase')
            tokenSets.push(union);
        const weight = idf(context.nDocs, docFrequency);
        for (const [px, list] of perField) {
            for (const { docId, impact } of list) {
                scores.set(docId, (scores.get(docId) ?? 0) + impact * weight * FIELD_WEIGHT[px]);
            }
        }
    }
    if (kind === 'phrase' && tokenSets.length) {
        for (const docId of [...scores.keys()]) {
            if (!tokenSets.every(set => set.has(docId)))
                scores.delete(docId);
        }
    }
    return [scores, complete];
}
/**
 * Loose phrase retrieval on a posfwd index: documents holding every
 * reliable token of the phrase, scored from impacts. Exact adjacency is
 * verified later against each document's own text.
 *
 * A token is reliable only if its list is untruncated in every field it
 * appears in; requiring a truncated token would drop real matches that sit
 * past the impact cut.
 */
function phraseCandidates(tokens, prefixes, context) {
    const perToken = tokens.map(token => {
        const docs = new Set();
        const score = new Map();
        let truncated = false;
        let found = false;
        let docFrequency = 0;
        for (const px of prefixes) {
            const entry = context.entries.get(px + token);
            const list = context.lists.get(px + token);
            if (!entry || !list || !list.length) {
                if (entry?.docFrequency)
                    truncated = true;
                continue;
            }
            found = true;
            docFrequency += entry.docFrequency;
            if (list.length < entry.docFrequency)
                truncated = true;
            for (const { docId, impact } of list) {
                docs.add(docId);
                score.set(docId, (score.get(docId) ?? 0) + impact * FIELD_WEIGHT[px]);
            }
        }
        return {
            docs,
            score,
            found,
            reliable: found && !truncated,
            idf: idf(context.nDocs, docFrequency),
        };
    });
    let anchors = perToken.filter(t => t.reliable);
    // Every token truncated: anchor on what there is, best effort.
    if (!anchors.length)
        anchors = perToken.filter(t => t.found);
    if (!anchors.length)
        return [new Map(), true];
    anchors.sort((a, b) => a.docs.size - b.docs.size);
    let candidates = anchors[0].docs;
    for (let i = 1; i < anchors.length && candidates.size; i += 1) {
        const next = new Set();
        for (const docId of candidates)
            if (anchors[i].docs.has(docId))
                next.add(docId);
        candidates = next;
    }
    const scores = new Map();
    for (const docId of candidates) {
        let total = 0;
        for (const token of perToken) {
            const impact = token.score.get(docId);
            if (impact)
                total += impact * token.idf;
        }
        scores.set(docId, total);
    }
    // Exhaustive only when anchored on a reliable token.
    return [scores, perToken.some(t => t.reliable)];
}
/**
 * Multiplies up documents where the query's words share a field: all of
 * them in one field (SAME_FIELD_BOOST), and close together within a field
 * (proximity, best field wins). Needs two or more distinct words.
 */
export function boostSharedFields(scores, terms, lists, prefixes) {
    // The page strips t:/c:/a:/i: only, so an o: (orcid) term stays prefixed
    // and never matches a field here. Kept identical so rankings match.
    const words = [
        ...new Set(terms.map(t => t.replace(/^[tcai]:/, '')).filter(w => !w.includes('_'))),
    ];
    if (words.length < 2)
        return;
    for (const px of prefixes) {
        let shared;
        for (const word of words) {
            const list = lists.get(px + word);
            const docs = new Set(list ? list.map(p => p.docId) : []);
            const previous = shared;
            shared = previous
                ? new Set([...previous].filter(docId => docs.has(docId)))
                : docs;
            if (!shared.size)
                break;
        }
        if (shared?.size) {
            for (const docId of shared) {
                const score = scores.get(docId);
                if (score !== undefined) {
                    scores.set(docId, score * (SAME_FIELD_BOOST[px] ?? 1.6));
                }
            }
        }
    }
    if (PROXIMITY <= 0)
        return;
    const best = new Map();
    for (const px of prefixes) {
        const perWord = [];
        for (const word of words) {
            const list = lists.get(px + word);
            if (!list)
                continue;
            const positions = new Map();
            for (const p of list) {
                if (p.positions?.length)
                    positions.set(p.docId, p.positions);
            }
            if (positions.size)
                perWord.push(positions);
        }
        if (perWord.length < 2)
            continue;
        const seen = new Map();
        for (const positions of perWord) {
            for (const [docId, ps] of positions) {
                if (!scores.has(docId))
                    continue;
                const lists2 = seen.get(docId) ?? [];
                lists2.push(ps);
                seen.set(docId, lists2);
            }
        }
        for (const [docId, positionLists] of seen) {
            if (positionLists.length < 2)
                continue;
            const multiplier = proximityMultiplier(positionLists);
            if (multiplier > (best.get(docId) ?? 1))
                best.set(docId, multiplier);
        }
    }
    for (const [docId, multiplier] of best) {
        scores.set(docId, scores.get(docId) * multiplier);
    }
}
/**
 * 1 + PROXIMITY * (m - 1) / (span - (m - 1) + 1), where m is the number of
 * words and span the smallest window holding one position of each: adjacent
 * words get the full boost, words a paragraph apart about none.
 */
export function proximityMultiplier(positionLists) {
    const m = positionLists.length;
    if (m < 2)
        return 1;
    const merged = [];
    positionLists.forEach((ps, word) => {
        for (const p of ps)
            merged.push([p, word]);
    });
    merged.sort((a, b) => a[0] - b[0]);
    const counts = new Array(m).fill(0);
    let have = 0;
    let lo = 0;
    let best = -1;
    for (let hi = 0; hi < merged.length; hi += 1) {
        if (counts[merged[hi][1]] === 0)
            have += 1;
        counts[merged[hi][1]] += 1;
        while (have === m) {
            const span = merged[hi][0] - merged[lo][0];
            if (best < 0 || span < best)
                best = span;
            counts[merged[lo][1]] -= 1;
            if (counts[merged[lo][1]] === 0)
                have -= 1;
            lo += 1;
        }
    }
    return best < 0 ? 1 : 1 + (PROXIMITY * (m - 1)) / (best - (m - 1) + 1);
}
/**
 * Documents by score, best first (ties by docId), capped at RANK_CAP.
 */
export function rankScores(scores, cap = RANK_CAP) {
    return [...scores.entries()]
        .sort((a, b) => b[1] - a[1] || a[0] - b[0])
        .slice(0, cap)
        .map(([docId]) => docId);
}
