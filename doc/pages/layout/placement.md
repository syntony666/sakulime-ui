---
title: Placement 對齊
description: 子層標 sl-place 決定位置，水平值 start、center、end，垂直值 top、middle、bottom，block、flex、grid 子層都通。
---

<script setup>
import * as PlacementDemos from "../../demos/layout/placement.demo";
</script>

# Placement *對齊*

> 對齊屬性。`sl-place` 標在子層上，決定它靠哪一側、置中、還是推到對面，水平垂直各一組值。

## 用法

```html
<div sl-stack sl-flow>
  <div sl-card sl-place="center" style="width: 18rem">置中的卡片</div>
</div>
```

機制是 auto margin：值把某一側的 margin 設成 `auto`，那一側的多餘空間被吸走，元素就被推向對面。所以標記不綁特定父層，block、flex、grid 的子層都適用，元素比容器窄就有效。

| 值 | 效果 |
|---|---|
| `sl-place="start"` | 靠行首，右邊空間被吸走 |
| `sl-place="center"` | 水平置中，左右空間平分 |
| `sl-place="end"` | 推到行尾，左邊空間被吸走 |
| `sl-place="top"` | 靠上緣，下面空間被吸走 |
| `sl-place="middle"` | 垂直置中，上下空間平分 |
| `sl-place="bottom"` | 推到底，上面空間被吸走 |

水平值跟垂直值可以疊著寫，`sl-place="middle end"` 就是右中：

<Demo :render="PlacementDemos.FlowCenter.render" />

兩格各給一組值，換父層看同一組標記的表現：

<Playground :meta="PlacementDemos.PlacePlay" :render="PlacementDemos.PlacePlay.render" />

## 排版父層裡

同一組值在各種排版原語裡的表現：

- `sl-stack sl-flow` 或裸 block 子層：直接生效，元素要比容器窄才有空間可推
- `sl-row` 子層：`end` 推到行尾；`center` 讓整列切成三區（跟 `sl-bar` 同機制），標記的子層定在列中線；row 預設垂直置中，`middle` 標了不變，要靠上靠下用 `top`/`bottom`
- `sl-stack` 子層：水平值變成左右對齊，標了之後寬度縮回內容寬，不用自己寫寬度；`middle` 一組管垂直，stack 要有高度才有空間可吸
- `sl-grid` 子層：格子維持軌道寬，元素在自己的格子裡對齊，兩軸的值都通
- `sl-bar` 的三區、`sl-with-sidebar` 的順序語意各自有定義，見各頁

<Demo :render="PlacementDemos.RowEnd.render" />

<Demo :render="PlacementDemos.StackMarks.render" />

`sl-place="middle"` 把子層定在垂直正中間，上下的空間平分，前後的子層被推到兩端：

<Demo :render="PlacementDemos.StackMiddleEnd.render" />

標了 `sl-place="center"` 的 row 會切成三區：中間格定在列中線（真中間，不被 `end` 分走空間）、`end` 格進右區，沒標的子層依序填進左區：

<Demo :render="PlacementDemos.RowCenterEnd.render" />

`sl-row` 的子層預設垂直置中，所以列內能動的只有 `top`/`bottom`，`sl-place="end"` 推到右邊、垂直方向留在置中位：

<Demo :render="PlacementDemos.RowMarks.render" />

<Demo :render="PlacementDemos.GridCell.render" />
