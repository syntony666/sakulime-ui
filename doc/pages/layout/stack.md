---
title: Stack 堆疊
description: 垂直疊放子元素，間距由容器統一給。
---

<script setup>
import * as StackDemos from "../../demos/layout/stack.demo";
</script>

# Stack *堆疊*

> 把子元素垂直疊起來，間距由容器統一給。子元素的上下 margin 會被吃掉，寫下去的值就是最終間距。

## 用法

```html
<div sl-stack>
  <p>第一段</p>
  <p>第二段</p>
  <p>第三段</p>
</div>
```

三種間距的實際樣子：

<Demo
  :render="StackDemos.Gaps.render"
/>

## 屬性

### 間距

`sl-stack` 的值就是間距，預設 `md`：

| 值    | 間距         |
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

表列 px 以根字級 16px 換算，尺規本身吃 rem。只想改一個容器就寫 `--sl-stack-gap`（例如 `style="--sl-stack-gap: 6px"`）；想一整區一起改就用 [`sl-gap`](/layout/gap)。

### 行為

- 永遠垂直排列，沒有斷點變化
- 相鄰子層的垂直距離 = 間距值，第一個上面跟最後一個下面不加距離
- 子元素的上下 margin 清成 0，左右 margin 不動
- 子元素寬度拉滿容器（flex 預設 stretch），要收窄自己寫寬度
- 間距是容器的事，子元素不用寫 margin
