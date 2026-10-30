---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---
The shared resolver now observes attribute changes too — `setAttribute("sl-icon", ...)` after `installResolver()` resolves, and changing the icon name re-fills it.
