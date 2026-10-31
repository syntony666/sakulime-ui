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

- `sl-row`：預設 `md`（12px）
- `sl-row="xs"` 到 `sl-row="5xl"`：對應尺規全階

改單一容器的話寫 `--sl-row-gap`。

### 窄屏直排 `sl-collapse`

寫了 `sl-collapse`，視窗窄於 40rem（640px）就變成垂直堆疊、子元素拉滿寬：

```html
<div sl-row sl-collapse>
  <button sl-button>送出</button>
  <button sl-button>取消</button>
</div>
```

不寫就永遠是橫列。標籤列在手機上通常還是要橫著排。斷點只跟視窗寬度走；不同數值的話，media query 自己寫。
