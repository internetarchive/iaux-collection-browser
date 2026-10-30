/**
 * Compares two rankings of the same index's docIds: ours (the ported engine)
 * against the live etd-search page's.
 */
/**
 * Diffs two rankings, each a list of docIds best first. Pass both cut to the
 * same length: a doc past the end of one list counts as missing from it.
 */
export function diffRankings(ours, theirs, depths = [10, 20, 50, 100]) {
    const theirRank = new Map(theirs.map((docId, i) => [docId, i + 1]));
    const ourRank = new Map(ours.map((docId, i) => [docId, i + 1]));
    const docs = [
        ...ours.map((docId, i) => ({
            docId,
            ours: i + 1,
            theirs: theirRank.get(docId),
        })),
        ...theirs
            .filter(docId => !ourRank.has(docId))
            .map(docId => ({ docId, theirs: theirRank.get(docId) })),
    ];
    const longest = Math.max(ours.length, theirs.length);
    const overlap = depths
        .filter(depth => depth <= longest)
        .map(depth => {
        const head = new Set(theirs.slice(0, depth));
        return {
            depth,
            shared: ours.slice(0, depth).filter(docId => head.has(docId)).length,
        };
    });
    return {
        identical: ours.length === theirs.length &&
            ours.every((docId, i) => theirs[i] === docId),
        overlap,
        docs,
        moved: docs.filter(doc => doc.ours !== undefined &&
            doc.theirs !== undefined &&
            doc.ours !== doc.theirs),
        onlyOurs: docs.filter(doc => doc.theirs === undefined),
        onlyTheirs: docs.filter(doc => doc.ours === undefined),
    };
}
