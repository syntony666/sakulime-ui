---
title: Place 對齊
description: 行內方向的對齊，四個選項，寫在排版元件自己身上才生效。
---

<script setup>
import * as PlaceDemos from "../../demos/attrs/place.demo";
</script>

# Place *對齊*

> 行內方向的對齊，四個選項。標示寫在排版元件自己身上才生效，寫在祖先上會被元件的預設擋下來。

## 用法

```html
<div sl-wrap sl-place="end">一排靠右</div>
<div sl-bar sl-place="center">橫條內容置中</div>
```

四個選項在同樣一排上的樣子：

<Demo :render="PlaceDemos.Place.render" />

## 選項

| 選項 | 分佈 |
| --- | --- |
| `start` | 靠頭排（`sl-wrap` 預設） |
| `center` | 置中 |
| `end` | 靠尾排 |
| `between` | 首尾貼邊，剩餘空間由中間共享（`sl-bar` 預設） |

`sl-place` 不繼承，寫在祖先上對裡面的排版元件沒有作用。這跟 [`sl-gap`](/attrs/gap) 相反，間距會繼承、對齊不會。

## 適用元件

| 元件 | 預設 |
| --- | --- |
| `sl-wrap` | `start` |
| `sl-bar` | `between` |
