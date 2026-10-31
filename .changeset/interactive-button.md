---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Extend `sl-interactive` to `sl-button`: the generic `--sl-i-transform`/`--sl-i-shadow` slots now resolve on buttons, and a marked button's hover runs the chosen effect (`grow`/`lift`/`raise`/`press`) instead of the built-in `scale(1.05)` grow. Buttons without the attribute are unchanged.
