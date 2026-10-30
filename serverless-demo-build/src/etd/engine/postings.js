import { readVarint } from './codec';
/**
 * Decodes a posting list from postings.bin.
 *
 * Layout: `varint df, varint stored`, then groups until `stored` postings
 * are read. A group is `u8 impact, varint count` and `count` postings of
 * `varint docIdDelta` (deltas restart at 0 in each group), each followed on a
 * positional index by `varint positionCount` and that many position deltas.
 *
 * Lists are impact-ordered and truncated: `stored` can be far below `df`,
 * which is how callers tell an exhaustive list from a partial one.
 */
export function decodePostings(bytes, positional) {
    const [, afterDf] = readVarint(bytes, 0);
    const [stored, start] = readVarint(bytes, afterDf);
    let i = start;
    const out = [];
    while (out.length < stored) {
        const impact = bytes[i];
        i += 1;
        let count;
        [count, i] = readVarint(bytes, i);
        let docId = 0;
        for (let k = 0; k < count; k += 1) {
            let delta;
            [delta, i] = readVarint(bytes, i);
            docId += delta;
            if (positional) {
                let positionCount;
                [positionCount, i] = readVarint(bytes, i);
                const positions = new Array(positionCount);
                let position = 0;
                for (let m = 0; m < positionCount; m += 1) {
                    let positionDelta;
                    [positionDelta, i] = readVarint(bytes, i);
                    position += positionDelta;
                    positions[m] = position;
                }
                out.push({ docId, impact, positions });
            }
            else {
                out.push({ docId, impact });
            }
        }
    }
    return out;
}
