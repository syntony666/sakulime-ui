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

子元素垂直置中，總寬超過容器就整個換到下一行；換行時機看內容實際寬度，沒有固定斷點。子元素寬度不動，要推到行尾標 `sl-end`，要在兄弟之間置中標 `sl-center`。

三種間距的實際樣子：

<Demo
  :render="RowDemos.Gaps.render"
/>

## 窄屏直排 `sl-collapse`

標示 `sl-collapse` 後，視窗寬度小於 45rem（720px，即 `sm` [斷點](/layout/responsive)）時：

- 變成垂直堆疊（`flex-direction: column`）
- 子元素拉滿容器寬
- 間距不變，變成垂直間距

```html
<div sl-row sl-collapse>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
</div>
```

斷點只看視窗寬度，跟容器寬度無關；要別的斷點的話，media query 自己寫。未標示 `sl-collapse` 的 `sl-row` 永遠橫排。標籤列在手機上通常還是要橫著排。

## 間距

px 以根字級 16px 換算，尺規本身是 rem。水平間距跟換行後的行距是同一個。`sl-row` 的選項就是間距，預設 `md`：

| 選項  | 間距         |
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

只想改一個容器就寫 `--sl-row-gap`；[`sl-gap`](/attrs/gap) 標示在容器自己或外層都行，裡面沒給間距的排版屬性會繼承這個間距。
