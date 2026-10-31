---
title: sl-gap 整區間距
description: 寫在元素自己或外層，一次改整區的間距。
---

<script setup>
import * as GapDemos from "../../demos/layout/gap.demo";
</script>

# sl-gap *整區間距*

> 每個排版屬性都能各自寫間距，但常常一整區想同一個節奏。`sl-gap` 寫在元素自己或外層都行，裡面沒寫值的 `sl-stack`、`sl-row`、`sl-grid`、`sl-with-sidebar`、`sl-topbar`、`sl-footer`、`sl-toast` 全部吃到。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>      <!-- 間距 2xl -->
  <div sl-row>...</div>        <!-- 間距 2xl -->
  <div sl-stack="xs">...</div> <!-- 寫了值，吃 xs -->
</div>
```

外層寫一次，裡面三種排版屬性都吃到；自己寫了值的不受影響：

<Demo :render="GapDemos.Region.render" />

## 屬性

### 值

跟間距尺規同一套：`xs`（4px）–`5xl`（48px）。`sl-gap` 沒有預設值，不寫它就是各屬性用自己的預設。

### 誰會吃到

- **寫在自己身上**：`<div sl-stack sl-gap="xs">` 這個 stack 的間距就是 xs，跟寫 `sl-stack="xs"` 一樣
- **寫在外層**：祖先元素寫一次，裡面所有吃間距的排版屬性都吃到
- **誰贏**：元素自己寫了值（`sl-stack="xs"` 或 `--sl-stack-gap`）用自己的，`sl-gap` 只對沒寫值的生效
