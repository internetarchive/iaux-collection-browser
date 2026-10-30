/**
 * A name as the alias index keys it: Unicode-decomposed without accents,
 * lowercase, punctuation as spaces, spaces collapsed, no leading "the".
 * The same as the indexer's tools/match_institutions.norm.
 */
export function institutionKey(name) {
    let key = name
        .normalize('NFKC')
        .normalize('NFKD')
        .replace(/\p{M}+/gu, '')
        .toLowerCase()
        .replace(/[^\p{L}\p{N}_\s]+/gu, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    if (key.startsWith('the '))
        key = key.slice(4);
    return key;
}
/** inst-labels.bin's lines as labels, in id order. */
export function parseInstitutionLabels(text) {
    return text
        .replace(/\n$/, '')
        .split('\n')
        .map(line => {
        const [qid, label, country] = line.split('\t');
        return { qid, label: label || qid, country: country ?? '' };
    });
}
/**
 * The names institutions are shown under: the label alone, or with its
 * country, e.g. 'Heidelberg University (DE)', where several institutions
 * share the label. Ones sharing both still share a name, and a row.
 */
export function institutionNames(labels) {
    const uses = new Map();
    for (const { label } of labels)
        uses.set(label, (uses.get(label) ?? 0) + 1);
    return labels.map(({ label, country }) => uses.get(label) > 1 && country ? `${label} (${country})` : label);
}
export class EtdInstitutions {
    constructor(files) {
        this.files = files;
    }
    /** inst-meta.json; undefined when the index has no institution list. */
    meta(options) {
        if (!this.metaLoad) {
            this.metaLoad = this.loadMeta(options);
            this.metaLoad.catch(() => {
                this.metaLoad = undefined;
            });
        }
        return this.metaLoad;
    }
    async loadMeta(options) {
        const bytes = await this.files.optionalArrayBuffer('inst-meta.json', options);
        if (!bytes)
            return undefined;
        const meta = JSON.parse(new TextDecoder().decode(bytes));
        // Ids from another build would attach the wrong institutions to docs.
        if (meta.n !== this.files.meta.n_docs) {
            throw new Error(`ETD institutions: ${meta.n} ids for ${this.files.meta.n_docs} docs`);
        }
        return meta;
    }
    /**
     * The ids a name (or spelling, or acronym) stands for; empty when the
     * list doesn't know it.
     */
    async idsFor(name, options) {
        const ids = new Set();
        const meta = await this.meta(options);
        const key = institutionKey(name);
        if (!meta || !key)
            return ids;
        if (!this.aliasLoad) {
            this.aliasLoad = this.files
                .arrayBuffer(meta.alias.dir, options)
                .then(bytes => JSON.parse(new TextDecoder().decode(bytes)));
            this.aliasLoad.catch(() => {
                this.aliasLoad = undefined;
            });
        }
        const bucket = (await this.aliasLoad).buckets?.[key.slice(0, 2)];
        if (!bucket)
            return ids;
        const text = new TextDecoder().decode(await this.files.range(meta.alias.bin, bucket[0], bucket[1], options));
        for (const line of text.split('\n')) {
            const tab = line.indexOf('\t');
            if (tab >= 0 && line.slice(0, tab) === key) {
                for (const id of line.slice(tab + 1).split(',')) {
                    if (Number(id))
                        ids.add(Number(id));
                }
                break;
            }
        }
        return ids;
    }
    /**
     * Every doc's id and every id's name, from `ids`: inst.gz.json's
     * response (or inst.bin's, when `gzip` is false).
     */
    async table(meta, ids, gzip) {
        const stride = meta.stride ?? 2;
        if (stride !== 2 && stride !== 4) {
            throw new Error(`ETD institutions: ${stride}-byte ids`);
        }
        if (!ids.body)
            throw new Error('ETD institutions: empty id file');
        const body = gzip
            ? ids.body.pipeThrough(new DecompressionStream('gzip'))
            : ids.body;
        const [buffer, labelBytes] = await Promise.all([
            new Response(body).arrayBuffer(),
            this.files.arrayBuffer(meta.labels.bin),
        ]);
        if (buffer.byteLength !== meta.n * stride) {
            throw new Error(`ETD institutions: ${buffer.byteLength} bytes for ${meta.n} ids of ${stride}`);
        }
        const labels = parseInstitutionLabels(new TextDecoder().decode(labelBytes));
        if (labels.length !== meta.k) {
            throw new Error(`ETD institutions: ${labels.length} labels for ${meta.k} ids`);
        }
        // Little-endian, like every platform a browser runs on.
        return {
            ids: stride === 2 ? new Uint16Array(buffer) : new Uint32Array(buffer),
            names: institutionNames(labels),
        };
    }
}
