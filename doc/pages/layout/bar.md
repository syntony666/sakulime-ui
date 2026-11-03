---
title: Bar 頁面橫條
description: 滿寬的頁面橫條，可黏於頂端或底端，也可固定在視窗邊。
---

<script setup>
import * as BarDemos from "../../demos/layout/bar.demo";
</script>

# Bar *頁面橫條*

> 頂端或底端的滿寬頁面橫條，可隨捲動黏在邊緣，或固定在視窗邊。

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

未標示值時為一般橫條，不帶邊緣行為，可作為區塊分隔：

<Demo :render="BarDemos.BarBare.render" />

## 邊緣跟定位

`sl-bar="top"` 黏於頂端、`sl-bar="bottom"` 黏於底端，預設皆為 sticky。內容捲至邊緣即停住，不額外佔用版面。`top` 與 `bottom` 依區塊軸判斷，直排書寫（`writing-mode: vertical-*`）時黏的是區塊邊，並非視覺上的上下。

`sl-bar="bottom"` 另有作用。外層與視窗同高時，頁面內容再短也會黏在視窗底部（sticky footer）。

固定在視窗邊時，加上 `sl-bar-fixed`，並須搭配邊緣值：

```html
<div sl-bar="top" sl-bar-fixed>固定在視窗頂</div>
<div sl-bar="bottom" sl-bar-fixed>固定在視窗底，手機底部 tab bar</div>
```

<Demo :render="BarDemos.Positions.render" />

未帶邊緣值時，`sl-bar-fixed` 不具作用。

fixed 的 bar 不佔用版面，body 會在對應邊自動補上等高的內距，下方內容不會被遮住。放在任何容器內皆有效，不須為 body 的直接子層。

補償值讀取 `--sl-bar-h`，因此 bar 的實際高度須與之一致。調整 [`sl-pad`](/attrs/pad)、換行成兩列或加入 safe-area inset 後，皆須在 `:root` 同步修改 `--sl-bar-h`。列印時，fixed bar 自動回到一般排版。

sticky 的外層不可設定 `overflow`，否則改為黏在外層。也不可設定 `transform`、`filter` 或 `perspective`，否則 fixed 的參考框會變成該外層，bar 黏在容器內而非視窗。

## 內容排列

內部劃分為起點、中央、終點三區。子層標上 `sl-bar--start`、`sl-bar--center`、`sl-bar--end` 決定落點（`start` 為開始側、`end` 為結束側，中文書寫即左、右）；未標示的子層依序填入起點區。

中央區寬度依內容而定，因此 `--center` 恆在整條橫條的正中央，與兩側內容無關。可只使用需要的區，空區不影響其他區：

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

同一區要放多個元素時，以一個 [`sl-wrap`](/layout/wrap) 包成單一子層；同一區標兩個子層會換到下一行。要直排多段內容，於子層內包一個 [`sl-stack`](/layout/stack)。

## 尺寸與外觀

- 高度為 `--sl-bar-h`，預設 3.5rem（56px），內容較高時隨之增加
- 上下內距讀取 `--sl-bar-pad-block`；未設定時依 `sl-pad` 標示，皆未設定則為 `sm`（12px）。頁尾等較厚的區塊可寫 `sl-bar="bottom" sl-pad="lg"`
- 左右內距讀取 `--sl-bar-pad-inline`，預設 `lg`（16px），與上下內距分開調整
- 底色為 `--sl-bg`；邊緣側另有細線（`top` 於下緣、`bottom` 於上緣）；z-index 讀取 `--sl-bar-z`（預設 50）
- 底部 bar 自動讓出手機 home indicator 的空間（safe-area inset）

<Demo :render="BarDemos.BarBottom.render" />

## 間距

內部間距由 [`sl-gap`](/attrs/gap) 給定，預設 `md`，寫在 bar 自身或外層皆可。

僅調整單一 bar 時，改寫 `--sl-bar-gap`。
