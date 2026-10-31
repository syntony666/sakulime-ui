---
title: Bar 邊列
description: 滿寬的邊緣橫帶，黏頂或黏底，也能固定在視窗邊，內部左中右三區排列。
---

<script setup>
import * as BarDemos from "../../demos/layout/bar.demo";
</script>

# Bar *邊列*

> 頁面頂端或底端的滿寬橫帶。值選邊緣，預設捲到邊就黏住，要固定在視窗邊加 `sl-fixed`。內部左中右三區，放什麼都可以。

## 用法

```html
<div sl-bar="top">
  <strong>Logo</strong>
  <a href="#">連結</a>
</div>
```

<Demo :render="BarDemos.BarTop.render" />

`sl-bar` 不給值就是一條普通文流橫帶，沒有邊緣語意，當區塊分隔帶用。

## 邊緣跟定位

`sl-bar="top"` 黏頂、`sl-bar="bottom"` 黏底，預設都是 sticky：內容捲到邊就停住，不佔版面外。`sl-bar="bottom"` 還有個紅利：頁面比視窗短時會吸在視窗底部（sticky footer）；父層要拉滿視窗高才黏得住。

要固定在視窗邊加 `sl-fixed`；有邊緣值但要退回文流標 `sl-static`：

```html
<div sl-bar="top" sl-fixed>固定在視窗頂</div>
<div sl-bar="bottom" sl-fixed>固定在視窗底，手機底部 tab bar</div>
<div sl-bar="top" sl-static>有上緣髮線但不黏</div>
```

fixed 的 bar 脫離文流，body 會在對應邊自動補上 bar 高度的內距，下面的內容不會被蓋住；這個補償讀 `--sl-bar-h`，改高度要寫在 `:root` 才跟得到。

## 三區排列

內部是 `1fr auto 1fr` 的網格：子層依序佔左、中、右三區，置中是整條 bar 的中點，不是剩餘空間的中點。標示 `sl-center` 固定在中間、`sl-end` 固定在尾端。兩個子層時第二個預設落在中間，推到右邊標示 `sl-end`：

```html
<div sl-bar="top">
  <div>Logo</div>
  <div sl-center>中間</div>
  <div sl-end>右邊</div>
</div>
```

<Demo :render="BarDemos.BarZones.render" />

同樣的標記在任何排版父層都通用，見[對齊](/layout/placement)。要直排多段內容，子層裡包一個 `sl-stack`。

## 尺寸與外觀

- 高度是 `--sl-bar-h`，預設 3.5rem（56px），內容高就撐高
- 上下內距讀 `--sl-bar-pad`，沒設就看 `sl-pad` 標示，再沒有就 `md`（12px）。頁尾那種厚橫帶：`sl-bar="bottom" sl-pad="lg"`
- 內部間距預設 `md`（12px）。只想改一條就寫 `--sl-bar-gap`；[`sl-gap`](/attrs/gap) 標示在 bar 自己或外層都行
- 底色 `--sl-bg`、邊緣那側 hairline（頂→下線、底→上線）、左右內距 `--sl-lg`（16px）、z-index 50

<Demo :render="BarDemos.BarBottom.render" />
