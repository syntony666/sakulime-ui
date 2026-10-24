import storybook from "eslint-plugin-storybook";
import * as mdx from "eslint-plugin-mdx";

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([globalIgnores(['**/dist', '**/storybook-static', '**/site']), {
  files: ['**/*.ts'],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
  ],
  languageOptions: {
    globals: globals.browser,
  },
}, ...storybook.configs["flat/recommended"], mdx.flat, {
  files: ["**/*.mdx"],
  rules: {
    "no-unused-vars": "error",
  },
}])
