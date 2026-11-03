---
title: Container 頁面容器
description: 限制內容寬度並置中的版面容器。
aside: false
outline: false
pageClass: container-wide
---

<script setup>
import * as ContainerDemos from "../../demos/layout/container.demo";
</script>

# Container *頁面容器*

> 限制內容寬度並置中，兩側保留邊距。

## 用法

```html
<div sl-container="md">
  ...
</div>
```

標示於任何元素皆生效。此為純容器，只讀取內距，不套用色調與圓角；需要底色與圓角時搭配 [`sl-card`](/core/card)。

下方為實際容器，數字標籤顯示當下寬度，調整視窗寬度時隨之變化。視窗夠寬時 `lg` 為 75rem（1200px），變窄時貼齊邊緣。

<Demo
  :render="ContainerDemos.ContainerWidths.render"
  :pad="false"
  measure="[sl-container]"
/>

巢狀時寬度上限仍然有效；置於較窄的外層時，內層寬度與外層相同。各層會各自疊加左右內距，內容因此比預期更窄。

## 尺寸

- `sl-container="sm"`：45rem（720px）
- `sl-container="md"`：60rem（960px），未標示時的預設
- `sl-container="lg"`：75rem（1200px）

寬度以 rem 為單位，px 為以根字級 16px 換算的參考值。

調整寬度時，覆寫 `--sl-container-sm`／`--sl-container-md`／`--sl-container-lg`。

外層窄於寬度上限時，容器貼齊外層：

<Demo :render="ContainerDemos.Widths.render" />

## 內距

左右內距讀取 [`sl-pad`](/attrs/pad) 標示（`none`、`sm`、`md`、`lg`），預設與 `md` 相同（16px）。

僅調整單一容器時，覆寫 `--sl-container-pad`，或自行指定 `padding-inline`。

覆寫 `--sl-lg` 時，所有引用該變數的元素皆隨之改變。

各內距的效果：

<Demo :render="ContainerDemos.Pads.render" />
