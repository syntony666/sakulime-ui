import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

const zh = (t: string) => `<em>${t}</em>`;

export default defineConfig({
  title: "Sakulime UI",
  description: "CSS-first design system",
  lang: "zh-TW",
  appearance: false,
  head: [
    // restore the saved theme before first paint — without this the page
    // flashes sakulime for a frame before hydration sets data-theme
    [
      "script",
      {},
      "try{var t=localStorage.getItem('sl-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}",
    ],
    // zh-TW + code faces from Google Fonts — Cloudflare Fonts rewrites
    // these to same-domain /cf-fonts at the edge, so there is no
    // third-party request in production (Inter is VP-bundled already)
    ["link", { rel: "preconnect", href: "https://fonts.googleapis.com" }],
    [
      "link",
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    ],
    [
      "link",
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap",
      },
    ],
  ],
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
        text: "Layout",
        items: [
          { text: "說明", link: "/layout/" },
          { text: `Container ${zh("容器")}`, link: "/layout/container" },
        ],
      },
      {
        text: "Core",
        items: [
          { text: "說明", link: "/core/" },
          { text: `Button ${zh("按鈕")}`, link: "/core/button" },
          { text: `Card ${zh("卡片")}`, link: "/core/card" },
        ],
      },
    ],
  },
});
