---
title: Topbar 頂列
description: 頁面頂端的橫列，sticky 或 fixed，內部左中右三區排列。
---

<script setup>
import * as TopbarDemos from "../../demos/layout/topbar.demo";
</script>

# Topbar *頂列*

> 頁面頂端的橫列。預設跟著內容滾到頂就停住，也能固定在視窗上。內部左中右三區，放什麼都可以。

## 用法

```html
<div sl-topbar>
  <strong>Logo</strong>
  <a href="#">連結</a>
</div>
```

<Demo :render="TopbarDemos.Topbar.render" />

## 屬性

### 型態

- 預設 **sticky**，內容滾到頂就停住，不佔版面外
- `sl-topbar="static"`：普通區塊，跟著頁面一起滾走
- `sl-topbar="fixed"`：固定在視窗頂部。body 自動補上 bar 高度的內距，下面的內容不會被蓋住

### 三區排列

內部是 `1fr auto 1fr` 的格網：子層依序佔左、中、右三區，置中是整條 bar 的中點，不是剩餘空間的中點。標 `sl-center` 固定在中間、`sl-end` 固定在尾端。兩個子層時第二個預設落在中間，推到右邊標 `sl-end`：

```html
<div sl-topbar>
  <div>Logo</div>
  <div sl-center>中間</div>
  <div sl-end>右邊</div>
</div>
```

<Demo :render="TopbarDemos.TopbarZones.render" />

同樣的標記在 `sl-row` 裡也通用。

### 尺寸與外觀

- 高度吃 `--sl-topbar-h`，預設 3.5rem（56px）。要改高度寫在 `:root`，fixed 時 body 的自動補償才跟得到
- 間距吃 `--sl-topbar-gap`，預設 `md`（12px），或寫通用的 `sl-gap`
- 底色 `--sl-bg`、底部 hairline、左右內距 `--sl-lg`（16px）、z-index 50
