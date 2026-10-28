<script setup>
import * as ContainerStories from "../src/layout/container.stories";
</script>

# Container *容器*

> 把內容限制在一個寬度裡，置中，左右各留 16px。螢幕再寬，內容最多就到上限，一行字才不會太長。

下面是三個真的容器，放在 1200px 寬的頁面裡。`lg` 貼滿兩邊，其他兩個照上限置中。看不完可以左右捲動。

<Demo :render="ContainerStories.ContainerWidths.render" />

## 屬性

- `sl-container-sm`：720px
- `sl-container-md`：960px
- `sl-container-lg`：1200px

要更改數值可以覆寫 `--sl-container-sm/md/lg`。
