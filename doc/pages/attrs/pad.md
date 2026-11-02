---
title: Pad 內距
description: 元件內距三階與歸零，預設值與作用範圍各異。
---

<script setup>
import * as PadDemos from "../../demos/attrs/pad.demo";
</script>

# Pad *內距*

> 元件本身的內距，三階與歸零。部分元件只作用於上下或左右。

## 用法

```html
<div sl-card sl-pad="lg">卡片</div>
<div sl-notice sl-pad="sm">通知</div>
```

卡片的三階內距：

<Demo :render="PadDemos.Cards.render" />

`sl-notice` 同樣支援，`lg` 適合多行的公告內容：

<Demo :render="PadDemos.Notices.render" />

## 選項

表中 px 值以根字級 16px 換算，級距本身以 rem 定義：

| 選項 | 內距 |
| --- | --- |
| `none` | 0 |
| `sm` | 12px |
| `md` | 16px |
| `lg` | 24px |

未標示時各元件的取值不同，見下方適用元件。

## 適用元件

| 元件 | 未標示時 | 作用範圍 |
| --- | --- | --- |
| [`sl-card`](/core/card) | `md` | 四邊 |
| [`sl-notice`](/core/notice) | `sm` | 四邊 |
| [`sl-bar`](/layout/bar) | `sm` | 僅上下 |
| [`sl-container`](/layout/container) | `md` | 僅左右 |