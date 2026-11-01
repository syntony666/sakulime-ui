---
title: Notice 通知
description: 通知膠囊。放進內容是頁面橫幅，包進固定在角落的容器就是浮動通知。
---

<script setup>
import * as NoticeDemos from "../../demos/components/notice.demo";
</script>

# Notice *通知*

> 通知用的膠囊訊息，「部署失敗」「系統維護中」「已儲存變更」這類狀況都適用。直接放進內容，就是頁面頂端的滿版橫幅；包進固定在角落的容器，就變成浮動通知。同一個元件，兩種用法。

<Playground :meta="NoticeDemos.default" :render="NoticeDemos.Notice.render" />

## 型態

寬度是 `sl-notice` 的選項，沒給就是滿版（填滿容器）：

- `fit`：縮成內容的寬度，浮動通知或配合訊息長度的場合

<Demo :render="NoticeDemos.Widths.render" />

## 屬性

以下屬性都寫在 `<div sl-notice>` 本體上。

### 顏色 `sl-tone`

`sl-notice` 是 `sl-tone` 的適用元素。沒給是 primary 淺底色，資訊通知的標準色。

- `primary`：主題主色（預設）
- `secondary`：主題副色
- `success`：代表成功
- `warning`：代表警告
- `danger`：代表危險

<Demo :render="NoticeDemos.Tones.render" />

### 圓角 `sl-radius`

`sl-notice` 是 `sl-radius` 的適用元素，預設 `full`，膠囊形。這裡的 `full` 半徑最多一個行高，一、二行是全圓膠囊，三行以上兩端保留一行的圓弧、中段變成直線，不會拉長成半圓：

- `sm`：微圓
- `md`：一般圓角
- `lg`：很圓
- `full`：單行膠囊（預設）
- `none`：直角

<Demo :render="NoticeDemos.Radius.render" />

### 厚度 `sl-pad`

沒給是 `sm`。`md`／`lg` 是整體內距的增減，`lg` 適合公告型的多行內容：

<Demo :render="NoticeDemos.Pads.render" />

## 修飾詞

### 對齊 `sl-notice-align`

內容的對齊方向，`fit` 時元件跟內容同寬所以沒有差別：

- 沒給：靠左（預設）
- `end`：靠右；換行後每一行都靠右

<Demo :render="NoticeDemos.Aligns.render" />

## 子元素

### 動作 `sl-notice-action`

固定在邊緣的控制項，例如關閉鈕或動作連結，點擊後的行為由頁面實作：

- 寫在 `sl-notice` 的直接子層；放到更深層的只是普通內容，不會固定到邊緣
- 沒給靠右（尾端），`start` 靠左（開頭），兩個可以同時存在
- 垂直置中，文字不會繞到它底下；控制項更寬時調大 `--sl-action-w`
- 裡面的 `<i>` 跟著按鈕字級，加大用 `sl-icon-size`

<Playground :meta="NoticeDemos.ActionPlay" :render="NoticeDemos.ActionPlay.render" />

## 用法

### Banner *橫幅*

滿版一條，圖示、訊息、連結照順序排，連結沿用通知的文字顏色：

<Playground :meta="NoticeDemos.BannerPlay" :render="NoticeDemos.BannerPlay.render" />

內容切到「多行」看換行。膠囊會變高，`full` 圓角到一行高後中段變直；`end` 對齊時每一行都靠右。圖示寫在內容裡就是行內圖示，換行後還是滿版排下去，不用另外包一層。

### Toast *浮動通知*

放在哪個角落、怎麼疊、什麼時候消失，由頁面決定：

<Playground :meta="NoticeDemos.ToastPlay" :render="NoticeDemos.ToastPlay.render" />
