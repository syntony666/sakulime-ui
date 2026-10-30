---
title: Container 容器
description: sl-container 把內容限制在固定寬度，並在頁面中置中。
aside: false
pageClass: container-wide
---

<script setup>
import * as ContainerDemos from "../../demos/layout/container.demo";
</script>

# Container *容器*

> 把內容限制在一個寬度裡，置中，左右各留 16px。螢幕再寬，內容最多就到上限，一行字才不會太長。

下面三個容器用實際寬度顯示，`lg` 貼滿畫面，`sm` 和 `md` 照上限置中。想改寬度就覆寫 `--sl-container-sm/md/lg`。

<Demo :render="ContainerDemos.ContainerWidths.render" />

## 屬性

- `sl-container-sm`：720px
- `sl-container-md`：960px
- `sl-container-lg`：1200px

要更改數值可以覆寫 `--sl-container-sm/md/lg`。
