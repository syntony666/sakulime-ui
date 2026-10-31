---
title: 開始使用
description: sl-* 屬性加在標籤上，--sl-* 變數管顏色跟尺寸，原本的 class 不用動。
---

# Sakulime UI

> 用最簡單的方式，讓你的介面變得不再單調

`sl-*` 屬性加在標籤上，`--sl-*` 變數管顏色跟尺寸。

元件和排版工具都用屬性，原本的 `class` 不用動。

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

個別套件的說明：

- 元件，含主題色系：[`@sakulime-ui/core`](/core)
- 排版工具：[`@sakulime-ui/layout`](/layout)
- 主題色系：[`@sakulime-ui/theme`](/theme)

## 尺寸及大小

間距、圓角、字級共用一套 scale。值是 rem，px 欄是基準 16px 時的換算：

| 變數               | rem     | px     |
| ------------------ | ------- | ------ |
| `--sl-xs`          | 0.25rem | 4px    |
| `--sl-sm`          | 0.5rem  | 8px    |
| `--sl-md`          | 0.75rem | 12px   |
| `--sl-lg`          | 1rem    | 16px   |
| `--sl-xl`          | 1.25rem | 20px   |
| `--sl-2xl`         | 1.5rem  | 24px   |
| `--sl-3xl`         | 2rem    | 32px   |
| `--sl-4xl`         | 2.5rem  | 40px   |
| `--sl-5xl`         | 3rem    | 48px   |
| `--sl-container-sm` | 45rem   | 720px  |
| `--sl-container-md` | 60rem   | 960px  |
| `--sl-container-lg` | 75rem   | 1200px |

::: tip
表上沒有的值，在自己的 CSS 裡直接寫數字，不用硬湊最近的階。
:::
