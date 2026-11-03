---
title: Chip 膠囊
description: 標籤列與資訊列用的小型膠囊。
---

<script setup>
import * as ChipDemos from "../../demos/components/chip.demo";
</script>

# Chip *膠囊*

> 單行文字搭配圖示的小膠囊，適合標籤列與資訊列。

<Playground :meta="ChipDemos.default" :render="ChipDemos.Chip.render" />

## 屬性

### 顏色 `sl-tone`

`sl-chip` 為 `sl-tone` 的適用元件。未標示時，底色由文字顏色推導為中性色。選項見 [Tone 色調](/attrs/tone)。

### 大小與對齊

尺寸以 em 為單位，膠囊內文字為所在字級的 `0.875em`，隨周圍字級縮放，不須指定尺寸屬性。

<Demo :render="ChipDemos.Sizes.render" />

固定字級時使用 `sl-size`；chip 僅取字級，不取高度，選項見 [Size 尺寸](/attrs/size)。

padding 與 gap 皆以 em 為單位，整個膠囊隨字級等比縮放。

### 互動 `sl-interactive`

膠囊標示後即呈現可點擊的外觀，游標變為手指，滑鼠移入時套用效果。

`sl-interactive` 未標示時為 `grow`，效果選項見 [Interactive 互動](/attrs/interactive)。

## 組合

放入 `<i sl-icon>`，間距自動對齊，顏色隨膠囊變化。圖示本身見 [Icon 圖示](/core/icon)。

<Demo :render="ChipDemos.WithIcon.render" />

實際的 meta 列如下：

<Demo :render="ChipDemos.MetaRow.render" />

疊上 [`sl-card--corner`](/core/card) 後即固定於卡片角落，適合標示數值或版本：

```html
<span sl-card--corner sl-chip sl-tone="primary">200ms</span>
```

<Demo :render="ChipDemos.InCorner.render" />
