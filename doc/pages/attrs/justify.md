---
title: Justify 主軸分佈
description: 沿著排列方向的分佈方式，六個選項，寫在排版元件自己身上才生效。
---

<script setup>
import * as JustifyDemos from "../../demos/attrs/justify.demo";
</script>

# Justify *主軸分佈*

> 沿著排列方向的分佈，六個選項。對應 CSS 的 `justify-content`／`justify-items`。標示寫在排版元件自己身上才生效，寫在外層上會被元件的預設擋下來。

## 用法

```html
<div sl-wrap sl-justify="end">一排靠右</div>
<div sl-wrap sl-justify="between">一排攤開貼兩邊</div>
<div sl-grid sl-justify="center">格子內容水平置中</div>
```

六個選項在同一排上的樣子：

<Demo :render="JustifyDemos.Justify.render" />

## 選項

| 選項 | 分佈 |
| --- | --- |
| `start` | 靠頭排（[`sl-wrap`](/layout/wrap)、[`sl-stack`](/layout/stack) 預設） |
| `center` | 置中 |
| `end` | 靠尾排 |
| `between` | 首尾貼邊，剩餘空間由中間共享 |
| `around`  | 每個項目兩側各留一半間距 |
| `evenly`  | 間距處處相等，含兩端 |

`between`／`around`／`evenly` 是 `justify-content` 語意，寫在 [`sl-grid`](/layout/grid) 上時格子語意沒有對應，退回 `stretch`。

`sl-justify` 不繼承，寫在外層上對裡面的排版元件沒有作用。這跟 [`sl-gap`](/attrs/gap) 相反，間距會繼承、對齊不會。交叉軸方向的對齊看 [`sl-align`](/attrs/align)。

## 適用元件

每個元件讀取的主軸不同：直排的 `sl-stack` 是上下分佈，網格的 `sl-grid` 是每個格子內的水平位置。

| 元件 | 效果 | 預設 |
| --- | --- | --- |
| [`sl-wrap`](/layout/wrap) | 整排的水平分佈 | `start` |
| [`sl-stack`](/layout/stack) | 整疊的垂直分佈（容器比內容高才看得出來） | `start` |
| [`sl-grid`](/layout/grid) | 每個格子內元素的水平位置（`between` 在格子語意下退回 `stretch`） | `stretch` |

寫在 `sl-grid` 的子層上是另一回事：`sl-justify` 標在格子內的元素會變成 `justify-self`，單獨控制那個格子的水平位置。其他排版元件的子層沒有對應機制，`sl-justify` 寫在 `sl-wrap`、`sl-stack` 的子層上無效。
