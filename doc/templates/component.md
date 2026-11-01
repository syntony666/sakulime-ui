# Component pages

Component pages under `doc/pages/core/` follow the big skeleton below.
Sections appear in a fixed order; a section with no content is omitted
entirely rather than left empty. Shared conventions — file layout,
frontmatter, heading format, demo helpers, prose rules — live in
[`index.md`](index.md).

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

## 元件設定
### <name> `sl-x-<setting>`

## 子元素
### <name> `sl-x--<part>`
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
| 元件設定 | Component settings `sl-<x>-<setting>` written on the component itself | component has settings |
| 子元素 | Parts `sl-<x>--<part>` written on inner elements | component has parts |
| 用法 | The component's own usage forms — same component, different roles (e.g. notice in-flow = banner, inside a fixed wrapper = toast) | component plays distinct roles |
| 組合 | Use inside/with other components | meaningful combos exist |

Inside `## 屬性`, `###` order follows the canonical table in `attrs.md`:
`sl-tone` → `sl-size` → `sl-radius` → `sl-pad` → `sl-interactive`.

`## 組合` is documented by the component being composed *into* others —
usually the smaller one shows how it drops into larger pieces (icon shows
itself inside cards and buttons); container components don't open a section
per placeable child. Omit the section entirely when no combo is worth showing.

## Heading extras

A `###` under `## 用法` names a usage form in both languages — English
first, Chinese as the glossed sub-label, mirroring `# Name *中文名*` (e.g.
`### Banner *橫幅*`, `### Toast *浮動通知*`). `####` groups demos under
one `###` (e.g. button's `#### 實心版本` / `#### 框線版本`) or lists a
part's value variants (e.g. card-section's `#### 貼邊 `inset``).

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
| `型態`/`屬性`/`元件設定` sections | `<Demo>` | already covered by the main playground; sections show static axes |

Bind a standalone demo with args (no playground chrome) via
`<Demo :render="X.<Name>.render" :args="X.<Name>.args" />`.
