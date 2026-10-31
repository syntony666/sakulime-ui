---
title: Grid 網格系統
description: 網格系統。預設欄數自適應，要固定欄數配 sl-cols。
---

<script setup>
import * as GridDemos from "../../demos/layout/grid.demo";
</script>

# Grid *網格系統*

> 網格系統。預設欄數自適應，欄寬不夠就自己換行；要固定欄數配 `sl-cols`。卡片列表、圖片牆這種重複單元都適用。

## 用法

```html
<div sl-grid>
  <div sl-card>...</div>
  <div sl-card>...</div>
  <div sl-card>...</div>
</div>
```

三種間距的實際樣子：

<Demo
  :render="GridDemos.Gaps.render"
/>

## 屬性

### 間距

px 以根字級 16px 換算，尺規本身是 rem。欄距跟行距是同一個。

`sl-grid` 的選項就是間距，預設 `md`：

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

只想改一個容器就寫 `--sl-grid-gap`；[`sl-gap`](/attrs/gap) 標示在容器自己或外層都行，裡面沒給間距的排版屬性會繼承這個間距。

### 欄寬

欄數是算出來的，公式是 `repeat(auto-fill, minmax(min(--sl-grid-min, 100%), 1fr))`：

- 每欄最窄 `--sl-grid-min`（預設 14rem = 224px）
- 容器能再放下一欄就多一欄，放不下就掉欄，最少一欄
- 每欄扣掉間距後平分剩餘空間（`1fr`），所以欄數一樣時越寬欄位越寬
- 容器比欄寬下限還窄時，欄位縮到容器滿寬，不會凸出去
- 看的是容器可用寬度，不是視窗斷點

改欄寬下限寫 `--sl-grid-min`：

<Demo
  :render="GridDemos.MinWidth.render"
/>

### 欄數

`sl-cols` 把欄數寫死，2 到 12：

```html
<div sl-grid sl-cols="4">
  <div sl-card>...</div>
</div>
```

子層照順序填，滿一列自動換下一列。欄數是固定的，不會因為容器變窄掉欄；要分斷點掉欄就掛 `sl-cols-md`、`sl-cols-sm`，只要手機單欄的話標 `sl-collapse` 就好，見[響應式](/layout/responsive)。

<Demo
  :render="GridDemos.Cols.render"
/>

### 跨欄

`sl-span` 標在子層上，讓它佔好幾欄，2 到 12：

```html
<div sl-grid sl-cols="4">
  <div sl-card sl-span="2">橫跨兩欄</div>
  <div sl-card>...</div>
</div>
```

超過當列剩餘欄位就自動掉下一列。auto-fill 的網格也能用，只是欄數會變，跨幾欄的效果跟著容器寬度浮動。斷點掉欄時 `sl-span` 自動收斂成滿列，不會溢出。
