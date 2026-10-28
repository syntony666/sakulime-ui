// Minimal story shape consumed by the docs theme — replaces the
// @storybook/html-vite types the stories were written against.
export type Meta<Args = Record<string, unknown>> = {
  title?: string;
  tags?: string[];
  parameters?: Record<string, unknown>;
  args?: Partial<Args>;
  argTypes?: Record<string, unknown>;
};

export type StoryObj<Args = Record<string, unknown>> = {
  render?: (args: Args) => string;
  args?: Partial<Args>;
};
