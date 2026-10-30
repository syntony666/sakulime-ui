# Doc page template

Every component/layout page under `doc/pages/` follows one skeleton. Sections
appear in a fixed order; a section with no content is omitted entirely rather
than left empty.

## File layout

A page pairs a prose file with a demo file:

- `doc/pages/<group>/<name>.md` — the page (group: `core`, `layout`)
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

## Skeleton

```markdown
<script setup>
import * as XDemos from "../../demos/components/x.demo";
</script>

# <Name> *<中文名>*

<one-sentence intro>

<Playground :meta="XDemos.default" :render="XDemos.X.render" />

## 使用
### <usage form>

## 安裝
### <install path>

## 型態
<value list + Demo>

## 屬性
### 顏色 `sl-tone`
#### <demo group>
### 尺寸 `sl-size`

## 修飾詞
### <name> `sl-x-<setting>`

## 子元素
### <name> `sl-x-<part>`
<Playground :meta="XDemos.<Part>" :render="XDemos.<Part>.render" />
#### <value variant> `<value>`

## 組合
```

## Section order

`##` headings are fixed names in a fixed order. Skip what doesn't apply.

| `##` | Holds | When present |
|---|---|---|
| 使用 | How to write the markup — paste, placeholder, helper | component needs JS or has usage forms |
| 安裝 | Install per environment (bundler / CDN / pure CSS) | component needs JS |
| 型態 | Marker values — `sl-x="hollow"` | marker takes values |
| 屬性 | Generic attrs — `sl-tone`, `sl-size`, `sl-radius`, `sl-pad`, `sl-interactive` | any generic attr applies |
| 修飾詞 | Component settings `sl-<x>-<setting>` written on the component itself | component has settings |
| 子元素 | Parts `sl-<x>-<part>` written on inner elements | component has parts |
| 組合 | Use inside/with other components | meaningful combos exist |

Inside `## 屬性`, `###` order follows the canonical table in `attrs.md`:
`sl-tone` → `sl-size` → `sl-radius` → `sl-pad` → `sl-interactive`.

## Heading format

| Level | Format | Example |
|---|---|---|
| `#` | `Name *中文名*` | `# Card *卡片*` |
| `##` | fixed section name, plain | `## 屬性` |
| `###` | ``中文名 `attr` `` | ``### 角落標記 `sl-card-corner` `` |
| `####` | `名稱` or ``名稱 `value` `` | ``#### 貼邊 `inset` `` |

A `###` documenting behavior rather than an attribute (e.g. icon's
`### 大小與對齊`) drops the attr chip. `####` groups demos under one `###`
(e.g. button's `#### 實心版本` / `#### 框線版本`) or lists a part's value
variants (e.g. card-section's `#### 貼邊 `inset``).

## Value lists

One bullet per value, default annotated:

```markdown
- `sm`：小
- `md`：一般（預設值）
- `lg`：大
```

## Demo and Playground placement

| Spot | Component | Rule |
|---|---|---|
| Page top | `<Playground>` | main component; controls cover marker values, generic attrs and component settings |
| `子元素` each `###` | `<Playground>` | every part gets its own playground with its own args/argTypes (`CardDemos.Corner`, `CardDemos.Sections`) |
| `####` value variants | `<Demo>` | part already adjustable above; variants show a static axis |
| `型態`/`屬性`/`修飾詞` sections | `<Demo>` | already covered by the main playground; sections show static axes |

Bind a standalone demo with args (no playground chrome) via
`<Demo :render="X.<Name>.render" :args="X.<Name>.args" />`.

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

Non-component pages — `introduction.md`, `attrs.md`, `theme.md`, section
`index.md`s, and the `layout: home` landing — don't follow the skeleton.
Their `##` sections are named by content (`## 安裝`, `## CDN`, `## 切換`…),
and they carry no demos unless a demo file exists for them. Everything else
still applies: frontmatter, heading format (``### 名稱 `attr` `` where the
section documents an attribute), value lists, prose rules.
