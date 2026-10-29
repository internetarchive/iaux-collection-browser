import { decodeSnippet, span } from '../records';
export class VectorRecords {
    constructor(files, 
    /** vsnip.bin size, from vsnip.dir's sentinel; 0 = no abstracts. */
    snippetsSize) {
        this.files = files;
        this.snippetsSize = snippetsSize;
    }
    static async load(files, options) {
        let snippetsSize = 0;
        // Gated on the manifest's flag, so an older store never gets a read at
        // files it doesn't have.
        if (files.meta.vsnip) {
            try {
                const sentinel = await files.range('vsnip.dir', files.meta.n * 8, 8, options);
                snippetsSize = Number(new DataView(sentinel.buffer, sentinel.byteOffset, sentinel.byteLength).getBigUint64(0, true));
            }
            catch (err) {
                if (options?.signal?.aborted)
                    throw err;
            }
        }
        return new VectorRecords(files, snippetsSize);
    }
    /** Docs for vector ids, in the given order; ids out of range are skipped. */
    async read(dids, options) {
        const { n, docbytes, fields } = this.files.meta;
        const ids = dids.filter(d => Number.isInteger(d) && d >= 0 && d < n);
        if (!ids.length)
            return [];
        // Wave 1: rows and abstract directory entries. Wave 2: the abstracts.
        const [rows, dirs] = await Promise.all([
            this.files.ranges('docs.bin', ids.map(d => [d * docbytes, docbytes]), 256, options),
            this.snippetsSize
                ? this.files.ranges('vsnip.dir', ids.map(d => [d * 8, 16]), 512, options)
                : Promise.resolve([]),
        ]);
        const spans = ids.map((_, i) => {
            const s = span(dirs[i]);
            return s && s[0] + s[1] <= this.snippetsSize ? s : undefined;
        });
        const wanted = spans.filter((s) => s !== undefined);
        const compressed = await this.files.ranges('vsnip.bin', wanted, 64, options);
        let next = 0;
        return Promise.all(ids.map(async (did, i) => {
            const doc = { did, ...decodeRow(rows[i], fields) };
            if (spans[i]) {
                const bytes = compressed[next];
                next += 1;
                const snippet = bytes?.length === spans[i][1]
                    ? await decodeSnippet(bytes)
                    : undefined;
                if (snippet)
                    doc.snippet = snippet;
            }
            return doc;
        }));
    }
}
const decoder = new TextDecoder();
/** A docs.bin row's NUL-padded UTF-8 fields. */
export function decodeRow(row, widths) {
    let at = 0;
    const take = (width) => {
        const field = row.subarray(at, at + width);
        at += width;
        const nul = field.indexOf(0);
        // A field cut mid-character ends in U+FFFD: drop it, as the live page does.
        return decoder
            .decode(nul < 0 ? field : field.subarray(0, nul))
            .replace(/�+$/, '');
    };
    return {
        title: take(widths.title),
        host: take(widths.host),
        date: take(widths.date),
        landing: take(widths.landing),
        lang: take(widths.lang),
    };
}
