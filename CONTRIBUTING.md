# Contributing

## Repository layout

- `packages/shared` — `--sl-*` variables source (`@sakulime-ui/shared`, internal, not published)
- `packages/theme` — theme palettes (`@sakulime-ui/theme`)
- `packages/core` — component styles (`@sakulime-ui/core`)
- `packages/layout` — layout utilities (`@sakulime-ui/layout`)
- `doc` — VitePress doc site (`sakulime-doc`), deployed to Cloudflare Workers
- repo root — all-in-one `sakulime-ui` package (`dist/sakulime.min.css`)

## Setup

Node.js 22+.

```bash
npm install
npm run dev          # VitePress doc site on :5173
```

## Before pushing

```bash
npm run lint         # eslint
npm run build        # tsc typecheck + core bundle + per-package dist
npm run site         # also verify the static site when touching doc/
```

## Conventions

- `sl-*` attributes carry components, state, and layout; consumer `class` is left alone
- `--sl-*` variables control color and size; use the shared scales, no arbitrary-value APIs outside the steps
- CSS layer order: `theme < base < attrs`
- User-facing strings and `doc/` content (`.md` pages, story text) are Taiwan Traditional Chinese; repo meta-docs (README, CONTRIBUTING, AGENTS) stay in English
- Code comments in English only, and only where they add information
- Commit messages in English, under 50 words, conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- Doc pages: `.md` for prose, `.demo.ts` for demos; demos render through the theme's `<Demo>` and `<Playground>` components. Page structure — fixed section order, heading format, playground placement — is defined in [`doc/page-template.md`](doc/page-template.md); follow it for every component page
- New themes: drop a `.css` in `packages/theme` (three seeds + `color-scheme`; see `_internal/derived.css`), then import it once in `packages/core/src/index.ts` to bundle it into core, and add a `./<name>.css` line to `packages/theme/package.json` exports so the path is importable
- Doc pages need frontmatter `title` and `description` — canonical, OG and JSON-LD metadata is generated from them

## Component CSS rules

- Generic attributes (`sl-tone`, `sl-size`, `sl-radius`, `sl-pad`, `sl-interactive`) live in `css/generic.css`. Each expands through its own `@custom-selector` consumer list and only ever sets `--sl-*` slot variables, never physical properties
- A component that reads a slot must self-default it inside its own `@layer base` rule. That default is what seals a generic attribute set on an ancestor from leaking in
- Component parts (`sl-card-corner`, `sl-card-section`) never self-default — they inherit their component's slots, so a part follows the card's `sl-tone`. Adding a part to a consumer list still lets the attribute work when written on the part itself
- Component-specific attributes are namespaced `sl-<comp>-<attr>`; the marker value carries the variant (`sl-card="hollow"`), a bare marker means the default variant
- `@custom-selector` expands via `postcss-custom-selectors`; both Vite pipelines (core build and doc site) already run it — never hand-write the `:is()` expansion

## Workflow

Work branches off the current `release/x.y.z` branch, never directly off `master`:

1. Create or reuse the release branch: `release/x.y.z` (x.y.z is the target version)
2. Branch off it (`fix/…`, `feat/…`, `docs/…`); keep commits small and single-concern
3. Add a changeset when the change affects published packages: `npx changeset` — the four packages are `fixed`, selecting any one bumps them together. Changeset files are the changelog source: each describes one user-visible change. `CHANGELOG.md` files are generated at release time — never edit them by hand. No changeset needed for `doc/`, CI, or meta-doc changes — they never reach npm
4. Merge into `release/x.y.z` with `--no-ff` — real merge commits, no fast-forwards
5. When the release is ready, merge `release/x.y.z` into `master` with `--no-ff` and push
6. CI opens a "chore: release" PR — it consumes pending `.changeset/*.md`, bumps all four versions together, and rewrites each package's `CHANGELOG.md`. Merging the PR publishes to npm and creates a GitHub release for `sakulime-ui` only (notes taken from the root `CHANGELOG.md` section). The doc site deploys independently via Cloudflare Workers Builds on every `master` push
7. After the release, merge `master` back into the next `release/x.y.z` to sync versions
