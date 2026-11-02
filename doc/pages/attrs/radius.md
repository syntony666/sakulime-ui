---
title: Radius 圓角
description: 邊角圓弧五階，`full` 依元件不同而有上限。
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

px 以根字級 16px 換算，刻度本身為 rem：

| 選項 | 圓角 |
| --- | --- |
| `none` | 0 |
| `sm` | 4px |
| `md`（預設） | 8px |
| `lg` | 12px |
| `full` | 膠囊 |

`sl-card` 與 `sl-notice` 的 `full` 上限約為一行高加上內距。元件一長高，中段就成直線，不會撐成半圓。`sl-button` 沒有上限，整顆保持膠囊。

## 適用元件

未標示時皆為 `md`，`sl-notice` 例外：

| 元件 | 未標示時 |
| --- | --- |
| [`sl-button`](/core/button) | `md` |
| [`sl-card`](/core/card) | `md` |
| [`sl-notice`](/core/notice) | `full` |
