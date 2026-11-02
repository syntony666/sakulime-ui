---
title: Float 角落區
description: 裝 sl-notice 的固定角落容器，六個角落位置可選。
---

<script setup>
import * as FloatDemos from "../../demos/layout/float.demo";
</script>

# Float *角落區*

> 裝 [`sl-notice`](/core/notice) 的固定角落容器。通知本身是 `sl-notice`，`sl-float` 只負責把它們疊在角落。

## 用法

```html
<div sl-float>
  <div sl-notice sl-tone="success">已儲存變更</div>
  <div sl-notice>新版本可用</div>
</div>
```

容器寬 22rem、通知之間隔 `md`。下面用靜態定位示意（實際是 fixed 疊在角落）：

<Demo :render="FloatDemos.Float.render" />

## 位置

值是空白分隔的「邊 側」組合，六個角落，預設右下：

| 選項            | 位置           |
| --------------- | -------------- |
| 預設            | 右下           |
| `bottom start`  | 左下           |
| `bottom center` | 中下           |
| `bottom end`    | 右下（同預設） |
| `top start`     | 左上           |
| `top center`    | 中上           |
| `top end`       | 右上           |

詞序不拘，`"start bottom"` 也通；只寫一邊也行（`"start"` = 下緣左側）。`start` 是開始那側、`end` 是結束那側，中文書寫就是左、右；阿拉伯文那類右到左的書寫會反過來。

<Demo :render="FloatDemos.Corners.render" />

## 尺寸與間距

- fixed，z-index 讀 `--sl-float-z`（預設 60），會蓋在 `sl-bar`（`--sl-bar-z` 50）上面
- 寬度是 `--sl-float-width`，預設 22rem（352px）；視窗放不下自動縮，縮放幅度跟著 `--sl-float-inline` 走
- 高度上限是視窗高扣掉上下離邊距離，通知太多會在區塊內捲動，不會頂出視窗
- 離邊距離是 `--sl-float-block`／`--sl-float-inline`，預設都是 `lg`（16px）；底部錨點會自動避開手機 home indicator（safe-area inset）
- 通知之間的間隔為 `md`。只想改一個就寫 `--sl-float-gap`；[`sl-gap`](/attrs/gap) 標示在容器自己或外層都行
- 內容的水平對齊讀 [`sl-align`](/attrs/align)，預設 `stretch`（撐滿寬度）；`sl-notice="fit"` 縮到內容寬之後，`sl-align="start"`／`center`／`end` 決定它靠哪邊
- 列印時自動回到一般排版，不會每頁重複印出
- 順序跟堆疊由 DOM 決定，多一個 `sl-notice` 就多一張
