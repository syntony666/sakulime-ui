---
title: Interactive 互動
description: 滑鼠移過去的反應，四種。
---

<script setup>
import * as InteractiveDemos from "../../demos/attrs/interactive.demo";
</script>

# Interactive *互動*

> 滑鼠移過去的反應，四種。

## 用法

```html
<div sl-card sl-interactive="lift">卡片</div>
<button sl-button sl-interactive="press">按鈕</button>
```

滑鼠移上去才看得到差異：

<Demo :render="InteractiveDemos.Interactive.render" />

## 選項

`grow`、`lift`、`raise`、`press`，沒給是 `grow`。

## 適用元素

`sl-button` 是特例，沒標示時 hover 本來就是 `grow`：

| 元素 | 沒標示時 |
| --- | --- |
| `sl-card` | 沒有 hover 效果 |
| `sl-button` | hover 就是 `grow` 放大 |
