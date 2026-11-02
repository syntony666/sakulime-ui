---
title: Radius 圓角
description: 邊角圓弧，五階。
---

<script setup>
import * as RadiusDemos from "../../demos/attrs/radius.demo";
</script>

# Radius *圓角*

> 邊角圓弧，五階。

## 用法

```html
<div sl-card sl-radius="full">卡片</div>
<button sl-button sl-radius="none">按鈕</button>
```

五階的實際樣子：

<Demo :render="RadiusDemos.Radius.render" />

## 選項

px 以根字級 16px 換算，刻度本身是 rem：

| 選項 | 圓角 |
| --- | --- |
| `none` | 0 |
| `sm` | 4px |
| `md`（預設） | 8px |
| `lg` | 12px |
| `full` | 膠囊 |

`sl-card` 跟 `sl-notice` 的 `full` 半徑最多一個行高，元件一長高中段就變直線，不會撐成半圓；`sl-button` 沒有上限，一直是整顆膠囊。

## 適用元件

未標示的話都是 `md`，`sl-notice` 例外：

| 元件 | 預設 |
| --- | --- |
| `sl-button` | `md` |
| `sl-card` | `md` |
| `sl-notice` | `full`（膠囊形） |
