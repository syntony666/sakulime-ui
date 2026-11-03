---
title: Stack 堆疊
description: 垂直疊放子層，子層間距由共用屬性統一給定。
---

<script setup>
import * as StackDemos from "../../demos/layout/stack.demo";
</script>

# Stack *堆疊*

> 把子層垂直疊放，並統一相鄰子層之間的間距。

## 用法

```html
<div sl-stack>
  <p>第一段</p>
  <p>第二段</p>
  <p>第三段</p>
</div>
```

<Demo :render="StackDemos.Rhythm.render" />

間距只加在相鄰子層之間，第一個的上緣與最後一個的下緣皆不留白。

子層寬度預設與容器同寬；要收窄須自行指定寬度，或改用下方對齊一節的 [`sl-align`](/attrs/align)。

混排內容（標題、段落、卡片接續）若要保留子層自身的 margin 與寬度，改用 [`sl-content`](/layout/content)。

底層為直排的 flexbox，即 `display: flex` 搭配 `flex-direction: column`。

## 對齊

水平對齊用 [`sl-align`](/attrs/align)：`start` 靠左、`center` 置中、`end` 靠右。

預設為 `stretch`，與容器同寬。子層一旦對齊，寬度即縮回內容寬：

```html
<div sl-stack sl-align="center">
  <div sl-card>置中的卡片</div>
</div>
```

垂直分佈用 [`sl-justify`](/attrs/justify)，僅在容器高於內容時可見，例如將整疊垂直置中或推到底。

`sl-align` 亦可標在單一子層上，僅該項離開共同對齊：

```html
<div sl-stack>
  <div>靠左</div>
  <div sl-align="end">只有這個靠右</div>
</div>
```
## 間距

間距由 [`sl-gap`](/attrs/gap) 給定，寫在 stack 自身或外層皆可，預設 `md`。

僅調整單一容器時，改寫 `--sl-stack-gap`（例如 `style="--sl-stack-gap: 6px"`）。
