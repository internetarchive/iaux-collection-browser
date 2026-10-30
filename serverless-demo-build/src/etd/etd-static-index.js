import { sidecarMatches } from '../static-index/files';
import { etdTextRecords, etdVectorRecords } from './engine/layouts';
import { FIELD_WEIGHT, PROXIMITY, SAME_FIELD_BOOST } from './engine/scorer';
import { MODEL_ID, MODEL_LIBRARY, QUERY_EMBEDDING, } from './engine/vector/embedder';
import { CODES_MUST_MATCH, DEFAULT_NPROBE, DEFAULT_RERANK, FACETS_MUST_MATCH, } from './engine/vector/scan';
import { ETD_IDENTIFIER_PREFIX, ETD_VECTOR_IDENTIFIER_PREFIX, } from './etd-response';
import { AVAILABILITY_NAMES, DEGREE_NAMES, SOURCE_FLAGS, SOURCE_NAMES, } from './etd-facets';
import { ETD_NAMES } from './etd-languages';
/**
 * ETD's text fields. current.json lists only the prefixes beyond the base
 * four, and names the orcid field's stats 'orcids'. Aliases are the query
 * parser's field words.
 */
const TEXT_FIELDS = [
    { prefix: 't:', key: 'title', stats: 'title', aliases: ['title'] },
    {
        prefix: 'c:',
        key: 'creators',
        stats: 'creators',
        aliases: ['creator', 'author'],
    },
    { prefix: 'a:', key: 'abstract', stats: 'abstract', aliases: ['abstract'] },
    {
        prefix: 'i:',
        key: 'institution',
        stats: 'institution',
        aliases: ['institution', 'inst'],
    },
    { prefix: 'o:', key: 'orcid', stats: 'orcids', aliases: ['orcid'] },
];
/** Always in an ETD build; others only when current.json lists them. */
const BASE_PREFIXES = new Set(['t', 'c', 'a', 'i']);
/**
 * facets.gz.json's byte positions. facets-meta.json gives them only as
 * text ("year(u8,enc2,0=unk) flags(u8) domain(u16le) lang(u8,0=unk)+..."),
 * so they're written out here. The domain is described only when the meta
 * lists the hosts (the snapshot of facets-meta.json doesn't).
 */
const YEAR_BYTE = 0;
const FLAG_BYTES = [1, 6];
const DOMAIN_BYTE = 2;
const LANGUAGE_BYTE = 4;
const COUNTRY_BYTE = 5;
const LEVEL_BYTE = 6;
/** The id space and search keys ETD's manifest uses. */
export const ETD_THESES = 'theses';
export const ETD_VECTOR_DOCS = 'vectorDocs';
export const ETD_WORDS = 'words';
export const ETD_MEANING = 'meaning';
/**
 * The manifest ETD's published metas amount to: what etd-search would
 * publish as static-index.json. Sidecars whose metas don't match the store
 * are left out, as the engine ignores them.
 */
