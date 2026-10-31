---
title: Dot 狀態點
description: 一顆小圓點，插進句子、列表、表格都會對齊文字。
---

<script setup>
import * as DotDemos from "../../demos/components/dot.demo";
</script>

# Dot *狀態點*

> 一顆小圓點，插進句子、列表、表格都會對齊文字。

<Playground :meta="DotDemos.default" :render="DotDemos.Dot.render" />

## 屬性

### 顏色 `sl-tone`

`sl-dot` 是 `sl-tone` 的適用元素。沒給繼承文字墨色。

- `primary`：主題主色
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

<Demo :render="DotDemos.Tones.render" />

### 大小與對齊

大小固定 `0.5em`，跟著所在文字的字級縮放，不用寫尺寸屬性。

<Demo :render="DotDemos.Sizes.render" />

## 組合

接在名稱前面就是狀態列表。

<Demo :render="DotDemos.StatusList.render" />

疊上 `sl-card-corner` 就固定到卡片角落（沒給是 `end` 右上，`start` 左上），同一個元素，不用再包一層：

```html
<i sl-card-corner sl-dot sl-tone="danger"></i>
```

<Demo :render="DotDemos.InCorner.render" />
