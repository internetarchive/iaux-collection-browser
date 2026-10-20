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

## Pinch zoom (prototype)

Set the `enable-pinch-zoom` attribute (or `enablePinchZoom`) on `<collection-browser>` to let viewers zoom the tile grid, Apple Photos style. It's off by default and only applies to the grid display mode.

- Pinch on a touch screen or a trackpad, or press ctrl/cmd + and - while the pointer is over the grid.
- A slider next to the display mode buttons does the same thing.
- The grid snaps to 1, 2, 3, 4, 6, 8 or 12 columns. The densest levels show only thumbnails.
- The chosen level is remembered in `localStorage`.

In the demo app, tick "Enable pinch zoom (prototype)" or add `?pinchZoom` to the URL.

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