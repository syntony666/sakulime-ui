---
title: RWD 響應式設計
description: 依視窗寬度切換的斷點，屬性加上對應後綴即可響應。
---

<script setup>
import * as RwdDemos from "../../demos/layout/responsive.demo";
</script>

# RWD *響應式設計*

> 依視窗寬度切換的斷點，需要響應式的屬性加上對應後綴。

## 斷點

px 以根字級 16px 換算。斷點數值與 container 的頁面寬度相同：

| 斷點 | 條件              | 對應         |
| ---- | ----------------- | ------------ |
| `sm` | < 45rem（720px）  | 手機         |
| `md` | < 60rem（960px）  | 平板、小視窗 |
| `lg` | < 75rem（1200px） | 窄筆電       |

僅有「以下」一個方向，不設範圍或上限修飾，與主流框架「以上生效」的方向相反。

斷點以 viewport 寬度為準。行動瀏覽器未設定 viewport 時，會以版面寬度作為視窗寬度，斷點將全部失真：

```html
<meta name="viewport" content="width=device-width, initial-scale=1" />
```

## 斷點後綴

屬性加上 `-<斷點>` 後，於該斷點以下生效，窄斷點覆蓋寬斷點。

目前支援者為 [`sl-grid-cols`](/layout/grid)：

```html
<div sl-grid sl-grid-cols="4" sl-grid-cols-md="2" sl-grid-cols-sm="1">
```

桌面四欄、平板兩欄、手機單欄。縮小瀏覽器視窗即可看到變化：

<Demo
  :render="RwdDemos.Cols.render"
/>

欄數只會隨寬度遞減。窄斷點若寫得比寬斷點大，實際生效者為所有已宣告欄數的最小值。

```html
<div sl-grid sl-grid-cols="8" sl-grid-cols-md="4" sl-grid-cols-sm="6">
```

上例在 45rem 以下仍為 4 欄，`sm` 受 `md` 限制。

某個斷點要回到自適應欄數時，設為 `auto`：

```html
<div sl-grid sl-grid-cols="4" sl-grid-cols-md="auto">
```

上例桌面為 4 欄，60rem 以下回到自動填充。`auto` 不參與最小值計算，更窄的斷點仍可再指定明確欄數。

跨欄的 `sl-grid--span` 會自動調整。當前欄數容不下時改為滿列，不會溢出。

## 隱藏跟顯示

對任何元素皆有效的響應式行為。`sl-hide` 與 `sl-show` 各負責一側：

| 屬性             | 行為             |
| ---------------- | ---------------- |
| `sl-hide-<斷點>` | 斷點以下消失     |
| `sl-show-<斷點>` | 只在斷點以下出現 |

一個 show 搭配一個 hide 即為常見的裝置切換：

```html
<nav sl-show-sm>手機版選單</nav>
<nav sl-hide-sm>桌面版選單</nav>
```

<Demo
  :render="RwdDemos.Hide.render"
/>

實際元件亦使用相同標法，於同一位置由兩張卡片交接：

<Demo
  :render="RwdDemos.Card.render"
/>

配對須使用同一個斷點才能無縫交接。

混用時，show 取小、hide 取大，中間區段兩者皆不出現（刻意留空亦可）。show 取大、hide 取小，中間區段兩者同時出現。

:::tip 進階設定
需要其他斷點或更細的行為時，自行撰寫 media query：

```css
@media (width < 30rem) {
  [sl-grid][sl-grid-cols] {
    grid-template-columns: 1fr;
  }
}
```
:::
