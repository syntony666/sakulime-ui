---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

New shared resolver exports: `registerResolver(attr, fn)` registers an attribute handler, `resolve(root)` fans out over a root, `installResolver()` arms the single shared MutationObserver. `resolveIcons` is unchanged but now runs on this layer; placeholders whose pack registers late are backfilled instead of being marked resolved permanently.
