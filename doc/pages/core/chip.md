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

`sl-chip` 是 `sl-tone` 的適用元素，寫上就染成對應色。不寫是文字墨色調出的中性底。

- `primary`：主題主色
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

<Demo :render="ChipDemos.Tones.render" />

### 大小與對齊

em 制，膠囊內的字是所在字級的 `0.875em`，跟著周圍字級一起縮放，不用寫尺寸屬性。

<Demo :render="ChipDemos.Sizes.render" />

要固定字級就寫 `sl-size`：`sm`（12px）／`md`（16px）／`lg`（20px）。padding 和 gap 都是 em，整顆膠囊跟著字級等比縮放：

<Demo :render="ChipDemos.SizeKinds.render" />

## 組合

`<i sl-icon>` 放進去，gap 跟墨色自動對齊。

<Demo :render="ChipDemos.WithIcon.render" />

meta 列實際長這樣：

<Demo :render="ChipDemos.MetaRow.render" />

疊上 `sl-card-corner` 就釘到卡片角落，當數值或版本標籤剛好：

```html
<span sl-card-corner sl-chip sl-tone="primary">200ms</span>
```

<Demo :render="ChipDemos.InCorner.render" />
