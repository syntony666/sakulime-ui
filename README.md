# sakulime-ui

CSS-first、框架無關的設計系統。契約是 **`sl-*` attribute（元件/狀態）+ `sl-*` class（排版工具）+ `--sl-*` token** — 任何框架或純 HTML 都能用。

## 使用

```ts
// tokens + 主題（必備）
import "sakulime-ui/tokens.css";
import "sakulime-ui/themes/sakura.css"; // 或 themes/dark.css

// 元件 css
import "sakulime-ui/sakulime.css";

// 可選：排版工具 class（.sl-grid/.sl-gap-md/.sl-container...）
import "sakulime-ui/layout.css";

// 可選：icon helper（純 TS，產 svg 字串）
import { icon } from "sakulime-ui";
```

```html
<button sl-button sl-tone="primary" sl-size="md">Save</button>
<button sl-button sl-tone="danger" sl-invert>Delete</button>
```

切主題：`<html data-theme="dark">`，不用 reload。

## 開發

```bash
npm run dev          # landing demo page (index.html)
npm run storybook    # Storybook — 元件文件/視覺驗收
npm run build        # tsc 型檢 + vite lib build + 拷貝 tokens/themes → dist/
npm run lint
```

## 結構（npm workspaces monorepo）

| 包 | 內容 | 依賴 |
|---|---|---|
| `sakulime-tokens` (`packages/tokens`) | `--sl-*` tokens + `themes/` — 共享基礎，純 css 無 build | — |
| `sakulime-core` (`packages/core`) | 元件 css（`[sl-*]` attr）+ `icon()` helper → `sakulime.js`/`sakulime.css` | tokens |
| `sakulime-layout` (`packages/layout`) | 排版工具 class（`.sl-*`）— 可單獨配其他 UI kit 用 | tokens |
| `sakulime-ui`（repo root） | meta 包：三包 dist 組裝 → 上述 subpath 全可用 | — |

各包內部：

- `src/css/*.css` — 元件樣式；`src/css/*.stories.ts` — Storybook stories
- `src/icons/index.ts` — icon registry + `icon()` 純函式
- `src/index.ts` — core 的 lib entry（css 抽出 + js 出口）

分工：`sl-*` attr = 元件/狀態契約；`sl-*` class = 排版工具；消費者自己的排版 class 跟 `sl-` 前綴天然分開。
