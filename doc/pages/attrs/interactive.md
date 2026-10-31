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
```

滑鼠移到卡片上才看得到差異：

<Demo :render="InteractiveDemos.Interactive.render" />

## 屬性

### 值

`grow`、`lift`、`raise`、`press`，沒給值是 `grow`。

### 適用元素

`sl-card`。
