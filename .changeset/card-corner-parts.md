---
"sakulime-ui": minor
"@sakulime-ui/core": minor
"@sakulime-ui/layout": minor
"@sakulime-ui/theme": minor
---

`sl-card-corner` 改為純位置子元素：`end`（預設）/`start` 只管定位，型態 token（`text-sm`/`text-xs`/`indicator`）退役。長相由同一個元素疊加小元件屬性決定——`sl-chip` 貼邊膠囊、`sl-dot` 狀態點、`sl-icon` 圖示；`sl-tone` 寫在小元件自己身上染色，corner 不再消費 tone。
