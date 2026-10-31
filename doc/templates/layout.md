# Layout pages

Pages under `doc/pages/layout/` document one primitive or region each
(`stack`, `row`, `grid`, `topbar`…). Fixed shape:

```markdown
# <Name> *<中文名>*

> <one-sentence intro in a blockquote>

## 用法

<syntax block + lead-in + Demo>

## 屬性

### <aspect>

<text/table + Demo where useful>
```

- `## 屬性` groups the page's configurable surface. Each `###` covers one
  knob, named for what it does — `### 間距`, `### 位置`, `### 尺寸`,
  `### 欄數`, `### 跨欄` — or carries an attr chip when it documents an
  attribute (`### 窄屏直排 `sl-collapse``).
- `### 間距` opens with the px note, then the nine-step scale table with
  `md`（預設）— same table shape as shared-attribute pages.
- Behavior notes that aren't an attribute get a `### 行為` section.
- Demo file at `doc/demos/layout/<name>.demo.ts`.
