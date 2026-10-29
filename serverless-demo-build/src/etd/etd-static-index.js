import { FIELD_WEIGHT, PROXIMITY, SAME_FIELD_BOOST } from './engine/scorer';
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
/** stubs.bin's 320-byte layout (not in current.json; see records.ts). */
const RECORD_FIELDS = [
    { key: 'title', start: 0, end: 150 },
    { key: 'creators', start: 150, end: 198 },
    { key: 'date', start: 198, end: 208 },
    { key: 'domain', start: 208, end: 232 },
    { key: 'url', start: 232, end: 320 },
];
/**
 * facets.gz.json's byte positions. facets-meta.json gives them only as
 * text ("year(u8,enc2,0=unk) flags(u8) domain(u16le) lang(u8,0=unk)+..."),
 * so they're written out here. The domain (bytes 2-3, a 16-bit index) isn't
 * described: no column kind reads two bytes yet, and no facet uses it.
 */
const YEAR_BYTE = 0;
const FLAG_BYTES = [1, 6];
const LANGUAGE_BYTE = 4;
const COUNTRY_BYTE = 5;
const LEVEL_BYTE = 6;
/** The manifest ETD's current.json, facets-meta.json and inst-meta.json amount to. */
export function etdManifest(current, facetsMeta, instMeta) {
    const extra = new Set(Object.keys(current.prefixed_fields ?? {}));
    const fields = TEXT_FIELDS.filter(field => {
        const letter = field.prefix[0];
        return BASE_PREFIXES.has(letter) || extra.has(letter);
    });
    const byKey = (values) => Object.fromEntries(fields.map(field => [field.key, values[field.prefix]]));
    return {
        format: 'ia-static-index',
        formatVersion: 1,
        version: current.v ?? '',
        docCount: current.n_docs,
        text: {
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
        },
        records: {
            bytes: current.stub_bytes,
            fields: RECORD_FIELDS,
            overflow: [{ field: 'url', dir: 'url.dir', bin: 'url.bin' }],
            snippet: { field: 'abstract', dir: 'snip.dir', bin: 'snippets.bin' },
        },
        positions: !!current.posfwd,
        facets: facetsMeta && {
            file: 'facets.gz.json',
            stride: facetsMeta.stride,
            gzip: true,
            columns: facetColumns(facetsMeta),
        },
        docValues: instMeta && [institutionValues(instMeta)],
    };
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
/**
 * The ETD demo's facets as config: the same values etd-facets.ts's code
 * reads (the tests check that), stated as rules.
 */
export const ETD_SEARCH_CONFIG = {
    baseUrl: 'https://archive.org/download/etd-search/',
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
        {
            key: 'availability',
            title: 'Availability',
            pluralTitle: 'Availability',
            after: 'degree',
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
        },
    ],
};
