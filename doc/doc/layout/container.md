---
title: Container 容器
description: sl-container 容器 — 內容寬度軸與水平置中，頁面排版的起點。
---

<script setup>
import * as ContainerStories from "../../stories/layout/container.stories";
</script>

# Container *容器*

> 把內容限制在一個寬度裡，置中，左右各留 16px。螢幕再寬，內容最多就到上限，一行字才不會太長。

下面的框代表一個頁面 — 三個真實容器在裡面照常置中、貼邊。容器上限吃 `--sl-container-sm/md/lg`，demo 把數值減半才放得下整頁（想改寬度也是覆寫同三個變數）。

<Demo :render="ContainerStories.ContainerWidths.render" />

## 屬性

- `sl-container-sm`：720px
- `sl-container-md`：960px
- `sl-container-lg`：1200px

要更改數值可以覆寫 `--sl-container-sm/md/lg`。
