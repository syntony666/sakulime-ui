import type { Meta, DemoObj } from "../util/types";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// no layout parent needed — the mark works on any block-level child that
// is narrower than its container
export const FlowCenter: Demo = {
  render: () =>
    `<div sl-stack sl-flow>` +
    `<div sl-card style="width: 18rem" sl-place="center">sl-place="center" 置中</div>` +
    `</div>`,
};

export const RowEnd: Demo = {
  render: () =>
    `<div sl-row>` +
    cell("一般子層") +
    cell("一般子層") +
    `<div class="demo-cell" sl-place="end">sl-place="end" 推到行尾</div>` +
    `</div>`,
};

// inside a stack the mark doubles as alignment — the child shrinks back
// to its content width instead of stretching edge to edge
export const StackMarks: Demo = {
  render: () =>
    `<div sl-stack>` +
    cell("不標：拉滿") +
    `<div class="demo-cell" sl-place="center">sl-place="center"</div>` +
    `<div class="demo-cell" sl-place="end">sl-place="end"</div>` +
    `</div>`,
};

// block-axis marks in a tall stack — "middle" centres vertically and
// pushes the others apart, "end" stays pinned to the right edge
export const StackMiddleEnd: Demo = {
  render: () =>
    `<div sl-stack style="height: 12rem">` +
    cell("一般子層") +
    `<div class="demo-cell" sl-place="middle">sl-place="middle" 垂直置中</div>` +
    `<div class="demo-cell" sl-place="end">sl-place="end" 靠右</div>` +
    `</div>`,
};

// a row centres children vertically by default, so the block-axis marks
// that actually move a cell are "top" and "bottom" — "middle" marks
// nothing here. "end" pushes right and stays centred
export const RowMarks: Demo = {
  render: () =>
    `<div sl-row>` +
    cell("撐列高的內容<br>第二行<br>第三行") +
    `<div class="demo-cell" sl-place="top">sl-place="top"</div>` +
    `<div class="demo-cell" sl-place="bottom">sl-place="bottom"</div>` +
    `<div class="demo-cell" sl-place="end">sl-place="end"</div>` +
    `</div>`,
};

// all three inline values on grid items — the tracks keep their size and
// each item shrinks to content width, pinned to its own cell's edge
export const GridCell: Demo = {
  render: () =>
    `<div sl-grid sl-cols="3">` +
    `<div class="demo-cell" sl-place="start">sl-place="start"</div>` +
    `<div class="demo-cell" sl-place="center">sl-place="center"</div>` +
    `<div class="demo-cell" sl-place="end">sl-place="end"</div>` +
    `</div>`,
};
