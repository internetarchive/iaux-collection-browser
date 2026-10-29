import { span } from './records';
/** posfwd field key for each index field prefix. */
const FIELD_KEYS = {
    't:': 't',
    'c:': 'c',
    'a:': 'a',
    'i:': 'i',
    'o:': 'o',
};
const ALL_FIELDS = ['t', 'c', 'a', 'i', 'o'];
/** Docs kept in the read cache; a query's boost reads 200. */
const CACHE_SIZE = 2000;
export class EtdPosfwd {
    constructor(files, 
    /** posfwd.bin size, from posfwd.dir's sentinel entry. */
    size) {
        this.files = files;
        this.size = size;
        /** docId -> its text, or null for a doc with none. */
        this.cache = new Map();
        /** docId -> the read already fetching it, shared by concurrent callers. */
        this.pending = new Map();
    }
    /**
     * Opens posfwd, or resolves undefined when the index has none (or its
     * directory can't be read): it's optional, only ordering depends on it.
     */
    static async load(files, options) {
        if (!files.meta.posfwd)
            return undefined;
        try {
            const sentinel = await files.range('posfwd.dir', files.meta.n_docs * 8, 8, options);
            const size = Number(new DataView(sentinel.buffer, sentinel.byteOffset, sentinel.byteLength).getBigUint64(0, true));
            return size > 0 ? new EtdPosfwd(files, size) : undefined;
        }
        catch (err) {
            if (options?.signal?.aborted)
                throw err;
            return undefined;
        }
    }
    /** A doc's text, if it has been read; undefined if not (yet). */
    get(docId) {
        return this.cache.get(docId);
    }
    /**
     * Reads the text of `docIds` into the cache. Docs another call is already
     * fetching are waited on, not fetched again (the demo's compare panel and
     * collection-browser query the same engine at once); if that call fails,
     * or is aborted, this one fetches them itself.
     */
    async read(docIds, options) {
        const nDocs = this.files.meta.n_docs;
        const missing = [...new Set(docIds)].filter(d => Number.isInteger(d) && d >= 1 && d <= nDocs && !this.cache.has(d));
        if (!missing.length)
            return;
        const shared = new Set();
        const own = [];
        for (const docId of missing) {
            const inFlight = this.pending.get(docId);
            if (inFlight)
                shared.add(inFlight);
            else
                own.push(docId);
        }
        const mine = own.length ? this.fetch(own, options) : undefined;
        if (mine) {
            for (const docId of own)
                this.pending.set(docId, mine);
            const forget = () => {
                for (const docId of own) {
                    if (this.pending.get(docId) === mine)
                        this.pending.delete(docId);
                }
            };
            mine.then(forget, forget);
        }
        // Another caller's failure (or abort) isn't this call's: retry its docs.
        await Promise.all([...shared].map(read => read.catch(() => { })));
        const stillMissing = missing.filter(d => !own.includes(d) && !this.cache.has(d));
        await Promise.all([
            mine,
            stillMissing.length ? this.read(stillMissing, options) : undefined,
        ]);
    }
    /**
     * Fetches docs into the cache, in two multi-range waves (directory
     * entries, then members). A doc with no text is remembered as null.
     */
    async fetch(missing, options) {
        const dirs = await this.files.ranges('posfwd.dir', missing.map(d => [(d - 1) * 8, 16]), 512, options);
        const wanted = [];
        const wantedIds = [];
        missing.forEach((docId, i) => {
            const s = span(dirs[i]);
            if (!s || s[0] + s[1] > this.size) {
                this.remember(docId, null); // no text for this doc
                return;
            }
            wanted.push(s);
            wantedIds.push(docId);
        });
        const members = await this.files.ranges('posfwd.bin', wanted, 48, options);
        await Promise.all(wantedIds.map(async (docId, i) => {
            this.remember(docId, await decodePosfwd(members[i]));
        }));
    }
    remember(docId, text) {
        this.cache.delete(docId);
        this.cache.set(docId, text);
        if (this.cache.size > CACHE_SIZE) {
            this.cache.delete(this.cache.keys().next().value);
        }
    }
}
/** Inflates one posfwd member; null when it's unreadable. */
export async function decodePosfwd(compressed) {
    if (!compressed)
        return null;
    try {
        const stream = new Blob([new Uint8Array(compressed)])
            .stream()
            .pipeThrough(new DecompressionStream('deflate'));
        return JSON.parse(new TextDecoder().decode(await new Response(stream).arrayBuffer()));
    }
    catch {
        return null;
    }
}
/**
 * Whether `tokens` (two or more) appear adjacent, in order, in one of the
 * doc's fields: in `prefix`'s field only when given, else in any.
 *
 * Creators are lenient about names: the tokens may appear in either order,
 * with other names between them, within one author ("carl feynman" matches
 * "Feynman, Carl Richard"), but never across two co-authors.
 */
export function phraseInDoc(text, tokens, prefix) {
    if (!text || tokens.length < 2)
        return false;
    const needle = ` ${tokens.join(' ')} `;
    const fields = prefix ? [FIELD_KEYS[prefix] ?? 't'] : ALL_FIELDS;
    for (const field of fields) {
        const haystack = text[field];
        if (!haystack)
            continue;
        if (` ${haystack} `.includes(needle))
            return true;
        if (field === 'c' && inOneName(haystack, tokens))
            return true;
    }
    return false;
}
/**
 * Whether `tokens` are an ordered subsequence of one author's name tokens,
 * the name doubled so either name order works.
 */
function inOneName(creators, tokens) {
    for (const author of creators.split(';')) {
        const name = author.trim().split(/\s+/).filter(Boolean);
        if (!name.length)
            continue;
        let matched = 0;
        for (const token of name.concat(name)) {
            if (token === tokens[matched]) {
                matched += 1;
                if (matched === tokens.length)
                    return true;
            }
        }
    }
    return false;
}
