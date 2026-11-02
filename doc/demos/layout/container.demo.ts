import type { Meta, DemoObj } from "../util/types";

const meta = {
} satisfies Meta;

export default meta;
type Demo = DemoObj;

const box = (attr: string) =>
  `<div ${attr} class="demo-frame"><span data-demo>${attr} <span class="demo-w"></span></span></div>`;

export const ContainerWidths: Demo = {
  render: () =>
    [box("sl-container"), ...["sm", "md", "lg"].map((v) => box(`sl-container="${v}"`))].join(""),
};
