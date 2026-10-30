# Static Index Search docs

Search any archive.org item in the browser, with no search server: the item publishes index files, a shared engine reads small slices of them with HTTP Range requests, and collection-browser shows the results.

## Start here

| Doc | What it covers | Read it |
| --- | --- | --- |
| **Overview** | One page: what we have, what changed in collection-browser, whether a collection fits, kinds of search, more sources, building and refreshing an index | [`public/etd/static-index-overview.html`](../../public/etd/static-index-overview.html) · [on the PR preview](https://internetarchive.github.io/iaux-collection-browser/pr/pr-629/etd/static-index-overview.html) |
| **Full proposal** | The case and the decisions, with appendices A–K (costs, search by meaning, index and ranking options, every change, choosing items, the derive step, more sources) | [`public/etd/static-index-search.html`](../../public/etd/static-index-search.html) · [on the PR preview](https://internetarchive.github.io/iaux-collection-browser/pr/pr-629/etd/static-index-search.html) |

The `.html` files are pages, so GitHub shows their source; open them on the PR preview, or run the demo locally and follow its "How it works" link.

## Run it and build an index

| Doc | What it covers |
| --- | --- |
| [Run the demo locally](../../README.md#serverless-search-demo-run-it-locally) | Clone, install, start, and the URLs to open |
| [`tools/static-index/`](../../tools/static-index/README.md) | Export an item's records, build an index, try it locally, upload it to archive.org |

## Code

| Doc | What it covers |
| --- | --- |
| [`src/static-index/README.md`](../../src/static-index/README.md) | The manifest and config types any item uses, and the checker |
| [`src/etd/README.md`](../../src/etd/README.md) | The ETD engine: file layout, ranking, facets, search by meaning, measured costs |

## Internet Archive staff only

These live on claude.ai and are shared inside the Internet Archive organization.

| Doc | What it covers |
| --- | --- |
| [Collection Fit Check](https://claude.ai/artifact/3AGj7wc1JShpWYcWSXp5ah) | A design for checking whether a collection can become a static index |
| [Deriver design](https://claude.ai/artifact/YXrQwfadeMGfhoUukqPgxf) | The petabox derive step that builds an item's index files, with flowcharts |
| [Setup wireframes](https://claude.ai/artifact/146t9Vyoxri6jjBDN2THYU) | The setup form: choose data, check records, fields, results, review |
| [Deriver deck](https://claude.ai/artifact/Q6k7VE1R5xZmp9vZg17RxF) | Slides on the derive step |
