# Make an item searchable in the browser

An archive.org item can be searched with **no search backend**: it publishes
a prebuilt index as ordinary files, and the browser searches it by reading
small slices of them with HTTP Range requests. The ETD theses search
([`src/etd/`](../etd/README.md)) works this way over 26 million records.

This folder describes such an index generically, so the next item doesn't
need its own engine:

| File              | What it is                                                     |
| ----------------- | -------------------------------------------------------------- |
| `manifest.ts`     | the types: `StaticItemManifest` and `StaticItemConfig`         |
| `check-config.ts` | `checkConfig`: every name a config uses exists in the manifest |
| `facet-row.ts`    | reading a doc's facet values and names from the two            |
| `files.ts`        | a file set's urls, and whether a sidecar belongs to its build  |
| `model.ts`        | the embedding library builds this client will load, by version |
| `range-files.ts`  | `RangeFiles`: whole files and batched multi-range reads        |
| `identifiers.ts`  | a hit's identifier: prefix plus 1-based position, and back     |
| `records.ts`      | `StaticRecords`: what hits show, for any record layout         |

**Status.** The types describe both of ETD's searches (by words and by
meaning), and tests hold that description to today's ETD code
(`src/etd/etd-static-index.ts`). Both ETD engines name their files and
check their sidecars through `files.ts`, and read records through
`StaticRecords`, with layouts (`src/etd/engine/layouts.ts`) that the
manifest builder publishes too. Facets are still read ETD's way; making
them generic is the next step.

## Two halves

```
 published by the item                 held by the client
┌──────────────────────────┐          ┌──────────────────────────┐
│ manifest                 │          │ config, per search       │
│ what's in the files:     │◀─────────│ how to search and show:  │
│ id spaces, records,      │  names   │ identifiers, hit fields, │
│ facet columns, searches  │ checked  │ facets, names, overrides │
│ (fields, or vectors and  │          │                          │
│ their model), settings   │          │                          │
└──────────────────────────┘          └──────────────────────────┘
```

- The **manifest** is published by whoever builds the index. It states
  facts about the files: where each field sits, which codes a byte holds.
  It changes when the index is rebuilt.
- The **config** is held by the client. It's presentation: which facets to
  show, their titles, names for codes, how picked values combine. It
  changes when the product does.

A rebuild that renames a flag or drops a column would quietly empty a facet.
`checkConfig` makes it fail loudly instead, listing every problem at once:

```
Static index config:
- words: facet availability: no flag "hasAbstract"
- meaning: hit date: no record field "date"
- meaning: model: no pinned build of @huggingface/transformers 3.1.0
```

## The files an item publishes

All in the item, next to each other:

- `static-index.<version>.json`, each build's own manifest.
- `static-index.json`, the one a reader opens: a fixed name, read fresh.
  A publish step copies the new build's manifest here once its files have
  landed, adding `previous`: the build before it, kept until the next
  publish. A server that doesn't have the new files yet answers 404, and
  the reader falls back to the previous build whole, through
  `static-index.<previous>.json`, never file by file.
- Each search's files, and each id space's, as a **file set**:

| `naming`    | Files are read as          | When                                                                                                                                  |
| ----------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `versioned` | `<name>.<version><suffix>` | **Use this.** A file never changes, so it caches forever, and a rebuild can't be read half old, half new.                             |
| `stamped`   | `<name>?v=<built>`         | Fixed names a rebuild overwrites. A reader holding the old manifest can read new bytes. Only to describe ETD's vector store as it is. |

archive.org's servers only allow cross-origin reads of some extensions
(`.json` among them, not `.bin`), so a versioned file set read from
another origin sets `suffix: '.json'`: `dict.bin.<version>.json`. Range and
multi-range reads of a `.json` file come back as they would for any other.

A search by words publishes:

