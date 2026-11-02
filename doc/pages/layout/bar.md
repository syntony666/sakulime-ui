---
title: Bar 頁面橫條
description: 滿寬的頁面橫條，黏頂或黏底，也能固定在視窗邊，內容往兩端排開。
---

<script setup>
import * as BarDemos from "../../demos/layout/bar.demo";
</script>

# Bar *頁面橫條*

> 頂端或底端的滿寬頁面橫條。值選邊緣，預設捲到邊就黏住，要固定在視窗邊加 `sl-bar-fixed`。內容分左、正中間、右三個固定區域，子層標 `sl-bar--start`／`sl-bar--center`／`sl-bar--end` 落位。

## 用法

```html
<div sl-bar="top">
  <strong sl-bar--start>Logo</strong>
  <div sl-bar--end sl-wrap>
    <a href="#">連結</a>
    <a href="#">連結</a>
  </div>
</div>
```

<Demo :render="BarDemos.BarTop.render" />

`sl-bar` 不給值就是一條一般的橫條，沒有邊緣語意，當區塊分隔用：

<Demo :render="BarDemos.BarBare.render" />

## 邊緣跟定位

`sl-bar="top"` 黏頂、`sl-bar="bottom"` 黏底，預設都是 sticky：內容捲到邊就停住，不佔版面外。`sl-bar="bottom"` 還有個額外好處：父層拉滿視窗高時，頁面再短也會吸在視窗底部（sticky footer）。

要固定在視窗邊加 `sl-bar-fixed`，需配邊緣值：

```html
<div sl-bar="top" sl-bar-fixed>固定在視窗頂</div>
<div sl-bar="bottom" sl-bar-fixed>固定在視窗底，手機底部 tab bar</div>
```

<Demo :render="BarDemos.Positions.render" />

裸 `sl-bar` 不給邊緣值時 `sl-bar-fixed` 沒有意義。

fixed 的 bar 不佔版面，body 會在對應邊自動補上 bar 高度的內距，下面的內容不會被蓋住；包在什麼容器裡都有效，不用是 body 直接子層。補償讀 `--sl-bar-h`，所以 bar 的實際高度要等於它：改 `sl-pad`、換行成兩列、或加了 safe-area inset，都要在 `:root` 同步改 `--sl-bar-h` 才跟得到。列印時 fixed bar 自動回到一般排版。

兩個祖先陷阱：sticky 的祖先不能設 `overflow`（會換成黏祖先）或 `transform`／`filter`／`perspective`（fixed 的參考框會變成那個祖先，bar 黏在卡片裡不黏視窗）。

## 內容排列

內部是三欄 grid：左、正中間、右三個固定區域。子層標 `sl-bar--start`、`sl-bar--center`、`sl-bar--end` 決定落在哪一區；沒標的子層照順序從左欄依序填入。中間欄寬度跟內容走，所以 `--center` 永遠在整條正中央，跟兩側放了什麼無關。只放想放的區域就行，空的欄不影響其他區：

```html
<div sl-bar="top">
  <div sl-bar--start>Logo</div>
  <div sl-bar--center>標題</div>
  <div sl-bar--end sl-wrap>
    <a href="#">連結</a>
    <a href="#">連結</a>
  </div>
</div>
```

<Demo :render="BarDemos.BarSpread.render" />

一區要塞多個東西就包一個 `sl-wrap` 當一個子層——同一區標兩個子層會掉到下一行。要直排多段內容，子層裡包一個 `sl-stack`。

## 尺寸與外觀

- 高度是 `--sl-bar-h`，預設 3.5rem（56px），內容高就撐高
- 上下內距讀 `--sl-bar-pad-block`，沒設就看 `sl-pad` 標示，再沒有就 `sm`（12px）。頁尾那種厚區塊：`sl-bar="bottom" sl-pad="lg"`
- 左右內距讀 `--sl-bar-pad-inline`，預設 `lg`（16px），跟上下內距分開調
- 內部間距預設 `md`。只想改一條就寫 `--sl-bar-gap`；[`sl-gap`](/attrs/gap) 標示在 bar 自己或外層都行
- 底色 `--sl-bg`、邊緣那側細線（頂→下線、底→上線）、z-index 讀 `--sl-bar-z`（預設 50）
- 底部 bar 會自動讓出手機 home indicator 的空間（safe-area inset）

<Demo :render="BarDemos.BarBottom.render" />
