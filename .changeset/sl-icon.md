---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

Restore `sl-icon` as a consumer-registered icon attribute. `[sl-icon]` styles any svg (or wrapper element) at 1em on the text baseline and joins the `sl-tone` consumer list. The JS surface adds helpers: `registerPack(prefix, data | url)` feeds the registry Iconify-format JSON (`@iconify-json/*` or a fetch URL), `icon("pack:name")` returns an `<svg sl-icon>` markup string for SSG, `iconNames`/`packNames` list registered entries, and `resolveIcons(root)` resolves valued `sl-icon` elements inside a given root for shadow-DOM hosts. In a DOM, registering a pack also resolves `<i sl-icon="si-github">` placeholders — markup-driven icons with no per-call JS. No icon data ships in the package; consumers register exactly the packs they use.
