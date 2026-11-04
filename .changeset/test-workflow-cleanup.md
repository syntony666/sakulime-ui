---
"sakulime-ui": patch
---
Split workflow tests into `tests/workflows/` with shared helpers under `tests/lib/`, reuse the test pipeline in the Release workflow, publish via `changeset publish` directly, and drop the unreachable branch auto-detection from Start Release. No published runtime code changes.
