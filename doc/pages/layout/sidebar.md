---
title: Sidebar 側邊欄
description: 側邊欄加主欄的版面，位置用標記決定，主欄太窄就自己換行。
---

<script setup>
import * as SidebarDemos from "../../demos/layout/sidebar.demo";
</script>

# Sidebar *側邊欄*

> 側邊欄加主欄的版面。側邊欄標示 `sl-sidebar`，其他子層是主欄。主欄被擠到下限以下時整組換行，不用 media query，看的是容器寬度。

## 用法

```html
<div sl-with-sidebar>
  <aside sl-sidebar>側邊欄</aside>
  <main>主欄</main>
</div>
```

<Demo :render="SidebarDemos.SidebarStart.render" />

## 位置

未標示的側邊欄看 HTML 順序：上面那個是放前面在左；放後面就在右：

<Demo :render="SidebarDemos.SidebarEnd.render" />

標示 `sl-place="start"` 固定排最前、`sl-place="end"` 固定排最後，跟 DOM 順序無關。下面這個側邊欄寫在主欄前面，照樣排到右邊：

<Demo :render="SidebarDemos.SidebarMark.render" />

標示兩個 `sl-sidebar` 就左右各一條：

<Demo :render="SidebarDemos.SidebarBoth.render" />

## 尺寸

- 側邊欄寬是 `--sl-sidebar-w`，預設 16rem（256px），可以各別覆寫
- 主欄下限是 `--sl-sidebar-min`，預設 55%：主欄被擠到下限以下時整組換行，側邊欄變滿寬排在上面
- 換行看容器可用寬度，不是視窗斷點，塞進窄容器照樣會掉

## 間距

px 以根字級 16px 換算，尺規本身是 rem。

`sl-with-sidebar` 的選項就是間距，預設 `lg`（16px）：

| 選項  | 間距         |
| ----- | ------------ |
| `xs`  | 4px          |
| `sm`  | 8px          |
| `md`  | 12px         |
| `lg`  | 16px（預設） |
| `xl`  | 20px         |
| `2xl` | 24px         |
| `3xl` | 32px         |
| `4xl` | 40px         |
| `5xl` | 48px         |

只想改一個容器就寫 `--sl-sidebar-gap`；[`sl-gap`](/attrs/gap) 標示在容器自己或外層都行，裡面沒給間距的排版屬性會繼承這個間距。
