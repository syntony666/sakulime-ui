---
"sakulime-ui": patch
---
Run the Release workflow checks after the test pipeline so their dependencies exist; 0.4.7 was merged but never published, and 0.4.8 carries its CI-only changes forward. No published runtime code changes.
