import { fileURLToPath } from "node:url";
import customSelectors from "postcss-custom-selectors";
import { defineConfig } from 'vite'

const src = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  css: {
    /* expands the :--sl-* consumer lists in css/generic.css */
    postcss: { plugins: [customSelectors()] },
  },
  /* published exports point at dist, but the bundle must inline theme
     SOURCE — dist isn't built until scripts/build.mjs runs after this */
  resolve: {
    alias: [
      {
        find: "@sakulime-ui/theme/sakulime.css",
        replacement: src("../theme/sakulime.css"),
      },
      {
        find: "@sakulime-ui/theme/terra.css",
        replacement: src("../theme/terra.css"),
      },
      {
        find: "@sakulime-ui/theme/umbra.css",
        replacement: src("../theme/umbra.css"),
      },
    ],
  },
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index.min',
      cssFileName: 'index.min',
    },
  },
})
