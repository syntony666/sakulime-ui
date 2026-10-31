# Shared-attribute pages

Pages under `doc/pages/attrs/` document one generic attribute each. Fixed
shape — smaller than the component skeleton:

```markdown
# <Name> *<中文名>*

> <one-sentence intro in a blockquote — what the attr does, plain terms>

## 用法

<syntax block + one-line explanation + Demo>

## 選項

| 選項 | <data column> |
<one row per option; the second column holds whatever fits — px, 效果,
用途; add the rem→16px note when px appears>

## 適用元素

<lead-in sentence>

| 元素 | <behavior column> |
<one row per applicable element; the column is named for what it
describes — 預設, 作用, 沒標示時, 備註>
```

- Frontmatter `description` and the intro stay a single short sentence.
- Both tables always — no prose lists for options or scope.
- Demo file at `doc/demos/attrs/<name>.demo.ts`; sidebar entry in the
  通用屬性 group.
