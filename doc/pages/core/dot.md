---
title: Dot 狀態點
description: 可插入句子、列表與表格的小圓點。
---

<script setup>
import * as DotDemos from "../../demos/components/dot.demo";
</script>

# Dot *狀態點*

> 可插入句子、列表與表格的小圓點，會與文字對齊。

<Playground :meta="DotDemos.default" :render="DotDemos.Dot.render" />

## 屬性

### 顏色 `sl-tone`

`sl-dot` 為 `sl-tone` 的適用元件。未標示時繼承文字顏色。選項見 [Tone 色調](/attrs/tone)。

### 大小與對齊

大小固定為 `0.5em`，隨所在文字的字級縮放，不須指定尺寸屬性。

<Demo :render="DotDemos.Sizes.render" />

## 組合

置於名稱前方即為狀態列表。

<Demo :render="DotDemos.StatusList.render" />

疊上 [`sl-card--corner`](/core/card) 後固定於卡片角落（未標示為 `end` 右上，`start` 左上）。

兩個屬性標在同一個元素上即可，不需要外層容器：

```html
<i sl-card--corner sl-dot sl-tone="danger"></i>
```

<Demo :render="DotDemos.InCorner.render" />
