import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Button",
    variant: "normal",
    tone: "primary",
    size: "md",
    disabled: false,
    invert: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["normal", "ghost", "underline"],
    },
    tone: {
      control: "select",
      options: ["primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    invert: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
