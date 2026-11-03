---
title: Card 卡片
description: 放置內容的區塊，具備底色、框線、圓角與內距。
---

<script setup>
import * as CardDemos from "../../demos/components/card.demo";
</script>

# Card *卡片*

> 帶底色、細框線、圓角與內距的內容容器。

<Playground :meta="CardDemos.default" :render="CardDemos.Card.render" />

## 型態

型態為 `sl-card` 的選項，未標示時為一般卡片：

```html
<div sl-card="hollow">…</div>
```

- `hollow`：虛線描邊、透明底，常用於上傳或空白狀態
- `flat`：移除框線，保留底色與圓角
- `blank`：移除框線與底色，僅保留內距

<Demo :render="CardDemos.Variants.render" />

## 屬性

以下屬性皆寫在 `<div sl-card>` 本體上。

### 顏色 `sl-tone`

`sl-tone` 不改變卡片本體的底色，僅決定邊緣強調條的顏色（預設 `primary`）。選項見 [Tone 色調](/attrs/tone)。

### 圓角 `sl-radius`

`sl-card` 為 `sl-radius` 的適用元件，未標示時為 `md`。`full` 的半徑約為一行高加上內距。

卡片高度增加後中段即成直線。其他選項見 [Radius 圓角](/attrs/radius)。

### 內距 `sl-pad`

`sl-card` 為 `sl-pad` 的適用元件，未標示時為 `md`。選項見 [Pad 內距](/attrs/pad)。

### 互動 `sl-interactive`

卡片標示後即呈現可點擊的外觀，游標變為手指，滑鼠移入時套用效果。

`sl-interactive` 未標示時為 `grow`，效果選項見 [Interactive 互動](/attrs/interactive)。

需要點擊跳頁時，將屬性寫在 `<a>` 上，卡片本身即為連結：

```html
<a sl-card sl-interactive href="/detail">…</a>
```

## 元件設定

### 標記 `sl-card-indicator`

在卡片邊緣加上一條強調色，顏色依 `sl-tone` 而定（預設 `primary`）：

- `top`：上緣
- `bottom`：下緣
- `start`：左緣
- `end`：右緣

<Demo :render="CardDemos.Indicates.render" />

## 子元素

放進卡片裡的零件。

### 角落標記 `sl-card--corner`

將元素固定在卡片角落，適合時間、狀態、數字等補充資訊。

`sl-card--corner` 決定位置：`start` 為開始側、`end` 為結束側，中文書寫即左、右。

外觀由同一元素上的小元件屬性決定：

```html
<div sl-card>
  <span sl-card--corner sl-chip>100ms</span>
  ...
</div>
```

<Playground :meta="CardDemos.Corner" :render="CardDemos.Corner.render" />

位置僅有上緣兩側：

- 未標示／`end`：右上
- `start`：左上

可放入 [`sl-chip`](/core/chip) 文字膠囊、[`sl-dot`](/core/dot) 狀態點或 [`sl-icon`](/core/icon) 圖示；`sl-tone` 寫在同一元素上即可上色：

```html
<span sl-card--corner sl-chip sl-tone="primary">200ms</span>
<i sl-card--corner sl-dot sl-tone="danger"></i>
<i sl-card--corner="start" sl-icon="lucide:zap" sl-tone="warning"></i>
```

兩種掛法外觀不同。掛 `sl-chip` 為貼邊的 tab，掛 `sl-dot` 或 `sl-icon` 則為離邊浮起的圓點。

角落 chip 以 [`sl-size`](/attrs/size) 調整字級，整個膠囊隨之等比縮放。

<Demo :render="CardDemos.CornerPositions.render" />
<Demo :render="CardDemos.CornerKinds.render" />

### 分區 `sl-card--section`

將卡片切成數個區塊，區塊之間自動出現一條分隔線。第一個區塊不畫線，可作為標題區：

```html
<div sl-card>
  <div sl-card--section>標題</div>
  <div sl-card--section>內容</div>
  <div sl-card--section>底部</div>
</div>
```

<Demo :render="CardDemos.BasicSections.render" />

<Playground :meta="CardDemos.Sections" :render="CardDemos.Sections.render" />

#### 貼邊 `edge`

`edge` 會抵銷卡片內距，使內容貼齊卡片邊緣，適合放置圖片、地圖或色塊。

置於第一個則貼上緣，置於最後一個則貼下緣，夾在中間僅貼左右兩邊，位置依順序自動判斷：

```html
<div sl-card>
  <div sl-card--section="edge"><img src="…"></div>
  <div sl-card--section>內容</div>
</div>
```

角落標記亦可疊在貼邊內容上。`sl-card--corner` 不計入一般內容，不影響 `edge` 的位置判斷：

<Demo :render="CardDemos.Sections.render" :args="{ ...CardDemos.Sections.args, edge: 'middle' }" />
<Demo :render="CardDemos.Edges.render" />

#### 空白 `blank`

內容完全置中的區塊，用於空白狀態、上傳區或查無結果；作為第一個區塊時不帶框線。

內部以 `strong` 寫標題、`p` 寫說明，按鈕直接放 `sl-button`，不須額外加 `class`：

```html
<div sl-card="hollow">
  <div sl-card--section="blank">
    <strong>上傳檔案</strong>
    <p>拖曳檔案到這裡</p>
  </div>
</div>
```

<Demo :render="CardDemos.Blank.render" />

#### 區塊型態

分區另有以下變化：

- `secondary`：次要內容的淺底色
- `active`：目前選取的那一塊（primary 淡色）
- `center`：文字置中

<Demo :render="CardDemos.SectionKinds.render" />
