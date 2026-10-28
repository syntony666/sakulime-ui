import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Sakulime UI",
  description: "CSS-first design system",
  lang: "zh-TW",
  appearance: false,
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
          { text: "說明", link: "/core" },
          { text: 'Button <span class="sl-sub">按鈕</span>', link: "/button" },
          { text: 'Card <span class="sl-sub">卡片</span>', link: "/card" },
        ],
      },
      {
        text: "Layout",
        items: [
          { text: "說明", link: "/layout" },
          { text: 'Container <span class="sl-sub">容器</span>', link: "/container" },
        ],
      },
    ],
  },
});
