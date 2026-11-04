# Contributing

## Repository layout

- `packages/shared` — `--sl-*` variables source (`@sakulime-ui/shared`, internal, not published)
- `packages/theme` — theme palettes (`@sakulime-ui/theme`)
- `packages/core` — component styles (`@sakulime-ui/core`)
- `packages/layout` — layout utilities (`@sakulime-ui/layout`)
- `doc` — VitePress doc site (`sakulime-doc`), deployed to Cloudflare Workers
- repo root — all-in-one `sakulime-ui` package (`dist/sakulime.min.css`)

## Setup

Node.js 24+ (CI runs 24).

```bash
npm install
npm run dev          # VitePress doc site on :5173
```

## Before pushing

```bash
npm run lint         # eslint
npm run build        # tsc typecheck + core bundle + per-package dist
npm test             # headless-chromium fixture assertions — needs dist/, run after build
npm run site         # also verify the static site when touching doc/
```

`npm test` needs a chromium binary — `tests/run.mjs` defaults to `~/.local/bin/chromium`; set `SL_CHROMIUM` to override.

## Conventions

- `sl-*` attributes carry components, state, and layout; consumer `class` is left alone
- `--sl-*` variables control color and size; use the shared scales, no arbitrary-value APIs outside the steps
- CSS layer order: `theme < base < attrs`
- User-facing strings and `doc/` content (`.md` pages, demo text) are Taiwan Traditional Chinese; repo meta-docs (README, CONTRIBUTING, AGENTS) stay in English
- Code comments in English only, and only where they add information
- Commit messages in English, under 50 words, conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- New themes: drop a `.css` in `packages/theme` (three seeds + `color-scheme`; see `_internal/derived.css`), then import it once in `packages/core/src/index.ts` to bundle it into core, and add a `./<name>.css` line to `packages/theme/package.json` exports so the path is importable — plus a matching per-theme alias in both `packages/core/vite.config.ts` and `doc/.vitepress/config.mts`, which hardcode one alias entry per theme and fail to resolve without it

## Design rules

- Flat by default: surfaces carry no permanent shadow — depth appears via `sl-interactive` hover or floating layers only
- Readable accent: decorative tones (`primary`, `secondary`, `warning`) are never text colors — text uses `--sl-text-accent` or `--sl-tone-text` mixes
- `sl-*` attribute names cap at two dashes (`sl-<comp>-<attr>`); the only exception is the responsive suffix `sl-<comp>-<attr>-<viewport>` (e.g. `sl-grid-cols-lg`). `--sl-*` vars are exempt
- Breakpoints 45/60/75rem are hardcoded twins of `--sl-container-*` — media queries can't read vars, so keep them in sync manually

## Component CSS rules

- Generic attributes expand through `@custom-selector` consumer lists and only ever set `--sl-*` slot variables, never physical properties. Core-side ones (`sl-tone`, `sl-size`, `sl-radius`, `sl-pad`, `sl-interactive`) live in `css/generic.css`; layout-side ones (`sl-gap`, `sl-justify`, `sl-align`) live in `packages/layout/src/`. `sl-pad` has a second consumer list in `layout/pad.css` (`sl-container`, `sl-bar`) kept identical to generic.css's — update both when changing the scale
- A component that reads a slot must self-default it inside its own `@layer base` rule. That default is what seals a generic attribute set on an ancestor from leaking in
- Component parts (`sl-card--corner`, `sl-card--section`) never self-default — a part that reads a slot inherits it from its component (a section follows the card's `--sl-pad`). Adding a part to a consumer list still lets the attribute work when written on the part itself
- Component-specific attributes are namespaced `sl-<comp>-<attr>`; the marker value carries the variant (`sl-card="hollow"`), a bare marker means the default variant
- `@custom-selector` expands via `postcss-custom-selectors`; both Vite pipelines (core build and doc site) already run it — never hand-write the `:is()` expansion

## Doc site

- Pages are `.md` under `doc/pages/`; demos are `.demo.ts` under `doc/demos/`, rendered through the theme's `<Demo>` and `<Playground>` components
- Page structure, tone, and zh-TW writing rules live in [`doc/templates/`](doc/templates/index.md) — read `index.md` plus the skeleton for the page type before editing docs
- Frontmatter `title` and `description` are required — canonical, OG and JSON-LD metadata is generated from them

## Workflow

Work branches off the current `release/x.y.z` branch, never directly off `master`:

1. Create or reuse the release branch: `release/x.y.z` (x.y.z is the target version)
2. Branch off it (`fix/…`, `feat/…`, `docs/…`); keep commits small and single-concern
3. Add a changeset when the change affects published packages: `npx changeset` — the four packages are `fixed`, so frontmatter lists only `sakulime-ui` (any one selection bumps them together). Changeset files are the changelog source: each describes one user-visible change. `CHANGELOG.md` files are generated at release time — never edit them by hand. No changeset needed for `doc/`, CI, or meta-doc changes — they never reach npm
4. Merge into `release/x.y.z` with `--no-ff` — real merge commits, no fast-forwards
5. Sync the latest `master` into the release branch, push it, and confirm its pending changesets produce the target x.y.z version. Changesets are required to start a versioned release, including a release used to test CI-only changes
6. In GitHub, open **Actions > Start Release > Run workflow**. Keep the workflow branch on `master` and set `release_branch` to `release/x.y.z`. The workflow creates `changeset-release/x.y.z` from that source, updates all four versions, changelogs and the lockfile, commits as `github-actions[bot]`, and opens one PR to `master`. It explicitly dispatches **Test** on the prepared commit because PRs created with `GITHUB_TOKEN` do not trigger `pull_request` workflows
7. Wait for **Fixture assertions** to pass. The maintainer clicks **Approve**, then **Merge pull request > Create a merge commit**. Agents must not approve or merge the PR, enable auto-merge, or bypass protection. This is the release's only merge into `master`
8. The `master` push publishes the already-prepared packages and creates the tag and GitHub release. It does not open another PR. Cloudflare Workers Builds independently deploys the doc site when its watch paths match
9. After the release, sync `master` into the next release branch to include the version commit

The same manual entry point is available through gh CLI:

```bash
gh workflow run release-pr.yml --ref master -f release_branch=release/0.4.5
```

This starts preparation only; it does not approve, merge, publish, or deploy. Re-running the same source reuses the prepared branch and open PR and dispatches checks again. If the source changed after preparation or the PR was closed/merged, preparation stops instead of rewriting commits or approvals. Keep the source unchanged while its release PR is under review.

One-time setup: the workflows must first be installed on the default branch `master` for **Run workflow** to appear. Repository **Settings > Actions > General > Workflow permissions** must allow GitHub Actions to create pull requests. Retain the required **Fixture assertions** check and one approving review, enforced for admins; keep force pushes and deletion disabled. GitHub does not distinguish browser approval from approval through the same account's CLI credentials.
