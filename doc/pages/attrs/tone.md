---
title: Tone 色調
description: 五個主題色調，標在適用元素上，背景跟文字色自動配好。
---

<script setup>
import * as ToneDemos from "../../demos/attrs/tone.demo";
</script>

# Tone *色調*

> 五個主題色調。標在適用元素上，背景跟文字色自動配好。

## 用法

```html
<button sl-button sl-tone="danger">刪除</button>
<span sl-chip sl-tone="success">完成</span>
```

同一個 `sl-tone` 套在不同元件上的樣子：

<Demo :render="ToneDemos.Tones.render" />

## 選項

`primary`、`secondary`、`success`、`warning`、`danger`。

## 適用元素

沒給的話，各元件的預設不同：

| 元素 | 預設 |
| --- | --- |
| `sl-button` | `primary` |
| `sl-card` | `primary`，只染邊緣強調條，不動卡片底色 |
| `sl-icon` | 繼承文字墨色 |
| `sl-dot` | 繼承文字墨色 |
| `sl-chip` | 文字墨色調出的中性底 |
| `sl-notice` | `primary` 淡底 |
