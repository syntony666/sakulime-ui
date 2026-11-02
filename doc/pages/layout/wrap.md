---
title: Wrap 橫列
description: 水平排列子層，放不下就換行，間距由 sl-gap 統一給。
---

<script setup>
import * as WrapDemos from "../../demos/layout/wrap.demo";
</script>

# Wrap *橫列*

> 把子層水平排開，放不下就換行。按鈕群、標籤列這種一排小東西都適用。

## 用法

```html
<div sl-wrap>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
  <span sl-chip>標籤</span>
</div>
```

<Demo :render="WrapDemos.Flow.render" />

子層垂直置中、寬度不動，總寬超過容器就整個換到下一行；換行時機看內容實際寬度，沒有固定斷點。

底層是開了 `flex-wrap` 的 flexbox。跟 [`sl-grid`](/layout/grid) 的分工：子層寬度看內容、夠放幾個放幾個用 `sl-wrap`；每欄要等寬、欄數要固定的用 `sl-grid`。

## 對齊

子層預設從頭排起。置中、靠尾或攤開用 [`sl-justify`](/attrs/justify)，寫在 wrap 自己身上：

```html
<div sl-wrap sl-justify="end">
  <button sl-button>送出</button>
  <button sl-button>取消</button>
</div>
```

垂直方向看 [`sl-align`](/attrs/align)：子層預設垂直置中，`start` 對齊列頂、`end` 對齊列底。`sl-align` 也能標在單一個子層上讓它離開共同對齊。
## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在 wrap 自己身上或外層上都行，預設 `md`。水平間距跟換行後的行距是同一個。

只想改一個容器就寫 `--sl-wrap-gap`；`sl-gap` 標示在容器自己或外層都行，裡面未標示間距的排版元件會繼承這個間距。

