---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

# 屬性

> API 全為 HTML 屬性，不使用 class。外觀皆由 CSS 處理；僅圖示名稱解析等功能提供選配 JS。屬性分四種形式，以連字號數量與書寫位置判別。

## 形式

| 形式 | 語法 | 位置 | 用途 |
| --- | --- | --- | --- |
| 元件標記 | `sl-<元件>[="<型態>"]` | 元件自身 | 宣告元件與型態 |
| 元件設定 | `sl-<元件>-<設定>[="<選項>"]` | 元件自身 | 開關與設定，可疊加 |
| 子元素 | `sl-<元件>--<零件>[="<型態>"]` | 元件的子層 | 指定內部零件的位置或角色 |
| 通用屬性 | `sl-<屬性>[="<選項>"]` | 適用的元件 | 跨元件共用的標示 |

### 元件標記

等號前為「這是什麼」，等號後為「哪一型」。型態僅表達種類與位置語意，間距不進入值槽；省略等號即為預設型態：

```html
<button sl-button>按鈕</button>
<button sl-button="ghost">按鈕</button>
<div sl-card="hollow">…</div>
<div sl-bar="top">…</div>
```

### 元件設定

同樣寫於元件自身，為元件的開關與設定，彼此獨立、可疊加：

```html
<div sl-card sl-card-indicator="start">…</div>
<div sl-grid sl-grid-cols="4">…</div>
<div sl-bar="top" sl-bar-fixed>…</div>
```

### 子元素

雙連字號，寫於元件的子層，指定內部零件的位置或角色：

```html
<div sl-card>
  <span sl-card--corner sl-chip>NEW</span>
  <div sl-card--section>內容</div>
</div>
<div sl-sidebar>
  <aside sl-sidebar--rail>側欄</aside>
  <main>主欄</main>
</div>
```

子元素標記僅認母元素直接包裹的第一層；置於更深處即為一般內容，不再辨識。文件中的「子層」指排版元件直接裝載的內容物，「子元素」指帶 `sl-*--*` 標記的對象。

### 通用屬性

跨元件共用的標示，僅對各自適用的元件生效；標示於外層元素不影響內部元件。唯一例外為 `sl-gap`：繼承是其功能，寫於外層時內部的排版元件皆生效，以距離最近的設定為準：

```html
<!-- 無效：div 非適用元件，按鈕不受影響 -->
<div sl-tone="danger">
  <button sl-button>按鈕</button>
</div>

<!-- 有效：直接寫於按鈕上 -->
<button sl-button sl-tone="danger">按鈕</button>

<!-- 有效：sl-gap 的間距繼承給內部排版元件 -->
<div sl-gap="2xl">
  <div sl-stack>…</div>
</div>
```

子元素零件亦各自獨立，不繼承元件的通用屬性。須染色時，寫在會顯示顏色的元素上：

```html
<div sl-card>
  <!-- sl-card--corner 決定位置；顏色寫於 sl-dot 自身 -->
  <i sl-card--corner sl-dot sl-tone="danger"></i>
</div>
```

## 開放值

`sl-icon` 的值為 `pack:name` 開放資料：`pack` 為註冊時自訂的圖示包前綴，`name` 為包內的圖示名，數量隨資料檔而定，不屬於上述四種形式的型態文法。用法見 [Icon 圖示](/core/icon)。

## 值寫錯的時候

值不在選項表內時，元件視為未標示或落回預設，不回報錯誤，版面亦不受影響。例如 `sl-button="inver"`（`outline` 拼錯）的渲染結果與裸 `sl-button` 相同；[`sl-grid--span`](/layout/grid) 給予非數字則視為滿列。此設計利於向前相容，惟拼字錯誤無提示，完成後須對照各頁選項表檢查一次。

各元件頁僅記錄自身的標記、設定與子元素；通用屬性的細節見各自頁面：[Tone 色調](/attrs/tone)、[Size 尺寸](/attrs/size)、[Radius 圓角](/attrs/radius)、[Pad 內距](/attrs/pad)、[Interactive 互動](/attrs/interactive)、[Gap 間距](/attrs/gap)、[Justify 主軸分佈](/attrs/justify)、[Align 對齊](/attrs/align)。
