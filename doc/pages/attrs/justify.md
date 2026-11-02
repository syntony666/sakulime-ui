---
title: Justify 主軸分佈
description: 沿排列方向的分佈方式，六個選項，須寫在排版元件自身。
---

<script setup>
import * as JustifyDemos from "../../demos/attrs/justify.demo";
</script>

# Justify *主軸分佈*

> 沿排列方向的分佈，六個選項，對應 CSS 的 `justify-content` 與 `justify-items`。

## 用法

```html
<div sl-wrap sl-justify="end">一排靠右</div>
<div sl-wrap sl-justify="between">一排攤開貼兩邊</div>
<div sl-grid sl-justify="center">格子內容水平置中</div>
```

須寫在排版元件自身。寫在外層會被元件自己的預設值擋下，對內部的排版元件沒有作用。

六個選項在同一排上的樣子：

<Demo :render="JustifyDemos.Justify.render" />

## 選項

| 選項 | 分佈 |
| --- | --- |
| `start` | 靠頭排列，[`sl-wrap`](/layout/wrap) 與 [`sl-stack`](/layout/stack) 的預設 |
| `center` | 置中 |
| `end` | 靠尾排列 |
| `between` | 首尾貼邊，剩餘空間由項目之間均分 |
| `around` | 每個項目兩側各留一半間距 |
| `evenly` | 間距處處相等，含兩端 |

`between`、`around`、`evenly` 屬 `justify-content` 語意。寫在 [`sl-grid`](/layout/grid) 上時，格子沒有對應的分佈方式，該值視為無效，格子回到預設的撐滿。

不繼承是刻意的設計，與 [`sl-gap`](/attrs/gap) 相反。交叉軸方向的對齊見 [`sl-align`](/attrs/align)。

## 適用元件

各元件讀取的主軸不同：

| 元件 | 作用 | 未標示時 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 整排的水平分佈 | `start` |
| [`sl-stack`](/layout/stack) | 整疊的垂直分佈，容器高於內容才看得出 | `start` |
| [`sl-grid`](/layout/grid) | 每個格子內元素的水平位置 | 撐滿 |

寫在 `sl-grid` 的子層上是另一回事。標在格子內的元素會成為 `justify-self`，單獨控制該格的水平位置。`sl-wrap`、`sl-stack` 的子層沒有對應機制，寫了無效。
