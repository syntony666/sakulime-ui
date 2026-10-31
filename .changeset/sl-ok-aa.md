---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---

Deepen the light-scheme `--sl-ok` token from 51% to 45% lightness — `sl-tone="success"` text on its tone wash was 4.44:1, under WCAG AA's 4.5:1; it now measures ≥4.7:1 on the 20% chip wash and 5.7:1 on the 12% notice wash.
