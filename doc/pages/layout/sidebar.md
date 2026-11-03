---
title: Sidebar 側邊欄
description: 側邊欄與主欄並排的版面，位置依先後順序決定，空間不足時自動換行。
---

<script setup>
import * as SidebarDemos from "../../demos/layout/sidebar.demo";
</script>

# Sidebar *側邊欄*

> 側邊欄與主欄並排的版面，空間不足時整組換行。

## 用法

```html
<div sl-sidebar>
  <aside sl-sidebar--rail>側邊欄</aside>
  <main>主欄</main>
</div>
```

<Demo :render="SidebarDemos.SidebarStart.render" />

底層與 [`sl-wrap`](/layout/wrap) 相同，為啟用 `flex-wrap` 的 flexbox。

主欄設有最小寬度（`--sl-sidebar-min`，預設 55%），容器寬度不足時整組換至下一行。

## 位置

側邊欄的位置依先後順序決定，寫在主欄之前則在左，之後則在右：

<Demo :render="SidebarDemos.SidebarEnd.render" />

標示兩個 `sl-sidebar--rail` 時，左右各一條：

<Demo :render="SidebarDemos.SidebarBoth.render" />

結構為一條 rail 搭配一個主欄，或左右各一條 rail。位置即先後順序，換邊時調整 HTML 順序即可。

## 尺寸

- 側邊欄寬度為 `--sl-sidebar-w`，預設 16rem（256px），可個別覆寫
- 主欄下限為 `--sl-sidebar-min`，預設 55%
- 主欄窄於下限時整組換行；rail 寫在主欄之前者換行後排於上方，之後者排於下方
- 換行判斷依據為容器可用寬度，並非視窗斷點；置於窄容器時同樣會換行

三組寬度的比較：

<Demo :render="SidebarDemos.Widths.render" />

## 間距

間距由 [`sl-gap`](/attrs/gap) 給定，寫在容器自身或外層皆可，預設 `lg`。

僅調整單一容器時，改寫 `--sl-sidebar-gap`。

各間距的效果：

<Demo :render="SidebarDemos.Gaps.render" />
