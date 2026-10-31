---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Add three layout primitives: `sl-stack` (vertical rhythm — the parent owns spacing and direct children's block margins are zeroed), `sl-row` (wrapping horizontal run), and `sl-grid` (auto-fill minmax columns, `--sl-grid-min` floor at 14rem). The attribute value is the gap and takes the full scale (`xs`–`5xl`, bare attribute = `md`) via per-primitive `--sl-*-gap` slots.
