---
title: Placement 對齊
description: 子層標 sl-start、sl-center、sl-end 決定水平位置，sl-top、sl-middle、sl-bottom 決定垂直位置，block、flex、grid 子層都通。
---

<script setup>
import * as PlacementDemos from "../../demos/layout/placement.demo";
</script>

# Placement *對齊*

> 對齊標記。標在子層上，決定它靠哪一側、置中、還是推到對面，水平垂直各一組。

## 用法

```html
<div sl-stack sl-flow>
  <div sl-card sl-center style="width: 18rem">置中的卡片</div>
</div>
```

機制是 auto margin：標記把某一側的 margin 設成 `auto`，那一側的多餘空間被吸走，元素就被推向對面。所以標記不綁特定父層，block、flex、grid 的子層都適用，元素比容器窄就有效。

| 標記 | 效果 |
|---|---|
| `sl-start` | 靠行首，右邊空間被吸走 |
| `sl-center` | 水平置中，左右空間平分 |
| `sl-end` | 推到行尾，左邊空間被吸走 |
| `sl-top` | 靠上緣，下面空間被吸走 |
| `sl-middle` | 垂直置中，上下空間平分 |
| `sl-bottom` | 推到底，上面空間被吸走 |

<Demo :render="PlacementDemos.FlowCenter.render" />

## 排版父層裡

同一組標記在各種排版原語裡的表現：

- `sl-stack sl-flow` 或裸 block 子層：直接生效，元素要比容器窄才有空間可推
- `sl-row` 子層：`sl-end` 推到行尾、`sl-center` 在左右子層之間置中
- `sl-stack` 子層：水平標記變成左右對齊，標了之後寬度縮回內容寬，不用自己寫寬度；`sl-middle` 一組管垂直，stack 要有高度才有空間可吸
- `sl-grid` 子層：格子維持軌道寬，元素在自己的格子裡對齊，兩軸的標記都通
- `sl-bar` 的三區、`sl-with-sidebar` 的順序語意各自有定義，見各頁

<Demo :render="PlacementDemos.RowEnd.render" />

<Demo :render="PlacementDemos.StackMarks.render" />

`sl-middle` 把子層定在垂直正中間，上下的空間平分，前後的子層被推到兩端：

<Demo :render="PlacementDemos.StackMiddleEnd.render" />

在 `sl-row` 同一列裡兩軸標記可以疊著用，`sl-middle` 管列內高度、`sl-end` 管左右位置：

<Demo :render="PlacementDemos.RowMiddleEnd.render" />

<Demo :render="PlacementDemos.GridCell.render" />
