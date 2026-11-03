---
"sakulime-ui": patch
"@sakulime-ui/core": patch
"@sakulime-ui/layout": patch
"@sakulime-ui/theme": patch
---

Status/secondary contrast pass: umbra's secondary seed lifts from #44403c to #a8a29e — the seed is the tone face, and the old stone-800 value sank into the dark surface and its washes. Dark `--sl-warn` lifts from 54.5% to 66% lightness with kept chroma so it reads gold/amber, not brown; its ink pairs with the dark pole (inverted ink in dark scheme) so button text stays ≥5.5:1. `--sl-danger` gets `--sl-ok`'s AA treatment — light 51%→45%, dark 67%→72% — putting danger wash text at ok's measured contrast. Light-scheme `--sl-text-accent` clamp tightens 55%→49%, bringing accent text to AA without the doc site's -0.06 patch.
