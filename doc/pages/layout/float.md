---
title: Float 角落區
description: 固定於視窗角落的通知容器，可指定落點。
---

<script setup>
import * as FloatDemos from "../../demos/layout/float.demo";
</script>

# Float *角落區*

> 把通知堆疊在視窗角落的固定容器。

## 用法

```html
<div sl-float>
  <div sl-notice sl-tone="success">已儲存變更</div>
  <div sl-notice>新版本可用</div>
</div>
```

容器寬 22rem，通知間距為 `md`。下方以靜態定位示意，實際為 fixed 疊於角落：

<Demo :render="FloatDemos.Float.render" />

## 位置

值為以空白分隔的「邊 側」組合，預設為右下：

| 選項            | 位置           |
| --------------- | -------------- |
| 預設            | 右下           |
| `bottom start`  | 左下           |
| `bottom center` | 中下           |
| `bottom end`    | 右下（同預設） |
| `top start`     | 左上           |
| `top center`    | 中上           |
| `top end`       | 右上           |

詞序不拘，`"start bottom"` 亦可；僅寫一邊也能成立（`"start"` 即下緣左側）。

`start` 為開始側、`end` 為結束側，中文書寫即左、右；由右至左的書寫系統則相反。

`top` 與 `bottom` 依區塊軸判斷，直排書寫（`writing-mode: vertical-*`）時貼的是區塊邊，並非視覺上的上下。

<Demo :render="FloatDemos.Corners.render" />

## 尺寸與間距

- fixed；z-index 讀取 `--sl-float-z`（預設 60），層級高於 [`sl-bar`](/layout/bar)（`--sl-bar-z` 50）
- 寬度為 `--sl-float-width`，預設 22rem（352px）
- 視窗不足時自動縮小，幅度依 `--sl-float-inline` 而定
- 高度上限為視窗高扣除上下離邊距離；通知過多時於區塊內捲動，不會超出視窗
- 離邊距離為 `--sl-float-block`／`--sl-float-inline`，預設皆為 `lg`（16px）
- 底部錨點會自動避開手機 home indicator（safe-area inset）
- 內容的水平對齊讀取 [`sl-align`](/attrs/align)，預設為 `stretch`（與容器同寬）
- `sl-notice="fit"` 縮至內容寬後，靠向哪一側由 `sl-align` 決定
- 列印時自動回到一般排版，不會於每頁重複出現
- 順序依寫入頁面的先後堆疊，每多一個 `sl-notice` 即多一張

## 間距

通知之間的間隔由 [`sl-gap`](/attrs/gap) 給定，預設 `md`，寫在容器自身或外層皆可。

僅調整單一容器時，改寫 `--sl-float-gap`。
