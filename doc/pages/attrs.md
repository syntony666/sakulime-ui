---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

# 屬性

> 一律以 HTML 屬性設定，不使用 class

外觀由 CSS 處理，圖示名稱解析等行為另由選配的 JS 負責。

屬性依連字號數量與書寫位置分成四種形式。

以下所稱「子層」指排版元件直接包住的內容，「子元素」指帶 `sl-*--*` 標記的元素。

## 形式

| 形式 | 語法 | 位置 | 用途 |
| --- | --- | --- | --- |
| 元件標記 | `sl-<元件>[="<型態>"]` | 元件自身 | 宣告元件與型態 |
| 元件設定 | `sl-<元件>-<設定>[="<選項>"]` | 元件自身 | 開關與設定，可疊加 |
| 子元素 | `sl-<元件>--<零件>[="<型態>"]` | 元件的子層 | 指定內部零件的位置或角色 |
| 通用屬性 | `sl-<屬性>[="<選項>"]` | 適用的元件 | 跨元件共用的標示 |

### 元件標記

寫在元件自身。等號前是元件，等號後是型態。型態只表達種類與位置，不含間距；省略等號時採用預設型態。

```html
<button sl-button>按鈕</button>
<button sl-button="ghost">按鈕</button>
<div sl-card="hollow">…</div>
<div sl-bar="top">…</div>
```

### 元件設定

同樣寫在元件自身，用於開關與設定。各屬性彼此獨立，可以疊加。

```html
<div sl-card sl-card-indicator="start">…</div>
<div sl-grid sl-grid-cols="4">…</div>
<div sl-bar="top" sl-bar-fixed>…</div>
```

### 子元素

以雙連字號書寫，放在元件的子層，指定內部零件的位置或角色。

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

:::tip
標記僅辨識父元素直接包住的那一層，更深的層級一律當一般內容處理。
:::

### 通用屬性

這類屬性由多個元件共用，只對支援它的元件生效。寫在外層元素上，內部的元件不受影響。

唯一例外是 `sl-gap`，它靠繼承運作。寫在外層時，內部的排版元件也會套用，內層沒設定就取最近一層的值。

```html
<!-- 無效：div 不支援這個屬性，按鈕不受影響 -->
<div sl-tone="danger">
  <button sl-button>按鈕</button>
</div>

<!-- 有效：寫在按鈕自身 -->
<button sl-button sl-tone="danger">按鈕</button>

<!-- 有效：sl-gap 由內部的排版元件繼承 -->
<div sl-gap="2xl">
  <div sl-stack>…</div>
</div>
```

零件不繼承元件的 `sl-tone`。要上色時，把 `sl-tone` 寫在實際顯示顏色的元素上：

```html
<div sl-card>
  <!-- sl-card--corner 決定位置，顏色寫在 sl-dot 自身 -->
  <i sl-card--corner sl-dot sl-tone="danger"></i>
</div>
```

內距是例外。`sl-card--section` 會讀卡片的 `sl-pad`，卡片調整內距時，區塊跟著變。

每個通用屬性都有專頁，收錄完整選項與行為。

## 自訂值

`sl-icon` 採用 `pack:name` 格式，不屬於前面四種形式。

`pack` 是註冊時自訂的圖示包前綴，`name` 是包內的圖示名，可用數量取決於資料檔，用法見 [Icon 圖示](/core/icon)。

## 值無效時

值不在選項表內時，元件不報錯，一律視為未標示或退回預設值，版面不受影響。常見的兩種情況：

| 寫法 | 結果 |
| --- | --- |
| `sl-button="inver"`（`outline` 拼錯） | 與只寫 `sl-button` 相同 |
| `sl-grid--span` 超出 `1` 至 `12` 或 `full` | 跨滿整列 |

這樣設計是為了向前相容。

:::tip
值寫錯不會有任何提示，完成後須對照各頁的選項表逐項核對。
:::