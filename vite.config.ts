import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/elements/index.ts',
      formats: ['es'],
      fileName: 'elements',
      cssFileName: 'sakulime',
    },
  },
})
