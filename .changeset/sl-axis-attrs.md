---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

新增對齊雙軸通用屬性：`sl-justify`（主軸分佈，`start`/`center`/`end`/`between`）跟 `sl-align`（交叉軸對齊，`start`/`center`/`end`）。寫在排版元件自己身上生效、不繼承；寫在子層上變成單獨覆寫（`*-self`）。消費者：`sl-wrap`（整排水平分佈＋列內垂直對齊）、`sl-stack`（整疊垂直分佈＋子層水平對齊）、`sl-grid`（格子內水平、垂直分開管）。
