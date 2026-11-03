---
title: Grid 網格系統
description: 依容器寬度自動分欄的網格系統，欄數亦可固定。
---

<script setup>
import * as GridDemos from "../../demos/layout/grid.demo";
</script>

# Grid *網格系統*

> 把子層排成網格，欄數隨容器寬度自適應。

## 用法

```html
<div sl-grid>
  <div sl-card>...</div>
  <div sl-card>...</div>
  <div sl-card>...</div>
</div>
```

底層為 `display: grid`。未指定欄數時，由容器寬度自動計算可容納的欄數（auto-fill），不須 media query。

## 欄數

`sl-grid-cols` 固定欄數，範圍 1 至 12；`auto` 與未標示相同，皆為 auto-fill：

```html
<div sl-grid sl-grid-cols="4">
  <div sl-card>...</div>
</div>
```

子層依序填入，滿一列後自動換至下一列。欄數固定，不因容器變窄而減少；若須依斷點減少欄數，掛上 `sl-grid-cols-lg`、`sl-grid-cols-md`、`sl-grid-cols-sm`，見[響應式設計](/layout/responsive)。

<Demo
  :render="GridDemos.Cols.render"
/>

## 跨欄

`sl-grid--span` 標在子層上，使該項佔用多欄，範圍 1 至 12；未標示或設為 `full` 時，無論欄數皆跨滿整列：

```html
<div sl-grid sl-grid-cols="4">
  <div sl-card sl-grid--span="2">橫跨兩欄</div>
  <div sl-card sl-grid--span="full">跨滿整列</div>
  <div sl-card>...</div>
</div>
```

超出當列剩餘欄位時，自動換至下一列。固定欄數下，跨欄數大於當前欄數時自動改為滿列，不會溢出，也不會產生額外的軌道。

auto-fill 的網格同樣適用；欄數隨容器變動，跨欄寫法以 `full` 最為保守，永遠跨滿整列。

## 欄寬

欄數由公式算出，`repeat(auto-fill, minmax(min(--sl-grid-min, 100%), 1fr))`：

- 每欄最窄為 `--sl-grid-min`（預設 14rem，即 224px）
- 容器每多放得下一欄，就增加一欄；放不下則減少，最少一欄
- 每欄扣除間距後均分剩餘空間（`1fr`），欄數相同時，容器越寬欄位越寬
- 容器窄於欄寬下限時，欄位縮至容器寬度，不會超出容器
- 判斷依據為容器可用寬度，並非視窗斷點

調整欄寬下限時，改寫 `--sl-grid-min`：

<Demo
  :render="GridDemos.MinWidth.render"
/>

## 對齊

格子內元素的位置由兩個屬性分別控制：[`sl-justify`](/attrs/justify) 控制水平位置（`justify-items`），[`sl-align`](/attrs/align) 控制垂直位置（`align-items`），兩者預設皆為 `stretch`，填滿格子：

```html
<div sl-grid sl-justify="center" sl-align="center">
  <div><i sl-icon="lucide:zap"></i> 圖示在格子正中央</div>
</div>
```

兩個屬性亦可標在單一子層上（`justify-self`／`align-self`），僅該格離開共同對齊。`sl-justify` 的 `between` 不適用於格子，會退回 `stretch`。

<Demo :render="GridDemos.Aligns.render" />

## 間距

間距由 [`sl-gap`](/attrs/gap) 給定，寫在 grid 自身或外層皆可，預設 `md`。欄距與行距為同一個值。

僅調整單一容器時，改寫 `--sl-grid-gap`。
