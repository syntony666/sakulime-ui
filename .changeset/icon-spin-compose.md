---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---

`sl-icon-spin` now composes with `sl-icon-rotate`/`sl-icon-flip` — the keyframe animates `transform` instead of the `rotate` property, so the static orientation stays applied while the icon spins.
