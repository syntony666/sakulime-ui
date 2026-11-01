import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// the rails are dashed cells so the flex bounds stay visible; narrow the
// stage (or the window) and the content child wraps below the rail.
// Side follows source order — rail first sits on the leading edge
export const SidebarStart: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<aside sl-sidebar--rail>${cell("側邊欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `</div>`,
};

export const SidebarEnd: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar--rail>${cell("側邊欄")}</aside>` +
    `</div>`,
};

export const SidebarBoth: Demo = {
  render: () =>
    `<div sl-sidebar>` +
    `<aside sl-sidebar--rail>${cell("左欄")}</aside>` +
    `<div>${cell("主欄")}</div>` +
    `<aside sl-sidebar--rail>${cell("右欄")}</aside>` +
    `</div>`,
};
