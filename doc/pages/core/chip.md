---
title: Chip 膠囊
description: 圖示配一行字的小膠囊，用在標籤列、資訊列這種一排小項目。
---

<script setup>
import * as ChipDemos from "../../demos/components/chip.demo";
</script>

# Chip *膠囊*

> 圖示配一行字的小膠囊，用在標籤列、資訊列這種一排小項目。

<Playground :meta="ChipDemos.default" :render="ChipDemos.Chip.render" />

## 屬性

### 顏色 `sl-tone`

`sl-chip` 是 `sl-tone` 的適用元件。沒給是文字顏色調出的中性底色。選項看 [Tone 色調](/attrs/tone)。

### 大小與對齊

尺寸用 em，膠囊內的字是所在字級的 `0.875em`，跟著周圍字級一起縮放，不用寫尺寸屬性。

<Demo :render="ChipDemos.Sizes.render" />

固定字級用 `sl-size`，chip 只取字級不看高度，選項看 [Size 尺寸](/attrs/size)。padding 和 gap 都是 em，整顆膠囊跟著字級等比縮放。

## 組合

`<i sl-icon>` 放進去，間距自動對、顏色跟著膠囊走。

<Demo :render="ChipDemos.WithIcon.render" />

meta 列實際長這樣：

<Demo :render="ChipDemos.MetaRow.render" />

疊上 `sl-card--corner` 就固定到卡片角落，適合當數值或版本標籤：

```html
<span sl-card--corner sl-chip sl-tone="primary">200ms</span>
```

<Demo :render="ChipDemos.InCorner.render" />
