---
title: Align 對齊
description: 垂直於排列方向的對齊，四個選項，可寫在容器或子層。
---

<script setup>
import * as AlignDemos from "../../demos/attrs/align.demo";
</script>

# Align *對齊*

> 垂直於排列方向的對齊，對應 CSS 的 `align-items` 與 `align-self`。

## 用法

```html
<div sl-wrap sl-align="end">一排往下對齊</div>
<div sl-stack sl-align="center">整疊水平置中</div>
<div sl-stack>
  <div>靠左</div>
  <div sl-align="end">只有這個靠右</div>
</div>
```

寫在容器上時管全部子層，寫在子層則單獨覆寫該項。

## 選項

| 選項 | 效果 |
| --- | --- |
| `start` | 對齊方向起點 |
| `center` | 置中 |
| `end` | 對齊方向終點 |
| `stretch` | 子層撐滿交叉軸 |

方向跟著排列軸走。`sl-wrap` 為垂直方向（上中下），`sl-stack` 為水平方向（左中右），`sl-grid` 為格子內的垂直位置。

選項對 `sl-wrap` 子層的垂直位置：

<Demo :render="AlignDemos.AlignWrap.render" />

對 `sl-stack` 子層的水平位置：

<Demo :render="AlignDemos.AlignStack.render" />

標在子層時只有該項離開共同對齊：

<Demo :render="AlignDemos.AlignChild.render" />

`sl-grid` 的子層同樣適用。`sl-align` 管格子內垂直，[`sl-justify`](/attrs/justify) 管格子內水平，兩者並用即為格子內的雙軸定位。

## 適用元件

| 元件 | 作用 | 未標示時 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 子層在列內的垂直位置 | `center` |
| [`sl-stack`](/layout/stack) | 子層的水平位置 | `stretch` |
| [`sl-grid`](/layout/grid) | 格子內元素的垂直位置 | `stretch` |
| [`sl-float`](/layout/float) | 區塊內元素的水平位置 | `stretch` |

容器上的 `sl-align` 不會傳入巢狀的排版元件。每個元件各有預設值，外層的設定既擋不下也滲不進去。沿排列方向的分佈見 [`sl-justify`](/attrs/justify)。
