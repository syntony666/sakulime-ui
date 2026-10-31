// Attribute-axis demo rows: one element per attr value. When the axis
// starts with "-" (the unwritten default), a separator item is inserted
// to split it from the named values.

// "-" means the attribute is not written — the default. An absent
// arg reads the same way, so render() can't emit sl-x="undefined".
export const attr = (name: string, value?: string) =>
  value == null || value === "-" ? "" : ` ${name}="${value}"`;

// natural-language labels for values — unmapped values stay as the
// raw token (they are the API name you'd actually write)
const NAMES: Record<string, string> = {
  "-": "預設",
  sm: "小",
  md: "中",
  lg: "大",
};

export const label = (value: string) => NAMES[value] ?? value;

// the tone axis every component demos — shared so the list can't drift
export const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];

// marker values: "-" writes the bare attribute, not an absent one —
// mark("sl-notice") produces the per-component variant emitter
export const mark = (name: string) => (v: string) =>
  v === "-" ? name : `${name}="${v}"`;

// data-demo marks this as demo chrome — the docs source transform
// drops the whole element so it never reaches the shown code
const SEP =
  '<span class="axis-sep" data-demo title="左側是未標示屬性的預設，右側是具名選項"></span>';

// col stacks items vertically — for block-level components (banner)
// where a horizontal wrap row would shrink-wrap them into pills
export const axis = <T>(values: T[], item: (v: T) => string, col = false) =>
  `<div class="axis-row${col ? " col" : ""}">` +
  values
    .map((v, i) => `${i === 1 && values[0] === "-" ? SEP : ""}${item(v)}`)
    .join("") +
  `</div>`;

// Controls row for an attr axis: name = real attr, shows the "-" option
// and marks the real default in the option list
export const axisArg = (name: string, desc: string, options: string[]) => ({
  name,
  description: desc,
  control: { type: "select" as const },
  options,
});

// checkbox control for flag attrs (bare attr = on, absent = off)
export const boolArg = (name: string, desc: string) => ({
  name,
  description: desc,
  control: { type: "boolean" as const },
});
