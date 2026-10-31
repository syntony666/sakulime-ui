---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

<script setup>
import * as AttrDemos from "../demos/attrs.demo";
</script>

# 屬性

> sakulime 的 API 全是 HTML 屬性，沒有 class。外觀全靠 CSS；圖示名稱解析這類功能才有選配的 JS。屬性分四種，看等號寫在哪裡就知道是哪一種。

## 形式

### 元件標記

`sl-<元件>[="<型態>"]` 等號前是「這是什麼」，等號後是「哪一型」。不寫值就是預設型態：

```html
<button sl-button>按鈕</button>
<button sl-button="ghost">按鈕</button>
<div sl-card="hollow">…</div>
```

### 元件設定

`sl-<元件>-<設定>` 是元件自己的開關與配置，彼此獨立、可以疊加：

```html
<div sl-card sl-card-indicate="start">…</div>
```

### 子元素

`sl-<元件>-<零件>` 是元件內部的零件，寫法跟元件設定一樣：

```html
<div sl-card>
  <span sl-card-corner sl-chip>NEW</span>
  <div sl-card-section>內容</div>
</div>
```

### 通用屬性

`sl-<屬性>="<值>"` 是跨元件共用的值：

| 屬性 | 值 | 適用元素 | 說明 |
|---|---|---|---|
| `sl-tone` | `primary` `secondary` `success` `warning` `danger` | `sl-button`、`sl-card`、`sl-icon`、`sl-dot`、`sl-chip`、`sl-notice` | 主題色調，背景與文字色自動配好 |
| `sl-size` | `sm` `md` `lg` | `sl-button`、`sl-chip` | 高度與字級（chip 只取字級，整顆等比縮放） |
| `sl-radius` | `none` `sm` `md` `lg` `full` | `sl-button`、`sl-card`、`sl-notice` | 圓角 |
| `sl-pad` | `sm` `md` `lg` | `sl-card`、`sl-notice` | 內距 |
| `sl-interactive` | `grow` `lift` `raise` `press` | `sl-card` | 滑鼠移過去的效果，不寫值是 `grow` |
| `sl-gap` | `xs` `sm` `md` `lg` `xl` `2xl` `3xl` `4xl` `5xl` | `sl-stack`、`sl-row`、`sl-grid`、`sl-flow`、`sl-with-sidebar`、`sl-topbar`、`sl-footer`、`sl-toast` | 共用間距值，細節見 [Gap](/layout/gap) |

#### `sl-tone` 色調

五個值：`primary`、`secondary`、`success`、`warning`、`danger`。背景跟文字色自動配好。同一個值套在不同元件上的樣子：

<Demo :render="AttrDemos.Tones.render" />

沒給值的預設每個元件不同：

| 元素 | 沒給值 |
|---|---|
| `sl-button` | `primary` |
| `sl-card` | `primary`，只染邊緣強調條，不動卡片底色 |
| `sl-icon` | 繼承文字墨色 |
| `sl-dot` | 繼承文字墨色 |
| `sl-chip` | 文字墨色調出的中性底 |
| `sl-notice` | `primary` 淡底 |

#### `sl-size` 尺寸

三個值：`sm`、`md`、`lg`，預設 `md`。適用 `sl-button`、`sl-chip`。

控制高度跟字級；`sl-chip` 只取字級，整顆等比縮放。

#### `sl-radius` 圓角

五個值：`none`、`sm`、`md`、`lg`、`full`。適用 `sl-button`、`sl-card`、`sl-notice`。

預設 `md`；`sl-notice` 預設 `full`，是膠囊形。

<Demo :render="AttrDemos.Radius.render" />

#### `sl-pad` 內距

三個值：`sm`、`md`、`lg`，預設 `md`。適用 `sl-card`、`sl-notice`。

整體內距的增減，`lg` 適合公告型的多行內容。

#### `sl-interactive` 互動

四個值：`grow`、`lift`、`raise`、`press`，沒給值是 `grow`。適用 `sl-card`。

滑鼠移過去的反應：

<Demo :render="AttrDemos.Interactive.render" />

#### `sl-gap` 共用間距

跨排版屬性的間距值。跟其他通用屬性不同，它標示在外層也會生效，值會繼承給裡面的排版屬性。細節見 [Gap](/layout/gap)。

## 作用範圍

通用屬性只對「適用元素」欄列出的元素有效，`sl-gap` 例外，它標示在外層，值會繼承給裡面的排版屬性。其他通用屬性標示在外層元素上，不會影響裡面的元件：

```html
<!-- 無效：div 不是適用元素，按鈕不受影響 -->
<div sl-tone="danger">
  <button sl-button>按鈕</button>
</div>

<!-- 有效：直接寫在按鈕上 -->
<button sl-button sl-tone="danger">按鈕</button>
```

子元素零件也一樣，各自獨立，不繼承元件的通用屬性。染色的話，寫在會顯示顏色的那一個元素上：

```html
<div sl-card>
  <!-- sl-card-corner 決定位置；顏色寫在 sl-dot 自己身上 -->
  <i sl-card-corner sl-dot sl-tone="danger"></i>
</div>
```

各元件頁只記錄元件自己的標記值與設定；通用屬性的完整細節以本頁為準。
