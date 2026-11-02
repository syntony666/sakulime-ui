---
title: Tone 色調
description: 五個主題色調，元件會依色調自動搭配背景與文字色。
---

<script setup>
import * as ToneDemos from "../../demos/attrs/tone.demo";
</script>

# Tone *色調*

> 五個主題色調。元件會依色調自動配上背景與文字色。

## 用法

```html
<button sl-button sl-tone="danger">刪除</button>
<span sl-chip sl-tone="success">完成</span>
```

同一個色調套在不同元件上的樣子：

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

未標示色調時，各元件的取法不同：

| 元件 | 未標示時 |
| --- | --- |
| [`sl-button`](/core/button) | `primary` |
| [`sl-card`](/core/card) | `primary`，只染邊緣強調條，卡片底色不變 |
| [`sl-icon`](/core/icon) | 跟隨文字顏色 |
| [`sl-dot`](/core/dot) | 跟隨文字顏色 |
| [`sl-chip`](/core/chip) | 中性底色，由文字顏色調出 |
| [`sl-notice`](/core/notice) | `primary` 淺底 |
