import { StaticRecords } from '../../../static-index/records';
import { etdVectorRecords } from '../layouts';
/** How many docs to keep for re-reading: a few searches' worth of pages. */
const RECENT_DOCS = 2000;
export class VectorRecords {
    constructor(files, records) {
        this.files = files;
        this.records = records;
        /** Docs read lately, by vector id. */
        this.recent = new Map();
    }
    static async load(files, options) {
        const space = {
            count: files.meta.n,
            firstId: 0,
            // Its snippet pair only when the manifest's flag says so, so an older
            // store never gets a read at files it doesn't have.
            records: etdVectorRecords(files.meta),
        };
        return new VectorRecords(files, await StaticRecords.load(files, space, options));
    }
    /**
     * Docs for vector ids from their docs.bin rows alone, in the given order:
     * one wave, no abstract. For describing many matches, not showing them.
     */
    async rows(dids, options) {
        return (await this.records.fields(dids, options)).map(record => vectorDoc(record));
    }
    /** Docs for vector ids, in the given order; ids out of range are skipped. */
    async read(dids, options) {
        const { n } = this.files.meta;
        const ids = dids.filter(d => Number.isInteger(d) && d >= 0 && d < n);
        const missing = [...new Set(ids.filter(d => !this.recent.has(d)))];
        if (missing.length) {
            const docs = await this.readUncached(missing, options);
            // Kept briefly: a first answer's docs are mostly the final one's too.
            if (this.recent.size + docs.length > RECENT_DOCS)
                this.recent.clear();
            for (const doc of docs)
                this.recent.set(doc.did, doc);
        }
        return ids
            .map(did => this.recent.get(did))
            .filter((doc) => doc !== undefined);
    }
    async readUncached(ids, options) {
        return (await this.records.read(ids, options)).map(record => vectorDoc(record));
    }
}
/** A vector store doc from what the generic reader read. */
function vectorDoc({ id, fields, snippet }) {
    const doc = {
        did: id,
        title: fields.title,
        host: fields.host,
        date: fields.date,
        landing: fields.landing,
        lang: fields.lang,
    };
    if (snippet)
        doc.snippet = snippet;
    return doc;
}
