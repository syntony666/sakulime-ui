---
title: Icon 圖示
description: sl-icon 圖示標記，大小跟字級走、用 sl-tone 上色；圖包由消費者註冊，icon() 產生 SVG 字串。
---

<script setup>
import * as IconDemos from "../../demos/components/icon.demo";
</script>

# Icon *圖示*

`sl-icon` 是加在 SVG 上的屬性標記。它不是元素、不渲染內容，只控制 SVG 在行內的大小、顏色與對齊。加了之後大小固定 `1em`，顏色繼承 `currentColor`（或寫 `sl-tone`），垂直位置對齊文字底線。

<Playground :meta="IconDemos.default" :render="IconDemos.Icon.render" />

## 使用

### 貼 SVG

從 icon 庫（lucide、Simple Icons、icones.js.org）複製一段 SVG 貼進 HTML，加上 `sl-icon` 就生效。這條路徑不需要任何 JS。

```html
<svg sl-icon viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
</svg>
```

### 寫名稱 `<i sl-icon="...">`

註冊圖包之後（見[安裝](#安裝)），任何元素寫上名稱就會換成圖示：

```html
<i sl-icon="lucide:zap"></i>
<i sl-icon="si-github"></i>
```

名稱格式是 `package:name`。分隔符號用 `:` 最穩，`-` 只在 package 名是單字時安全。

佔位標籤慣用 `<i>`，`<span>`、`<icon>` 也行。

結束標籤**一定要寫**。JSX 或模板編譯的環境沒有此問題。

第一次呼叫 `registerPack` 會自動啟動解析器，並監聽後來新增的元素。

### `icon()` 產生 SVG 字串

SSG 或模板場景用 `icon("package:name")` 產生 SVG 字串。同步執行、不依賴 DOM。

```ts
import { icon } from "sakulime-ui";

`<a sl-card>${icon("lucide:zap")}<strong>標題</strong></a>`
// → <a sl-card><svg sl-icon viewBox="0 0 24 24" …>…</svg><strong>標題</strong></a>
```

## 安裝

套件本體不含任何圖包資料，要用什麼自己註冊。package 名自訂，會變成 `sl-icon` 值的前綴。JS 需求依環境分三種裝法。

### 打包器

`@iconify-json/*` 是永久開源授權的資料檔（lucide 是 ISC、Simple Icons 是 CC0），建議當 devDep 裝。產出的是 SVG 字串，JSON 不會進使用者的 bundle。

```ts
import { registerPack } from "sakulime-ui";
import lucide from "@iconify-json/lucide/icons.json";

registerPack("lucide", lucide);   // 整包 Iconify JSON 一次掛上
```

### 免打包器

`<script type="module">` 從 CDN import 套件，圖包給 URL 讓 `registerPack` 自己 fetch。fetch 完成後，頁面裡的佔位會自動補上。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css">
<script type="module">
  import { registerPack } from "https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.js";
  registerPack("si", "https://esm.sh/@iconify-json/simple-icons/icons.json");
</script>
```

### 純 HTML+CSS

零 JS 頁面用 `<link>` 載入 CSS 就好。「貼 SVG」不需要任何 JS；「寫名稱」跟 `icon()` 都要 JS 在場。

輔助函式有三個。`packNames()` 列出已註冊的包，`iconNames(prefix)` 列出包內圖示，`resolveIcons(root)` 手動解析指定 root，Shadow DOM 內的佔位元素要自己傳給它。要讓其他 `sl-*` 屬性接上同一套解析機器，用 `registerResolver(attr, fn)`。

## 屬性

### 顏色 `sl-tone`

`sl-icon` 在 `sl-tone` 的消費名單裡，寫上就染成對應色。放在 `sl-card`、`sl-card-corner` 裡會繼承元件的 tone。

<Demo :render="IconDemos.Tones.render" />

### 大小與對齊

大小固定 `1em`，跟著所在文字的字級縮放。插進句子、按鈕、標題，都是當下的文字大小。

<Demo :render="IconDemos.Sizes.render" />

插在句子裡，垂直位置對齊文字底線。

<Demo :render="IconDemos.Inline.render" />

## 修飾詞

修飾詞是 `sl-icon-` 名稱空間的獨立屬性，寫在名稱旁邊。手貼的 SVG 一樣能用，例如 `<svg sl-icon sl-icon-spin>`。

### 尺寸 `sl-icon-size`

`sm`、`lg`、`xl`、`2xl`，以所在字級為基準縮放。

<Demo :render="IconDemos.ModSizes.render" />

### 變形 `sl-icon-flip/rotate`

`flip="h"`、`flip="v"` 翻轉，`rotate="90"`、`"180"`、`"270"` 旋轉，兩者可以疊加。

<Demo :render="IconDemos.Transforms.render" />

### 旋轉動畫 `sl-icon-spin`

讓圖示不停旋轉。系統設了 `prefers-reduced-motion` 時自動停用。

<Demo :render="IconDemos.Spin.render" />

### 外框 `sl-icon-frame`

`circular` 是圓框，`rounded` 是圓角框，框線顏色跟著圖示墨色。

<Demo :render="IconDemos.Frames.render" />

### 淡化 `sl-icon-disabled`

<Demo :render="IconDemos.Disabled.render" />

### 間距 `sl-icon-space`

寫 bare `sl-icon-space` 兩側都加空隙，`="start"`、`="end"` 只加前或後。

<Demo :render="IconDemos.Spaced.render" />

## 組合

圖示繼承所在元件的墨色，按鈕和卡片角落標記都能直接放。

<Demo :render="IconDemos.InContext.render" />

組合起來看。角落標記用 `sl-tone` 染色，裡面的圖示跟著變色；標題裡的圖示繼承文字墨色。

<Demo :render="IconDemos.InCard.render" />
