---
title: Flow 子層間距
description: 直接子層之間自動補垂直間距，子層排版不動。
---

<script setup>
import * as FlowDemos from "../../demos/layout/flow.demo";
</script>

# Flow *子層間距*

> 直接子層之間自動補上垂直間距。不改成 flex、不清 margin，內文混排或沒另外包一層的地方都用它。

## 用法

```html
<article sl-flow="lg">
  <h2>標題</h2>
  <p>段落文字……</p>
  <div sl-card>卡片</div>
  <div sl-notice>通知</div>
</article>
```

子層不用標任何東西，間距自動補在兄弟之間。卡片通知這種沒 margin 的元件隔得開，標題段落保留自己的間距：

<Demo :render="FlowDemos.Basic.render" />

## 屬性

### 間距

px 以根字級 16px 換算，尺規本身是 rem。

`sl-flow` 的選項就是間距，預設 `md`：

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

只想改一個容器就寫 `--sl-flow-gap`；[`sl-gap`](/attrs/gap) 標示在容器自己或外層都行，裡面沒給間距的排版屬性會繼承這個間距。

三種間距的實際樣子：

<Demo :render="FlowDemos.Gaps.render" />

### 行為

- 每個子層跟前一個之間補 `margin-block-start`，第一個上面不加
- 子層完全不改：不變 flex item、寬度不動、自己的 margin 保留，間距是下限，子層原本的 margin 比它大就聽子層的
- 要精準等距、子層拉滿寬的話用 `sl-stack`；`sl-flow` 適合內文混排，或不想另外包一層排版元素的地方
