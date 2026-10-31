---
title: Grid 格網
description: 欄數自適應的格網，欄寬不夠就自己換行，不用寫 media query。
---

<script setup>
import * as GridDemos from "../../demos/layout/grid.demo";
</script>

# Grid *格網*

> 欄數自適應的格網。欄寬不夠就自己換行，不用寫 media query。卡片列表、圖片牆這種重複單元都適用。

## 用法

```html
<div sl-grid>
  <div sl-card>...</div>
  <div sl-card>...</div>
  <div sl-card>...</div>
</div>
```

三種間距的實際樣子：

<Demo
  :render="GridDemos.Gaps.render"
/>

## 屬性

### 間距

- `sl-grid`：預設 `md`（12px）
- `sl-grid="xs"` 到 `sl-grid="5xl"`：對應尺規全階

改單一容器的話寫 `--sl-grid-gap`。

### 欄寬

每一欄最窄 14rem，空間不夠就折到下一行。改欄寬下限寫 `--sl-grid-min`：

<Demo
  :render="GridDemos.MinWidth.render"
/>
