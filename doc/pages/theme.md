---
title: 主題
description: 主題是一整組 --sl-* 變數值，切換時不需改動元件或 class。
---

# 主題

> 所有顏色皆為 `--sl-*` 變數，主題即一整組變數值。切換主題不需改動元件，也不需更換 class。

## 內建主題

| 主題 | 說明 |
| --- | --- |
| `sakulime` | 櫻花粉配橘色，預設 |
| `terra` | 大地色系 |
| `umbra` | 深暖石色配淡青色，暗色主題 |

## 引用

不需元件時可單獨載入主題：

```bash
npm install @sakulime-ui/theme
```

```ts
import "@sakulime-ui/theme/sakulime.css"; // 預設主題
import "@sakulime-ui/theme/terra.css";
import "@sakulime-ui/theme/umbra.css";
```

## CDN

將對應的 `<link>` 放進 `<head>`，用哪個主題就載入哪一個：

```html
<!-- Theme: Sakulime -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/sakulime.min.css" />
<!-- Theme: Terra -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/terra.min.css" />
<!-- Theme: Umbra -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/umbra.min.css" />
```

## 切換

`data-theme` 寫在 `<html>` 上，整頁隨之換色：

```html
<html data-theme="terra">
```

前提是該主題的樣式表已載入。`terra`、`umbra` 的變數只定義在 `:root[data-theme]` 之下，只載入單一主題檔而未設定 `data-theme`，整頁不會取得任何主題變數。`sakulime` 例外，同時定義於 `:root`，未設定時即為預設主題。

## 自訂主題

新增一個 `.css` 檔，填入三個顏色即可。先載入推導層，以套件安裝者寫套件路徑，使用 CDN 者寫網址：

```css
/* npm */
@import "@sakulime-ui/theme/derived.css";
/* CDN */
@import "https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/derived.css";

@layer theme {
  :root[data-theme="my-theme"] {
    color-scheme: light; /* 深色主題寫 dark */
    --sl-seed-primary: #…; /* 主色，例如按鈕底色 */
    --sl-seed-secondary: #…; /* 次要色，背景、文字與框線的色相隨它推導 */
    --sl-seed-accent: #…; /* 強調色，例如連結 */
  }
}
```

其餘顏色不需填寫，皆由三個 seed 推導。背景、文字與框線取自次要色的色相，文字與背景的明度差固定。強調色的明度限制在可讀範圍內。成功、警告、錯誤等狀態色為跨主題共用的固定色相，不受 seed 影響。

## 主題色系

每個顏色皆為 `var(--sl-*)`，預設為 `sakulime`。右上角可切換主題，下方色票隨之變化。

<ThemeSwatches />
