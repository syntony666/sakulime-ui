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
        items: [{ text: "Button 按鈕", link: "/button" }],
      },
    ],
  },
});
