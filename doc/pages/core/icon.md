---
title: Icon 圖示
description: sl-icon 圖示標記，大小跟字級走、吃 sl-tone 上色；圖包由消費者註冊，icon() 產 markup 字串。
---

<script setup>
import * as IconDemos from "../../demos/components/icon.demo";
</script>

# Icon *圖示*

`sl-icon` 是寫在 svg 上的標記——大小 1em 跟著旁邊的字級、顏色吃 `currentColor` 或 `sl-tone`、對齊文字底線。它不是元素，不渲染任何東西，只負責讓 svg「長得像一個字」。

<Playground :meta="IconDemos.default" :render="IconDemos.Icon.render" />

## 用法

### 貼 svg

最單純的路徑：從 icon 庫（lucide、Simple Icons、icones.js.org）複製 svg 貼上，加 `sl-icon` 就生效，不需要任何 JS：

```html
<svg sl-icon viewBox="0 0 24 24" fill="none" stroke="currentColor"
     stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>
</svg>
```

### 寫名稱 `<i sl-icon="package:name">`

註冊圖包之後，任何元素寫名稱就會被填成圖示——package 名跟 icon 名用 `:` 分隔最穩（`-` 也行，但只在 package 名是單字時安全）：

```html
<i sl-icon="lucide:zap"></i>
<i sl-icon="si-github"></i>
```

標籤不限 `<i>`（`<span>`、`<icon>` 都行），但**一定要寫結束標籤**——`<i sl-icon="x"/>` 自封閉在原生 HTML 無效，標籤會保持開啟並吃掉後面的內容（JSX／模板編譯的環境除外）。

頁面上第一次呼叫 `registerPack` 時會自動啟動解析器，並監聽後來新增的元素。

這種用法要 JS 在場才會生效，但**不需要打包器**——`<script type="module">` 直接從 CDN import、圖包也從 CDN 抓 JSON 就行：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui@0.3/dist/sakulime.min.css">
<script type="module">
  import { registerPack } from "https://cdn.jsdelivr.net/npm/sakulime-ui@0.3/dist/sakulime.min.js";
  registerPack("lucide", "https://cdn.jsdelivr.net/npm/@iconify-json/lucide/icons.json");
</script>
```

連 `<script>` 都沒有的純 HTML+CSS 頁面，只有「貼 svg」一種用法——圖形本來就是 svg 自己畫的，`sl-icon` 只負責外觀，不需要任何 JS。

### `icon()` 產 markup

SSG／模板場景用 `icon("package:name")` 拿 svg 字串，同步、零 DOM 依賴：

```ts
import { icon } from "sakulime-ui";

`<a sl-card>${icon("lucide:zap")}<strong>標題</strong></a>`
// → <a sl-card><svg sl-icon viewBox="0 0 24 24" …>…</svg><strong>標題</strong></a>
```

## 註冊圖包 `registerPack`

套件本體不含任何圖包資料——要用什麼自己註冊。package 名自訂，會變成 `sl-icon` 值的前綴：

```ts
import { registerPack } from "sakulime-ui";

// npm：整包 Iconify JSON 一次掛上
import lucide from "@iconify-json/lucide/icons.json";
registerPack("lucide", lucide);

// CDN：給 URL，fetch 完成後自動補上頁面裡的佔位
registerPack("si", "https://esm.sh/@iconify-json/simple-icons/icons.json");
```

Iconify 圖包是永久開源授權的資料檔（lucide 是 ISC、Simple Icons 是 CC0），建議當 devDep 裝——產出的是 markup 字串，JSON 不會進使用者的 bundle。

輔助函式：`packNames()` 列已註冊的包、`iconNames(prefix)` 列包內圖示、`resolveIcons(root)` 手動解析指定 root（Shadow DOM 內的佔位元素要自己餵給它）。

## 顏色 `sl-tone`

`sl-icon` 在 `sl-tone` 的消費名單裡，寫上就染成對應色；放在 `sl-card`、`sl-card-corner` 裡會繼承元件的 tone：

<Demo :render="IconDemos.Tones.render" />

## 大小

固定 `1em`——跟著所在文字的字級縮放，插進句子、按鈕、標題都是當下的文字大小：

<Demo :render="IconDemos.Sizes.render" />

## 修飾詞

修飾詞是 `sl-icon-` 名稱空間的獨立屬性，寫在名稱旁邊；手貼的 svg 一樣能用（`<svg sl-icon sl-icon-spin>`）：

### 尺寸 `sl-icon-size`

`sm`、`lg`、`xl`、`2xl`——以所在字級為基準縮放：

<Demo :render="IconDemos.ModSizes.render" />

### 變形 `sl-icon-flip`、`sl-icon-rotate`

`flip="h"`、`flip="v"` 翻轉，`rotate="90"`／`"180"`／`"270"` 旋轉，可以疊加：

<Demo :render="IconDemos.Transforms.render" />

### 旋轉動畫 `sl-icon-spin`

讓圖示不停旋轉（系統 `prefers-reduced-motion` 時自動停用）：

<Demo :render="IconDemos.Spin.render" />

### 外框 `sl-icon-frame`

`circular` 圓框、`rounded` 圓角框，框線跟著圖示墨色：

<Demo :render="IconDemos.Frames.render" />

### 狀態與間距

`sl-icon-disabled` 淡化圖示；`sl-icon-space` 兩側加空隙，`="start"`／`="end"` 只加前或後：

<Demo :render="IconDemos.Disabled.render" />
<Demo :render="IconDemos.Spaced.render" />

## 放進元件

圖示繼承所在元件的墨色，按鈕、卡片角落標記都能直接放：

<Demo :render="IconDemos.Inline.render" />
<Demo :render="IconDemos.InContext.render" />

組合起來：角落標記用 `sl-tone` 染色、圖示跟著變色，標題裡的圖示則吃文字墨色：

<Demo :render="IconDemos.InCard.render" />
