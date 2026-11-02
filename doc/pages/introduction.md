---
title: 開始使用
description: sl-* 屬性加在標籤上，--sl-* 變數管顏色跟尺寸，原本的 class 不用動。
---

# 開始使用

> 用最簡單的方式，讓你的介面變得不再單調

元件和排版都靠 `sl-*` 屬性，顏色尺寸走 `--sl-*` 變數，原本的 `class` 不用動。

## 安裝

```bash
npm install sakulime-ui
```

```ts
import "sakulime-ui/sakulime.min.css";
```

## CDN

把下面這行放進 `<head>...</head>`：

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sakulime-ui/dist/sakulime.min.css" />
```

`import` 和 `<link>` 的寫法不同。`import` 走套件 `exports` 公布的子路徑，寫 `sakulime-ui/sakulime.min.css`；CDN 網址是發布檔的實際位置，路徑帶 `dist/`。檔案路徑不能拿去 `import`，`exports` 子路徑貼進瀏覽器也找不到檔案。

個別套件的說明：

- 元件，含主題色系：[`@sakulime-ui/core`](/core/)
- 排版工具：[`@sakulime-ui/layout`](/layout/)
- 主題色系：[`@sakulime-ui/theme`](/theme)

## 第一個頁面

整段貼上就能跑。存成 `.html` 用瀏覽器打開，會看到一顆主題色按鈕：

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

主題由 `<html>` 上的 `data-theme` 決定，未標示就是 `sakulime`。其他主題和切換方式看[主題](/theme)。

屬性有四種形式，規則跟文法細節看[屬性總覽](/attrs)。要讓版面跟著螢幕寬度變化（斷點後綴、`sl-hide`/`sl-show`），看 [RWD 響應式設計](/layout/responsive)——行動裝置需要 viewport meta 斷點才準，上面的範例已經含了。

## 全域基底樣式

載入時會順帶設定頁面基底，對象是整份文件，不只 `sl-*` 元素：

- `*`、`::before`、`::after` 設 `box-sizing: border-box`
- `<html>`：字體 `Inter, ui-sans-serif, system-ui, sans-serif`、行高 `1.5`，開啟 `-webkit-font-smoothing`
- `<body>`：`margin` 歸零，文字色 `--sl-text`、底色 `--sl-bg`
- `button`、`input`、`textarea`、`select` 設 `font: inherit`

頁面已經有自己的基底樣式時，未分層的規則權重比較高，蓋得過這裡的設定。

## 自訂樣式

`sl-*` 規則全部寫在 cascade layer 裡，順序是 `@layer theme, base, attrs`。未分層樣式的優先權高於任何分層樣式——全域 reset 例如 `* { margin: 0 }` 或 Tailwind 的 preflight，會整組壓過 `sl-*` 規則。

自己的 reset 要共存，包進 layer 並宣告在框架之前：

```css
@layer reset, theme, base, attrs;

@layer reset {
  /* 自己的 reset 寫這裡 */
}
```

`reset` 排在最前，權重最低，框架的三層照舊蓋過它。顏色跟尺寸的細調不用動 layer，覆寫 `--sl-*` 變數就好——見[主題](/theme)和下面的尺度表。

## 瀏覽器需求

- Safari 18+
- Chrome 119+
- Firefox 128+

不在這個範圍內的瀏覽器不保證能用。

## 尺寸

間距、圓角、字級共用一套 scale。值是 rem，px 欄是基準 16px 時的換算：

| 變數      | rem     | px   |
| --------- | ------- | ---- |
| `--sl-xs` | 0.25rem | 4px  |
| `--sl-sm` | 0.5rem  | 8px  |
| `--sl-md` | 0.75rem | 12px |
| `--sl-lg` | 1rem    | 16px |
| `--sl-xl` | 1.25rem | 20px |
| `--sl-2xl`| 1.5rem  | 24px |
| `--sl-3xl`| 2rem    | 32px |
| `--sl-4xl`| 2.5rem  | 40px |
| `--sl-5xl`| 3rem    | 48px |

`--sl-container-*` 是 `sl-container` 的頁面寬度上限：

| 變數                | rem   | px     |
| ------------------- | ----- | ------ |
| `--sl-container-sm` | 45rem | 720px  |
| `--sl-container-md` | 60rem | 960px  |
| `--sl-container-lg` | 75rem | 1200px |

其他共用變數：

- `--sl-radius-pill`：膠囊圓角 `9999px`
- `--sl-z-bar`：`sl-bar` 的 z-index `50`
- `--sl-z-float`：`sl-float` 的 `60`

::: tip
表上沒有的值，在自己的 CSS 裡直接寫數字就好。
:::
