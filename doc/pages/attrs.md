---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

# 屬性

> sakulime 的 API 全是 HTML 屬性，沒有 class。外觀全靠 CSS；圖示名稱解析這類功能才有選配的 JS。屬性分四種，看 dash 數跟寫在哪裡就知道是哪一種。

## 形式

### 元件標記

`sl-<元件>[="<型態>"]` 寫在元件自己身上。等號前是「這是什麼」，等號後是「哪一型」，型態只裝種類跟位置語意，間距不進值槽。等號不寫就是預設型態：

```html
<button sl-button>按鈕</button>
<button sl-button="ghost">按鈕</button>
<div sl-card="hollow">…</div>
<div sl-bar="top">…</div>
```

### 元件設定

`sl-<元件>-<設定>[="<選項>"]` 同樣寫在元件自己身上，是元件的開關與設定，彼此獨立、可以疊加：

```html
<div sl-card sl-card-indicate="start">…</div>
<div sl-grid sl-grid-cols="4">…</div>
<div sl-bar="top" sl-bar-fixed>…</div>
```

### 子元素

`sl-<元件>--<零件>[="<型態>"]` 雙 dash，寫在元件的子層上，認領內部零件的位置或角色：

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

### 通用屬性

`sl-<屬性>[="<選項>"]` 是跨元件共用的標示，只對各自適用的元素有效；標示在外層元素上不會影響裡面的元件。唯一的例外是 `sl-gap`：繼承是它的功能，寫在祖先上裡面的排版屬性都吃得到，最近的設定贏：

```html
<!-- 無效：div 不是適用元素，按鈕不受影響 -->
<div sl-tone="danger">
  <button sl-button>按鈕</button>
</div>

<!-- 有效：直接寫在按鈕上 -->
<button sl-button sl-tone="danger">按鈕</button>

<!-- 有效：sl-gap 的間距繼承給裡面的排版屬性 -->
<div sl-gap="2xl">
  <div sl-stack>…</div>
</div>
```

子元素零件也一樣，各自獨立，不繼承元件的通用屬性。染色的話，寫在會顯示顏色的那一個元素上：

```html
<div sl-card>
  <!-- sl-card--corner 決定位置；顏色寫在 sl-dot 自己身上 -->
  <i sl-card--corner sl-dot sl-tone="danger"></i>
</div>
```

各元件頁只記錄自己的標記、設定跟子元素；通用屬性的細節看各自頁面：[Tone 色調](/attrs/tone)、[Size 尺寸](/attrs/size)、[Radius 圓角](/attrs/radius)、[Pad 內距](/attrs/pad)、[Interactive 互動](/attrs/interactive)、[Gap 間距](/attrs/gap)。
