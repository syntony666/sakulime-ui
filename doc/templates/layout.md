# Layout pages

Pages under `doc/pages/layout/` document one primitive or region each
(`stack`, `row`, `grid`, `bar`…). Sections are flat `##` named by
feature, ordered by importance, `間距` always last:

```markdown
# <Name> *<中文名>*

> <one-sentence intro in a blockquote>

## 用法

<syntax block + demo + the primitive's mechanics in prose>

## <feature>

<one section per distinct feature — `## 欄數`, `## 跨欄`,
`## 位置`, `## 內容排列`>

## 間距

<sl-gap line: written on self or an ancestor + the primitive's own
default — only on gap-reading primitives>
```

- Mechanics that aren't a feature get written into the `用法` prose:
  no `行為` grab-bag section, no `屬性` wrapper level.
- `間距` states the primitive's own default (`md` for most, `lg` for
  `sl-sidebar`), the per-primitive `--sl-<x>-gap` override, and links to
  [`sl-gap`](/attrs/gap); the nine-step scale table lives only in
  `attrs/gap.md`, never re-listed here;
  primitives without a gap knob (`container`) skip the section entirely.
- Demo file at `doc/demos/layout/<name>.demo.ts`.
