---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

BREAKING: attribute grammar overhaul. Variants now ride the component marker value — `sl-button="ghost"`, `sl-card="hollow"`, with a bare marker meaning the default variant — so `sl-variant` is removed. Component attributes are namespaced (`sl-indicate` → `sl-card-indicate`). Static `sl-raised` and `sl-card-interactive` are replaced by the shared `sl-interactive` attribute with hover affordances `grow` (bare/default), `lift`, `raise`, and `press`. Generic attributes (`sl-tone`, `sl-size`, `sl-radius`, `sl-pad`, `sl-interactive`) now only take effect on elements in their consumer list — writing one on a wrapper no longer leaks into descendants — while parts like `sl-card-corner` still inherit their component's slots and can override them directly.
