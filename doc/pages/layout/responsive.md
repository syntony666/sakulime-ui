---
title: RWD 響應式設計
description: 三階斷點對應 container 尺度，需要響應式的屬性掛斷點後綴。
---

<script setup>
import * as RwdDemos from "../../demos/layout/responsive.demo";
</script>

# RWD *響應式設計*

> 三階斷點，對應 container 尺度。需要響應式的屬性掛 `sl-<屬性>-<斷點>` 後綴。

## 斷點

px 以根字級 16px 換算。三階跟 [container](/layout/container) 的頁面寬度是同一組數字：

| 斷點 | 條件              | 對應         |
| ---- | ----------------- | ------------ |
| `sm` | < 45rem（720px）  | 手機         |
| `md` | < 60rem（960px）  | 平板、小視窗 |
| `lg` | < 75rem（1200px） | 窄筆電       |

只有「以下」一個方向，不設範圍跟上限修飾，跟主流框架「以上生效」的方向相反。`sl-collapse` 裸標用的就是 `sm` 斷點。

## 斷點後綴

屬性加上 `-<斷點>` 就在該斷點以下生效，窄的蓋過寬的。支援的有 `sl-cols` 跟 `sl-collapse`：

```html
<div sl-grid sl-cols="4" sl-cols-md="2" sl-cols-sm="1">
<div sl-row sl-collapse-md>
```

四欄起步、平板掉成兩欄、手機單欄；`sl-collapse-md` 讓橫列在平板就收成直排（`sl-collapse-lg` 是 <75rem、裸 `sl-collapse` 是 <45rem）。縮小瀏覽器視窗就看得到變化：

<Demo
  :render="RwdDemos.Cols.render"
/>

佔欄的 `sl-span` 自動收斂：當前欄數容不下就縮成滿列，不會溢出。

## 隱藏跟顯示

對任何元素都有效的響應式行為。斷點是一刀兩斷的線，`sl-hide` 跟 `sl-show` 各管一邊：

| 屬性             | 行為             |
| ---------------- | ---------------- |
| `sl-hide-<斷點>` | 斷點以下消失     |
| `sl-show-<斷點>` | 只在斷點以下出現 |

一個 show 配一個 hide 就是經典的裝置切換：

```html
<nav sl-show-sm>手機版選單</nav>
<nav sl-hide-sm>桌面版選單</nav>
```

<Demo
  :render="RwdDemos.Hide.render"
/>

實際元件也是同個標法，同一個位置讓兩張卡片交接上場：

<Demo
  :render="RwdDemos.Card.render"
/>

配對要用同一個斷點才無縫交接。混著配：show 小、hide 大，中間段兩個都不見（故意的話就是留空）；show 大、hide 小，中間段兩個同時出現。

## 更深的需求

要別的斷點或更細的行為，media query 自己寫：

```css
@media (width < 30rem) {
  [sl-grid][sl-cols] {
    grid-template-columns: 1fr;
  }
}
```
