---
title: Row 橫列
description: 水平排列子元素，放不下就換行，間距由 sl-gap 統一給。
---

<script setup>
import * as RowDemos from "../../demos/layout/row.demo";
</script>

# Row *橫列*

> 把子元素水平排開，放不下就換行。按鈕群、標籤列這種一排小東西都適用。

## 用法

```html
<div sl-row>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
  <span sl-chip>標籤</span>
</div>
```

子元素垂直置中、寬度不動，總寬超過容器就整個換到下一行；換行時機看內容實際寬度，沒有固定斷點。

跟 `sl-grid` 的分工：子層寬度看內容、夠放幾個放幾個用 `sl-row`；每欄要等寬、欄數要固定的用 `sl-grid`。

三種間距的實際樣子：

<Demo
  :render="RowDemos.Gaps.render"
/>

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在 row 自己身上或祖先上都行，預設 `md`。水平間距跟換行後的行距是同一個。

只想改一個容器就寫 `--sl-row-gap`；`sl-gap` 標示在容器自己或外層都行，裡面沒給間距的排版元件會繼承這個間距。
