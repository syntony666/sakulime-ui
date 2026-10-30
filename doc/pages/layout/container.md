---
title: Container 容器
description: sl-container 把內容限制在固定寬度，並在頁面中置中。
aside: false
outline: false
pageClass: container-wide
---

<script setup>
import * as ContainerDemos from "../../demos/layout/container.demo";
</script>

# Container *容器*

> 把內容限制在一個寬度裡，置中，左右各留 16px。螢幕再寬，內容最多就到上限，一行字才不會太長。

下面是三個真的容器，數值標籤顯示當下實際的寬度，拉視窗寬度會跟著變。夠寬時 `lg` 就是 1200px，變窄就貼邊。

<Demo
  :render="ContainerDemos.ContainerWidths.render"
  :pad="false"
  measure="[sl-container-sm], [sl-container-md], [sl-container-lg]"
/>

## 屬性

- `sl-container-sm`：720px
- `sl-container-md`：960px
- `sl-container-lg`：1200px

要更改數值可以覆寫 `--sl-container-sm/md/lg`。
