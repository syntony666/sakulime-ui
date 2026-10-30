---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---
Fix published `exports` pointing at source files that `files: ["dist"]` excluded — every public subpath now resolves to a bundled artifact.
