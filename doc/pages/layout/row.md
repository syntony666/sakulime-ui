---
title: Row 橫列
description: 水平排列子元素，放不下就換行，間距由容器統一給。
---

<script setup>
import * as RowDemos from "../../demos/layout/row.demo";
</script>

# Row *橫列*

> 把子元素水平排開，放不下就換行，間距由容器統一給。按鈕群、標籤列這種一排小東西都適用。

## 用法

```html
<div sl-row>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
  <span sl-chip>標籤</span>
</div>
```

子元素垂直置中對齊。三種間距的實際樣子：

<Demo
  :render="RowDemos.Gaps.render"
/>

## 屬性

### 間距

`sl-row` 的值就是間距，裸寫是 `md`：

| 值    | 間距         |
| ----- | ------------ |
| `xs`  | 4px          |
| `sm`  | 8px          |
| `md`  | 12px（預設） |
| `lg`  | 16px         |
| `xl`  | 20px         |
| `2xl` | 24px         |
| `3xl` | 32px         |
| `4xl` | 40px         |
| `5xl` | 48px         |

水平間距跟換行後的行距吃同一個值。改單一容器寫 `--sl-row-gap`。

### 行為

- 水平排列、子元素垂直置中（`align-items: center`）
- 項目總寬超過容器寬度就整個換到下一行；換行時機看內容實際寬度，沒有固定斷點
- 子元素寬度不動，不會被拉寬或壓縮

### 窄屏直排 `sl-collapse`

寫了 `sl-collapse`，視窗寬度小於 40rem（640px）時：

- 變成垂直堆疊（`flex-direction: column`）
- 子元素拉滿容器寬
- 間距值不變，變成垂直間距

```html
<div sl-row sl-collapse>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
</div>
```

斷點只看視窗寬度，跟容器寬度無關；不同數值的話，media query 自己寫。不寫 `sl-collapse` 的 `sl-row` 永遠橫排。標籤列在手機上通常還是要橫著排。
