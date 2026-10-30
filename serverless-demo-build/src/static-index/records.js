/** Ranges per multi-range request, per file. */
const RECORDS_PER_REQUEST = 256;
const DIRS_PER_REQUEST = 512;
const OVERFLOWS_PER_REQUEST = 256;
const SNIPPETS_PER_REQUEST = 64;
/** Records per request and requests at once, for `fields`: see rangesInParallel. */
const FIELDS_PER_REQUEST = 64;
const FIELD_REQUESTS_IN_FLIGHT = 6;
export class StaticRecords {
    constructor(files, space, 
    /** The snippet .bin's size, from its .dir's last entry; 0 = none. */
    snippetsSize) {
        this.files = files;
        this.space = space;
        this.snippetsSize = snippetsSize;
    }
    /**
     * Reads the snippet directory's last entry, so a snippet is never read
     * past its file. Snippets are optional: if that read fails, records show
     * without them.
     */
    static async load(files, space, options) {
        let snippetsSize = 0;
        const { snippet } = space.records;
        if (snippet) {
            try {
                const sentinel = await files.range(snippet.dir, space.count * 8, 8, options);
                snippetsSize = Number(new DataView(sentinel.buffer, sentinel.byteOffset, sentinel.byteLength).getBigUint64(0, true));
            }
            catch (err) {
                if (options?.signal?.aborted)
                    throw err;
            }
        }
        return new StaticRecords(files, space, snippetsSize);
    }
    /**
     * Records for ids from their fixed-size records alone, in the given
     * order: one wave, no overflow or snippet, so a field cut to its width
     * stays cut. For describing many records, not showing them. Ids out of
     * range are skipped.
     */
    async fields(ids, options) {
        const { count, firstId, records: layout } = this.space;
        const wanted = ids.filter(id => Number.isInteger(id) && id >= firstId && id < firstId + count);
        const rows = await this.files.rangesInParallel(layout.file, wanted.map(id => [(id - firstId) * layout.bytes, layout.bytes]), FIELDS_PER_REQUEST, FIELD_REQUESTS_IN_FLIGHT, options);
        return wanted.map((id, i) => ({
            id,
            fields: decodeRecord(rows[i], layout),
        }));
    }
    /** Records for ids, in the given order; ids out of range are skipped. */
    async read(ids, options) {
        const { count, firstId, records: layout } = this.space;
        const wanted = ids.filter(id => Number.isInteger(id) && id >= firstId && id < firstId + count);
        if (!wanted.length)
            return [];
        const at = (id) => id - firstId;
        const dirEntries = (dir) => this.files.ranges(dir, wanted.map(id => [at(id) * 8, 16]), DIRS_PER_REQUEST, options);
        const overflow = layout.overflow ?? [];
        const { snippet } = layout;
        // Wave 1: the records and every directory's entries.
        const [rows, overflowDirs, snippetDirs] = await Promise.all([
            this.files.ranges(layout.file, wanted.map(id => [at(id) * layout.bytes, layout.bytes]), RECORDS_PER_REQUEST, options),
            Promise.all(overflow.map(pair => dirEntries(pair.dir))),
            snippet && this.snippetsSize
                ? dirEntries(snippet.dir)
                : Promise.resolve([]),
        ]);
        // Wave 2: the bytes those entries point at.
        const snippetSpans = wanted.map((_, i) => {
            const s = span(snippetDirs[i]);
            return s && s[0] + s[1] <= this.snippetsSize ? s : undefined;
        });
        const [overflows, snippets] = await Promise.all([
            Promise.all(overflow.map((pair, k) => this.readSpans(pair.bin, wanted.map((_, i) => span(overflowDirs[k][i])), OVERFLOWS_PER_REQUEST, options))),
            snippet
                ? this.readSpans(snippet.bin, snippetSpans, SNIPPETS_PER_REQUEST, options)
                : Promise.resolve([]),
        ]);
        const decoder = new TextDecoder();
        return Promise.all(wanted.map(async (id, i) => {
            const record = {
                id,
                fields: decodeRecord(rows[i], layout),
            };
            overflow.forEach((pair, k) => {
                const whole = overflows[k][i];
                if (whole)
                    record.fields[pair.field] = decoder.decode(whole);
            });
            const bytes = snippets[i];
            // A short read is a broken snippet, not a shorter one.
            const text = bytes && bytes.length === snippetSpans[i][1]
                ? await decodeSnippet(bytes)
                : undefined;
            if (text)
                record.snippet = text;
            return record;
        }));
    }
    async readSpans(name, spans, rangesPerRequest, options) {
        const reads = await this.files.ranges(name, spans.filter((s) => s !== undefined), rangesPerRequest, options);
        let next = 0;
        return spans.map(s => (s ? reads[next++] : undefined));
    }
}
const fieldDecoder = new TextDecoder();
/**
 * A record's fields: NUL-padded UTF-8 at fixed byte offsets. A record
 * shorter than the layout (a failed read) has every field empty.
 */
export function decodeRecord(bytes, layout) {
    const whole = !!bytes && bytes.length >= layout.bytes;
    return Object.fromEntries(layout.fields.map(({ key, start, end }) => [
        key,
        whole ? decodeField(bytes.subarray(start, end)) : '',
    ]));
}
function decodeField(field) {
    const nul = field.indexOf(0);
    // A byte-width cut can leave a partial UTF-8 sequence at the end, which
    // decodes to U+FFFD. Only a trailing one is the cut's; drop it.
    return fieldDecoder
        .decode(nul < 0 ? field : field.subarray(0, nul))
        .replace(/�+$/, '');
}
/** [offset, length] from a 16-byte directory entry; undefined if empty. */
export function span(entry) {
    if (!entry || entry.length < 16)
        return undefined;
    const view = new DataView(entry.buffer, entry.byteOffset, entry.byteLength);
    const start = Number(view.getBigUint64(0, true));
    const end = Number(view.getBigUint64(8, true));
    return end > start && start >= 0 ? [start, end - start] : undefined;
}
/**
 * The text of a deflated snippet member (`{ a: text, ... }`, e.g. ETD's
 * `{ a: abstract, l: language, e: English translation }`), as plain text.
 * Undefined when the member is unreadable: snippets are optional.
 */
export async function decodeSnippet(compressed) {
    try {
        const stream = new Blob([new Uint8Array(compressed)])
            .stream()
            .pipeThrough(new DecompressionStream('deflate'));
        const json = JSON.parse(new TextDecoder().decode(await new Response(stream).arrayBuffer()));
        const text = plainText(json.a ?? '');
        return text || undefined;
    }
    catch {
        return undefined;
    }
}
/**
 * Some repositories file abstracts as HTML: keep the text, drop the markup.
 */
export function plainText(text) {
    if (!text || (!text.includes('<') && !text.includes('&')))
        return text;
    const doc = new DOMParser().parseFromString(`<body>${text.replace(/<\s*(br|\/p|\/div|\/li)\s*\/?>/gi, ' ')}</body>`, 'text/html');
    return (doc.body.textContent ?? '').replace(/\s+/g, ' ').trim();
}
