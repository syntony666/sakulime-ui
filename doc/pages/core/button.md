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

型態是 `sl-button` 的選項，沒給就是 `normal`：

```html
<button sl-button="invert">按鈕</button>
```

- `normal`：整顆填滿（預設）
- `invert`：只剩框線跟字
- `underline`：只有底線
- `ghost`：沒底沒框，只有字

<Demo :render="ButtonDemos.Variants.render" />

## 屬性

### 顏色 `sl-tone`

- `primary`：主題主色（預設）
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

#### 實心版本

<Demo :render="ButtonDemos.Tones.render" />

#### 框線版本

<Demo :render="ButtonDemos.TonesInvert.render" />

### 尺寸 `sl-size`

- `sm`：小
- `md`：一般（預設）
- `lg`：大

<Demo :render="ButtonDemos.Sizes.render" />

### 圓角 `sl-radius`

- `none`：直角
- `sm`：微圓
- `md`：一般圓角（預設）
- `lg`：很圓
- `full`：膠囊形，全圓到底

<Demo :render="ButtonDemos.Radius.render" />
