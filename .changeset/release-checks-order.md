---
"sakulime-ui": patch
---
Drop the redundant workflow-checks step from Release — the release PR already proves those files, and the step ran before dependencies existed; 0.4.7 was merged but never published, and 0.4.8 carries its CI-only changes forward. No published runtime code changes.
