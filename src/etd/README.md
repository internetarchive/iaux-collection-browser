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

This only works under `pnpm start`: the index files aren't CORS-readable yet,
so the dev server proxies them at `/etd-index` (see `vite.config.ts`).

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

Not read yet: the other facet files (`facets-totals.json`, `inst-meta.json`),
the details pages' files, and the vector store (`ivf-meta.json` and its
cells). See "Not ported yet".

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

## Not ported yet

| Live page feature                             | What happens here instead                                    |
| --------------------------------------------- | ------------------------------------------------------------ |
| Repository (domain) facet                     | Not shown yet: one table entry, reading bytes 2-3 of the row |
| A facet ticked when its `inst:` is in the box | `inst:mit` filters, but leaves MIT unticked in the facet     |
| Quoted phrases checked as adjacent            | Words only have to be near each other                        |
| `field:` filters (`year:`, `host:`, `has:`…)  | Error                                                        |
| Vector rank (semantic search)                 | Not available                                                |
| Showing results before the phrase boost lands | Results wait for the boost (up to 15 s)                      |

## Things that will trip you up

- **CORS.** archive.org only allows cross-origin reads of some file types
  (`.json`, `.txt`), so the versioned index files need the dev proxy. Fixing
  that needs the item's owner or archive.org.
- **Stale `dist/`.** Tests run from `dist/`, so a deleted test can still run.
  `rm -rf dist` before trusting a test count.
- **Two copies of `iaux-item-metadata`.** search-service has its own, so its
  `StringField` type differs from this package's. See `LinkedItemHit` in
  `source-response.ts`.
- **`LinkedItemHit`** adds `__href__` and `highlight` to `ItemHit`, which
  search-service 2.7.2 lacks. Remove it once search-service has them.
