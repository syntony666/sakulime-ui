import type { Meta, DemoObj } from "../util/types";
import { attr } from "../util/axis";

const meta = {} satisfies Meta;
export default meta;
type Demo = DemoObj;

const cell = (t: string) => `<div class="demo-cell">${t}</div>`;

// playground — two cells, one sl-place group each (inline + block
// selects compose into the attribute). The stage swaps parents so the
// same marks can be tried across 文流 / row / stack / grid; a fixed
// height gives block-axis values room everywhere except plain flow
type PlaceArgs = { zone: string; axA: string; ayA: string; axB: string; ayB: string };
const PX = ["-", "start", "center", "end"];
const PY = ["-", "top", "middle", "bottom"];

export const PlacePlay: DemoObj<PlaceArgs> = {
  args: { zone: "橫列", axA: "center", ayA: "-", axB: "end", ayB: "-" },
  argTypes: {
    zone: {
      name: "排版",
      description: "同一組標記換父層試",
      control: { type: "select" as const },
      options: ["文流", "橫列", "堆疊", "格網"],
    },
    axA: { name: "A 水平", description: "A 的 `sl-place` 水平值", control: { type: "select" as const }, options: PX },
    ayA: { name: "A 垂直", description: "A 的 `sl-place` 垂直值", control: { type: "select" as const }, options: PY },
    axB: { name: "B 水平", description: "B 的 `sl-place` 水平值", control: { type: "select" as const }, options: PX },
    ayB: { name: "B 垂直", description: "B 的 `sl-place` 垂直值", control: { type: "select" as const }, options: PY },
  },
  render: (a) => {
    const pA = [a.axA, a.ayA].filter((v) => v !== "-").join(" ");
    const pB = [a.axB, a.ayB].filter((v) => v !== "-").join(" ");
    const inner =
      `<div class="demo-cell"${attr("sl-place", pA || "-")}>A${pA ? "：" + pA : ""}</div>` +
      `<div class="demo-cell"${attr("sl-place", pB || "-")}>B${pB ? "：" + pB : ""}</div>`;
    switch (a.zone) {
      case "橫列": return `<div sl-row style="height: 9rem">${inner}</div>`;
      case "堆疊": return `<div sl-stack style="height: 9rem">${inner}</div>`;
      case "格網": return `<div sl-grid style="height: 9rem">${inner}</div>`;
      default: return `<div sl-stack sl-flow style="height: 9rem">${inner}</div>`;
    }
  },
};

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

// "center" flips the row into three zones (sl-bar's trick) — the marked
// cell is the row's true midpoint even with an end sibling on the line
export const RowCenterEnd: Demo = {
  render: () =>
    `<div sl-row>` +
    `<div class="demo-cell" sl-place="center">sl-place="center"</div>` +
    `<div class="demo-cell" sl-place="end">sl-place="end"</div>` +
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
