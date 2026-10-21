# sakulime-ui

CSS-first、框架無關的設計系統。契約是 `.sl-*` class + `--sl-*` token + `<sl-*>` custom element — 任何框架或純 HTML 都能用。

## 使用

```ts
// tokens + 主題（必備）
import "sakulime-ui/tokens.css";
import "sakulime-ui/themes/sakura.css"; // 或 themes/dark.css

// 全部元件 css
import "sakulime-ui/sakulime.css";

// 可選：註冊 <sl-*> custom elements
import "sakulime-ui/elements.js";
```

```html
<!-- 兩種寫法，同一份 CSS -->
<button class="sl-button sl-button--primary sl-button--md">Save</button>
<sl-button tone="primary" size="md">Save</sl-button>
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
- `src/css/*.css` — 元件樣式（`.sl-*`）
- `src/css/*.stories.ts` — Storybook stories（回傳 HTML 字串）
- `src/elements/*.ts` — `<sl-*>` custom element 薄殼（vanilla TS，零依賴）
