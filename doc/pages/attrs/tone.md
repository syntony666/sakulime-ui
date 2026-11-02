---
title: Tone 色調
description: 五個主題色調。
---

<script setup>
import * as ToneDemos from "../../demos/attrs/tone.demo";
</script>

# Tone *色調*

> 五個主題色調，背景跟文字色自動配好。

## 用法

```html
<button sl-button sl-tone="danger">刪除</button>
<span sl-chip sl-tone="success">完成</span>
```

同一個 `sl-tone` 套在不同元件上的樣子：

<Demo :render="ToneDemos.Tones.render" />

## 選項

| 選項 | 用途 |
| --- | --- |
| `primary` | 主色 |
| `secondary` | 次要色 |
| `success` | 成功、完成的回饋 |
| `warning` | 需要注意的提醒 |
| `danger` | 錯誤、危險操作 |

## 適用元件

未標示的話，各元件的預設不同：

| 元件 | 預設 |
| --- | --- |
| `sl-button` | `primary` |
| `sl-card` | `primary`，只染邊緣強調條，不動卡片底色 |
| `sl-icon` | 繼承文字顏色 |
| `sl-dot` | 繼承文字顏色 |
| `sl-chip` | 中性底色，由文字顏色調出 |
| `sl-notice` | `primary` 淺底色 |
