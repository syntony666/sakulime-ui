# @sakulime-ui/core

## 0.4.1

### Patch Changes

- d504966: Docs site deployment fix: `postcss-custom-selectors` is declared in `doc/package.json` so the isolated Cloudflare build can resolve it, and CI now guards the declaration against future dependency cleanups. No package code changed.

## 0.4.0

### Minor Changes

- f5fb94c: `sl-card--corner` 改為純位置子元素：`end`（預設）/`start` 只管定位，型態 token（`text-sm`/`text-xs`/`indicator`）退役。長相由同一個元素疊加小元件屬性決定——`sl-chip` 貼邊膠囊、`sl-dot` 狀態點、`sl-icon` 圖示；`sl-tone` 寫在小元件自己身上染色，corner 不再消費 tone。
- 8fc9621: Generic-attribute extension pass. New values: `sl-align="stretch"`, `sl-justify="around"`/`"evenly"`, `sl-gap="none"`, `sl-pad="none"`, `sl-notice-align="start"`/`"center"`, and `sl-grid-cols`/`sl-grid-cols-lg`/`sl-grid-cols-md`/`sl-grid-cols-sm` now also accept `"auto"` to release that level back to auto-fill. Grid breakpoint counts are monotonic — the resolved count is the min of every declared level, so a narrower breakpoint can only shrink tracks.
  
  New consumers: `sl-float` reads `sl-align` (cross-axis notice placement), `sl-container` reads `sl-pad` (edge gutter, `sl-bar` picks up `"none"` too), and `sl-interactive` extends to `sl-chip`/`sl-notice` — the notice's floating ring is kept, with effect shadows stacking outside it. An out-of-vocabulary `sl-interactive` value now falls back to `grow` instead of disabling hover. `aria-disabled="true"` reads like `:disabled` on buttons and like `sl-icon-disabled` on icons, and hover effects opt out the same way. The `--sl-size-*` slots are registered element-scoped via `@property` so a marked consumer can't leak sizing into a nested one; `sl-float` honors left/right safe-area insets.
