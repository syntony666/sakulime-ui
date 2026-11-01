---
title: Grid 網格系統
description: 網格系統。預設欄數自適應，要固定欄數配 sl-grid-cols。
---

<script setup>
import * as GridDemos from "../../demos/layout/grid.demo";
</script>

# Grid *網格系統*

> 網格系統。預設欄數自適應，欄寬不夠就自己換行；要固定欄數配 `sl-grid-cols`。卡片列表、圖片牆這種重複單元都適用。

## 用法

```html
<div sl-grid>
  <div sl-card>...</div>
  <div sl-card>...</div>
  <div sl-card>...</div>
</div>
```

## 欄數

`sl-grid-cols` 把欄數寫死，1 到 12：

```html
<div sl-grid sl-grid-cols="4">
  <div sl-card>...</div>
</div>
```

子層照順序填，滿一列自動換下一列。欄數固定，不會因為容器變窄掉欄；要分斷點掉欄就掛 `sl-grid-cols-lg`、`sl-grid-cols-md`、`sl-grid-cols-sm`，見[響應式設計](/layout/responsive)。

<Demo
  :render="GridDemos.Cols.render"
/>

## 跨欄

`sl-grid--span` 標在子層上，讓它佔好幾欄，2 到 12；裸標或 `sl-grid--span="full"` 不管欄數直接跨滿整列：

```html
<div sl-grid sl-grid-cols="4">
  <div sl-card sl-grid--span="2">橫跨兩欄</div>
  <div sl-card sl-grid--span="full">跨滿整列</div>
  <div sl-card>...</div>
</div>
```

超過當列剩餘欄位就自動掉下一列。固定欄數下，`sl-grid--span` 大於當前欄數會自動變滿列，不會溢出、也不會憑空生出軌道。auto-fill 的網格也能用，欄數跟著容器浮動，要保險的跨列用 `sl-grid--span="full"`（永遠跨滿）。
## 欄寬

欄數由公式算出，`repeat(auto-fill, minmax(min(--sl-grid-min, 100%), 1fr))`：

- 每欄最窄 `--sl-grid-min`（預設 14rem = 224px）
- 容器能再放下一欄就多一欄，放不下就掉欄，最少一欄
- 每欄扣掉間距後平分剩餘空間（`1fr`），所以欄數一樣時越寬欄位越寬
- 容器比欄寬下限還窄時，欄位縮到容器滿寬，不會凸出去
- 看的是容器可用寬度，不是視窗斷點

改欄寬下限寫 `--sl-grid-min`：

<Demo
  :render="GridDemos.MinWidth.render"
/>

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在 grid 自己身上或祖先上都行，預設 `md`。欄距跟行距是同一個。

只想改一個容器就寫 `--sl-grid-gap`；`sl-gap` 標示在容器自己或外層都行，裡面沒給間距的排版元件會繼承這個間距。

