---
title: Interactive 互動
description: 五種 hover 效果，滑鼠移入時才出現。
---

<script setup>
import * as InteractiveDemos from "../../demos/attrs/interactive.demo";
</script>

# Interactive *互動*

> 五種 hover 效果，滑鼠移入時才出現。

## 用法

```html
<div sl-card sl-interactive="lift">卡片</div>
<button sl-button sl-interactive="press">按鈕</button>
```

滑鼠移上去才看得到差異：

<Demo :render="InteractiveDemos.Interactive.render" />

## 選項

| 選項 | 效果 |
| --- | --- |
| `grow`（預設） | 放大至 1.03 |
| `lift` | 上移 4px 並加陰影 |
| `shadow` | 只加陰影 |
| `press` | 縮至 0.97 |
| `dim` | 調暗 |

未帶值或值不在表中時，一律視為 `grow`。

元件停用時不觸發效果，包含 `disabled` 與 `aria-disabled="true"` 兩種寫法。

## 適用元件

`sl-button` 是特例，未標示時 hover 本來就是 `grow`：

| 元件 | 未標示時 |
| --- | --- |
| [`sl-card`](/core/card) | 無 hover 效果 |
| [`sl-button`](/core/button) | `grow` |
| [`sl-chip`](/core/chip) | 無 hover 效果 |
| [`sl-notice`](/core/notice) | 無 hover 效果。陰影疊在浮框之外，不覆蓋框線 |
