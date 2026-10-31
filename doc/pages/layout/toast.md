---
title: Toast 通知角
description: 裝 sl-notice 的固定角落容器，六個位置可選。
---

# Toast *通知角*

> 裝 `sl-notice` 的固定角落容器。通知本身是 `sl-notice`，`sl-toast` 只負責把它們疊在角落。

## 用法

```html
<div sl-toast>
  <div sl-notice sl-tone="success">已儲存變更</div>
  <div sl-notice>新版本可用</div>
</div>
```

## 屬性

### 位置

值換角落，預設右下：

| 值               | 位置 |
| ---------------- | ---- |
| 預設              | 右下 |
| `start`          | 左下 |
| `bottom-center`  | 中下 |
| `top-start`      | 左上 |
| `top-end`        | 右上 |
| `top-center`     | 中上 |

### 尺寸與間距

- fixed，z-index 60，會蓋在 `sl-topbar` 上面
- 寬度吃 `--sl-toast-w`，預設 22rem（352px）；視窗放不下自動縮，不會凸出
- 離邊距離吃 `--sl-toast-b`／`--sl-toast-e`，預設都是 `lg`（16px）
- 通知之間的間距預設 `md`（12px）。只想改一個就寫 `--sl-toast-gap`；`sl-gap` 寫在容器自己或外層都行。
- 順序跟堆疊由 DOM 決定，多一個 `sl-notice` 就多一張
