---
title: Gap 整區間距
description: 寫在元素自己或外層，一次改整區的間距。
---

<script setup>
import * as GapDemos from "../../demos/layout/gap.demo";
</script>

# Gap *整區間距*

> 在外層寫一次，整區的間距一起改。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>      <!-- 間距 2xl -->
  <div sl-row>...</div>        <!-- 間距 2xl -->
  <div sl-stack="xs">...</div> <!-- 寫了值，是 xs -->
</div>
```

外層寫一次，裡面三種排版屬性都生效；自己寫了值的不受影響：

<Demo :render="GapDemos.Region.render" />

讀 `sl-gap` 的屬性：`sl-stack`、`sl-row`、`sl-grid`、`sl-with-sidebar`、`sl-topbar`、`sl-footer`、`sl-toast`。

- 寫在自己身上：`<div sl-stack sl-gap="xs">` 這個 stack 的間距就是 xs，跟 `sl-stack="xs"` 一樣
- 寫在外層：裡面沒寫間距值的全部生效
- 元素自己寫了值（`sl-stack="xs"` 或 `--sl-stack-gap`）用自己的，`sl-gap` 只對沒寫值的生效

## 屬性

### 間距

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

表列 px 以根字級 16px 換算，尺規本身是 rem。`sl-gap` 沒有預設值，不寫它就是各屬性用自己的預設。
