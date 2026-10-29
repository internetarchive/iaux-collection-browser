# ETD search in collection-browser

collection-browser can search the **ETD index**: about 26 million theses and
dissertations, in the [`etd-search`](https://archive.org/details/etd-search)
item. There is no search backend. The search runs **in the browser**, reading
small slices of the index files with HTTP Range requests.

It's a port of the item's own search page,
[`search.html`](https://archive.org/download/etd-search/search.html) ("the
live page" below), split into a reusable engine and a thin adapter.

## Try it

```bash
pnpm start
```

Open https://local.archive.org:8080/?search_service=etd&query=sea%20ice

- Results come from the ETD index, and link to each thesis's own page.
- The panel at the top runs the same search on the live page (in a drawer)
  and shows where the two rankings differ, and why.
- The "Item to search" form, or `&etd_item=<identifier>`, searches another
  archive.org item's static index through `/item-index/<identifier>/`. It
  takes an identifier or a details/download link, typed, pasted or dropped,
  and only switches once the item's `current.json` is in a format the engine
  reads.
- `&etd_base_url=<url>` reads an index from somewhere else.
- "Rank results by", under the results count in the facets column, switches
  between **Words** (text rank) and **Meaning** (vector rank, search by
  meaning; see below). Meaning is kept in the url as `&etd_rank=vec`. It's
  put there through collection-browser's `facets-header-slot`.
- "Facets found in the results", a drawer in the panel, finds facets from
  the matches' own records, with no facet file (`found-facets.ts`). Opened,
  it reads up to 3,000 matches picked at random (all of them when there are
  fewer) and shows the fields whose values repeat, as estimates for every
  match, or exact counts when it read them all. It says why the others
  aren't groups. Read-only: the sidebar's facets still filter.
  - "sea ice", cold: 3,000 of 77,112 in 8.8 s. Repository and decade are
    groups; creators aren't (3,596 values in 3,000 results).
  - "tardigrade": all 120 in 1.3 s.

This only works under `pnpm start`: the index files aren't CORS-readable yet,
so the dev server proxies them at `/etd-index` (see `vite.config.ts`). At
startup it looks up the item's storage server in archive.org's metadata API
and reads from it directly, so requests skip archive.org/download's redirect.
It says which in the terminal (`etd-index: reading from …`); if the lookup
fails it goes through /download, as before.

## The layers

```
<collection-browser>                     asks for pages of hits + facets
        │  SearchServiceInterface
        ▼
EtdSearchService                         src/etd/etd-search-service.ts
  = ServerlessSearchService              src/serverless-search/  (generic)
        │  SearchSource: toRequest, query, toHit
        ▼
EtdSearchSource                          src/etd/etd-search-source.ts
        │  EtdEngine: query(text, filters) → cursor
        ▼
StaticEtdEngine                          src/etd/engine/
        │  HTTP Range reads
        ▼
/etd-index/…  →  archive.org/download/etd-search/…
```

Each layer only knows the one below it:

| Layer                | Knows about                                           | Doesn't know about |
| -------------------- | ----------------------------------------------------- | ------------------ |
| `serverless-search/` | collection-browser's search params, paging, responses | ETD                |
| `etd/` (adapter)     | ETD records, filters, the facet table                 | index files        |
| `etd/engine/`        | the index file format, ranking                        | collection-browser |

So the engine could serve another UI, and `serverless-search` could serve
another in-browser index.

Search by meaning has its own engine, `StaticVectorEngine`
(`src/etd/engine/vector/`), behind the same `EtdEngine` interface. The
adapter takes it with `kind: ETD_VECTOR_SEARCH` (its facets, its identifiers),
so the layers above it are the same.

## How one search runs

1. collection-browser calls `search(params)` for page 1 of hits.
2. `ServerlessSearchService` asks the source to turn the params into a
   request (`etdRequestFromParams`: query text, year range, and facet values,
   turned from the names shown into codes via the facet table). The same
   request reuses a cached query, so later pages don't search again.
3. `StaticEtdEngine.query()`:

   1. parses the query (`query-parser.ts`): words, `"phrases"`,
      `AND`/`OR`/`NOT`, `field:` syntax;
   2. looks every term up in the dictionary, in one request;
   3. reads every posting list it needs, in one request;
   4. scores and ranks the matches (`scorer.ts`), keeping the top 3,000;
   5. drops the matches failing the year and facet filters, before ranking,
      so the total follows the filters (`facets.ts`);
   6. for an unquoted 2-6 word query, moves the theses with the words side by
      side to the top (`phrase-boost.ts`, reading `posfwd`).

   With filters but no words, it lists every thesis passing them instead, in
   docId order (the first 5,000 reachable), as the live page does.

4. Paging reads records for each page: title, creators, date, full URL,
   abstract (`records.ts`), with the query words marked in the abstract
   (`mark-terms.ts`).
5. `etd-response.ts` turns each record into a search hit. Tiles link off
   archive.org (`__href__`) and show the marked abstract as their snippet.
6. collection-browser's facets request counts every facet over every match.

A typical search is 2 requests to rank (plus 6 for the phrase boost) and 2
waves per page of results.

## The index files

All in the `etd-search` item. `current.json` names the live version, and every
other file is `<name>.<version>`, so a rebuild never mixes versions.

| File                       | What it holds                                                                                | Read by          |
| -------------------------- | -------------------------------------------------------------------------------------------- | ---------------- |
| `current.json`             | version, doc count, field weights, feature flags                                             | `index-files.ts` |
| `dict.dir`, `dict.bin`     | term → posting list location, in 65,536 hash buckets                                         | `dictionary.ts`  |
| `postings.bin`             | per term: matching docs, by impact, with word positions                                      | `postings.ts`    |
| `stubs.bin`                | per doc, fixed 320 bytes: title, creators, date, domain, short URL                           | `records.ts`     |
| `url.dir`, `url.bin`       | per doc: the full URL, when the stub's is cut short                                          | `records.ts`     |
| `snip.dir`, `snippets.bin` | per doc: the abstract, deflated JSON                                                         | `records.ts`     |
| `posfwd.dir`, `posfwd.bin` | per doc: each field's complete word list, deflated JSON                                      | `posfwd.ts`      |
| `facets-meta.json`         | facet row layout: year encoding, language and country codes, flag bits, degree levels        | `facets.ts`      |
| `facets.gz.json`           | per doc, 8 bytes: year, flags, domain, language, country, more flags + degree level; gzipped | `facets.ts`      |

`.dir` files are docId-aligned offsets into their `.bin`, so reading any doc's
data is arithmetic plus one range read. Reads are batched into multi-range
requests (`index-files.ts`).

`facets.gz.json` is the one file read whole: 28.7 MB, on the first facets
request or filter, then kept in Cache Storage. Only the bytes the facets read
are kept in memory: year, flags, language, country and the byte with more
flags and the degree level, ~130 MB. So counts and filters cover every match.
The live page shares the same cache entry when it runs on the same origin.

Not read yet: `facets-totals.json` and the details pages' files. The vector
store's files are in "Search by meaning" below.

## Search by meaning (vector rank)

The live page's "Vector rank": the query is turned into 384 numbers in the
browser, with the same model the abstracts were embedded with, and matched
against the abstracts' vectors. It finds theses that mean the same thing in
other words, or other languages. It's a separate search, not a re-sort of the
text results.

The vector store is in the same item, but built on its own (2026-10-12, 18.2M
docs, against the text index's 25.9M). Its docs have their own ids, so its
records, identifiers (`etdv-<n>`) and facets are separate from text rank's.

### How a search by meaning runs

1. The model loads once (`engine/vector/embedder.ts`): transformers.js 3.0.2
   from jsDelivr (pinned, the live page's build), and `multilingual-e5-small`
   (q8, 118 MB, plus a 17 MB tokenizer) from the item itself. It's kept in
   Cache Storage under the live page's cache name and keys, so on one origin
   the two share a download. A file not in the cache is read as 6 Range
   requests at once.
2. The store's centroids (12.6 MB) and cell directory load once, at the same
   time as the model (`scan.ts`, `loadVectorIndex`).
3. The query, prefixed `query: `, becomes a vector (mean pooling, normalised).
4. It's scored against all 16,384 centroids, and the best 32 cells are read
   from `cell-codes.bin` (4-bit codes, 196 bytes a row), 6 requests at a
   time, with a cell over 2 MB split into several. Every row is scored with a
   lookup table, as each read arrives.
5. The best 400 are re-scored exactly from `cells.bin` (one multi-range
   request), and the facet rows of every scanned row are read alongside
   (`cell-facets.bin`).
6. Results are the best 400 that pass the filters. Facets count every
   scanned row that passes them (about 400,000 for a typical query).

**First results before the scan ends.** After 4 cells, or 3 s into the scan
if that comes first, the engine answers with the best 400 of the rows read so
far, by their 4-bit scores. That first answer's `refined` is the final one
(all 32 cells, re-scored, with facets). `ServerlessSearchService` swaps it in
and tells collection-browser (`onResultsChanged`), which fetches the pages it
has loaded and the facets again, in place: the first tiles stay until the
final ones arrive. Facets wait for the final answer. A search with filters
waits for the whole scan, since the filters need every row's facets. The
first answer can look quite different from the final one: the best theses
are often in later cells. `&etd_vec_progressive=0` turns this off. 7. Each page of results reads `docs.bin` and the abstracts (`vsnip`), as
multi-range requests (`vector-records.ts`).

Steps 1-5 run in a Web Worker (`vector-worker.ts`), so the page stays
responsive while 80 MB arrive. The ETD panel shows how it's going. The demo
starts it; without one (or with
`&etd_vec_worker=0`) they run in the page. The model starts loading when
someone points at or tabs to "Meaning", not on every visit.

The ranking is the live page's: the same 32 cells, the same codes and the
same 400 exact re-scores, so the top 50 should be identical. On 2026-10-29
it was for all 5 queries checked ("sea ice", "machine translation for
low-resource languages", "Klimawandel und Landwirtschaft", "deep learning
protein folding", "urban heat island mitigation"), with the same number of
scanned candidates.

### Its files

| File                                       | What it holds                                                              |
| ------------------------------------------ | -------------------------------------------------------------------------- |
| `ivf-meta.json`                            | doc count, cells, vector size, row layouts, build stamp, which files exist |
| `centroids.f16`                            | one vector per cell, 16-bit floats                                         |
| `cell.dir`                                 | cumulative row counts: cell k is rows `dir[k]` to `dir[k+1]`               |
| `cells.bin`                                | per row, in cell order: doc id (u32) and its vector (384 halfs), 772 bytes |
| `cell-codes.bin`, `cell-codes-meta.json`   | the same rows, each dimension's difference from its centroid in 4 bits     |
| `cell-facets.bin`, `cell-facets-meta.json` | per row: year, flags, repository; 8 bytes; repository names in the meta    |
| `docs.bin`                                 | per doc id: title, host, date, landing url, language; 308 bytes            |
| `vsnip.dir`, `vsnip.bin`                   | per doc id: the abstract, deflated JSON, as `snippets.bin`                 |
| `Xenova/multilingual-e5-small/…`           | the model                                                                  |

These aren't versioned like the text index's: the names are fixed, and
`?v=<build stamp>` keys the browser cache to the build. A metas file whose
`n` (or for the codes, build stamp and size) doesn't match `ivf-meta.json` is
ignored, as on the live page, and the search goes on without it.

### Facets

The store's facet rows only have the year, the flags and the repository
host, so vector rank has Year, Repository, Source and Availability
(`etd-vector-facets.ts`). Source and Availability are the text table's
entries. Repository is new: the landing page's host. The live page calls it
"Institution", but it isn't the institution list.

### The compare panel

Under Meaning, the panel compares on request (a button), not on every search:
the live page's own search by meaning reads ~80 MB more, which would also skew
this page's timings. It drives the live page's `setMode('vec')` and
`vecRun()`, and reads `lastVec` and `lastVecCand`.

### Measuring

`&etd_compare=0` leaves the compare panel (and the live page's iframe) out.
`&etd_vec_parallel=<n>` and `&etd_model_parallel=<n>` set how many cell and
model reads are in flight (`1` reads the model as one stream, as the live
page does). `&etd_vec_progressive=0` waits for the whole scan
before showing results. The status line under the switch gives the time per step, bytes
and requests.

archive.org lets the browser keep range reads for 6 hours, so a second run
on the same origin isn't cold. Each `<name>.localhost` is a separate site,
with its own cache: `http://cold1.localhost:<port>/…` is a cold start.

Measured 2026-10-29 in the built-in browser, through a plain-http copy of the
dev proxy pointed at the storage server (archive.org's `/download` redirect
was returning 502s that day), one run each, each cold run on a fresh site.
Network speed varied a lot that day (one 16 MB range: 2-12 s), so take these
as one sample, not a benchmark.

| Run                                                      | Live page      | Ours           | Ours, live page's settings¹ |
| -------------------------------------------------------- | -------------- | -------------- | --------------------------- |
| Cold "sea ice" (model, centroids, cells all uncached)    | 53.6 s         | 27.2 s         | 49.1 s                      |
| – of which the model and centroids                       | ~42 s²         | 17.6 s         | 35.1 s                      |
| – of which the 32 cells                                  | ~11 s          | 7.9 s          | 12.8 s                      |
| Warm "machine translation for low-resource languages"    | 18.4 s         | 14.6 s         | 19.3 s                      |
| – of which the 32 cells                                  |                | 6.5 s          | 14.4 s                      |
| Bytes read, cold / warm (not counting the 135 MB model)³ | 80.0 / 86.8 MB | 83.4 / 92.5 MB | same as ours                |

1. `&etd_model_parallel=1&etd_vec_parallel=4`: the model as one stream, 4
   cell reads at a time. That this is about as slow as the live page is the
   check that the speed-up comes from reading in parallel, not from the setup.
2. Its model starts only once the store has loaded (8.7 s in), then
   streams 118 MB in 34 s.
3. Ours reads the facet rows (3-4 MB) during the search; the live page reads
   them after showing results. Both read the same cells.

The embedding itself is 40-170 ms. A warm search still spends 3-6 s on the
model: reading 135 MB back from Cache Storage and starting ONNX.

For scale, the hub session measured the live page straight from archive.org
(no proxy) the same day at 128 s cold and 43 s warm. Through the proxy the
browser's reads each get their own upstream connection, which helps both
pages. In production the storage server speaks HTTP/2, so the browser may put
parallel reads on one connection, and the gain from reading in parallel may
be smaller there. That can't be measured through the dev proxy.

## Ranking, briefly

- Each term is searched in the title (`t:`), creators (`c:`), abstract
  (`a:`), institution (`i:`) and ORCID (`o:`), each field weighted
  differently. The weights live in `scorer.ts`.
- A doc matching several query words in the same field gets a boost, and
  more if the words are near each other.
- The index keeps only the strongest postings for very common words, so totals
  past 10,000 are marked approximate (`~77,112`).
- Then the phrase boost re-orders the top 200 for plain multi-word queries.

The goal is the same ranking as the live page. The compare panel checks that.

## Facets

ETD's facets are one table, `src/etd/etd-facets.ts`. Each entry says how to
read the facet from a thesis's facet row, how collection-browser shows it, how
its values are named, and how picked values combine:

| Facet        | Read from         | Values                                                                                                | Picked values   |
| ------------ | ----------------- | ----------------------------------------------------------------------------------------------------- | --------------- |
| Language     | language byte     | names from collection-browser's mapping, then the browser's                                           | any of them     |
| Country      | country byte      | names from the browser (`Intl.DisplayNames`)                                                          | any of them     |
| Institution  | institution files | names from the index's institution list; the country added where two share a name                     | any of them     |
| Degree level | degree level bits | Doctoral, Master's, Bachelor's, Other, Unknown                                                        | any of them     |
| Source       | flag bits         | OAI, Internet Archive, Wayback Machine, Library catalog, Printed abstracts; a thesis can have several | any of them     |
| Availability | flag bits         | Has abstract, Archived (whole thesis), Document saved, Has live link                                  | **all** of them |

Year isn't in the table: it's the date picker.

The institution isn't in the facet row. The index has a list of 7,648
institutions in files of its own (`engine/institutions.ts`):

- `inst.gz.json`: each thesis's institution id, read whole with the facet
  rows (4 MB gzipped, 52 MB kept).
- `inst-labels.bin`: each id's name and country, read whole (370 KB). Its
  values are these names, not codes, since there's no fixed table to map
  codes through. A name two institutions share gets the country added,
  e.g. "Heidelberg University (DE)" and "(US)".
- `inst-alias.json` and `inst-alias.bin`: the names, spellings and acronyms
  each institution goes by, for `inst:`. One Range read per name.

`inst:` and `institution:` look the name up there first, as the live page
does. A name the list knows filters by its institutions, ANDed with the
words: `inst:mit robotics` is robotics theses from MIT, and `NOT inst:mit`
leaves MIT out. Any other name is searched as text in the institution
field, with the expansions in `query-parser.ts`. An index without
`inst-meta.json` has no Institution facet, and `inst:` is all text.

Each layer uses the table without knowing a facet by name:

- **The engine** is handed the table's readers (`facets` in
  `StaticEtdEngine`), counts every facet over the matches and filters by any
  of them. It reads codes (`en`, `phd`, `oai`), not names.
- **The adapter** builds each facet's aggregation (names, by count) and maps
  collection-browser's picks (names) back to codes.
- **collection-browser** gets the facets the generic way: the source declares
  them (`facets`, `listsWithoutQuery` on `SearchSource`), and
  `ServerlessSearchService` exposes `extraFacetGroups` (the facets
  collection-browser doesn't have) and `allowFilterOnlySearch`. The demo
  passes both to `<collection-browser>` for whatever search service it has.
  An "all" facet's title says "(all that apply)".

To add a facet, add an entry to the table. If it reads a part of the row the
engine doesn't keep yet, keep that byte too (`keepBytes` in
`engine/facets.ts`). Then check its counts against the live page's facet
panel for a few queries.

Values are listed by count, as collection-browser's sidebar sorts every facet.
The live page lists degree level in a fixed order instead. Values with the
same count are listed by name here, and by id (most theses overall first)
on the live page.

## Building on it

### Change the engine

Most features are a port of a function in the live page. The engine's file
comments name the function each part came from (e.g. `phraseBoost`).

1. Find the function in the live page:
   `curl -sL https://archive.org/download/etd-search/search.html`.
2. Port it into `src/etd/engine/`, next to the closest existing part.
3. Test it against the fixture index (below).
4. Check it against the live page in the compare panel.

### Test with the fixture index

`test/etd/engine/fixture-index.ts` builds a small index in memory, in the real
file format, and serves it through a fake `fetch` that honors Range headers.
Engine tests use it, e.g.:

```ts
const index = await buildFixtureIndex([
  { title: 'Sea ice drift', creators: 'Okafor, Ada', abstract: '…' },
]);
const engine = new StaticEtdEngine({
  baseUrl: FIXTURE_BASE,
  fetch: index.fetch,
  cacheFacets: false, // every fixture index has the same URLs
  facets: ETD_FACETS,
});
```

A fixture thesis can give its `date`, `language`, `country`, `level` and
`flags` (by name, e.g. `['oai', 'hasAbstract']`) for the facet rows.

`index.requests` lists every request made, and `index.failNext('posfwd.bin')`
makes one fail.

### Check against the live page

The demo's compare panel (`src/etd/compare/`) runs each search on the live
page too, in a same-origin iframe through the proxy, and reads its ranking:

- **As the live page shows them**: should be ✅ for every plain query.
- **Before the live page's re-ranking**: differs for 2-6 word queries, by
  design.
- The table's **Why** column says where a missing result went on the other
  side.
- **Hidden by re-ranking** lists what the phrase boost pushed out of the top
  and pulled in, with its rank before and after, and why: whether the words
  sit side by side, and in which field (`EtdQuery.boost`).

The panel reads the live page's internals (`run`, `lastAll`, `phraseBoost`),
so a live page rebuild can break it. It says so when that happens.

### Add another in-browser search

To describe another item's index generically (a manifest it publishes, a
config the client holds), see
[`src/static-index/README.md`](../static-index/README.md).
`etd-static-index.ts` describes ETD that way, and its tests hold the
description to this folder's code.

`serverless-search/` is generic. To plug in another index:

1. Implement `SearchSource<Request, Record>` (`search-source.ts`): turn
   `SearchParams` into your request, run it as a forward-only cursor, and turn
   records into hit JSON.
2. Subclass `ServerlessSearchService` with your source, like
   `EtdSearchService`.
3. Declare its facets (`facets`: key, titles, combine) and whether it can
   list matches without a query (`listsWithoutQuery`).
4. Pass it to `<collection-browser>` as `searchService`, with its
   `extraFacetGroups` and `allowFilterOnlySearch`. Set `baseNavigationUrl` to
   `''` if your hits link off archive.org.

Paging, caching and error mapping come with `ServerlessSearchService`.
A source can answer early and better later: a query's `refined` resolves
with the better answer, the service serves it from then on, and
collection-browser re-fetches what it shows (`onResultsChanged`,
`refreshResults()`).

## Not ported yet

| Live page feature                             | What happens here instead                                    |
| --------------------------------------------- | ------------------------------------------------------------ |
| Repository (domain) facet                     | Not shown yet: one table entry, reading bytes 2-3 of the row |
| A facet ticked when its `inst:` is in the box | `inst:mit` filters, but leaves MIT unticked in the facet     |
| Quoted phrases checked as adjacent            | Words only have to be near each other                        |
| `field:` filters (`year:`, `host:`, `has:`…)  | Error                                                        |
| Vector rank: results after every cell         | First results after 4 cells or 3 s, then the final ones once |
| Vector rank: re-ranking text results          | Not available (needs a text docId → vector id map)           |
| Vector rank: the per-cell code cache          | Not kept: the browser's own cache keeps reads for 6 hours    |
| Showing results before the phrase boost lands | Results wait for the boost (up to 15 s)                      |

## Things that will trip you up

- **CORS.** archive.org only allows cross-origin reads of some file types
  (`.json`, `.txt`), so the versioned index files need the dev proxy. Fixing
  that needs the item's owner or archive.org.
- **archive.org errors.** Every read retries a 502, 503 or 504, or a request
  with no answer, twice (after ~0.5 s, then ~1.5 s), in `retrying-fetch.ts`.
  A 4xx or a 500 isn't retried: they're answers, and test fixtures use a 500
  for a read that fails. A connection lost mid-download isn't retried.
  - What shows: the vector status line counts retries ("2 retried after an
    error") for the model download and for the search, whose count includes
    loading the store. Text search shows no count; it's only slower.
  - When the retries run out, the error keeps its status (`HttpError`, also
    across the worker), and `ServerlessSearchService` reports a 5xx or no
    answer as a network error. collection-browser then says "The search
    service didn't answer. Please try again in a moment." (`'service-error'`)
    instead of blaming the query.
  - A model file that still fails fails the model load, rather than
    transformers.js trying it once more without retries. That's with
    parallel downloads (the default); with `etd_model_parallel=1`,
    transformers.js fetches the files itself, without retries.
- **Stale `dist/`.** Tests run from `dist/`, so a deleted test can still run.
  `rm -rf dist` before trusting a test count.
- **Two copies of `iaux-item-metadata`.** search-service has its own, so its
  `StringField` type differs from this package's. See `LinkedItemHit` in
  `source-response.ts`.
- **`LinkedItemHit`** adds `__href__` and `highlight` to `ItemHit`, which
  search-service 2.7.2 lacks. Remove it once search-service has them.
