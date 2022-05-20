![Build Status](https://github.com/internetarchive/iaux-collection-browser/actions/workflows/ci.yml/badge.svg)

# Internet Archive Collection Browser

This is the main collection browser for the Internet Archive website.

## Usage

```ts
import '@internetarchive/collection-browser';

<collection-browser>
</collection-browser>
```

## Local Demo with `vite`
```bash
npm install
npm start
```
To run a local development server that serves the basic demo located in `index.html`

## Testing with Web Test Runner
To run the suite of Web Test Runner tests, run
```bash
npm run test
```

To run the tests in watch mode (for &lt;abbr title=&#34;test driven development&#34;&gt;TDD&lt;/abbr&gt;, for example), run

```bash
npm run test:watch
```

## Linting with ESLint, Prettier, and Types
To scan the project for linting errors, run
```bash
npm run lint
```

You can lint with ESLint and Prettier individually as well
```bash
npm run lint:eslint
```
```bash
npm run lint:prettier
```

To automatically fix many linting errors, run
```bash
npm run format
```

You can format using ESLint and Prettier individually as well
```bash
npm run format:eslint
```
```bash
npm run format:prettier
```

## Tooling configs

For most of the tools, the configuration is in the `package.json` to reduce the amount of files in your project.

If you customize the configuration a lot, you can consider moving them to individual files.

## Deploying using `gh-pages`

```
npm run deploy -- -e <branch_name>
```