import type { StorybookConfig } from '@storybook/html-vite';
import remarkGfm from "remark-gfm";
import { syncThemeValues } from "./gen-theme-values";

syncThemeValues();

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
  // the template's own <title> always wins document order — override at
  // runtime (manager gets a hardcoded " - Storybook" suffix; the iframe's
  // is hardcoded "Storybook")
  managerHead: (head) => `${head}
    <script>document.title = "Sakulime UI";</script>`,
  previewHead: (head) => `${head}
    <script>document.title = "Sakulime UI";</script>
    <link rel="icon" type="image/svg+xml" href="./favicon.svg" />`,
};
// `title` is a runtime preset outside the typed config — it feeds the
// manager's <title> element ("Sakulime UI - Storybook"; the script above
// removes the suffix at runtime)
export default { ...config, title: "Sakulime UI" };
