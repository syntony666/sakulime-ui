---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

`sl-icon` values now take space-separated modifier tokens after the icon name (`sl-icon="lucide:zap spin"`), and bare tokens work on pasted svgs too. New modifiers: `sm`/`lg`/`xl`/`2xl` sizes, `flip-h`/`flip-v` flips, `rotate-90`/`rotate-180`/`rotate-270`, `spin` animation (disabled under `prefers-reduced-motion`), `circular`/`rounded` ink frames, `disabled` fade, and `space`/`space-start`/`space-end` margins.
