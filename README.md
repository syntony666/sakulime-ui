# sakulime-ui

只用 CSS 的設計系統，不綁框架。React、Vue、Svelte 能用，純 HTML 也能用。

只有兩種東西：`sl-*` 屬性加在標籤上，`--sl-*` 變數管顏色跟尺寸。`class` 全部留給你。

## 使用

```ts
import "sakulime-ui/sakulime.min.css";
```

tokens、兩套主題、元件、排版都在這一個檔案。換主題：`<html data-theme="terra">`，不用重新載入。

```html
<button sl-button>儲存</button>
<button sl-button sl-tone="danger">刪除</button>
<button sl-button sl-variant="invert">取消</button>
```

## 只要一部分

| 要什麼 | 載什麼 |
|---|---|
| 元件（含顏色） | `@sakulime-ui/core/index.min.css` |
| 排版 | `@sakulime-ui/layout/index.min.css` |
| 只有色票 | `@sakulime-ui/theme/sakulime.min.css` |

## 開發

```bash
npm run storybook    # Storybook — 元件文件/視覺驗收（docs/）
npm run build        # tsc 型檢 + core lib build + 各包 min.css + 合成 dist/
npm run site         # Storybook 靜態站 → docs/site/
npm run lint
```

## 結構（npm workspaces monorepo）

`packages/` 是內部工作區。對外四個入口：`sakulime-ui`（全包）、`@sakulime-ui/core`、`@sakulime-ui/layout`、`@sakulime-ui/theme`。

| 位置 | 內容 |
|---|---|
| `packages/shared/token` | `--sl-*` 變數，建置時包進各 entry |
| `packages/shared/theme` | 主題色票，minify 成 `dist/<名稱>.min.css` |
| `packages/core` | 元件 entry：tokens + 主題 + 元件 → `index.min.css` / `index.min.js` |
| `packages/layout` | 排版 entry：tokens + 排版 → `index.min.css` |
| `dist/sakulime.min.css` | 全包：core bundle + layout |
| `docs/` | Storybook 文件站 |

各包內部：

- `src/css/*.css` — 元件樣式（stories 已移至 `docs/src/`）
- `src/index.ts` — core 的 lib entry（css 抽出 + js 出口）

分工：元件標記、狀態修飾、排版全部走 `sl-*` 屬性，`class` 留給你，跟 `sl-` 前綴天然分開。
