---
title: Icon 圖示
description: 讓圖示跟著文字走的標記，大小跟字級、顏色跟文字。
---

<script setup>
import * as IconDemos from "../../demos/components/icon.demo";
</script>

# Icon *圖示*

> 讓圖示跟著文字走的標記。大小跟著字級、顏色跟著文字，垂直位置對齊底線。

<Playground :meta="IconDemos.default" :render="IconDemos.Icon.render" />

## 使用

### SVG

從 icon 庫（lucide、Simple Icons、icones.js.org）複製一段 SVG 貼進 HTML，加上 `sl-icon` 就生效。這種用法不需要任何 JS。

```html
<svg sl-icon viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
</svg>
```

<Demo :render="IconDemos.Svg.render" />

### 用圖示包 `<i sl-icon="...">`

註冊圖示包之後（見[安裝](#安裝)），元素標上圖示名就會換成圖示：

```html
<i sl-icon="lucide:zap"></i>
<i sl-icon="si-github"></i>
```
::: info 語法細節
名稱格式是 `package:name`。分隔符號用 `:` 最穩，`-` 只在 package 名是單字時才不會有問題。

佔位標籤慣用 `<i>`，`<span>`、`<icon>` 也行。

結束標籤**一定要寫**。JSX 或模板編譯的環境沒有此問題。

第一次呼叫 `registerPack` 會自動啟動解析器，並監聽後來新增的元素。
:::

### `icon()` 產生 SVG 字串

SSG 或套模板時用 `icon("package:name")` 產生 SVG 字串。同步執行、不依賴 DOM。

```ts
import { icon } from "sakulime-ui";

`<a sl-card>${icon("lucide:zap")}<strong>標題</strong></a>`
// → <a sl-card><svg sl-icon viewBox="0 0 24 24" …>…</svg><strong>標題</strong></a>
```

## 安裝

套件本體不含任何圖示包資料，用到哪一包才註冊哪一包。package 名自訂，會變成 `sl-icon` 標示的前綴。JS 需求依環境分三種裝法。

### Bundler

::: info @iconify-json/*
`@iconify-json/*` 是永久開源授權的資料檔（lucide 是 ISC、Simple Icons 是 CC0），建議當 devDep 裝。產出的是 SVG 字串，JSON 不會進使用者的 bundle。
:::

```ts
import { registerPack } from "sakulime-ui";
import lucide from "@iconify-json/lucide/icons.json";

registerPack("lucide", lucide);   // 整包 Iconify JSON 一次掛上
```

### CDN

`<script type="module">` 從 CDN import 套件，把圖示包的 URL 傳給 `registerPack`，讓它自己抓。fetch 完成後，頁面裡的佔位會自動補上。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css">

<!-- 加上下面這段 -->
<script type="module">
  import { registerPack } from "https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.js";
  registerPack("si", "https://esm.sh/@iconify-json/simple-icons/icons.json");
</script>
```

### 純 HTML+CSS

零 JS 頁面用 `<link>` 載入 CSS 即可。

::: info JS 需求
「貼 SVG」不需要任何 JS；「套用圖示包」跟 `icon()` 都需要 JS。
:::

::: details 輔助 API（需要 JS）

- `packNames()`：列出已註冊的圖示包
- `iconNames(prefix)`：列出指定包的圖示名
- `resolveIcons(root)`：手動解析 root 底下的佔位；Shadow DOM 內的元素要自己傳進來
- `registerResolver(attr, fn)`：讓其他 `sl-*` 屬性接上同一套解析機制

:::

## 屬性

### 顏色 `sl-tone`

`sl-icon` 是 `sl-tone` 的適用元素，`sl-tone` 標示在圖示本身；沒給就繼承文字顏色。

<Demo :render="IconDemos.Tones.render" />

### 大小與對齊

大小固定 `1em`，跟著所在文字的字級縮放。插進句子、按鈕、標題，都是當下的文字大小。

<Demo :render="IconDemos.Sizes.render" />

插在句子裡，垂直位置對齊文字底線。

<Demo :render="IconDemos.Inline.render" />

## 修飾詞

修飾詞是 `sl-icon-` 名稱空間的獨立屬性，寫在名稱旁邊。直接貼進頁面的 SVG 也適用，例如 `<svg sl-icon sl-icon-spin>`。

### 尺寸 `sl-icon-size`

以所在字級為基準縮放，沒給是 `1em`：

- `sm`：`0.75em`
- `lg`：`1.5em`
- `xl`：`2.5em`
- `2xl`：`4em`

<Demo :render="IconDemos.ModSizes.render" />

### 變形

- `sl-icon-flip="h"`／`="v"`：水平／垂直翻轉
- `sl-icon-rotate="90"`／`"180"`／`"270"`：旋轉角度

兩者可以疊加。

<Demo :render="IconDemos.Transforms.render" />

### 旋轉動畫 `sl-icon-spin`

讓圖示不停旋轉。系統設了 `prefers-reduced-motion` 時自動停用。

跟 `sl-icon-rotate`、`sl-icon-flip` 同時寫也會疊加，靜態角度保留、動畫再疊上整圈旋轉。

<Demo :render="IconDemos.Spin.render" />

### 外框 `sl-icon-frame`

`circular` 是圓框，`rounded` 是圓角框，框線顏色跟著圖示的顏色。

<Demo :render="IconDemos.Frames.render" />

### 淡化 `sl-icon-disabled`

<Demo :render="IconDemos.Disabled.render" />

### 間距 `sl-icon-space`

- `start`：只加前面
- `end`：只加後面
- 沒給：兩側都加

<Demo :render="IconDemos.Spaced.render" />

## 組合

圖示繼承所在元件的文字顏色，放進按鈕裡；疊上 `sl-card-corner` 就固定到卡片角落，`sl-tone` 標示在 icon 自己身上染色。

<Demo :render="IconDemos.InContext.render" />

組合之後：角落的圖示自己帶 `sl-tone`；標題裡的圖示繼承文字顏色。

<Demo :render="IconDemos.InCard.render" />
