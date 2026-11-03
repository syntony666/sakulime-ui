# sakulime-ui

[![License](https://img.shields.io/github/license/syntony666/sakulime-ui)](LICENSE)
[![npm](https://img.shields.io/npm/v/sakulime-ui)](https://www.npmjs.com/package/sakulime-ui)

[![view - Documentation](https://img.shields.io/badge/view-Documentation-f97316?style=for-the-badge)](https://sakulime-ui.syntony666.com)

A CSS-first design system with no framework runtime — React, Vue, Svelte, or plain HTML all work. Two things only: `sl-*` attributes for components, state, and layout, plus `--sl-*` variables for color and size; `class` stays entirely yours.

## Usage

```ts
import "sakulime-ui/sakulime.min.css";
```

One file ships everything: variables, all three themes (`sakulime`, `terra`, `umbra`), components, and layout. Switch themes with `<html data-theme="terra">` — no reload needed.

```html
<button sl-button>Save</button>
<button sl-button sl-tone="danger">Delete</button>
<button sl-button="outline">Cancel</button>
```

## Partial imports

| What | Import |
|---|---|
| Components (with colors) | `@sakulime-ui/core/index.min.css` |
| Layout | `@sakulime-ui/layout/index.min.css` |
| Theme palettes only | `@sakulime-ui/theme/sakulime.css` |

## Development

```bash
npm install
npm run dev          # VitePress doc site (doc/) on :5173
npm run build        # tsc typecheck + core lib build + per-package min.css + dist/
npm test             # headless-chromium fixture assertions against dist/ (build first)
npm run test:shots   # same + screenshots → tests/shots/
npm run site         # static VitePress site → doc/site/
npm run deploy       # site build + wrangler deploy → Cloudflare Workers
npm run lint
```

Tests run the fixture pages under headless chromium — `tests/run.mjs` looks for `~/.local/bin/chromium` by default; set `SL_CHROMIUM` to point elsewhere.

## Releases

Day-to-day work lives on `release/x.y.z`; merging into `master` makes CI open a release PR, and merging that publishes the four packages to npm (`fixed` lockstep). The doc site deploys independently on `master` pushes. Details in [CONTRIBUTING.md](CONTRIBUTING.md).

## Repository layout

npm workspaces monorepo. `packages/` holds the internal workspace; four public entries: `sakulime-ui` (everything), `@sakulime-ui/core`, `@sakulime-ui/layout`, `@sakulime-ui/theme`.

| Path | Contents |
|---|---|
| `packages/shared` | `--sl-*` variables (internal, unpublished) — bundled into each entry at build time |
| `packages/theme` | theme palettes → `dist/<name>.min.css` |
| `packages/core` | components + themes → `index.min.css` / `index.min.js` |
| `packages/layout` | layout primitives → `index.min.css` |
| `dist/sakulime.min.css` | everything: core bundle + layout |
| `doc/` | doc site, deployed via Workers static assets (`doc/wrangler.toml`) |

Inside each package:

- `src/css/*.css` — component styles (demos live in `doc/demos/`)
- `src/index.ts` — package entry

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
