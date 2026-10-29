---
layout: home
title: Sakulime UI
titleTemplate: false
description: 純 HTML + CSS 最簡單使用的 UI 介面 — sl-* attributes 寫元件，--sl-* tokens 管外觀，零 runtime、零 framework 依賴。

hero:
  name: Sakulime UI
  text: CSS-first design system
  tagline: 寫 HTML 就會用的設計系統
  actions:
    - theme: brand
      text: 開始使用
      link: /introduction
    - theme: alt
      text: GitHub
      link: https://github.com/syntony666/sakulime-ui

features:
  - title: sl-* attributes
    details: 元件、狀態、modifier，組合即介面
    link: /core/button
    linkText: 看元件
  - title: --sl-* tokens
    details: 顏色與尺度的單一來源
    link: /theme
    linkText: 看主題
  - title: 零 runtime
    details: 沒有 framework adapter、沒有 JS 行為層 — 到哪都能跑的設計系統
    link: /introduction
    linkText: 怎麼運作
---

<script setup>
import * as CardStories from "../stories/components/card.stories";
</script>

## 寫下屬性就是元件

`sl-*` 屬性就是整個 API — 不用 import、沒有 runtime，寫了 `sl-card` 就有一張卡片：

<Demo :render="CardStories.Sections.render" :args="{ inset: 'top', corner: true, pad: '-' }" />

```html
<div sl-card>
  <div sl-card-section="inset"><img src="cover.png" alt="" /></div>
  <div sl-card-section>
    <strong>卡片標題</strong>
    <p>內容</p>
  </div>
</div>
```

## 安裝

```bash
npm i sakulime-ui
```

引入一份 CSS、寫 HTML — 就是全部。詳細用法見[介紹](/introduction)。

<div class="sl-home-foot">MIT · v0.2.0 · <a href="https://github.com/syntony666/sakulime-ui">GitHub</a></div>
