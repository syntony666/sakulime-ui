# Doc templates

Three page types under `doc/pages/`, one file per skeleton:

- [`component.md`](component.md) — component pages under `pages/core/`
- [`attrs.md`](attrs.md) — shared-attribute pages under `pages/attrs/`
- [`layout.md`](layout.md) — layout pages under `pages/layout/`

Everything below is shared by all three.

## File layout

A page pairs a prose file with a demo file:

- `doc/pages/<group>/<name>.md` — the page (group: `core`, `layout`, `attrs`)
- `doc/demos/<group>/<name>.demo.ts` — its demos, imported as `*Demos`

## Frontmatter

```yaml
---
title: <Name> <中文名>
description: <one sentence; feeds canonical, OG and JSON-LD metadata>
---
```

Optional flags for full-bleed pages (e.g. `container.md`):

```yaml
aside: false        # hide the right-side TOC column
outline: false      # disable the TOC itself
pageClass: <name>   # extra class on the page wrapper
```

## Heading format

| Level | Format | Example |
|---|---|---|
| `#` | `Name *中文名*` | `# Card *卡片*` |
| `##` | fixed section name, plain | `## 屬性` |
| `###` | ``中文名 `attr` `` | ``### 角落標記 `sl-card-corner` `` |
| `####` | `名稱` or ``名稱 `value` `` | ``#### 貼邊 `inset` `` |

A `###` documenting behavior rather than an attribute drops the attr chip
(e.g. icon's `### 大小與對齊`, row's `### 行為`).

## Demo file conventions

- Values use `"-"` for "attribute not written" — `attr()` drops it, `axis()`
  inserts a separator after it, `axisArg()` shows it as the default option.
- `axisArg(name, desc, def, options)` — select control; `boolArg(name, desc)`
  — checkbox for bare flag attrs.
- `axis(values, item)` renders one element per value in a row;
  `label(v)` maps `-/sm/md/lg` to natural-language labels.
- A `DemoObj` carrying `args` + `argTypes` doubles as playground meta.
- Tokens that merge into one attr value (e.g. corner position + type) get
  separate args joined in `render`.

## Prose rules

- Page content is Taiwan Traditional Chinese; attr names and values stay
  English inside backticks.
- One idea per sentence; no em dashes; value lists instead of inline chips
  when enumerating.

## Guide and reference pages

Non-skeleton pages — `introduction.md`, `attrs.md` (the overview itself),
`theme.md`, `layout/responsive.md`, section `index.md`s, and the
`layout: home` landing — name `##` sections by content (`## 安裝`,
`## CDN`, `## 切換`…) and carry no demos unless a demo file exists for
them. Everything above still applies.
