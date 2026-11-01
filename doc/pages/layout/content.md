---
title: Content 內文
description: 內文欄。子層保留自己的 margin，相鄰之間由容器補節奏。
---

<script setup>
import * as ContentDemos from "../../demos/layout/content.demo";
</script>

# Content *內文*

> 給文章、混排內容用的垂直欄。跟 `sl-stack` 相反：子層保留自己的 margin 跟自然寬度，容器只在相鄰子層之間補上間距節奏。

## 用法

```html
<article sl-content>
  <h2>標題</h2>
  <p>段落文字……</p>
  <div sl-card>卡片</div>
  <div sl-notice>通知</div>
</article>
```

排版是 block 不是 flex：子層自己的 margin 留下來，間距寫在後一個子層的上緣，跟前一個子層的下 margin 合併取大。卡片、通知這種沒 margin 的元件靠間距隔開，標題段落靠自己的節奏。最前面跟最後面的對外 margin 照樣清掉，欄位的上緣下緣不會一邊厚一邊薄。

元件群要清掉 margin、寬度拉滿的話用 [`sl-stack`](/layout/stack)。

<Demo :render="ContentDemos.Rhythm.render" />

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在自己或祖先上，預設 `md`；單點覆寫用 `--sl-content-gap`。
