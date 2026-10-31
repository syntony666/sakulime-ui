---
title: Stack 堆疊
description: 垂直疊放子元素，間距由容器統一給。
---

<script setup>
import * as StackDemos from "../../demos/layout/stack.demo";
</script>

# Stack *堆疊*

> 把子元素垂直疊起來，間距由容器統一給。子元素的上下 margin 會被清掉，給下去的就是最終間距。

## 用法

```html
<div sl-stack>
  <p>第一段</p>
  <p>第二段</p>
  <p>第三段</p>
</div>
```

間距只加在相鄰子層之間，第一個上面、最後一個下面都不多留。子元素寬度會拉滿容器，要收窄自己寫寬度；沒有斷點行為，要窄屏換向的話用 `sl-row` 配 `sl-collapse`。

三種間距的實際樣子：

<Demo
  :render="StackDemos.Gaps.render"
/>

## 間距

px 以根字級 16px 換算，尺規本身是 rem。`sl-stack` 的選項就是間距，預設 `md`：

| 選項  | 間距         |
| ----- | ------------ |
| `xs`  | 4px          |
| `sm`  | 8px          |
| `md`  | 12px（預設） |
| `lg`  | 16px         |
| `xl`  | 20px         |
| `2xl` | 24px         |
| `3xl` | 32px         |
| `4xl` | 40px         |
| `5xl` | 48px         |

只想改一個容器就寫 `--sl-stack-gap`（例如 `style="--sl-stack-gap: 6px"`）；想一整區一起改就用 [`sl-gap`](/attrs/gap)。
