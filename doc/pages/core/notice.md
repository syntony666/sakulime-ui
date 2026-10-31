---
title: Notice 通知
description: 通知膠囊——文件流裡是頁面橫幅，包進 fixed 容器就是角落浮動通知。
---

<script setup>
import * as NoticeDemos from "../../demos/components/notice.demo";
</script>

# Notice *通知*

通知膠囊——「部署失敗」「系統維護中」「已儲存變更」。`sl-tone` 決定底色、框線、墨色；關閉與自動消失的行為留給消費端，這裡只管長相。

放進文件流是頁面頂端的滿寬橫幅；包進你自己的 fixed 容器就是浮在角落的浮動通知——同一個元件，位置你決定。

<Playground :meta="NoticeDemos.default" :render="NoticeDemos.Notice.render" />

## 型態

寬度直接寫在 `sl-notice` 的值裡，不寫值就是全寬（填滿容器）：

- `fit`：縮成內容寬——浮動通知或要跟著訊息長度走的場合

<Demo :render="NoticeDemos.Widths.render" />

## 屬性

以下屬性都寫在 `<div sl-notice>` 本體上。

### 顏色 `sl-tone`

`sl-notice` 在 `sl-tone` 的消費名單裡。不寫是 primary 淡底——資訊通知的本分。

- `primary`：資訊通知（預設）
- `secondary`：次要提示
- `success`：上線成功、恢復正常、儲存完成
- `warning`：維護預告、即將變更
- `danger`：部署失敗、服務異常

<Demo :render="NoticeDemos.Tones.render" />

### 圓角 `sl-radius`

`sl-notice` 在 `sl-radius` 的消費名單裡，預設 `full`——膠囊端。這裡的 `full` 是「一行膠囊」：半徑封頂在一個行高，所以一、二行照樣全圓，三行起圓弧只爬一行、中段變直線，不會變成拉長的半圓：

- `sm`：微圓
- `md`：一般圓角
- `lg`：很圓
- `full`：單行膠囊（預設）
- `none`：直角

<Demo :render="NoticeDemos.Radius.render" />

### 厚度 `sl-pad`

預設薄條。`sm`／`md`／`lg` 調整上下厚度，`lg` 拿來放公告型的多行內容：

<Demo :render="NoticeDemos.Pads.render" />

## 修飾詞

### 對齊 `sl-notice-align`

中間內容的位置，`fit` 下沒有空間可推所以無感：

- 不寫值：靠左（預設）
- `end`：靠右；折行時每一行都靠右

<Demo :render="NoticeDemos.Aligns.render" />

## 子元素

### 動作 `sl-notice-action`

要放邊緣的控制項就標 `sl-notice-action`——`fit` 的時候靠內容尾端。dismiss 鈕或動作連結都放這，關閉行為自己接：

- 不寫值：靠右（尾端）——內側固定留一段距離，文字再長也不會貼上去
- `start`：靠左（開頭）——站在 icon 的位置，像 leading icon 一樣貼著內容

折行時它停在所寫位置的那一行——寫在最後是動作列式的尾端，寫在最前就釘第一行。action 裡的 icon 跟著按鈕字級走（`sl-size="sm"` 約 12px），要大一點就給 `<i>` 掛 `sl-icon-size`。

<Playground :meta="NoticeDemos.ActionMeta" :render="NoticeDemos.ActionPlay.render" />

兩個可以一起放——下面第三條就是左右各一個：

```html
<div sl-notice sl-tone="danger">
  <i sl-icon="lucide:octagon-alert"></i>
  部署失敗：Build #423 在 migrate 階段逾時。
  <a href="#">查看記錄</a>
  <button sl-button="ghost" sl-size="sm" sl-notice-action aria-label="關閉">
    <i sl-icon="lucide:x"></i>
  </button>
</div>
```

<Demo :render="NoticeDemos.WithAction.render" />

## 用法

`sl-notice` 不分橫幅版或浮動通知版——同一條放進文件流是橫幅，包進你自己的容器就是浮動通知。

### Banner *橫幅*

放進文件流就是滿寬橫幅——`<i sl-icon>` 開頭、訊息跟連結照順序排，連結會跟著通知墨色走：

<Playground :meta="NoticeDemos.BannerMeta" :render="NoticeDemos.BannerPlay.render" />

內容切「多行」看折行——膠囊跟著長高、`full` 圓角封頂後中段變直，`end` 對齊下每一行都靠右。icon 直接寫進內容就是行內圖示，折行滿寬流下去，不用特別包裝。

### Toast *浮動通知*

幾條塞進你自己的容器（`fixed`、grid、什麼都好）就是浮動通知——放哪個角落、怎麼疊、何時消失都是你的 CSS 跟狀態機，本包只管膠囊的長相：

<Playground :meta="NoticeDemos.ToastMeta" :render="NoticeDemos.ToastPlay.render" />
