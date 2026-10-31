---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Add four layout primitives: `sl-stack` (vertical rhythm — the parent owns spacing and direct children's block margins are zeroed), `sl-row` (wrapping horizontal run), `sl-flow` (margin-based `> * + *` sibling rhythm for content that keeps normal block layout), and `sl-grid` (auto-fill minmax columns, `--sl-grid-min` floor at 14rem — or an explicit `sl-cols="2..12"` track count, with `sl-span="2..12"` on children for multi-track items). The attribute value is the gap and takes the full scale (`xs`–`5xl`, bare attribute = `md`) via per-primitive `--sl-*-gap` slots. `sl-row` also takes an opt-in `sl-collapse` modifier that switches it to a stretched vertical stack below a 40rem viewport; on an explicit `sl-cols` grid it drops to a single column and releases all `sl-span` values.

Page regions ship too: `sl-topbar` (sticky by default, `="fixed"` pins to viewport), `sl-with-sidebar` + `sl-sidebar` rails (side follows source order, wrap driven by the content min-width — no media query), `sl-footer` (hairline + padding + wrapping row), and `sl-toast` (fixed corner region for notices; width `--sl-toast-w` capped to the viewport, value moves the corner across six positions). `sl-center`/`sl-end` children place zones inside topbar/footer, and a generic `sl-gap` attribute sets spacing on any gap-reading element — a primitive's own value still wins.
