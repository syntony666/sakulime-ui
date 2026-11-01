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

<one section per distinct feature — `## 欄數`, `## 佔欄`,
`## 位置`, `## 內容排列`>

## 間距

<px note + nine-step scale table + var/sl-gap line — only on
gap-reading primitives>
```

- Mechanics that aren't a feature get written into the `用法` prose:
  no `行為` grab-bag section, no `屬性` wrapper level.
- `間距` opens with the px note, then the scale table with the
  primitive's own default marked `（預設）` (`md` for most,
  `lg` for `sl-sidebar`);
  primitives without a gap knob (`container`) skip the section entirely.
- Demo file at `doc/demos/layout/<name>.demo.ts`.
