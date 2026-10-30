![Build Status](https://github.com/internetarchive/iaux-collection-browser/actions/workflows/ci.yml/badge.svg) [![codecov](https://codecov.io/gh/internetarchive/iaux-collection-browser/branch/main/graph/badge.svg?token=CLWEGO4RMQ)](https://codecov.io/gh/internetarchive/iaux-collection-browser)


# Internet Archive Collection Browser

This is the main collection browser for the Internet Archive website.

[Review app URL](https://internetarchive.github.io/iaux-collection-browser/main) 
## Usage

```ts
import '@internetarchive/collection-browser';

<collection-browser>
</collection-browser>
```

## Local Demo with Vite
```bash
pnpm install
pnpm start
```
To run a local development server that serves the basic demo located in `index.html`

## Serverless search demo: run it locally

Searches archive.org items in the browser, with no search server: `etd-search` (25.9 million theses) and `dl-search` (Democracy's Library, about 1.2 million government publications). What it is and why: [docs/static-index](docs/static-index/README.md).

You need git, Node 22 or later, and pnpm 11 (`corepack enable` installs it).

1. Get the branch:
   ```bash
   git clone https://github.com/internetarchive/iaux-collection-browser.git
   cd iaux-collection-browser
   git checkout etd-search-adapter
   ```
2. Point `local.archive.org` at your own computer, once. The dev server runs on that name. Add this line to `/etc/hosts` (on macOS or Linux: `sudo nano /etc/hosts`):
   ```
   127.0.0.1 local.archive.org
   ```
3. Install and start:
   ```bash
   pnpm install
   pnpm start
   ```
4. Open the demo. The dev server uses a self-signed certificate, so the browser warns the first time: choose to continue to the site.
   - etd-search, "sea ice": [https://local.archive.org:8080/?search_service=etd&query=sea%20ice](https://local.archive.org:8080/?search_service=etd&query=sea%20ice)
   - Democracy's Library, "census": [https://local.archive.org:8080/?search_service=etd&etd_item=dl-search&query=census](https://local.archive.org:8080/?search_service=etd&etd_item=dl-search&query=census)

   If port 8080 is taken, Vite prints the port it used instead.

**Without the certificate warning:** run the same demo over plain HTTP instead, at `http://localhost:8080/?search_service=etd`:
```bash
pnpm exec vite --config tools/static-index/vite.http.config.ts
```

**Search by meaning** (the "Meaning" option, etd-search only) downloads a 135 MB language model the first time, then caches it.

**Why a dev server:** etd-search's index files don't end in an extension archive.org lets other websites read (CORS), so the dev server fetches them at `/etd-index/` and `/item-index/<id>/`. dl-search's files end in `.json`, so a page anywhere can read them directly: the PR preview searches it with `&etd_base_url=https://archive.org/download/dl-search/`.

**Build your own index:** [tools/static-index](tools/static-index/README.md).

### More about the ETD search demo

[https://local.archive.org:8080/?search_service=etd](https://local.archive.org:8080/?search_service=etd) swaps archive.org search for the
theses & dissertations index from the `etd-search` item, searched in the browser with no backend.
The index files aren't CORS-readable yet, so the dev server proxies them at `/etd-index`. This only
works under `pnpm start`; the gh-pages demo has no proxy. Add `&etd_base_url=<url>` to read an index
from somewhere else. The demo's search controls start hidden in this mode (Toggle Search Controls
shows them); search from the box at the top instead.

Each search also runs on the live etd-search page (in a drawer), and a panel shows how the two
rankings differ: totals, top-N overlap, and each result that moved or only one side has.

It can also search by filters alone, with no query (collection-browser's `allowFilterOnlySearch`),
e.g. `&and[]=year:[2000 TO 2009]`; the "Or browse" links start one.

How it works, and how to build on it: [src/etd/README.md](src/etd/README.md).

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
pnpm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
pnpm run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
pnpm run lint
```

To automatically fix many linting errors, run
```bash
pnpm run format
```

## Localization

Wrap user-facing text in `msg()` from `@lit/localize`, inside `render()` or a getter it calls. The first argument has to be a literal: a string, `` str`...${x}` `` when it has an expression, or `` html`...` `` when it has markup. A `msg()` that runs at module scope or in a static field resolves once at import, so it never changes language. A string that has to live outside `render()` goes in a getter, static or not, so it's read at render time.

Every component that renders a `msg()` string, directly or through a helper, needs `@localized()` from `@lit/localize`. Without it the component doesn't re-render when the app switches locale.

This package never calls `configureLocalization`. `@lit/localize` can only be configured once per page, so the app owns that call and loads one bundle holding its own messages and ours. We publish our translations for the app to merge in:

```bash
pnpm run strings:extract   # add new msg() strings to xliff/<locale>.xlf
# translate the empty <target>s in xliff/<locale>.xlf
pnpm run strings:build     # write src/locales/<locale>.ts
```

Commit all three: the XLIFF, the generated module and the source change.

### What gets published

`@internetarchive/collection-browser/locales/<locale>.js` exports `templates`, the same shape `lit-localize build` writes in runtime mode: an object keyed by message id (a hash of the English source) whose values are what `loadLocale` returns. It only holds messages that have a translation. A message with no translation is left out instead of falling back to English, so merging it can never override another package's or the app's translation of the same text.

That path is a stub in `locales/` at the package root that re-exports `dist/src/locales/<locale>.js`. The package has no `exports` map, so a deep import resolves to a real file, and adding a map would break every other deep import. A new locale needs its own pair of stubs (`.js` and `.d.ts`).

To merge it, an app spreads it under its own templates, app last so the app wins a conflict:

```ts
import { templates as collectionBrowser } from '@internetarchive/collection-browser/locales/es.js';
import { templates as app } from './app-es';

export const templates = { ...collectionBrowser, ...app };
```

The XLIFF in `xliff/` is where translations are edited. It isn't published.

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Manual Deploy using `gh-pages`

Live demo app from current main branch: [https://internetarchive.github.io/iaux-collection-browser](https://internetarchive.github.io/iaux-collection-browser)

```
pnpm run deploy
```

## Automatic Deploy of Demo App

When you create a Pull Request, if your code passes codecov unit tests, it will be always served live at base url / pull request number. For this demo app, you must create a Pull Request, nothing will be created from a simple branch.

This URL will be removed when the Pull Request is merged/closed.

Example: `https://internetarchive.github.io/iaux-collection-browser/pr/<pr-number>`