---
title: 開始使用
description: 元件與排版以 sl-* 屬性設定，顏色和尺寸以 --sl-* 變數調整，原有的 class 不需改動。
---

# 開始使用

> 用最少的改動，讓介面不再單調

元件與排版以 `sl-*` 屬性設定，顏色和尺寸以 `--sl-*` 變數調整；原有的 `class` 不需改動。

## 安裝

```bash
npm install sakulime-ui
```

在應用程式入口載入樣式：

```ts
import "sakulime-ui/sakulime.min.css";
```

`sakulime-ui` 由三個套件組成：

- 元件，含主題色系：[`@sakulime-ui/core`](/core/)
- 排版工具：[`@sakulime-ui/layout`](/layout/)
- 主題色系：[`@sakulime-ui/theme`](/theme)

## CDN

若未使用建置流程，將 `<link>` 加入 `<head>`：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css" />
```

:::tip
`import` 填的是套件公布的子路徑 `sakulime-ui/sakulime.min.css`；`<link>` 填的是含 `dist/` 的 CDN 網址。兩者不可互換。
:::

## 第一個頁面

將整段程式碼存成 `.html`，以瀏覽器開啟，即可看到一個主題色按鈕：

```html
<!DOCTYPE html>
<html data-theme="sakulime">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css" />
  </head>
  <body>
    <button sl-button>按鈕</button>
  </body>
</html>
```

`data-theme` 須設定於 `<html>`；未設定時預設為 `sakulime`。主題切換方式見[主題](/theme)。

屬性有四種形式，寫法與細節見[屬性總覽](/attrs)。

若版面需隨螢幕寬度調整，可使用斷點後綴與 `sl-hide`、`sl-show`，做法見 [RWD 響應式設計](/layout/responsive)。

## 全域基底樣式

載入時會一併套用基底樣式至整份文件，不只 `sl-*` 元素：

| 選擇器 | 設定 |
| --- | --- |
| 所有元素，含 `::before`、`::after` | `box-sizing: border-box` |
| `<html>` | 字體 `Inter`（後備系統字體），行高 `1.5`，開啟 `-webkit-font-smoothing` |
| `<body>` | `margin` 歸零，文字色 `--sl-text`，底色 `--sl-bg` |
| `button`、`input`、`textarea`、`select` | `font: inherit` |

上述規則皆位於 `@layer base`，覆寫方式見下一節。

## 自訂樣式

`sl-*` 的規則皆位於 `@layer` 內，順序為 `theme`、`base`、`attrs`。

:::tip
未納入任何 `@layer` 的樣式優先於所有分層樣式。以全域 reset `* { margin: 0 }` 為例，覆蓋範圍涵蓋基底設定與 `attrs` 層的元件規則。
:::

若要補充框架未處理的部分，須自行建立一層，宣告在 `theme` 之前：

```css
@layer reset, theme, base, attrs;

@layer reset {
  /* 自己的 reset 寫這裡 */
}
```

`reset` 宣告在最前，優先順序最低，框架的三層仍會覆蓋它。

顏色與尺寸的微調不需更動 layer，改寫 `--sl-*` 變數即可，見[主題](/theme)與下方的變數表。

## 瀏覽器需求

支援 `Safari 18+`、`Chrome 119+`、`Firefox 128+`。低於上述版本的瀏覽器未經驗證，不保證正常運作。

## 尺寸

間距、圓角、字級共用同一組級距。單位為 rem，px 欄為根字級 16px 時的換算值：

| 變數 | rem | px |
| --- | --- | --- |
| `--sl-xs` | 0.25rem | 4px |
| `--sl-sm` | 0.5rem | 8px |
| `--sl-md` | 0.75rem | 12px |
| `--sl-lg` | 1rem | 16px |
| `--sl-xl` | 1.25rem | 20px |
| `--sl-2xl` | 1.5rem | 24px |
| `--sl-3xl` | 2rem | 32px |
| `--sl-4xl` | 2.5rem | 40px |
| `--sl-5xl` | 3rem | 48px |

`--sl-container-*` 指定 `sl-container` 的寬度上限：

| 變數 | rem | px |
| --- | --- | --- |
| `--sl-container-sm` | 45rem | 720px |
| `--sl-container-md` | 60rem | 960px |
| `--sl-container-lg` | 75rem | 1200px |

其他共用變數：

- `--sl-radius-pill`：膠囊圓角，`9999px`
- `--sl-z-bar`：`sl-bar` 的 z-index，`50`
- `--sl-z-float`：`sl-float` 的 z-index，`60`

:::tip
表中未列出的值，可直接在自有 CSS 中寫入數值。
:::