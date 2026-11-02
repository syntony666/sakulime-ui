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

屬性有四種形式，規則跟文法細節看[屬性總覽](/attrs)。

## 全域基底樣式

載入這包 CSS，頁面基底會一起被接管：

- `*`、`::before`、`::after` 全部設 `box-sizing: border-box`
- `<html>` 設字體 `Inter, ui-sans-serif, system-ui, sans-serif`、行高 `1.5`，並開啟 `-webkit-font-smoothing`
- `<body>` 的 `margin` 歸零，文字和底色套用 `--sl-text`、`--sl-bg`
- `button`、`input`、`textarea`、`select` 設 `font: inherit`，跟著頁面字體走

這些規則對整份文件生效，不限 `sl-*` 元素。頁面已經有自己的基底設定時，先知道它們會進來。

## 和自己的 Reset 共存

所有 `sl-*` 規則都寫在 cascade layer 裡，順序是 `@layer theme, base, attrs`。未分層樣式的優先權高於任何分層樣式，全域 reset 例如 `* { margin: 0 }` 或 Tailwind 的 preflight，會整組壓過 `sl-*` 規則，元件整個走樣。

自己的 reset 要共存的話，包進 layer 並宣告在框架之前：

```css
@layer reset, theme, base, attrs;

@layer reset {
  /* 自己的 reset 寫這裡 */
}
```

`reset` 排在最前，權重最低，框架的 `theme`、`base`、`attrs` 照舊蓋過它。

## 瀏覽器需求

只支援現代瀏覽器。樣式用到 `:has()`（Firefox 121+）、`@property`（Firefox 128+），顏色走 `light-dark()`、`color-mix()` 和相對顏色 `oklch(from)`，全數到位大約是 2024 年中的版本。舊瀏覽器沒有降級方案。

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

`--sl-container-*` 是另一組，給 `sl-container` 用的頁面寬度上限，不屬於間距階：

| 變數                | rem   | px     |
| ------------------- | ----- | ------ |
| `--sl-container-sm` | 45rem | 720px  |
| `--sl-container-md` | 60rem | 960px  |
| `--sl-container-lg` | 75rem | 1200px |

另外三個不屬於階梯的共用值：`--sl-radius-pill`（膠囊圓角 `9999px`）、`--sl-z-bar`（`sl-bar` 的 z-index `50`）、`--sl-z-float`（`sl-float` 的 `60`）。

::: tip
表上沒有的值，在自己的 CSS 裡直接寫數字，不用硬湊最近的階。
:::
