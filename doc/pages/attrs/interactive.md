---
title: Interactive 互動效果
description: 滑鼠移入時觸發的動態效果，可設定放大、位移、陰影與亮度。
---

<script setup>
import * as InteractiveDemos from "../../demos/attrs/interactive.demo";
</script>

# Interactive *互動效果*

> 設定滑鼠移入時套用的動態效果。

## 用法

```html
<div sl-card sl-interactive="lift">卡片</div>
<button sl-button sl-interactive="press">按鈕</button>
```

滑鼠移入後方可看出差異：

<Demo :render="InteractiveDemos.Interactive.render" />

## 選項

| 選項 | 效果 |
| --- | --- |
| `grow`（未帶值時） | 放大至 1.03 倍 |
| `lift` | 上移 4px，並加上陰影 |
| `shadow` | 只加陰影 |
| `press` | 縮小至 0.97 倍 |
| `dim` | 降低亮度 |

未帶值，或值不在表中時，一律視為 `grow`。

元件停用時（`disabled` 與 `aria-disabled="true"`）不觸發效果。

## 適用元件

`sl-button` 為特例，未標示時即為 `grow`：

| 元件 | 未標示時 |
| --- | --- |
| [`sl-card`](/core/card) | 無效果 |
| [`sl-button`](/core/button) | `grow` |
| [`sl-chip`](/core/chip) | 無效果 |
| [`sl-notice`](/core/notice) | 無效果。陰影疊在浮框外，不覆蓋框線 |
