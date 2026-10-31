---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

# 屬性

sakulime 的 API 全是 HTML 屬性，沒有 class。外觀全靠 CSS；圖示名稱解析這類功能才有選配的 JS。屬性分四種，看等號寫在哪裡就知道是哪一種。

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

`sl-<元件>-<零件>` 是元件內部的零件，寫法跟元件設定同型：

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

## 作用範圍

通用屬性只對「適用元素」欄列出的元素有效。寫在外層元素上不會影響裡面的元件：

```html
<!-- 無效：div 不是適用元素，按鈕不受影響 -->
<div sl-tone="danger">
  <button sl-button>按鈕</button>
</div>

<!-- 有效：直接寫在按鈕上 -->
<button sl-button sl-tone="danger">按鈕</button>
```

子元素零件也一樣，各自獨立，不繼承元件的通用屬性。要染色就寫在會顯示顏色的那一個元素上：

```html
<div sl-card>
  <!-- sl-card-corner 決定位置；顏色寫在 sl-dot 自己身上 -->
  <i sl-card-corner sl-dot sl-tone="danger"></i>
</div>
```

各元件頁只記錄元件自己的標記值與設定；通用屬性的完整細節以本頁為準。
