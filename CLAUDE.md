# CLAUDE.md

The collection browser for archive.org, published as
`@internetarchive/collection-browser`. See [README.md](README.md) for usage and
the demo.

Node 22+ and pnpm 11+. Use pnpm, never npm or yarn.

```zsh
pnpm install
pnpm start          # the demo in index.html, on the vite dev server
pnpm run test       # tsc, then lint, then madge, then web-test-runner
pnpm run typecheck  # tsc --noEmit
pnpm run lint       # eslint + prettier --check
pnpm run format     # eslint --fix + prettier --write
```

`pnpm run test` is four tools, and the first three fail before a single test
runs. If you only want to know whether the code compiles and reads clean, run
`typecheck` and `lint` directly. That's much faster than finding out from CI.

Tests run against compiled output, not source: `tsc` writes `dist/`, then
web-test-runner picks up `dist/test/**/*.test.js`. A stale `dist` is the usual
reason a test result doesn't match the source in front of you.

CI is a single `build` job running `pnpm run test` plus codecov.

## pnpm-workspace.yaml

Three settings in there cause confusion if you meet them cold. The file explains
each one, but in short:

- `nodeLinker: isolated`. This package only sees what it declares, so an
  undeclared import fails here instead of in a consumer whose tree happens to
  hoist it.
- `minimumReleaseAge: 20160`. A 14 day supply-chain cooldown (WEBDEV-8544). It
  applies when the lockfile changes, so `pnpm add` can refuse a version that's
  too fresh. CI's `--frozen-lockfile` just reproduces the lockfile and never
  hits the gate.
- `overrides: '@types/chai': ^4.3.20`. `@open-wc/testing` pulls two `@types/chai`
  majors through its own deps, and `isolated` keeps both, so `tsc` sees
  duplicate globals. Its `index.d.ts` needs v4's default export.

## Publishing

Publishing is driven entirely by **GitHub Releases**. Publishing a release fires
[.github/workflows/npm-publish.yml](.github/workflows/npm-publish.yml), which
runs the tests and then publishes to npm.

Never run `npm publish` by hand. The workflow uses npm trusted publishing over
OIDC and there's no npm token anywhere, so a publish can only come from the
workflow. A hand publish also lands with no provenance attestation, which is how
you tell the two apart afterwards:

```zsh
curl -s https://registry.npmjs.org/@internetarchive%2Fcollection-browser/<version> \
  | python3 -c "import json,sys; print('provenance:', bool(json.load(sys.stdin)['dist'].get('attestations')))"
```

Only `dist` ships (WEBDEV-8862). `package.json` has
`"files": ["dist", "!dist/test"]`, so the compiled library goes out and the
compiled tests don't.

### The prerelease flag picks the dist-tag

That's the whole mechanism, and it's the part most easily gotten wrong:

| How the release is published | What the workflow runs                 | dist-tag |
| ---------------------------- | -------------------------------------- | -------- |
| Set as a pre-release         | `npm publish --provenance --tag alpha` | `alpha`  |
| Set as the latest release    | `npm publish --provenance`             | `latest` |

`latest` is what every unpinned or caret install resolves to. Publishing a
release without the prerelease flag set puts that code in front of offshoot and
everything else that depends on this, so the flag isn't cosmetic.

### The version comes from package.json, not the tag

The workflow bumps nothing. It checks out the released commit and publishes
whatever `package.json` says, so the tag name and the version have to agree.

Always bump with `pnpm version`, which edits `package.json`, commits, and creates
the matching tag in one step. The commit message is the bare version (`4.9.0`)
while the tag carries a `v` prefix (`v4.9.0`) from npm's default
`tag-version-prefix`. Never hand-write a tag.

### Prerelease, from a feature branch

Prereleases exist so a consumer (offshoot, petabox) can pin real code from an
unmerged branch. Use the ticket key as the preid:

```zsh
pnpm version prerelease --preid=webdev-1234   # 4.8.0 -> 4.8.1-webdev-1234.0
git push && git push --tags
gh release create v4.8.1-webdev-1234.0 \
  --prerelease \
  --title v4.8.1-webdev-1234.0 \
  --notes "Prerelease of <what> for <consumer>. From PR #NN, not yet merged."
```

Re-running the same `pnpm version prerelease --preid=webdev-1234` bumps the
counter (`.0` to `.1`), so a second round is the same three commands again.

The consumer pins the exact version, never a range:

```json
"@internetarchive/collection-browser": "4.8.1-webdev-1234.0"
```

### Release, from main only

**A final version only ever comes off `main`.** A feature branch may publish a
prerelease and nothing else. A final is what `latest` points at, so it comes from
merged, reviewed code or not at all.

The version bump is its own PR, titled after the version (`v4.8.0 (#614)`), so
`package.json` already carries the new number by the time it lands on `main`.
Don't run `pnpm version` on `main`: that would bump a second time and push an
unreviewed commit. Once the bump PR has merged, tag its squash commit and cut the
release from that tag:

```zsh
git checkout main && git pull
git tag v4.9.0 && git push origin v4.9.0
gh release create v4.9.0 --latest --generate-notes --title v4.9.0
```

Publishing the release is what triggers `npm-publish.yml`, so nothing gets run by
hand after this.

### Gotchas

- **A failing test blocks the publish.** The `build` job runs first and
  `publish-npm` needs it. If the GitHub release exists but npm never gained the
  version, read the workflow run before cutting anything new.
- **Tag explicitly, then push the tag, before `gh release create`.** `gh` will
  create a missing tag itself, but at whatever `main` is on the server at that
  moment. Tagging locally pins the release to the commit you actually checked
  out, and `--generate-notes` resolves the tag server-side so it has to be pushed
  first.
- **A version can never be republished.** npm rejects a duplicate, so a botched
  publish needs a new version number rather than a retry.
- **`canary`, `rc`, `dry-run` and `release-candidate` are stale dist-tags.** They
  point at old prereleases from years of manual publishes, some from the 0.x and
  1.x lines. The workflow only ever writes `alpha` and `latest`. Don't add more.
- **Every final release must be tagged.** The tag is the only durable pointer
  from an npm version back to its source commit.
