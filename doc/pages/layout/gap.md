---
title: Gap 共用間距
description: 給排版屬性共用的間距值。
---

<script setup>
import * as GapDemos from "../../demos/layout/gap.demo";
</script>

# Gap *共用間距*

> 排版屬性共用的間距值。寫在外層，裡面沒寫值的都會用它。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>      <!-- 間距 2xl -->
  <div sl-row>...</div>        <!-- 間距 2xl -->
  <div sl-stack="xs">...</div> <!-- 寫了值，是 xs -->
</div>
```

外層設 `sl-gap`，裡面三種排版屬性都會用它；自己寫了值的不受影響：

<Demo :render="GapDemos.Region.render" />

讀 `sl-gap` 的屬性：`sl-stack`、`sl-row`、`sl-grid`、`sl-with-sidebar`、`sl-topbar`、`sl-footer`、`sl-toast`。

- 寫在自己身上：`<div sl-stack sl-gap="xs">` 這個 stack 的間距就是 xs，跟 `sl-stack="xs"` 一樣
- 寫在外層：裡面沒寫間距值的都會用它
- 元素自己寫了值（`sl-stack="xs"` 或 `--sl-stack-gap`）用自己的；沒寫值的才用 `sl-gap`

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
