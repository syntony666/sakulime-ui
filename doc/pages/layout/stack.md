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

- `sl-stack`：預設 `md`（12px）
- `sl-stack="xs"` 到 `sl-stack="5xl"`：對應尺規全階

改單一容器的話寫 `--sl-stack-gap`。間距是容器的事，子元素不用寫 margin。
