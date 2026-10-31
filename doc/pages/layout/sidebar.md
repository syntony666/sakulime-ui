---
title: Sidebar 側欄
description: 側欄加主欄的版面，位置用標記決定，主欄太窄就自己換行。
---

<script setup>
import * as SidebarDemos from "../../demos/layout/sidebar.demo";
</script>

# Sidebar *側欄*

> 側欄加主欄的版面。側欄標 `sl-sidebar`，其他子層是主欄。主欄被擠到下限以下時整組換行，不用 media query，看的是容器寬度。

## 用法

```html
<div sl-with-sidebar>
  <aside sl-sidebar>側欄</aside>
  <main>主欄</main>
</div>
```

<Demo :render="SidebarDemos.SidebarStart.render" />

## 屬性

### 位置

沒標記的側欄看 HTML 順序：上面那個是放前面在左；放後面就在右：

<Demo :render="SidebarDemos.SidebarEnd.render" />

標 `sl-start` 固定排最前、`sl-end` 固定排最後，跟 DOM 順序無關。下面這個側欄寫在主欄前面，照樣排到右邊：

<Demo :render="SidebarDemos.SidebarMark.render" />

標兩個 `sl-sidebar` 就左右各一條：

<Demo :render="SidebarDemos.SidebarBoth.render" />

### 尺寸

- 側欄寬吃 `--sl-sidebar-w`，預設 16rem（256px），可以各別覆寫
- 主欄下限吃 `--sl-sidebar-min`，預設 55%：主欄被擠到下限以下時整組換行，側欄變滿寬排在上面
- 換行看容器可用寬度，不是視窗斷點，塞進窄容器照樣會掉

### 間距

`sl-with-sidebar` 的值就是間距，預設 `lg`（16px），`xs`–`5xl` 全階。只想改一個容器就寫 `--sl-sidebar-gap`；[`sl-gap`](/layout/gap) 寫在容器自己或外層都行，裡面沒寫值的 `sl-stack`、`sl-row`、`sl-grid` 都會吃到。
