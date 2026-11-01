---
title: Sidebar 側邊欄
description: 側邊欄加主欄的版面，位置跟 DOM 順序走，主欄太窄就自己換行。
---

<script setup>
import * as SidebarDemos from "../../demos/layout/sidebar.demo";
</script>

# Sidebar *側邊欄*

> 側邊欄加主欄的版面。容器標 `sl-sidebar`，側邊欄子層標 `sl-sidebar--rail`，其他子層是主欄。主欄被擠到下限以下時整組換行，不用 media query，看的是容器寬度。

## 用法

```html
<div sl-sidebar>
  <aside sl-sidebar--rail>側邊欄</aside>
  <main>主欄</main>
</div>
```

<Demo :render="SidebarDemos.SidebarStart.render" />

## 位置

側邊欄在哪一側跟著 DOM 順序走：寫在主欄前面就在左，寫在後面就在右：

<Demo :render="SidebarDemos.SidebarEnd.render" />

標示兩個 `sl-sidebar--rail` 就左右各一條：

<Demo :render="SidebarDemos.SidebarBoth.render" />

結構是一條 rail 配一個主欄（或左右各一條 rail）。位置就是 DOM 序，要換邊就調整 HTML 順序。

## 尺寸

- 側邊欄寬是 `--sl-sidebar-w`，預設 16rem（256px），可以各別覆寫
- 主欄下限是 `--sl-sidebar-min`，預設 55%：主欄被擠到下限以下時整組換行，側邊欄變滿寬排在上面
- 換行看容器可用寬度，不是視窗斷點，塞進窄容器照樣會掉

## 間距

間距用 [`sl-gap`](/attrs/gap) 給，寫在容器自己或外層都行，預設 `lg`。

只想改一個容器就寫 `--sl-sidebar-gap`；`sl-gap` 標示在容器自己或外層都行，裡面沒給間距的排版元件會繼承這個間距。
