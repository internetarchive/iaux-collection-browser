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

### ETD search demo

[https://local.archive.org:8080/?search_service=etd](https://local.archive.org:8080/?search_service=etd) swaps archive.org search for the
theses & dissertations index from the `etd-search` item, searched in the browser with no backend.
The index files aren't CORS-readable yet, so the dev server proxies them at `/etd-index`. This only
works under `pnpm start`; the gh-pages demo has no proxy. Add `&etd_base_url=<url>` to read an index
from somewhere else.

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