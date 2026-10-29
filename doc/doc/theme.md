---
title: 主題
description: 主題是一整組 --sl-* 變數值，切換主題不用改元件，也不用換 class。
---

# 主題

所有顏色都是 `--sl-*` 變數，主題就是一整組變數值。切換主題不用改元件，也不用換 class。

內建主題：

- `sakulime`：櫻花粉配橘色（預設）
- `terra`：大地色系
- `terra-dark`：terra 的深色版

## 引用

不需要元件時，可以只載入主題：

```bash
npm install @sakulime-ui/theme
```

```ts
import "@sakulime-ui/theme/sakulime.min.css";   // Theme: Sakulime
import "@sakulime-ui/theme/terra.min.css";      // Theme: Terra
import "@sakulime-ui/theme/terra-dark.min.css"; // Theme: Terra Dark
```

## CDN

把對應的 `<link>` 放進 `<head>...</head>`，要用哪個主題就載入哪一個：

```html
<!-- Theme: Sakulime -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/sakulime.min.css" />
<!-- Theme: Terra -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/terra.min.css" />
<!-- Theme: Terra Dark -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/terra-dark.min.css" />
```

## 切換

把 `data-theme` 寫在 `<html>` 上，整個網頁就會換色：

```html
<html data-theme="terra">
```

## 自訂主題

一個主題只要 3 個種子色：

```css
@import "@sakulime-ui/theme/derived.css";

@layer theme {
  :root[data-theme="my-theme"] {
    color-scheme: light;            /* dark 就寫 dark */
    --sl-seed-primary: #…;          /* 行動色（CTA 面）*/
    --sl-seed-secondary: #…;        /* 安靜面，也是全部中性色的 hue */
    --sl-seed-accent: #…;           /* accent、連結色 */
  }
}
```

其他 `--sl-*` 由推導層算出：前景墨依面色深淺自動翻轉，accent 會被壓進可讀範圍，ok / warn / danger 是固定色相不隨種子變。

要收進 core bundle，在 `packages/core/src/index.ts` import 一次、`packages/shared/theme/package.json` 的 exports 加一行。

## 主題色系

每個顏色都是 `var(--sl-*)`，預設為 `sakulime`。右上角可以切換主題，下面的色票會跟著變。

<ThemeSwatches />
