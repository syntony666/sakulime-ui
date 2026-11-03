---
title: Size 尺寸
description: 元件尺寸，連帶調整字級、高度與水平內距。
---

<script setup>
import * as SizeDemos from "../../demos/attrs/size.demo";
</script>

# Size *尺寸*

> 設定元件的尺寸，連帶調整字級、高度與水平內距。

## 用法

```html
<button sl-button sl-size="sm">小按鈕</button>
<span sl-chip sl-size="lg">大膠囊</span>
```

`sl-button` 調整高度、字級與水平內距；`sl-chip` 僅套用字級，整個膠囊連帶等比縮放：

<Demo :render="SizeDemos.Sizes.render" />

## 選項

表中 px 值以根字級 16px 換算，級距本身以 rem 定義。高度適用於 `sl-button`，`sl-chip` 僅套用字級：

| 選項 | 字級 | 高度 |
| --- | --- | --- |
| `sm` | 12px | 24px |
| `md`（預設） | 16px | 32px |
| `lg` | 20px | 40px |

未標示時，按鈕預設為 `md`。

`sl-chip` 預設為 `0.875em`，隨所在字級縮放，不在級距內；標示 `sl-size` 後才改用表中的絕對字級。

## 適用元件

| 元件 | 作用 |
| --- | --- |
| [`sl-button`](/core/button) | 高度、字級與水平內距 |
| [`sl-chip`](/core/chip) | 僅套用字級，整體等比縮放 |
