---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---

Docs site deployment fix: `postcss-custom-selectors` is declared in `doc/package.json` so the isolated Cloudflare build can resolve it, and CI now guards the declaration against future dependency cleanups. No package code changed.
