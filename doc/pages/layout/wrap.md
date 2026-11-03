---
title: Wrap 換行橫列
description: 水平排列子層，寬度不足時自動換行，間距由共用屬性統一給定。
---

<script setup>
import * as WrapDemos from "../../demos/layout/wrap.demo";
</script>

# Wrap *換行橫列*

> 水平排列子層，寬度不足時自動換行。

## 用法

```html
<div sl-wrap>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
  <span sl-chip>標籤</span>
</div>
```

<Demo :render="WrapDemos.Flow.render" />

子層垂直置中、寬度不變；總寬超過容器時，整列換到下一行。換行時機取決於內容的實際寬度，沒有固定斷點。

底層為啟用 `flex-wrap` 的 flexbox。與 [`sl-grid`](/layout/grid) 的分工如下。

子層寬度依內容決定、欄數隨容器而變時用 `sl-wrap`；每欄等寬、欄數固定時用 `sl-grid`。

## 對齊

子層預設自起點排起。置中、靠尾或平均分散用 [`sl-justify`](/attrs/justify)，寫在 wrap 自身：

```html
<div sl-wrap sl-justify="end">
  <button sl-button>送出</button>
  <button sl-button>取消</button>
</div>
```

垂直方向由 [`sl-align`](/attrs/align) 控制。

子層預設垂直置中，`start` 對齊列頂、`end` 對齊列底。`sl-align` 亦可標在單一子層上，使該項離開共同對齊。
## 間距

間距由 [`sl-gap`](/attrs/gap) 給定，寫在 wrap 自身或外層皆可，預設 `md`。水平間距與換行後的行距為同一個值。

僅調整單一容器時，改寫 `--sl-wrap-gap`。