export function etdItemManifest(metas) {
    const { current } = metas;
    const files = current.v
        ? { naming: 'versioned', version: current.v }
        : { naming: 'stamped', built: 'unversioned' };
    const manifest = {
        format: 'ia-static-index',
        formatVersion: 2,
        idSpaces: {
            [ETD_THESES]: {
                count: current.n_docs,
                firstId: 1,
                files,
                records: etdTextRecords(current),
                facets: metas.facetsMeta && {
                    file: 'facets.gz.json',
                    stride: metas.facetsMeta.stride,
                    gzip: true,
                    columns: facetColumns(metas.facetsMeta),
                },
                docValues: metas.instMeta && [institutionValues(metas.instMeta)],
            },
        },
        searches: {
            [ETD_WORDS]: {
                kind: 'text',
                ids: ETD_THESES,
                files,
                text: textIndex(current),
                positions: !!current.posfwd,
            },
        },
    };
    if (metas.ivf) {
        manifest.idSpaces[ETD_VECTOR_DOCS] = vectorDocs(metas.ivf);
        manifest.searches[ETD_MEANING] = vectorSearch(metas);
    }
    return manifest;
}
function textIndex(current) {
    const extra = new Set(Object.keys(current.prefixed_fields ?? {}));
    const fields = TEXT_FIELDS.filter(field => {
        const letter = field.prefix[0];
        return BASE_PREFIXES.has(letter) || extra.has(letter);
    });
    const byKey = (values) => Object.fromEntries(fields.map(field => [field.key, values[field.prefix]]));
    return {
        fields: fields.map(({ prefix, key, stats, aliases }) => ({
            key,
            prefix: prefix[0],
            aliases,
            avgLength: current.avg?.[stats],
            indexWeight: current.weights?.[stats],
        })),
        bm25: current.k1 !== undefined && current.b !== undefined
            ? { k1: current.k1, b: current.b }
            : undefined,
        // ETD's search-time ranking is the live page's code, not published.
        ranking: {
            fieldWeights: byKey(FIELD_WEIGHT),
            sameFieldBoost: byKey(SAME_FIELD_BOOST),
            proximity: PROXIMITY,
        },
    };
}
/** The vector store's docs: their own ids, 0-based docs.bin rows. */
function vectorDocs(ivf) {
    return {
        count: ivf.n,
        firstId: 0,
        files: vectorFiles(ivf),
        records: etdVectorRecords(ivf),
    };
}
function vectorFiles(ivf) {
    return { naming: 'stamped', built: ivf.built ?? '0' };
}
/** cell-facets.bin's byte positions; its meta gives them only as text. */
const VECTOR_YEAR_BYTE = 0;
const VECTOR_FLAGS_BYTE = 1;
const VECTOR_DOMAIN_BYTE = 2;
function vectorSearch(metas) {
    const ivf = metas.ivf;
    const { codesMeta, cellFacetsMeta } = metas;
    const search = {
        kind: 'vector',
        ids: ETD_VECTOR_DOCS,
        files: vectorFiles(ivf),
        dim: ivf.dim,
        cells: {
            count: ivf.ncell,
            centroids: 'centroids.f16',
            dir: 'cell.dir',
            rows: 'cells.bin',
            rowBytes: ivf.rowbytes,
        },
        model: {
            id: ivf.model ?? MODEL_ID,
            path: `${MODEL_ID}/`,
            dtype: QUERY_EMBEDDING.dtype,
            queryPrefix: QUERY_EMBEDDING.queryPrefix,
            pooling: QUERY_EMBEDDING.pooling,
            normalize: QUERY_EMBEDDING.normalize,
            library: MODEL_LIBRARY,
        },
        settings: { nprobe: DEFAULT_NPROBE, rerank: DEFAULT_RERANK },
    };
    if (ivf.codes &&
        codesMeta &&
        (codesMeta.bits === 4 || codesMeta.bits === 8) &&
        sidecarMatches(ivf, codesMeta, CODES_MUST_MATCH)) {
        search.codes = {
            file: 'cell-codes.bin',
            meta: 'cell-codes-meta.json',
            mustMatch: [...CODES_MUST_MATCH],
            bits: codesMeta.bits,
            rowBytes: codesMeta.rowbytes,
        };
    }
    if (cellFacetsMeta &&
        sidecarMatches(ivf, cellFacetsMeta, FACETS_MUST_MATCH)) {
        const columns = [
            {
                key: 'year',
                kind: 'year',
                byte: VECTOR_YEAR_BYTE,
                encoding: cellFacetsMeta.year_enc === 2 ? 2 : 1,
            },
            {
                key: 'flags',
                kind: 'flags',
                bytes: [VECTOR_FLAGS_BYTE],
                bits: cellFacetsMeta.flag_bits ?? {},
            },
        ];
        if (cellFacetsMeta.domains) {
            columns.push({
                key: 'domain',
                kind: 'code',
                byte: VECTOR_DOMAIN_BYTE,
                width: 2,
                codes: cellFacetsMeta.domains,
            });
        }
        search.facets = {
            file: 'cell-facets.bin',
            meta: 'cell-facets-meta.json',
            mustMatch: [...FACETS_MUST_MATCH],
            stride: cellFacetsMeta.stride || 8,
            gzip: false,
            columns,
        };
    }
    return search;
}
/** inst-labels.bin's columns, when inst-meta.json doesn't list them. */
const INSTITUTION_LABEL_COLUMNS = ['qid', 'label', 'country', 'n_docs'];
/** The institution list (see engine/institutions.ts) as doc values. */
function institutionValues(meta) {
    return {
        key: 'institution',
        file: meta.gz ?? meta.bin,
        gzip: !!meta.gz,
        bytes: meta.stride === 4 ? 4 : 2,
        count: meta.k,
        labels: {
            file: meta.labels.bin,
            dir: meta.labels.dir,
            columns: meta.labels.cols ?? INSTITUTION_LABEL_COLUMNS,
        },
        lookup: {
            dir: meta.alias.dir,
            bin: meta.alias.bin,
            normalize: 'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
            queryFields: ['inst', 'institution'],
        },
    };
}
function facetColumns(meta) {
    const columns = [
        {
            key: 'year',
            kind: 'year',
            byte: YEAR_BYTE,
            encoding: meta.year_enc === 2 ? 2 : 1,
        },
        {
            key: 'flags',
            kind: 'flags',
            bytes: FLAG_BYTES,
            bits: meta.flag_bits ?? {},
        },
        { key: 'language', kind: 'code', byte: LANGUAGE_BYTE, codes: meta.langs },
    ];
    if (meta.domains) {
        columns.push({
            key: 'domain',
            kind: 'code',
            byte: DOMAIN_BYTE,
            width: 2,
            codes: meta.domains,
        });
    }
    if (meta.countries) {
        columns.push({
            key: 'country',
            kind: 'code',
            byte: COUNTRY_BYTE,
            codes: meta.countries,
        });
    }
    if (meta.levels) {
        columns.push({
            key: 'level',
            kind: 'packed',
            byte: meta.levels.byte ?? LEVEL_BYTE,
            shift: meta.levels.shift,
            mask: meta.levels.mask,
            codes: meta.levels.codes,
        });
    }
    return columns;
}
/** The availability rules, the same over the text and vector flags. */
const AVAILABILITY = {
    key: 'availability',
    title: 'Availability',
    pluralTitle: 'Availability',
    combine: 'all',
    from: {
        derived: {
            abstract: { flag: 'hasAbstract' },
            archived: { flag: 'complete' },
            saved: { anyFlag: ['ia', 'wbm', 'archived'] },
            live: { notFlag: 'ia' },
        },
    },
    names: { from: 'table', labels: AVAILABILITY_NAMES },
};
/**
 * The source flags the vector store's facet rows have: cell-facets-meta.json
 * has no bits for libcat or printed (checked 2026-10-29), so a vector doc
 * never has them, and naming them would only fail checkConfig.
 */
