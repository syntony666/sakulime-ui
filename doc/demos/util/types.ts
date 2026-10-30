// Minimal demo shape consumed by the docs theme.
export type Meta<Args = Record<string, unknown>> = {
  title?: string;
  tags?: string[];
  parameters?: Record<string, unknown>;
  args?: Partial<Args>;
  argTypes?: Record<string, unknown>;
};

export type DemoObj<Args = Record<string, unknown>> = {
  render?: (args: Args) => string;
  args?: Partial<Args>;
  argTypes?: Record<string, unknown>;
};
