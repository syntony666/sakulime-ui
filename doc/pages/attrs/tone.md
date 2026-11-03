---
title: Tone 色調
description: 元件色調，會自動搭配對應的背景與文字顏色。
---

<script setup>
import * as ToneDemos from "../../demos/attrs/tone.demo";
</script>

# Tone *色調*

> 設定元件的色調，連帶決定背景與文字顏色。

## 用法

```html
<button sl-button sl-tone="danger">刪除</button>
<span sl-chip sl-tone="success">完成</span>
```

<Playground :meta="ToneDemos.default" :render="ToneDemos.Play.render" />

各色調套用於按鈕的效果：

<Demo :render="ToneDemos.Tones.render" />

## 選項

| 選項 | 用途 |
| --- | --- |
| `primary` | 主色 |
| `secondary` | 次要色 |
| `success` | 成功與完成的回饋 |
| `warning` | 需要留意的提醒 |
| `danger` | 錯誤與危險操作 |

## 適用元件

未標示色調時，各元件的預設行為不同：

| 元件 | 未標示時 |
| --- | --- |
| [`sl-button`](/core/button) | `primary` |
| [`sl-card`](/core/card) | `primary`，只作用於邊緣強調條，卡片底色不變 |
| [`sl-icon`](/core/icon) | 隨文字顏色 |
| [`sl-dot`](/core/dot) | 隨文字顏色 |
| [`sl-chip`](/core/chip) | 中性底色，由文字顏色推導 |
| [`sl-notice`](/core/notice) | `primary` 的淺色底 |
