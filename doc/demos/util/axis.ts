// arg reads the same way, so render() can't emit sl-x="undefined".
export const attr = (name: string, value?: string) =>
  value == null || value === "-" ? "" : ` ${name}="${value}"`;

const NAMES: Record<string, string> = {
  "-": "預設",
  sm: "小",
  md: "中",
  lg: "大",
};

export const label = (value: string) => NAMES[value] ?? value;

// the tone axis every component demos — shared so the list can't drift
export const TONES = ["-", "primary", "secondary", "success", "warning", "danger"];

export const mark = (name: string) => (v: string) =>
  v === "-" ? name : `${name}="${v}"`;

const SEP =
  '<span class="axis-sep" data-demo title="左側是未標示屬性的預設，右側是具名選項"></span>';

export const axis = <T>(values: T[], item: (v: T) => string, col = false) =>
  `<div class="axis-row${col ? " col" : ""}">` +
  values
    .map((v, i) => `${i === 1 && values[0] === "-" ? SEP : ""}${item(v)}`)
    .join("") +
  `</div>`;

export const axisArg = (name: string, desc: string, options: string[]) => ({
  name,
  description: desc,
  control: { type: "select" as const },
  options,
});

export const boolArg = (name: string, desc: string) => ({
  name,
  description: desc,
  control: { type: "boolean" as const },
});