- ef6c0ac: Extend `sl-interactive` to `sl-button` and retune the effects: a marked button's hover runs the chosen effect instead of the built-in grow (unmarked buttons are unchanged). `grow` settles at `scale(1.03)` (was 1.05), the `lift` and `shadow` effects carry stronger shadows, and new value `dim` darkens via `filter: brightness(0.92)` through a new `--sl-interactive-filter` slot. `shadow` was named `raise` during the cycle.
- 740c24c: Add five layout primitives: `sl-stack` (flex column — direct children's block margins are zeroed), `sl-content` (prose flow column — children keep their margins and siblings get rhythm via `> * + *`), `sl-wrap` (wrapping horizontal run, children get `min-inline-size: 0`), `sl-grid` (auto-fill minmax columns, `--sl-grid-min` floor at 14rem — or an explicit `sl-grid-cols="1..12"` track count, with `sl-grid--span="2..12|full"` on children for multi-track items), and `sl-sidebar` (wrapping two-zone page section). Spacing is one generic attribute: `sl-gap="xs..5xl"` inherits down the tree so it can be set on an ancestor — the nearest write wins — while per-primitive `--sl-*-gap` slots (`--sl-stack-gap`, `--sl-content-gap`, `--sl-wrap-gap`, `--sl-grid-gap`, `--sl-sidebar-gap`, `--sl-float-gap`, `--sl-bar-gap`) are the non-inheriting escape hatches.
  
  Responsive variants ride the container scale: `sl-grid-cols-lg`, `sl-grid-cols-md`, `sl-grid-cols-sm` restate the track count below 75/60/45rem. The count is monotonic — a narrower level resolves to the min of every declared count, so `cols="8" cols-md="4" cols-sm="6"` still yields 4 below 45rem; `"auto"` releases a level back to auto-fill without joining the clamp, and narrower levels can still declare counts below it. Spans clamp to the resolved count. The clamp tracks explicit counts only — in auto-fill a span wider than the real tracks can still spawn implicit tracks, so `sl-grid--span="full"` is the safe full row there. `sl-hide-lg/md/sm` hides below its breakpoint on any element and `sl-show-lg/md/sm` mirrors it for content that only exists below the line, so a hide/show pair swaps content across the breakpoint.
  
  Page regions ship too: `sl-bar` is one full-width band for both page edges — a three-column grid with left/dead-center/right zones claimed by `sl-bar--start`/`sl-bar--center`/`sl-bar--end` children (unmarked children auto-fill in source order), `"top"`/`"bottom"` stick to their edge (sticky by default, `sl-bar-fixed` pins to the viewport, bare stays in flow), the matching-side hairline comes free, a fixed bar auto-pads body by `--sl-bar-h`, and `sl-pad` composes for thicker bands; `sl-sidebar` pairs with `sl-sidebar--rail` children (side follows DOM order, wrap driven by the main column's `min-inline-size` — no media query); and `sl-float` is the fixed corner region for notices (six corners as space-separated `<edge> <side>` tokens — `top`/`bottom` × `start`/`center`/`end`, order-free and partial-friendly, width `--sl-float-width` capped to the viewport). `sl-container` takes `"sm"|"md"|"lg"` as its value (bare = `md`). Child parts use double-dash names (`sl-grid--span`, `sl-sidebar--rail`, `sl-bar--start`/`--center`/`--end`, `sl-card--section`, `sl-card--corner`, `sl-notice--action`).
  
  Robustness pass: the layout package stands alone — `border-box` ships on the primitives that measure their own box, `--sl-bg`/`--sl-border` carry fallbacks, and `--sl-pad` can't leak from ancestors into `sl-bar`. Track counts and spans run on self-sealing private vars, so `sl-grid--span` clamps to the active count in every `sl-grid-cols` mode and an outer grid can't leak its count into a nested one. `sl-float` caps its height to the viewport, honors `--sl-float-inline` in its width clamp, and clears the home indicator via `env()`; fixed bars and floats go static in `@media print`. The per-primitive gap slots are registered non-inheriting via `@property`, so a bare primitive nested under a `sl-gap`-valued one still reads the inherited gap while inline `--sl-*-gap` overrides stay local (needs Firefox 128+, Safari 16.4+, Chrome 85+). New hooks: `--sl-bar-z`, `--sl-float-z`, `--sl-bar-pad-inline`, `--sl-container-pad`.
  
  BREAKING vs 0.3.x: `sl-container-sm`/`sl-container-md`/`sl-container-lg` are replaced by `sl-container="sm|md|lg"` (bare = `md`); `sl-card-section` → `sl-card--section`; `sl-card-corner` → `sl-card--corner`; `--sl-i-transform`/`--sl-i-shadow` → `--sl-interactive-transform`/`--sl-interactive-shadow`. Vocabulary introduced during the 0.4.0 cycle is superseded — layout attrs `sl-toast`, `sl-with-sidebar`, `sl-flow`, `sl-place`, `sl-row`, `sl-collapse`, `sl-cols`, `sl-span`, `sl-fixed`, `sl-static`; renames `sl-interactive="raise"` → `"shadow"`, `sl-card="plain"` → `"flat"`, `sl-button="invert"` → `"outline"`, `sl-card--section="inset"` → `"edge"`, `sl-card-indicate` → `sl-card-indicator`, `sl-icon-flip` `h`/`v` → `horizontal`/`vertical`, `sl-float` hyphen corners → space-separated tokens; hooks `--sl-notice-gap` → `--sl-notice-action-gap`, `--sl-bar-pad` → `--sl-bar-pad-block`, `--sl-float-b`/`-e`/`-w` → `--sl-float-block`/`--sl-float-inline`/`--sl-float-width`. If you tracked the branch, treat this release as the canonical API.
- e12fe84: Redefine `sl-radius="full"` as the one-line capsule cap: components that define `--sl-radius-full` (`sl-card`, `sl-notice`) now cap the radius at one line height — a two-line box still rounds off completely while taller boxes run straight down the middle — via a shared `var(--sl-radius-full, var(--sl-radius-pill))` fallback in the generic rule. Other consumers keep the 9999px pill sentinel (was 999px).
- 5c3fac2: 新增對齊雙軸通用屬性：`sl-justify`（主軸分佈，`start`/`center`/`end`/`between`）跟 `sl-align`（交叉軸對齊，`start`/`center`/`end`）。寫在排版元件自己身上生效、不繼承；寫在子層上變成單獨覆寫（`*-self`）。消費者：`sl-wrap`（整排水平分佈＋列內垂直對齊）、`sl-stack`（整疊垂直分佈＋子層水平對齊）、`sl-grid`（格子內水平、垂直分開管）。
- bbe1987: `sl-chip` 加入 `sl-size` 消費名單：`sm`/`md`/`lg` 換成絕對字級（12/16/20px），padding 與 gap 是 em 所以整顆膠囊等比縮放；不寫時維持 `0.875em` 跟字級走。角落 chip（`sl-card--corner`）同樣適用。
- cf70bdb: Add `sl-chip` — an em-based capsule tag for icon + text entries (meta rows, tag lists, header items) with `sl-tone` support.
- dd14e35: Add `sl-dot` — a 0.5em status dot that tracks font-size and takes `sl-tone` for status colors.
- 24d0ba6: Add `sl-notice` — a notification capsule: in-flow it reads as a full-width banner, inside a consumer-owned fixed wrapper it reads as a toast. `sl-notice="fit"` shrink-wraps to content; `sl-notice--action` pushes trailing controls to the far edge. Consumes `sl-tone`, `sl-radius`, `sl-pad`; placement, stacking, dismiss, and timeout stay with the consumer.

### Patch Changes

- 66ab9f5: `sl-notice`: the leading `sl-notice--action="start"` lane now reserves the same width as the trailing lane — copy keeps identical distance from whichever edge action sits beside it.
- 9aa61ff: Deepen the light-scheme `--sl-ok` token from 51% to 45% lightness — `sl-tone="success"` text on its tone wash was 4.44:1, under WCAG AA's 4.5:1; it now measures ≥4.7:1 on the 20% chip wash and 5.7:1 on the 12% notice wash.
- 2e950a9: Status/secondary contrast pass: umbra's secondary seed lifts from #44403c to #a8a29e — the seed is the tone face, and the old stone-800 value sank into the dark surface and its washes. Dark `--sl-warn` lifts from 54.5% to 66% lightness with kept chroma so it reads gold/amber, not brown; its ink pairs with the dark pole (inverted ink in dark scheme) so button text stays ≥5.5:1. `--sl-danger` gets `--sl-ok`'s AA treatment — light 51%→45%, dark 67%→72% — putting danger wash text at ok's measured contrast. Light-scheme `--sl-text-accent` clamp tightens 55%→49%, bringing accent text to AA without the doc site's -0.06 patch.

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
