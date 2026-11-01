---
title: Bar 頁緣區塊
description: 滿寬的頁緣區塊，黏頂或黏底，也能固定在視窗邊，內部左中右三區排列。
---

<script setup>
import * as BarDemos from "../../demos/layout/bar.demo";
</script>

# Bar *頁緣區塊*

> 頂端或底端的滿寬頁緣區塊。值選邊緣，預設捲到邊就黏住，要固定在視窗邊加 `sl-fixed`。內部左中右三區，放什麼都可以。

## 用法

```html
<div sl-bar="top">
  <strong>Logo</strong>
  <a href="#">連結</a>
</div>
```

<Demo :render="BarDemos.BarTop.render" />

`sl-bar` 不給值就是一條普通文流區塊，沒有邊緣語意，當區塊分隔帶用。

## 邊緣跟定位

`sl-bar="top"` 黏頂、`sl-bar="bottom"` 黏底，預設都是 sticky：內容捲到邊就停住，不佔版面外。`sl-bar="bottom"` 還有個紅利：頁面比視窗短時會吸在視窗底部（sticky footer）；父層要拉滿視窗高才黏得住。

要固定在視窗邊加 `sl-fixed`；有邊緣值但要退回文流標 `sl-static`：

```html
<div sl-bar="top" sl-fixed>固定在視窗頂</div>
<div sl-bar="bottom" sl-fixed>固定在視窗底，手機底部 tab bar</div>
<div sl-bar="top" sl-static>有上緣髮線但不黏</div>
```

`sl-fixed` 跟 `sl-static` 互斥，同標時 static 贏（bar 留在文流，body 也不補償）。裸 `sl-bar` 不給邊緣值時 `sl-fixed` 沒有意義。

fixed 的 bar 脫離文流，body 會在對應邊自動補上 bar 高度的內距，下面的內容不會被蓋住；包在什麼容器裡都有效，不用是 body 直接子層。補償讀 `--sl-bar-h`，所以 bar 的實際高度要等於它：改 `sl-pad`、換行成兩列、或加了 safe-area inset，都要在 `:root` 同步改 `--sl-bar-h` 才跟得到。

兩個祖先陷阱：sticky 的祖先不能設 `overflow`（會換成黏祖先）或 `transform`／`filter`／`perspective`（fixed 的參考框會變成那個祖先，bar 黏在卡片裡不黏視窗）。

## 三區排列

內部是 `1fr auto 1fr` 的網格：子層依序佔左、中、右三區，置中是整條 bar 的中點，不是剩餘空間的中點。標示 `sl-place="center"` 固定在中間、`sl-place="end"` 固定在尾端。兩個子層時第二個預設落在中間，推到右邊標示 `sl-place="end"`。三區對應至多三個子層，第四個起會換到第二列，左邊要放多個東西就包一個 `sl-row` 當一個子層：

```html
<div sl-bar="top">
  <div>Logo</div>
  <div sl-place="center">中間</div>
  <div sl-place="end">右邊</div>
</div>
```

<Demo :render="BarDemos.BarZones.render" />

同樣的標記在任何排版父層都通用，見[對齊](/layout/placement)。要直排多段內容，子層裡包一個 `sl-stack`。

## 尺寸與外觀

- 高度是 `--sl-bar-h`，預設 3.5rem（56px），內容高就撐高
- 上下內距讀 `--sl-bar-pad`，沒設就看 `sl-pad` 標示，再沒有就 `md`（12px）。頁尾那種厚區塊：`sl-bar="bottom" sl-pad="lg"`
- 左右內距讀 `--sl-bar-pad-inline`，預設 `lg`（16px），跟上下內距分開調
- 內部間距預設 `md`（12px）。只想改一條就寫 `--sl-bar-gap`；[`sl-gap`](/attrs/gap) 標示在 bar 自己或外層都行
- 底色 `--sl-bg`、邊緣那側 hairline（頂→下線、底→上線）、z-index 讀 `--sl-bar-z`（預設 50）
- 底部 bar 會自動讓出手機 home indicator 的空間（safe-area inset）

<Demo :render="BarDemos.BarBottom.render" />
