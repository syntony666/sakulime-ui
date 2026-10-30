import customSelectors from "postcss-custom-selectors";
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    /* expands the :--sl-* consumer lists in css/generic.css */
    postcss: { plugins: [customSelectors()] },
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
