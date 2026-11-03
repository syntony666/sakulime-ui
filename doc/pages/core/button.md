---
title: Button 按鈕
description: 按鈕的樣式，寫在按鈕或連結的標記上就生效。
---

<script setup>
import * as ButtonDemos from "../../demos/components/button.demo";
</script>

# Button *按鈕*

> 按鈕的樣式，寫在按鈕或連結的標記上就生效。

<Playground :meta="ButtonDemos.default" :render="ButtonDemos.Button.render" />

## 型態

型態是 `sl-button` 的選項，未標示就是 `normal`：

```html
<button sl-button="outline">按鈕</button>
```

- `normal`：整顆填滿（預設）
- `outline`：只剩框線跟字
- `underline`：只有底線
- `ghost`：沒底沒框，只有字

<Demo :render="ButtonDemos.Variants.render" />

## 屬性

### 顏色 `sl-tone`

`sl-button` 是 `sl-tone` 的適用元件，未標示是 `primary`。填滿的 `normal` 染整顆，`outline`／`ghost`／`underline` 染框線跟字色。選項看 [Tone 色調](/attrs/tone)。

### 尺寸 `sl-size`

`sl-button` 是 `sl-size` 的適用元件，未標示是 `md`：高度、字級跟水平內距一起換。選項看 [Size 尺寸](/attrs/size)。

### 圓角 `sl-radius`

`sl-button` 是 `sl-radius` 的適用元件，未標示是 `md`。選項看 [Radius 圓角](/attrs/radius)。

### 互動 `sl-interactive`

`sl-button` 是 `sl-interactive` 的適用元件。未標示時 hover 本來就是 `grow` 放大；標了換成指定效果。選項看 [Interactive 互動](/attrs/interactive)。

### 停用

`disabled` 或 `aria-disabled="true"` 皆使按鈕淡化、游標顯示為禁用，hover 不再放大。透明度由共用 hook `--sl-disabled-opacity` 控制（預設 `0.5`）；調整全站可於 `:root` 覆寫。

<Demo :render="ButtonDemos.Disabled.render" />
