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

px 以根字級 16px 換算，尺規本身是 rem：

| 選項 | 圓角 |
| --- | --- |
| `none` | 0 |
| `sm` | 4px |
| `md`（預設） | 8px |
| `lg` | 12px |
| `full` | 膠囊 |

## 適用元素

沒給的話都是 `md`，`sl-notice` 例外：

| 元素 | 預設 |
| --- | --- |
| `sl-button` | `md` |
| `sl-card` | `md` |
| `sl-notice` | `full`（膠囊形） |
