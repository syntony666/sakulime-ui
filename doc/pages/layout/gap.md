---
title: Gap 共用間距
description: 給排版屬性共用的間距值。
---

<script setup>
import * as GapDemos from "../../demos/layout/gap.demo";
</script>

# Gap *共用間距*

> 排版屬性共用的間距值。標示在外層，裡面沒給值的排版屬性會繼承這個值。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>      <!-- 間距 2xl -->
  <div sl-row>...</div>        <!-- 間距 2xl -->
  <div sl-stack="xs">...</div> <!-- 給了值，是 xs -->
</div>
```

外層設 `sl-gap="2xl"`，沒給值的 stack、row、grid 間距都是 2xl；自己給了值的不受影響：

<Demo :render="GapDemos.Region.render" />

讀 `sl-gap` 的屬性：`sl-stack`、`sl-row`、`sl-grid`、`sl-flow`、`sl-with-sidebar`、`sl-topbar`、`sl-footer`、`sl-toast`。

標示在元素自己身上等於直接給值，`<div sl-stack sl-gap="xs">` 跟 `sl-stack="xs"` 一樣；標示在外層，值會繼承給裡面所有讀它的屬性。元素自己給了值（`sl-stack="xs"` 或 `--sl-stack-gap`）用自己的，`sl-gap` 只補沒給值的。

## 屬性

### 間距

px 以根字級 16px 換算，尺規本身是 rem。`sl-gap` 沒有預設值，未標示等同於未設定。

`sl-gap` 的值就是間距，跟尺規同一套：

| 值    | 間距 |
| ----- | ---- |
| `xs`  | 4px  |
| `sm`  | 8px  |
| `md`  | 12px |
| `lg`  | 16px |
| `xl`  | 20px |
| `2xl` | 24px |
| `3xl` | 32px |
| `4xl` | 40px |
| `5xl` | 48px |
