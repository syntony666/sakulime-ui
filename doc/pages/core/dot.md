---
title: Dot 狀態點
description: 跟著字級走的 0.5em 狀態圓點，sl-tone 染成各種狀態色。
---

<script setup>
import * as DotDemos from "../../demos/components/dot.demo";
</script>

# Dot *狀態點*

一顆 0.5em 的圓點，插進句子、列表、表格都對齊文字。`sl-tone` 染成狀態色。

<Playground :meta="DotDemos.default" :render="DotDemos.Dot.render" />

## 屬性

### 顏色 `sl-tone`

`sl-dot` 在 `sl-tone` 的消費名單裡，寫上就染成對應色。不寫就繼承文字墨色。

- `primary`：主題主色
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

<Demo :render="DotDemos.Tones.render" />

### 大小與對齊

大小固定 `0.5em`，跟著所在文字的字級縮放——不用寫尺寸屬性。

<Demo :render="DotDemos.Sizes.render" />

## 組合

接在名稱前面就是狀態列表。

<Demo :render="DotDemos.StatusList.render" />
