# @sakulime-ui/core

## 0.3.0

### Minor Changes

- 5aafd13: BREAKING: attribute grammar overhaul. Variants now ride the component marker value — `sl-button="ghost"`, `sl-card="hollow"`, with a bare marker meaning the default variant — so `sl-variant` is removed. Component attributes are namespaced (`sl-indicate` → `sl-card-indicate`). Static `sl-raised` and `sl-card-interactive` are replaced by the shared `sl-interactive` attribute with hover affordances `grow` (bare/default), `lift`, `raise`, and `press`. Generic attributes (`sl-tone`, `sl-size`, `sl-radius`, `sl-pad`, `sl-interactive`) now only take effect on elements in their consumer list — writing one on a wrapper no longer leaks into descendants — while parts like `sl-card-corner` still inherit their component's slots and can override them directly.
- 8c43a19: `sl-icon` gains namespaced modifier attributes alongside the marker (`<i sl-icon="lucide:zap" sl-icon-spin>`), and they work on pasted svgs too. New attrs: `sl-icon-size` (`sm`/`lg`/`xl`/`2xl`), `sl-icon-flip` (`h`/`v`), `sl-icon-rotate` (`90`/`180`/`270`), `sl-icon-spin` (disabled under `prefers-reduced-motion`), `sl-icon-frame` (`circular`/`rounded` ink frames), `sl-icon-disabled`, and `sl-icon-space` (`start`/`end`, bare for both).
- 8ef5623: New shared resolver exports: `registerResolver(attr, fn)` registers an attribute handler, `resolve(root)` fans out over a root, `installResolver()` arms the single shared MutationObserver. `resolveIcons` is unchanged but now runs on this layer; placeholders whose pack registers late are backfilled instead of being marked resolved permanently.
- b9f12a2: Restore `sl-icon` as a consumer-registered icon attribute. `[sl-icon]` styles any svg (or wrapper element) at 1em on the text baseline and joins the `sl-tone` consumer list. The JS surface adds helpers: `registerPack(prefix, data | url)` feeds the registry Iconify-format JSON (`@iconify-json/*` or a fetch URL), `icon("pack:name")` returns an `<svg sl-icon>` markup string for SSG, `iconNames`/`packNames` list registered entries, and `resolveIcons(root)` resolves valued `sl-icon` elements inside a given root for shadow-DOM hosts. In a DOM, registering a pack also resolves `<i sl-icon="si-github">` placeholders — markup-driven icons with no per-call JS. No icon data ships in the package; consumers register exactly the packs they use.
- 9ee6538: Themes now author three seeds (`--sl-seed-primary`, `--sl-seed-secondary`, `--sl-seed-accent`) plus `color-scheme`; every other `--sl-*` color token is derived in CSS by a shared layer, also published as `@sakulime-ui/theme/derived.css` for custom themes. Existing themes keep their identity but some derived values shift (neutral hue follows the secondary seed, tone fgs are computed per face lightness, accents clamp into the readable band).
- 7ad7157: Add the `umbra` theme — the warm stone gallery at night as a separately importable palette (`@sakulime-ui/theme/umbra.css`).

### Patch Changes

- 485baec: `sl-icon-spin` now composes with `sl-icon-rotate`/`sl-icon-flip` — the keyframe animates `transform` instead of the `rotate` property, so the static orientation stays applied while the icon spins.
- 70cbb13: Fix published `exports` pointing at source files that `files: ["dist"]` excluded — every public subpath now resolves to a bundled artifact.
- a6e4e06: The shared resolver now observes attribute changes too — `setAttribute("sl-icon", ...)` after `installResolver()` resolves, and changing the icon name re-fills it.

## 0.2.0

### Minor Changes

- 14c32ea: Add card component (`sl-card`) with `sl-card-corner` chip/dot marker, `sl-pad` axis, `hollow` variant, `sl-indicate` edge marks, and `sl-raised` shadow.
- c64646d: Rework both palettes: sakulime gets an amber `sl-primary` with soft-pink `sl-secondary`, terra switches to the map-gallery stone + teal palette with a slate `sl-secondary`. Text tones darkened for readability and status colors follow each theme's family. Tone-ink colors now derive via `color-mix` so contrast holds when palettes change.

### Patch Changes

- fa17a06: Add homepage field pointing to the doc site.

## 0.1.1

### Patch Changes

- 03cc788: Verify trusted-publishing release pipeline.
