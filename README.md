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

## Local Demo with `web-dev-server`
```bash
pnpm install
pnpm start
```
To run a local development server that serves the basic demo located in `index.html`

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