<script setup>
import * as CardStories from "../doc/src/components/card.stories";
</script>

# Card *卡片*

帶邊框的內容容器 — surface 底色、細框線、圓角、內距。可以只放文字，也能組合貼邊圖片與標記。

<Playground :meta="CardStories.default" :render="CardStories.Card.render" />

## 貼邊圖片 `sl-card-media`

包一層 `sl-card-media` 讓圖片貼到卡片邊緣，圓角會自動裁切：

```html
<div sl-card>
  <div sl-card-media><img src="..." /></div>
  <div><strong>標題</strong><p>內容</p></div>
</div>
```

<Demo :render="CardStories.WithMedia.render" />

## 內距 `sl-pad`

- `none`：不內縮
- `sm`：小
- `md`：一般（預設值）
- `lg`：大

<Demo :render="CardStories.Pads.render" />

## 圓角 `sl-radius`

- `none`：直角
- `sm`：微圓
- `md`：一般圓角（預設值）
- `lg`：很圓
- `full`：全圓到底

<Demo :render="CardStories.Radius.render" />

## 型態 `sl-variant`

- `horizontal`：圖片在左、內容在右
- `hollow`：虛線描邊，常用於上傳或空白狀態

<Demo :render="CardStories.Variants.render" />

## 標記 `sl-indicate` + `sl-tone`

在卡片某個邊緣加一條強調色，顏色吃 `sl-tone`（預設 primary）：

- `top` / `bottom` / `start` / `end`

<Demo :render="CardStories.Indicated.render" />

## 浮起 `sl-raised`

加陰影讓卡片看起來浮起。

<Demo :render="CardStories.Raised.render" />
