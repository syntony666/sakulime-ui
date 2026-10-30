---
title: 屬性
description: sl-* 屬性語法總覽：元件標記、元件設定、子元素與通用屬性。
---

# 屬性

sakulime 的 API 全是 HTML 屬性，沒有 class、沒有 JS。屬性分四種，看等號寫在哪裡就知道是哪一種。

## 四種形式

### 元件標記 `sl-<元件>[="<型態>"]`

等號前是「這是什麼」，等號後是「哪一型」。不寫值就是預設型態：

```html
<button sl-button>按鈕</button>
<button sl-button="ghost">按鈕</button>
<div sl-card="hollow">…</div>
```

### 元件設定 `sl-<元件>-<設定>`

元件自己的開關與配置，彼此獨立、可以疊加：

```html
<div sl-card sl-card-indicate="start">…</div>
```

### 子元素 `sl-<元件>-<零件>`

元件內部的零件，寫法跟元件設定同型：

```html
<div sl-card>
  <span sl-card-corner="end text-sm">NEW</span>
  <div sl-card-section>內容</div>
</div>
```

### 通用屬性 `sl-<屬性>="<值>"`

跨元件共用的值，哪些元素能用看下面的總表。

## 通用屬性總表

| 屬性 | 值 | 適用元素 | 說明 |
|---|---|---|---|
| `sl-tone` | `primary` `secondary` `success` `warning` `danger` | `sl-button`、`sl-card`、`sl-card-corner` | 主題色調，背景與文字色自動配好 |
| `sl-size` | `sm` `md` `lg` | `sl-button` | 高度與字級 |
| `sl-radius` | `none` `sm` `md` `lg` `full` | `sl-button`、`sl-card` | 圓角 |
| `sl-pad` | `sm` `md` `lg` | `sl-card` | 內距 |
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

不過元件可以把值傳給自己的零件：`sl-tone` 寫在卡片上，裡面的角落標記會跟著變色。要讓某一個標記不一樣，直接寫在它自己身上就能蓋過：

```html
<div sl-card sl-tone="success">
  <!-- 跟著卡片，success -->
  <span sl-card-corner>10ms</span>
  <!-- 只有自己，danger -->
  <span sl-card-corner="end" sl-tone="danger">!</span>
</div>
```

各元件頁只記錄元件自己的標記值與設定；通用屬性的完整細節以本頁為準。
