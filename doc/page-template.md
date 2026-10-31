# Doc page template

Component pages under `doc/pages/` follow one skeleton; layout and
shared-attribute pages have their own smaller shapes, documented below.
Sections appear in a fixed order; a section with no content is omitted
entirely rather than left empty.

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

## 用法
### <English term> *<中文名>*

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
| 用法 | The component's own usage forms — same component, different roles (e.g. notice in-flow = banner, inside a fixed wrapper = toast) | component plays distinct roles |
| 組合 | Use inside/with other components | meaningful combos exist |

Inside `## 屬性`, `###` order follows the canonical table in `attrs.md`:
`sl-tone` → `sl-size` → `sl-radius` → `sl-pad` → `sl-interactive`.

`## 組合` is documented by the component being composed *into* others —
usually the smaller one shows how it drops into larger pieces (icon shows
itself inside cards and buttons); container components don't open a section
per placeable child. Omit the section entirely when no combo is worth showing.

## Heading format

| Level | Format | Example |
|---|---|---|
| `#` | `Name *中文名*` | `# Card *卡片*` |
| `##` | fixed section name, plain | `## 屬性` |
| `###` | ``中文名 `attr` `` | ``### 角落標記 `sl-card-corner` `` |
| `####` | `名稱` or ``名稱 `value` `` | ``#### 貼邊 `inset` `` |

A `###` documenting behavior rather than an attribute (e.g. icon's
`### 大小與對齊`) drops the attr chip. A `###` under `## 用法` names a
usage form in both languages — English first, Chinese as the glossed
sub-label, mirroring `# Name *中文名*` (e.g. `### Banner *橫幅*`,
`### Toast *浮動通知*`). `####` groups demos under one `###`
(e.g. button's `#### 實心版本` / `#### 框線版本`) or lists a part's value
variants (e.g. card-section's `#### 貼邊 `inset``).

## Value lists

One bullet per value, default annotated:

```markdown
- `sm`：小
- `md`：一般（預設）
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

## Shared-attribute pages

Pages under `doc/pages/attrs/` document one generic attribute each. They
don't follow the component skeleton — their fixed shape is smaller:

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

## Layout pages

Pages under `doc/pages/layout/` document one primitive or region each
(`stack`, `row`, `grid`, `topbar`…). Their fixed shape:

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

## Guide and reference pages

Non-component pages — `introduction.md`, `attrs.md` (the overview page
itself; the `attrs/*.md` entries follow the shared-attribute skeleton
above), `theme.md`, section `index.md`s, and the `layout: home` landing —
don't follow the skeleton. Their `##` sections are named by content
(`## 安裝`, `## CDN`, `## 切換`…), and they carry no demos unless a demo
file exists for them. Everything else still applies: frontmatter, heading
format (``### 名稱 `attr` `` where the section documents an attribute),
value lists, prose rules.
