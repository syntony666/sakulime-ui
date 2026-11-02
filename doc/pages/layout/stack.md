---
title: Stack 堆疊
description: 垂直疊放子元素，間距由 sl-gap 統一給。
---

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

間距只加在相鄰子層之間，第一個上面、最後一個下面都不多留。子元素寬度會拉滿容器，要收窄自己寫寬度，或用下面對齊一節的 `sl-align`。

混排內容（標題接段落接卡片）要保留子層自己的 margin 跟寬度的話，改用 [`sl-content`](/layout/content)。

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在 stack 自己身上或祖先上都行，預設 `md`。只想改一個容器就寫 `--sl-stack-gap`（例如 `style="--sl-stack-gap: 6px"`）。

## 對齊

水平對齊用 [`sl-align`](/attrs/align)：`start` 靠左、`center` 置中、`end` 靠右，預設 `stretch` 拉滿。子層一旦對齊就縮回內容寬，不再拉滿：

```html
<div sl-stack sl-align="center">
  <div sl-card>置中的卡片</div>
</div>
```

垂直分佈用 [`sl-justify`](/attrs/justify)——只有容器比內容高時才有感，例如把整疊垂直置中或推到底：`sl-stack sl-justify="center"`。

`sl-align` 也可以標在單一個子層上，只讓那一個離開共同對齊：

```html
<div sl-stack>
  <div>靠左</div>
  <div sl-align="end">只有這個靠右</div>
</div>
```
