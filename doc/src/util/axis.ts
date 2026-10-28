// Attribute-axis demo rows: one element per attr value. When the axis
// starts with "-" (the unwritten default), a separator item is inserted
// to split it from the named values.

// "-" means the attribute is not written — the default.
export const attr = (name: string, value: string) =>
  value === "-" ? "" : ` ${name}="${value}"`;

// natural-language labels for values
const NAMES: Record<string, string> = {
  "-": "default",
  sm: "small",
  md: "medium",
  lg: "large",
};

export const label = (value: string) => {
  const text = NAMES[value] ?? value;
  return text[0].toUpperCase() + text.slice(1);
};

const SEP = '<span class="axis-sep"></span>';

export const axis = <T>(values: T[], item: (v: T) => string) =>
  `<div class="axis-row">` +
  values
    .map((v, i) => `${i === 1 && values[0] === "-" ? SEP : ""}${item(v)}`)
    .join("") +
  `</div>`;
