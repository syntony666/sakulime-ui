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

`sl-grid` 的值就是間距，裸寫是 `md`：

| 值    | 間距         |
| ----- | ------------ |
| `xs`  | 4px          |
| `sm`  | 8px          |
| `md`  | 12px（預設） |
| `lg`  | 16px         |
| `xl`  | 20px         |
| `2xl` | 24px         |
| `3xl` | 32px         |
| `4xl` | 40px         |
| `5xl` | 48px         |

欄距跟行距吃同一個值。改單一容器寫 `--sl-grid-gap`，或寫通用的 `sl-gap`，原語自己的值優先。

### 欄寬

欄數是算出來的，公式是 `repeat(auto-fill, minmax(min(--sl-grid-min, 100%), 1fr))`：

- 每欄最窄 `--sl-grid-min`（預設 14rem = 224px）
- 容器能再放下一欄就多一欄，放不下就掉欄，最少一欄
- 每欄扣掉間距後平分剩餘空間（`1fr`），所以欄數一樣時越寬欄位越寬
- 容器比欄寬下限還窄時，欄位縮到容器滿寬，不會凸出去
- 看的是容器可用寬度，不是視窗斷點

改欄寬下限寫 `--sl-grid-min`：

<Demo
  :render="GridDemos.MinWidth.render"
/>
