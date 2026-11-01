---
title: Stack 堆疊
description: 垂直疊放子元素，間距由 sl-gap 統一給。
---

<script setup>
import * as StackDemos from "../../demos/layout/stack.demo";
</script>

# Stack *堆疊*

> 把子元素垂直疊起來。子元素的上下 margin 會被清掉、寬度拉滿，給下去的間距就是最終間距。

## 用法

```html
<div sl-stack>
  <p>第一段</p>
  <p>第二段</p>
  <p>第三段</p>
</div>
```

間距只加在相鄰子層之間，第一個上面、最後一個下面都不多留。子元素寬度會拉滿容器，要收窄自己寫寬度。

混排內容（標題接段落接卡片）要保留子層自己的 margin 跟寬度的話，改用 [`sl-content`](/layout/content)。

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在 stack 自己身上或祖先上都行。px 以根字級 16px 換算，尺規本身是 rem，預設 `md`：

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

只想改一個容器就寫 `--sl-stack-gap`（例如 `style="--sl-stack-gap: 6px"`）。

三種間距的實際樣子：

<Demo
  :render="StackDemos.Gaps.render"
/>
