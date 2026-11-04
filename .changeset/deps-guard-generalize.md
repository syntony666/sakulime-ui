---
"sakulime-ui": patch
---
Generalize the isolated-workspace deps guard to check every bare import in workspace build configs against that workspace's declared dependencies, not just postcss-custom-selectors. No published runtime code changes.
