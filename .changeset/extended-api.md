---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Generic-attribute extension pass. New values: `sl-align="stretch"`, `sl-justify="around"`/`"evenly"`, `sl-gap="none"`, `sl-pad="none"`, `sl-notice-align="start"`/`"center"`, and `sl-grid-cols`/`sl-grid-cols-lg`/`sl-grid-cols-md`/`sl-grid-cols-sm` now also accept `"auto"` to release that level back to auto-fill. Grid breakpoint counts are monotonic — the resolved count is the min of every declared level, so a narrower breakpoint can only shrink tracks.

New consumers: `sl-float` reads `sl-align` (cross-axis notice placement), `sl-container` reads `sl-pad` (edge gutter, `sl-bar` picks up `"none"` too), and `sl-interactive` extends to `sl-chip`/`sl-notice` — the notice's floating ring is kept, with effect shadows stacking outside it. An out-of-vocabulary `sl-interactive` value now falls back to `grow` instead of disabling hover. `aria-disabled="true"` reads like `:disabled` on buttons and like `sl-icon-disabled` on icons, and hover effects opt out the same way. The `--sl-size-*` slots are registered element-scoped via `@property` so a marked consumer can't leak sizing into a nested one; `sl-float` honors left/right safe-area insets.
