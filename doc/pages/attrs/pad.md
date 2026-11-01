---
title: Pad 內距
description: 元件的整體內距，三階。
---

<script setup>
import * as PadDemos from "../../demos/attrs/pad.demo";
</script>

# Pad *內距*

> 元件的整體內距，三階。

## 用法

```html
<div sl-card sl-pad="lg">卡片</div>
<div sl-notice sl-pad="sm">通知</div>
```

卡片的三階內距：

<Demo :render="PadDemos.Cards.render" />

`sl-notice` 也讀，`lg` 適合公告型的多行內容：

<Demo :render="PadDemos.Notices.render" />

## 選項

`sm`、`md`、`lg`，預設 `md`。

## 適用元素

`sl-card`、`sl-notice`。整體內距的增減，`lg` 適合公告型的多行內容。
