---
title: Footer 頁尾
description: 頁尾區塊，頂端 hairline 加留白，內部左中右三區排列。
---

<script setup>
import * as FooterDemos from "../../demos/layout/footer.demo";
</script>

# Footer *頁尾*

> 頁尾區塊。頂端一條 hairline、上下留白，內部跟頂列同一套左中右三區排列。

## 用法

```html
<footer sl-footer>
  <span>© 2026</span>
  <nav>連結</nav>
  <span sl-end>v0.4.0</span>
</footer>
```

<Demo :render="FooterDemos.Footer.render" />

## 屬性

### 三區排列

跟頂列同一套 `1fr auto 1fr` 網格：子層依序佔左、中、右，標示 `sl-center` 固定中間、`sl-end` 固定尾端，多出的子層會換到新行：

<Demo :render="FooterDemos.FooterZones.render" />

要直排多段內容，子層裡包一個 `sl-stack`。

### 尺寸與間距

- 頂端 hairline
- 上下內距 `2xl`（32px），左右內距 `--sl-lg`（16px）
- 間距預設 `md`（12px）。只想改一個就寫 `--sl-footer-gap`；[`sl-gap`](/attrs/gap) 標示在頁尾自己或外層都行。
