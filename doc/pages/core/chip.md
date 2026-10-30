---
title: Chip 膠囊
description: icon 加一行字的小膠囊條目，em 制跟字級縮放，sl-tone 染色。
---

<script setup>
import * as ChipDemos from "../../demos/components/chip.demo";
</script>

# Chip *膠囊*

icon 加一行字的小膠囊，用在 meta 列、標籤列、header 條目。`sl-tone` 染色。

<Playground :meta="ChipDemos.default" :render="ChipDemos.Chip.render" />

## 屬性

### 顏色 `sl-tone`

`sl-chip` 在 `sl-tone` 的消費名單裡，寫上就染成對應色。不寫是文字墨色調出的中性底。

- `primary`：主題主色
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

<Demo :render="ChipDemos.Tones.render" />

### 大小與對齊

em 制——膠囊內的字是所在字級的 `0.875em`，跟著上下文縮放，不用寫尺寸屬性。

<Demo :render="ChipDemos.Sizes.render" />

## 組合

`<i sl-icon>` 直接放進去，gap 跟墨色自動對齊。

<Demo :render="ChipDemos.WithIcon.render" />

meta 列實際長這樣：

<Demo :render="ChipDemos.MetaRow.render" />

疊上 `sl-card-corner` 就釘到卡片角落，當數值或版本標籤剛好：

```html
<span sl-card-corner sl-chip sl-tone="primary">200ms</span>
```

<Demo :render="ChipDemos.InCorner.render" />
