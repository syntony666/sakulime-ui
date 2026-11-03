---
title: Content 內文
description: 內文欄，子層保留自身的 margin，相鄰間距由容器補足。
---

<script setup>
import * as ContentDemos from "../../demos/layout/content.demo";
</script>

# Content *內文*

> 供文章與混排內容使用的垂直欄，子層保留自身的 margin 與自然寬度。

## 用法

```html
<article sl-content>
  <h2>標題</h2>
  <p>段落文字……</p>
  <div sl-card>卡片</div>
  <div sl-notice>通知</div>
</article>
```

排版為 block，並非 flex。子層自身的 margin 保留，間距寫在後一個子層的上緣，與前一個子層的下 margin 合併取較大值。

卡片、通知等不帶 margin 的元件以間距隔開，標題與段落則依自身的節奏排列。

最前與最後的對外 margin 仍會清除，欄位上下緣不會一側較厚。

元件群須清除 margin、與容器同寬時，改用 [`sl-stack`](/layout/stack)。

<Demo :render="ContentDemos.Rhythm.render" />

## 間距

間距由 [`sl-gap`](/attrs/gap) 給定，寫在自身或外層，預設 `md`；僅調整單一容器時，覆寫 `--sl-content-gap`。
