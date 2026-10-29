# Make an item searchable in the browser

An archive.org item can be searched with **no search backend**: it publishes
a prebuilt index as ordinary files, and the browser searches it by reading
small slices of them with HTTP Range requests. The ETD theses search
([`src/etd/`](../etd/README.md)) works this way over 26 million records.

This folder describes such an index generically, so the next item doesn't
need its own engine:

| File              | What it is                                                     |
| ----------------- | -------------------------------------------------------------- |
| `manifest.ts`     | the types: `StaticIndexManifest` and `StaticSearchConfig`      |
| `check-config.ts` | `checkConfig`: every name a config uses exists in the manifest |
| `facet-row.ts`    | reading a doc's facet values and names from the two            |

**Status.** The types describe ETD, and tests hold that description to
today's ETD code (`src/etd/etd-static-index.ts`). The engine doesn't read a
manifest yet: it still has ETD's layout built in. Making it read one is the
next step.

## Two halves

```
 published by the item                 held by the client
┌──────────────────────────┐          ┌──────────────────────────┐
│ manifest                 │          │ config                   │
│ what's in the files:     │◀─────────│ how to search and show:  │
│ fields, record layout,   │  names   │ hit fields, facets,      │
│ facet columns, ranking   │ checked  │ names, ranking overrides │
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
- facet availability: no flag "hasAbstract"
- hit date: no record field "date"
```

## The files an item publishes

All in the item, next to each other. Every file but `current.json` is
published as `<name>.<version>`, so a rebuild never mixes two builds' files.

| File                      | Holds                                                         |
| ------------------------- | ------------------------------------------------------------- |
| `current.json`            | the manifest; names the live version                          |
| `dict.dir`, `dict.bin`    | term → posting list location, hashed into buckets             |
| `postings.bin`            | per term: matching docs by impact, with word positions        |
| `stubs.bin`               | per doc, a fixed-size record: what a hit shows                |
| overflow `.dir` + `.bin`  | per doc, a field too long for the record (ETD: the full url)  |
| snippet `.dir` + `.bin`   | per doc, the snippet text, deflated JSON (ETD: the abstract)  |
| `posfwd.dir`, `posfwd.bin` | optional: each doc's word list per field, for phrases        |
| facet rows                | optional: per doc, a fixed-size row of facet bytes            |
| doc values                | optional: per doc, an id from a long list, with its labels    |

A `.dir` is docId-aligned offsets into its `.bin`, so reading one doc's
data is arithmetic plus one Range read.

Today ETD's `current.json`, `facets-meta.json` and `inst-meta.json` hold
about half of the manifest; `etdManifest()` fills in the rest. A new item would publish the
whole manifest.

## The manifest, field by field

Using ETD's values as the example.

### Top level

| Field                     | ETD                 | Meaning                                    |
| ------------------------- | ------------------- | ------------------------------------------ |
| `format`, `formatVersion` | `'ia-static-index'`, 1 | what reads it; checked                  |
| `version`                 | `'20261026-5e5902'` | suffix on every file name                  |
| `docCount`                | 25,860,159          | docIds run 1..docCount                     |
| `positions`               | `true`              | `posfwd` files exist                       |

### `text`: the searchable fields

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

### `records`: what a hit shows

```ts
records: {
  bytes: 320,
  fields: [
    { key: 'title', start: 0, end: 150 },
    { key: 'creators', start: 150, end: 198 },
    // … date, domain
    { key: 'url', start: 232, end: 320 },
  ],
  overflow: [{ field: 'url', dir: 'url.dir', bin: 'url.bin' }],
  snippet: { field: 'abstract', dir: 'snip.dir', bin: 'snippets.bin' },
}
```

Each field is NUL-padded UTF-8 at fixed byte offsets (end exclusive). A
field that can be cut short also goes in an `overflow` pair, whole.

### `facets`: one row of bytes per doc

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

| Kind     | Reads                                     | Unknown       |
| -------- | ----------------------------------------- | ------------- |
| `code`   | byte n → `codes[n - 1]`                   | byte 0        |
| `year`   | encoding 1: 1900 + byte; encoding 2: 1700s-1890s by decade, then years | byte 0 |
| `flags`  | named bits; `bytes` low to high, 8 bits each | —          |
| `packed` | `(byte >> shift) & mask` → a code's number | no code for it |

One byte can hold two columns: ETD's byte 6 has flag bits 0-1 and the
degree level in bits 2-4. Each column reads only its own bits.

The file is read whole, once, and cached. ETD's is 29 MB gzipped for 26M
docs; keep rows small.

### `docValues`: an id per doc from a long list

A value with too many possibilities for a byte, like ETD's 7,648
institutions, gets files of its own:

```ts
docValues: [{
  key: 'institution',
  file: 'inst.gz.json', gzip: true, bytes: 2, count: 7648,
  labels: { file: 'inst-labels.bin', dir: 'inst-labels.dir',
            columns: ['qid', 'label', 'country', 'n_docs'] },
  lookup: { dir: 'inst-alias.json', bin: 'inst-alias.bin',
            normalize: 'nfkd-strip-marks-casefold-nonword-to-space-collapse-drop-leading-the',
            queryFields: ['inst', 'institution'] },
}]
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

## The config

```ts
const config: StaticSearchConfig = {
  baseUrl: 'https://archive.org/download/etd-search/',
  hit: { title: 'title', creators: 'creators', date: 'date', url: 'url' },
  facets: [ … ],
};
```

`hit` names the record fields a result is made of. `ranking` (optional)
overrides the manifest's.

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

| `from`                  | A doc's values                       | ETD facet            |
| ----------------------- | ------------------------------------ | -------------------- |
| `{ column }`            | the column's code (or `unknownAs`)   | language, country, degree |
| `{ column }` (a doc value) | the doc's id                      | institution          |
| `{ flags: [...] }`      | each listed flag it has              | source               |
| `{ derived: {...} }`    | each value whose rule passes         | availability         |

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

- [ ] Publish every file as `<name>.<version>`, and `current.json` **last**,
      so it never names a version still uploading.
- [ ] Fill in the whole manifest in `current.json`.
- [ ] Keep records fixed-size; put long fields in an overflow pair.
- [ ] Keep facet rows small, and 0 for unknown.
- [ ] Never reuse a flag name or column key for something else; rename
      instead, so `checkConfig` catches clients that use the old one.
- [ ] Serve the files CORS-readable. (ETD's aren't yet; its demo proxies
      them.)
- [ ] Check the config against the manifest: `checkConfig(manifest, config)`.

## Known gaps

- **Two-byte columns.** ETD's repository domain is a 16-bit index (bytes
  2-3); no column kind reads two bytes yet, so `etdManifest` leaves it out.
- **Language names.** collection-browser's own language mapping names a few
  codes the browser's Intl data may not (e.g. `sms`, Skolt Sami, in headless
  Chrome), and misspells one (`uk`, "Ukranian"). ETD's code uses that
  mapping first; the config uses Intl. The parity test lists both causes.
- **Query syntax.** ETD's `year:`, `host:` and `has:` filters aren't
  described. (Its `inst:` lookup is: `docValues[].lookup`.)

## To evaluate: vector search

ETD's live page also ranks by meaning (a vector store, `ivf-meta.json` and
its cells). It isn't ported or described here on purpose: before writing a
type for it, we want to evaluate whether its approach is the one to
recommend for rich searches over items like this, or whether something
simpler works.
