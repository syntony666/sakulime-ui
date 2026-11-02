---
title: Size 尺寸
description: 高度、字級跟水平內距，三階。
---

<script setup>
import * as SizeDemos from "../../demos/attrs/size.demo";
</script>

# Size *尺寸*

> 高度、字級跟水平內距，三階。

## 用法

```html
<button sl-button sl-size="sm">小按鈕</button>
<span sl-chip sl-size="lg">大膠囊</span>
```

按鈕是高度、字級跟水平內距，膠囊是整顆等比縮放：

<Demo :render="SizeDemos.Sizes.render" />

## 選項

px 以根字級 16px 換算，刻度本身是 rem。高度是 `sl-button` 的，`sl-chip` 只取字級：

| 選項 | 字級 | 高度 |
| --- | --- | --- |
| `sm` | 12px | 24px |
| `md`（預設） | 16px | 32px |
| `lg` | 20px | 40px |

預設是 `sl-button` 的：未標示 `sl-size` 的按鈕就是 `md`。`sl-chip` 未標示是 `0.875em`，em 制、跟著所在字級縮放，不在刻度上；標了 `sl-size` 才換成表中的絕對字級。

## 適用元件

各元件的作用不同：

| 元件 | 作用 |
| --- | --- |
| [`sl-button`](/core/button) | 高度跟字級 |
| [`sl-chip`](/core/chip) | 只取字級，整顆等比縮放 |
