---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---

`@sakulime-ui/core` now declares `postcss-custom-selectors` in its own devDependencies (its `vite.config.ts` imports it), and the CI guard checks every workspace that imports the plugin. No package code changed.
