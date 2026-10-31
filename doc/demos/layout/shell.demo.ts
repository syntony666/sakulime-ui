import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// the rails are dashed cells so the flex bounds stay visible; narrow the
// stage (or the window) and the content child wraps below the rail
export const SidebarStart: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<aside sl-sidebar>${cell("側欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `</div>`,
};

export const SidebarEnd: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar>${cell("側欄")}</aside>` +
    `</div>`,
};

export const SidebarBoth: Demo = {
  render: () =>
    `<div sl-with-sidebar>` +
    `<aside sl-sidebar>${cell("左欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar>${cell("右欄")}</aside>` +
    `</div>`,
};

// position is overridden to static — a live sticky bar inside the demo
// would pin to the real viewport while scrolling the page
export const Topbar: Demo = {
  render: () =>
    `<div sl-topbar style="position: static">` +
    `${cell("Logo")}${cell("連結")}${cell("連結")}` +
    `</div>`,
};

export const Footer: Demo = {
  render: () => `<div sl-footer>${cell("頁尾內容")}</div>`,
};
