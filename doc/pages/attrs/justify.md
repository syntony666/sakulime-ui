---
title: Justify 主軸分佈
description: 沿排列方向的分佈方式，須寫在排版元件自身。
---

<script setup>
import * as JustifyDemos from "../../demos/attrs/justify.demo";
</script>

# Justify *主軸分佈*

> 設定項目沿排列方向的位置，以及項目之間的距離分配。

## 用法

```html
<div sl-wrap sl-justify="end">一排靠右</div>
<div sl-wrap sl-justify="between">一排攤開貼兩邊</div>
<div sl-grid sl-justify="center">格子內容水平置中</div>
```

須寫在排版元件自身。寫於外層時，內部元件仍套用自己的預設值，外層設定不生效。

各選項的效果：

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

`between`、`around`、`evenly` 僅用於分佈整排項目。標示於 [`sl-grid`](/layout/grid) 時不生效，該值將被忽略，元素維持 `stretch`。

`sl-justify` 不繼承，與 [`sl-gap`](/attrs/gap) 相反。垂直於排列方向的對齊，見 [`sl-align`](/attrs/align)。

## 適用元件

各元件讀取的主軸不同：

| 元件 | 作用 | 未標示時 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 整排的水平分佈 | `start` |
| [`sl-stack`](/layout/stack) | 整疊的垂直分佈，容器高於內容時才可見 | `start` |
| [`sl-grid`](/layout/grid) | 每個格子內元素的水平位置 | `stretch` |

`sl-grid` 的子層用法不同。寫在格子內元素的 `sl-justify` 會成為 `justify-self`，單獨控制該格的水平位置；`sl-wrap`、`sl-stack` 的子層沒有對應機制，標示後不生效。
