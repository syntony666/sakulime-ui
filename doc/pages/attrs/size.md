---
title: Size 尺寸
description: 三階尺寸，同時調整字級、高度與水平內距。
---

<script setup>
import * as SizeDemos from "../../demos/attrs/size.demo";
</script>

# Size *尺寸*

> 三階尺寸，同時調整字級、高度與水平內距。

## 用法

```html
<button sl-button sl-size="sm">小按鈕</button>
<span sl-chip sl-size="lg">大膠囊</span>
```

按鈕改的是高度、字級與水平內距。`sl-chip` 只取字級，整顆膠囊等比縮放：

<Demo :render="SizeDemos.Sizes.render" />

## 選項

px 以根字級 16px 換算，刻度本身為 rem。高度適用於 `sl-button`，`sl-chip` 只取字級：

| 選項 | 字級 | 高度 |
| --- | --- | --- |
| `sm` | 12px | 24px |
| `md`（預設） | 16px | 32px |
| `lg` | 20px | 40px |

未標示 `sl-size` 的按鈕為 `md`。`sl-chip` 未標示時為 `0.875em`，跟著所在字級縮放，不在刻度上；標示之後才改用表中的絕對字級。

## 適用元件

| 元件 | 作用 |
| --- | --- |
| [`sl-button`](/core/button) | 高度、字級與水平內距 |
| [`sl-chip`](/core/chip) | 只取字級，整顆等比縮放 |