| File                       | Holds                                                        |
| -------------------------- | ------------------------------------------------------------ |
| `dict.dir`, `dict.bin`     | term → posting list location, hashed into buckets            |
| `postings.bin`             | per term: matching docs by impact, with word positions       |
| `stubs.bin`                | per doc, a fixed-size record: what a hit shows               |
| overflow `.dir` + `.bin`   | per doc, a field too long for the record (ETD: the full url) |
| snippet `.dir` + `.bin`    | per doc, the snippet text, deflated JSON (ETD: the abstract) |
| `posfwd.dir`, `posfwd.bin` | optional: each doc's word list per field, for phrases        |
| facet rows                 | optional: per doc, a fixed-size row of facet bytes           |
| doc values                 | optional: per doc, an id from a long list, with its labels   |

A `.dir` is id-aligned: count + 1 little-endian u64 offsets into its
`.bin`, the last being the `.bin`'s size. Reading one doc's data is
arithmetic plus one Range read, and a page of records is two waves of
multi-range requests. A snippet member is deflated JSON with its text in
`a` (ETD's also carry `l`, the language, and `e`, an English translation).

A search by meaning publishes the files in
[Search by meaning](#search-by-meaning) below.

ETD publishes no `static-index.json` yet. Its `current.json`,
`facets-meta.json`, `inst-meta.json`, `ivf-meta.json`,
`cell-codes-meta.json` and `cell-facets-meta.json` hold most of the
manifest; `etdItemManifest()` fills in the rest, and is what etd-search
would publish.

## The manifest, field by field

Using ETD's values as the example.

### Top level: id spaces and searches

```ts
{
  format: 'ia-static-index',
  formatVersion: 2,
  idSpaces: {
    theses:     { count: 25860159, firstId: 1, files: { naming: 'versioned', version: '20261026-5e5902' }, records, facets, docValues },
    vectorDocs: { count: 18176413, firstId: 0, files: { naming: 'stamped', built: '2026-10-12 11:31' }, records },
  },
  searches: {
    words:   { kind: 'text',   ids: 'theses',     files, text, positions: true },
    meaning: { kind: 'vector', ids: 'vectorDocs', files, dim: 384, cells, codes, facets, model, settings },
  },
}
```

- An **id space** is a set of docs with ids of their own, and owns their
  records, facet rows and doc values. ETD's vector store was built apart
  from its text index, over fewer docs, so its ids (docs.bin rows) are
  never text docIds: two id spaces, each with its own records, facets and
  identifiers (`etd-` / `etdv-`).
- A **search** names the id space its results are in. A client offers the
  searches the manifest has.
- Format 1 (one text index, no searches) isn't read any more.
- Linking two id spaces (a text docId → vector id map, to re-rank text
  results by meaning) isn't described: ETD has no such file.

### `searches.<key>.text`: the searchable fields

```ts
fields: [
  { key: 'title',    prefix: 't', aliases: ['title'] },
  { key: 'creators', prefix: 'c', aliases: ['creator', 'author'] },
  { key: 'abstract', prefix: 'a', aliases: ['abstract'] },
  // …
],
ranking: {
  fieldWeights:   { title: 1, creators: 2.2, abstract: 1, … },
  sameFieldBoost: { title: 1.6, creators: 2.6, … },
  proximity: 0.35,
},
```

- `prefix` is how the field's terms are spelled in the dictionary:
  `c:smith`.
- `aliases` are the query words that search one field: `author:smith`.
  The key itself isn't one unless listed. No word can search two fields.
- `ranking` is how the index author tuned results: a field's weight, the
  boost when every query word lands in that one field, and the boost for
  query words side by side. A config can override any part.
- `bm25`, `avgLength`, `indexWeight` say how the build computed each
  posting's impact. Informational: impacts are precomputed.

### `idSpaces.<key>.records`: what a hit shows

```ts
records: {
  file: 'stubs.bin',
  bytes: 320,
  fields: [
    { key: 'title', start: 0, end: 150, role: 'title' },
    { key: 'creators', start: 150, end: 198, role: 'creators' },
    // … date, domain
    { key: 'url', start: 232, end: 320, role: 'url' },
  ],
  overflow: [{ field: 'url', dir: 'url.dir', bin: 'url.bin' }],
  snippet: { field: 'abstract', dir: 'snip.dir', bin: 'snippets.bin' },
}
```

Each field is NUL-padded UTF-8 at fixed byte offsets (end exclusive). A
field that can be cut short also goes in an `overflow` pair, whole.

A field's `role` (`title`, `creators`, `date`, `url`; each once at most)
says what it is to a hit, so a client with no config for the item can
still show one. A config's `hit` overrides it.

### `idSpaces.<key>.facets`: one row of bytes per doc

```ts
facets: {
  file: 'facets.gz.json', stride: 8, gzip: true,
  columns: [
    { key: 'year',     kind: 'year',   byte: 0, encoding: 2 },
    { key: 'flags',    kind: 'flags',  bytes: [1, 6], bits: { oai: 1, ia: 2, …, printed: 512 } },
    { key: 'language', kind: 'code',   byte: 4, codes: ['en', 'es', 'pt', …] },
    { key: 'country',  kind: 'code',   byte: 5, codes: ['US', 'ES', …] },
    { key: 'level',    kind: 'packed', byte: 6, shift: 2, mask: 7, codes: { phd: 1, … } },
  ],
}
```

| Kind     | Reads                                                                  | Unknown        |
| -------- | ---------------------------------------------------------------------- | -------------- |
| `code`   | n → `codes[n - 1]`; `width: 2` reads two bytes, little-endian          | 0              |
| `year`   | encoding 1: 1900 + byte; encoding 2: 1700s-1890s by decade, then years | byte 0         |
| `flags`  | named bits; `bytes` low to high, 8 bits each                           | —              |
| `packed` | `(byte >> shift) & mask` → a code's number                             | no code for it |

One byte can hold two columns: ETD's byte 6 has flag bits 0-1 and the
degree level in bits 2-4. Each column reads only its own bits.

The file is read whole, once, and cached. ETD's is 29 MB gzipped for 26M
docs; keep rows small.

### `idSpaces.<key>.docValues`: an id per doc from a long list

A value with too many possibilities for a byte, like ETD's 7,648
institutions, gets files of its own:

```ts
docValues: [
  {
    key: 'institution',
    file: 'inst.gz.json',
    gzip: true,
    bytes: 2,
    count: 7648,
    labels: {
      file: 'inst-labels.bin',
      dir: 'inst-labels.dir',
      columns: ['qid', 'label', 'country', 'n_docs'],
    },
    lookup: {
      dir: 'inst-alias.json',
      bin: 'inst-alias.bin',
      normalize:
        'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
      queryFields: ['inst', 'institution'],
    },
  },
];
```

- `file`: one little-endian id per doc, in docId order; 0 for unknown.
  Read whole with the facet rows (ETD's: 4 MB gzipped, 52 MB kept).
- `labels`: one tab-separated line per id, in id order. `dir` has each
  line's u32 offset, for reading a few by Range; ETD's whole file is
  370 KB, so it's read whole.
- `lookup`: the names, spellings and acronyms a query can use. `dir` is
  JSON, `{ buckets: { <first two characters>: [offset, length] } }`, of a
  normalized name; `bin` lines are `name<tab>id,id,…`. A `queryFields`
  value the lookup knows filters by its ids (`inst:mit robotics` is
  robotics theses from MIT); anything else searches the text field as
  usual. The normalization is NFKC then NFKD, accents stripped, lowercase,
  anything but letters, digits and `_` as a space, spaces collapsed, a
  leading "the " dropped.

A facet reads one as a column, `from: { column: 'institution' }`; its
values are ids.

## Search by meaning

```ts
meaning: {
  kind: 'vector', ids: 'vectorDocs', dim: 384,
  files: { naming: 'stamped', built: '2026-10-12 11:31' },
  cells: { count: 16384, centroids: 'centroids.f16', dir: 'cell.dir', rows: 'cells.bin', rowBytes: 772 },
  codes: { file: 'cell-codes.bin', meta: 'cell-codes-meta.json', mustMatch: ['n', 'built', 'dim'], bits: 4, rowBytes: 196 },
  facets: { file: 'cell-facets.bin', meta: 'cell-facets-meta.json', mustMatch: ['n'], stride: 8, gzip: false, columns: [
    { key: 'year',   kind: 'year',  byte: 0, encoding: 1 },
    { key: 'flags',  kind: 'flags', bytes: [1], bits: { oai: 1, ia: 2, … } },
    { key: 'domain', kind: 'code',  byte: 2, width: 2, codes: ['acikbilim.yok.gov.tr', …] },
  ] },
  model: {
    id: 'intfloat/multilingual-e5-small', path: 'Xenova/multilingual-e5-small/',
    dtype: 'q8', queryPrefix: 'query: ', pooling: 'mean', normalize: true,
    library: { name: '@huggingface/transformers', version: '3.0.2' },
  },
  settings: { nprobe: 32, rerank: 400 },
}
```

How it's searched (ETD's engine: [`src/etd/engine/vector/`](../etd/engine/vector/)):
the query is embedded with `model`, scored against every centroid, the
best `nprobe` cells' rows are read and scored (from `codes`, when used),
and the best `rerank` re-scored exactly from `cells.rows`.

| File                   | Holds                                                              |
| ---------------------- | ------------------------------------------------------------------ |
| `cells.centroids`      | one vector per cell, 16-bit floats                                 |
| `cells.dir`            | u32 cumulative row counts: cell k is rows `dir[k]` to `dir[k + 1]` |
| `cells.rows`           | per row, in cell order: a u32 id, then `dim` 16-bit floats         |
| `codes.file`           | optional: the rows again, `bits` a dimension from the centroid     |
| `facets.file`          | optional: a facet row per row, **in row order**, not id order      |
| the id space's records | per id: what a hit shows, and a snippet pair                       |
| `model.path`           | the model's files, in the item                                     |

- **Sidecars.** `codes` and `facets` can be built apart from the rest.
  Each has a small meta, and is used only when the meta's `mustMatch`
  fields equal the search's (`n` rows, `built` stamp, `dim`). A mismatch
  means it's from another build: it's ignored, never an error. Results
  then rank from exact rows, or show without facets. With a versioned
  file set this can't happen.
- **Facet rows in row order** let a scan read a cell's facets with the same
  range arithmetic as its rows. A vector search's facets read only these
  rows, not its id space's.
- **The model block** is what a query must be embedded with to land in the
  stored vectors' space: the same model, dtype, prefix, pooling and
  normalisation, and the same library build, since another build can
  embed differently. `id` says what the model is; `path` where its files
  are (ETD's: `Xenova/…`, not the `intfloat/…` it was made from).
- **The library is named by version only.** The client loads its own
  pinned script for that version (`model.ts`), so an item's JSON never
  chooses code to run on archive.org's pages. A version the client doesn't
  pin fails `checkConfig`.
- **`settings` are the owner's**: they trade recall for bytes read, and
  the owner knows the store's recall. A config can override them, for
  measuring.

Describing ETD's store isn't a recommendation that every item use IVF with
4-bit codes: ETD's reads ~80 MB per search, plus a 135 MB model.

## The config

```ts
const config: StaticItemConfig = {
  baseUrl: 'https://archive.org/download/etd-search/',
  searches: {
    words: {
      identifierPrefix: 'etd-',
      hit: { title: 'title', creators: 'creators', date: 'date', url: 'url' },
      facets: [ … ],
    },
    meaning: {
      identifierPrefix: 'etdv-',
      hit: { title: 'title', date: 'date', url: 'landing' },
      facets: [ … ],
    },
  },
};
```

One entry per search the client shows, by the manifest's key.
`identifierPrefix` makes a hit's identifier: the prefix, then the doc's
1-based position in its id space (`id - firstId + 1`, `identifiers.ts`).
So ETD's first text doc is `etd-1` (ids from 1) and its first vector row
is `etdv-1` (ids from 0), never `etdv-0`. Searches over different id
spaces need different prefixes, or two docs would share one.
`hit` names the record fields a result is made of. `ranking` (text) and
`settings` (vector) override the manifest's.

A text search's facets read its id space's rows and doc values; a vector
search's read its own rows. ETD's vector rows have no `libcat` or
`printed` flags, so its meaning Source facet lists only `oai`, `ia`, `wbm`.

### Facets

Each facet says where its values come from, how they're named, and how
picked values combine:

```ts
{
  key: 'degree', title: 'Degree level', pluralTitle: 'Degree levels',
  after: 'year',                                   // shown after the year group
  from: { column: 'level', unknownAs: 'unknown' }, // docs without one: "Unknown"
  names: { from: 'table', labels: { phd: 'Doctoral', masters: "Master's", … } },
}
```

| `from`                     | A doc's values                     | ETD facet                 |
| -------------------------- | ---------------------------------- | ------------------------- |
| `{ column }`               | the column's code (or `unknownAs`) | language, country, degree |
| `{ column }` (a doc value) | the doc's id                       | institution               |
| `{ flags: [...] }`         | each listed flag it has            | source                    |
| `{ derived: {...} }`       | each value whose rule passes       | availability              |

Derived values are rules over flags: `{ flag }`, `{ anyFlag: [...] }` or
`{ notFlag }`. ETD's availability:

```ts
from: {
  derived: {
    abstract: { flag: 'hasAbstract' },
    archived: { flag: 'complete' },
    saved:    { anyFlag: ['ia', 'wbm', 'archived'] },
    live:     { notFlag: 'ia' },
  },
},
combine: 'all',  // requirements: picking two means both
```

`combine` is `'any'` by default (categories: picking two means either).
collection-browser marks an `'all'` facet's title "(all that apply)".

Names come from a table, or from the browser for ISO codes:

```ts
names: { from: 'table', labels: { oai: 'OAI', ia: 'Internet Archive' } }
names: { from: 'intl', type: 'language', overrides: { ng: 'Ndonga' } }
names: { from: 'intl', type: 'region' }
```

A doc value's names come from its labels file. `whenShared` tells apart
ids with the same label, where there are any ('Heidelberg University (DE)'
and '(US)'):

```ts
names: { from: 'labels', column: 'label', whenShared: 'country' }
```

Values are listed by count. collection-browser's sidebar sorts every facet
that way.

## Checklist for an index builder

- [ ] Publish every file as `<name>.<version>.json` (a `versioned` file
      set with `suffix: '.json'`), and the build's manifest as
      `static-index.<version>.json`.
- [ ] Once the files have landed, copy that manifest to
      `static-index.json` with `previous` set, and only then delete the
      build before `previous`.
- [ ] Fill in the whole manifest in `static-index.json`.
- [ ] Give each set of docs with its own ids its own id space, and mark
      its records' `role`s.
- [ ] For search by meaning: fill in the model block exactly as the
      vectors were made, with a library version the client pins.
- [ ] Keep records fixed-size; put long fields in an overflow pair.
- [ ] Keep facet rows small, and 0 for unknown.
- [ ] Never reuse a flag name or column key for something else; rename
      instead, so `checkConfig` catches clients that use the old one.
- [ ] Check the config against the manifest: `checkConfig(manifest, config)`.

## Known gaps

- **Default config.** Record `role`s are there so an item with no client
  code can be searched, but nothing builds a config from them yet.
- **Reading a manifest.** Neither engine reads `static-index.json`: they
  build their layouts from ETD's metas. Nothing falls back to `previous`
  yet either. The demo's `etd_item=<id>` only
  reads ETD's `current.json`.
- **Facets.** Both engines read facet rows through ETD-specific code
  (`EtdFacetRows`), not `facet-row.ts`.
- **Language names.** collection-browser's own language mapping names a few
  codes the browser's Intl data may not (e.g. `sms`, Skolt Sami, in headless
  Chrome), and misspells one (`uk`, "Ukranian"). ETD's code uses that
  mapping first; the config uses Intl. The parity test lists both causes.
- **Query syntax.** ETD's `year:`, `host:` and `has:` filters aren't
  described. (Its `inst:` lookup is: `docValues[].lookup`.)
- **Linked id spaces.** Re-ranking text results by meaning needs a text
  docId → vector id map. ETD has none, and only the item's owner can build
  one.

## What ETD's owner could publish

None of this is needed for the demo, which works from today's files:

- `static-index.json`: today `etdItemManifest()` builds it client-side.
  Short of that, the model block and settings in `ivf-meta.json`; today
  they're constants in the client.
- The vector store as a versioned file set, as the text index is.
- CORS-readable `.bin` files, so no proxy is needed.
- A text docId → vector id map.
