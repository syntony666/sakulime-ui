---
title: Icon 圖示
description: 隨文字縮放與變色的圖示標記。
---

<script setup>
import * as IconDemos from "../../demos/components/icon.demo";
</script>

# Icon *圖示*

> 讓圖示隨文字縮放與變色，並對齊文字底線的標記。

<Playground :meta="IconDemos.default" :render="IconDemos.Icon.render" />

## 使用

### SVG

從圖示包（lucide、Simple Icons、icones.js.org）複製 SVG 貼進 HTML。

加上 `sl-icon` 即生效，此用法不須任何 JS。

```html
<svg sl-icon viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
</svg>
```

<Demo :render="IconDemos.Svg.render" />

### 用圖示包 `<i sl-icon="...">`

註冊圖示包後（見[安裝](#安裝)），於元素標上圖示名即替換為圖示：

```html
<i sl-icon="lucide:zap"></i>
<i sl-icon="si-github"></i>
```
::: info 語法細節
名稱格式為 `package:name`。分隔符號以 `:` 最穩定，`-` 僅在 package 名為單字時不產生問題。

佔位標籤慣用 `<i>`，`<span>`、`<icon>` 亦可。

結束標籤**必須寫**。JSX 或模板編譯的環境沒有此問題。

第一次呼叫 `registerPack` 會自動啟動解析器，並監聽後續新增的元素。
:::

### `icon()` 產生 SVG 字串

SSG 或模板渲染時，以 `icon("package:name")` 產生 SVG 字串。同步執行，不依賴瀏覽器環境。

```ts
import { icon } from "sakulime-ui";

`<a sl-card>${icon("lucide:zap")}<strong>標題</strong></a>`
// → <a sl-card><svg sl-icon viewBox="0 0 24 24" …>…</svg><strong>標題</strong></a>
```

## 安裝

套件本體不含圖示包資料，使用哪一包才註冊哪一包。package 名可自訂，將成為 `sl-icon` 標示的前綴。JS 需求依環境分為三種裝法。

### Bundler

[@iconify-json/*](https://www.npmjs.com/org/iconify-json) 為永久開源授權的資料檔（lucide 為 ISC、Simple Icons 為 CC0）。

```ts
import { registerPack } from "sakulime-ui";
import lucide from "@iconify-json/lucide/icons.json";

registerPack("lucide", lucide);   // 整包 Iconify JSON 一次掛上
```

### CDN

以 `<script type="module">` 從 CDN 匯入套件，將圖示包的 URL 傳給 `registerPack`。

fetch 完成後，頁面中的佔位會自動補上。

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css">

<!-- 加上下面這段 -->
<script type="module">
  import { registerPack } from "https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.js";
  registerPack("si", "https://esm.sh/@iconify-json/simple-icons/icons.json");
</script>
```

### 純 HTML+CSS

無 JS 的頁面以 `<link>` 載入 CSS 即可。

::: info JS 需求
「貼 SVG」不需要任何 JS；「套用圖示包」與 `icon()` 都需要 JS。
:::

::: details 輔助 API（需要 JS）

- `packNames()`：列出已註冊的圖示包
- `iconNames(prefix)`：列出指定包的圖示名
- `resolveIcons(root)`：手動解析 root 底下的佔位；Shadow DOM 內的元素須自行傳入
- `resolve(root)`：對 root 底下執行所有已註冊 `sl-*` 屬性的解析（不限圖示）
- `installResolver()`：安裝 MutationObserver，之後動態加入的內容與屬性變更會自動解析
- `registerResolver(attr, fn)`：讓其他 `sl-*` 屬性接上同一套解析機制

:::

## 屬性

### 顏色 `sl-tone`

`sl-icon` 為 `sl-tone` 的適用元件，`sl-tone` 標示於圖示本身；未標示時繼承文字顏色。選項見 [Tone 色調](/attrs/tone)。

### 大小與對齊

大小固定為 `1em`，隨所在文字的字級縮放。置於句子、按鈕或標題中，皆為當下的文字大小。

<Demo :render="IconDemos.Sizes.render" />

置於句子中時，垂直位置對齊文字底線。

<Demo :render="IconDemos.Inline.render" />

## 元件設定

元件設定為 `sl-icon-` 名稱空間的獨立屬性，寫在名稱旁。

直接貼入頁面的 SVG 同樣適用，例如 `<svg sl-icon sl-icon-spin>`。

### 尺寸 `sl-icon-size`

以所在字級為基準縮放，未標示時為 `1em`：

- `sm`：`0.75em`
- `lg`：`1.5em`
- `xl`：`2.5em`
- `2xl`：`4em`

<Demo :render="IconDemos.ModSizes.render" />

### 變形

- `sl-icon-flip="horizontal"`／`="vertical"`：水平／垂直翻轉
- `sl-icon-rotate="90"`／`"180"`／`"270"`：旋轉角度

兩者可疊加。

<Demo :render="IconDemos.Transforms.render" />

### 旋轉動畫 `sl-icon-spin`

使圖示持續旋轉。系統設定 `prefers-reduced-motion` 時自動停用。

與 `sl-icon-rotate`、`sl-icon-flip` 同時標示時亦會疊加。靜態角度保留，動畫再疊加整圈旋轉。

<Demo :render="IconDemos.Spin.render" />

### 外框 `sl-icon-frame`

`circular` 為圓框，`rounded` 為圓角框，框線顏色與圖示顏色相同。`sl-icon-frame` 不帶值或帶未識別值時為方框。

<Demo :render="IconDemos.Frames.render" />

### 淡化 `sl-icon-disabled`

圖示降至 50% 不透明度。透明度由共用 hook `--sl-disabled-opacity` 控制（此處預設 `0.5`）。

<Demo :render="IconDemos.Disabled.render" />

### 間距 `sl-icon-space`

- `start`：僅加前方
- `end`：僅加後方
- 未標示：兩側皆加

<Demo :render="IconDemos.Spaced.render" />

## 組合

圖示繼承所在元件的文字顏色，可放入按鈕。

疊上 [`sl-card--corner`](/core/card) 後固定於卡片角落，`sl-tone` 標示於 icon 本身即可上色。

<Demo :render="IconDemos.InContext.render" />

組合後，角落的圖示自帶 `sl-tone`，標題中的圖示則繼承文字顏色。

<Demo :render="IconDemos.InCard.render" />
