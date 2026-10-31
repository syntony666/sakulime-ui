---
title: Container 頁面容器
description: 把內容限制在一個寬度裡置中。
aside: false
outline: false
pageClass: container-wide
---

<script setup>
import * as ContainerDemos from "../../demos/layout/container.demo";
</script>

# Container *頁面容器*

> 把內容限制在一個寬度裡置中，左右留一點邊距。螢幕再寬，一行字也不會拉到讀不下去。

## 用法

```html
<div sl-container-md>
  ...
</div>
```

寫在任何元素上都生效。這是純容器，不吃 `sl-tone` 那些通用屬性，要底色跟圓角的話配 `sl-card`。

下面是三個真的容器，數值標籤顯示當下實際的寬度，拉視窗寬度會跟著變。夠寬時 `lg` 就是 `75rem`（1200px），變窄就貼邊。

<Demo
  :render="ContainerDemos.ContainerWidths.render"
  :pad="false"
  measure="[sl-container-sm], [sl-container-md], [sl-container-lg]"
/>

巢狀沒有額外效果，塞進窄父層的話裡層只跟父層一樣寬。

## 屬性

### 尺寸

- `sl-container-sm`：45rem（720px）
- `sl-container-md`：60rem（960px）
- `sl-container-lg`：75rem（1200px）

寬度吃 rem，px 是以根字級 16px 換算的參考值。

更改數值的話，覆寫 `--sl-container-sm/md/lg`。

### 內距

左右內距吃 `--sl-lg`（16px）。改單一容器就自己寫 `padding-inline`；覆寫 `--sl-lg` 的話，所有用到它的元素都會跟著變。
