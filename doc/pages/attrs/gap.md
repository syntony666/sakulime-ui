---
title: Gap 間距
description: 唯一的間距屬性，寫在排版元件自己或祖先上，最近的設定贏。
---

<script setup>
import * as GapDemos from "../../demos/attrs/gap.demo";
</script>

# Gap *間距*

> 唯一的間距屬性。排版元件的值槽不裝間距，間距全部由 `sl-gap` 給——寫在排版元件自己身上，或寫在任何一層祖先上。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>      <!-- 間距 2xl -->
  <div sl-wrap>...</div>        <!-- 間距 2xl -->
  <div sl-stack sl-gap="xs">...</div> <!-- 給了 xs -->
</div>
```

`sl-gap` 設的是會繼承的 `--sl-gap` 槽——寫在祖先上，裡面所有吃間距的排版元件都讀得到，這是刻意的設計：一整區的節奏一次給齊。最近的設定贏：外層 `2xl`、排版元件自己給 `xs`，生效的是 `xs`：

<Demo :render="GapDemos.Region.render" />

只想改一個、又不想動屬性，就寫它自己的間距變數：`--sl-stack-gap`、`--sl-content-gap`、`--sl-wrap-gap`、`--sl-grid-gap`、`--sl-sidebar-gap`、`--sl-float-gap`、`--sl-bar-gap`，優先於繼承下來的 `sl-gap`。刻度以外的值（例如 `6px`）也走這條 inline 變數路。

`sl-gap` 只存放間距，自己不排版。裡面沒有讀它的屬性時，標了跟沒標一樣：

<Demo :render="GapDemos.Alone.render" />

## 選項

px 以根字級 16px 換算，刻度本身是 rem。`sl-gap` 沒有預設，未標示等同於未設定；各排版元件有自己的預設間距（`md`，sidebar 是 `lg`）：

| 選項  | 間距 |
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

## 適用元件

讀 `sl-gap` 的都是排版屬性，在[排版](/layout/)一章介紹：

| 分類     | 屬性                                  |
| -------- | ------------------------------------- |
| 排列 | `sl-stack`、`sl-content`、`sl-wrap`、`sl-grid` |
| 頁面區塊 | `sl-bar`、`sl-sidebar`、`sl-float`    |
