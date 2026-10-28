# Contributing

## Repository layout

- `packages/shared` — `--sl-*` variables source (`@sakulime-ui/shared`, internal, not published)
- `packages/shared/theme` — theme palettes (`@sakulime-ui/theme`)
- `packages/core` — component styles (`@sakulime-ui/core`)
- `packages/layout` — layout utilities (`@sakulime-ui/layout`)
- `doc` — Storybook doc site (`sakulime-doc`), deployed to Cloudflare Workers
- repo root — all-in-one `sakulime-ui` package (`dist/sakulime.min.css`)

## Setup

Node.js 22+.

```bash
npm install
npm run storybook    # Storybook on :6006
```

## Before pushing

```bash
npm run lint         # eslint, covers .mdx too
npm run build        # tsc typecheck + core bundle + per-package dist
npm run site         # also verify the static site when touching doc/
```

## Conventions

- `sl-*` attributes carry components, state, and layout; consumer `class` is left alone
- `--sl-*` variables control color and size; use the shared scales, no arbitrary-value APIs outside the steps
- CSS layer order: `theme < base < attrs`
- User-facing strings and `doc/` content (`.mdx` pages, story text) are Taiwan Traditional Chinese; repo meta-docs (README, CONTRIBUTING, AGENTS) stay in English
- Code comments in English only, and only where they add information
- Commit messages in English, under 50 words, conventional prefixes (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`)
- Doc pages: `.mdx` for prose, `.stories.ts` for demos; pages with stories use `<Meta of={Stories} />`, text-only pages use `<Meta title>`

## Workflow

Work branches off the current `release/x.y.z` branch, never directly off `master`:

1. Create or reuse the release branch: `release/x.y.z` (x.y.z is the target version)
2. Branch off it (`fix/…`, `feat/…`, `docs/…`); keep commits small and single-concern
3. Add a changeset when the change affects published packages: `npx changeset` — the four packages are `fixed`, selecting any one bumps them together. Changeset files are the changelog source: each describes one user-visible change. `CHANGELOG.md` files are generated at release time — never edit them by hand. No changeset needed for `doc/`, CI, or meta-doc changes — they never reach npm
4. Merge into `release/x.y.z` with `--no-ff` — real merge commits, no fast-forwards
5. When the release is ready, merge `release/x.y.z` into `master` with `--no-ff` and push
6. CI opens a "chore: release" PR — it consumes pending `.changeset/*.md`, bumps all four versions together, and rewrites each package's `CHANGELOG.md`. Merging the PR publishes to npm and creates a GitHub release for `sakulime-ui` only (notes taken from the root `CHANGELOG.md` section). The doc site deploys independently via Cloudflare Workers Builds on every `master` push
7. After the release, merge `master` back into the next `release/x.y.z` to sync versions
