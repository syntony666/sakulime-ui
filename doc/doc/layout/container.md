---
title: Container 容器
description: sl-container 把內容限制在固定寬度，並在頁面中置中。
---

<script setup>
import * as ContainerStories from "../../stories/layout/container.stories";
</script>

# Container *容器*

> 把內容限制在一個寬度裡，置中，左右各留 16px。螢幕再寬，內容最多就到上限，一行字才不會太長。

下面三個容器放在一個縮小的頁面框裡，`lg` 貼滿兩邊，`sm` 和 `md` 照上限置中。想改寬度就覆寫 `--sl-container-sm/md/lg`。

<Demo :render="ContainerStories.ContainerWidths.render" />

## 屬性

- `sl-container-sm`：720px
- `sl-container-md`：960px
- `sl-container-lg`：1200px

要更改數值可以覆寫 `--sl-container-sm/md/lg`。
