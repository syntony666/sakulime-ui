---
title: Card 卡片
description: 帶邊框的內容容器，有底色、細框線、圓角和內距。
---

<script setup>
import * as CardDemos from "../../demos/components/card.demo";
</script>

# Card *卡片*

> 帶邊框的內容容器，有底色、細框線、圓角和內距。

<Playground :meta="CardDemos.default" :render="CardDemos.Card.render" />

## 型態

型態寫在 `sl-card` 的值裡，不寫值就是一般卡片：

```html
<div sl-card="hollow">…</div>
```

- `hollow`：虛線描邊、透明底，常用在上傳或空白狀態
- `plain`：拿掉框線，保留底色和圓角
- `blank`：拿掉框線和底色，只剩內距

<Demo :render="CardDemos.Variants.render" />

## 屬性

以下屬性都寫在 `<div sl-card>` 本體上。

### 顏色 `sl-tone`

`sl-tone` 不會改變卡片本體的底色，它決定標記邊條的顏色（預設 primary）：

<Demo :render="CardDemos.Indicated.render" />

### 圓角 `sl-radius`

- `none`：直角
- `sm`：微圓
- `md`：一般圓角（預設值）
- `lg`：很圓
- `full`：一行膠囊，半徑最多一個行高，卡片一長高中段就變直線

<Demo :render="CardDemos.Radius.render" />

### 內距 `sl-pad`

- `sm`：小
- `md`：一般（預設值）
- `lg`：大

<Demo :render="CardDemos.Pads.render" />

### 互動 `sl-interactive`

整張卡片看起來可以點，游標變成手指，滑鼠移過去就有反應。不寫值是 `grow`：

- `grow`：放大
- `lift`：浮起＋陰影
- `raise`：只有陰影浮現
- `press`：下壓縮小

<Demo :render="CardDemos.Interactive.render" />

要讓點擊開啟頁面，把屬性寫在 `<a>` 上，卡片本身就是連結：

```html
<a sl-card sl-interactive href="/detail">…</a>
```

<Demo :render="CardDemos.InteractiveLink.render" />

## 修飾詞

### 標記 `sl-card-indicate`

在卡片邊緣加一條強調色，顏色跟著 `sl-tone` 走（預設 primary）：

- `top`：上緣
- `bottom`：下緣
- `start`：左緣
- `end`：右緣

<Demo :render="CardDemos.Indicates.render" />

## 子元素

放進卡片裡的零件。

### 角落標記 `sl-card-corner`

把元素固定在卡片頂端角落，適合時間、狀態、數字這類補充資訊。`sl-card-corner` 決定位置，長相由同一個元素上的小元件屬性決定：

```html
<div sl-card>
  <span sl-card-corner sl-chip>100ms</span>
  ...
</div>
```

<Playground :meta="CardDemos.Corner" :render="CardDemos.Corner.render" />

位置：

- 不寫值／`end`：右上
- `start`：左上

內容組合，`sl-chip` 文字膠囊、`sl-dot` 狀態點、`sl-icon` 圖示都可以放；`sl-tone` 寫在同一個元素上染色：

```html
<span sl-card-corner sl-chip sl-tone="primary">200ms</span>
<i sl-card-corner sl-dot sl-tone="danger"></i>
<i sl-card-corner="start" sl-icon="lucide:zap" sl-tone="warning"></i>
```

角落 chip 要調字級就寫 `sl-size`（`sm`/`md`/`lg`），整顆膠囊等比縮放。

<Demo :render="CardDemos.CornerPositions.render" />
<Demo :render="CardDemos.CornerKinds.render" />

### 分區 `sl-card-section`

把卡片切成幾個區塊，區塊之間會自動出現一條分隔線。第一個區塊不畫線，可以當標題區：

```html
<div sl-card>
  <div sl-card-section>標題</div>
  <div sl-card-section>內容</div>
  <div sl-card-section>底部</div>
</div>
```

<Demo :render="CardDemos.BasicSections.render" />

<Playground :meta="CardDemos.Sections" :render="CardDemos.Sections.render" />

#### 貼邊 `inset`

`inset` 會把卡片內距抵銷掉，讓內容貼到卡片邊緣，放圖片、地圖或色塊都合適。放在第一個就貼上緣，放在最後一個就貼下緣，夾在中間只貼左右兩邊，位置照順序自動判斷：

```html
<div sl-card>
  <div sl-card-section="inset"><img src="…"></div>
  <div sl-card-section>內容</div>
</div>
```

角落標記疊在貼邊內容上也行。`sl-card-corner` 不算一般內容，不會影響 inset 的位置判斷：

<Demo :render="CardDemos.Sections.render" :args="CardDemos.Sections.args" />
<Demo :render="CardDemos.Insets.render" />

#### 空白 `blank`

沒有框線、內容完全置中的區塊，用來放空狀態、上傳區或查無結果。裡面用 `strong` 寫標題、`p` 寫說明，按鈕放 `sl-button`，不用另外加 class：

```html
<div sl-card="hollow">
  <div sl-card-section="blank">
    <strong>上傳檔案</strong>
    <p>拖拉檔案至此</p>
  </div>
</div>
```

<Demo :render="CardDemos.Blank.render" />

#### 區塊型態

分區還有這幾種變化：

- `secondary`：次要內容的淡底
- `active`：目前選取的那一塊（primary 淡色）
- `center`：文字置中

<Demo :render="CardDemos.SectionKinds.render" />
