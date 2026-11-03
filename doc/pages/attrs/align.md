---
title: Align 對齊
description: 垂直於排列方向的對齊，容器與子層皆可設定。
---

<script setup>
import * as AlignDemos from "../../demos/attrs/align.demo";
</script>

# Align *對齊*

> 決定子層在垂直於排列方向上的位置。

## 用法

```html
<div sl-wrap sl-align="end">一排往下對齊</div>
<div sl-stack sl-align="center">整疊水平置中</div>
<div sl-stack>
  <div>靠左</div>
  <div sl-align="end">只有這個靠右</div>
</div>
```

寫在容器上時套用於全部子層；寫在子層時，僅覆寫該項。

## 選項

| 選項 | 效果 |
| --- | --- |
| `start` | 對齊方向的起點 |
| `center` | 置中 |
| `end` | 對齊方向的終點 |
| `stretch` | 子層填滿該方向 |

對齊方向隨排列軸而定。`sl-wrap` 為垂直方向（上中下），`sl-stack` 為水平方向（左中右），`sl-grid` 為格子內的垂直位置。

`sl-wrap` 子層的垂直位置：

<Demo :render="AlignDemos.AlignWrap.render" />

`sl-stack` 子層的水平位置：

<Demo :render="AlignDemos.AlignStack.render" />

標在子層時，僅該項離開共同對齊：

<Demo :render="AlignDemos.AlignChild.render" />

`sl-grid` 的子層同樣適用。`sl-align` 控制格子內的垂直位置，[`sl-justify`](/attrs/justify) 控制水平位置，兩者並用即完成格子內的定位。

## 適用元件

| 元件 | 作用 | 未標示時 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 子層在列內的垂直位置 | `center` |
| [`sl-stack`](/layout/stack) | 子層的水平位置 | `stretch` |
| [`sl-grid`](/layout/grid) | 格子內元素的垂直位置 | `stretch` |
| [`sl-float`](/layout/float) | 區塊內元素的水平位置 | `stretch` |

**容器上的 `sl-align` 不會傳入巢狀的排版元件**，各元件仍套用自己的預設值。沿排列方向的分佈見 [`sl-justify`](/attrs/justify)。
