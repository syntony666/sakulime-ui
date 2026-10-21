# sakulime-ui

CSS-first、框架無關的設計系統。契約是 **`sl-*` attribute + `--sl-*` token** — `class` 完全留給消費者排版，任何框架或純 HTML 都能用。

## 使用

```ts
// tokens + 主題（必備）
import "sakulime-ui/tokens.css";
import "sakulime-ui/themes/sakura.css"; // 或 themes/dark.css

// 全部元件 css
import "sakulime-ui/sakulime.css";

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

## 結構

- `src/tokens.css` — semantic token（非色 token 固定值；顏色 token 是契約）
- `src/themes/*.css` — 主題檔，負責給顏色 token 值
- `src/css/*.css` — 元件樣式（`[sl-*]` attribute selector）
- `src/css/*.stories.ts` — Storybook stories（回傳 HTML 字串）
- `src/icons/index.ts` — icon registry + `icon()` 純函式
- `src/index.ts` — lib entry（css 抽出 + js 出口）
