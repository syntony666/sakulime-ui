---
title: Pad 內距
description: 整體內距，三階。
---

<script setup>
import * as PadDemos from "../../demos/attrs/pad.demo";
</script>

# Pad *內距*

> 整體內距，三階。

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

px 以根字級 16px 換算，尺規本身是 rem：

| 選項 | 內距 |
| --- | --- |
| `sm` | 12px |
| `md` | 16px |
| `lg` | 24px |

未標示時的預設看元件：`sl-card` 等同 `md`，`sl-notice` 跟 `sl-bar` 等同 `sm`。

## 適用元素

整體內距的增減：

| 元素 | 預設 | 備註 |
| --- | --- | --- |
| `sl-card` | `md` | `lg` 讓內容不擠 |
| `sl-notice` | `sm` | `lg` 適合公告型的多行內容 |
| `sl-bar` | `sm` | 只影響上下內距，`lg` 是厚頁尾 |
