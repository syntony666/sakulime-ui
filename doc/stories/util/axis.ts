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

const SEP =
  '<span class="axis-sep" title="左側是未寫入屬性的預設，右側是具名值"></span>';

export const axis = <T>(values: T[], item: (v: T) => string) =>
  `<div class="axis-row">` +
  values
    .map((v, i) => `${i === 1 && values[0] === "-" ? SEP : ""}${item(v)}`)
    .join("") +
  `</div>`;
