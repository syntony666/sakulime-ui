import { fileURLToPath } from "node:url";
import customSelectors from "postcss-custom-selectors";
import { defineConfig } from "vitepress";

const zh = (t: string) => `<em>${t}</em>`;

const SITE = "https://sakulime-ui.syntony666.com";

const src = (p: string) => fileURLToPath(new URL(`../../${p}`, import.meta.url));

export default defineConfig({
  title: "Sakulime UI",
  titleTemplate: ":title | Sakulime UI",
  description: "CSS-first，寫 HTML 屬性就有的 UI 介面",
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
      "try{var t=localStorage.getItem('sl-theme');if(t){var d=document.documentElement;d.dataset.theme=t;d.classList.toggle('dark',localStorage.getItem('sl-dark')==='1')}}catch(e){}",
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
  // these labels are hardcoded in VitePress theme components and have no
  // config option, so the built HTML gets patched instead
  transformHtml(code) {
    return code
      .replaceAll('aria-label="extra navigation"', 'aria-label="其他導覽"')
      .replaceAll('aria-label="mobile navigation"', 'aria-label="行動版導覽"')
      .replaceAll('aria-label="Permalink to &quot;', 'aria-label="錨點 &quot;');
  },
  markdown: {
    codeCopyButtonTitle: "複製",
  },
  srcDir: "pages",
  outDir: "site",
  vite: {
    publicDir: fileURLToPath(new URL("../public", import.meta.url)),
    /* docs consume core's source css — expand :--sl-* selectors here too */
    css: { postcss: { plugins: [customSelectors()] } },
    /* package exports point at dist for publishing; alias the specifiers
       the docs import back to source so edits live-reload — keep this
       list in sync with the workspaces' exports maps */
    resolve: {
      alias: [
        {
          find: "@sakulime-ui/shared/vars.css",
          replacement: src("packages/shared/vars.css"),
        },
        {
          find: "@sakulime-ui/theme/sakulime.css",
          replacement: src("packages/theme/sakulime.css"),
        },
        {
          find: "@sakulime-ui/theme/terra.css",
          replacement: src("packages/theme/terra.css"),
        },
        {
          find: "@sakulime-ui/theme/umbra.css",
          replacement: src("packages/theme/umbra.css"),
        },
        {
          find: "@sakulime-ui/core/index.css",
          replacement: src("packages/core/src/index.css"),
        },
        {
          find: "@sakulime-ui/core/icons",
          replacement: src("packages/core/src/icons/index.ts"),
        },
        {
          find: "@sakulime-ui/layout/index.css",
          replacement: src("packages/layout/src/layout.css"),
        },
      ],
    },
  },
  themeConfig: {
    outline: { level: [2, 4], label: "本頁目錄" },
    logo: "/favicon.svg",
    docFooter: { prev: "上一頁", next: "下一頁" },
    sidebarMenuLabel: "選單",
    returnToTopLabel: "回到頂部",
    skipToContentLabel: "跳到內容",
    notFound: {
      title: "找不到頁面",
      quote: "網址可能打錯，或這個頁面已經移走了。",
      linkLabel: "回首頁",
      linkText: "回到首頁",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/syntony666/sakulime-ui" },
    ],
    sidebar: [
      { text: "開始使用", link: "/introduction" },
      { text: "主題", link: "/theme" },
      {
        text: "屬性",
        items: [
          { text: "總覽", link: "/attrs" },
          {
            text: "通用屬性",
            items: [
              { text: `Tone ${zh("色調")}`, link: "/attrs/tone" },
              { text: `Size ${zh("尺寸")}`, link: "/attrs/size" },
              { text: `Radius ${zh("圓角")}`, link: "/attrs/radius" },
              { text: `Pad ${zh("內距")}`, link: "/attrs/pad" },
              { text: `Interactive ${zh("互動")}`, link: "/attrs/interactive" },
              { text: `Gap ${zh("共用間距")}`, link: "/attrs/gap" },
            ],
          },
        ],
      },
      {
        text: "元件 Core",
        items: [
          { text: "安裝", link: "/core/" },
          {
            text: "基本元件",
            items: [
              { text: `Button ${zh("按鈕")}`, link: "/core/button" },
              { text: `Icon ${zh("圖示")}`, link: "/core/icon" },
              { text: `Dot ${zh("狀態點")}`, link: "/core/dot" },
              { text: `Chip ${zh("膠囊")}`, link: "/core/chip" },
            ],
          },
          {
            text: "容器",
            items: [
              { text: `Card ${zh("卡片")}`, link: "/core/card" },
              { text: `Notice ${zh("通知")}`, link: "/core/notice" },
            ],
          },
        ],
      },
      {
        text: "排版 Layout",
        items: [
          { text: "安裝", link: "/layout/" },
          {
            text: "格局設計",
            items: [
              { text: `Container ${zh("頁面容器")}`, link: "/layout/container" },
              { text: `Stack ${zh("堆疊")}`, link: "/layout/stack" },
              { text: `Row ${zh("橫列")}`, link: "/layout/row" },
              { text: `Grid ${zh("網格系統")}`, link: "/layout/grid" },
              { text: `RWD ${zh("響應式設計")}`, link: "/layout/responsive" },
              { text: `Placement ${zh("對齊")}`, link: "/layout/placement" },
            ],
          },
          {
            text: "頁面區塊",
            items: [
              { text: `Bar ${zh("頁緣區塊")}`, link: "/layout/bar" },
              { text: `Sidebar ${zh("側邊欄")}`, link: "/layout/sidebar" },
              { text: `Toast ${zh("通知角")}`, link: "/layout/toast" },
            ],
          },
        ],
      },
    ],
  },
});
