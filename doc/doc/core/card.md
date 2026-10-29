---
title: Card 卡片
description: sl-card 卡片容器 — 內距、圓角、型態、邊緣標記與角落標記，全部寫在 sl-* 屬性上。
---

<script setup>
import * as CardStories from "../../stories/components/card.stories";
</script>

# Card *卡片*

帶邊框的內容容器，有底色、細框線、圓角和內距。可以只放文字，也能加邊緣標記和角落標記。

<Playground :meta="CardStories.default" :render="CardStories.Card.render" />

## 屬性

以下屬性都寫在 `<div sl-card>` 本體上。

### 內距 `sl-pad`

- `sm`：小
- `md`：一般（預設值）
- `lg`：大

<Demo :render="CardStories.Pads.render" />

### 圓角 `sl-radius`

- `none`：直角
- `sm`：微圓
- `md`：一般圓角（預設值）
- `lg`：很圓

<Demo :render="CardStories.Radius.render" />

### 型態 `sl-variant`

- `hollow`：虛線描邊，常用於上傳或空白狀態

<Demo :render="CardStories.Variants.render" />

### 標記 `sl-indicate` + `sl-tone`

在卡片邊緣加一條強調色，顏色跟著 `sl-tone` 走（預設 primary）：

- `top` / `bottom` / `start` / `end`

<Demo :render="CardStories.Indicated.render" />

### 浮起 `sl-raised`

加陰影讓卡片看起來浮起。

<Demo :render="CardStories.Raised.render" />

## 子元素

放進卡片裡的零件。

### 角落標記 `sl-card-corner`

在卡片頂端角落放一個小標記，適合時間、狀態、數字這類補充資訊。屬性值用空格分隔，類型和位置可以自由組合。顏色跟著 `sl-tone` 走（預設 primary）：

```html
<div sl-card>
  <span sl-card-corner="end text-sm">100ms</span>
  ...
</div>
```

<Demo :render="CardStories.Corner.render" :args="{ radius: '-', tone: '-' }" />

顏色跟著 `sl-tone` 走（預設 primary），寫在卡片上整張統一，寫在標記上只改那一個：

```html
<div sl-card sl-tone="success">
  <span sl-card-corner="end indicator" sl-tone="danger"></span>
</div>
```

類型：

- `text-sm`：小字標籤（省略類型時的預設）
- `text-xs`：更小的字級
- `indicator`：純色圓點，裡面放 `svg` 或 `img` 就變圖示（圓點不會出現；SVG 寫 `currentColor` 會跟著 `sl-tone` 的顏色）

位置：

- `end`：右上（預設值）
- `start`：左上

```html
<span sl-card-corner="start text-xs">6ms</span>
<span sl-card-corner="end indicator"></span>
<span sl-card-corner="end indicator">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><!-- icon --></svg>
</span>
```

<Demo :render="CardStories.CornerPositions.render" />
<Demo :render="CardStories.CornerTypes.render" />
