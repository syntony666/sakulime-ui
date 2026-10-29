---
name: Sakulime UI
description: CSS-first design system — sl-* attributes, --sl-* tokens, zero runtime
colors:
  sakulime-bg: "#fbf0e7"
  sakulime-surface: "#fdf7f3"
  sakulime-border: "#f9c6c7"
  sakulime-text: "#7d2c4b"
  sakulime-text-strong: "#5c2138"
  sakulime-accent: "#d43d5e"
  sakulime-primary: "#f4b160"
  sakulime-primary-bg: "#fce8d0"
  sakulime-secondary: "#fdc5cf"
  sakulime-secondary-bg: "#fdeef1"
  sakulime-ok: "#3d7354"
  sakulime-warn: "#f2cf4a"
  sakulime-danger: "#b53349"
  terra-bg: "#f5f5f4"
  terra-surface: "#fdfcfa"
  terra-border: "#a8a29e"
  terra-text: "#292524"
  terra-accent: "#2e7a82"
  terra-primary: "#1f3d3d"
  terra-secondary: "#d6d3d1"
  terra-ok: "#047857"
  terra-warn: "#e0a94e"
  terra-danger: "#b91c1c"
typography:
  body:
    fontFamily: '"Inter", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "1rem"
  mono:
    fontFamily: '"JetBrains Mono", "Noto Sans TC", ui-monospace, monospace'
    fontSize: "13px"
  control:
    fontFamily: '"Inter", "Noto Sans TC", "PingFang TC", "Microsoft JhengHei", sans-serif'
    fontSize: "1rem"
rounded:
  none: "0"
  sm: "4px"
  md: "8px"
  lg: "12px"
  full: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  2xl: "24px"
  3xl: "32px"
  4xl: "40px"
  5xl: "48px"
components:
  button-primary:
    backgroundColor: "{colors.sakulime-primary}"
    textColor: "{colors.sakulime-text-strong}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  button-invert:
    backgroundColor: "transparent"
    textColor: "{colors.sakulime-text}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  card:
    backgroundColor: "{colors.sakulime-surface}"
    textColor: "{colors.sakulime-text}"
    rounded: "{rounded.md}"
    padding: "16px"
  corner-chip:
    backgroundColor: "color-mix(in srgb, #f4b160 20%, #fdf7f3)"
    textColor: "{colors.sakulime-text}"
    rounded: "{rounded.sm}"
---

# Design System: Sakulime UI

## Overview

**Creative North Star: "Cream Sakura 奶油櫻花"**

奶油色紙面打底、櫻花粉做邊框與次色、覆盆紅當可讀的強調墨色 — 像和菓子店裡攤開的手冊：柔軟、甜，但每一條 hairline 都對齊得精準。系統有兩種品牌個性：`sakulime` 走活潑（奶油×琥珀×櫻花），`terra` 走沉穩（整體暖 stone，accent 與 CTA 往青走一點）；骨架完全相同，只有調色盤換人。

互動感是刻意的性格：按鈕 hover 會彈起（`scale(1.05)`），控制項 hover 有邊框回饋 — 元件碰了要有反應，但反應一律走 transform/color，不走陰影。

**Key Characteristics:**
- 屬性即 API：`sl-*` attribute 寫元件/狀態/modifier，`--sl-*` 變數管顏色尺度，`class` 永遠留給使用者
- 單一尺度：xs→5xl 九階，間距/圓角/字級共用同一套台階
- Flat by default：結構靠 hairline + 色階 tint，陰影是選配的 `sl-raised`
- 頁面 signature：頂端 2px 漸層 hairline（primary→accent）＋ hero 名稱漸層字
- Demo canvas：圓點格紙（1rem 格）當尺規，元件邊緣落在格點上

## Colors

調色盤是「裝飾色」與「墨色」分工：`primary`/`secondary` 是淺而甜的裝飾色（按鈕底、hairline、漸層），`text-accent` 才是能在奶油底上讀的強調墨色。

