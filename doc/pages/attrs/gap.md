---
title: Gap 間距
description: 排版層唯一的間距屬性，由外層繼承，內層就近覆寫。
---

<script setup>
import * as GapDemos from "../../demos/attrs/gap.demo";
</script>

# Gap *間距*

> 設定排版元件之間的間距，整個排版層只有這一個間距屬性。

## 用法

```html
<div sl-gap="2xl">
  <div sl-stack>...</div>              <!-- 間距 2xl -->
  <div sl-wrap>...</div>               <!-- 間距 2xl -->
  <div sl-stack sl-gap="xs">...</div>  <!-- 間距 xs -->
</div>
```

`sl-gap` 寫入可繼承的 `--sl-gap` 變數。寫於外層時，內部所有讀取間距的排版元件皆一併生效，整區的間距一次設定完成。

內層另行設定時，以最近的一層為準：

<Demo :render="GapDemos.Region.render" />

僅需調整單一元件、且不改動屬性時，可改寫該元件的 `--sl-<元件>-gap`，例如 `--sl-stack-gap`。

這些變數優先於繼承而來的 `--sl-gap`；級距以外的值（例如 `6px`）沒有對應的選項，須寫入這些變數。

`sl-gap` 僅提供數值，本身不參與排版。內部沒有讀取它的元件時，標示與否結果相同：

<Demo :render="GapDemos.Alone.render" />

## 選項

表中 px 值以根字級 16px 換算，級距本身以 rem 定義。

`sl-gap` 沒有預設值，未標示即未設定；各排版元件另有預設間距，多數為 `md`，`sl-sidebar` 為 `lg`：

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

讀取 `sl-gap` 的皆為排版元件，詳見 [排版](/layout/)：

| 分類 | 元件 |
| --- | --- |
| 排列 | [`sl-stack`](/layout/stack)、[`sl-content`](/layout/content)、[`sl-wrap`](/layout/wrap)、[`sl-grid`](/layout/grid) |
| 頁面區塊 | [`sl-bar`](/layout/bar)、[`sl-sidebar`](/layout/sidebar)、[`sl-float`](/layout/float) |
