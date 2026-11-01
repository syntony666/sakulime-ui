---
title: Stack 堆疊
description: 垂直疊放子元素，間距由容器統一給，也能切文流模式或拆多欄。
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

## 文流模式 `sl-flow`

預設的 stack 是 flex：清 margin、寬度拉滿，適合元件群。內容混排（標題接段落接卡片那種）要的是保留自己的排版，標 `sl-flow` 切到文流模式：

```html
<article sl-stack="lg" sl-flow>
  <h2>標題</h2>
  <p>段落文字……</p>
  <div sl-card>卡片</div>
  <div sl-notice>通知</div>
</article>
```

文流模式退回 block 排版、不拉寬，子層自己的 margin 留下來，間距自動補在相鄰子層之間。間距寫在後一個子層的上緣，取代它自己的上 margin；前一個子層的下 margin 不動，跟間距合併取大，比間距大就聽它的：卡片通知這種沒 margin 的元件隔得開，標題段落靠自己的下 margin 保留節奏。頭尾例外：最前面跟最後面的 margin 照樣清掉，文章的上緣下緣才不會一邊厚一邊薄：

<Demo :render="StackDemos.Flow.render" />

## 多欄 `sl-cols`

`sl-cols="2..12"` 把 stack 切成平衡多欄：內容由上到下排滿一欄再接下一欄，不用設高度。跟文流模式一樣是 block 排版、保留 margin，`sl-span` 標在子層上跨滿全部欄（裸標或 `"full"` 都行）：

```html
<div sl-stack sl-cols="2">
  <h2 sl-span>跨欄標題</h2>
  <p>內容會依序流過兩欄……</p>
</div>
```

<Demo :render="StackDemos.Cols.render" />

裸 `sl-cols` 不給值等同 `sl-flow` 的文流排版（行為保留給舊用法，新寫的標 `sl-flow` 就好）。多欄沒有斷點版本：`sl-cols-sm`、`sl-collapse` 都吃不到，手機要退回單欄的話改用 `sl-grid` 或自己寫 media query。

## 間距

px 以根字級 16px 換算，尺規本身是 rem。`sl-stack` 的選項就是間距，預設 `md`，三種模式通用，多欄的欄間距吃的也是這個值：

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

三種間距的實際樣子：

<Demo
  :render="StackDemos.Gaps.render"
/>
