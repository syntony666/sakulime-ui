---
"sakulime-ui": patch
---

Start Release now compares the version that pending changesets produce
against the requested release branch before versioning, failing the
prepare step when they differ.
