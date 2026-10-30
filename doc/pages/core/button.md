---
title: Button 按鈕
description: sl-button 按鈕，值決定型態，再用 sl-tone、sl-size、sl-radius 調整外觀。
---

<script setup>
import * as ButtonStories from "../../stories/components/button.stories";
</script>

# Button *按鈕*

<Playground :meta="ButtonStories.default" :render="ButtonStories.Button.render" />

## 顏色 `sl-tone`

- `primary`：主題主色（預設值）
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

### 實心版本

<Demo :render="ButtonStories.Tones.render" />

### 框線版本

<Demo :render="ButtonStories.TonesInvert.render" />

## 型態

型態直接寫在 `sl-button` 的值裡，不寫值就是 `normal`：

```html
<button sl-button="invert">按鈕</button>
```

- `normal`：整顆填滿（預設值）
- `invert`：只剩框線跟字
- `underline`：只有底線
- `ghost`：沒底沒框，只有字

<Demo :render="ButtonStories.Variants.render" />

## 尺寸 `sl-size`

- `sm`：小
- `md`：一般（預設值）
- `lg`：大

<Demo :render="ButtonStories.Sizes.render" />

## 圓角 `sl-radius`

- `none`：直角
- `sm`：微圓
- `md`：一般圓角（預設值）
- `lg`：很圓
- `full`：膠囊形，全圓到底

<Demo :render="ButtonStories.Radius.render" />
