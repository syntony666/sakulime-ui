---
title: Radius 圓角
description: 元件邊角的圓弧，最大一階依元件而有不同上限。
---

<script setup>
import * as RadiusDemos from "../../demos/attrs/radius.demo";
</script>

# Radius *圓角*

> 設定元件邊角的圓弧，最大一階依元件而有不同上限。

## 用法

```html
<div sl-card sl-radius="full">卡片</div>
<button sl-button sl-radius="none">按鈕</button>
```

<Playground :meta="RadiusDemos.default" :render="RadiusDemos.Play.render" />

五階套用在卡片上的效果：

<Demo :render="RadiusDemos.Radius.render" />

## 選項

表中 px 值以根字級 16px 換算，級距本身以 rem 定義：

| 選項 | 圓角 |
| --- | --- |
| `none` | 0 |
| `sm` | 4px |
| `md`（預設） | 8px |
| `lg` | 12px |
| `full` | 依元件而定 |

## 適用元件

| 元件 | `full` 的值 | 未標示時 |
| --- | --- | --- |
| [`sl-button`](/core/button) | `9999px` | `md` |
| [`sl-card`](/core/card) | 約一行高 | `md` |
| [`sl-notice`](/core/notice) | 約一行高 | `full` |

`9999px` 遠超過高度的一半，瀏覽器會夾回一半，按鈕無論多高都呈膠囊狀。

`sl-card` 與 `sl-notice` 的值約為一行高，不隨元件總高放大。

一至兩行時，圓角已達高度的一半，整個區塊都是圓弧；三行起側邊中段成直線，四角仍為圓弧。
