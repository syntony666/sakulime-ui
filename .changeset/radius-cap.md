---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Redefine `sl-radius="full"` as the one-line capsule cap: components that define `--sl-radius-full` (`sl-card`, `sl-notice`) now cap the radius at one line height — a two-line box still rounds off completely while taller boxes run straight down the middle — via a shared `var(--sl-radius-full, var(--sl-radius-pill))` fallback in the generic rule. Other consumers keep the 9999px pill sentinel (was 999px).
