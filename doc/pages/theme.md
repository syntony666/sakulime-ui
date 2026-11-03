---
title: 主題
description: 主題是一整組 --sl-* 變數值，切換時不需改動元件或 class。
---

# 主題

> 主題是一整組 CSS 變數值，切換主題不須改動元件或 class。

## 內建主題

| 主題 | 說明 |
| --- | --- |
| `sakulime` | 櫻花粉配橘色（預設） |
| `terra` | 大地色系 |
| `umbra` | 深暖石色配淡青色（深色主題） |

## 引用

只需要顏色、不需要元件時，可單獨載入主題：

```bash
npm install @sakulime-ui/theme
```

```ts
import "@sakulime-ui/theme/sakulime.css"; // 預設主題
import "@sakulime-ui/theme/terra.css";
import "@sakulime-ui/theme/umbra.css";
```

## CDN

把所選主題的 `<link>` 放入 `<head>`：

```html
<!-- sakulime 主題 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/sakulime.min.css" />
<!-- terra 主題 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/terra.min.css" />
<!-- umbra 主題 -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@sakulime-ui/theme/dist/umbra.min.css" />
```

## 切換

樣式表載入後，把 `data-theme` 寫在 `<html>` 上，整頁將會換成該主題。

```html
<html data-theme="terra">
```

:::tip
非預設主題的變數只定義在 `:root[data-theme="<主題>"]` 之下。

載入樣式表卻沒設定 `data-theme`時，該主題不會生效。預設主題同時定義於 `:root`，不設定也會套用。
:::

## 自訂主題

新增一個 `.css` 檔，填入三個顏色即可。推導層依安裝方式擇一載入，npm 寫套件路徑，CDN 寫網址：

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

其餘顏色不需填寫，皆由三個基準色推導。背景、文字與框線取自次要色的色相，文字與背景的明度差固定。強調色的明度限制在可讀範圍內。

成功、警告、錯誤等狀態色不隨基準色變化，各主題共用同一組色相。

## 主題色系

每個顏色都對應一個 `--sl-*` 變數。右上角可切換主題，下方色塊將隨之更新。

<ThemeSwatches />