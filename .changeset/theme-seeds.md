---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Themes now author three seeds (`--sl-seed-primary`, `--sl-seed-secondary`, `--sl-seed-accent`) plus `color-scheme`; every other `--sl-*` color token is derived in CSS by a shared layer, also published as `@sakulime-ui/theme/derived.css` for custom themes. Existing themes keep their identity but some derived values shift (neutral hue follows the secondary seed, tone fgs are computed per face lightness, accents clamp into the readable band).
