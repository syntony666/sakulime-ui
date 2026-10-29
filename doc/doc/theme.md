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

一個主題只需要 **3 個種子色＋1 個 `color-scheme` 旗標**，其餘 13 個 `--sl-*` 變數全部由推導層（`derived.css`）算出：

```css
@import "@sakulime-ui/theme/derived.css";

@layer theme {
  :root[data-theme="my-theme"] {
    color-scheme: light; /* 或 dark — light-dark() 依它決定極性 */

    --sl-seed-primary: #…;   /* 主要行動色：CTA 面 */
    --sl-seed-secondary: #…; /* 安靜面＋整個中性家族的 hue 來源 */
    --sl-seed-accent: #…;    /* accent、連結、強調文字 */
  }
}
```

每個種子控制的範圍：

| 種子 | 產出 |
| --- | --- |
| `--sl-seed-primary` | `--sl-primary` 面、`--sl-primary-fg` 墨、`--sl-primary-bg` 淡底 |
| `--sl-seed-secondary` | `--sl-secondary` 家族，**外加** `bg`/`surface`/`border`/全部 `text-*` — 中性色的 hue 全部取自它，選個有色的 secondary 整個介面就帶那個色調 |
| `--sl-seed-accent` | `--sl-text-accent`（連結、啟用態、標題色） |

推導規則：

- **前景墨自動翻轉** — 面色亮度高於 0.62 配同色系深墨、低於配淺墨。種子避免落在 0.55–0.7 的灰區，那裡的墨會卡在邊界偏灰
- **accent 夾進可讀帶** — 亮主題壓到 L ≤ 0.55、暗主題抬到 L ≥ 0.72，給太亮或太暗的 accent 會被調整到讀得出來
- **status 不吃種子** — ok / warn / danger 用全球通用的綠黃紅固定色相，只隨 `color-scheme` 調整深淺
- **不能指定異色墨** — fg 永遠從面色同 hue 推導，想要「琥珀底配酒紅字」這種跳 hue 配對就得整組 `--sl-*` 自己寫（不走 seed 模型）

要讓 core bundle 帶上新主題，加兩處：

```ts
// packages/core/src/index.ts
import "@sakulime-ui/theme/my-theme.css";
```

```jsonc
// packages/shared/theme/package.json — exports
"./my-theme.css": "./my-theme.css",
```

## 主題色系

每個顏色都是 `var(--sl-*)`，預設為 `sakulime`。右上角可以切換主題，下面的色票會跟著變。

<ThemeSwatches />
