---
title: Interactive 互動
description: hover 效果，四種。
---

<script setup>
import * as InteractiveDemos from "../../demos/attrs/interactive.demo";
</script>

# Interactive *互動*

> hover 效果，四種。

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
| `grow`（預設） | 放大 1.05 |
| `lift` | 浮起 4px 加陰影 |
| `raise` | 只有陰影 |
| `press` | 壓下 0.97 |

## 適用元素

`sl-button` 是特例，沒標示時 hover 本來就是 `grow`：

| 元素 | 沒標示時 |
| --- | --- |
| `sl-card` | 沒有 hover 效果 |
| `sl-button` | hover 就是 `grow` 放大 |
