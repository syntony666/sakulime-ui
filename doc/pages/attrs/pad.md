---
title: Pad 內距
description: 整體內距三階與歸零，各元件預設不同。
---

<script setup>
import * as PadDemos from "../../demos/attrs/pad.demo";
</script>

# Pad *內距*

> 整體內距，三階與歸零。

## 用法

```html
<div sl-card sl-pad="lg">卡片</div>
<div sl-notice sl-pad="sm">通知</div>
```

卡片的三階內距：

<Demo :render="PadDemos.Cards.render" />

`sl-notice` 同樣可讀，`lg` 適合公告型的多行內容：

<Demo :render="PadDemos.Notices.render" />

## 選項

px 以根字級 16px 換算，刻度本身為 rem：

| 選項 | 內距 |
| --- | --- |
| `none` | 0 |
| `sm` | 12px |
| `md` | 16px |
| `lg` | 24px |

未標示時各元件不同：`sl-card` 等同 `md`，`sl-notice` 與 `sl-bar` 等同 `sm`。

## 適用元件

| 元件 | 未標示時 | 備註 |
| --- | --- | --- |
| [`sl-card`](/core/card) | `md` | 四面內距 |
| [`sl-notice`](/core/notice) | `sm` | 四面內距，`lg` 適合多行公告 |
| [`sl-bar`](/layout/bar) | `sm` | 只影響上下內距 |
| [`sl-container`](/layout/container) | `md` | 只影響左右內距 |