### Primary
- **琥珀杏 Sakulime Primary** (#f4b160): 品牌主色 — 按鈕底、頂端漸層 hairline 起點、checkbox accent。太淺不能當文字色；配 `primary-fg` 深梅紅做面上字
- **奶油 Sakulime BG** (#fbf0e7): 全頁背景，整個系統的「紙」

### Secondary
- **櫻花粉 Sakulime Secondary** (#fdc5cf): 漸層終點、表格 zebra、柔和次強調
- **覆盆紅 Text Accent** (#d43d5e): 可讀強調色 — 標題、連結、行內 code、sidebar 選中條。文件站再往下調 oklch -0.06 補到 AA

### Neutral
- **梅紅 Text** (#7d2c4b): 內文墨色（奶油底上的主文字）
- **深梅 Text Strong** (#5c2138): 標題級墨色、`primary-fg`
- **櫻花邊 Border** (#f9c6c7): 所有 hairline — 卡片邊、分隔線、demo 框、圓點格紙都是它
- **奶白 Surface** (#fdf7f3): 卡片/code 塊的表面色，比 bg 再淺一階

### Terra（第二品牌主題）
- 結構照 map-gallery：整體是 stone — bg #f5f5f4、surface #fdfcfa（暖白）、text #292524、strong #1c1917、secondary #d6d3d1、border #a8a29e；青色只落在 accent #2e7a82 與 primary #1f3d3d（深青 CTA）＋其淡青底 #d8e5e2，像該站 stone UI 上的 teal 動作鈕

### Status
- **Ok** sakulime #3d7354 / terra #047857、**Warn** #f2cf4a / #e0a94e、**Danger** #b53349 / #b91c1c — `sl-tone` 直接取用

### Named Rules
**The Readable Accent Rule.** 裝飾色（primary/secondary/warn）永遠不直接當文字色 — 太淺。文字用 `text-accent`，或經 `--sl-tone-text` 自動混向墨色（tone 12% + text）。色票美不美跟字讀不讀得到是兩件事。

## Typography

**Body Font:** Inter（拉丁）→ Noto Sans TC（zh-TW，自架 subset）→ PingFang TC / Microsoft JhengHei fallback
**Mono Font:** JetBrains Mono → Noto Sans TC → ui-monospace — code、attr 名稱、playground 控制項標籤

**Character:** 拉丁用 Inter 的清爽、中文交給 Noto TC；mono 一律 JetBrains Mono 拉出「屬性即 API」的技術感 — `sl-*` token 在說明欄裡用 `code` 呈現且 nowrap。

### Hierarchy
- **Hero name** (bold, clamp, 1.2): 首頁 hero — 漸層 clip 文字（primary→accent）
- **H1** (bold, 2em): 頁面標題 — accent 色＋底部漸層淡出底線；`*斜體*` 是副標（muted 0.8em 非斜體）
- **H2–H4** (semibold): 章節標題 — accent 色
- **Body** (regular, 1rem, 1.6): 內文 — text 色
- **Label** (mono, 13px, semibold): 控制項名稱、token、副標註記
- **Code** (mono, 13px): demo markup — attr 名 accent 色，tag/value 保持墨色

## Layout

- **容器尺規**：`sl-container-sm/md/lg` = 45/60/75rem，水平 auto＋`--sl-lg` 內距；文件站內文欄直接吃 `container-md`（60rem）
- **間距節奏**：一律走 xs→5xl 台階 — demo stage padding 兩格（`--sl-3xl`）、axis 列 gap `12px`、playground 欄位間距 `16px/48px`
- **Demo canvas**：stage 圓點格紙 1rem 一格 — 視覺上同時是裝飾和尺規（md 按鈕高 = 2 格）
- **響應式**：demo 列 flex-wrap 自然換行；playground 欄位 `minmax(14rem, 1fr)` auto-fill

## Elevation & Depth

**Flat by default。** 系統沒有常駐陰影 — 層次靠 hairline（`--sl-border`）＋色階 tint（surface vs bg vs soft-mix）表達。陰影只出現在浮層：theme 下拉選單、以及明確宣告 `sl-raised` 的卡片。

### Shadow Vocabulary
- **Raised** (`0 2px 8px color-mix(in srgb, var(--sl-text) 12%, transparent)`): `sl-raised` 選配浮起
- **Overlay** (`0 4px 6px -1px / 0 2px 4px -2px rgb(0 0 0 / .07)`): 下拉選單等浮層
- **Demo frame** (`0 1px 2px text 6%`): demo 外框極淡的定界影

### Named Rules
**The Flat-By-Default Rule.** 表面預設是平的。深度靠狀態（hover transform）或明確的 `sl-raised` 表達，不常駐。

## Shapes

- **圓角軸**：`sl-radius` none/sm(4)/md(8，預設)/lg(12)/full(999) — 映射到通用尺度台階
- **卡片裁切**：`overflow:hidden` 讓 inset 出血內容自動吃卡片圓角 — 貼邊內容不用自己圓角
- **Hairline 語言**：1px `--sl-border` 無所不在 — 卡片邊、section 分隔線（滿版）、h1 漸層底線、sidebar 選中條 3px accent bar
- **Signature 形狀**：頂端 2px 漸層 hairline；corner chip 方形小圓角（`--sl-xs`）貼卡片頂角

## Components

### Buttons `sl-button`
- **Character:** 碰了會彈 — `hover: scale(1.05)` 是刻意的活潑回饋
- **Shape:** `sl-radius` 軸（預設 md=8px），2px transparent border 撐住箱型
- **Variants:** `normal`（實心=預設）/ `invert`（描邊）/ `ghost`（無框）/ `underline`（2px 底線，0.3em offset）
- **Tones:** `sl-tone` primary/secondary/success/warning/danger — bg/text/invert 三 slot 自動配色
- **Sizes:** `sl-size` sm/md/lg — 高度吃尺度台階（24/32/40px），字級 12/16/20px
- **States:** `:disabled` opacity .6；transition 只走 transform/color

### Cards `sl-card`
- **Surface:** `--sl-surface` 底＋1px `--sl-border`＋`sl-radius`＋`--sl-pad`（預設 16px）
- **子元素 — 角落標記 `sl-card-corner`:** 頂角 chip，`end`（右上）/`start`（左上）＋ `text-sm`/`text-xs`/`indicator` 型態；底色是 tone 20% + surface 的不透明 tint — 疊在圖片上也讀得到；`indicator` 為實色圓點，裡面放 svg/img 變 icon
- **子元素 — 分區 `sl-card-section`:** 滿版 hairline 分隔的內容列；第一節不畫線（=header）；`="inset"` 抵銷內距做滿版區塊（圖/地圖/色塊），位置由 DOM 順序決定（首節貼上、末節貼下、中間貼左右）；leading/trailing corner 不算內容
- **Options:** `sl-variant="hollow"`（虛線描邊）、`sl-indicate`（邊緣強調色條）、`sl-raised`（選配陰影）、`sl-pad`（sm/md/lg）

### Demo Chrome（文件站元件）
- **Stage:** 圓點格紙背景＋`--sl-3xl` padding＋細框，內容在 Shadow DOM 裡渲染
- **Playground:** demo 下方的控制面板 — 欄位 `10rem` 名稱欄＋控制項欄，mono 標籤、12px muted 說明
- **Sidebar active:** 軟 tint 底＋內側 3px accent bar，文字色不變 — 選中態由面而非字表達
- **Theme switcher:** nav 裡「github | Theme」chip — 圓點＋名稱，下拉每列帶主題 signature 圓點

## Do's and Don'ts

### Do:
- **Do** 只用 `sl-*` attribute 與 `--sl-*` token — 行為、狀態、配置全走 CSS selector
- **Do** 淺色 tone（primary/secondary）的文字色走 `--sl-tone-text` 混入墨色，維持可讀
- **Do** 讓分隔線貼著 inset 邊緣 — 間距由後繼元素自己帶，不在圖片側留白
- **Do** 用 demo 圓點格紙當尺規 — 元件尺寸對齊台階（md 按鈕 = 2 格）

### Don't:
- **Don't** 用 `class` 做系統樣式 — `class` 是消費者的命名空間
- **Don't** 給元件常駐陰影 — 浮起走 `sl-raised` 明確宣告
- **Don't** 拿 `--sl-primary`/`--sl-secondary` 當文字色 — 用 `text-accent` 或 tone-text 混合
- **Don't** 為元件外觀引 JS runtime — 需要行為時找 selector 方案（`:has()`、相鄰、positional）
- **Don't** 讓 corner 影響分區判位 — leading/trailing `sl-card-corner` 不算內容節點
