---
title: 頁面區塊
description: 頂列、側欄、頁尾、通知角，頁面外框的四個區塊屬性。
---

<script setup>
import * as ShellDemos from "../../demos/layout/shell.demo";
</script>

# 頁面區塊

> 頁面外框的四個區塊：頂列、側欄、頁尾、通知角。標個屬性就定位，內容放什麼都可以。

## 頂列 `sl-topbar`

```html
<div sl-topbar>
  <strong>Logo</strong>
  <a href="#">連結</a>
</div>
```

- 預設 **sticky**：內容滾到頂就停住，不佔版面外
- `sl-topbar="fixed"`：固定在視窗頂部。後面的內容會被蓋住，要自己補 `padding-block-start: var(--sl-topbar-h)`
- 高 `--sl-topbar-h`（預設 3.5rem = 56px），間距 `--sl-topbar-gap`（預設 `md`），或寫通用 `sl-gap`
- 底色 `--sl-bg`＋底部 hairline，z-index 50

<Demo :render="ShellDemos.Topbar.render" />

### 三區排列

內部是 `1fr auto 1fr` 的格網：子層依序佔左、中、右三區，置中是整條 bar 的中點，不是剩餘空間的中點。標 `sl-center` 釘中間、`sl-end` 釘尾端——兩個子層時第二個預設落在中間，要推到右邊就標 `sl-end`：

```html
<div sl-topbar>
  <div>Logo</div>
  <div sl-center>中間</div>
  <div sl-end>右邊</div>
</div>
```

<Demo :render="ShellDemos.TopbarZones.render" />

## 側欄 `sl-with-sidebar`

```html
<div sl-with-sidebar>
  <aside sl-sidebar>側欄</aside>
  <main>主欄</main>
</div>
```

側欄位置看 HTML 順序：`sl-sidebar` 標的那個放前面在左、放後面在右。標兩個就左右各一條：

<Demo :render="ShellDemos.SidebarStart.render" />
<Demo :render="ShellDemos.SidebarBoth.render" />

- 側欄寬 `--sl-sidebar-w`（預設 16rem = 256px）
- 主欄下限 `--sl-sidebar-min`（預設 55%）：主欄被擠到下限以下時整組換行，側欄變滿寬排在上面。不用 media query，看的是容器寬度
- 值是間距，`sl-with-sidebar` 裸寫 `lg`（16px），`xs`–`5xl` 全階；或寫 `--sl-sidebar-gap`，或寫通用的 `sl-gap`，屬性值優先

## 頁尾 `sl-footer`

```html
<footer sl-footer>
  ...
</footer>
```

頂端 hairline＋上下內距 `2xl`（32px）＋左右內距 `--sl-lg`（16px）。跟頂列同一套三區格網，間距吃 `--sl-footer-gap` 或 `sl-gap`，子元素一樣吃 `sl-center`／`sl-end`，多出的子層會換到新行。要直排多段內容就包一個 `sl-stack`：

<Demo :render="ShellDemos.Footer.render" />

## 通知角 `sl-toast`

```html
<div sl-toast>
  <div sl-notice sl-tone="success">已儲存變更</div>
  <div sl-notice>新版本可用</div>
</div>
```

通知本身就是 `sl-notice`，`sl-toast` 只是裝它的固定容器：

- 預設右下角，fixed，z-index 60
- 值換角落，`"start"` 左下、`"bottom-center"` 中下、`"top-start"` 左上、`"top-end"` 右上、`"top-center"` 中上
- 寬 `--sl-toast-w`（預設 22rem = 352px），視窗放不下自動縮不凸出
- 離邊距離 `--sl-toast-b`／`--sl-toast-e`（預設都是 `lg`），通知之間的間距 `--sl-toast-gap`（預設 `md`）
- 順序跟堆疊由你的 DOM 決定，多寫一個 `sl-notice` 就多一張
