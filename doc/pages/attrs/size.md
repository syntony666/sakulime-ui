---
title: Size 尺寸
description: 高度跟字級，三階。
---

<script setup>
import * as SizeDemos from "../../demos/attrs/size.demo";
</script>

# Size *尺寸*

> 高度跟字級，三階。

## 用法

```html
<button sl-button sl-size="sm">小按鈕</button>
<span sl-chip sl-size="lg">大膠囊</span>
```

按鈕是高度跟字級，膠囊是整顆等比縮放：

<Demo :render="SizeDemos.Sizes.render" />

## 選項

`sm`、`md`、`lg`，預設 `md`。

## 適用元素

| 元素 | 作用 |
| --- | --- |
| `sl-button` | 高度跟字級 |
| `sl-chip` | 只取字級，整顆等比縮放 |
