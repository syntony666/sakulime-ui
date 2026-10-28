import type { StorybookConfig } from '@storybook/html-vite';
import remarkGfm from "remark-gfm";
import { syncThemeValues } from "./gen-theme-values";

const tokens = syncThemeValues();

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|ts)", "../src/**/*.mdx"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            // GFM tables etc. — not part of CommonMark
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: "@storybook/html-vite",
  docs: {
    defaultName: "總覽",
  },
  staticDirs: ["../public"],
  managerHead: (head) => `${head}
    <title>Sakulime UI</title>
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
  // docs pages render inside the preview iframe — managerHead styles never reach them
  previewHead: (head) => `${head}
    <style>
      /* table headers default to textColor like the sidebar — mute them to
         --sl-text-muted so they read as column labels, not nav text */
      .docblock-argstable-head th { color: ${tokens["text-muted"]}; }

      /* widen the built-in docs TOC (default 10rem) */
      aside:has(.toc-wrapper),
      nav:has(.toc-wrapper) { width: 14rem; }

      /* disabled TOC still renders an empty aside spacer — hide it */
      .sbdocs-wrapper > aside:not(:has(.toc-wrapper)) { display: none; }
    </style>`,
};
export default config;
