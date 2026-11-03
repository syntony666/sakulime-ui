---
title: Notice 通知
description: 訊息元件，可作為頁面橫幅或角落浮動通知。
---

<script setup>
import * as NoticeDemos from "../../demos/components/notice.demo";
</script>

# Notice *通知*

> 可作為頁面橫幅，也可作為角落浮動通知的訊息元件。

<Playground :meta="NoticeDemos.default" :render="NoticeDemos.Notice.render" />

## 型態

型態為 `sl-notice` 的選項，未標示時為滿版（填滿容器）：

- `fit`：縮至內容寬度，適合浮動通知或依訊息長度調整的場合

<Demo :render="NoticeDemos.Widths.render" />

## 屬性

以下屬性皆寫在 `<div sl-notice>` 本體上。

### 顏色 `sl-tone`

`sl-notice` 為 `sl-tone` 的適用元件。未標示時為 `primary` 淺底色，即資訊通知的標準色。選項見 [Tone 色調](/attrs/tone)。

### 圓角 `sl-radius`

`sl-notice` 為 `sl-radius` 的適用元件，預設為 `full`。

此處的 `full` 半徑約為一行高加上內距。一至兩行為全圓，三行以上僅兩端保留圓弧，中段成直線。

其他選項見 [Radius 圓角](/attrs/radius)。

### 內距 `sl-pad`

未標示時為 `sm`。`md` 與 `lg` 為整體內距的增減，`lg` 適合多行的公告內容。選項見 [Pad 內距](/attrs/pad)。

### 互動效果 `sl-interactive`

通知標示後即呈現可點擊的外觀，游標變為手指，滑鼠移入時套用效果。

`sl-interactive` 未標示時為 `grow`；`shadow` 與 `lift` 的陰影疊在浮框外，不覆蓋框線。

效果選項見 [Interactive 互動效果](/attrs/interactive)。

## 元件設定

### 對齊 `sl-notice-align`

內容的對齊方向。`fit` 且內容不換行時，元件與內容同寬，因此沒有差異：

- 未標示／`start`：靠左（預設）
- `center`：置中；換行後每一行皆置中
- `end`：靠右；換行後每一行皆靠右

<Demo :render="NoticeDemos.Aligns.render" />

## 子元素

### 動作 `sl-notice--action`

固定於邊緣的控制項，例如關閉鈕或動作連結；點擊後的行為由頁面實作：

- 寫在 `sl-notice` 的直接子層；置於更深層時僅為一般內容，不會固定於邊緣
- 未標示時靠右（行尾），`start` 靠左（行首）；兩者可同時存在
- 垂直置中，文字不會繞至其下方
- 控制項較寬時調大 `--sl-notice-action-w`
- 距邊距離與字距分別為 `--sl-notice-action-inset`、`--sl-notice-action-gap`
- 內部的 `<i>` 隨按鈕字級縮放，加大時使用 [`sl-icon-size`](/core/icon)

<Playground :meta="NoticeDemos.ActionPlay" :render="NoticeDemos.ActionPlay.render" />

## 用法

### Banner *橫幅*

滿版一條，圖示、訊息與連結依序排列，連結沿用通知的文字顏色：

<Playground :meta="NoticeDemos.BannerPlay" :render="NoticeDemos.BannerPlay.render" />

將內容切換為「多行」即可查看換行。膠囊高度增加後，`full` 圓角僅保留於兩端，中段成直線。

`end` 對齊時，每一行皆靠右。圖示寫在內容中即為行內圖示，換行後仍滿版排列。

### Toast *浮動通知*

角落位置、堆疊方式與消失時機皆由頁面決定；角落容器見 [Float 浮動角落](/layout/float)：

<Playground :meta="NoticeDemos.ToastPlay" :render="NoticeDemos.ToastPlay.render" />
