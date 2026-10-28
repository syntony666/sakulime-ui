import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Sakulime UI",
  description: "CSS-first design system",
  lang: "zh-TW",
  appearance: false,
  themeConfig: {
    outline: false,
    nav: [],
    sidebar: [{ text: "開始使用", link: "/" }],
  },
});
