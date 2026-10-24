# sakulime-ui

[![License](https://img.shields.io/github/license/syntony666/sakulime-ui)](LICENSE)
[![npm](https://img.shields.io/npm/v/sakulime-ui)](https://www.npmjs.com/package/sakulime-ui)
[![Storybook](https://img.shields.io/badge/Storybook-10-FF4785?logo=storybook&logoColor=white)](https://storybook.js.org)

A CSS-first design system with no framework runtime — React, Vue, Svelte, or plain HTML all work. Two things only: `sl-*` attributes for components, state, and layout, plus `--sl-*` variables for color and size; `class` stays entirely yours. `sakulime-ui` ships everything in one file; `@sakulime-ui/core`, `@sakulime-ui/layout`, and `@sakulime-ui/theme` are the individual entries; `doc` is the Storybook doc site deployed to Cloudflare Workers.

## Usage

```ts
import "sakulime-ui/sakulime.min.css";
```

Variables, both themes, components, and layout ship in that single file. Switch themes with `<html data-theme="terra">` — no reload needed.

```html
<button sl-button>Save</button>
<button sl-button sl-tone="danger">Delete</button>
<button sl-button sl-variant="invert">Cancel</button>
```

## Partial imports

| What | Import |
|---|---|
| Components (with colors) | `@sakulime-ui/core/index.min.css` |
| Layout | `@sakulime-ui/layout/index.min.css` |
| Theme palettes only | `@sakulime-ui/theme/sakulime.min.css` |

## Development

```bash
npm install
npm run storybook    # Storybook — component docs and visual review (doc/)
npm run build        # tsc typecheck + core lib build + per-package min.css + dist/
npm run site         # static Storybook site → doc/site/
npm run deploy       # site build + wrangler deploy → Cloudflare Workers
npm run lint
```

## Releases (changesets)

Write a changeset for every change heading into a release:

```bash
npx changeset        # pick packages, patch/minor/major, describe → .changeset/*.md
```

Day-to-day work lives on `release/x.y.z` (x.y.z is the target version — feature branches fork off it and merge back with `--no-ff`). Merging into `master` makes CI open a release PR (version bump + CHANGELOG); merging that PR publishes the four packages and deploys the doc site. Afterwards merge `master` back into the next `release/x.y.z`. All four packages bump together (`fixed`). Details in CONTRIBUTING.md.

## Repository layout (npm workspaces monorepo)

`packages/` is the internal workspace area. Four public entries: `sakulime-ui` (everything), `@sakulime-ui/core`, `@sakulime-ui/layout`, `@sakulime-ui/theme`.

| Path | Contents |
|---|---|
| `packages/shared` | `--sl-*` variables (internal, unpublished) — bundled into each entry at build time |
| `packages/shared/theme` | theme palettes, minified to `dist/<name>.min.css` |
| `packages/core` | component entry: variables + themes + components → `index.min.css` / `index.min.js` |
| `packages/layout` | layout entry: variables + layout → `index.min.css` |
| `dist/sakulime.min.css` | everything: core bundle + layout |
| `doc/` | Storybook doc site, deployed via Workers static assets (`doc/wrangler.toml`) |

Inside each package:

- `src/css/*.css` — component styles (stories live in `doc/src/`)
- `src/index.ts` — core lib entry (extracts css + js entry)

The split: `sl-*` attributes carry component markup, state modifiers, and layout — `class` is left to consumers and never collides with the system.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
