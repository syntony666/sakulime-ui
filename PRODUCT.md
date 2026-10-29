# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

外部前端開發者 — 在 plain HTML、React、Vue、Svelte 等環境中使用這套設計系統建介面的人。文件站讀者同樣是這群開發者：他們要快速看懂 `sl-*` 屬性怎麼組、每個元件有哪些軸、長出來是什麼樣子。

## Product Purpose

sakulime-ui 是一套 CSS-first 設計系統：只有兩件事 — `sl-*` 屬性管元件、狀態、modifier、版面，`--sl-*` 變數管顏色與尺度。沒有 framework adapter、沒有 JS 行為層、沒有 custom elements — `class` 完全留給使用者，永不跟系統衝突。

成功 = 開發者在任何框架（或不寫框架）都能直接採用，且單一 CSS 檔就能帶走整套系統。

## Positioning

「屬性即 API、變數即主題」— 鄰近產品（component framework、utility class 庫）都要綁 runtime 或佔用 `class` 命名空間；sakulime-ui 把整個系統收進 `sl-*` attributes + `--sl-*` custom properties，是純 CSS 層級就能完整表達的設計系統。

## Operating Context

- npm workspaces monorepo，四個 public entry：`sakulime-ui`（全包）、`@sakulime-ui/core`、`@sakulime-ui/layout`、`@sakulime-ui/theme`
- `packages/shared` 內部專用（private，變數 build 時 inline 進各 bundle）
- VitePress 文件站 `doc/` → `doc/site` 靜態輸出 → Cloudflare Workers（`doc/wrangler.toml`），線上 https://sakulime-ui.syntony666.com
- demo 由 `doc/stories/*.stories.ts` 渲染，經 `Demo`/`Playground` 元件注入 Shadow DOM，避免 VitePress reset 干擾設計系統 cascade
- 發佈走 changesets（四包 fixed 同版），master push → release PR → trusted publishing

## Capabilities and Constraints

- 元件層：`sl-card`、`sl-button` 等；子元素層：`sl-card-corner`、`sl-card-section` 等；共享軸：`sl-pad`、`sl-radius`、`sl-variant`、`sl-tone`、`sl-raised`、`sl-indicate`；版面：`sl-*` layout 屬性
- 顏色用 CSS Color 4/5：`oklch()`、`color-mix()`，目標 WCAG AA
- Google Fonts 走 `<link>`/`preconnect`，Cloudflare Fonts rewrite 成 same-origin `/cf-fonts`
- 所有行為純 CSS selector 實作 — 不引 JS runtime 是硬約束
- **未定**：英文版文件（zh-TW 為目前唯一語言，之後再評估）

## Brand Commitments

- 名稱 Sakulime UI；兩種品牌主題為同產品的兩種個性：`sakulime`（預設，活潑）與 `terra`（沉穩），`<html data-theme="…">` 切換
- 文件語言 zh-TW（繁體中文）

## Evidence on Hand

- 文件站本身即最完整的 demo：每個元件頁有 Playground（story args/argTypes 驅動）＋靜態 demo 列＋自動縮排的即時 markup
- `doc/stories/components/*.stories.ts` 是 demo 資料來源（button、card）
- 無使用者見證、案例、下載數據 — 對外證據目前只有產品本身

## Product Principles

1. **CSS 就是全部** — 行為、狀態、配置全走 selector + custom property；不為任何場景引 runtime
2. **`class` 是使用者的** — 系統只用 `sl-*`，永不與消費端命名衝突
3. **一份檔案帶走** — 單一 CSS 即完整系統；分包（core/layout/theme）是取用彈性，不是依賴層級
4. **文件即證據** — 文件站的 demo 要真實可互動（Playground），markup 要能直接抄走
