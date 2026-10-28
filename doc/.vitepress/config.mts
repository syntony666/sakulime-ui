import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

const zh = (t: string) => `<em>${t}</em>`;

export default defineConfig({
  title: "Sakulime UI",
  description: "CSS-first design system",
  lang: "zh-TW",
  appearance: false,
  srcDir: "doc",
  outDir: "site",
  vite: {
    publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  },
  themeConfig: {
    outline: false,
    aside: false,
    logo: "/favicon.svg",
    nav: [],
    socialLinks: [
      { icon: "github", link: "https://github.com/syntony666/sakulime-ui" },
    ],
    sidebar: [
      { text: "開始使用", link: "/introduction" },
      { text: "主題", link: "/theme" },
      {
        text: "Core",
        items: [
          { text: "說明", link: "/core/" },
          { text: `Button ${zh("按鈕")}`, link: "/core/button" },
          { text: `Card ${zh("卡片")}`, link: "/core/card" },
        ],
      },
      {
        text: "Layout",
        items: [
          { text: "說明", link: "/layout/" },
          { text: `Container ${zh("容器")}`, link: "/layout/container" },
        ],
      },
    ],
  },
});
