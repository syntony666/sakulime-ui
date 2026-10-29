import { fileURLToPath } from "node:url";
import { defineConfig } from "vitepress";

const zh = (t: string) => `<em>${t}</em>`;

const SITE = "https://sakulime-ui.syntony666.com";

export default defineConfig({
  title: "Sakulime UI",
  titleTemplate: ":title | Sakulime UI",
  description: "純 HTML + CSS 最簡單使用的 UI 介面",
  lang: "zh-TW",
  appearance: false,
  cleanUrls: true,
  sitemap: { hostname: SITE },
  head: [
    ["link", { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" }],
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
  // TODO: replace the favicon fallback with a real 1200x630 OG image
  transformHead({ pageData, siteData }) {
    const path =
      "/" +
      pageData.relativePath
        .replace(/\.md$/, "")
        .replace(/(^|\/)index$/, "$1");
    const url = SITE + path;
    const title = pageData.frontmatter.title ?? pageData.title ?? siteData.title;
    const desc =
      pageData.frontmatter.description ??
      pageData.description ??
      siteData.description;
    const type = path === "/" ? "website" : "article";
    const image = SITE + "/favicon.svg";
    const ld = (o: object) =>
      ["script", { type: "application/ld+json" }, JSON.stringify(o)] as [
        string,
        Record<string, string>,
        string,
      ];
    return [
      ["link", { rel: "canonical", href: url }],
      ["meta", { property: "og:title", content: title }],
      ["meta", { property: "og:description", content: desc }],
      ["meta", { property: "og:url", content: url }],
      ["meta", { property: "og:type", content: type }],
      ["meta", { property: "og:image", content: image }],
      ["meta", { property: "og:locale", content: "zh_TW" }],
      ["meta", { name: "twitter:card", content: "summary_large_image" }],
      ["meta", { name: "twitter:title", content: title }],
      ["meta", { name: "twitter:description", content: desc }],
      ["meta", { name: "twitter:image", content: image }],
      ld({
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteData.title,
        url: SITE,
        inLanguage: "zh-TW",
      }),
      ...(type === "article"
        ? [
            ld({
              "@context": "https://schema.org",
              "@type": "TechArticle",
              headline: title,
              description: desc,
              url,
              inLanguage: "zh-TW",
            }),
          ]
        : []),
    ];
  },
  srcDir: "doc",
  outDir: "site",
  vite: {
    publicDir: fileURLToPath(new URL("../public", import.meta.url)),
  },
  themeConfig: {
    outline: [2, 4],
    logo: "/favicon.svg",
    nav: [
      { text: "開始使用", link: "/introduction" },
      { text: "主題", link: "/theme" },
      { text: "Layout", link: "/layout/" },
      { text: "Core", link: "/core/" },
    ],
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
