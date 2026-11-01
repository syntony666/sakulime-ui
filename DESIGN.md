---
name: Sakulime UI
description: CSS-first design system with sl-* attributes, --sl-* tokens, optional JS enhancements
colors:
  # seeds: the only authored colors per theme; every other --sl-* token
  # derives via oklch(from) + light-dark() in theme/_internal/derived.css
  sakulime-seed-primary: "#f4b160"
  sakulime-seed-secondary: "#fdc5cf"
  sakulime-seed-accent: "#d43d5e"
  terra-seed-primary: "#1f3d3d"
  terra-seed-secondary: "#d6d3d1"
  terra-seed-accent: "#1f3d3d"
  umbra-seed-primary: "#8fbcb4"
  umbra-seed-secondary: "#a8a29e"
  umbra-seed-accent: "#93c4bd"
  # derived snapshot: sakulime in light scheme (hex approximates the
  # oklch output); text-secondary/muted are alpha mixes, not hexes
  sakulime-bg: "#ffeef1"
  sakulime-surface: "#fff8f9"
  sakulime-border: "#e0afb7"
  sakulime-text: "#481e28"
  sakulime-text-strong: "#320a16"
  sakulime-text-accent: "#b11242"
  sakulime-text-secondary: "color-mix(text 88%, transparent)"
  sakulime-text-muted: "color-mix(text 78%, transparent)"
  sakulime-text-invert: "#fbf5f6"
  sakulime-primary-fg: "#2a1904"
  sakulime-primary-bg: "#fce3c9"
  sakulime-secondary-fg: "#26181b"
  sakulime-secondary-bg: "#ffe8eb"
  # status hues are theme-universal; only the scheme pole differs
  ok: "#0e653f"
  warn: "#eab444"
  danger: "#a20222"
  ok-dark: "#45af81"
  warn-dark: "#b78a16"
  danger-dark: "#f8767a"
typography:
  package:
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif"
    lineHeight: "1.5"
  # doc-site font stacks live in the vitepress theme layer
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
  # card/notice cap full at ~one line height via --sl-radius-full
  full: "9999px"
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
    backgroundColor: "{colors.sakulime-seed-primary}"
    textColor: "{colors.sakulime-primary-fg}"
    rounded: "{rounded.md}"
    padding: "0 12px"
    height: "32px"
  button-invert:
    backgroundColor: "{colors.sakulime-bg}"
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
    backgroundColor: "color-mix(in srgb, #f4b160 20%, #fff8f9)"
    textColor: "{colors.sakulime-text}"
    rounded: "{rounded.sm}"
---

# Design System: Sakulime UI

## Overview

**Creative North Star: "Cream Sakura 奶油櫻花"**

奶油色紙面打底、櫻花粉做邊框與次色、覆盆紅當可讀的強調文字色，像和菓子店裡攤開的手冊：柔軟、甜，但每一條 hairline 都對齊得精準。系統有三個主題：`sakulime`（預設）走活潑（奶油×琥珀×櫻花），`terra` 走沉穩（整體暖 stone，只留一個青墨給 accent 與 CTA），`umbra` 是同一座 stone 畫廊的夜間面（暗色 scheme，淺青墨 action）。三者 import 同一份 `derived.css`，各自只 authored 三個 seed 加一個 color-scheme；骨架完全相同是字面事實。

互動感是刻意的性格：按鈕 hover 會彈起（`scale(1.03)`），控制項 hover 有邊框回饋，元件碰了要有反應；反應走 transform/filter 跟 hover 當下才加的影，表面不常駐陰影。

**Key Characteristics:**
- 屬性即 API：`sl-*` attribute 寫元件/狀態/modifier，`--sl-*` 變數管顏色尺度，`class` 永遠留給使用者；attribute 的值槽承載語意（`sl-card="hollow"`、`sl-container="md"`）
- 三 seed 衍生調色：主題只 authored `--sl-seed-primary/secondary/accent`，`oklch(from)` 管線算出整張 token 表，`light-dark()` 給明暗雙極
- 單一尺度：xs→5xl 九階，間距/圓角/字級共用同一套台階
- Flat by default：結構靠 hairline + 色階 tint，陰影不常駐，`sl-interactive` 的 hover 才給浮起、壓下或一道影
- 頁面 signature：頂端 2px 漸層 hairline（primary→accent）＋ hero 名稱漸層字（文件站）
- Demo canvas：圓點格紙（1rem 格）當尺規，元件邊緣落在格點上（文件站）

## Colors