const VECTOR_SOURCE_FLAGS = ['oai', 'ia', 'wbm'];
/**
 * The ETD demo's two searches as config: the same values etd-facets.ts's
 * and etd-vector-facets.ts's code reads (the tests check that), stated as
 * rules.
 */
export const ETD_ITEM_CONFIG = {
    baseUrl: 'https://archive.org/download/etd-search/',
    searches: {
        [ETD_WORDS]: {
            identifierPrefix: ETD_IDENTIFIER_PREFIX,
            hit: { title: 'title', creators: 'creators', date: 'date', url: 'url' },
            facets: [
                {
                    key: 'language',
                    title: 'Language',
                    pluralTitle: 'Languages',
                    from: { column: 'language' },
                    names: { from: 'intl', type: 'language', overrides: ETD_NAMES },
                },
                {
                    key: 'country',
                    title: 'Country',
                    pluralTitle: 'Countries',
                    after: 'language',
                    from: { column: 'country' },
                    names: { from: 'intl', type: 'region' },
                },
                {
                    key: 'degree',
                    title: 'Degree level',
                    pluralTitle: 'Degree levels',
                    after: 'year',
                    from: { column: 'level', unknownAs: 'unknown' },
                    names: { from: 'table', labels: DEGREE_NAMES },
                },
                {
                    key: 'institution',
                    title: 'Institution',
                    pluralTitle: 'Institutions',
                    after: 'country',
                    from: { column: 'institution' },
                    names: { from: 'labels', column: 'label', whenShared: 'country' },
                },
                {
                    key: 'source',
                    title: 'Source',
                    pluralTitle: 'Sources',
                    after: 'institution',
                    from: { flags: SOURCE_FLAGS },
                    names: { from: 'table', labels: SOURCE_NAMES },
                },
                { ...AVAILABILITY, after: 'degree' },
            ],
        },
        [ETD_MEANING]: {
            identifierPrefix: ETD_VECTOR_IDENTIFIER_PREFIX,
            hit: { title: 'title', date: 'date', url: 'landing' },
            facets: [
                {
                    key: 'repository',
                    title: 'Repository',
                    pluralTitle: 'Repositories',
                    after: 'year',
                    from: { column: 'domain' },
                },
                {
                    key: 'source',
                    title: 'Source',
                    pluralTitle: 'Sources',
                    after: 'repository',
                    from: { flags: VECTOR_SOURCE_FLAGS },
                    names: { from: 'table', labels: SOURCE_NAMES },
                },
                { ...AVAILABILITY, after: 'source' },
            ],
        },
    },
};
