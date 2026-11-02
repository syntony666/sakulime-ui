---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Extend `sl-interactive` to `sl-button` and retune the effects: a marked button's hover runs the chosen effect instead of the built-in grow (unmarked buttons are unchanged). `grow` settles at `scale(1.03)` (was 1.05), the `lift` and `shadow` effects carry stronger shadows, and new value `dim` darkens via `filter: brightness(0.92)` through a new `--sl-interactive-filter` slot. `shadow` was named `raise` during the cycle.