調色盤是「裝飾色」與「文字色」分工：`primary`/`secondary` 是淺而甜的裝飾色（按鈕底、hairline、漸層），`text-accent` 才是能在奶油底上讀的強調文字色。整張色表不再手寫：每個主題只 authored 三個 seed，`oklch(from)` 取 seed 的色相、按固定明度階梯與彩度縮放算出全部 token，`light-dark()` 讓每個 token 帶明暗兩極。換主題只換 seed，公式一行不動；front matter 的色票是 sakulime 亮端的衍生快照。

### Seeds
- **琥珀杏 Sakulime Primary** (#f4b160): 品牌主色，按鈕底、頂端漸層 hairline 起點、checkbox accent。太淺不能當文字色，`primary-fg` 自動推一個同色相深墨做面上字
- **櫻花粉 Sakulime Secondary** (#fdc5cf): 材料色，整個系統的「紙」都從它的色相降彩推演：bg、surface、border、text 家族、漸層終點、zebra
- **覆盆紅 Sakulime Accent** (#d43d5e): 強調墨的原料；`--sl-text-accent` 把它的明度 clamp 進可讀墨帶（亮端上限 0.49，出廠即 AA），標題、連結、行內 code、sidebar 選中條

### 衍生階梯（亮 / 暗）
- **Surfaces**（secondary 色相，彩度壓近零）：bg 96.5% / 21.5%，surface 98.5% / 27%，border 80% / 44.5%
- **Ink**（同一色相推兩極）：text 30% / 92%，strong 22% / 97%；`text-invert` 是反向極，`text-secondary`/`text-muted` 是 text 的 88%/78% 透明 mix
- **Tone 家族**：`*-bg` 是 tone 面往靜音方向推的 tint（亮 93–95%、暗 24.5–30%）；`*-fg` 是同色相推到遠端墨位的面上字，clamp 掛在 face 明度 0.62，深淺 tone 自動翻墨

### Terra 與 Umbra（同骨架的另兩個主題）
- **terra**：結構照 map-gallery，整體暖 stone；secondary seed `#d6d3d1` 推演所有表面與墨，青只有一個家族 `#1f3d3d`，同時是 accent 墨與 primary CTA（＋淡青 tint 底），chrome 被 accent 上色時仍是墨，不是第二種顏色
- **umbra**：同一座畫廊的夜間面，`color-scheme: dark`＋淺化 seed（primary `#8fbcb4`、accent `#93c4bd`、secondary `#a8a29e`）；secondary 是 tone face 本身，暗主題裡必須是淺石才不會沉進暗表面

### Status
- **Ok / Warn / Danger**：跨主題通用 hue，只分 light-dark。ok 與 danger 亮端壓在 45% 明度（tone wash 上保住 AA 的最淺深度）、暗端 68%/72%；warn 兩端都是琥珀金（亮 80% / 暗 66%），它的墨固定配深端：亮面 strong ink、暗面 invert ink，淺墨會沉進中明度的金

### Named Rules
**The Readable Accent Rule.** 裝飾色（primary/secondary/warn）永遠不當文字色，太淺。文字用 `text-accent`，或經 `--sl-tone-text` 自動混向文字色；混法看 tone：primary/secondary 是 12% + text，warn 是 30% + text-strong，success/danger 用原色。色票美不美跟字讀不讀得到是兩件事。

## Typography

**Body Font:** 套件端 shipped 值是 `Inter, ui-sans-serif, system-ui`；文件站字體層（vitepress theme）補成 Inter（拉丁）→ Noto Sans TC（zh-TW，自架 subset）→ PingFang TC / Microsoft JhengHei fallback
**Mono Font:** JetBrains Mono → Noto Sans TC → ui-monospace，用在 code、attr 名稱、playground 控制項標籤（文件站層）

**Character:** 拉丁用 Inter 的清爽、中文交給 Noto TC；mono 一律 JetBrains Mono 拉出「屬性即 API」的技術感。`sl-*` token 在說明欄裡用 `code` 呈現且 nowrap。

### Hierarchy
- **Hero name** (bold, clamp, 1.2): 首頁 hero，漸層 clip 文字（primary→accent）
- **H1** (bold, 2em): 頁面標題，accent 色＋底部漸層淡出底線；`*斜體*` 是副標（muted 0.8em 非斜體）
- **H2–H4** (semibold): 章節標題，accent 色
- **Body** (regular, 1rem): 內文，text 色；套件端 `line-height: 1.5`，文件站正文 24px（VP 主題值，同尺度）
- **Label** (mono, 13px, semibold): 控制項名稱、token、副標註記
- **Code** (mono, 13px): demo markup，attr 名 accent 色，tag/value 保持文字色

## Layout

佈局原語自成一個套件（`@sakulime-ui/layout`），一個原語一個檔案：`packages/layout/src/` 下 container、stack、content、row、grid、sidebar、bar、float、gap、responsive，由 `layout.css` 依序 import，各檔的 `@layer` 區塊依名併入共享的 theme/base/attrs 三層。文法四種形式：元件標記 `sl-<元件>[="型態"]`、元件設定 `sl-<元件>-<設定>`、子元素 `sl-<元件>--<零件>`（雙 dash 寫在子層）、通用屬性 `sl-<屬性>`；型態槽只裝種類跟位置語意，間距不進值槽。

- **容器 `sl-container`**：值語法 `"sm"|"md"|"lg"`（bare = md），45/60/75rem 尺規，水平 auto＋`--sl-container-pad`（預設 `--sl-lg`）內距；文件站內文欄吃 md
- **直排 `sl-stack`**：flex column 垂直群組，父層擁有節奏，直接子層 block margin 歸零、寬度拉滿
- **文流 `sl-content`**：block 內容欄，子層保留自己的 margin，相鄰補 `> * + *` margin 節奏，首末子層對外 margin 清零
- **橫排 `sl-row`**：flex-wrap 水平流（tag 列、按鈕群），子層內容寬換行、`min-inline-size:0`
- **格網 `sl-grid`**：預設 auto-fill 欄，`--sl-grid-min`（14rem）是欄寬地板；設定 `sl-grid-cols="1..12"` 換明確欄數、`sl-grid-cols-lg/md/sm` 各斷點重述；子層 `sl-grid--span="N|full"` 跨欄並 clamp 到當前欄數（bare = full），不炸出隱含軌
- **頁緣 `sl-bar`**：flex＋`space-between`，值選邊（`"top"/"bottom"`/bare 文流帶），edge 值預設 sticky＋同側髮線；設定 `sl-bar-fixed` 固定到視窗脫離文流，body `:has()` 在同側自動補 `--sl-bar-h` 內距，列印回 static
- **側欄 `sl-sidebar`＋`sl-sidebar--rail`**：flex-wrap 版面，rail 由子層標記認領（`--sl-sidebar-w` 16rem），位置跟 DOM 序；主欄 `min-inline-size: var(--sl-sidebar-min,55%)` 就是換行扳機，不用 media query
- **角落 `sl-float`**：fixed 角落容器，值是六角落 `<邊>-<側>`（top/bottom × start/center/end，bare = bottom-end）；寬高 clamp 進 viewport，`env()` 讓開 home indicator，列印回 static
- **間距 `sl-gap`**：唯一的間距屬性，設 `--sl-gap` 會繼承——寫在原語自己或祖先上，最近的贏；各原語的 `--sl-<原語>-gap` 是逃脫槽（七個都 `@property` non-inheriting 註冊，外層的逃脫值滲不進巢狀同名原語），預設 stack/content/row/grid/float/bar = `md`、sidebar = `lg`
- **Slot 封印**：generic 屬性只在列名的消費者上展開 `--sl-*` slot，消費端在 base 把讀取的 slot 自我 default 成 manifest，祖先的同名牌漏不進來
- **響應式族**：`sl-hide-*`/`sl-show-*` 在斷點兩側互為鏡像，一對 hide/show 跨線換內容；斷點 45/60/75rem 是 `--sl-container-*` 的 hardcode 孿生（media query 讀不到 var，手動同步）
- **間距節奏**：一律走 xs→5xl 台階；demo stage padding 兩格（`--sl-3xl`）、axis 列 gap 12px（文件站）
- **Demo canvas**：stage 圓點格紙 1rem 一格，視覺上同時是裝飾和尺規（md 按鈕高 = 2 格）；文件站 playground 欄位 `minmax(16rem, 1fr)` auto-fill、間距 `var(--sl-lg)`

## Elevation & Depth

**Flat by default。** 系統沒有常駐陰影，層次靠 hairline（`--sl-border`）＋色階 tint（surface vs bg vs soft-mix）表達。陰影出現在浮層與 `sl-interactive` 的 hover；notice 外緣那圈常駐 2px ring 是 hairline 語言（把膠囊描出來的框線），不計 elevation。

### Shadow Vocabulary
`sl-interactive` 的五值配方走 `--sl-i-{transform,shadow,filter}` 三槽，card 與 button 共用同一條 hover 回放；`prefers-reduced-motion` 統一切除 transition：
- **Grow**（bare / `"grow"`，`scale(1.03)`）：彈起
- **Lift**（`translateY(-4px)`＋`0 8px 20px text 24%` 影）：浮起帶影
- **Raise**（`0 3px 10px text 20%` 影）：原地起影
- **Press**（`scale(0.97)`）：壓下
- **Dim**（`filter: brightness(0.92)`）：變暗
浮層與文件站 chrome 另有兩筆：
- **Overlay** (`0 4px 6px -1px / 0 2px 4px -2px rgb(0 0 0 / .07)`): 下拉選單等浮層（文件站）
- **Demo frame** (`0 1px 2px text 6%`): demo 外框極淡的定界影（文件站）

### Named Rules
**The Flat-By-Default Rule.** 表面預設是平的。深度靠 hover 互動（`sl-interactive`）表達，不常駐。

## Shapes

- **圓角屬性**：`sl-radius` none/sm(4)/md(8，預設)/lg(12)/full，映射到通用尺度台階；`full` 在卡片/通知上是「一行膠囊」封頂（半徑 = 一行高），其他元件仍是大值膠囊
- **卡片裁切**：`overflow:hidden` 讓 inset 出血內容自動吃卡片圓角，貼邊內容不用自己圓角
- **Hairline 語言**：1px `--sl-border` 無所不在，卡片邊、section 分隔線（滿版）、h1 漸層底線、sidebar 選中條 2px accent bar（文件站）
- **Signature 形狀**：頂端 2px 漸層 hairline；corner chip 方形小圓角（`--sl-xs`）貼卡片頂角

## Components

### Buttons `sl-button`
- **Character:** 碰了會彈，內建 `hover: scale(1.03)` 是刻意的活潑回饋；宣告 `sl-interactive` 的按鈕改跑指定配方（grow/lift/raise/press/dim）
- **Shape:** `sl-radius` 屬性（預設 md=8px），2px transparent border 撐住箱型
- **Variants:** `normal`（實心=預設）/ `invert`（描邊）/ `ghost`（無框）/ `underline`（2px 底線，0.3em offset）
- **Tones:** `sl-tone` primary/secondary/success/warning/danger，bg/text/invert 三 slot 自動配色
- **Sizes:** `sl-size` sm/md/lg，高度吃尺度台階（24/32/40px），字級 12/16/20px
- **States:** `:disabled` opacity .6；transition 走 transform/shadow/filter 加表面色（background/border/color）

### Cards `sl-card`
- **Surface:** `--sl-surface` 底＋1px `--sl-border`＋`sl-radius`＋`--sl-pad`（預設 16px）；attribute 的值選外框：bare 描邊面、`hollow` 虛線空態、`plain` 去框留面、`blank` 連面一起去掉（配 `sl-card--section="blank"` 做純空態）
- **子元素，角落標記 `sl-card--corner`:** 純位置件（scope 到卡片直接子層），`end`（右上，預設）/`start`（左上），`bottom` 換下緣、兩軸組合（`"bottom start"` 是左下）；`font-size: var(--sl-lg)` 當 em context，長相由同元素疊加的小元件決定：`sl-chip` 貼邊角落標籤（四角 `--sl-xs` 小圓角，朝卡角那角由卡片 `overflow` 裁出同色曲線）、`sl-dot` 8px 點、`sl-icon` 16px 圖示，後兩者各退 `--sl-sm`/`--sl-xs` 內縮浮起
- **子元素，分區 `sl-card--section`:** 滿版 hairline 分隔的內容列；第一節不畫線（=header）；值選分區性格：`inset` 抵銷內距做滿版區塊（圖/地圖/色塊，位置由 DOM 序決定）、`blank` 置中空態、`secondary`/`active` 上色區（貼邊出血）、`center` 文字置中；leading/trailing corner 不算內容
- **Options:** `sl-card-indicate="top|bottom|start|end"`（3px tone 邊緣強調條）、`sl-interactive`（hover 互動）、`sl-pad`（sm/md/lg）

### Icons `sl-icon`
- **Size:** 預設 `1em` 跟字級走，插在句子裡就是字高；`sl-icon-size` sm(0.75em)/lg(1.5em)/xl(2.5em)/2xl(4em) 以所在字級為基準縮放
- **Alignment:** `inline-flex`＋`vertical-align:-0.125em`，視覺坐上文字底線，inline 放置不頂行
- **Ink:** `currentColor` 繼承文字色；`sl-tone` 寫在 icon 自己身上可染色，self-default 封印父層 tone slot，實心按鈕裡的 icon 不會被 button surface 改色
- **Modifiers:** `sl-icon-*` 名稱空間（size/flip/rotate/spin/frame/disabled/space），flip/rotate 走獨立 transform 屬性、spin 動 `transform`，三者可疊加；手動貼上 `<svg sl-icon>` 同樣生效
- **JS 選配：** `sl-icon="pack:name"` 由共用 resolver 填 svg；名稱切在第一個冒號（pack 名可多節），沒有冒號時第一個 dash 當分隔（`si-github`，只適用單字前綴）。不載 JS 就手動貼上 `<svg sl-icon>`

### Dots `sl-dot`
- **Size:** `0.5em` 跟字級走，x-height 高，插句子、列表、表格都不用調
- **Ink:** `currentColor` 繼承文字色；`sl-tone` 染成狀態色，self-default 封印父層 tone slot
- **Shape:** `inline-block` 純圓，空元素，不放內容（要 icon 用 `sl-icon` 組合）

### Chips `sl-chip`
- **Size:** 內文 `0.875em` 跟字級走，em 制，放在標題或 meta 列都自動合比例；`sl-size`（sm/md/lg → 12/16/20px）換成絕對字級，padding/gap 是 em 所以整顆等比縮放
- **Surface:** tone 20% + surface 的霧面底＋tone-text 墨，沒寫 tone 是中性墨黑 wash；`9999px` 膠囊形（角落情境縮成 `--sl-xs`）
- **Composition:** `inline-flex`＋`0.3em` gap，`<i sl-icon>` 直接放進去就對齊

### Notices `sl-notice`
- **Surface:** tone 12% wash 膠囊＋tone-text 墨，浮空框：`3px solid var(--sl-surface)` 環帶把 wash 跟外緣 `box-shadow` 2px tone/border 混色細線隔開
- **Shape:** 預設膠囊端，chip 的 block 級兄弟；`full` 是「一行膠囊」（半徑 = 一行高），一、二行全圓、三行起中段跑直線；`sl-radius` 可轉 `sm/md/lg/none`
- **Width:** 預設填滿容器（橫幅）；`sl-notice="fit"` 縮內容寬。進 `sl-float` 角落容器就讀成 toast：位置/堆疊由佈局層接管，剩 dismiss/timeout 留消費端
- **Composition:** `display: block` 行內流，icon、訊息、連結同一串文字流；`sl-notice--action` 直接子層 absolute 置中貼邊（預設 end，`="start"` 換左緣），`:has()` 在 padding 預留專用欄（`--sl-notice-action-w` 槽位）；`sl-notice-align="end"` 寫在 notice 自己身上，整串文字對齊右緣

### Demo Chrome（文件站元件）
- **Stage:** 圓點格紙背景＋`--sl-3xl` padding＋細框，內容在 Shadow DOM 裡渲染
- **Playground:** demo 下方的控制面板，欄位 `11rem` 名稱欄＋控制項欄、`minmax(16rem, 1fr)` auto-fill 排欄、間距 `var(--sl-lg)`，mono 標籤、12px muted 說明
- **Sidebar active:** 軟 tint 底＋內側 2px accent bar，文字色不變，選中態由面而非字表達
- **Theme switcher:** nav 裡「github | Theme」chip，圓點＋名稱，下拉每列帶主題 signature 圓點

## Do's and Don'ts

### Do:
- **Do** 只用 `sl-*` attribute 與 `--sl-*` token，行為、狀態、配置全走 CSS selector
- **Do** 守住 slot 封印：generic 屬性只展開在列名的消費者上，消費端在 base 自我 default 成 manifest，間距 slot 經 `@property` 註冊 non-inheriting
- **Do** 淺色 tone（primary/secondary）的文字色走 `--sl-tone-text` 混入文字色，維持可讀
- **Do** 讓分隔線貼著 inset 邊緣，間距由後繼元素自己帶，不在圖片側留白
- **Do** 用 demo 圓點格紙當尺規，元件尺寸對齊台階（md 按鈕 = 2 格）

### Don't:
- **Don't** 用 `class` 做系統樣式，`class` 是消費者的命名空間
- **Don't** 給元件常駐陰影，浮起走 `sl-interactive` 明確宣告
- **Don't** 拿 `--sl-primary`/`--sl-secondary` 當文字色，用 `text-accent` 或 tone-text 混合
- **Don't** 為元件外觀引 JS runtime，需要行為時找 selector 方案（`:has()`、相鄰、positional）
- **Don't** 讓 corner 影響分區判位，leading/trailing `sl-card--corner` 不算內容節點
