---
title: Gap 間距
description: 排版層唯一的間距屬性，寫在排版元件自身或外層，取最近的一層。
---

<script setup>
import * as GapDemos from "../../demos/attrs/gap.demo";
</script>

# Gap *間距*

> 排版層唯一的間距屬性。排版元件不自行存放間距，一律由 `sl-gap` 提供。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>              <!-- 間距 2xl -->
  <div sl-wrap>...</div>               <!-- 間距 2xl -->
  <div sl-stack sl-gap="xs">...</div>  <!-- 間距 xs -->
</div>
```

`sl-gap` 寫入可繼承的 `--sl-gap` 槽位。寫在外層時，內部所有讀取間距的排版元件一併生效，整區的節奏可以一次給齊。內層另行設定時，取最近的一層：

<Demo :render="GapDemos.Region.render" />

只想調整單一元件、又不願更動屬性時，可改寫該元件的變數：`--sl-stack-gap`、`--sl-content-gap`、`--sl-wrap-gap`、`--sl-grid-gap`、`--sl-sidebar-gap`、`--sl-float-gap`、`--sl-bar-gap`。這些變數優先於繼承而來的 `--sl-gap`，刻度以外的值（例如 `6px`）也走這條路徑。

`sl-gap` 只提供數值，本身不參與排版。內部沒有讀取它的元件時，標示與否結果相同：

<Demo :render="GapDemos.Alone.render" />

## 選項

px 以根字級 16px 換算，刻度本身為 rem。`sl-gap` 沒有預設值，未標示等同未設定；各排版元件另有自己的預設間距，多數為 `md`，`sl-sidebar` 為 `lg`：

| 選項 | 間距 |
| --- | --- |
| `none` | 0 |
| `xs` | 4px |
| `sm` | 8px |
| `md` | 12px |
| `lg` | 16px |
| `xl` | 20px |
| `2xl` | 24px |
| `3xl` | 32px |
| `4xl` | 40px |
| `5xl` | 48px |

<Demo :render="GapDemos.Scale.render" />

## 適用元件

讀取 `sl-gap` 的皆為排版元件，詳見[排版](/layout/)一章：

| 分類 | 元件 |
| --- | --- |
| 排列 | [`sl-stack`](/layout/stack)、[`sl-content`](/layout/content)、[`sl-wrap`](/layout/wrap)、[`sl-grid`](/layout/grid) |
| 頁面區塊 | [`sl-bar`](/layout/bar)、[`sl-sidebar`](/layout/sidebar)、[`sl-float`](/layout/float) |
