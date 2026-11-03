---
title: Button 按鈕
description: 按鈕與連結共用的按鈕樣式。
---

<script setup>
import * as ButtonDemos from "../../demos/components/button.demo";
</script>

# Button *按鈕*

> 把按鈕樣式套用在按鈕或連結元素上。

<Playground :meta="ButtonDemos.default" :render="ButtonDemos.Button.render" />

## 型態

型態為 `sl-button` 的選項，未標示時為 `normal`：

```html
<button sl-button="outline">按鈕</button>
```

- `normal`：整體填滿（預設）
- `outline`：僅框線與文字
- `underline`：僅底線
- `ghost`：無底色與框線，僅文字

<Demo :render="ButtonDemos.Variants.render" />

## 屬性

### 顏色 `sl-tone`

`sl-button` 為 `sl-tone` 的適用元件，未標示時為 `primary`。`normal` 為整體上色，其餘型態僅為框線與文字上色。

選項見 [Tone 色調](/attrs/tone)。

### 尺寸 `sl-size`

`sl-button` 為 `sl-size` 的適用元件，未標示時為 `md`，高度、字級與水平內距同時改變。選項見 [Size 尺寸](/attrs/size)。

### 圓角 `sl-radius`

`sl-button` 為 `sl-radius` 的適用元件，未標示時為 `md`。選項見 [Radius 圓角](/attrs/radius)。

### 互動 `sl-interactive`

`sl-button` 為 `sl-interactive` 的適用元件。未標示時，滑鼠移入即為 `grow` 放大。

標示後改用指定效果，選項見 [Interactive 互動](/attrs/interactive)。

### 停用

`disabled` 或 `aria-disabled="true"` 皆會使按鈕淡化、游標顯示為禁用，且不再放大。

透明度由共用 hook `--sl-disabled-opacity` 控制（預設 `0.5`），調整全站時於 `:root` 覆寫。

<Demo :render="ButtonDemos.Disabled.render" />
