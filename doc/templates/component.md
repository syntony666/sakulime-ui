# 元件頁

`pages/core/` 的元件頁。章節順序固定，沒有內容的章節整節省略，不留空殼。共用規則見 [`index.md`](index.md)。

## 骨架

```markdown
<script setup>
import * as XDemos from "../../demos/components/x.demo";
</script>

# <Name> *<中文名>*

<一句話介紹>

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

## 章節順序

`##` 名稱固定、順序固定，用不到的整節刪掉，不留空標題。

| `##` | 內容 | 何時出現 |
| --- | --- | --- |
| 使用 | 標記怎麼寫：貼上、佔位、輔助函式 | 元件需要 JS 或有多種寫法 |
| 安裝 | 依環境分開的安裝方式（bundler／CDN／純 CSS） | 元件需要 JS |
| 型態 | 標記的值，例如 `sl-x="hollow"` | 標記帶值 |
| 屬性 | 通用屬性的適用性、效果與預設，附屬性頁連結 | 有通用屬性適用 |
| 元件設定 | `sl-<x>-<setting>`，寫在元件自身 | 元件有設定 |
| 子元素 | `sl-<x>--<part>`，寫在內層元素 | 元件有零件 |
| 用法 | 同一個元件的不同角色，例如通知在版面內與浮動 | 角色不只一種 |
| 組合 | 與其他元件搭配 | 有值得示範的組合 |

`## 屬性` 底下的 `###` 依 `attrs.md` 的順序排。

順序為 `sl-tone`、`sl-size`、`sl-radius`、`sl-pad`、`sl-interactive`。

`## 組合` 由被組進去的那一方撰寫。小元件示範自己怎麼放進大元件，容器元件不為每個子元件各開一節。沒有值得示範的組合就整節省略。

## 標題附加規則

`## 用法` 底下的 `###` 用中英對照，英文在前、中文為斜體。

格式與 `# Name *中文名*` 相同，例如 `### Banner *橫幅*`。

`####` 有兩種用途：把多個 demo 分組，例如按鈕的「實心版本」「框線版本」；或列出零件的值變化，例如卡片的「貼邊 `edge`」。

## 值清單

值清單只列元件自有的詞彙：標記型態、設定、零件變化。`## 屬性` 不重列通用屬性的選項，只寫元件讀什麼、效果與預設，選項交給屬性頁。

一個值一行，預設值標在後面：

```markdown
- `sm`：小
- `md`：一般（預設）
- `lg`：大
```

## demo 與 playground 的放置

| 位置 | 元件 | 規則 |
| --- | --- | --- |
| 頁首 | `<Playground>` | 主元件；控制項涵蓋標記值、通用屬性與元件設定 |
| `子元素` 的每個 `###` | `<Playground>` | 每個零件各自一組 args 與 argTypes |
| `####` 的值變化 | `<Demo>` | 上方已可調，這裡只展示固定的值軸 |
| `型態`、`屬性`、`元件設定` | `<Demo>` | 主 playground 已涵蓋，這些章節示範靜態軸 |

只給 args、不要 playground 外框時，改用：

```markdown
<Demo :render="X.<Name>.render" :args="X.<Name>.args" />
```
