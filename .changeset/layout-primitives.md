---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Add four layout primitives: `sl-stack` (vertical rhythm — the parent owns spacing and direct children's block margins are zeroed), `sl-row` (wrapping horizontal run), `sl-flow` (margin-based `> * + *` sibling rhythm for content that keeps normal block layout), and `sl-grid` (auto-fill minmax columns, `--sl-grid-min` floor at 14rem — or an explicit `sl-cols="1..12"` track count, with `sl-span="2..12"` on children for multi-track items). The attribute value is the gap and takes the full scale (`xs`–`5xl`, bare attribute = `md`) via per-primitive `--sl-*-gap` slots. `sl-row` also takes an opt-in `sl-collapse` modifier that switches it to a stretched vertical stack below the `sm` breakpoint (45rem, the `--sl-container-sm` twin).

Responsive variants ride the container scale: `sl-cols-lg`, `sl-cols-md`, `sl-cols-sm` restate the track count below 75/60/45rem (narrow overrides wide), and spans wider than the active count clamp to a full row. On a grid, bare `sl-collapse` is the `sl-cols-sm="1"` shorthand. `sl-hide-lg/md/sm` is the generic counterpart — `display: none` below its breakpoint on any element — and `sl-show-lg/md/sm` mirrors it for content that only exists below the line, so a hide/show pair swaps content across the breakpoint.

Page regions ship too: `sl-topbar` (sticky by default, `="fixed"` pins to viewport), `sl-with-sidebar` + `sl-sidebar` rails (side follows source order, wrap driven by the content min-width — no media query), `sl-footer` (hairline + padding + wrapping row), and `sl-toast` (fixed corner region for notices; width `--sl-toast-w` capped to the viewport, value moves the corner across six positions). `sl-center`/`sl-end` children place zones inside topbar/footer, and a generic `sl-gap` attribute sets spacing on any gap-reading element — a primitive's own value still wins.
