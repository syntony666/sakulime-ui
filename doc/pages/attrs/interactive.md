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

`sl-card`、`sl-button`。`sl-button` 沒標示時 hover 本來就是 `grow` 放大，標了 `sl-interactive` 換成指定的效果。
