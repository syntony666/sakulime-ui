---
title: Align 對齊
description: 垂直於排列方向的對齊，四個選項，寫在容器上一次管全部子層，寫在子層自己身上就單獨覆寫。
---

<script setup>
import * as AlignDemos from "../../demos/attrs/align.demo";
</script>

# Align *對齊*

> 垂直於排列方向的對齊，對應 CSS 的 `align-items`／`align-self`。寫在容器上一次管全部子層；寫在子層自己身上就單獨覆寫那一個。

## 用法

```html
<div sl-wrap sl-align="end">一排往下對齊</div>
<div sl-stack sl-align="center">整疊水平置中</div>
<div sl-stack>
  <div>靠左</div>
  <div sl-align="end">只有這個靠右</div>
</div>
```

## 選項

`start`、`center`、`end` 對應對齊方向的頭、中、尾；`stretch` 讓子層撐滿交叉軸（`sl-stack`／`sl-grid` 的預設本來就是它）。方向跟著排版走：`sl-wrap` 是垂直（上中下），`sl-stack` 是水平（左中右），`sl-grid` 是格子內的垂直位置。

選項對 `sl-wrap` 子層的垂直位置：

<Demo :render="AlignDemos.AlignWrap.render" />

對 `sl-stack` 子層的水平位置：

<Demo :render="AlignDemos.AlignStack.render" />

`sl-align` 標在子層就是單獨覆寫，只有標了的那一個離開共同對齊：

<Demo :render="AlignDemos.AlignChild.render" />

`sl-grid` 的子層也吃：`sl-align` 管格子內垂直、`sl-justify` 管格子內水平，兩個一起寫就是格子內的雙軸定位。

## 適用元件

| 元件 | 效果 | 預設 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 子層在列內的垂直位置 | `center` |
| [`sl-stack`](/layout/stack) | 子層的水平位置 | `stretch`（撐滿） |
| [`sl-grid`](/layout/grid) | 格子內元素的垂直位置 | `stretch`（撐滿） |

容器寫的 `sl-align` 不會傳進巢狀排版元件，每個元件有自己的預設，外層寫的擋不下來也滲不進去。沿著排列方向的分佈看 `sl-justify`。
